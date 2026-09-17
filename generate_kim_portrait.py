import math
import random
from PIL import Image, ImageDraw, ImageFilter

# Canvas size for Kim's top friend portrait
width, height = 300, 360
image = Image.new("RGB", (width, height), "#1a2428")
draw = ImageDraw.Draw(image)

# Random seed for repeatable painterly splotches
random.seed(42)

# 1. Background - DE muted oil splotches (dark teal, rust orange, pale ochre)
bg_colors = ["#162125", "#202d33", "#2a3d45", "#a85e2b", "#3d2e24", "#121a1d", "#8c4d26"]
for _ in range(400):
    cx = random.randint(-20, width + 20)
    cy = random.randint(-20, height + 20)
    rx = random.randint(20, 90)
    ry = random.randint(15, 60)
    color = random.choice(bg_colors)
    draw.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=color)

# Smooth background a bit
image = image.filter(ImageFilter.GaussianBlur(radius=8))
draw = ImageDraw.Draw(image)

# 2. Orange Bomber Jacket (Lt. Kitsuragi's iconic orange jacket)
# Collar/Shoulders
jacket_color = "#d65a27"
jacket_dark = "#9e3d16"
jacket_light = "#f0743a"

# Left Shoulder / Right Shoulder / Body
draw.polygon([(20, 360), (70, 240), (120, 220), (180, 220), (230, 240), (280, 360)], fill=jacket_color)

# Jacket shading & brushstrokes
for _ in range(80):
    x1 = random.randint(30, 270)
    y1 = random.randint(220, 360)
    x2 = x1 + random.randint(-30, 30)
    y2 = y1 + random.randint(10, 50)
    w = random.randint(4, 18)
    c = random.choice([jacket_dark, jacket_light, "#b8471b", "#e0652d", "#6e290d"])
    draw.line([x1, y1, x2, y2], fill=c, width=w)

# High collar of aerostatic jacket
draw.polygon([(90, 250), (110, 200), (150, 220), (190, 200), (210, 250), (150, 270)], fill="#7a2a0d")
draw.polygon([(100, 245), (115, 205), (150, 222), (185, 205), (200, 245), (150, 260)], fill=jacket_color)

# Inner Shirt & Collar (White / Light Grey)
draw.polygon([(125, 205), (150, 240), (175, 205), (150, 195)], fill="#d6dcdb")
draw.polygon([(135, 210), (150, 245), (165, 210)], fill="#202a36") # Dark blue tie/vest

# 3. Head & Neck
# Neck
draw.rectangle([130, 170, 170, 210], fill="#b58368")
draw.polygon([(130, 170), (170, 170), (165, 210), (135, 210)], fill="#c99275")

# Head shape
head_box = [105, 70, 195, 180]
draw.ellipse(head_box, fill="#dca082")

# Facials / Shading / Angles (Angular, stoic DE face)
# Jawline, cheekbones, nose bridge
draw.polygon([(110, 130), (150, 185), (190, 130), (175, 100), (125, 100)], fill="#cfa88b")
draw.polygon([(115, 135), (150, 180), (185, 135)], fill="#d9ad8f")

# Shadow on left face / nose
draw.polygon([(110, 110), (145, 182), (130, 182), (105, 130)], fill="#b07d62")
draw.polygon([(145, 105), (152, 145), (140, 150), (142, 105)], fill="#9e6c53") # Nose shadow

# Nose
draw.polygon([(145, 105), (155, 145), (148, 148), (142, 145)], fill="#e8b599")

# Ears
draw.ellipse([98, 110, 112, 138], fill="#ca9174")
draw.ellipse([188, 110, 202, 138], fill="#ba8266")

# 4. Kim's Hair (Neat, dark grey/black parted haircut)
draw.ellipse([100, 58, 200, 115], fill="#21262b")
draw.polygon([(100, 95), (108, 65), (150, 60), (192, 65), (200, 95), (185, 115), (115, 115)], fill="#191d21")
# Hair highlights (grey/white strands)
for _ in range(25):
    hx1 = random.randint(110, 190)
    hy1 = random.randint(62, 85)
    hx2 = hx1 + random.randint(-15, 15)
    hy2 = hy1 + random.randint(5, 20)
    draw.line([hx1, hy1, hx2, hy2], fill=random.choice(["#3a434b", "#4f5b66", "#282e34"]), width=2)

# 5. Kim's Round Glasses (Iconic silver-rimmed round glasses)
# Left Lens
draw.ellipse([115, 108, 145, 138], outline="#d0d5dd", width=3)
draw.ellipse([117, 110, 143, 136], fill="#3d352e") # Dark tinted lens with orange glint
draw.ellipse([120, 113, 135, 125], fill="#634f3d")
draw.line([122, 115, 138, 131], fill="#e07b3c", width=2) # Orange reflection

# Right Lens
draw.ellipse([155, 108, 185, 138], outline="#d0d5dd", width=3)
draw.ellipse([157, 110, 183, 136], fill="#3d352e") # Dark tinted lens
draw.ellipse([160, 113, 175, 125], fill="#634f3d")
draw.line([162, 115, 178, 131], fill="#e07b3c", width=2) # Orange reflection

# Bridge & Earpieces
draw.line([145, 120, 155, 120], fill="#d0d5dd", width=3)
draw.line([102, 120, 115, 120], fill="#d0d5dd", width=2)
draw.line([185, 120, 198, 120], fill="#d0d5dd", width=2)

# Stoic Eyebrows above glasses
draw.line([115, 104, 143, 106], fill="#1e2226", width=3)
draw.line([157, 106, 185, 104], fill="#1e2226", width=3)

# Kim's neat thin mustache & stoic mouth
draw.line([140, 158, 160, 158], fill="#3a2a22", width=2) # Mustache
draw.line([138, 164, 162, 164], fill="#6b4638", width=2) # Mouth line

# Expression lines / calm stoic wrinkles
draw.line([146, 98, 154, 98], fill="#aa7960", width=1) # Brow crease

# 6. Apply expressive Disco Elysium painterly brushstrokes over whole image
for _ in range(150):
    bx1 = random.randint(0, width)
    by1 = random.randint(0, height)
    bx2 = bx1 + random.randint(-25, 25)
    by2 = by1 + random.randint(-15, 15)
    bw = random.randint(1, 5)
    bcolor = random.choice([
        "#d65a27", "#1a2428", "#d6dcdb", "#3a434b", "#a85e2b", "#2a3d45", "#f0743a"
    ])
    draw.line([bx1, by1, bx2, by2], fill=bcolor, width=bw)

# Save final portrait
image.save("public/images/kim_kitsuragi_portrait.png")
print("Kim Kitsuragi portrait generated successfully!")
