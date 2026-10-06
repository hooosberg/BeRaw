#!/usr/bin/env python3
"""Render the BeRaw logo to PNG icons at 16/32/48/128.

The logo is drawn procedurally with Pillow so it is crisp at small sizes
and doesn't depend on any system font.
"""
from __future__ import annotations

import os
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))

BLUE_TOP = (26, 107, 255)      # #1a6bff
BLUE_BOTTOM = (0, 66, 199)     # #0042c7
WHITE = (255, 255, 255, 255)
ACCENT_WARM = (255, 125, 45, 255)    # #ff7d2d
ACCENT_LIGHT = (255, 210, 154, 255)  # #ffd29a

# All coordinates are expressed on a 128x128 canvas and scaled up.
BASE = 128
SCALE = 8   # 1024x1024 working canvas for anti-aliasing.


def rounded_mask(size, radius):
    """Return an L-mode mask of a rounded square."""
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def vertical_gradient(size, top_rgb, bottom_rgb):
    """RGBA image with a vertical gradient from top_rgb to bottom_rgb."""
    w, h = size, size
    img = Image.new("RGBA", (w, h))
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top_rgb[0] + (bottom_rgb[0] - top_rgb[0]) * t)
        g = int(top_rgb[1] + (bottom_rgb[1] - top_rgb[1]) * t)
        b = int(top_rgb[2] + (bottom_rgb[2] - top_rgb[2]) * t)
        for x in range(w):
            img.putpixel((x, y), (r, g, b, 255))
    return img


def diagonal_gradient(size, start_rgb, end_rgb):
    w, h = size, size
    img = Image.new("RGBA", (w, h))
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            t = (x + y) / max(w + h - 2, 1)
            r = int(start_rgb[0] + (end_rgb[0] - start_rgb[0]) * t)
            g = int(start_rgb[1] + (end_rgb[1] - start_rgb[1]) * t)
            b = int(start_rgb[2] + (end_rgb[2] - start_rgb[2]) * t)
            pixels[x, y] = (r, g, b, 255)
    return img


def scale_pt(value, scale):
    return value * scale


def draw_b_mark(draw, scale):
    """Draw a bold, geometric 'B' letterform centered.

    Baseline coordinates on a 128 canvas:
      spine: x=30..50, y=22..104
      upper bowl: x=50..86, y=22..62
      lower bowl: x=50..90, y=62..104
    """
    s = scale

    # Left vertical spine.
    draw.rounded_rectangle(
        [30 * s, 22 * s, 50 * s, 104 * s],
        radius=6 * s,
        fill=WHITE,
    )

    # Upper bowl: a rounded rectangle that overlaps the spine, with a
    # hole punched out of the center. We'll build it with a second pass
    # using a mask below.
    draw.rounded_rectangle(
        [36 * s, 22 * s, 86 * s, 62 * s],
        radius=18 * s,
        fill=WHITE,
    )
    # Lower bowl, slightly wider.
    draw.rounded_rectangle(
        [36 * s, 62 * s, 90 * s, 104 * s],
        radius=20 * s,
        fill=WHITE,
    )


def draw_b_counters(draw, scale):
    """Punch the two inner holes of the 'B' in blue."""
    s = scale
    # Upper counter.
    draw.rounded_rectangle(
        [52 * s, 34 * s, 74 * s, 52 * s],
        radius=6 * s,
        fill=(0, 0, 0, 0),
    )
    # Lower counter.
    draw.rounded_rectangle(
        [52 * s, 72 * s, 78 * s, 92 * s],
        radius=7 * s,
        fill=(0, 0, 0, 0),
    )


def draw_accents(img, scale):
    """Pixel dot + download arrow — 'raw pixels coming down' visual."""
    s = scale
    draw = ImageDraw.Draw(img)

    # Pixel dot (top-right) — represents a raw pixel.
    draw.rounded_rectangle(
        [95 * s, 20 * s, 109 * s, 34 * s],
        radius=3 * s,
        fill=ACCENT_LIGHT,
    )

    # Download chevron (bottom-right) — subtle raw-image-down hint.
    # Triangle pointing down.
    tri = [(96 * s, 74 * s), (114 * s, 74 * s), (105 * s, 98 * s)]
    draw.polygon(tri, fill=ACCENT_WARM)


def build_logo(size_px):
    big = size_px * 4  # Extra oversampling for each target size.
    # Background (rounded blue tile).
    bg = vertical_gradient(big, BLUE_TOP, BLUE_BOTTOM)
    mask = rounded_mask(big, int(big * 28 / BASE))
    tile = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    tile.paste(bg, (0, 0), mask)

    # Draw the 'B' letter on a transparent layer, then counters to hole it out.
    scale = big / BASE
    letter = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    ldraw = ImageDraw.Draw(letter)
    draw_b_mark(ldraw, scale)

    # Counters: draw in a separate layer as blue-transparent to hole out.
    counters = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    cdraw = ImageDraw.Draw(counters)
    # Fill with the local background color so the hole reads through.
    cdraw.rounded_rectangle(
        [52 * scale, 34 * scale, 74 * scale, 52 * scale],
        radius=6 * scale,
        fill=(0, 0, 0, 255),
    )
    cdraw.rounded_rectangle(
        [52 * scale, 72 * scale, 78 * scale, 92 * scale],
        radius=7 * scale,
        fill=(0, 0, 0, 255),
    )
    # Cut the counters out of the letter.
    counter_alpha = counters.split()[3]
    letter_alpha = letter.split()[3]
    # letter_alpha minus counter_alpha => subtract
    new_alpha = Image.eval(letter_alpha, lambda v: v)
    new_alpha = Image.new("L", letter.size, 0).paste  # placeholder
    # Instead: use paste with inverted mask.
    from PIL import ImageChops
    cut_alpha = ImageChops.subtract(letter_alpha, counter_alpha)
    letter.putalpha(cut_alpha)

    tile.alpha_composite(letter)
    draw_accents(tile, scale)

    # Down-sample twice for a smoother result at small sizes.
    tile = tile.resize((big // 2, big // 2), Image.LANCZOS)
    tile = tile.resize((size_px, size_px), Image.LANCZOS)
    return tile


def main():
    sizes = [16, 32, 48, 128]
    for s in sizes:
        img = build_logo(s)
        out = os.path.join(HERE, f"icon-{s}.png")
        img.save(out, "PNG")
        print(f"wrote {out}")

    # Promotional 440x280 tile used on the Chrome Web Store listing.
    promo_w, promo_h = 440, 280
    promo = vertical_gradient(promo_h * 2, (249, 246, 239), (240, 236, 228))
    promo = promo.resize((promo_w, promo_h), Image.LANCZOS)
    logo = build_logo(148)
    promo.paste(logo, (promo_w - 148 - 32, (promo_h - 148) // 2), logo)

    # Text block on the left — keep it pictographic via simple geometry to avoid font deps.
    draw = ImageDraw.Draw(promo)
    bar_x = 32
    bar_y_base = 90
    draw.rounded_rectangle([bar_x, bar_y_base,     bar_x + 180, bar_y_base + 16],   radius=8, fill=(31, 31, 31))
    draw.rounded_rectangle([bar_x, bar_y_base+28,  bar_x + 220, bar_y_base + 40],  radius=6, fill=(106, 102, 93))
    draw.rounded_rectangle([bar_x, bar_y_base+52,  bar_x + 148, bar_y_base + 72],  radius=10, fill=(0, 87, 255))

    promo_out = os.path.join(HERE, "promo-440x280.png")
    promo.save(promo_out, "PNG")
    print(f"wrote {promo_out}")


if __name__ == "__main__":
    main()
