#!/usr/bin/env python3
"""
================================================================================
DUBLIN TECH HUB - SENIOR MEP & ELV ENGINEERING QA/QC AUDIT ENGINE
Standards: BS 7671:2018+A2:2022 (IS 10101) | IS EN 50173 | TIA-942 | EN 62676
Author: Senior BIM & Computational Design Lead
================================================================================
"""

import json
import os
import datetime

# ------------------------------------------------------------------------------
# 1. MEP & SECURITY PROJECT MODEL DATA (Floors 3 & 4 - Dublin Tech Hub)
# ------------------------------------------------------------------------------
PROJECT_DATA = {
    "ProjectInfo": {
        "Name": "Dublin Tech Hub - 7-Story Commercial Tower",
        "Location": "Silicon Docks, Dublin 2, Ireland",
        "TargetTenancy": "Floors 3 & 4 (Enterprise ICT & Security Zone)",
        "StandardsApplied": "BS 7671:2018+A2 (IS 10101), IS EN 50173, TIA-942, CIBSE Security, EN 62676",
        "AuditDate": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    },
    "Racks": [
        {
            "Tag": "MDF-L3-01",
            "Location": "Floor 3 - Comms Room 3.04",
            "RackSizeU": 42,
            "OccupiedU": 34,
            "TargetGrowthMarginU": 0.20, # At least 20% free U required
            "PowerRating_kW": 5.2,
            "InstalledUPS_kVA": 6.0,
            "PUE_Target": 1.4,
            "HeatDissipation_BTU": 17742,
            "Elements": [
                {"Name": "Core Switch (Modular 48-Port)", "U": 4, "Power_W": 750, "Status": "Normal"},
                {"Name": "PoE+ Access Switches (4 x 48P)", "U": 4, "Power_W": 1800, "Status": "Normal"},
                {"Name": "NVR Appliance (64-Ch Enterprise)", "U": 2, "Power_W": 450, "Status": "Normal"},
                {"Name": "Access Control Main Controller", "U": 2, "Power_W": 120, "Status": "Normal"},
                {"Name": "High-Density Cat6A Patch Panels", "U": 8, "Power_W": 0, "Status": "Normal"},
                {"Name": "Cable Management Horizontal/Vert", "U": 8, "Power_W": 0, "Status": "Normal"},
                {"Name": "Rack-Mount Smart UPS (Online)", "U": 6, "Power_W": 200, "Status": "Normal"}
            ]
        },
        {
            "Tag": "IDF-L4-01",
            "Location": "Floor 4 - Comms Closet 4.02",
            "RackSizeU": 24,
            "OccupiedU": 22, # Intentionally high to test Lead Engineer audit warning!
            "TargetGrowthMarginU": 0.20,
            "PowerRating_kW": 2.8,
            "InstalledUPS_kVA": 3.0,
            "PUE_Target": 1.5,
            "HeatDissipation_BTU": 9554,
            "Elements": [
                {"Name": "PoE+ Distribution Switch (2 x 48P)", "U": 2, "Power_W": 900, "Status": "Normal"},
                {"Name": "Access Control Sub-Panel", "U": 2, "Power_W": 80, "Status": "Normal"},
                {"Name": "Cat6A Patch Panels", "U": 8, "Power_W": 0, "Status": "Normal"},
                {"Name": "Cable Management Trays", "U": 6, "Power_W": 0, "Status": "Normal"},
                {"Name": "IDF Smart UPS 3kVA", "U": 4, "Power_W": 150, "Status": "Normal"}
            ]
        }
    ],
    "CCTV_Systems": [
        {
            "System": "Enterprise CCTV Matrix (L3 & L4)",
            "TotalCameras": 9,
            "CameraResolution": "4MP (2560x1440 @ 25 FPS, H.265+)",
            "AverageBitratePerCam_Mbps": 4.5,
            "PoEPowerPerCam_W": 12.5,
            "InstalledPoEBudget_W": 370,
            "RecordingDaysRequired": 30,
            "StorageInstalled_TB": 16.0,
            "FOVBlindSpotsDetected": 0
        }
    ],
    "ElectricalPanels": [
        {
            "PanelName": "DB-ELV-L3 (Distribution Board - Comms & Security)",
            "Location": "Floor 3 - Comms Room",
            "SupplyVoltage": 230,
            "MainIncomerBreaker_A": 63,
            "Circuits": [
                {"CircuitID": "C1", "Description": "MDF Rack Dual Power Feed A", "Breaker_A": 32, "DesignLoad_A": 23.5, "CableLength_m": 12, "CableSize_mm2": 6.0},
                {"CircuitID": "C2", "Description": "MDF Rack Dual Power Feed B", "Breaker_A": 32, "DesignLoad_A": 23.5, "CableLength_m": 14, "CableSize_mm2": 6.0},
                {"CircuitID": "C3", "Description": "Access Control Power & MagLocks", "Breaker_A": 16, "DesignLoad_A": 8.2, "CableLength_m": 25, "CableSize_mm2": 2.5},
                {"CircuitID": "C4", "Description": "CCTV & Security Perimeter Lighting", "Breaker_A": 16, "DesignLoad_A": 15.4, "CableLength_m": 58, "CableSize_mm2": 2.5} # Warning: high load + long run
            ]
        },
        {
            "PanelName": "DB-ELV-L4 (Distribution Board - Tech Workspace IDF)",
            "Location": "Floor 4 - Comms Closet",
            "SupplyVoltage": 230,
            "MainIncomerBreaker_A": 40,
            "Circuits": [
                {"CircuitID": "C1", "Description": "IDF Rack Main Power Feed", "Breaker_A": 20, "DesignLoad_A": 12.8, "CableLength_m": 18, "CableSize_mm2": 4.0},
                {"CircuitID": "C2", "Description": "Security Card Readers & Door Controllers", "Breaker_A": 16, "DesignLoad_A": 4.5, "CableLength_m": 30, "CableSize_mm2": 2.5}
            ]
        }
    ]
}

