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

# Define Colors
BG_DARK = RGBColor(7, 26, 47)         # #071A2F Dark Navy
CARD_BG = RGBColor(13, 37, 63)        # #0D253F Darker Container
CARD_BORDER = RGBColor(0, 194, 255)   # #00C2FF Neon Blue Border
NEON_BLUE = RGBColor(0, 194, 255)     # #00C2FF
NEON_PURPLE = RGBColor(123, 97, 255)  # #7B61FF
TEXT_WHITE = RGBColor(255, 255, 255)  # #FFFFFF
TEXT_MUTED = RGBColor(160, 174, 192)  # #A0AEC0
ALERT_RED = RGBColor(255, 77, 77)     # #FF4D4D
WARN_YELLOW = RGBColor(255, 184, 0)   # #FFB800
SUCCESS_GREEN = RGBColor(0, 230, 118)  # #00E676

FONT_HEADER = "Trebuchet MS"
FONT_BODY = "Calibri"

# Helper to create high-res PIL graphics
def create_cover_graphic(filename="assets/cover_shield.png"):
    img = Image.new("RGBA", (1000, 600), (7, 26, 47, 255))
    draw = ImageDraw.Draw(img)
    
    # Draw cyber grid lines
    for x in range(0, 1000, 40):
        draw.line([(x, 0), (x, 600)], fill=(0, 194, 255, 25), width=1)
    for y in range(0, 600, 40):
        draw.line([(0, y), (1000, y)], fill=(0, 194, 255, 25), width=1)
        
    # Draw central glowing shield shape
    cx, cy = 500, 300
    shield_pts = [(cx, cy - 180), (cx + 140, cy - 110), (cx + 140, cy + 60), (cx, cy + 190), (cx - 140, cy + 60), (cx - 140, cy - 110)]
    
    # Outer glow shield
    for r in range(15, 0, -3):
        glow_pts = [(p[0] + (r if p[0] > cx else -r if p[0] < cx else 0), p[1] + (r if p[1] > cy else -r)) for p in shield_pts]
        draw.polygon(glow_pts, outline=(123, 97, 255, 40), width=3)
        
    draw.polygon(shield_pts, fill=(13, 37, 63, 230), outline=(0, 194, 255, 255), width=4)
    
    # Inner AI Core symbol
    draw.ellipse([cx - 50, cy - 50, cx + 50, cy + 50], fill=(0, 194, 255, 40), outline=(0, 194, 255, 255), width=3)
    draw.polygon([(cx, cy - 30), (cx + 25, cy + 20), (cx - 25, cy + 20)], fill=(123, 97, 255, 200), outline=(255, 255, 255, 255), width=2)
    
    # Glowing node connections
    nodes = [(cx - 220, cy - 100), (cx + 220, cy - 100), (cx - 240, cy + 120), (cx + 240, cy + 120), (cx, cy - 240), (cx, cy + 240)]
    for nx, ny in nodes:
        draw.line([(cx, cy), (nx, ny)], fill=(0, 194, 255, 100), width=2)
        draw.ellipse([nx - 12, ny - 12, nx + 12, ny + 12], fill=(123, 97, 255, 255), outline=(0, 194, 255, 255), width=2)

    img.save(filename)
    return filename

def create_gauge_graphic(filename="assets/risk_gauge.png"):
    img = Image.new("RGBA", (800, 450), (7, 26, 47, 0))
    draw = ImageDraw.Draw(img)
    cx, cy, r = 400, 360, 260
    
    # Draw arc sectors
    colors = [
        (0, 230, 118),   # Green Safe
        (255, 184, 0),   # Yellow Low
        (255, 140, 0),   # Orange Medium
        (255, 77, 77),    # Red High
        (180, 0, 0)      # Dark Red Critical
    ]
    
    # 180 degrees arc split into 5 sectors
    start_angle = 180
    sector_len = 180 / 5
    for i, col in enumerate(colors):
        sa = start_angle + i * sector_len
        ea = sa + sector_len
        draw.arc([cx - r, cy - r, cx + r, cy + r], start=sa, end=ea, fill=col, width=32)
        
    # Needle pointing to 78 (High Threat zone)
    angle_deg = 180 + (78 / 100.0) * 180
    angle_rad = math.radians(angle_deg)
    nx = cx + (r - 40) * math.cos(angle_rad)
    ny = cy + (r - 40) * math.sin(angle_rad)
    
    draw.line([(cx, cy), (nx, ny)], fill=(255, 255, 255, 255), width=6)
    draw.ellipse([cx - 20, cy - 20, cx + 20, cy + 20], fill=(0, 194, 255, 255), outline=(255, 255, 255, 255), width=3)
    
    img.save(filename)
    return filename

def create_deepfake_graphic(filename="assets/deepfake_comparison.png"):
    img = Image.new("RGBA", (900, 450), (13, 37, 63, 255))
    draw = ImageDraw.Draw(img)
    
    # Split divider
    draw.line([(450, 20), (450, 430)], fill=(0, 194, 255, 255), width=4)
    
    # Real side (Left)
    draw.rectangle([40, 60, 410, 390], outline=(0, 230, 118, 255), width=3)
    # Face outline
    draw.ellipse([160, 100, 290, 260], outline=(0, 230, 118, 200), width=2)
    # Facial mesh points (Natural)
    pts = [(200, 150), (250, 150), (225, 185), (205, 220), (245, 220)]
    for px, py in pts:
        draw.ellipse([px-5, py-5, px+5, py+5], fill=(0, 230, 118, 255))
        
    # Fake side (Right - Heatmap anomalies)
    draw.rectangle([490, 60, 860, 390], outline=(255, 77, 77, 255), width=3)
    draw.ellipse([610, 100, 740, 260], outline=(255, 77, 77, 200), width=2)
    # Heatmap anomaly zones
    draw.ellipse([630, 140, 670, 170], fill=(255, 77, 77, 140)) # Eye artifact
    draw.ellipse([645, 205, 705, 235], fill=(255, 77, 77, 160)) # Mouth blend anomaly
    
    img.save(filename)
    return filename

def create_behavior_map(filename="assets/behavior_map.png"):
    img = Image.new("RGBA", (900, 400), (13, 37, 63, 255))
    draw = ImageDraw.Draw(img)
    
    # Draw stylized world continent dots / grid
    for x in range(50, 850, 30):
        for y in range(40, 360, 30):
            draw.ellipse([x, y, x+3, y+3], fill=(0, 194, 255, 40))
            
    # Location 1: New York (Legitimate)
    draw.ellipse([220, 140, 240, 160], fill=(0, 230, 118, 255), outline=(255, 255, 255, 255), width=2)
    # Location 2: Tokyo (Impossible Travel in 10 mins)
    draw.ellipse([720, 160, 740, 180], fill=(255, 77, 77, 255), outline=(255, 255, 255, 255), width=2)
    
    # Dotted connection line for impossible travel
    draw.line([(230, 150), (730, 170)], fill=(255, 77, 77, 200), width=3)
    
    img.save(filename)
    return filename

