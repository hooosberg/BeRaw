import { fetchAndNormalizeImage } from "./archive.js";

void initializeSidePanel();

chrome.runtime.onInstalled.addListener(() => {
  void initializeSidePanel();
});

async function initializeSidePanel() {
  if (!chrome.sidePanel?.setPanelBehavior) {
    return;
  }

  try {
    await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  } catch (error) {
    console.warn("Failed to enable side panel on action click.", error);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "process-single-image") {
    handleSingleImage(message)
      .then((result) => sendResponse({ ok: true, ...result }))
      .catch((error) => sendResponse({ ok: false, error: error.message || String(error) }));
    return true; // keep channel open for async sendResponse
  }
});

async function handleSingleImage(message) {
  const { url, originalUrl, format, filename, pageTitle } = message;
  const image = {
    url,
    originalUrl: originalUrl || url,
    pageTitle: pageTitle || ""
  };

  const asset = await fetchAndNormalizeImage(image, format || "original");
  const targetFilename = buildSingleFilename(filename, asset.extension);

  // chrome.runtime.sendMessage serializes as JSON — ArrayBuffer/Blob don't survive.
  // Ship the bytes as a base64 data URL so the content script can rebuild a faithful
  // Blob in the page context and drive the same <a download> / chrome.downloads path
  // that the ZIP flow already uses successfully.
  const dataUrl = await blobToDataUrl(asset.blob);
  return {
    converted: asset.converted,
    filename: targetFilename,
    dataUrl
  };
}

async function blobToDataUrl(blob) {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);
  return `data:${blob.type || "application/octet-stream"};base64,${base64}`;
}

function buildSingleFilename(rawName, extension) {
  const ext = String(extension || "jpg").toLowerCase();
  const folder = "behance-grabber";
  const safeBase = String(rawName || "image")
    .replace(/\.[a-z0-9]{2,5}$/i, "")
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .trim() || "image";
  return `${folder}/${safeBase}.${ext}`;
}
