#!/usr/bin/env python3
import urllib.request
import ssl
import os

# Create SSL context that doesn't verify certificates (for some CDNs)
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

os.makedirs('images', exist_ok=True)

images = [
    ('blue-car.png', 'https://freepngimg.com/save/3374-blue-car-png/2000x1000'),
    ('green-leaf.png', 'https://freepngimg.com/save/36819-leaf-free-download-png/1024x768'),
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'image/png,image/*,*/*',
    'Referer': 'https://freepngimg.com/'
}

for filename, url in images:
    print(f'Downloading {filename} from {url}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
            content_type = response.headers.get('Content-Type', '')
            data = response.read()
            
            # Check if we got actual image data
            if len(data) < 1000:
                print(f'  ⚠ File too small ({len(data)} bytes), likely a redirect')
                continue
                
            if not data.startswith(b'\x89PNG'):
                print(f'  ⚠ Not a PNG file (got {content_type})')
                continue
            
            filepath = os.path.join('images', filename)
            with open(filepath, 'wb') as f:
                f.write(data)
            size_mb = len(data) / (1024 * 1024)
            print(f'  ✓ Downloaded {filename} ({size_mb:.2f} MB)')
    except Exception as e:
        print(f'  ✗ Failed: {e}')

print('\nChecking final images...')
os.system('ls -lh images/ && file images/*.png')

