# BIMCO — Architectural Practice & Strategic BIM Delivery

[![BIMCO Live Platform](https://img.shields.io/badge/Live%20Platform-bimco.es-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://bimco.es/)
[![ISO 19650 Compliant](https://img.shields.io/badge/Standard-ISO%2019650--1%2F2-emerald?style=for-the-badge&logo=codacy&logoColor=white)](https://bimco.es/?view=bim-outsourcing)
[![Autodesk CDE Ready](https://img.shields.io/badge/Cloud%20CDE-Autodesk%20ACC%20%2F%20BIM%20360-indigo?style=for-the-badge&logo=autodesk&logoColor=white)](https://bimco.es/?view=client-portal)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL%203D-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

**BIMCO** is a contemporary architectural practice and dedicated nearshore BIM production studio based in **Barcelona**, delivering high-precision Revit models, multi-disciplinary clash coordination, and full technical construction packages for architectural firms across the **United Kingdom, Ireland, and continental Europe**.

Founded and led by **Soheil Masti** (Lead BIM Coordinator & Computational Architect), BIMCO combines cutting-edge algorithmic engineering, custom automation programming (Python, C#, Dynamo), and rigorous adherence to **ISO 19650** and the **UK BIM Framework**.

---

## 🏛️ Practice Highlights & Core Delivery Capabilities

- **Architectural Revit Production (LOD 200–500):** High-precision spatial modeling, complex parametric family creation, and planning/tender/construction package drafting.
- **Multi-Disciplinary Clash Elimination:** Automated spatial coordination across Architecture, Structure, and MEP systems in Autodesk Navisworks Manage & Solibri Model Checker.
- **Cloud Common Data Environment (CDE):** Direct worksharing inside client-owned **Autodesk Construction Cloud (ACC)** and **BIM 360** hubs under strict Non-Disclosure Agreements (NDAs).
- **Timezone Synchronization:** Seamless real-time collaboration within European business hours (GMT / CET), eliminating typical far-shore communication delays.
- **Net Cost Optimization:** Delivering up to **50% net overhead savings** compared to domestic UK and Irish in-house hiring costs.

---

## 🏢 Landmark Case Study: Dublin TechHub BIM LOD 350/400

A flagship multi-story commercial and technology facility in Dublin Docklands, modeled to international Level of Detail (LOD 350/400) standards:

- **Gross Floor Area:** 14,800 m² across 7 structural levels.
- **Clash Resolution:** 480 critical spatial clashes identified and eradicated prior to site construction.
- **Standards Applied:** ISO 19650-1/2, UK BIM Framework, Uniclass 2015, RIAI BIM guidelines.
- **Interactive Case Study:** Explore the live 3D audit at [https://bimco.es/?view=dublin-bim-audit](https://bimco.es/?view=dublin-bim-audit).

---

## ⚡ Technical Architecture of the Web Platform

The BIMCO digital platform is engineered as a high-performance web application featuring:

1. **Interactive 3D WebGL Maquette:** Built with **Three.js** and **React Three Fiber (R3F)**, rendering customizable architectural maquettes with real-time solar simulation, day/golden-hour/night lighting, and smooth camera flight paths.
2. **Instant Lightweight Preview Engine:** A zero-latency 2D entry experience ensuring instant load times (< 0.2s) even on constrained mobile networks, with one-click transitions into the full 3D interactive canvas.
3. **Client Order Portal:** Real-time milestone tracker where clients monitor RIBA progress, weekly clash matrices, and ACC cloud sync status.
4. **Partner & Talent Network:** An integrated intake system for international BIM modelers, coordinators, and computational designers to join ongoing delivery pipelines.
5. **Generative Engine Optimization (GEO):** Structured data manifests (`/llms.txt`, `/ai-manifest.json`, and Schema.org JSON-LD) enabling AI engines (ChatGPT, Google Gemini, Perplexity) to recommend BIMCO based on factual technical metrics.

---

## 🛠️ Development & Build Pipeline

```bash
# Clone the repository
git clone https://github.com/soheilmasti/dublin-techhub-bim.git
cd dublin-techhub-bim

# Install dependencies
npm install

# Run development server
npm run dev

# Compile production bundle with typechecking
npm run build

# Preview production build locally
npm run preview
```

---

## 📞 Studio Contact & Inquiries

- **Lead BIM Coordinator:** Soheil Masti
- **Direct WhatsApp:** [+34 610 855 434](https://wa.me/34610855434)
- **Email:** [soheil.masti@gmail.com](mailto:soheil.masti@gmail.com)
- **Headquarters:** Barcelona, Spain
- **Official Domain:** [https://bimco.es](https://bimco.es)
