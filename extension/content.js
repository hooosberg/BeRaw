const DEFAULT_OVERLAY_STRINGS = {
  overlaySelect: "选中",
  overlaySelected: "✓ 已选",
  overlayOpen: "打开原图",
  overlayOpened: "✓ 已打开",
  overlayDownload: "下载图片",
  overlayDownloading: "下载中…",
  overlayDownloaded: "✓ 已下载",
  overlayDownloadFail: "下载失败"
};

const overlayState = {
  selected: new Set(),
  outputFormat: "original",
  imageById: new Map(),
  imgToOverlay: new Map(),
  resizeObserver: null,
  windowListenerBound: false,
  locale: "zh-CN",
  strings: { ...DEFAULT_OVERLAY_STRINGS }
};

function overlayText(key) {
  return overlayState.strings[key] || DEFAULT_OVERLAY_STRINGS[key] || key;
}

function repositionAllOverlays() {
  for (const [imgEl, overlayEl] of overlayState.imgToOverlay) {
    positionOverlay(overlayEl, imgEl);
  }
}

function ensureWindowListeners() {
  if (overlayState.windowListenerBound) return;
  overlayState.windowListenerBound = true;
  let rafPending = false;
  const onChange = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      repositionAllOverlays();
    });
  };
  window.addEventListener("resize", onChange);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "collect-images") {
    try {
      const images = collectImages();
      sendResponse({
        ok: true,
        images,
        pageTitle: document.title,
        selected: [...overlayState.selected]
      });
    } catch (error) {
      sendResponse({
        ok: false,
        error: error.message || "Unable to collect images."
      });
    }
    return false;
  }

  if (message?.type === "update-overlay-selections") {
    const selectedSet = new Set(message.selected || []);
    overlayState.selected = selectedSet;
    applySelectionClasses();
    return false;
  }

  if (message?.type === "update-output-format") {
    overlayState.outputFormat = message.format || "original";
    return false;
  }

  if (message?.type === "update-locale") {
    overlayState.locale = message.locale || overlayState.locale;
    if (message.strings && typeof message.strings === "object") {
      overlayState.strings = { ...DEFAULT_OVERLAY_STRINGS, ...message.strings };
      refreshOverlayLabels();
    }
    return false;
  }

  return false;
});

function refreshOverlayLabels() {
  document.querySelectorAll(".grabber-overlay").forEach((overlayEl) => {
    const imageId = overlayEl.dataset.grabberImageId;
    if (!imageId) return;
    const isSelected = overlayState.selected.has(imageId);
    const checkBtn = overlayEl.querySelector(".grabber-btn-check");
    if (checkBtn && !checkBtn.dataset.grabberOriginalLabel) {
      checkBtn.textContent = isSelected ? overlayText("overlaySelected") : overlayText("overlaySelect");
    }
    const openBtn = overlayEl.querySelector(".grabber-btn-open");
    if (openBtn && !openBtn.dataset.grabberOriginalLabel) {
      openBtn.textContent = overlayText("overlayOpen");
    }
    const dlBtn = overlayEl.querySelector(".grabber-btn-download");
    if (dlBtn && !dlBtn.classList.contains("grabber-btn-busy") && !dlBtn.dataset.grabberOriginalLabel) {
      dlBtn.textContent = overlayText("overlayDownload");
    }
  });
}

function applySelectionClasses() {
  document.querySelectorAll(".grabber-overlay").forEach((overlayEl) => {
    const imageId = overlayEl.dataset.grabberImageId;
    if (!imageId) return;
    const isSelected = overlayState.selected.has(imageId);
    const checkBtn = overlayEl.querySelector(".grabber-btn-check");
    if (checkBtn) {
      checkBtn.classList.toggle("grabber-btn-check-active", isSelected);
      checkBtn.textContent = isSelected ? overlayText("overlaySelected") : overlayText("overlaySelect");
    }
  });
  // Toggle red outline on the image element itself
  document.querySelectorAll(".grabber-img").forEach((imgEl) => {
    const imageId = imgEl.dataset.grabberImageId;
    if (!imageId) return;
    imgEl.classList.toggle("grabber-img-selected", overlayState.selected.has(imageId));
  });
}

