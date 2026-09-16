# Project Specifications, Requirements & Ultimate Goal

## Role of This File
This file stores the **product vision, feature requirements, technical specifications, and the ultimate goal** for the BorderGuard AI project.

When asked to **fetch context**, read this file to understand what the project is meant to do, what constraints it must operate under, and what "done" looks like.  
When asked to **update context**, append any newly clarified requirements, revised goals, or added features under the appropriate section.

---

## Ultimate Goal

Build **BorderGuard AI** — a fully browser-based, AI-assisted border screening console for immigration officers. The system should simulate a real-world border control environment using demo/mock data and run entirely on the client side with zero backend dependencies.

The live deployment target is **Vercel** (static hosting), accessible at:  
`https://border-guard-ai2.vercel.app`

GitHub Repository: `https://github.com/seplario-24/BorderGuard-AI`

---

## Technical Constraints

- **Zero backend required** — all data is client-side mock data (no real database, no real API).
- **No external dependencies / npm packages** — pure HTML, CSS, and vanilla JavaScript (ES Modules).
- **Must be deployable on Vercel as a static site** — `vercel.json` uses `@vercel/static` builder.
- **Local development** served via `local-dev-server.js` (renamed from `server.js` to avoid Vercel conflicts).
- All demo data is clearly marked as fictional / for demonstration purposes only.

---

## Project Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Structure  | HTML5 (`index.html`)                    |
| Styling    | Vanilla CSS (`css/borderguard.css`)     |
| Logic      | Vanilla JS ES Modules (`js/`)           |
| Hosting    | Vercel (Static)                         |
| Version Control | GitHub (`seplario-24/BorderGuard-AI`) |
| Local Dev Server | Node.js (`local-dev-server.js`)  |

---

## File / Folder Structure

```
borderguard-ai/
├── context/                    ← AI context folder (this file lives here)
│   ├── chat_history.md
│   ├── specs_and_goals.md
│   └── dev_history.md
├── css/
│   └── borderguard.css
├── js/
│   ├── app.js
│   ├── components/             ← 22 UI components
│   ├── data/                   ← Demo scenario & document data
│   └── services/               ← Business logic services
├── assets/                     ← (empty, reserved for future assets)
├── index.html
├── local-dev-server.js
├── vercel.json
└── README.md
```

---

## Core Features / Modules

### 1. Landing / Login
- Officer authentication screen (`LandingLogin.js`)

### 2. Dashboard
- Overview of active screenings, alerts, and system status (`Dashboard.js`)

### 3. New Screening
- Primary workflow: scan a new traveller's document (`NewScreening.js`)
- Sub-panels:
  - **MRZ Panel** — Machine Readable Zone parsing (`MRZPanel.js`)
  - **OCR Panel** — Optical character recognition simulation (`OCRPanel.js`)
  - **Face Verification** — Biometric match simulation (`FaceVerification.js`)
  - **Document Viewer** — Display document image (`DocumentViewer.js`)
  - **Forensics Panel** — Document tampering/UV analysis (`ForensicsPanel.js`)
  - **Risk Engine Panel** — Risk scoring and flag evaluation (`RiskEnginePanel.js`)
  - **Database Panel** — Watchlist & passport registry check (`DatabasePanel.js`)
  - **Cross-Document Panel** — Cross-reference multiple documents (`CrossDocumentPanel.js`)

### 4. Screening History
- Log of past screenings (`ScreeningHistory.js`)

### 5. Alert Center
- Active security alerts and officer notifications (`AlertCenter.js`)

### 6. Analytics View
- Statistics and data visualization (`AnalyticsView.js`)

### 7. Architecture View
- System architecture diagram/documentation (`ArchitectureView.js`)

### 8. Audit Trail
- Full audit log of officer actions (`AuditTrailView.js`)

### 9. Settings View
- System and officer configuration (`SettingsView.js`)

---

## Services (Business Logic)

| Service              | Purpose                                      |
|----------------------|----------------------------------------------|
| `databaseService.js` | Mock passport, visa, and watchlist registry  |
| `riskService.js`     | Risk scoring engine                          |
| `auditService.js`    | Audit log tracking                           |
| `faceService.js`     | Face verification simulation                 |
| `mrzService.js`      | MRZ parsing logic                            |
| `tamperingService.js`| Document tampering detection simulation      |
| `validationService.js`| Document field validation rules             |

---

## Demo Data

| File                 | Contents                                     |
|----------------------|----------------------------------------------|
| `demoScenarios.js`   | Pre-built screening scenarios for demo use   |
| `sampleDocuments.js` | Sample passport/ID document data             |

---

## Known Decisions & Trade-offs

- `server.js` was renamed to `local-dev-server.js` to prevent Vercel from treating the project as a Node.js app.
- `vercel.json` is required to explicitly force static deployment on Vercel.
- The app is DEMO ONLY — all watchlist hits, passport records, and risk flags are fictional.