# Generate all visual assets
create_cover_graphic()
create_gauge_graphic()
create_deepfake_graphic()
create_behavior_map()

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank_layout = prs.slide_layouts[6]

# Helper to set slide background color
def set_bg(slide, color=BG_DARK):
    bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg.fill.solid()
    bg.fill.fore_color.rgb = color
    bg.line.fill.background() # No line
    return bg

# Helper to add standard slide header
def add_header(slide, title_text, category_text="CYBERGUARD XAI"):
    # Header bar background fill
    h_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.9))
    tf = h_box.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
    
    p_cat = tf.paragraphs[0]
    p_cat.text = category_text.upper()
    p_cat.font.name = FONT_HEADER
    p_cat.font.size = Pt(11)
    p_cat.font.bold = True
    p_cat.font.color.rgb = NEON_BLUE
    
    p_title = tf.add_paragraph()
    p_title.text = title_text
    p_title.font.name = FONT_HEADER
    p_title.font.size = Pt(24)
    p_title.font.bold = True
    p_title.font.color.rgb = TEXT_WHITE
    
    # Glowing accent line below header
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.35), Inches(11.733), Inches(0.04))
    line.fill.solid()
    line.fill.fore_color.rgb = NEON_BLUE
    line.line.fill.background()

# Helper to set speaker notes
def set_speaker_notes(slide, notes_text):
    notes_slide = slide.notes_slide
    text_frame = notes_slide.notes_text_frame
    text_frame.text = notes_text

# ==========================================
# SLIDE 1: COVER
# ==========================================
s1 = prs.slides.add_slide(blank_layout)
set_bg(s1)

# Cover Image graphic
s1.shapes.add_picture("assets/cover_shield.png", Inches(6.8), Inches(1.2), width=Inches(6.0))

# Cover Title & Subtitle Box
tbox1 = s1.shapes.add_textbox(Inches(0.8), Inches(1.6), Inches(6.0), Inches(3.5))
tf1 = tbox1.text_frame
tf1.word_wrap = True

p_badge = tf1.paragraphs[0]
p_badge.text = "BPUT HACKATHON 2026 PRESENTATION"
p_badge.font.name = FONT_HEADER
p_badge.font.size = Pt(12)
p_badge.font.bold = True
p_badge.font.color.rgb = NEON_BLUE

p_main = tf1.add_paragraph()
p_main.text = "CYBERGUARD XAI"
p_main.font.name = FONT_HEADER
p_main.font.size = Pt(44)
p_main.font.bold = True
p_main.font.color.rgb = TEXT_WHITE
p_main.space_after = Pt(14)

p_sub = tf1.add_paragraph()
p_sub.text = "AI Powered Cyber Threat, Phishing & Digital Impersonation Detection & Response System"
p_sub.font.name = FONT_BODY
p_sub.font.size = Pt(18)
p_sub.font.color.rgb = TEXT_MUTED

# Team Details Card
team_card = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.3), Inches(5.8), Inches(1.6))
team_card.fill.solid()
team_card.fill.fore_color.rgb = CARD_BG
team_card.line.color.rgb = NEON_PURPLE
team_card.line.width = Pt(1.5)

tf_team = team_card.text_frame
tf_team.word_wrap = True
tf_team.margin_left = Inches(0.2)
tf_team.margin_top = Inches(0.15)

p_t1 = tf_team.paragraphs[0]
p_t1.text = "TEAM: CYBERSHIELD INNOVATORS"
p_t1.font.bold = True
p_t1.font.size = Pt(13)
p_t1.font.color.rgb = NEON_BLUE

p_t2 = tf_team.add_paragraph()
p_t2.text = "Members: Lead Developer | AI Specialist | Backend Engineer"
p_t2.font.size = Pt(11)
p_t2.font.color.rgb = TEXT_WHITE

p_t3 = tf_team.add_paragraph()
p_t3.text = "Institution: Biju Patnaik University of Technology (BPUT)"
p_t3.font.size = Pt(11)
p_t3.font.color.rgb = TEXT_MUTED

set_speaker_notes(s1, "Welcome judges and team members to our presentation on CYBERGUARD XAI. Today we present our multi-modal AI threat intelligence system built for BPUT Hackathon 2026, designed to tackle modern cyber threats with explainable AI precision.")

# ==========================================
# SLIDE 2: PROBLEM STATEMENT
# ==========================================
s2 = prs.slides.add_slide(blank_layout)
set_bg(s2)
add_header(s2, "Problem Statement: The Evolving Cyber Threat Landscape")

problems = [
    ("Phishing Attacks", "Sophisticated email & SMS social engineering luring users into credential disclosure.", NEON_BLUE),
    ("Fake Websites", "Spoofed domain names cloning bank & institution portals for credential harvesting.", NEON_PURPLE),
    ("Digital Impersonation", "Fraudsters posing as executives, government officials, or trusted brands.", NEON_BLUE),
    ("Deepfakes & Synthetic Media", "AI-generated voice cloning & face swapping bypassing identity checks.", NEON_PURPLE),
    ("Account Takeover (ATO)", "Automated credential stuffing attacks exploiting leaked password databases.", ALERT_RED)
]

card_w, card_h = Inches(2.15), Inches(5.2)
start_x = Inches(0.8)
gap = Inches(0.25)

for i, (title, desc, accent) in enumerate(problems):
    x = start_x + i * (card_w + gap)
    card = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.7), card_w, card_h)
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = accent
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.15)
    tf.margin_top = Inches(0.3)
    
    p_num = tf.paragraphs[0]
    p_num.text = f"0{i+1}"
    p_num.font.name = FONT_HEADER
    p_num.font.size = Pt(28)
    p_num.font.bold = True
    p_num.font.color.rgb = accent
    p_num.space_after = Pt(10)
    
    p_t = tf.add_paragraph()
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(15)
    p_t.font.bold = True
    p_t.font.color.rgb = TEXT_WHITE
    p_t.space_after = Pt(12)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = TEXT_MUTED

set_speaker_notes(s2, "Organizations face 5 critical threat vectors: phishing, spoofed domains, impersonation, synthetic media deepfakes, and ATO attacks. Legacy perimeter security fails against AI-driven cyber attacks.")