function collectImages() {
  const entries = new Map();
  const imgElMap = new Map();

  collectFromImageTags(entries, imgElMap);

  const images = Array.from(entries.values())
    .sort(sortImages)
    .map((image, index) => ({
      ...image,
      id: `behance-image-${index + 1}`,
      pageTitle: document.title
    }));

  injectOverlays(images, imgElMap);

  return images;
}

function collectFromImageTags(entries, imgElMap) {
  for (const imgEl of document.images) {
    // Skip images rendered too small — these are UI icons, avatars, etc.
    const rect = imgEl.getBoundingClientRect();
    const naturalW = imgEl.naturalWidth || 0;
    const naturalH = imgEl.naturalHeight || 0;
    const renderedW = rect.width || 0;
    const renderedH = rect.height || 0;
    const effectiveW = Math.max(naturalW, renderedW);
    const effectiveH = Math.max(naturalH, renderedH);

    // If the image has known dimensions and they are tiny, skip it.
    // Allow completely unknown (lazy-loaded placeholders) to pass — those are often
    // real content images that will load on scroll.
    if (effectiveW > 0 && effectiveH > 0 && (effectiveW < 180 || effectiveH < 180)) {
      continue;
    }

    const candidates = new Set([
      imgEl.currentSrc,
      imgEl.src,
      imgEl.getAttribute("data-src"),
      extractBestSrcsetCandidate(imgEl.getAttribute("srcset")),
      extractBestSrcsetCandidate(imgEl.getAttribute("data-srcset"))
    ]);

    for (const candidate of candidates) {
      if (candidate) {
        const normalizedUrl = normalizeUrl(candidate);
        if (normalizedUrl) {
          const key = buildImageKey(normalizedUrl);
          if (!imgElMap.has(key)) {
            imgElMap.set(key, imgEl);
          }
        }
      }
      registerImage(entries, candidate, {
        alt: imgEl.alt,
        width: naturalW || renderedW || 0,
        height: naturalH || renderedH || 0,
        source: "img"
      });
    }
  }
}

// ── Overlay injection ────────────────────────────────────────────────────────

