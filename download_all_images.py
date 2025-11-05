#!/usr/bin/env python3
import urllib.request
import ssl
import os

# Create SSL context
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

os.makedirs('images', exist_ok=True)

# Image URLs - using pngimg.com which worked for apple and banana
images = {
    'red-strawberry.png': 'https://pngimg.com/d/strawberry_PNG2637.png',
    'blue-butterfly.png': 'https://pngimg.com/d/butterfly_PNG1051.png',
    'green-frog.png': 'https://pngimg.com/d/frog_PNG3850.png',
    'yellow-star.png': 'https://pngimg.com/d/star_PNG41474.png',
    'red-rose.png': 'https://pngimg.com/d/rose_PNG66720.png',
    'blue-sky.png': 'https://pngimg.com/d/cloud_PNG10.png',
    'green-tree.png': 'https://pngimg.com/d/tree_PNG92722.png',
    'yellow-sunflower.png': 'https://pngimg.com/d/sunflower_PNG13357.png',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'image/png,image/*,*/*',
    'Referer': 'https://pngimg.com/'
}

print('Downloading images from pngimg.com...\n')

for filename, url in images.items():
    print(f'Downloading {filename}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
            data = response.read()
            
            # Check if we got actual image data
            if len(data) < 1000:
                print(f'  ⚠ File too small ({len(data)} bytes), likely a redirect')
                continue
                
            if not data.startswith(b'\x89PNG'):
                print(f'  ⚠ Not a PNG file')
                continue
            
            filepath = os.path.join('images', filename)
            with open(filepath, 'wb') as f:
                f.write(data)
            size_kb = len(data) / 1024
            size_mb = len(data) / (1024 * 1024)
            if size_mb >= 1:
                print(f'  ✓ Downloaded {filename} ({size_mb:.2f} MB)')
            else:
                print(f'  ✓ Downloaded {filename} ({size_kb:.2f} KB)')
    except Exception as e:
        print(f'  ✗ Failed: {e}')

print('\n✅ Download complete! Checking files...')
os.system('ls -lh images/ | grep -v total')

