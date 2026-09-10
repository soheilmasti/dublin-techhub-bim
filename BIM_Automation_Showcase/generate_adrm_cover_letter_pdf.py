#!/usr/bin/env python3
"""
Generates a High-Impact, Tailored Cover Letter / Motivation Letter PDF for:
Company: ADRM (Advanced Data Risk Management LLC)
Position: BIM Modeler (Ireland Remote / Dublin)
Candidate: Soheil Masti (Barcelona, Spain)
"""

import os
import subprocess

current_dir = os.path.dirname(os.path.abspath(__file__))
html_file = os.path.join(current_dir, "Soheil_Masti_Cover_Letter_ADRM.html")
pdf_file = os.path.join(current_dir, "Soheil_Masti_Cover_Letter_ADRM_BIM_Modeler.pdf")

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Cover Letter - Soheil Masti - ADRM BIM Modeler</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 16mm 18mm 16mm 18mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      line-height: 1.5;
      font-size: 10pt;
      background: #ffffff;
    }
    .header {
      border-bottom: 2.5px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .header-left h1 {
      font-size: 21pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }
    .header-left h2 {
      font-size: 10.5pt;
      font-weight: 600;
      color: #0284c7;
      margin-top: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .header-right {
      text-align: right;
      font-size: 8.5pt;
      color: #475569;
      line-height: 1.4;
    }
    .header-right a {
      color: #0284c7;
      text-decoration: none;
      font-weight: 600;
    }
    .badge-container {
      margin-top: 4px;
    }
    .badge {
      display: inline-block;
      background: #e0f2fe;
      color: #0369a1;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 7.5pt;
      font-weight: 600;
      margin-right: 4px;
    }
    .meta-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      font-size: 9pt;
      color: #334155;
    }
    .recipient strong {
      color: #0f172a;
      font-size: 9.5pt;
    }
    .subject-line {
      background: #f8fafc;
      border-left: 4px solid #0284c7;
      padding: 7px 12px;
      font-size: 10pt;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 14px;
    }
    p {
      margin-bottom: 10px;
      text-align: justify;
    }
    .key-strengths {
      margin: 10px 0;
      padding-left: 18px;
    }
    .key-strengths li {
      margin-bottom: 5px;
      font-size: 9.3pt;
    }
    .key-strengths li strong {
      color: #0f172a;
    }
    .project-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      padding: 9px 12px;
      margin: 12px 0;
      font-size: 8.8pt;
    }
    .project-box h4 {
      color: #166534;
      font-weight: 700;
      font-size: 9.2pt;
      margin-bottom: 3px;
      display: flex;
      justify-content: space-between;
    }
    .project-box p {
      margin-bottom: 0;
      font-size: 8.8pt;
      color: #14532d;
      text-align: left;
    }
    .signature {
      margin-top: 16px;
    }
    .signature-name {
      font-size: 10.5pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 3px;
    }
    .signature-title {
      font-size: 8.5pt;
      color: #64748b;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <h1>SOHEIL MASTI</h1>
      <h2>Senior Architect & BIM Specialist | Technical Project Lead</h2>
      <div class="badge-container">
        <span class="badge">EU Resident / Full EU Work Authorization</span>
        <span class="badge">15+ Years International BIM & Architectural Leadership</span>
      </div>
    </div>
    <div class="header-right">
      <div>📍 Barcelona, Spain (Available for Ireland Remote / Dublin)</div>
      <div>📞 +34 610 855 434 &nbsp;|&nbsp; 📧 <a href="mailto:soheil.masti@gmail.com">soheil.masti@gmail.com</a></div>
      <div>🔗 <a href="https://linkedin.com/in/soheil-masti">linkedin.com/in/soheil-masti</a></div>
      <div>🌐 Interactive 3D Portfolio: <a href="https://dublin-techhub-bim.vercel.app">dublin-techhub-bim.vercel.app</a></div>
    </div>
  </div>

  <!-- Meta / Date & Recipient -->
  <div class="meta-section">
    <div class="recipient">
      <strong>To: Hiring Team & Technical Recruitment</strong><br>
      ADRM (Advanced Data Risk Management LLC)<br>
      Ireland Remote / Dublin Operations
    </div>
    <div style="text-align: right;">
      <strong>Date:</strong> September 2026<br>
      <strong>Job Ref:</strong> BIM Modeler (Ireland Remote - Job ID: 4434331)
    </div>
  </div>

  <!-- Subject -->
  <div class="subject-line">
    Application: BIM Modeler — Ireland Remote / Dublin (ADRM Careers)
  </div>

  <!-- Letter Body -->
  <p>Dear ADRM Hiring Team,</p>

  <p>
    I am writing to express my strong interest in the <strong>BIM Modeler</strong> position at <strong>ADRM (Advanced Data Risk Management)</strong>. 
    As a Senior Architect and BIM Specialist with over <strong>15 years of international experience</strong> across Europe and the Middle East—currently based in 
    Barcelona with full EU work authorization—I specialize in executing advanced BIM workflows (LOD 300 to 400), complex multi-disciplinary coordination, and high-precision Autodesk Revit modeling.
  </p>

  <p>
    Throughout my tenure leading architectural and technical BIM packages at <strong>Gaam Studio</strong> and prior firms, I have directed end-to-end 
    Revit modeling for corporate commercial complexes, public infrastructure, and luxury residential projects. My day-to-day expertise directly aligns with ADRM's focus on high-fidelity modeling, risk mitigation, and seamless data integration:
  </p>

  <ul class="key-strengths">
    <li>
      <strong>Advanced Autodesk Revit & Parametric Family Creation (LOD 300–400):</strong> Comprehensive mastery of Revit architectural and multi-trade modeling, custom parametric family authoring, complex geometry detailing, and automated schedule/BOQ generation.
    </li>
    <li>
      <strong>Multi-Disciplinary Coordination & Clash Mitigation:</strong> Extensive track record integrating Architectural, Structural, and MEP systems, running rigorous clash-detection matrices in Navisworks/Revit, and resolving constructability issues prior to execution.
    </li>
    <li>
      <strong>Technical Compliance & Standards:</strong> Deep familiarity with European building standards, execution detailing (<em>Proyecto de Ejecución</em>), and structured digital delivery under ISO 19650 protocols.
    </li>
    <li>
      <strong>Remote Collaboration & Delivery Agility:</strong> Proven ability to work autonomously across distributed European teams, maintaining strict quality assurance (QA/QC), precise milestone tracking, and seamless cloud model sharing (BIM 360 / ACC).
    </li>
  </ul>

  <!-- Interactive Project Showcase Box -->
  <div class="project-box">
    <h4>
      <span>🏛️ Interactive 3D BIM Showcase: Dublin Tech Hub (LOD 350 / 400)</span>
      <span>Live at: <a href="https://dublin-techhub-bim.vercel.app" style="color:#166534; font-weight:700;">dublin-techhub-bim.vercel.app</a></span>
    </h4>
    <p>
      To demonstrate my technical execution, I authored a coordinated multi-trade model of a 7-story commercial enterprise tower featuring TIA-942 server rooms, InRow cooling, electrical cable containment, and zero-clash MEP overhead routing, accessible live via my interactive WebGL portal above.
    </p>
  </div>

  <p>
    ADRM's reputation for engineering excellence and risk management makes this role an ideal match for my background. 
    Operating from Barcelona (same/compatible timezone as Ireland) with full EU legal work rights, I am prepared to integrate into your remote workflow immediately and contribute to ADRM's ongoing project success.
  </p>

  <p>
    Thank you for your time and consideration. I welcome the opportunity to discuss my technical qualifications and portfolio in an interview.
  </p>

  <!-- Signature -->
  <div class="signature">
    <p>Sincerely,</p>
    <div class="signature-name">Soheil Masti, M.Arch.</div>
    <div class="signature-title">Senior Architect & BIM Specialist<br>Barcelona, Spain | +34 610 855 434 | soheil.masti@gmail.com</div>
  </div>

</body>
</html>
"""

with open(html_file, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f">>> [HTML SAVED] Saved ADRM cover letter to {html_file}")

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

cmd = [
    edge_path,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_file}",
    html_file
]

print(f">>> [PDF COMPILING] Generating executive PDF via Microsoft Edge Headless...")
subprocess.run(cmd, check=True)

if os.path.exists(pdf_file):
    sz_kb = os.path.getsize(pdf_file) / 1024.0
    print(f">>> [SUCCESS] Generated ADRM Cover Letter PDF: {pdf_file} ({round(sz_kb, 1)} KB)")
else:
    print(f">>> [ERROR] PDF generation failed.")
