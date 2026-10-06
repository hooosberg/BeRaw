import { buildImagesArchive } from "./archive.js";
import { LOCALES, LOCALE_ORDER, resolveLocale, translate } from "./locales.js";

const LOCALE_STORAGE_KEY = "beraw.locale";

const state = {
  tab: null,
  images: [],
  selected: new Set(),
  busy: false,
  outputFormat: "original",
  locale: "en"
};

// Released zips live on GitHub Releases (see github/pack-release.sh for the
// packaging flow). We ask the Releases API for `latest` and compare tag_name
// against the running extension's manifest version.
const UPDATE_API = "https://api.github.com/repos/hooosberg/BeRaw/releases/latest";
const UPDATE_RELEASES_PAGE = "https://github.com/hooosberg/BeRaw/releases";

const ui = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  bindTabListeners();
  void initLocale().then(() => bootstrap());
});

function bindElements() {
  ui.selectionCount = document.querySelector("#selectionCount");
  ui.statusMessage = document.querySelector("#statusMessage");
  ui.imageGrid = document.querySelector("#imageGrid");
  ui.template = document.querySelector("#imageCardTemplate");
  ui.refreshButton = document.querySelector("#refreshButton");
  ui.settingsButton = document.querySelector("#settingsButton");
  ui.selectAllButton = document.querySelector("#selectAllButton");
  ui.clearSelectionButton = document.querySelector("#clearSelectionButton");
  ui.downloadButton = document.querySelector("#downloadButton");
  ui.outputFormatInputs = document.querySelectorAll('input[name="outputFormat"]');
  ui.settingsOverlay = document.querySelector("#settingsOverlay");
  ui.settingsClose = document.querySelector("#settingsCloseButton");
  ui.sheetTabs = document.querySelectorAll(".sheet__tab");
  ui.sheetPanels = document.querySelectorAll(".sheet__panel");
  ui.languageList = document.querySelector("#languageList");
  ui.checkUpdateButton = document.querySelector("#checkUpdateButton");
  ui.updateStatus = document.querySelector("#updateStatus");
  ui.aboutVersionValue = document.querySelector("#aboutVersionValue");
}

function currentVersion() {
  try {
    return chrome.runtime.getManifest().version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function fillVersion() {
  const v = currentVersion();
  if (ui.aboutVersionValue) ui.aboutVersionValue.textContent = `v ${v}`;
  const eyebrow = document.querySelector(".app__brand-text .eyebrow");
  if (eyebrow) {
    // Rebuild: <span data-i18n="appTagline">…</span> · v X.Y.Z
    const tag = eyebrow.querySelector('[data-i18n="appTagline"]');
    if (tag) {
      eyebrow.innerHTML = "";
      eyebrow.appendChild(tag);
      eyebrow.append(` · v ${v}`);
    }
  }
}

function bindEvents() {
  ui.refreshButton.addEventListener("click", () => {
    void loadImages();
  });

  ui.settingsButton.addEventListener("click", () => openSettings());
  ui.settingsClose.addEventListener("click", () => closeSettings());
  ui.settingsOverlay.addEventListener("click", (event) => {
    if (event.target === ui.settingsOverlay) closeSettings();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !ui.settingsOverlay.hasAttribute("hidden")) {
      closeSettings();
    }
  });

  ui.sheetTabs.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => switchSheetTab(tabBtn.dataset.tab));
  });

  if (ui.checkUpdateButton) {
    ui.checkUpdateButton.addEventListener("click", () => {
      void checkForUpdates();
    });
  }

  ui.selectAllButton.addEventListener("click", () => {
    state.selected = new Set(state.images.map((image) => image.id));
    renderImages();
    updateSelectionCount();
    updateActionState();
    syncSelectionsToContent();
  });

  ui.clearSelectionButton.addEventListener("click", () => {
    state.selected.clear();
    renderImages();
    updateSelectionCount();
    updateActionState();
    syncSelectionsToContent();
  });

  ui.downloadButton.addEventListener("click", () => {
    void downloadSelectedImages();
  });

  for (const input of ui.outputFormatInputs) {
    input.addEventListener("change", () => {
      if (input.checked) {
        state.outputFormat = input.value || "auto";
        syncOutputFormatToContent();
      }
    });
  }
}

function bindTabListeners() {
  chrome.tabs.onActivated.addListener(() => {
    void syncActiveTab({ reloadImages: true });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.active) return;
    if (changeInfo.status !== "complete" && !changeInfo.url) return;
    void syncActiveTab({ reloadImages: true });
  });
}

// ── Locale / i18n ────────────────────────────────────────────────────────────