# ==========================================
# SLIDE 3: WHY THIS PROJECT?
# ==========================================
s3 = prs.slides.add_slide(blank_layout)
set_bg(s3)
add_header(s3, "Why This Project? Urgent Need for AI-Powered Cyber Defense")

stats = [
    ("3.4 Billion", "Daily Phishing Emails Sent Worldwide", NEON_BLUE),
    ("90%", "Data Breaches Initiated via Phishing", NEON_PURPLE),
    ("+43% YoY", "Increase in Digital Identity Fraud", WARN_YELLOW),
    ("$10.5 Trillion", "Global Cybercrime Cost by 2025", ALERT_RED)
]

for i, (metric, label, col) in enumerate(stats):
    r, c = divmod(i, 2)
    x = Inches(0.8 + c * 5.9)
    y = Inches(1.7 + r * 2.6)
    
    scard = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.6), Inches(2.3))
    scard.fill.solid()
    scard.fill.fore_color.rgb = CARD_BG
    scard.line.color.rgb = col
    scard.line.width = Pt(2)
    
    tf = scard.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.3)
    tf.margin_top = Inches(0.25)
    
    p_m = tf.paragraphs[0]
    p_m.text = metric
    p_m.font.name = FONT_HEADER
    p_m.font.size = Pt(36)
    p_m.font.bold = True
    p_m.font.color.rgb = col
    p_m.space_after = Pt(8)
    
    p_l = tf.add_paragraph()
    p_l.text = label
    p_l.font.name = FONT_BODY
    p_l.font.size = Pt(14)
    p_l.font.color.rgb = TEXT_WHITE

set_speaker_notes(s3, "The scale of cybercrime is staggering: 3.4 billion phishing emails daily and $10.5T in projected damages by 2025 underline why real-time AI security is an imperative requirement.")

# ==========================================
# SLIDE 4: EXISTING VS PROPOSED SYSTEM
# ==========================================
s4 = prs.slides.add_slide(blank_layout)
set_bg(s4)
add_header(s4, "System Comparison: Legacy Security vs CyberGuard XAI")

# Existing System Card
c_exist = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.7), Inches(5.7), Inches(5.2))
c_exist.fill.solid()
c_exist.fill.fore_color.rgb = CARD_BG
c_exist.line.color.rgb = ALERT_RED
c_exist.line.width = Pt(2)

tf_e = c_exist.text_frame
tf_e.word_wrap = True
tf_e.margin_left = tf_e.margin_top = Inches(0.3)

p_eh = tf_e.paragraphs[0]
p_eh.text = "EXISTING SYSTEM (LEGACY)"
p_eh.font.name = FONT_HEADER
p_eh.font.size = Pt(18)
p_eh.font.bold = True
p_eh.font.color.rgb = ALERT_RED
p_eh.space_after = Pt(16)

exist_pts = [
    "❌ Manual Detection & Rule-Based Filters",
    "❌ Slow Response Times (Hours or Days)",
    "❌ Black-Box Alerts with Zero Explanation",
    "❌ Fragmented Tools for Email, Web & Media",
    "❌ Vulnerable to AI-Generated Deepfakes & Zero-Days"
]
for pt in exist_pts:
    p = tf_e.add_paragraph()
    p.text = pt
    p.font.name = FONT_BODY
    p.font.size = Pt(13)
    p.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(12)

# Proposed System Card
c_prop = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.7), Inches(5.7), Inches(5.2))
c_prop.fill.solid()
c_prop.fill.fore_color.rgb = CARD_BG
c_prop.line.color.rgb = SUCCESS_GREEN
c_prop.line.width = Pt(2)

tf_p = c_prop.text_frame
tf_p.word_wrap = True
tf_p.margin_left = tf_p.margin_top = Inches(0.3)

p_ph = tf_p.paragraphs[0]
p_ph.text = "PROPOSED SYSTEM (CYBERGUARD XAI)"
p_ph.font.name = FONT_HEADER
p_ph.font.size = Pt(18)
p_ph.font.bold = True
p_ph.font.color.rgb = SUCCESS_GREEN
p_ph.space_after = Pt(16)

prop_pts = [
    "✅ Multi-Modal AI Detection (NLP + Computer Vision)",
    "✅ Real-Time Automated Response (< 1 Second)",
    "✅ Explainable Risk Engine (0-100 Score Breakdown)",
    "✅ Unified Security Operations & Supabase Cloud",
    "✅ Continuous Learning against Evolving AI Threats"
]
for pt in prop_pts:
    p = tf_p.add_paragraph()
    p.text = pt
    p.font.name = FONT_BODY
    p.font.size = Pt(13)
    p.font.color.rgb = TEXT_WHITE
    p.space_after = Pt(12)

set_speaker_notes(s4, "Comparing legacy reactive security with CyberGuard XAI highlights our advantage: automated multi-modal detection, explainable risk scoring, sub-second mitigation, and cloud integration.")

# ==========================================
# SLIDE 5: OBJECTIVES
# ==========================================
s5 = prs.slides.add_slide(blank_layout)
set_bg(s5)
add_header(s5, "Core Objectives: Five Pillars of Defense")

objs = [
    ("1", "Detect Phishing", "Identify malicious email content, intent anomalies, and header spoofing using advanced NLP Transformers."),
    ("2", "Audit Malicious URLs", "Scan web domains for SSL integrity, WHOIS age, entropy, and phishing keyword patterns."),
    ("3", "Identify Deepfakes", "Analyze images and video frames for facial landmark distortions, frequency artifacts, and synthetic heatmaps."),
    ("4", "Behavioral Analytics", "Detect abnormal login patterns, impossible travel velocity, unknown devices, and IP proxy shifts."),
    ("5", "Digital Identity Protection", "Trigger real-time automated mitigations, IP blacklisting, and admin alert dashboards.")
]

