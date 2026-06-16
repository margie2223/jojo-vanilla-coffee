#!/usr/bin/env python3
"""Extract image URLs and key content from the rabanadas reference site."""
import json, re
from html import unescape

with open('/home/z/my-project/scripts/data/rabanadas_site.json') as f:
    data = json.load(f)

page = data.get('data', {})
html = page.get('html', '')
title = page.get('title', '')

print("=" * 60)
print("TITLE:", title)
print("URL:", page.get('url'))
print("DESCRIPTION:", page.get('description', '')[:300])
print("=" * 60)

# All images
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
print(f"\n=== <img> TAGS: {len(imgs)} ===")
for i, src in enumerate(imgs[:30]):
    print(f"  {i+1}. {src}")

# Background images (inline style)
bgs = re.findall(r'background(?:-image)?\s*:\s*url\(["\']?([^"\')]+)["\']?\)', html, re.I)
print(f"\n=== BACKGROUND IMAGES (inline style): {len(bgs)} ===")
for i, b in enumerate(bgs[:20]):
    print(f"  {i+1}. {b}")

# data-bg attributes (Elementor / lazy load)
data_bgs = re.findall(r'data-bg(?:-image)?=["\']([^"\']+)["\']', html, re.I)
print(f"\n=== data-bg attributes: {len(data_bgs)} ===")
for i, b in enumerate(data_bgs[:20]):
    print(f"  {i+1}. {b}")

# Hero section / first major section
print("\n=== HEADINGS ===")
for tag in ['h1','h2','h3','h4']:
    matches = re.findall(rf'<{tag}[^>]*>(.*?)</{tag}>', html, re.I | re.S)
    for m in matches:
        text = unescape(re.sub(r'<[^>]+>', '', m)).strip()
        if text:
            print(f"  {tag.upper()}: {text[:150]}")

# Body text
print("\n=== BODY TEXT (first 3500 chars) ===")
body = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
body = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', body, flags=re.I)
text = unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', body))).strip()
print(text[:3500])

# CSS color summary
print("\n=== CSS COLORS (top hex) ===")
hex_colors = re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', html)
hex_counts = {}
for c in hex_colors:
    c_lower = c.lower()
    hex_counts[c_lower] = hex_counts.get(c_lower, 0) + 1
for color, count in sorted(hex_counts.items(), key=lambda x: -x[1])[:15]:
    print(f"  {color}: {count}x")