async function initLocale() {
  let stored = null;
  try {
    const res = await chrome.storage?.local?.get?.(LOCALE_STORAGE_KEY);
    stored = res?.[LOCALE_STORAGE_KEY] || null;
  } catch {
    stored = null;
  }
  state.locale = resolveLocale(stored);
  document.documentElement.setAttribute("lang", state.locale);
  applyTranslations();
  fillVersion();
  renderLanguageList();
  syncLocaleToContent();
}

function t(key, ...args) {
  return translate(state.locale, key, args);
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    if (!key) return;
    const translated = t(key);
    el.title = translated;
    el.setAttribute("aria-label", translated);
  });
}

function renderLanguageList() {
  if (!ui.languageList) return;
  ui.languageList.replaceChildren();
  for (const code of LOCALE_ORDER) {
    const entry = LOCALES[code];
    if (!entry) continue;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "language-option";
    btn.dataset.locale = code;
    const label = document.createElement("span");
    label.className = "language-option__label";
    label.textContent = entry.name;
    const hint = document.createElement("span");
    hint.className = "language-option__code";
    hint.textContent = code;
    btn.append(label, hint);
    if (code === state.locale) btn.classList.add("is-active");
    btn.addEventListener("click", () => setLocale(code));
    ui.languageList.append(btn);
  }
}

async function setLocale(locale) {
  if (!LOCALES[locale] || locale === state.locale) return;
  state.locale = locale;
  document.documentElement.setAttribute("lang", locale);
  try {
    await chrome.storage?.local?.set?.({ [LOCALE_STORAGE_KEY]: locale });
  } catch {
    // ignore
  }
  applyTranslations();
  fillVersion();
  renderLanguageList();
  updateSelectionCount();
  renderImages();
  syncLocaleToContent();
}

function syncLocaleToContent() {
  if (!state.tab?.id || !isBehanceUrl(state.tab.url)) return;
  chrome.tabs.sendMessage(state.tab.id, {
    type: "update-locale",
    locale: state.locale,
    strings: pickOverlayStrings(state.locale)
  }).catch(() => {});
}

function pickOverlayStrings(locale) {
  const keys = [
    "overlaySelect", "overlaySelected",
    "overlayOpen", "overlayOpened",
    "overlayDownload", "overlayDownloading", "overlayDownloaded", "overlayDownloadFail"
  ];
  const out = {};
  for (const key of keys) {
    out[key] = translate(locale, key);
  }
  return out;
}

// ── Settings sheet ───────────────────────────────────────────────────────────

function openSettings() {
  ui.settingsOverlay.removeAttribute("hidden");
  ui.settingsOverlay.classList.add("is-open");
  requestAnimationFrame(() => {
    ui.settingsClose.focus();
  });
}

function closeSettings() {
  ui.settingsOverlay.setAttribute("hidden", "");
  ui.settingsOverlay.classList.remove("is-open");
  ui.settingsButton.focus();
}

function switchSheetTab(tabName) {
  ui.sheetTabs.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tab === tabName);
  });
  ui.sheetPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === tabName);
  });
}

// ── Update check (GitHub Releases) ──────────────────────────────────────────

function setUpdateStatus(text, tone = "info", link = null) {
  if (!ui.updateStatus) return;
  ui.updateStatus.textContent = "";
  ui.updateStatus.classList.remove("is-ok", "is-new", "is-error");
  if (tone === "ok") ui.updateStatus.classList.add("is-ok");
  if (tone === "new") ui.updateStatus.classList.add("is-new");
  if (tone === "error") ui.updateStatus.classList.add("is-error");
  ui.updateStatus.append(text);
  if (link) {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    a.target = "_blank";
    a.rel = "noreferrer noopener";
    ui.updateStatus.append(" ");
    ui.updateStatus.append(a);
  }
}

function compareVersions(a, b) {
  const parse = (v) => String(v || "0").replace(/^v/i, "").split(".").map((p) => parseInt(p, 10) || 0);
  const pa = parse(a);
  const pb = parse(b);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i += 1) {
    const x = pa[i] || 0;
    const y = pb[i] || 0;
    if (x !== y) return x - y;
  }
  return 0;
}