for i, (num, title, desc) in enumerate(objs):
    y = Inches(1.7 + i * 1.05)
    
    # Num circle badge
    badge = s5.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.8), y + Inches(0.1), Inches(0.7), Inches(0.7))
    badge.fill.solid()
    badge.fill.fore_color.rgb = NEON_BLUE
    badge.line.fill.background()
    tf_b = badge.text_frame
    p_b = tf_b.paragraphs[0]
    p_b.text = num
    p_b.alignment = PP_ALIGN.CENTER
    p_b.font.name = FONT_HEADER
    p_b.font.size = Pt(18)
    p_b.font.bold = True
    p_b.font.color.rgb = BG_DARK
    
    # Content box
    box = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.7), y, Inches(10.8), Inches(0.9))
    box.fill.solid()
    box.fill.fore_color.rgb = CARD_BG
    box.line.color.rgb = NEON_PURPLE
    box.line.width = Pt(1)
    
    tf_box = box.text_frame
    tf_box.word_wrap = True
    tf_box.margin_left = Inches(0.2)
    tf_box.margin_top = Inches(0.12)
    
    p_bt = tf_box.paragraphs[0]
    p_bt.text = title.upper()
    p_bt.font.name = FONT_HEADER
    p_bt.font.size = Pt(13)
    p_bt.font.bold = True
    p_bt.font.color.rgb = NEON_BLUE
    
    p_bd = tf_box.add_paragraph()
    p_bd.text = desc
    p_bd.font.name = FONT_BODY
    p_bd.font.size = Pt(11)
    p_bd.font.color.rgb = TEXT_WHITE

set_speaker_notes(s5, "Our system is anchored on five strategic pillars: phishing detection, URL inspection, deepfake computer vision, behavioral analytics, and automated identity protection.")

# ==========================================
# SLIDE 6: SYSTEM ARCHITECTURE
# ==========================================
s6 = prs.slides.add_slide(blank_layout)
set_bg(s6)
add_header(s6, "End-to-End System Architecture Pipeline")

flow_stages = [
    ("1. INPUT SOURCES", ["Emails & Headers", "URLs & Domains", "Face/Video Media", "User Login Logs"], NEON_BLUE),
    ("2. AI ENGINE", ["NLP Transformer", "URL Heuristics", "Deepfake CV Model", "Behavioral Anomaly"], NEON_PURPLE),
    ("3. RISK SCORE", ["Weighted Aggregator", "Explainable XAI", "0-100 Gauge Score", "Risk Tier Matrix"], NEON_BLUE),
    ("4. AUTOMATION", ["IP Blacklisting", "Session Revoke", "Alert Dispatch", "Quarantine Action"], NEON_PURPLE),
    ("5. DASHBOARD", ["Live Security Map", "Incident Reports", "Audit Logs", "Cloud Supabase"], SUCCESS_GREEN)
]

bw, bh = Inches(2.15), Inches(4.8)
start_x = Inches(0.8)
gap = Inches(0.25)

for i, (title, items, accent) in enumerate(flow_stages):
    x = start_x + i * (bw + gap)
    card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.8), bw, bh)
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = accent
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.15)
    tf.margin_top = Inches(0.25)
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = accent
    p_t.space_after = Pt(14)
    
    for item in items:
        p_i = tf.add_paragraph()
        p_i.text = f"• {item}"
        p_i.font.name = FONT_BODY
        p_i.font.size = Pt(11)
        p_i.font.color.rgb = TEXT_WHITE
        p_i.space_after = Pt(10)
        
    # Flow arrow indicator
    if i < 4:
        arrow = s6.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, x + bw + Inches(0.04), Inches(4.0), Inches(0.17), Inches(0.3))
        arrow.fill.solid()
        arrow.fill.fore_color.rgb = NEON_BLUE
        arrow.line.fill.background()

set_speaker_notes(s6, "Data flows from input telemetry through our multi-modal AI engine, into the weighted XAI Risk Score Engine, triggering sub-second response automation and real-time dashboard updates.")

# ==========================================
# SLIDE 7: TECHNOLOGY STACK
# ==========================================
s7 = prs.slides.add_slide(blank_layout)
set_bg(s7)
add_header(s7, "Technology Stack & Engineering Ecosystem")

tech_groups = [
    ("FRONTEND", "React.js + Tailwind CSS", "Modern responsive SPA dashboard with Recharts visualization & real-time WebSocket subscriptions.", NEON_BLUE),
    ("BACKEND API", "FastAPI (Python 3.11)", "High-performance asynchronous RESTful microservice API with Pydantic validation.", NEON_PURPLE),
    ("CLOUD DATABASE", "Supabase (PostgreSQL)", "Managed relational database featuring Row Level Security (RLS) & Auth engine.", NEON_BLUE),
    ("AI / ML MODELS", "TensorFlow + OpenCV + Scikit", "Multi-modal AI stack covering NLP transformers, computer vision, and anomaly isolation.", NEON_PURPLE),
    ("HOSTING & DEPLOY", "Vercel + Render Cloud", "CI/CD serverless frontend hosting paired with scalable GPU backend worker instances.", SUCCESS_GREEN)
]

for i, (category, stack, detail, accent) in enumerate(tech_groups):
    y = Inches(1.7 + i * 1.05)
    
    card = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.733), Inches(0.95))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = accent
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.25)
    tf.margin_top = Inches(0.15)
    
    p = tf.paragraphs[0]
    p.text = f"{category}: {stack}"
    p.font.name = FONT_HEADER
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = accent
    p.space_after = Pt(4)
    
    p2 = tf.add_paragraph()
    p2.text = detail
    p2.font.name = FONT_BODY
    p2.font.size = Pt(11)
    p2.font.color.rgb = TEXT_WHITE

set_speaker_notes(s7, "Our stack leverages cutting-edge tools: React and Tailwind for UI, FastAPI for sub-millisecond asynchronous backend APIs, Supabase PostgreSQL, and TensorFlow/OpenCV for multi-modal AI.")

# ==========================================
# SLIDE 8: SUPABASE CLOUD DATABASE
# ==========================================
s8 = prs.slides.add_slide(blank_layout)
set_bg(s8)
add_header(s8, "Database Architecture: Supabase Cloud Integration")

# Left Column: Key Features
c_feat = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.7), Inches(5.6), Inches(5.2))
c_feat.fill.solid()
c_feat.fill.fore_color.rgb = CARD_BG
c_feat.line.color.rgb = NEON_BLUE
c_feat.line.width = Pt(1.5)

tf_f = c_feat.text_frame
tf_f.word_wrap = True
tf_f.margin_left = tf_f.margin_top = Inches(0.3)

p_fh = tf_f.paragraphs[0]
p_fh.text = "SUPABASE ENGINE & SECURITY"
p_fh.font.name = FONT_HEADER
p_fh.font.size = Pt(16)
p_fh.font.bold = True
p_fh.font.color.rgb = NEON_BLUE
p_fh.space_after = Pt(14)

