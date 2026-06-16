#!/usr/bin/env python3
"""Extract structured content sections from the original site HTML."""
import json
import re
from html import unescape

with open('/home/z/my-project/scripts/monchy_home.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

html = data['data']['html']

# Strip scripts and styles
clean = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
clean = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', clean, flags=re.I)
clean = re.sub(r'<!--[\s\S]*?-->', '', clean)

# Find body
body_match = re.search(r'<body[^>]*>([\s\S]*)</body>', clean, re.I)
body = body_match.group(1) if body_match else clean

# Find the content area
content_match = re.search(r'<div[^>]*id="content"[^>]*>([\s\S]*?)(?=<footer|<div[^>]*class="[^"]*site-footer)', body, re.I)
if content_match:
    content = content_match.group(1)
    print("=== CONTENT LENGTH:", len(content))
    
    # Print in chunks
    print("\n--- CONTENT (chars 0-5000) ---")
    print(content[:5000])
    print("\n--- CONTENT (chars 5000-10000) ---")
    print(content[5000:10000])
    print("\n--- CONTENT (chars 10000-15000) ---")
    print(content[10000:15000])
    print("\n--- CONTENT (chars 15000-20000) ---")
    print(content[15000:20000])
    print("\n--- CONTENT (chars 20000-25000) ---")
    print(content[20000:25000])
else:
    print("Content div not found, trying alternative...")
    # Find all paragraphs and headings in the body
    paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', body, re.I | re.S)
    headings = []
    for tag in ['h1','h2','h3','h4']:
        for m in re.finditer(rf'<{tag}[^>]*>(.*?)</{tag}>', body, re.I | re.S):
            text = re.sub(r'<[^>]+>', '', m.group(1)).strip()
            text = unescape(text)
            if text:
                headings.append((tag, text))
    
    print("=== ALL HEADINGS ===")
    for tag, text in headings:
        print(f"  {tag.upper()}: {text}")
    
    print("\n=== ALL PARAGRAPHS (non-trivial) ===")
    for p in paragraphs:
        text = re.sub(r'<[^>]+>', ' ', p)
        text = re.sub(r'\s+', ' ', text).strip()
        text = unescape(text)
        if len(text) > 30:
            print(f"  - {text[:300]}")