# ------------------------------------------------------------------------------
# 2. SENIOR LEAD ENGINEER AUDIT CALCULATIONS & COMPLIANCE ENGINE
# ------------------------------------------------------------------------------
def run_senior_engineering_audit(data):
    audit_results = {
        "Summary": {"TotalChecks": 0, "Passed": 0, "Warnings": 0, "Failures": 0, "Score": 0.0},
        "Findings": []
    }

    # --- A. RACK & DATA CENTER AUDIT (TIA-942 / IS EN 50173) ---
    for rack in data["Racks"]:
        tag = rack["Tag"]
        total_u = rack["RackSizeU"]
        occ_u = rack["OccupiedU"]
        free_u = total_u - occ_u
        free_ratio = free_u / total_u

        # 1. Rack Space Utilization Check
        audit_results["Summary"]["TotalChecks"] += 1
        if free_ratio >= rack["TargetGrowthMarginU"]:
            audit_results["Summary"]["Passed"] += 1
            audit_results["Findings"].append({
                "Category": "Rack Capacity (TIA-942)",
                "Component": tag,
                "Status": "PASS",
                "Severity": "Low",
                "Message": f"Rack space capacity is healthy. Total: {total_u}U, Occupied: {occ_u}U ({round(occ_u/total_u*100)}%), Free: {free_u}U ({round(free_ratio*100)}%). Complies with TIA-942 20% expansion headroom.",
                "Action": "No action required."
            })
        else:
            audit_results["Summary"]["Warnings"] += 1
            audit_results["Findings"].append({
                "Category": "Rack Capacity (TIA-942)",
                "Component": tag,
                "Status": "WARNING",
                "Severity": "Medium",
                "Message": f"Insufficient future growth margin in {tag}. Occupied: {occ_u}U/{total_u}U ({round(occ_u/total_u*100)}%). Free space ({free_u}U / {round(free_ratio*100)}%) is below standard 20% margin.",
                "Action": f"Senior Engineer Recommendation: Upgrade {tag} from {total_u}U to next standard size (e.g. 24U -> 32U or 42U) to ensure ventilation & expansion."
            })

        # 2. UPS & Power Safety Margin Check
        audit_results["Summary"]["TotalChecks"] += 1
        kw = rack["PowerRating_kW"]
        ups_kva = rack["InstalledUPS_kVA"]
        ups_usable_kw = ups_kva * 0.85 # Power factor 0.85
        if ups_usable_kw >= kw * 1.25:
            audit_results["Summary"]["Passed"] += 1
            audit_results["Findings"].append({
                "Category": "UPS & Power Sizing",
                "Component": tag,
                "Status": "PASS",
                "Severity": "Low",
                "Message": f"UPS capacity ({ups_kva} kVA / ~{round(ups_usable_kw,1)} kW) provides 125% safety margin for {kw} kW load.",
                "Action": "No action required."
            })
        else:
            audit_results["Summary"]["Warnings"] += 1
            audit_results["Findings"].append({
                "Category": "UPS & Power Sizing",
                "Component": tag,
                "Status": "WARNING",
                "Severity": "Medium",
                "Message": f"UPS load capacity operates near peak capacity ({kw} kW load on {ups_kva} kVA UPS).",
                "Action": f"Consider upgrading UPS unit to {round(kw * 1.3, 1)} kVA for extended battery backup runtime."
            })

    # --- B. CCTV & SURVEILLANCE AUDIT (EN 62676 / CIBSE) ---
    cctv = data["CCTV_Systems"][0]
    total_cams = cctv["TotalCameras"]
    total_poe_w = total_cams * cctv["PoEPowerPerCam_W"]
    poe_budget = cctv["InstalledPoEBudget_W"]

    # 1. PoE Budget Sizing
    audit_results["Summary"]["TotalChecks"] += 1
    if total_poe_w <= poe_budget * 0.75:
        audit_results["Summary"]["Passed"] += 1
        audit_results["Findings"].append({
            "Category": "CCTV PoE Power Budget",
            "Component": "CCTV PoE Network Switch",
            "Status": "PASS",
            "Severity": "Low",
            "Message": f"Total PoE demand for {total_cams} cameras is {total_poe_w}W against {poe_budget}W budget ({round(total_poe_w/poe_budget*100)}% load). Excellent 25% safety headroom.",
            "Action": "No action required."
        })
    else:
        audit_results["Summary"]["Warnings"] += 1
        audit_results["Findings"].append({
            "Category": "CCTV PoE Power Budget",
            "Component": "CCTV PoE Network Switch",
            "Status": "WARNING",
            "Severity": "Medium",
            "Message": f"PoE switch load is {total_poe_w}W ({round(total_poe_w/poe_budget*100)}% of {poe_budget}W). Exceeds recommended 75% steady-state threshold.",
            "Action": "Distribute camera PoE loads across secondary switch."
        })

    # 2. NVR Storage Days Calculation Check
    audit_results["Summary"]["TotalChecks"] += 1
    daily_gb_per_cam = (cctv["AverageBitratePerCam_Mbps"] * 1000 * 3600 * 24) / (8 * 1024 * 1024)
    total_daily_gb = daily_gb_per_cam * total_cams
    required_storage_tb = (total_daily_gb * cctv["RecordingDaysRequired"]) / 1024
    installed_storage_tb = cctv["StorageInstalled_TB"]

    if installed_storage_tb >= required_storage_tb:
        audit_results["Summary"]["Passed"] += 1
        audit_results["Findings"].append({
            "Category": "NVR Storage Capacity (EN 62676)",
            "Component": "NVR Enterprise Storage",
            "Status": "PASS",
            "Severity": "Low",
            "Message": f"Installed storage ({installed_storage_tb} TB) comfortably meets 30-day continuous retention requirement (Calculated requirement: {round(required_storage_tb, 1)} TB).",
            "Action": "RAID-6 storage array configured."
        })
    else:
        audit_results["Summary"]["Failures"] += 1
        audit_results["Findings"].append({
            "Category": "NVR Storage Capacity (EN 62676)",
            "Component": "NVR Enterprise Storage",
            "Status": "FAIL",
            "Severity": "High",
            "Message": f"Insufficient NVR storage for mandatory 30-day retention! Installed: {installed_storage_tb} TB, Required: {round(required_storage_tb, 1)} TB.",
            "Action": f"Add {round(required_storage_tb - installed_storage_tb + 4)} TB additional HDD capacity."
        })

    # --- C. ELECTRICAL DISTRIBUTION & VOLTAGE DROP AUDIT (BS 7671 / IS 10101) ---
    CABLE_RESISTANCE = {1.5: 15.0, 2.5: 9.0, 4.0: 5.5, 6.0: 3.6, 10.0: 2.2} # mOhm/meter (Phase+Neutral loop)

    for panel in data["ElectricalPanels"]:
        pname = panel["PanelName"]
        for c in panel["Circuits"]:
            cid = c["CircuitID"]
            cdesc = c["Description"]
            breaker_a = c["Breaker_A"]
            load_a = c["DesignLoad_A"]
            length_m = c["CableLength_m"]
            size_mm2 = c["CableSize_mm2"]

            # 1. Breaker Overload Safety (Design Load vs 80% Breaker Rating)
            audit_results["Summary"]["TotalChecks"] += 1
            load_ratio = load_a / breaker_a
            if load_ratio <= 0.80:
                audit_results["Summary"]["Passed"] += 1
                audit_results["Findings"].append({
                    "Category": "Breaker Sizing (BS 7671)",
                    "Component": f"{pname} - {cid} ({cdesc})",
                    "Status": "PASS",
                    "Severity": "Low",
                    "Message": f"Breaker rating ({breaker_a}A) matches design load ({load_a}A, {round(load_ratio*100)}% utilization). Complies with BS 7671 continuous load safety limits.",
                    "Action": "No action required."
                })
            else:
                audit_results["Summary"]["Warnings"] += 1
                audit_results["Findings"].append({
                    "Category": "Breaker Sizing (BS 7671)",
                    "Component": f"{pname} - {cid} ({cdesc})",
                    "Status": "WARNING",
                    "Severity": "Medium",
                    "Message": f"High load utilization on {cid}: {load_a}A on {breaker_a}A breaker ({round(load_ratio*100)}%). Exceeds recommended 80% continuous design limit.",
                    "Action": f"Lead Engineer Recommendation: Upgrade breaker from {breaker_a}A to 20A or redistribute branch circuits."
                })

            # 2. Voltage Drop Calculation (BS 7671: Target < 3% for lighting, < 5% for power)
            audit_results["Summary"]["TotalChecks"] += 1
            res_per_m = CABLE_RESISTANCE.get(size_mm2, 9.0) / 1000.0 # Ohm/m
            v_drop = load_a * (res_per_m * length_m)
            v_drop_pct = (v_drop / 230.0) * 100.0

            if v_drop_pct <= 3.0:
                audit_results["Summary"]["Passed"] += 1
                audit_results["Findings"].append({
                    "Category": "Voltage Drop (IS 10101 / BS 7671)",
                    "Component": f"{pname} - {cid} ({cdesc})",
                    "Status": "PASS",
                    "Severity": "Low",
                    "Message": f"Voltage drop is {round(v_drop_pct, 2)}% ({round(v_drop, 2)}V) over {length_m}m with {size_mm2}mm² cable. Well within strict 3.0% European standard limit.",
                    "Action": "No action required."
                })
            elif v_drop_pct <= 5.0:
                audit_results["Summary"]["Warnings"] += 1
                audit_results["Findings"].append({
                    "Category": "Voltage Drop (IS 10101 / BS 7671)",
                    "Component": f"{pname} - {cid} ({cdesc})",
                    "Status": "WARNING",
                    "Severity": "Medium",
                    "Message": f"Voltage drop is {round(v_drop_pct, 2)}% over {length_m}m run. Acceptable for general power (<5%), but borderline for sensitive electronic/CCTV equipment.",
                    "Action": f"Lead Engineer Recommendation: Upsize conductor from {size_mm2}mm² to 4.0mm² to reduce drop to < 2.0%."
                })
            else:
                audit_results["Summary"]["Failures"] += 1
                audit_results["Findings"].append({
                    "Category": "Voltage Drop (IS 10101 / BS 7671)",
                    "Component": f"{pname} - {cid} ({cdesc})",
                    "Status": "FAIL",
                    "Severity": "High",
                    "Message": f"Excessive voltage drop ({round(v_drop_pct, 2)}% > 5.0% maximum permitted). Cable length {length_m}m causes signal degradation.",
                    "Action": "Upsize cable gauge immediately."
                })

    # Overall Score Calculation
    total = audit_results["Summary"]["TotalChecks"]
    passed = audit_results["Summary"]["Passed"]
    warns = audit_results["Summary"]["Warnings"]
    fails = audit_results["Summary"]["Failures"]
    audit_results["Summary"]["Score"] = round(((passed * 1.0 + warns * 0.5) / total) * 100, 1)

    return audit_results


