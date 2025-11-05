#!/usr/bin/env python3
import urllib.request
import os

# Create images directory
os.makedirs('images', exist_ok=True)

images = {
    'blue-car.png': 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',  # Placeholder - will replace
    'green-leaf.png': 'https://www.transparentpng.com/thumb/leaf/green-leaf-no-background-GDIYOe.png',  # Green leaf
}

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for filename, url in images.items():
    print(f'Downloading {filename}...')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = response.read()
            filepath = os.path.join('images', filename)
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f'✓ Downloaded {filename} ({len(data)} bytes)')
    except Exception as e:
        print(f'✗ Failed to download {filename}: {e}')

print('\nDone!')

