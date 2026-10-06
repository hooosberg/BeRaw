const ZIP_MIME_TYPE = "application/zip";
const JPEG_MIME_TYPE = "image/jpeg";
const PNG_MIME_TYPE = "image/png";
const JPEG_QUALITY = 1;
const WEBP_MIME_TYPE = "image/webp";
const ZIP_VERSION = 20;
const ZIP_UTF8_FLAG = 0x0800;
const ZIP_STORE_METHOD = 0;
const ZIP_LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
const ZIP_CENTRAL_DIRECTORY_SIGNATURE = 0x02014b50;
const ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE = 0x06054b50;
const CRC32_TABLE = buildCrc32Table();
const textEncoder = new TextEncoder();

export async function buildImagesArchive(images, outputFormat = "auto") {
  const entries = [];
  const failures = [];
  const normalizedFormat = normalizeOutputFormat(outputFormat);

  for (let index = 0; index < images.length; index += 1) {
    try {
      entries.push(await buildArchiveEntry(images[index], index, normalizedFormat));
    } catch (error) {
      failures.push({
        index,
        url: images[index]?.originalUrl || images[index]?.url || "",
        error: error.message || "Failed to prepare image."
      });
    }
  }

  if (entries.length === 0) {
    throw new Error(failures[0]?.error || "没有可打包的图片。");
  }

  return {
    archiveName: buildArchiveFilename(images[0]),
    blob: buildZipBlob(entries),
    fileCount: entries.length,
    failedCount: failures.length,
    convertedCount: entries.filter((entry) => entry.converted).length
  };
}

async function buildArchiveEntry(image, index, outputFormat = "auto") {
  const normalizedAsset = await fetchAndNormalizeImage(image, outputFormat);

  return {
    name: buildArchiveEntryName(image, index, normalizedAsset.extension),
    bytes: new Uint8Array(await normalizedAsset.blob.arrayBuffer()),
    converted: normalizedAsset.converted
  };
}

export async function fetchAndNormalizeImage(image, outputFormat = "auto") {
  const preferredUrl = image?.originalUrl || image?.url;

  if (!preferredUrl) {
    throw new Error("Missing image URL.");
  }

  const response = await fetchImageWithFallback(image);

  if (!response.ok) {
    throw new Error(`图片抓取失败：${response.status}`);
  }

  const sourceBlob = await response.blob();
  const responseUrl = response.url || preferredUrl;

  return await normalizeDownloadAsset(sourceBlob, responseUrl, outputFormat);
}

async function fetchImageWithFallback(image) {
  const candidates = [image?.originalUrl, image?.url].filter(Boolean);
  let lastError = null;

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { credentials: "include" });

      if (response.ok) {
        return response;
      }

      lastError = new Error(`图片抓取失败：${response.status}`);
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("图片抓取失败。");
}

async function normalizeDownloadAsset(sourceBlob, sourceUrl, outputFormat = "auto") {
  const sourceMimeType = normalizeMimeType(sourceBlob.type) || inferMimeTypeFromUrl(sourceUrl);
  const normalizedFormat = normalizeOutputFormat(outputFormat);

  if (normalizedFormat === "original") {
    if (sourceMimeType === WEBP_MIME_TYPE) {
      return convertBlobToPreferredFormat(sourceBlob, "auto", sourceMimeType);
    }

    return {
      blob: sourceBlob,
      extension: inferOutputExtension(sourceMimeType, sourceUrl),
      converted: false
    };
  }

  if (normalizedFormat === "jpg") {
    if (sourceMimeType === JPEG_MIME_TYPE) {
      return {
        blob: ensureBlobMimeType(sourceBlob, JPEG_MIME_TYPE),
        extension: "jpg",
        converted: false
      };
    }

    return convertBlobToPreferredFormat(sourceBlob, "jpg", sourceMimeType);
  }

  if (normalizedFormat === "png") {
    if (sourceMimeType === PNG_MIME_TYPE) {
      return {
        blob: ensureBlobMimeType(sourceBlob, PNG_MIME_TYPE),
        extension: "png",
        converted: false
      };
    }

    return convertBlobToPreferredFormat(sourceBlob, "png", sourceMimeType);
  }

  if (isPreferredMimeType(sourceMimeType)) {
    return {
      blob: ensureBlobMimeType(sourceBlob, sourceMimeType),
      extension: extensionFromMimeType(sourceMimeType),
      converted: false
    };
  }

  return convertBlobToPreferredFormat(sourceBlob, "auto", sourceMimeType);
}