async function checkForUpdates() {
  if (!ui.checkUpdateButton) return;
  const btn = ui.checkUpdateButton;
  if (btn.disabled) return;
  btn.disabled = true;
  setUpdateStatus(t("updateChecking"));

  const current = currentVersion();
  try {
    const res = await fetch(UPDATE_API, { headers: { Accept: "application/vnd.github+json" } });
    if (res.status === 403 || res.status === 429) {
      setUpdateStatus(t("updateRateLimited"), "error");
      return;
    }
    if (res.status === 404) {
      // No release published yet — treat the running build as latest.
      setUpdateStatus(t("updateUpToDate", current), "ok");
      return;
    }
    if (!res.ok) {
      setUpdateStatus(t("updateFail", `HTTP ${res.status}`), "error");
      return;
    }
    const data = await res.json();
    const latest = String(data.tag_name || data.name || "").replace(/^v/i, "").trim();
    // Prefer the first .zip asset uploaded to the release; fall back to the release page.
    const zipAsset = Array.isArray(data.assets)
      ? data.assets.find((a) => /\.zip$/i.test(a?.name || ""))
      : null;
    const downloadUrl = zipAsset?.browser_download_url || data.html_url || UPDATE_RELEASES_PAGE;
    if (!latest) {
      setUpdateStatus(t("updateFail", "empty tag"), "error");
      return;
    }
    if (compareVersions(latest, current) > 0) {
      setUpdateStatus(
        t("updateAvailable", latest),
        "new",
        { href: downloadUrl, label: t("updateDownload") }
      );
    } else {
      setUpdateStatus(t("updateUpToDate", current), "ok");
    }
  } catch (error) {
    setUpdateStatus(t("updateFail", error.message || String(error)), "error");
  } finally {
    btn.disabled = false;
  }
}

// ── Core flow ────────────────────────────────────────────────────────────────

async function bootstrap() {
  setBusy(true);

  try {
    await syncActiveTab({ reloadImages: true });
  } catch (error) {
    showStatus(t("statusInitFail", error.message), "error");
  } finally {
    setBusy(false);
    updateActionState();
  }
}

async function syncActiveTab({ reloadImages = false } = {}) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  state.tab = tab || null;

  if (!tab?.id || !isBehanceUrl(tab.url)) {
    state.images = [];
    state.selected.clear();
    renderImages();
    updateSelectionCount();
    showStatus(t("statusNonBehance"), "warning");
    updateActionState();
    return;
  }

  if (reloadImages) {
    await loadImages();
  }
  syncLocaleToContent();
}

async function loadImages() {
  if (!state.tab?.id || !isBehanceUrl(state.tab.url)) {
    showStatus(t("statusNotBehanceTab"), "warning");
    return;
  }

  setBusy(true);
  showStatus(t("statusScanning"), "info");

  try {
    const response = await sendMessageToTab(state.tab.id, { type: "collect-images" });

    if (!response?.ok) {
      throw new Error(response?.error || "empty response");
    }

    state.images = response.images || [];
    const validIds = new Set(state.images.map((image) => image.id));
    const restored = (response.selected || []).filter((id) => validIds.has(id));
    state.selected = new Set(restored);

    renderImages();
    updateSelectionCount();

    if (state.images.length === 0) {
      showStatus(t("statusNoImages"), "warning");
    } else {
      if (state.selected.size > 0) {
        showStatus(t("statusRecognizedWithSelection", state.images.length, state.selected.size), "success");
      } else {
        showStatus(t("statusRecognizedIdle", state.images.length), "success");
      }
      syncSelectionsToContent();
      syncOutputFormatToContent();
      syncLocaleToContent();
    }
  } catch (error) {
    renderImages();
    updateSelectionCount();
    showStatus(t("statusScanFail", error.message), "error");
  } finally {
    setBusy(false);
    updateActionState();
  }
}

function renderImages() {
  ui.imageGrid.replaceChildren();

  const selectedImages = getSelectedImages();

  if (state.images.length === 0) {
    const empty = document.createElement("p");
    empty.className = "card__meta";
    empty.textContent = t("basketHint");
    ui.imageGrid.append(empty);
    return;
  }

  if (selectedImages.length === 0) {
    const empty = document.createElement("p");
    empty.className = "card__meta";
    empty.textContent = t("basketEmpty");
    ui.imageGrid.append(empty);
    return;
  }

  for (const image of selectedImages) {
    const fragment = ui.template.content.cloneNode(true);
    const card = fragment.querySelector(".card");
    const checkbox = fragment.querySelector(".card__checkbox");
    const checkLabel = fragment.querySelector(".card__check span");
    const title = fragment.querySelector(".card__title");
    const meta = fragment.querySelector(".card__meta");
    const preview = fragment.querySelector(".card__image");
    const link = fragment.querySelector(".card__link");

    checkbox.checked = true;
    checkbox.title = t("clearSelection");
    if (checkLabel) checkLabel.textContent = t("cardSelected");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        state.selected.add(image.id);
      } else {
        state.selected.delete(image.id);
      }
      renderImages();
      updateSelectionCount();
      updateActionState();
      syncSelectionsToContent();
    });

    title.textContent = image.alt || extractFilename(image.url) || "—";
    meta.textContent = buildMetaText(image);
    preview.src = image.url;
    preview.alt = image.alt || "Behance preview";
    link.href = image.originalUrl || image.url;
    link.textContent = t("cardOpen");

    card.dataset.imageId = image.id;
    ui.imageGrid.append(fragment);
  }
}