function injectOverlayStyles() {
  if (document.getElementById("grabber-overlay-styles")) return;
  const style = document.createElement("style");
  style.id = "grabber-overlay-styles";
  style.textContent = `
    .grabber-img {
      outline: 3px solid #0057ff !important;
      outline-offset: -3px;
      transition: outline-color 0.15s ease;
    }
    .grabber-img.grabber-img-selected {
      outline-color: #e63946 !important;
    }
    .grabber-overlay {
      position: absolute;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 8px;
      background: rgba(0, 0, 0, 0.62);
      border-radius: 999px;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
      pointer-events: auto;
      box-sizing: border-box;
    }
    .grabber-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 7px 14px;
      border: 0;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      font-family: "Helvetica Neue", "PingFang SC", sans-serif;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.95);
      color: #1f1f1f;
      transition: background 0.12s ease, transform 0.12s ease, color 0.12s ease;
      white-space: nowrap;
      line-height: 1.4;
      flex-shrink: 0;
    }
    .grabber-btn:hover {
      background: #fff;
      transform: translateY(-1px);
    }
    .grabber-btn-download {
      background: #0057ff;
      color: #fff;
    }
    .grabber-btn-download:hover {
      background: #0042c7;
    }
    .grabber-btn-check {
      min-width: 56px;
    }
    .grabber-btn-check-active {
      background: #e63946;
      color: #fff;
    }
    .grabber-btn-check-active:hover {
      background: #c72c3d;
    }
    .grabber-btn-busy {
      opacity: 0.6;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

function injectOverlays(images, imgElMap) {
  injectOverlayStyles();
  ensureWindowListeners();

  // Preserve prior selections that still match current image IDs; drop stale ones
  const validIds = new Set(images.map((img) => img.id));
  overlayState.selected = new Set(
    [...overlayState.selected].filter((id) => validIds.has(id))
  );
  overlayState.imageById = new Map(images.map((img) => [img.id, img]));

  // Tear down previous overlays + outlines
  if (overlayState.resizeObserver) {
    overlayState.resizeObserver.disconnect();
  }
  document.querySelectorAll(".grabber-overlay").forEach((el) => el.remove());
  document.querySelectorAll(".grabber-img").forEach((el) => {
    el.classList.remove("grabber-img", "grabber-img-selected");
    delete el.dataset.grabberImageId;
  });
  document.querySelectorAll(".grabber-host").forEach((el) => {
    el.classList.remove("grabber-host");
  });

  overlayState.imgToOverlay = new Map();
  overlayState.resizeObserver = new ResizeObserver(() => {
    for (const [imgEl, overlayEl] of overlayState.imgToOverlay) {
      positionOverlay(overlayEl, imgEl);
    }
  });

  const processedImgs = new Set();

  for (const imageData of images) {
    const imgEl = imgElMap.get(imageData.key);
    if (!imgEl || processedImgs.has(imgEl)) continue;
    processedImgs.add(imgEl);

    const host = imgEl.parentElement;
    if (!host) continue;

    const computed = getComputedStyle(host);
    if (computed.position === "static") {
      host.style.position = "relative";
    }
    host.classList.add("grabber-host");

    // Mark img element directly so outline draws around the actual image
    imgEl.classList.add("grabber-img");
    imgEl.dataset.grabberImageId = imageData.id;

    const overlay = buildOverlayElement(imageData);
    host.appendChild(overlay);
    overlayState.imgToOverlay.set(imgEl, overlay);
    positionOverlay(overlay, imgEl);

    overlayState.resizeObserver.observe(imgEl);
    overlayState.resizeObserver.observe(host);
  }

  applySelectionClasses();
}

// Places the overlay at the top-right of the image, within its host container.
function positionOverlay(overlayEl, imgEl) {
  const host = overlayEl.parentElement;
  if (!host) return;
  const hostRect = host.getBoundingClientRect();
  const imgRect = imgEl.getBoundingClientRect();
  if (imgRect.width === 0 || imgRect.height === 0) {
    overlayEl.style.display = "none";
    return;
  }
  overlayEl.style.display = "";
  overlayEl.style.top = `${Math.max(0, imgRect.top - hostRect.top + 10)}px`;
  overlayEl.style.right = `${Math.max(0, hostRect.right - imgRect.right + 10)}px`;
  overlayEl.style.left = "auto";
}

function buildOverlayElement(imageData) {
  const overlay = document.createElement("div");
  overlay.className = "grabber-overlay";
  overlay.dataset.grabberImageId = imageData.id;

  const checkBtn = document.createElement("button");
  checkBtn.type = "button";
  checkBtn.className = "grabber-btn grabber-btn-check";
  checkBtn.textContent = overlayText("overlaySelect");

  const openBtn = document.createElement("button");
  openBtn.type = "button";
  openBtn.className = "grabber-btn grabber-btn-open";
  openBtn.textContent = overlayText("overlayOpen");

  const dlBtn = document.createElement("button");
  dlBtn.type = "button";
  dlBtn.className = "grabber-btn grabber-btn-download";
  dlBtn.textContent = overlayText("overlayDownload");

  overlay.appendChild(checkBtn);
  overlay.appendChild(openBtn);
  overlay.appendChild(dlBtn);

  checkBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const willSelect = !overlayState.selected.has(imageData.id);
    if (willSelect) {
      overlayState.selected.add(imageData.id);
    } else {
      overlayState.selected.delete(imageData.id);
    }
    applySelectionClasses();
    chrome.runtime.sendMessage({
      type: "overlay-toggle-selection",
      imageId: imageData.id,
      selected: willSelect
    });
  });

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    // Match sidebar's "打开原图" link: open the plain URL in a new tab.
    // Reliable, no SW round-trip, no popup-blocker issues.
    const target = imageData.originalUrl || imageData.url;
    if (!target) return;
    window.open(target, "_blank", "noopener,noreferrer");
    flashButton(openBtn, overlayText("overlayOpened"));
  });

  dlBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    void runDownload(dlBtn, imageData);
  });

  // Block Behance's own click handlers from firing through the overlay
  overlay.addEventListener("click", (e) => e.stopPropagation());
  overlay.addEventListener("mousedown", (e) => e.stopPropagation());

  return overlay;
}

function flashButton(buttonEl, label, durationMs = 1500) {
  const original = buttonEl.dataset.grabberOriginalLabel || buttonEl.textContent;
  buttonEl.dataset.grabberOriginalLabel = original;
  buttonEl.textContent = label;
  setTimeout(() => {
    buttonEl.textContent = original;
    delete buttonEl.dataset.grabberOriginalLabel;
  }, durationMs);
}

async function runDownload(buttonEl, imageData) {
  if (buttonEl.classList.contains("grabber-btn-busy")) return;
  const originalLabel = overlayText("overlayDownload");
  buttonEl.classList.add("grabber-btn-busy");
  buttonEl.textContent = overlayText("overlayDownloading");

  let blobUrl = null;
  try {
    const response = await chrome.runtime.sendMessage({
      type: "process-single-image",
      url: imageData.url,
      originalUrl: imageData.originalUrl,
      format: overlayState.outputFormat || "original",
      filename: deriveDownloadFilename(imageData.originalUrl || imageData.url),
      pageTitle: imageData.pageTitle || document.title
    });

    if (!response?.ok || !response.dataUrl) {
      console.warn("[Grabber] Download failed:", response?.error);
      buttonEl.textContent = overlayText("overlayDownloadFail");
      return;
    }

    // Rebuild the blob in page context from the data URL (safe across the
    // JSON-serialized sendMessage boundary) — then use the same
    // URL.createObjectURL + <a download> recipe that the ZIP flow relies on.
    const blobResponse = await fetch(response.dataUrl);
    const blob = await blobResponse.blob();
    blobUrl = URL.createObjectURL(blob);

    const saveName = (response.filename || "image").split("/").pop() || "image";
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = saveName;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();

    buttonEl.textContent = overlayText("overlayDownloaded");
  } catch (error) {
    buttonEl.textContent = overlayText("overlayDownloadFail");
    console.warn("[Grabber] Download threw:", error);
  } finally {
    if (blobUrl) {
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    }
    setTimeout(() => {
      buttonEl.textContent = originalLabel;
      buttonEl.classList.remove("grabber-btn-busy");
    }, 1500);
  }
}

function deriveDownloadFilename(url) {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split("/").filter(Boolean).pop() || "image.jpg";
  } catch {
    return "image.jpg";
  }
}

// ── Image collection helpers ─────────────────────────────────────────────────

function registerImage(entries, rawUrl, metadata = {}) {
  const normalizedUrl = normalizeUrl(rawUrl);

  if (!normalizedUrl) {
    return;
  }

  const originalUrl = deriveOriginalUrl(normalizedUrl);

  const candidate = {
    key: buildImageKey(normalizedUrl),
    url: normalizedUrl,
    originalUrl,
    width: Number(metadata.width) || 0,
    height: Number(metadata.height) || 0,
    alt: sanitizeText(metadata.alt),
    source: metadata.source || "page",
    score: scoreImage(originalUrl, metadata)
  };

  if (shouldSkip(candidate)) {
    return;
  }

  const existing = entries.get(candidate.key);

  if (!existing) {
    entries.set(candidate.key, candidate);
    return;
  }

  entries.set(candidate.key, chooseBetterCandidate(existing, candidate));
}

function chooseBetterCandidate(current, incoming) {
  if (incoming.score > current.score) {
    return incoming;
  }

  if (incoming.score === current.score && imageArea(incoming) > imageArea(current)) {
    return incoming;
  }

  return current;
}

function sortImages(a, b) {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  return imageArea(b) - imageArea(a);
}

function scoreImage(url, metadata) {
  let score = 0;

  if (url.includes("mir-s3-cdn-cf.behance.net")) {
    score += 4;
  }

  if (url.includes("project_modules")) {
    score += 4;
  }

  if (url.includes("/gallery/")) {
    score += 3;
  }

  if (url.includes("/source/")) {
    score += 2;
  }

  const width = Number(metadata.width) || 0;
  const height = Number(metadata.height) || 0;
  const area = width * height;

  if (area >= 1000000) {
    score += 3;
  } else if (area >= 250000) {
    score += 2;
  } else if (area >= 40000) {
    score += 1;
  } else if (area > 0) {
    score -= 1;
  }

  if (/avatar|profile|badge|favicon|sprite/i.test(url)) {
    score -= 5;
  }

  return score;
}

function shouldSkip(image) {
  if (!image.url) {
    return true;
  }

  if (!/^https?:/i.test(image.url)) {
    return true;
  }

  if (/\.svg(?:\?|$)/i.test(image.url)) {
    return true;
  }

  // Behance-specific UI elements (avatars, category badges, static icons, emoji)
  if (/user_images|\/users\/|\/stories\/|\/badges\/|\/emojis?\/|\/icons?\/|\/iconography\/|behance\.net\/img\//i.test(image.url)) {
    return true;
  }

  if (/avatar|profile|badge|favicon|sprite/i.test(image.url)) {
    return true;
  }

  // Catch-all size filter — likely UI chrome if natural size is tiny
  const area = imageArea(image);
  if (area > 0 && area < 32400) { // < 180x180
    return true;
  }

  return false;
}

function buildImageKey(url) {
  const parsed = new URL(url);

  return `${parsed.hostname}${parsed.pathname}`
    .replace(/\/(?:disp|fs|max|w|h|p)_\d+(?=\/)/gi, "")
    .replace(/\/source(?=\/)/gi, "")
    .toLowerCase();
}

function normalizeUrl(rawUrl) {
  if (!rawUrl) {
    return null;
  }

  const trimmed = String(rawUrl).trim().replace(/^["']|["']$/g, "");

  if (!trimmed || trimmed.startsWith("data:")) {
    return null;
  }

  try {
    const url = new URL(trimmed, window.location.href);
    return /^https?:$/i.test(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function deriveOriginalUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);

    if (!/behance\.net$/i.test(url.hostname) && !/\.behance\.net$/i.test(url.hostname)) {
      return url.toString();
    }

    url.pathname = url.pathname
      .replace(/\/project_modules(?:\/|$)(?:source|cover|cover_b|cover_hd|fs|disp|orig|hd|max_\d+|w_\d+|h_\d+|p_\d+|\d+)(?=\/)/i, "/project_modules/source")
      .replace(/\/(?:disp|fs|max_\d+|w_\d+|h_\d+|p_\d+)(?=\/)/gi, "/source");

    return url.toString();
  } catch {
    return rawUrl;
  }
}

function extractBestSrcsetCandidate(srcset) {
  if (!srcset) {
    return null;
  }

  return srcset
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const parts = item.split(/\s+/);
      const descriptor = parts[1] || "";
      const size = Number.parseInt(descriptor, 10) || 0;
      return {
        url: parts[0],
        size
      };
    })
    .sort((a, b) => b.size - a.size)[0]?.url || null;
}

function sanitizeText(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 140);
}

function imageArea(image) {
  return (Number(image.width) || 0) * (Number(image.height) || 0);
}
