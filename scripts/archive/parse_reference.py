#!/usr/bin/env python3
"""Extract colors and contact info from the reference site."""
import json, re
from html import unescape

with open('/home/z/my-project/scripts/data/reference_site.json') as f:
    data = json.load(f)

page = data.get('data', {})
html = page.get('html', '')
title = page.get('title', '')

print("=" * 60)
print("TITLE:", title)
print("URL:", page.get('url'))
print("DESCRIPTION:", page.get('description', '')[:200])
print("=" * 60)

# Extract all CSS color values used in the page (inline styles + style blocks)
print("\n=== CSS COLORS ===")
# Hex colors
hex_colors = re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', html)
hex_counts = {}
for c in hex_colors:
    c_lower = c.lower()
    hex_counts[c_lower] = hex_counts.get(c_lower, 0) + 1
print("Hex colors (sorted by frequency):")
for color, count in sorted(hex_counts.items(), key=lambda x: -x[1])[:30]:
    print(f"  {color}: {count}x")

# rgb() colors
rgb_colors = re.findall(r'rgb\([^)]+\)', html)
print(f"\nrgb() colors: {len(rgb_colors)} unique")
for c in list(dict.fromkeys(rgb_colors))[:15]:
    print(f"  {c}")

# rgba() colors
rgba_colors = re.findall(r'rgba?\([^)]+\)', html)
print(f"\nAll rgba() (first 10):")
for c in list(dict.fromkeys(rgba_colors))[:10]:
    print(f"  {c}")

# hsl colors
hsl_colors = re.findall(r'hsla?\([^)]+\)', html)
print(f"\nhsl colors: {len(hsl_colors)}")

# Print full style blocks
print("\n=== <style> BLOCKS (first 5000 chars) ===")
style_blocks = re.findall(r'<style[^>]*>([\s\S]*?)</style>', html, re.I)
combined_css = '\n'.join(style_blocks)
print(combined_css[:5000])
print(f"\n[Total CSS length: {len(combined_css)} chars across {len(style_blocks)} <style> blocks]")

# Extract headings
print("\n=== HEADINGS ===")
for tag in ['h1','h2','h3','h4']:
    matches = re.findall(rf'<{tag}[^>]*>(.*?)</{tag}>', html, re.I | re.S)
    for m in matches:
        text = unescape(re.sub(r'<[^>]+>', '', m)).strip()
        if text:
            print(f"  {tag.upper()}: {text[:120]}")

# Extract paragraphs
print("\n=== PARAGRAPHS ===")
for p in re.findall(r'<p[^>]*>(.*?)</p>', html, re.I | re.S):
    text = unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', p))).strip()
    if len(text) > 20:
        print(f"  - {text[:250]}")

# Look for contact info: phone, email, address
print("\n=== CONTACT INFO ===")
phones = re.findall(r'(?:\+?\d[\d\s\-()]{7,}\d)', html)
phones = list(dict.fromkeys(phones))[:15]
print("Phones found:")
for p in phones:
    print(f"  {p}")

emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', html)
print(f"\nEmails found: {list(dict.fromkeys(emails))[:10]}")

# Find address-like text (look for keywords)
print("\nAddress-related paragraphs:")
for kw in ['address', 'location', 'street', 'road', 'box', 'p.o', 'uganda', 'kampala', 'entebbe']:
    for p in re.findall(r'<p[^>]*>([\s\S]*?)</p>', html, re.I | re.S):
        text = unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', p))).strip()
        if kw in text.lower() and len(text) < 300:
            print(f"  [{kw}] {text[:250]}")
            break

# Look for href tel: and mailto:
print("\n=== TEL: AND MAILTO: LINKS ===")
tel_links = re.findall(r'href=["\']tel:([^"\']+)["\']', html, re.I)
mailto_links = re.findall(r'href=["\']mailto:([^"\']+)["\']', html, re.I)
print(f"tel: links: {list(dict.fromkeys(tel_links))}")
print(f"mailto: links: {list(dict.fromkeys(mailto_links))}")

# Print body text (clean)
print("\n=== BODY TEXT (first 4000 chars) ===")
body = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
body = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', body, flags=re.I)
text = unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', body))).strip()
print(text[:4000])
print(f"\n[Total body text: {len(text)} chars]")
