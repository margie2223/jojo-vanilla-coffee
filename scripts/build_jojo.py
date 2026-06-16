#!/usr/bin/env python3
"""
JOJO VANILLA & COFFEE (U) LIMITED — Single consolidated build script
====================================================================

This script consolidates every helper that was used to build the website:
  1. fetch_original  — download the original monchynaturalproducts.com HTML for reference
  2. parse_site      — extract headings, paragraphs, links, images from that HTML
  3. crop_logo       — crop the user's uploaded JOJO logo to a clean square
  4. search_images   — find vanilla / cinnamon / spices / origin images via z-ai SDK

Usage:
  python scripts/build_jojo.py fetch_original
  python scripts/build_jojo.py parse_site
  python scripts/build_jojo.py crop_logo
  python scripts/build_jojo.py search_images
  python scripts/build_jojo.py all                 # run every step in order

All output goes to /home/z/my-project/scripts/data/ (JSON) and
/home/z/my-project/public/images/ (images).
"""

import json
import os
import re
import subprocess
import sys
from html import unescape

# -----------------------------------------------------------------------------
# Paths
# -----------------------------------------------------------------------------
PROJECT_ROOT = "/home/z/my-project"
SCRIPTS_DIR = os.path.join(PROJECT_ROOT, "scripts")
DATA_DIR = os.path.join(SCRIPTS_DIR, "data")
PUBLIC_IMAGES = os.path.join(PROJECT_ROOT, "public", "images")
UPLOAD_DIR = os.path.join(PROJECT_ROOT, "upload")

os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(PUBLIC_IMAGES, exist_ok=True)


# -----------------------------------------------------------------------------
# Step 1: Fetch the original site HTML using z-ai page_reader CLI
# -----------------------------------------------------------------------------
ORIGINAL_URL = "https://monchynaturalproducts.com/"


def fetch_original():
    """Download the original homepage HTML and save as JSON."""
    print(f"[1/4] Fetching {ORIGINAL_URL} ...")
    out = os.path.join(DATA_DIR, "monchy_home.json")
    cmd = ["z-ai", "function", "-n", "page_reader",
           "-a", json.dumps({"url": ORIGINAL_URL}), "-o", out]
    subprocess.run(cmd, check=True)
    print(f"      Saved -> {out} ({os.path.getsize(out):,} bytes)")
    return out