async function convertBlobToPreferredFormat(sourceBlob, outputFormat = "auto", sourceMimeType = "") {
  const bitmap = await createImageBitmap(sourceBlob);

  try {
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      throw new Error("Canvas context is unavailable.");
    }

    const normalizedFormat = normalizeOutputFormat(outputFormat);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0);

    const hasTransparency = imageHasTransparency(context, bitmap.width, bitmap.height);
    const outputMimeType = resolveOutputMimeType(normalizedFormat, sourceMimeType, hasTransparency);
    const blobOptions =
      outputMimeType === JPEG_MIME_TYPE
        ? { type: outputMimeType, quality: JPEG_QUALITY }
        : { type: outputMimeType };

    if (outputMimeType === JPEG_MIME_TYPE) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bitmap, 0, 0);
    }

    return {
      blob: await canvas.convertToBlob(blobOptions),
      extension: extensionFromMimeType(outputMimeType),
      converted: true
    };
  } finally {
    bitmap.close?.();
  }
}

function imageHasTransparency(context, width, height) {
  try {
    const { data } = context.getImageData(0, 0, width, height);

    for (let index = 3; index < data.length; index += 4) {
      if (data[index] !== 255) {
        return true;
      }
    }

    return false;
  } catch (error) {
    console.warn("Failed to inspect image alpha channel, keeping PNG to stay safe.", error);
    return true;
  }
}

function resolveOutputMimeType(outputFormat, sourceMimeType, hasTransparency) {
  if (outputFormat === "jpg") {
    return JPEG_MIME_TYPE;
  }

  if (outputFormat === "png") {
    return PNG_MIME_TYPE;
  }

  return sourceMimeType === PNG_MIME_TYPE || hasTransparency ? PNG_MIME_TYPE : JPEG_MIME_TYPE;
}

function buildArchiveFilename(image) {
  const folderName = sanitizeSegment(image?.pageTitle || "behance-page");
  return `behance-grabber/${folderName}.zip`;
}

function buildArchiveEntryName(image, index, extension = "jpg") {
  const folderName = sanitizeSegment(image?.pageTitle || "behance-page");
  const basename = extractBasename(image?.originalUrl || image?.url, index);
  const safeBasename = `${basename}.${normalizeExtension(extension)}`.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_");
  const order = String(index + 1).padStart(3, "0");

  return `${folderName}/${order}-${safeBasename}`;
}

function extractBasename(rawUrl, index) {
  try {
    const url = new URL(rawUrl);
    const rawName = url.pathname.split("/").filter(Boolean).pop() || `image-${index + 1}`;

    return rawName
      .replace(/\.[a-z0-9]{2,5}$/i, "")
      .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
      .trim() || `image-${index + 1}`;
  } catch {
    return `image-${index + 1}`;
  }
}

function buildZipBlob(entries) {
  const archiveParts = [];
  const centralDirectoryParts = [];
  const now = new Date();
  const dosTime = getDosTime(now);
  const dosDate = getDosDate(now);
  let offset = 0;
  let centralDirectorySize = 0;

  for (const entry of entries) {
    const nameBytes = textEncoder.encode(entry.name);
    const crc = crc32(entry.bytes);
    const size = entry.bytes.length;
    const localHeader = createLocalFileHeader({
      crc,
      size,
      nameLength: nameBytes.length,
      dosTime,
      dosDate
    });
    const centralHeader = createCentralDirectoryHeader({
      crc,
      size,
      nameLength: nameBytes.length,
      dosTime,
      dosDate,
      offset
    });

    archiveParts.push(localHeader, nameBytes, entry.bytes);
    centralDirectoryParts.push(centralHeader, nameBytes);

    offset += localHeader.length + nameBytes.length + entry.bytes.length;
    centralDirectorySize += centralHeader.length + nameBytes.length;
  }

  const endRecord = createEndOfCentralDirectoryRecord({
    entryCount: entries.length,
    centralDirectorySize,
    centralDirectoryOffset: offset
  });

  return new Blob([...archiveParts, ...centralDirectoryParts, endRecord], { type: ZIP_MIME_TYPE });
}

function createLocalFileHeader({ crc, size, nameLength, dosTime, dosDate }) {
  const bytes = new Uint8Array(30);
  const view = new DataView(bytes.buffer);

  view.setUint32(0, ZIP_LOCAL_FILE_HEADER_SIGNATURE, true);
  view.setUint16(4, ZIP_VERSION, true);
  view.setUint16(6, ZIP_UTF8_FLAG, true);
  view.setUint16(8, ZIP_STORE_METHOD, true);
  view.setUint16(10, dosTime, true);
  view.setUint16(12, dosDate, true);
  view.setUint32(14, crc, true);
  view.setUint32(18, size, true);
  view.setUint32(22, size, true);
  view.setUint16(26, nameLength, true);
  view.setUint16(28, 0, true);

  return bytes;
}

