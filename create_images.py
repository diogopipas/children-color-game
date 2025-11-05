#!/usr/bin/env python3
try:
    from PIL import Image, ImageDraw
    import os
    
    os.makedirs('images', exist_ok=True)
    
    # Create blue car
    car = Image.new('RGBA', (200, 120), (0, 0, 0, 0))
    draw = ImageDraw.Draw(car)
    # Car body
    draw.rectangle([40, 60, 160, 100], fill='#2196F3')
    # Car top
    draw.rectangle([60, 40, 140, 60], fill='#64B5F6')
    # Windows
    draw.rectangle([65, 45, 95, 58], fill='#90CAF9')
    draw.rectangle([105, 45, 135, 58], fill='#90CAF9')
    # Wheels
    draw.ellipse([45, 95, 65, 115], fill='#212121')
    draw.ellipse([135, 95, 155, 115], fill='#212121')
    car.save('images/blue-car.png')
    print('✓ Created blue-car.png')
    
    # Create green leaf  
    leaf = Image.new('RGBA', (200, 200), (0, 0, 0, 0))
    draw = ImageDraw.Draw(leaf)
    # Leaf shape (simplified)
    points = [(100, 20), (140, 60), (160, 100), (140, 140), (120, 170), 
              (100, 180), (80, 170), (60, 140), (40, 100), (60, 60)]
    draw.polygon(points, fill='#4CAF50')
    # Leaf vein
    draw.line([(100, 20), (100, 180)], fill='#2E7D32', width=3)
    leaf.save('images/green-leaf.png')
    print('✓ Created green-leaf.png')
    
    print('\n✅ All images created successfully!')
    
except ImportError:
    print('PIL/Pillow not installed. Installing...')
    import subprocess
    subprocess.run(['pip3', 'install', 'Pillow'])
    print('Please run this script again.')