f_pts = [
    "🔐 Built-in JWT Authentication & OAuth",
    "🛡️ Row Level Security (RLS) policies enforcing tenant isolation",
    "⚡ Realtime Postgres Changes Syncing for live alerts",
    "📦 Encrypted Storage Buckets for deepfake media evidence"
]
for pt in f_pts:
    p = tf_f.add_paragraph()
    p.text = pt
    p.font.name = FONT_BODY
    p.font.size = Pt(12)
    p.font.color.rgb = TEXT_WHITE
    p.space_after = Pt(14)

# Right Column: Table Schema Grid
tables = [
    ("users", "User credentials, MFA state, role-based permissions"),
    ("incidents", "Captured threat events, risk scores, XAI explanations"),
    ("evidence", "Phishing email raw headers & media storage links"),
    ("alerts", "Real-time security notifications & dispatch statuses"),
    ("login_logs", "IP addresses, geo-location, device fingerprints, travel velocity")
]

for i, (tname, tdesc) in enumerate(tables):
    y = Inches(1.7 + i * 1.0)
    tbox = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), y, Inches(5.833), Inches(0.9))
    tbox.fill.solid()
    tbox.fill.fore_color.rgb = CARD_BG
    tbox.line.color.rgb = NEON_PURPLE
    tbox.line.width = Pt(1)
    
    tf_t = tbox.text_frame
    tf_t.word_wrap = True
    tf_t.margin_left = Inches(0.2)
    tf_t.margin_top = Inches(0.12)
    
    p_tn = tf_t.paragraphs[0]
    p_tn.text = f"TABLE: public.{tname}"
    p_tn.font.name = FONT_HEADER
    p_tn.font.size = Pt(13)
    p_tn.font.bold = True
    p_tn.font.color.rgb = NEON_PURPLE
    
    p_td = tf_t.add_paragraph()
    p_td.text = tdesc
    p_td.font.name = FONT_BODY
    p_td.font.size = Pt(10.5)
    p_td.font.color.rgb = TEXT_WHITE

set_speaker_notes(s8, "Supabase provides our production-ready cloud backend. We utilize PostgreSQL with Row Level Security, Realtime subscriptions for security alerts, and secure S3-compatible storage for incident evidence.")

# ==========================================
# SLIDE 9: AI MODULE 1 - PHISHING DETECTION
# ==========================================
s9 = prs.slides.add_slide(blank_layout)
set_bg(s9)
add_header(s9, "AI Module 1: Phishing Email NLP Inspection")

# Left Side: Email Interface Simulator
email_box = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.7), Inches(6.0), Inches(5.2))
email_box.fill.solid()
email_box.fill.fore_color.rgb = CARD_BG
email_box.line.color.rgb = ALERT_RED
email_box.line.width = Pt(2)

tf_e = email_box.text_frame
tf_e.word_wrap = True
tf_e.margin_left = tf_e.margin_top = Inches(0.25)

p_eh = tf_e.paragraphs[0]
p_eh.text = "INSPECTED EMAIL HEADER & BODY"
p_eh.font.name = FONT_HEADER
p_eh.font.size = Pt(14)
p_eh.font.bold = True
p_eh.font.color.rgb = ALERT_RED
p_eh.space_after = Pt(10)

email_text = [
    "From: security-alert@bput-update-portal.net",
    "Subject: URGENT: Account Suspension Notice",
    "",
    "Dear User,",
    "Your BPUT student portal access will be TERMINATED within 2 hours due to unverified credentials.",
    "",
    "Click the link below immediately to verify your password:",
    "👉 http://bit.ly/bput-auth-login-verify",
    "",
    "Warning: Failure to comply will result in permanent ban."
]

for line in email_text:
    p = tf_e.add_paragraph()
    p.text = line
    p.font.name = FONT_BODY
    p.font.size = Pt(11)
    if "URGENT" in line or "TERMINATED" in line or "http://" in line:
        p.font.color.rgb = ALERT_RED
        p.font.bold = True
    else:
        p.font.color.rgb = TEXT_WHITE

# Right Side: NLP Analysis Metrics
nlp_cards = [
    ("NLP Transformer Model", "Fine-tuned BERT classification pipeline analyzing semantic intent, urgency flags, and structural anomalies.", NEON_BLUE),
    ("Keyword Threat Extraction", "Detected high-risk triggers: 'URGENT', 'TERMINATED', shortened URL domain, spoofed sender header.", NEON_PURPLE),
    ("Confidence Score: 98.4%", "Classification Verdict: HIGH PROBABILITY PHISHING EMAIL. Automatically flagged & quarantined.", ALERT_RED)
]

for i, (title, desc, col) in enumerate(nlp_cards):
    y = Inches(1.7 + i * 1.7)
    nc = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), y, Inches(5.433), Inches(1.5))
    nc.fill.solid()
    nc.fill.fore_color.rgb = CARD_BG
    nc.line.color.rgb = col
    nc.line.width = Pt(1.5)
    
    tf_n = nc.text_frame
    tf_n.word_wrap = True
    tf_n.margin_left = Inches(0.2)
    tf_n.margin_top = Inches(0.15)
    
    p_nt = tf_n.paragraphs[0]
    p_nt.text = title
    p_nt.font.name = FONT_HEADER
    p_nt.font.size = Pt(14)
    p_nt.font.bold = True
    p_nt.font.color.rgb = col
    p_nt.space_after = Pt(6)
    
    p_nd = tf_n.add_paragraph()
    p_nd.text = desc
    p_nd.font.name = FONT_BODY
    p_nd.font.size = Pt(11)
    p_nd.font.color.rgb = TEXT_WHITE

set_speaker_notes(s9, "AI Module 1 uses NLP Transformers to dissect incoming emails. It isolates urgent call-to-action language, mismatched sender headers, and suspicious URLs, yielding a 98.4% phishing confidence score.")

# ==========================================
# SLIDE 10: AI MODULE 2 - MALICIOUS URL DETECTION
# ==========================================
s10 = prs.slides.add_slide(blank_layout)
set_bg(s10)
add_header(s10, "AI Module 2: Malicious URL Heuristics & Audit")

url_checks = [
    ("HTTPS & SSL Audit", "Missing valid SSL certificate; domain uses self-signed untrusted CA.", ALERT_RED),
    ("Domain Age & WHOIS", "Domain registered 2 days ago via high-risk anonymous registrar.", WARN_YELLOW),
    ("URL Entropy & Depth", "Excessive subdomain nesting & high character randomness score.", NEON_BLUE),
    ("Phishing Keyword Match", "Contains target brand keywords ('bput', 'login', 'verify') in fake subdomains.", NEON_PURPLE)
]