function createCentralDirectoryHeader({ crc, size, nameLength, dosTime, dosDate, offset }) {
  const bytes = new Uint8Array(46);
  const view = new DataView(bytes.buffer);

  view.setUint32(0, ZIP_CENTRAL_DIRECTORY_SIGNATURE, true);
  view.setUint16(4, ZIP_VERSION, true);
  view.setUint16(6, ZIP_VERSION, true);
  view.setUint16(8, ZIP_UTF8_FLAG, true);
  view.setUint16(10, ZIP_STORE_METHOD, true);
  view.setUint16(12, dosTime, true);
  view.setUint16(14, dosDate, true);
  view.setUint32(16, crc, true);
  view.setUint32(20, size, true);
  view.setUint32(24, size, true);
  view.setUint16(28, nameLength, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, offset, true);

  return bytes;
}

function createEndOfCentralDirectoryRecord({ entryCount, centralDirectorySize, centralDirectoryOffset }) {
  const bytes = new Uint8Array(22);
  const view = new DataView(bytes.buffer);

  view.setUint32(0, ZIP_END_OF_CENTRAL_DIRECTORY_SIGNATURE, true);
  view.setUint16(4, 0, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, entryCount, true);
  view.setUint16(10, entryCount, true);
  view.setUint32(12, centralDirectorySize, true);
  view.setUint32(16, centralDirectoryOffset, true);
  view.setUint16(20, 0, true);

  return bytes;
}

function getDosTime(date) {
  return (
    ((date.getHours() & 0x1f) << 11) |
    ((date.getMinutes() & 0x3f) << 5) |
    ((Math.floor(date.getSeconds() / 2)) & 0x1f)
  );
}

function getDosDate(date) {
  const year = Math.max(date.getFullYear(), 1980);

  return (
    (((year - 1980) & 0x7f) << 9) |
    (((date.getMonth() + 1) & 0x0f) << 5) |
    (date.getDate() & 0x1f)
  );
}

function buildCrc32Table() {
  const table = new Uint32Array(256);

  for (let index = 0; index < 256; index += 1) {
    let value = index;

    for (let bit = 0; bit < 8; bit += 1) {
      value = (value & 1) === 1 ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
    }

    table[index] = value >>> 0;
  }

  return table;
}

function crc32(bytes) {
  let crc = 0xffffffff;

  for (let index = 0; index < bytes.length; index += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function normalizeMimeType(input) {
  const mimeType = String(input || "").split(";")[0].trim().toLowerCase();

  if (mimeType === "image/jpg") {
    return JPEG_MIME_TYPE;
  }

  return mimeType;
}

function inferMimeTypeFromUrl(rawUrl) {
  const extension = inferExtensionFromUrl(rawUrl);

  if (extension === "jpg") {
    return JPEG_MIME_TYPE;
  }

  if (extension === "png") {
    return PNG_MIME_TYPE;
  }

  if (extension === "webp") {
    return WEBP_MIME_TYPE;
  }

  if (extension === "gif") {
    return "image/gif";
  }

  return "";
}

function inferExtensionFromUrl(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const match = url.pathname.toLowerCase().match(/\.([a-z0-9]{2,5})$/i);
    return match ? normalizeExtension(match[1]) : "";
  } catch {
    return "";
  }
}

function normalizeOutputFormat(format) {
  const value = String(format || "auto").trim().toLowerCase();
  return value === "original" || value === "jpg" || value === "png" ? value : "auto";
}

function normalizeExtension(input) {
  const extension = String(input || "").trim().toLowerCase().replace(/^\./, "");
  return extension === "jpeg" ? "jpg" : extension || "jpg";
}

function isPreferredMimeType(mimeType) {
  return mimeType === JPEG_MIME_TYPE || mimeType === PNG_MIME_TYPE;
}

function ensureBlobMimeType(blob, mimeType) {
  if (!mimeType || normalizeMimeType(blob.type) === mimeType) {
    return blob;
  }

  return blob.slice(0, blob.size, mimeType);
}

function extensionFromMimeType(mimeType) {
  return mimeType === PNG_MIME_TYPE ? "png" : "jpg";
}

function inferOutputExtension(mimeType, rawUrl) {
  const normalizedMimeType = normalizeMimeType(mimeType);

  if (normalizedMimeType === JPEG_MIME_TYPE) {
    return "jpg";
  }

  if (normalizedMimeType === PNG_MIME_TYPE) {
    return "png";
  }

  if (normalizedMimeType === WEBP_MIME_TYPE) {
    return "webp";
  }

  if (normalizedMimeType === "image/gif") {
    return "gif";
  }

  const urlExtension = inferExtensionFromUrl(rawUrl);
  return urlExtension || "img";
}

function sanitizeSegment(input) {
  return String(input)
    .trim()
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "_")
    .replace(/\s+/g, "-")
    .slice(0, 80) || "behance-page";
}
