import sys
import os
import math
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image, ImageDraw, ImageFont

# Ensure asset directory exists
os.makedirs("assets", exist_ok=True)
os.makedirs("web_app", exist_ok=True)

# Define Theme Colors
BG_DARK = RGBColor(7, 26, 47)         # #071A2F Dark Navy
CARD_BG = RGBColor(13, 37, 63)        # #0D253F Container
NEON_BLUE = RGBColor(0, 194, 255)     # #00C2FF Neon Blue
NEON_PURPLE = RGBColor(123, 97, 255)  # #7B61FF Electric Purple
TEXT_WHITE = RGBColor(255, 255, 255)  # #FFFFFF Text
TEXT_MUTED = RGBColor(160, 174, 192)  # #A0AEC0 Muted
ALERT_RED = RGBColor(255, 77, 77)     # #FF4D4D Red
WARN_YELLOW = RGBColor(255, 184, 0)   # #FFB800 Yellow
SUCCESS_GREEN = RGBColor(0, 230, 118)  # #00E676 Green

FONT_HEADER = "Trebuchet MS"
FONT_BODY = "Calibri"

# Generate rich high-resolution photo-style cyber banners and diagrams
def generate_enhanced_assets():
    # 1. Cyber Security Hero Banner Photo
    img1 = Image.new("RGBA", (1200, 700), (7, 26, 47, 255))
    draw = ImageDraw.Draw(img1)
    
    # Cyber grid background
    for x in range(0, 1200, 30):
        draw.line([(x, 0), (x, 700)], fill=(0, 194, 255, 20), width=1)
    for y in range(0, 700, 30):
        draw.line([(0, y), (1200, y)], fill=(0, 194, 255, 20), width=1)
        
    # Concentric glowing radar rings
    cx, cy = 600, 350
    for r in range(50, 300, 50):
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(0, 194, 255, 60), width=2)
        
    # Glowing digital shield
    shield_pts = [(cx, cy - 200), (cx + 160, cy - 120), (cx + 160, cy + 80), (cx, cy + 220), (cx - 160, cy + 80), (cx - 160, cy - 120)]
    draw.polygon(shield_pts, fill=(13, 37, 63, 230), outline=(0, 194, 255, 255), width=4)
    
    # Inner AI Core symbol
    draw.ellipse([cx - 60, cy - 60, cx + 60, cy + 60], fill=(123, 97, 255, 60), outline=(0, 194, 255, 255), width=3)
    draw.line([(cx - 40, cy), (cx + 40, cy)], fill=(0, 230, 118, 255), width=4)
    draw.line([(cx, cy - 40), (cx, cy + 40)], fill=(0, 230, 118, 255), width=4)
    
    img1.save("assets/hero_photo.png")
    
    # 2. Risk Gauge Graphic
    img2 = Image.new("RGBA", (800, 450), (7, 26, 47, 0))
    draw2 = ImageDraw.Draw(img2)
    cx, cy, r = 400, 360, 260
    
    colors = [(0, 230, 118), (255, 184, 0), (255, 140, 0), (255, 77, 77), (180, 0, 0)]
    sector_len = 180 / 5
    for i, col in enumerate(colors):
        sa = 180 + i * sector_len
        ea = sa + sector_len
        draw2.arc([cx - r, cy - r, cx + r, cy + r], start=sa, end=ea, fill=col, width=36)
        
    angle_rad = math.radians(180 + (78 / 100.0) * 180)
    nx = cx + (r - 40) * math.cos(angle_rad)
    ny = cy + (r - 40) * math.sin(angle_rad)
    
    draw2.line([(cx, cy), (nx, ny)], fill=(255, 255, 255, 255), width=6)
    draw2.ellipse([cx - 22, cy - 22, cx + 22, cy + 22], fill=(0, 194, 255, 255), outline=(255, 255, 255, 255), width=3)
    img2.save("assets/risk_gauge.png")

    # 3. Deepfake Face Heatmap
    img3 = Image.new("RGBA", (900, 450), (13, 37, 63, 255))
    draw3 = ImageDraw.Draw(img3)
    draw3.line([(450, 20), (450, 430)], fill=(0, 194, 255, 255), width=4)
    
    # Left Real
    draw3.rectangle([40, 60, 410, 390], outline=(0, 230, 118, 255), width=3)
    draw3.ellipse([160, 100, 290, 260], outline=(0, 230, 118, 200), width=2)
    for px, py in [(200, 150), (250, 150), (225, 185), (205, 220), (245, 220)]:
        draw3.ellipse([px-5, py-5, px+5, py+5], fill=(0, 230, 118, 255))
        
    # Right Fake
    draw3.rectangle([490, 60, 860, 390], outline=(255, 77, 77, 255), width=3)
    draw3.ellipse([610, 100, 740, 260], outline=(255, 77, 77, 200), width=2)
    draw3.ellipse([630, 140, 670, 170], fill=(255, 77, 77, 160))
    draw3.ellipse([645, 205, 705, 235], fill=(255, 77, 77, 180))
    img3.save("assets/deepfake_comparison.png")

    # 4. Behavior Geo Map
    img4 = Image.new("RGBA", (900, 400), (13, 37, 63, 255))
    draw4 = ImageDraw.Draw(img4)
    for x in range(50, 850, 30):
        for y in range(40, 360, 30):
            draw4.ellipse([x, y, x+3, y+3], fill=(0, 194, 255, 40))
            
    draw4.ellipse([220, 140, 240, 160], fill=(0, 230, 118, 255), outline=(255, 255, 255, 255), width=2)
    draw4.ellipse([720, 160, 740, 180], fill=(255, 77, 77, 255), outline=(255, 255, 255, 255), width=2)
    draw4.line([(230, 150), (730, 170)], fill=(255, 77, 77, 200), width=3)
    img4.save("assets/behavior_map.png")

generate_enhanced_assets()
print("Assets regenerated cleanly.")
