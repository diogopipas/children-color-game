#!/usr/bin/env python3
try:
    from PIL import Image, ImageDraw
    import os
    
    os.makedirs('images', exist_ok=True)
    
    # Create blue butterfly
    butterfly = Image.new('RGBA', (300, 250), (0, 0, 0, 0))
    draw = ImageDraw.Draw(butterfly)
    
    # Upper wings
    draw.ellipse([40, 60, 130, 150], fill='#2196F3')  # Left upper wing
    draw.ellipse([170, 60, 260, 150], fill='#2196F3')  # Right upper wing
    
    # Lower wings
    draw.ellipse([50, 130, 120, 200], fill='#64B5F6')  # Left lower wing
    draw.ellipse([180, 130, 250, 200], fill='#64B5F6')  # Right lower wing
    
    # Wing patterns
    draw.ellipse([60, 80, 90, 110], fill='#BBDEFB')
    draw.ellipse([210, 80, 240, 110], fill='#BBDEFB')
    
    # Body
    draw.ellipse([140, 80, 160, 180], fill='#1565C0')
    
    # Antennae
    draw.line([(145, 80), (130, 50)], fill='#0D47A1', width=2)
    draw.line([(155, 80), (170, 50)], fill='#0D47A1', width=2)
    draw.ellipse([126, 46, 134, 54], fill='#0D47A1')
    draw.ellipse([166, 46, 174, 54], fill='#0D47A1')
    
    butterfly.save('images/blue-butterfly.png')
    print('✓ Created blue-butterfly.png')
    
    # Create yellow sunflower
    sunflower = Image.new('RGBA', (300, 300), (0, 0, 0, 0))
    draw = ImageDraw.Draw(sunflower)
    
    # Center of sunflower
    draw.ellipse([100, 100, 200, 200], fill='#8B4513')  # Brown center
    
    # Yellow petals (create multiple petals around center)
    petal_positions = [
        (150, 40, 170, 110),   # Top
        (190, 50, 240, 100),   # Top-right
        (220, 100, 270, 150),  # Right
        (210, 160, 250, 210),  # Bottom-right
        (150, 190, 170, 260),  # Bottom
        (80, 180, 120, 220),   # Bottom-left
        (30, 110, 80, 160),    # Left
        (60, 50, 110, 100),    # Top-left
    ]
    
    for pos in petal_positions:
        draw.ellipse(pos, fill='#FFD700')  # Golden yellow
    
    # Add texture to center
    for i in range(120, 180, 8):
        for j in range(120, 180, 8):
            draw.ellipse([i, j, i+4, j+4], fill='#654321')
    
    # Stem
    draw.rectangle([145, 200, 155, 290], fill='#228B22')  # Green stem
    
    sunflower.save('images/yellow-sunflower.png')
    print('✓ Created yellow-sunflower.png')
    
    print('\n✅ All missing images created successfully!')
    print('\nFinal image list:')
    os.system('ls -lh images/')
    
except ImportError:
    print('PIL/Pillow not installed')

