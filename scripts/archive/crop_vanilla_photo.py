#!/usr/bin/env python3
"""Crop the TikTok watermark from the bottom-right of the vanilla beans photo."""
from PIL import Image
import os

src = "/home/z/my-project/upload/WhatsApp Image 2026-06-16 at 10.07.52 PM.jpeg"
dst = "/home/z/my-project/public/images/vanilla-beans-bundles.jpg"

img = Image.open(src).convert("RGB")
W, H = img.size
print(f"Original: {W}x{H}")

# The TikTok watermark is in the bottom-right corner. Crop a generous margin
# from the right and bottom to remove it entirely while keeping the vanilla beans.
# Watermark typically takes ~25% of width and ~15% of height in the corner.
crop_right = int(W * 0.78)   # keep 78% of width from the left
crop_bottom = int(H * 0.85)  # keep 85% of height from the top
cropped = img.crop((0, 0, crop_right, crop_bottom))
print(f"Cropped: {cropped.size[0]}x{cropped.size[1]}")

cropped.save(dst, "JPEG", quality=88, optimize=True)
print(f"Saved: {dst} ({os.path.getsize(dst):,} bytes)")
