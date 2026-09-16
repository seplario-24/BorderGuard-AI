/**
 * BorderGuard AI - Architecture & "How It Works" Interactive Pipeline Visualizer
 * Renders the 12-stage multi-signal verification architecture with clickable inspection nodes.
 */

export const ArchitectureView = {
  selectedNode: 'forensics',

  nodesData: {
    capture: {
      title: '1. Document Capture & Pre-processing',
      purpose: 'Acquires raw document imagery via optical scanner or upload. Performs perspective correction, deskewing, and illumination normalization.',
      input: 'RGB document scan or camera frame (min 300 DPI).',
      output: 'Rectified planar document image + metadata extraction.',
      algorithm: 'OpenCV planar homography & edge thresholding',
      confidence: '99.4%',
      status: 'ONLINE'
    },
    classification: {
      title: '2. Document Type Classification',
      purpose: 'Categorizes document into Passport (TD3), Visa, National ID (TD1), Driving License, or Residence Permit.',
      input: 'Pre-processed document image.',
      output: 'Document classification label + schema definition.',
      algorithm: 'Multi-class visual classifier with layout fingerprint fallback',
      confidence: '98.7%',
      status: 'ONLINE'
    },
    ocr: {
      title: '3. OCR Information Extraction',
      purpose: 'Extracts structured alphanumeric identity fields (Surname, Given Names, Document Number, Nationality, DOB, Expiry Date).',
      input: 'Segmented text zones.',
      output: 'Key-value JSON payload with character-level confidence scores.',
      algorithm: 'Neural OCR with font kerning analysis',
      confidence: '99.1%',
      status: 'ONLINE'
    },
    mrz: {
      title: '4. MRZ Extraction & Checksum Engine',
      purpose: 'Parses ICAO Doc 9303 Machine Readable Zone lines and executes mathematical Modulo-10 7-3-1 weight check digit validation.',
      input: 'Lower document MRZ band.',
      output: 'Decoded MRZ record + individual and composite check digit status (PASS/FAIL).',
      algorithm: 'ICAO 9303 Annex A Modulo 10 Checksum Algorithm',
      confidence: '100.0%',
      status: 'ONLINE'
    },
    validation: {
      title: '5. Document Rule Validation Engine',
      purpose: 'Executes deterministic chronological and format validation rules: expiry dates, issue vs. expiry ordering, and impossible age checks.',
      input: 'Extracted dates and identifiers.',
      output: 'Document status (VALID, EXPIRED, INVALID FORMAT, SUSPICIOUS).',
      algorithm: 'Deterministic Rule Engine',
      confidence: '100.0%',
      status: 'ONLINE'
    },
    consistency: {
      title: '6. Cross-Field Consistency Engine',
      purpose: 'Compares visual OCR data against MRZ payload, 2D barcode, and linked travel documents to uncover forged visual alterations.',
      input: 'OCR vs. MRZ vs. Barcode payloads.',
      output: 'Consistency concordance score (0–100%) and localized mismatch highlights.',
      algorithm: 'Fuzzy string matching & canonical identity cross-reference',
      confidence: '97.5%',
      status: 'ONLINE'
    },
    forensics: {
      title: '7. AI Tampering & Image Forensics',
      purpose: 'Detects photo replacement, font kerning anomalies, digital consular stamp overlays, and JPEG Error Level Analysis (ELA) discrepancies.',
      input: 'High-resolution document substrate image.',
      output: 'Forensic integrity score + anomaly bounding box coordinates.',
      algorithm: 'Spectral ELA, Laplacian edge discontinuity, and noise distribution mapping',
      confidence: '94.2%',
      status: 'ONLINE'
    },
    face: {
      title: '8. Biometric Face Verification',
      purpose: 'Extracts facial portrait from document and executes cosine distance matching against live checkpoint camera capture.',
      input: 'Document face crop + Live traveller video frame.',
      output: 'Biometric similarity percentage (0–100%) against 80% FMR threshold.',
      algorithm: '512-dimensional facial embedding cosine similarity',
      confidence: '96.8%',
      status: 'ONLINE'
    },
    liveness: {
      title: '9. Anti-Spoofing & Liveness Telemetry',
      purpose: 'Detects presentation attacks (printed photo spoof, digital 2D screen replay, 3D silicone mask) via volumetric depth and ocular micro-movement.',
      input: 'Sequential live camera video stream.',
      output: 'Liveness evaluation (PASS / REVIEW / FAIL) + Presentation attack detection score.',
      algorithm: 'Texture frequency analysis & optical flow motion vectors',
      confidence: '95.0%',
      status: 'ONLINE'
    },
    registry: {
      title: '10. Simulated Database & Watchlist Gateway',
      purpose: 'Queries simulated National Passport Registry, Electronic Visa Gateway, and Interpol SLTD / Purple Notice watchlists.',
      input: 'Document number, holder name, nationality.',
      output: 'Registry match status (VALID, EXPIRED, REVOKED, WATCHLIST HIT).',
      algorithm: 'Cryptographic hash lookup & fuzzy watchlist query',
      confidence: '100.0%',
      status: 'ONLINE (DEMO)'
    },
    risk: {
      title: '11. Explainable Multi-Factor Risk Engine',
      purpose: 'Synthesizes all multi-tier forensic, biometric, checksum, and registry signals into a transparent 0–100 risk score with plain-English rationales.',
      input: 'All upstream module outputs and anomaly weights.',
      output: 'Overall Risk Score (Low / Review / High) + Officer Screening Recommendation.',
      algorithm: 'Configurable Multi-Factor Weighted Risk Model',
      confidence: '94.6%',
      status: 'ONLINE'
    },
    adjudication: {
      title: '12. Officer Adjudication & Audit Logging',
      purpose: 'Enables authorized border officer to make final clearance or referral disposition. Writes immutable SHA-256 hash-chained Section 65B record.',
      input: 'Officer decision action + case notes.',
      output: 'Signed audit block + traveller clearance token.',
      algorithm: 'Section 65B cryptographic SHA-256 hash chaining ledger',
      confidence: '100.0%',
      status: 'ONLINE'
    }
  },

  render(state) {
    const selected = this.nodesData[this.selectedNode] || this.nodesData.forensics;

    const pipelineList = [
      { id: 'capture', name: 'Capture & Rectification', icon: '📷' },
      { id: 'classification', name: 'Type Classification', icon: '🗂️' },
      { id: 'ocr', name: 'OCR Field Extraction', icon: '🔤' },
      { id: 'mrz', name: 'MRZ Modulo-10 Checks', icon: '🔢' },
      { id: 'validation', name: 'Date & Format Rules', icon: '📅' },
      { id: 'consistency', name: 'Cross-Field Consistency', icon: '🔄' },
      { id: 'forensics', name: 'Tampering Forensics & ELA', icon: '🔬' },
      { id: 'face', name: 'Biometric Face Match', icon: '👤' },
      { id: 'liveness', name: 'Liveness Anti-Spoofing', icon: '👁️' },
      { id: 'registry', name: 'Database & Watchlist', icon: '🏛️' },
      { id: 'risk', name: 'Explainable Risk Engine', icon: '⚡' },
      { id: 'adjudication', name: 'Officer Action & Audit', icon: '⚖️' }
    ];

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Title -->
      <div>
        <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">System Architecture &amp; Verification Pipeline</h1>
        <p style="font-size: 12px; color: #94a3b8;">
          Interactive 12-stage multi-signal document inspection, biometric verification, and explainable risk pipeline
        </p>
      </div>

      <!-- Pipeline Diagram Flow -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 14px;">
          Click Any Processing Stage to Inspect Subsystem Telemetry:
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
          ${pipelineList.map((item, idx) => `
            <div 
              class="pipe-node-btn ${this.selectedNode === item.id ? 'active-node' : ''}" 
              data-node="${item.id}"
              style="cursor: pointer; background: ${this.selectedNode === item.id ? '#0284c7' : 'var(--bg-subtle)'}; border: 1px solid ${this.selectedNode === item.id ? '#38bdf8' : 'var(--border-subtle)'}; border-radius: 6px; padding: 10px 14px; display: flex; align-items: center; gap: 8px; transition: all 0.15s;"
            >
              <span>${item.icon}</span>
              <span style="font-size: 12px; font-weight: 700; color: #f8fafc;">${item.name}</span>
            </div>
            ${idx < pipelineList.length - 1 ? `<span style="color: #64748b; font-size: 14px;">→</span>` : ''}
          `).join('')}
        </div>
      </div>

      <!-- Selected Node Detail Card -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-medium); border-radius: 8px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span style="font-size: 11px; text-transform: uppercase; color: #38bdf8; font-weight: 700;">Subsystem Deep Dive</span>
            <h2 style="font-size: 18px; font-weight: 800; color: #f8fafc;">${selected.title}</h2>
          </div>
          <span class="badge badge-low" style="font-size: 12px;">STATUS: ${selected.status}</span>
        </div>

        <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6; margin-bottom: 20px;">
          ${selected.purpose}
        </p>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px;">
          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 6px;">
            <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Primary Inputs</div>
            <div style="font-size: 12px; color: #f8fafc; font-weight: 600; margin-top: 4px;">${selected.input}</div>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 6px;">
            <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Verified Outputs</div>
            <div style="font-size: 12px; color: #f8fafc; font-weight: 600; margin-top: 4px;">${selected.output}</div>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 6px;">
            <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Algorithm / Protocol</div>
            <div style="font-size: 12px; color: #38bdf8; font-weight: 600; font-family: var(--font-mono); margin-top: 4px;">${selected.algorithm}</div>
          </div>

          <div style="background: var(--bg-subtle); padding: 14px; border-radius: 6px;">
            <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Model Benchmark Confidence</div>
            <div style="font-size: 14px; color: #10b981; font-weight: 800; font-family: var(--font-mono); margin-top: 4px;">${selected.confidence}</div>
          </div>
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app) {
    document.querySelectorAll('.pipe-node-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const node = btn.getAttribute('data-node');
        this.selectedNode = node;
        app.renderCurrentView();
      });
    });
  }
};