function updateSelectionCount() {
  ui.selectionCount.textContent = t("selectionCount", state.selected.size, state.images.length);
}

function updateActionState() {
  const hasSelection = state.selected.size > 0;
  const hasImages = state.images.length > 0;

  ui.refreshButton.disabled = state.busy;
  ui.selectAllButton.disabled = state.busy || !hasImages;
  ui.clearSelectionButton.disabled = state.busy || !hasSelection;
  ui.downloadButton.disabled = state.busy || !hasSelection;

  for (const input of ui.outputFormatInputs) {
    input.disabled = state.busy;
  }
}

function setBusy(value) {
  state.busy = value;
  updateActionState();
}

function showStatus(message, type = "info") {
  ui.statusMessage.textContent = message;
  ui.statusMessage.className = `status status--${type}`;
}

async function downloadSelectedImages() {
  const images = getSelectedImages();

  if (images.length === 0) {
    showStatus(t("statusEmptyBasket"), "warning");
    return;
  }

  setBusy(true);
  showStatus(t("statusPacking", formatLabel(state.outputFormat), images.length), "info");

  try {
    const response = await buildImagesArchive(images, state.outputFormat);
    const fileCount = Number(response.fileCount) || 0;
    const failedCount = Number(response.failedCount) || 0;
    const convertedCount = Number(response.convertedCount) || 0;

    await downloadArchive(response.blob, response.archiveName);

    if (fileCount === 0) {
      showStatus(t("statusZipNone"), "error");
    } else if (failedCount > 0) {
      showStatus(t("statusZipPartial", formatLabel(state.outputFormat), fileCount, failedCount), "warning");
    } else if (state.outputFormat === "original") {
      if (convertedCount > 0) {
        showStatus(t("statusZipOriginalConverted", fileCount, convertedCount), "success");
      } else {
        showStatus(t("statusZipOriginal", fileCount), "success");
      }
    } else {
      showStatus(t("statusZipConverted", formatLabel(state.outputFormat), fileCount, convertedCount), "success");
    }
  } catch (error) {
    showStatus(t("statusDownloadFail", error.message), "error");
  } finally {
    setBusy(false);
  }
}

function getSelectedImages() {
  return state.images.filter((image) => state.selected.has(image.id));
}

function syncSelectionsToContent() {
  if (!state.tab?.id || !isBehanceUrl(state.tab.url)) return;
  chrome.tabs.sendMessage(state.tab.id, {
    type: "update-overlay-selections",
    selected: [...state.selected]
  }).catch(() => {});
}

function syncOutputFormatToContent() {
  if (!state.tab?.id || !isBehanceUrl(state.tab.url)) return;
  chrome.tabs.sendMessage(state.tab.id, {
    type: "update-output-format",
    format: state.outputFormat
  }).catch(() => {});
}

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== "overlay-toggle-selection") return;
  const { imageId, selected } = message;
  if (selected) {
    state.selected.add(imageId);
  } else {
    state.selected.delete(imageId);
  }
  renderImages();
  updateSelectionCount();
  updateActionState();
});

async function sendMessageToTab(tabId, payload) {
  try {
    return await chrome.tabs.sendMessage(tabId, payload);
  } catch (error) {
    throw new Error(t("statusTabError"));
  }
}

function isBehanceUrl(url) {
  return /^https:\/\/(?:www\.)?behance\.net\//i.test(url || "") ||
    /^https:\/\/[^/]*\.behance\.net\//i.test(url || "");
}

function extractFilename(url) {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split("/").filter(Boolean).pop() || "";
  } catch {
    return "";
  }
}

function buildMetaText(image) {
  const resolution = image.width && image.height ? `${image.width} x ${image.height}` : "—";
  return `${resolution} · ${image.source}`;
}

async function downloadArchive(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);

  try {
    return await chrome.downloads.download({
      url: objectUrl,
      filename,
      conflictAction: "uniquify",
      saveAs: false
    });
  } finally {
    setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }
}

function formatLabel(format) {
  if (format === "original") return t("fmtOriginal");
  if (format === "auto") return t("fmtAuto");
  if (format === "jpg") return "JPG";
  if (format === "png") return "PNG";
  return format;
}
