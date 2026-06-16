#!/usr/bin/env python3
"""Crop the JOJO VANILLA & COFFEE circular logo (excluding decorative top/bottom bars)."""
from PIL import Image
import numpy as np
import os

src = "/home/z/my-project/upload/WhatsApp Image 2026-06-16 at 10.09.58 PM.jpeg"
dst_dir = "/home/z/my-project/public/images"

img = Image.open(src).convert("RGB")
arr = np.array(img)
H, W, _ = arr.shape
print(f"Image: {W}x{H}")

# Compute std-dev per row to find the central logo block
std_per_row = arr.std(axis=(1, 2))

# Find rows with significant content (std > 25)
content_rows = np.where(std_per_row > 25)[0]
print(f"Total high-std rows: {len(content_rows)}")

# Group consecutive content rows into blocks
blocks = []
if len(content_rows) > 0:
    start = content_rows[0]
    prev = content_rows[0]
    for r in content_rows[1:]:
        if r - prev > 10:  # gap detected
            blocks.append((start, prev))
            start = r
        prev = r
    blocks.append((start, prev))
print(f"\nContent blocks (top, bottom):")
for i, (s, e) in enumerate(blocks):
    width = e - s + 1
    print(f"  Block {i}: rows {s}-{e} (height {width})")

# Pick the largest block (should be the logo itself)
if blocks:
    largest = max(blocks, key=lambda b: b[1] - b[0])
    print(f"\nLargest block (the logo): rows {largest[0]}-{largest[1]}")

    # Within this row range, find the horizontal extent of non-white content
    region = arr[largest[0]:largest[1]+1, :, :]
    white_mask = (
        (region[:, :, 0] >= 235)
        & (region[:, :, 1] >= 235)
        & (region[:, :, 2] >= 235)
    )
    col_has_content = ~white_mask.all(axis=0)
    content_cols = np.where(col_has_content)[0]
    if len(content_cols) > 0:
        logo_left = content_cols[0]
        logo_right = content_cols[-1]
        print(f"Logo horizontal extent: cols {logo_left}-{logo_right}")

        # Add padding
        pad = 20
        crop_box = (
            max(0, logo_left - pad),
            max(0, largest[0] - pad),
            min(W, logo_right + pad),
            min(H, largest[1] + pad),
        )
        print(f"Crop box: {crop_box}")
        cropped = img.crop(crop_box)
        print(f"Cropped size: {cropped.size}")

        # Clean up background to pure white
        cropped_arr = np.array(cropped)
        near_white = (
            (cropped_arr[:, :, 0] >= 235)
            & (cropped_arr[:, :, 1] >= 235)
            & (cropped_arr[:, :, 2] >= 235)
        )
        cropped_arr[near_white] = [255, 255, 255]
        cropped_clean = Image.fromarray(cropped_arr)

        # Save JPEG
        dst_jpeg = os.path.join(dst_dir, "logo-jojo.jpg")
        cropped_clean.save(dst_jpeg, "JPEG", quality=92, optimize=True)
        print(f"\nSaved: {dst_jpeg} ({os.path.getsize(dst_jpeg)} bytes)")

        # Save PNG
        dst_png = os.path.join(dst_dir, "logo-jojo.png")
        cropped_clean.save(dst_png, "PNG", optimize=True)
        print(f"Saved: {dst_png} ({os.path.getsize(dst_png)} bytes)")
