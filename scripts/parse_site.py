#!/usr/bin/env python3
"""Parse the monchynaturalproducts.com JSON to extract key structural info."""
import json
import re
from html import unescape

with open('/home/z/my-project/scripts/monchy_home.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

page = data.get('data', {})
print("=" * 60)
print("TITLE:", page.get('title', 'N/A'))
print("URL:", page.get('url', 'N/A'))
print("DESCRIPTION:", page.get('description', 'N/A'))
print("EXTERNAL:", page.get('external', 'N/A'))
print("=" * 60)

html = page.get('html', '')

# Extract text content
text = re.sub(r'<[^>]+>', ' ', html)
text = re.sub(r'\s+', ' ', text).strip()
text = unescape(text)

print("\n--- PLAIN TEXT (first 8000 chars) ---")
print(text[:8000])

print("\n\n--- PLAIN TEXT (chars 8000-16000) ---")
print(text[8000:16000])

# Extract images
imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', html, re.I)
print("\n--- IMAGES ---")
for i, src in enumerate(imgs[:30]):
    print(f"  {i+1}. {src}")

# Extract links
links = re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html, re.I)
print("\n--- LINKS (first 30) ---")
for i, href in enumerate(links[:30]):
    print(f"  {i+1}. {href}")

# Extract headings
for tag in ['h1', 'h2', 'h3', 'h4']:
    headings = re.findall(rf'<{tag}[^>]*>(.*?)</{tag}>', html, re.I | re.S)
    if headings:
        print(f"\n--- {tag.upper()} HEADINGS ---")
        for h in headings:
            clean = re.sub(r'<[^>]+>', '', h).strip()
            clean = unescape(clean)
            if clean:
                print(f"  - {clean[:120]}")

# Total length
print(f"\n--- TOTAL HTML LENGTH: {len(html)} chars ---")
print(f"--- TOTAL TEXT LENGTH: {len(text)} chars ---")

# Print metadata
print("\n--- METADATA ---")
print(json.dumps(page.get('metadata', {}), indent=2)[:2000])

# Print HTML head and key sections
print("\n\n--- HTML (first 5000 chars) ---")
print(html[:5000])
