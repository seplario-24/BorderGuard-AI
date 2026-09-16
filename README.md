# BorderGuard AI — AI-Powered Border Identity & Document Screening Platform

> **"Intelligent Document Screening. Verified Identity. Explainable Risk."**

BorderGuard AI is an **AI-assisted decision-support platform** engineered for border and immigration security officers at international checkpoints. Designed to rapidly analyze passports (ICAO Doc 9303 TD3), visas, national IDs, and identity documents through multi-signal verification: forensic tampering detection, MRZ checksum parsing, biometric facial comparison, simulated database checks, and explainable AI risk scoring.

---

## 🏛️ Key Capabilities

1. **ICAO Doc 9303 MRZ Engine**: Mathematical modulo-10 7-3-1 weight check digit verification across document number, birth date, expiry, and composite checksum.
2. **Interactive Forensic Canvas Viewer**: Real-time Error Level Analysis (ELA), edge Laplacian maps, noise density filters, and tampering bounding box overlays.
3. **Multi-Source Cross-Check**: Uncovers physical alterations where visual OCR text diverges from encoded MRZ characters or registry databases.
4. **Biometric Face Verification**: 512-dimensional facial embedding cosine similarity between document portrait and live camera capture (80% threshold).
5. **Anti-Spoofing & Liveness Telemetry**: Analyzes volumetric facial depth and micro-movement to prevent 2D digital screen replay attacks.
6. **Simulated Central Registries**: Queries simulated National Passport Issuance, Electronic Visa Gateways, and Interpol Watchlist notices.
7. **Explainable AI Risk Engine**: Transparent horizontal factor breakdown with point deltas (+/-) and plain-English explanations.
8. **Section 65B Immutable Audit Ledger**: SHA-256 cryptographic hash-chained event trail for legal evidentiary admissibility.
9. **Officer Decision Workflow**: Explicit officer adjudication with required notes and confirmation before recording disposition.

---

## 🚀 Quickstart Guide

### Option 1: Run with Local Node Server (Recommended)
From the project directory, run:
```bash
node server.js
```
*(Or on Antigravity runtime: `& "C:\Users\skulk\AppData\Roaming\Antigravity\bin\agy-node.cmd" server.js`)*

Open your browser at:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🎯 2-Minute Presentation Demo Script (Flagship Scenario 2)

For maximum impact during a presentation or technical evaluation:

1. **Open Dashboard**: Note the real-time operational statistics and the AI decision-support disclaimer banner.
2. **Launch Flagship Scenario**: Click the red button **"⚡ Run Flagship Demo (Altered Passport)"**.
3. **Observe Automated Pipeline**: The 8-stage verification pipeline executes automatically, showing green checkmarks for OCR and face match, but highlighting red alerts for MRZ checksum and forensic anomalies.
4. **Inspect Risk Score**: Risk Engine computes **76 / 100 — HIGH RISK**.
5. **Explain "WHY?"**:
   - Scroll down to the **Explainable Risk Factor Contribution Breakdown**.
   - Show that the visual passport number `A1234567` failed against the MRZ string `X7429136`.
   - Point out the `+20 pts` penalty for local ELA font compression discontinuity and the `+25 pts` penalty for central registry mismatch.
6. **Switch to Forensic Viewer Tab**:
   - Toggle the **"ELA Map"** and **"Heatmap Overlays"** buttons to see the red bounding box around the altered document number.
7. **Execute Officer Adjudication**:
   - In the Officer Action box, select **[ SEND FOR REVIEW ]**.
   - Add note: *"Altered visual document number detected; MRZ mismatch."*
   - Confirm in the modal.
8. **Verify Audit Trail**:
   - Open the **Audit Trail** page.
   - Click **"Verify Chain Integrity"** to demonstrate that all SHA-256 blocks are cryptographically valid under Section 65B.

---

## ⚖️ Legal & Ethical Positioning

BorderGuard AI operates strictly as an **AI-assisted decision-support system**. The AI does **NOT** autonomously decide whether a traveller is legally permitted to enter or be denied entry. All legal determinations remain exclusively with authorized immigration and border security officers.