for i, (title, desc, accent) in enumerate(url_checks):
    r, c = divmod(i, 2)
    x = Inches(0.8 + c * 5.9)
    y = Inches(1.7 + r * 2.1)
    
    ucard = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.6), Inches(1.9))
    ucard.fill.solid()
    ucard.fill.fore_color.rgb = CARD_BG
    ucard.line.color.rgb = accent
    ucard.line.width = Pt(1.5)
    
    tf = ucard.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.25)
    tf.margin_top = Inches(0.2)
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(14)
    p_t.font.bold = True
    p_t.font.color.rgb = accent
    p_t.space_after = Pt(8)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = TEXT_WHITE

# Verdict Banner at Bottom
vbanner = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.9), Inches(11.733), Inches(1.0))
vbanner.fill.solid()
vbanner.fill.fore_color.rgb = CARD_BG
vbanner.line.color.rgb = ALERT_RED
vbanner.line.width = Pt(2)

tf_v = vbanner.text_frame
tf_v.word_wrap = True
tf_v.margin_left = Inches(0.3)
tf_v.margin_top = Inches(0.2)

p_vh = tf_v.paragraphs[0]
p_vh.text = "ANALYZED TARGET: http://secure-bput-login-update.xyz"
p_vh.font.name = FONT_HEADER
p_vh.font.size = Pt(13)
p_vh.font.bold = True
p_vh.font.color.rgb = TEXT_WHITE

p_vr = tf_v.add_paragraph()
p_vr.text = "VERDICT: CRITICAL RISK PHISHING DOMAIN -> AUTOMATICALLY BLOCKED IN REVERSE PROXY"
p_vr.font.name = FONT_HEADER
p_vr.font.size = Pt(14)
p_vr.font.bold = True
p_vr.font.color.rgb = ALERT_RED

set_speaker_notes(s10, "Module 2 evaluates domain age, SSL status, character entropy, and trademark spoofing patterns to categorize URLs into Safe, Medium, or Critical threat tiers.")

# ==========================================
# SLIDE 11: AI MODULE 3 - DEEPFAKE DETECTION
# ==========================================
s11 = prs.slides.add_slide(blank_layout)
set_bg(s11)
add_header(s11, "AI Module 3: Deepfake Media & Computer Vision Pipeline")

# Left Side Image Graphic
s11.shapes.add_picture("assets/deepfake_comparison.png", Inches(0.8), Inches(1.7), width=Inches(6.0))

# Right Side CV Explanation Cards
cv_cards = [
    ("Frame Extraction & Face Mesh", "Isolates facial keypoints across video frames to analyze micro-expressions and gaze geometry.", NEON_BLUE),
    ("Spatial Artifact Heatmap", "Identifies boundary blending anomalies, irregular eye blinking, and color mismatch around lips.", NEON_PURPLE),
    ("Frequency Domain Analysis", "Fourier transform reveals GAN/Diffusion generator noise patterns invisible to the human eye.", ALERT_RED)
]

for i, (title, desc, col) in enumerate(cv_cards):
    y = Inches(1.7 + i * 1.7)
    card = s11.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), y, Inches(5.433), Inches(1.5))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = col
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.2)
    tf.margin_top = Inches(0.15)
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(14)
    p_t.font.bold = True
    p_t.font.color.rgb = col
    p_t.space_after = Pt(6)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = TEXT_WHITE

set_speaker_notes(s11, "Module 3 targets synthetic media. Using OpenCV and CNN facial mesh models, it detects spatial blending artifacts, unnatural eye blinking, and generative frequency noise.")

# ==========================================
# SLIDE 12: AI MODULE 4 - BEHAVIOUR ANALYTICS
# ==========================================
s12 = prs.slides.add_slide(blank_layout)
set_bg(s12)
add_header(s12, "AI Module 4: Behavioral Anomaly & Location Tracking")

# Map Graphic
s12.shapes.add_picture("assets/behavior_map.png", Inches(0.8), Inches(1.7), width=Inches(6.0))

# Triggers Panel Right
anomalies = [
    ("Unknown Device Fingerprint", "First-time access attempt from unregistered Linux OS browser agent.", WARN_YELLOW),
    ("Impossible Travel Velocity", "Login from New York at 10:00 AM, followed by Tokyo at 10:10 AM (Speed > 6,000 MPH).", ALERT_RED),
    ("Midnight Access Anomaly", "Login request initiated outside user's historical operational hours (03:14 AM).", NEON_PURPLE),
    ("IP Anomaly & Proxy Detection", "IP address traces back to known commercial VPN exit node.", NEON_BLUE)
]

for i, (title, desc, accent) in enumerate(anomalies):
    y = Inches(1.7 + i * 1.25)
    card = s12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), y, Inches(5.433), Inches(1.15))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = accent
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.2)
    tf.margin_top = Inches(0.12)
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = accent
    p_t.space_after = Pt(4)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_WHITE

set_speaker_notes(s12, "Module 4 monitors behavioral telemetry. Impossible travel calculations, unknown device fingerprints, and off-hours logins trigger instant isolation of compromised sessions.")

# ==========================================
# SLIDE 13: EXPLAINABLE AI RISK ENGINE
# ==========================================
s13 = prs.slides.add_slide(blank_layout)
set_bg(s13)
add_header(s13, "Explainable AI (XAI) Risk Engine Architecture")

# Gauge Chart Graphic
s13.shapes.add_picture("assets/risk_gauge.png", Inches(0.8), Inches(1.6), width=Inches(5.5))

# Formula Box Below Gauge
fbox = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.3), Inches(5.5), Inches(1.6))
fbox.fill.solid()
fbox.fill.fore_color.rgb = CARD_BG
fbox.line.color.rgb = NEON_BLUE
fbox.line.width = Pt(1.5)

tf_f = fbox.text_frame
tf_f.word_wrap = True
tf_f.margin_left = tf_f.margin_top = Inches(0.2)

p_fh = tf_f.paragraphs[0]
p_fh.text = "WEIGHTED RISK SCORE FORMULA"
p_fh.font.name = FONT_HEADER
p_fh.font.size = Pt(12)
p_fh.font.bold = True
p_fh.font.color.rgb = NEON_BLUE

p_form = tf_f.add_paragraph()
p_form.text = "Risk = 30%(URL) + 30%(Email NLP) + 20%(Behaviour) + 20%(Deepfake)"
p_form.font.name = FONT_HEADER
p_form.font.size = Pt(12)
p_form.font.bold = True
p_form.font.color.rgb = TEXT_WHITE
p_form.space_after = Pt(6)

p_ex = tf_f.add_paragraph()
p_ex.text = "Calculated Threat Level: 78 / 100 -> HIGH RISK THREAT DETECTED"
p_ex.font.name = FONT_BODY
p_ex.font.size = Pt(11)
p_ex.font.color.rgb = ALERT_RED