# -----------------------------------------------------------------------------
# Step 2: Parse the fetched HTML — headings, paragraphs, links, images
# -----------------------------------------------------------------------------
def parse_site():
    """Extract structured content from the original site HTML."""
    print("[2/4] Parsing original site HTML ...")
    src = os.path.join(DATA_DIR, "monchy_home.json")
    if not os.path.exists(src):
        print("      monchy_home.json not found — run `fetch_original` first.")
        return

    with open(src, encoding="utf-8") as f:
        data = json.load(f)
    page = data.get("data", {})
    html = page.get("html", "")

    result = {
        "title": page.get("title"),
        "url": page.get("url"),
        "description": page.get("description"),
        "headings": {},
        "paragraphs": [],
        "links": [],
        "images": [],
    }

    # Headings
    for tag in ("h1", "h2", "h3", "h4"):
        matches = re.findall(rf"<{tag}[^>]*>(.*?)</{tag}>", html, re.I | re.S)
        clean = [unescape(re.sub(r"<[^>]+>", "", m).strip()) for m in matches]
        result["headings"][tag] = [c for c in clean if c]

    # Paragraphs (only non-trivial ones)
    for p in re.findall(r"<p[^>]*>(.*?)</p>", html, re.I | re.S):
        text = unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", p))).strip()
        if len(text) > 30:
            result["paragraphs"].append(text)

    # Links & images
    result["links"] = list(dict.fromkeys(
        re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html, re.I)
    ))
    result["images"] = list(dict.fromkeys(
        re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
    ))

    out = os.path.join(DATA_DIR, "parsed_content.json")
    with open(out, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print(f"      Saved -> {out}")
    print(f"      H1: {result['headings'].get('h1', [])}")
    print(f"      H2 count: {len(result['headings'].get('h2', []))}")
    print(f"      H3 count: {len(result['headings'].get('h3', []))}")
    print(f"      Paragraphs: {len(result['paragraphs'])}")
    print(f"      Links: {len(result['links'])}, Images: {len(result['images'])}")
    return result


# -----------------------------------------------------------------------------
# Step 3: Crop the uploaded JOJO logo (remove decorative bars + whitespace)
# -----------------------------------------------------------------------------
def crop_logo():
    """Find the uploaded JOJO logo, crop tightly to the circular emblem."""
    print("[3/4] Cropping JOJO logo ...")
    from PIL import Image
    import numpy as np

    # Find the uploaded logo
    if not os.path.isdir(UPLOAD_DIR):
        print(f"      {UPLOAD_DIR} does not exist — no upload to crop.")
        return
    uploads = [f for f in os.listdir(UPLOAD_DIR)
               if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    if not uploads:
        print("      No image upload found.")
        return
    src = os.path.join(UPLOAD_DIR, uploads[0])
    print(f"      Source: {src}")

    img = Image.open(src).convert("RGB")
    arr = np.array(img)
    H, W, _ = arr.shape

    # Use row-wise std-dev to find the central logo block (skipping top/bottom decorative bars)
    std_per_row = arr.std(axis=(1, 2))
    content_rows = np.where(std_per_row > 25)[0]

    # Group into contiguous blocks (gap > 10 rows = new block)
    blocks = []
    if len(content_rows):
        start = prev = content_rows[0]
        for r in content_rows[1:]:
            if r - prev > 10:
                blocks.append((start, prev))
                start = r
            prev = r
        blocks.append((start, prev))

    if not blocks:
        print("      Could not find logo content — aborting.")
        return

    top, bottom = max(blocks, key=lambda b: b[1] - b[0])
    region = arr[top:bottom + 1, :, :]
    white = ((region[:, :, 0] >= 235) &
             (region[:, :, 1] >= 235) &
             (region[:, :, 2] >= 235))
    cols = np.where(~white.all(axis=0))[0]
    if not len(cols):
        print("      Could not find horizontal extent — aborting.")
        return

    left, right = cols[0], cols[-1]
    pad = 20
    box = (max(0, left - pad), max(0, top - pad),
           min(W, right + pad), min(H, bottom + pad))
    cropped = img.crop(box)
    arr2 = np.array(cropped)
    near_white = ((arr2[:, :, 0] >= 235) &
                  (arr2[:, :, 1] >= 235) &
                  (arr2[:, :, 2] >= 235))
    arr2[near_white] = [255, 255, 255]
    cropped = Image.fromarray(arr2)

    jpeg_path = os.path.join(PUBLIC_IMAGES, "logo-jojo.jpg")
    png_path = os.path.join(PUBLIC_IMAGES, "logo-jojo.png")
    cropped.save(jpeg_path, "JPEG", quality=92, optimize=True)
    cropped.save(png_path, "PNG", optimize=True)
    print(f"      Saved -> {jpeg_path} ({os.path.getsize(jpeg_path):,} bytes)")
    print(f"      Saved -> {png_path} ({os.path.getsize(png_path):,} bytes)")


# -----------------------------------------------------------------------------
# Step 4: Search the web for product & origin images via z-ai image-search
# -----------------------------------------------------------------------------
IMAGE_QUERIES = {
    "vanilla":    "vanilla beans pods on wooden surface close up",
    "cinnamon":   "cinnamon sticks bark spice close up",
    "spices":     "assorted colorful spices in bowls market",
    "madagascar": "Madagascar vanilla plantation farm landscape",
    "indonesia":  "Indonesia spice farm tropical green hills",
    "uganda":     "Uganda vanilla farming lush green farm",
}


def search_images():
    """Run z-ai image-search for each query and save the JSON results."""
    print("[4/4] Searching web images ...")
    for key, query in IMAGE_QUERIES.items():
        out = os.path.join(DATA_DIR, f"{key}_imgs.json")
        print(f"      {key}: {query}")
        # --no-rank = skip captioning for speed
        subprocess.run(
            ["z-ai", "image-search", "-q", query,
             "--count", "3", "--gl", "us", "--no-rank"],
            stdout=open(out, "w"), stderr=subprocess.DEVNULL, check=True
        )
        # Strip leading status lines so the file is pure JSON
        with open(out) as f:
            content = f.read()
        idx = content.find("{")
        if idx > 0:
            with open(out, "w") as f:
                f.write(content[idx:])
    print(f"      All image JSONs saved -> {DATA_DIR}/")


# -----------------------------------------------------------------------------
# CLI dispatcher
# -----------------------------------------------------------------------------
COMMANDS = {
    "fetch_original": fetch_original,
    "parse_site": parse_site,
    "crop_logo": crop_logo,
    "search_images": search_images,
    "all": lambda: (fetch_original(), parse_site(), crop_logo(), search_images()),
}


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in COMMANDS:
        print(__doc__)
        print("Available commands: " + ", ".join(COMMANDS))
        sys.exit(1)
    COMMANDS[sys.argv[1]]()


if __name__ == "__main__":
    main()
