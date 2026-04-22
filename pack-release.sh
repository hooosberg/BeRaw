#!/usr/bin/env bash
# Package local/ into github/releases/BeRaw-{version}.zip.
# Upload the resulting zip to GitHub Releases (github.com/hooosberg/BeRaw/releases)
# as an asset — the extension's built-in updater reads the latest release's
# tag_name via the Releases API.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$REPO_ROOT/local"
OUT_DIR="$SCRIPT_DIR/releases"

if [[ ! -d "$SRC" ]]; then
  echo "error: local/ not found at $SRC" >&2
  exit 1
fi

if [[ ! -f "$SRC/manifest.json" ]]; then
  echo "error: $SRC/manifest.json not found" >&2
  exit 1
fi

VERSION=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["version"])' "$SRC/manifest.json")
if [[ -z "$VERSION" ]]; then
  echo "error: couldn't read version from manifest.json" >&2
  exit 1
fi

ZIP_NAME="BeRaw-$VERSION.zip"
ZIP_PATH="$OUT_DIR/$ZIP_NAME"

mkdir -p "$OUT_DIR"

# Stage shipping files under a temp dir so the zip's root is flat (ready for
# `Load unpacked`). We copy only the runtime files — no dev tools.
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT

STAGE_ROOT="$STAGE/BeRaw-$VERSION"
mkdir -p "$STAGE_ROOT/icons"

# Runtime files
for f in manifest.json sidepanel.html popup.js popup.css content.js background.js archive.js locales.js; do
  cp "$SRC/$f" "$STAGE_ROOT/$f"
done

# Icons (skip dev-only generate_icons.py)
for f in icon-16.png icon-32.png icon-48.png icon-128.png logo.svg promo-440x280.png; do
  if [[ -f "$SRC/icons/$f" ]]; then
    cp "$SRC/icons/$f" "$STAGE_ROOT/icons/$f"
  fi
done

# Strip macOS metadata before zipping.
find "$STAGE_ROOT" -name '.DS_Store' -delete 2>/dev/null || true

if [[ -f "$ZIP_PATH" ]]; then
  rm "$ZIP_PATH"
fi

( cd "$STAGE" && zip -rq "$ZIP_PATH" "BeRaw-$VERSION" -x '*/.DS_Store' )

SIZE=$(du -h "$ZIP_PATH" | awk '{print $1}')

cat <<DONE
✓ Built $ZIP_NAME ($SIZE)
  Path: $ZIP_PATH

Next steps:
  1. Go to https://github.com/hooosberg/BeRaw/releases/new
  2. Tag: v$VERSION (create new tag on main)
  3. Title: BeRaw v$VERSION
  4. Attach: $ZIP_NAME
  5. Publish.

Once published, every installed extension will see the new version
on its next "Check for updates" in Settings → About.
DONE