# Risk Tiers Stack Right
tiers = [
    ("0 – 20", "SAFE", "Low risk baseline; normal user activity.", SUCCESS_GREEN),
    ("21 – 40", "LOW RISK", "Mild anomaly; monitor telemetry.", WARN_YELLOW),
    ("41 – 60", "MEDIUM RISK", "Suspicious indicators; enforce 2FA verification.", RGBColor(255, 140, 0)),
    ("61 – 85", "HIGH THREAT", "Strong phishing/deepfake match; quarantine request.", ALERT_RED),
    ("86 – 100", "CRITICAL THREAT", "Severe multi-vector attack; immediate IP & account lock.", RGBColor(180, 0, 0))
]

for i, (rng, label, desc, col) in enumerate(tiers):
    y = Inches(1.7 + i * 1.0)
    card = s13.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.7), y, Inches(5.833), Inches(0.88))
    card.fill.solid()
    card.fill.fore_color.rgb = CARD_BG
    card.line.color.rgb = col
    card.line.width = Pt(1.5)
    
    tf = card.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.2)
    tf.margin_top = Inches(0.12)
    
    p_t = tf.paragraphs[0]
    p_t.text = f"SCORE {rng}: {label}"
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = col
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_WHITE

set_speaker_notes(s13, "CyberGuard XAI eliminates black-box mystery. Our XAI engine combines weighted signals across URLs, emails, behavior, and deepfakes into an intuitive 0–100 gauge score with detailed breakdown reports.")

# ==========================================
# SLIDE 14: UI PROTOTYPE
# ==========================================
s14 = prs.slides.add_slide(blank_layout)
set_bg(s14)
add_header(s14, "UI Prototype: CyberGuard XAI Dashboard Modules")

mockups = [
    ("1. Authentication Portal", "Secure Supabase MFA login portal with biometric option.", NEON_BLUE),
    ("2. Main Threat Dashboard", "Global threat map, incident counters, and live threat feed.", NEON_PURPLE),
    ("3. Email Phishing Inspector", "Interactive email text analyzer highlighting high-risk phrases.", NEON_BLUE),
    ("4. Malicious URL Scanner", "URL search bar with domain age & WHOIS score report.", NEON_PURPLE),
    ("5. Deepfake Media Analyzer", "Drag-and-drop video/photo dropzone with facial mesh heatmap.", ALERT_RED),
    ("6. Incident & Alert Center", "Real-time alert dispatch, IP block actions & CSV exports.", SUCCESS_GREEN)
]

for i, (title, desc, accent) in enumerate(mockups):
    r, c = divmod(i, 3)
    x = Inches(0.8 + c * 3.95)
    y = Inches(1.7 + r * 2.6)
    
    mcard = s14.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(3.7), Inches(2.3))
    mcard.fill.solid()
    mcard.fill.fore_color.rgb = CARD_BG
    mcard.line.color.rgb = accent
    mcard.line.width = Pt(1.5)
    
    tf = mcard.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.2)
    tf.margin_top = Inches(0.2)
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = accent
    p_t.space_after = Pt(8)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_WHITE
    p_d.space_after = Pt(10)
    
    p_st = tf.add_paragraph()
    p_st.text = "[ FULLY FUNCTIONAL UI SCREEN ]"
    p_st.font.name = FONT_HEADER
    p_st.font.size = Pt(9.5)
    p_st.font.bold = True
    p_st.font.color.rgb = TEXT_MUTED

set_speaker_notes(s14, "Our user interface is designed for SOC analysts and administrative security teams. Six core screens provide seamless threat navigation from login to incident response.")

# ==========================================
# SLIDE 15: FEATURES
# ==========================================
s15 = prs.slides.add_slide(blank_layout)
set_bg(s15)
add_header(s15, "Platform Features & Capabilities Overview")

features = [
    ("Live Threat Monitoring", "24/7 continuous stream monitoring across emails & URLs.", NEON_BLUE),
    ("AI Risk Score (XAI)", "Transparent score breakdown with explicit reasoning.", NEON_PURPLE),
    ("Deepfake Media Scanner", "Computer vision facial mesh & heatmap artifact detection.", NEON_BLUE),
    ("Real-Time URL Intelligence", "Instant domain age, SSL, and entropy auditing.", NEON_PURPLE),
    ("Automated Email Protection", "Inbound email header, NLP intent & link parsing.", ALERT_RED),
    ("Admin Audit Reports", "Exportable CSV & PDF security logs for compliance.", SUCCESS_GREEN),
    ("Cloud Supabase Storage", "Encrypted evidence vault & RLS row-level security.", NEON_BLUE),
    ("Real-Time Alerting", "Multi-channel notifications via Slack & Webhooks.", WARN_YELLOW)
]

for i, (title, desc, accent) in enumerate(features):
    r, c = divmod(i, 4)
    x = Inches(0.8 + c * 2.9)
    y = Inches(1.7 + r * 2.6)
    
    fcard = s15.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(2.7), Inches(2.3))
    fcard.fill.solid()
    fcard.fill.fore_color.rgb = CARD_BG
    fcard.line.color.rgb = accent
    fcard.line.width = Pt(1.5)
    
    tf = fcard.text_frame
    tf.word_wrap = True
    tf.margin_left = tf.margin_right = Inches(0.15)
    tf.margin_top = Inches(0.2)
    
    p_t = tf.paragraphs[0]
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = accent
    p_t.space_after = Pt(8)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(10.5)
    p_d.font.color.rgb = TEXT_WHITE

set_speaker_notes(s15, "CyberGuard XAI brings 8 powerhouse features into a unified platform: live monitoring, explainable scoring, deepfake analysis, URL intelligence, email filtering, compliance reporting, cloud persistence, and instant alerts.")

# ==========================================
# SLIDE 16: DEVELOPMENT ROADMAP
# ==========================================
s16 = prs.slides.add_slide(blank_layout)
set_bg(s16)
add_header(s16, "Development Roadmap: 4-Week Execution Plan")

roadmap = [
    ("WEEK 1", "UI & Supabase Core", ["React Dashboard Wireframing", "Tailwind CSS Styling", "Supabase DB Schema Setup", "Auth & RLS Policies"], NEON_BLUE),
    ("WEEK 2", "AI Model Training", ["NLP Transformer Fine-Tuning", "URL Heuristics Feature Engine", "Deepfake CV Model Training", "Behavioral Anomaly Tuning"], NEON_PURPLE),
    ("WEEK 3", "API & XAI Integration", ["FastAPI REST Microservice", "XAI Risk Scoring Logic", "Supabase Realtime Sync", "Webhooks Alert Dispatcher"], NEON_BLUE),
    ("WEEK 4", "Testing & Deployment", ["End-to-End Penetration Audit", "System Stress Testing", "Vercel & Render Cloud Hosting", "Final Hackathon Demo Build"], SUCCESS_GREEN)
]