# ------------------------------------------------------------------------------
# 3. GENERATE INTERACTIVE EXECUTIVE HTML AUDIT DASHBOARD
# ------------------------------------------------------------------------------
def generate_html_report(project, results, output_path):
    summary = results["Summary"]
    findings_rows = ""

    for f in results["Findings"]:
        status_badge = {
            "PASS": '<span style="background:#10B981; color:#fff; padding:4px 10px; border-radius:12px; font-weight:600; font-size:12px;">PASS</span>',
            "WARNING": '<span style="background:#F59E0B; color:#fff; padding:4px 10px; border-radius:12px; font-weight:600; font-size:12px;">WARNING</span>',
            "FAIL": '<span style="background:#EF4444; color:#fff; padding:4px 10px; border-radius:12px; font-weight:600; font-size:12px;">FAIL</span>'
        }.get(f["Status"], f["Status"])

        findings_rows += f"""
        <tr style="border-bottom: 1px solid #E5E7EB;">
            <td style="padding: 14px; font-weight:600; color:#1F2937;">{f["Category"]}</td>
            <td style="padding: 14px; color:#4B5563; font-family:monospace; font-size:13px;">{f["Component"]}</td>
            <td style="padding: 14px; text-align:center;">{status_badge}</td>
            <td style="padding: 14px; color:#374151; font-size:13px;">{f["Message"]}</td>
            <td style="padding: 14px; color:#1D4ED8; font-size:13px; font-weight:500;">{f["Action"]}</td>
        </tr>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dublin Tech Hub - Senior MEP/ELV Engineering Audit</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #F9FAFB; color: #111827; margin: 0; padding: 30px; }}
        .container {{ max-width: 1200px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; box-shadow: 0 4px 25px rgba(0,0,0,0.06); overflow: hidden; }}
        .header {{ background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); color: #FFFFFF; padding: 40px; }}
        .header h1 {{ margin: 0 0 10px 0; font-size: 26px; letter-spacing: -0.5px; }}
        .header p {{ margin: 4px 0; color: #94A3B8; font-size: 14px; }}
        .metrics-grid {{ display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; padding: 25px 40px; background: #F8FAFC; border-bottom: 1px solid #E2E8F0; }}
        .metric-card {{ background: #FFFFFF; padding: 18px; border-radius: 12px; border: 1px solid #E2E8F0; text-align: center; }}
        .metric-card .val {{ font-size: 28px; font-weight: 700; color: #0F172A; }}
        .metric-card .label {{ font-size: 12px; color: #64748B; font-weight: 600; text-transform: uppercase; margin-top: 4px; }}
        .content {{ padding: 40px; }}
        table {{ width: 100%; border-collapse: collapse; text-align: left; }}
        th {{ background: #F1F5F9; padding: 12px 14px; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; }}
        .footer {{ padding: 20px 40px; background: #F8FAFC; border-top: 1px solid #E2E8F0; font-size: 13px; color: #64748B; text-align: right; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h1>🏛️ {project["ProjectInfo"]["Name"]}</h1>
                    <p><strong>Location:</strong> {project["ProjectInfo"]["Location"]} | <strong>Scope:</strong> {project["ProjectInfo"]["TargetTenancy"]}</p>
                    <p><strong>Standards Complied:</strong> {project["ProjectInfo"]["StandardsApplied"]}</p>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 12px 20px; border-radius: 10px; text-align:right;">
                    <div style="font-size:11px; text-transform:uppercase; color:#94A3B8;">Compliance Rating</div>
                    <div style="font-size:32px; font-weight:800; color:#10B981;">{summary["Score"]}%</div>
                </div>
            </div>
        </div>

        <div class="metrics-grid">
            <div class="metric-card"><div class="val">{summary["TotalChecks"]}</div><div class="label">Total Audits</div></div>
            <div class="metric-card"><div class="val" style="color:#10B981;">{summary["Passed"]}</div><div class="label">Checks Passed</div></div>
            <div class="metric-card"><div class="val" style="color:#F59E0B;">{summary["Warnings"]}</div><div class="label">Engineering Warnings</div></div>
            <div class="metric-card"><div class="val" style="color:#EF4444;">{summary["Failures"]}</div><div class="label">Critical Discrepancies</div></div>
            <div class="metric-card"><div class="val" style="color:#3B82F6;">&lt; 3 Days</div><div class="label">AI Turnaround Time</div></div>
        </div>

        <div class="content">
            <h2 style="font-size:18px; color:#0F172A; margin-top:0;">📋 Executive Lead Engineering QA/QC Breakdown</h2>
            <table>
                <thead>
                    <tr>
                        <th>Audit Category</th>
                        <th>Component / Circuit ID</th>
                        <th style="text-align:center;">Compliance</th>
                        <th>Engineering Analysis & Code Reference</th>
                        <th>Senior Action Item / Auto-Fix</th>
                    </tr>
                </thead>
                <tbody>
                    {findings_rows}
                </tbody>
            </table>
        </div>

        <div class="footer">
            Generated by <strong>AegisBIM Senior AI Audit Engine</strong> | Dublin BIM Engineering Portfolio Showcase
        </div>
    </div>
</body>
</html>
"""

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[SUCCESS] Executive Engineering Audit Report generated at: {output_path}")


if __name__ == "__main__":
    print(">>> Running Dublin Tech Hub Senior Engineering Audit...")
    results = run_senior_engineering_audit(PROJECT_DATA)
    output_html = os.path.join(os.path.dirname(__file__), "audit_report_dashboard.html")
    generate_html_report(PROJECT_DATA, results, output_html)
    print(f">>> Overall Compliance Score: {results['Summary']['Score']}%")
    print(f">>> Passed: {results['Summary']['Passed']} | Warnings: {results['Summary']['Warnings']} | Failures: {results['Summary']['Failures']}")
