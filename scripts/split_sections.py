# -*- coding: utf-8 -*-
"""把 dabbledee-source.html 按 section 切成独立源码片段,供 builder agent 精确参照。
用平衡标签扫描(非正则嵌套)切 <div class="...MARKER..."> 整块。
"""
import io, os, re

SRC = os.path.join(os.path.dirname(__file__), '..', 'docs', 'research', 'dabbledee-source.html')
OUT = os.path.join(os.path.dirname(__file__), '..', 'docs', 'research', 'components')

MARKERS = {
    'loader': 'page-loader',
    'header-nav': 'main-hdr',
    'mobile-nav': 'mobile-nav',
    'slide-home': 'home-sec',
    'slide-fine-art': 'artwork-sec',
    'slide-case-studies': 'casestudies-sec',
    'slide-about': 'about-sec',
    'slide-tldr': 'tldr-sec',
    'slide-coaching': 'coaching-sec',
    'slide-services': 'service-sec',
}

html = io.open(SRC, encoding='utf-8', errors='ignore').read()
TAG = re.compile(r'<(/?)(div|section|nav|main|aside|footer|header)\b[^>]*?(/?)>', re.I)

def cut_block(marker):
    m = re.search(r'<(div|section|nav|header)\b[^>]*class="[^"]*\b' + re.escape(marker) + r'\b[^"]*"', html)
    if not m:
        return None
    start = m.start()
    depth = 0
    for t in TAG.finditer(html, start):
        if t.group(3) == '/':
            continue
        if t.group(1) == '/':
            depth -= 1
            if depth == 0:
                return html[start:t.end()]
        else:
            depth += 1
    return None

os.makedirs(OUT, exist_ok=True)
for name, marker in MARKERS.items():
    block = cut_block(marker)
    path = os.path.join(OUT, name + '.source.html')
    if block:
        io.open(path, 'w', encoding='utf-8').write(block)
        print('%s: %d bytes' % (name, len(block)))
    else:
        print('%s: NOT FOUND (marker=%s)' % (name, marker))