for i, (week, title, tasks, col) in enumerate(roadmap):
    x = Inches(0.8 + i * 2.95)
    rcard = s16.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, Inches(1.8), Inches(2.75), Inches(5.1))
    rcard.fill.solid()
    rcard.fill.fore_color.rgb = CARD_BG
    rcard.line.color.rgb = col
    rcard.line.width = Pt(1.5)
    
    tf = rcard.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.15)
    tf.margin_top = Inches(0.25)
    
    p_w = tf.paragraphs[0]
    p_w.text = week
    p_w.font.name = FONT_HEADER
    p_w.font.size = Pt(16)
    p_w.font.bold = True
    p_w.font.color.rgb = col
    p_w.space_after = Pt(4)
    
    p_t = tf.add_paragraph()
    p_t.text = title
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = TEXT_WHITE
    p_t.space_after = Pt(14)
    
    for t in tasks:
        p_task = tf.add_paragraph()
        p_task.text = f"✔ {t}"
        p_task.font.name = FONT_BODY
        p_task.font.size = Pt(10.5)
        p_task.font.color.rgb = TEXT_MUTED
        p_task.space_after = Pt(10)

set_speaker_notes(s16, "Our 4-week agile roadmap moves systematically from core UI wireframing and database setup, through AI model training, microservice integration, to cloud deployment and security testing.")

# ==========================================
# SLIDE 17: FUTURE SCOPE
# ==========================================
s17 = prs.slides.add_slide(blank_layout)
set_bg(s17)
add_header(s17, "Future Scope: Expanding Cyber Protection Horizon")

future_items = [
    ("Voice Phishing (Vishing) Detection", "Real-time AI voice stream analysis detecting audio deepfakes & imposter phone calls.", NEON_BLUE),
    ("Browser Extension Integration", "Zero-day browser protection extension scanning web page DOM elements in real-time.", NEON_PURPLE),
    ("Mobile Companion App", "Native iOS & Android app for instant push notifications and remote admin approvals.", NEON_BLUE),
    ("Multilingual AI Assistant", "LLM-driven security assistant offering multi-language threat remediation steps.", NEON_PURPLE),
    ("Government & Defense Grid Sync", "API integration with CERT-In and enterprise SIEM platforms for national cyber defense.", SUCCESS_GREEN)
]

for i, (title, desc, col) in enumerate(future_items):
    y = Inches(1.7 + i * 1.05)
    fcard = s17.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), y, Inches(11.733), Inches(0.95))
    fcard.fill.solid()
    fcard.fill.fore_color.rgb = CARD_BG
    fcard.line.color.rgb = col
    fcard.line.width = Pt(1.5)
    
    tf = fcard.text_frame
    tf.word_wrap = True
    tf.margin_left = Inches(0.25)
    tf.margin_top = Inches(0.15)
    
    p_t = tf.paragraphs[0]
    p_t.text = f"🚀 {title.upper()}"
    p_t.font.name = FONT_HEADER
    p_t.font.size = Pt(13)
    p_t.font.bold = True
    p_t.font.color.rgb = col
    p_t.space_after = Pt(4)
    
    p_d = tf.add_paragraph()
    p_d.text = desc
    p_d.font.name = FONT_BODY
    p_d.font.size = Pt(11)
    p_d.font.color.rgb = TEXT_WHITE

set_speaker_notes(s17, "Our future horizon includes real-time vishing voice analysis, browser extension modules, native mobile apps, multilingual LLM assistants, and CERT-In national cyber grid sync.")

# ==========================================
# SLIDE 18: THANK YOU
# ==========================================
s18 = prs.slides.add_slide(blank_layout)
set_bg(s18)

# Hero Cyber Shield Graphic Right
s18.shapes.add_picture("assets/cover_shield.png", Inches(6.5), Inches(1.5), width=Inches(6.0))

# Left Closing Banner
tbox18 = s18.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(5.8), Inches(3.0))
tf18 = tbox18.text_frame
tf18.word_wrap = True

p_ty = tf18.paragraphs[0]
p_ty.text = "THANK YOU!"
p_ty.font.name = FONT_HEADER
p_ty.font.size = Pt(44)
p_ty.font.bold = True
p_ty.font.color.rgb = NEON_BLUE
p_ty.space_after = Pt(10)

p_motto = tf18.add_paragraph()
p_motto.text = "“Protecting Digital India with Explainable AI Precision.”"
p_motto.font.name = FONT_BODY
p_motto.font.size = Pt(20)
p_motto.font.bold = True
p_motto.font.color.rgb = TEXT_WHITE
p_motto.space_after = Pt(16)

# Contact Box Bottom Left
cbox = s18.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(5.0), Inches(5.5), Inches(1.8))
cbox.fill.solid()
cbox.fill.fore_color.rgb = CARD_BG
cbox.line.color.rgb = NEON_PURPLE
cbox.line.width = Pt(1.5)

tf_c = cbox.text_frame
tf_c.word_wrap = True
tf_c.margin_left = Inches(0.2)
tf_c.margin_top = Inches(0.15)

p_ch = tf_c.paragraphs[0]
p_ch.text = "CONTACT & REPOSITORY"
p_ch.font.name = FONT_HEADER
p_ch.font.size = Pt(12)
p_ch.font.bold = True
p_ch.font.color.rgb = NEON_PURPLE

contacts = [
    "📧 Email: team@cyberguard-xai.io",
    "💻 GitHub: github.com/bput-hackathon/cyberguard-xai",
    "🌐 Web Portal: cyberguard-xai.vercel.app"
]
for c in contacts:
    p = tf_c.add_paragraph()
    p.text = c
    p.font.name = FONT_BODY
    p.font.size = Pt(11)
    p.font.color.rgb = TEXT_WHITE

set_speaker_notes(s18, "Thank you judges and organizers of BPUT Hackathon 2026. We are ready to answer your questions and demonstrate the live CyberGuard XAI prototype.")

# Save presentation
output_path = "CYBERGUARD_XAI_Presentation.pptx"
prs.save(output_path)
print(f"SUCCESS: Presentation saved cleanly to {os.path.abspath(output_path)}")
