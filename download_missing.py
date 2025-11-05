#!/usr/bin/env python3
import urllib.request
import ssl
import os

ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

os.makedirs('images', exist_ok=True)

# Try alternative URLs for missing images
images = {
    'blue-butterfly.png': 'https://www.freeiconspng.com/uploads/blue-butterfly-png-transparent-image-10.png',
    'yellow-sunflower.png': 'https://www.freeiconspng.com/uploads/sunflower-png-18.png',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'Accept': 'image/png,image/*,*/*',
}

print('Downloading missing images...\n')

for filename, url in images.items():
    # Check if already exists
    filepath = os.path.join('images', filename)
    if os.path.exists(filepath) and os.path.getsize(filepath) > 10000:
        print(f'✓ {filename} already exists')
        continue
        
    print(f'Downloading {filename}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
            data = response.read()
            
            if len(data) < 1000:
                print(f'  ⚠ File too small, skipping')
                continue
            
            with open(filepath, 'wb') as f:
                f.write(data)
            size_kb = len(data) / 1024
            print(f'  ✓ Downloaded ({size_kb:.2f} KB)')
    except Exception as e:
        print(f'  ✗ Failed: {e}')

print('\n✅ Done!')
os.system('ls -lh images/')

