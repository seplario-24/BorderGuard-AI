import { DocumentViewer } from './DocumentViewer.js';
import { OCRPanel } from './OCRPanel.js';
import { MRZPanel } from './MRZPanel.js';
import { ForensicsPanel } from './ForensicsPanel.js';
import { FaceVerification } from './FaceVerification.js';
import { DatabasePanel } from './DatabasePanel.js';
import { CrossDocumentPanel } from './CrossDocumentPanel.js';
import { RiskEnginePanel } from './RiskEnginePanel.js';

/**
 * BorderGuard AI - Primary Screening Console Component
 * Orchestrates multi-step traveller verification, animated scanning pipeline,
 * document upload/scenario selection, and deep forensic inspection tabs.
 */

export const NewScreening = {
  // NOTE: activeTab is now set fresh on render to prevent stale state across scenario loads
  activeTab: 'risk',

  render(state) {
    // Reset to risk tab on fresh scenario load if navigating to this view freshly
    const scenario = state.currentScenario || {};
    const screening = state.currentScreening || {};
    const isAnalyzing = state.isAnalyzing || false;
    const analysisStep = state.analysisStep || 0;
    const isPoorQuality = scenario.id === 'scenario_12';
    const isLostStolen = scenario.id === 'scenario_10';
    const isMultipleId = scenario.id === 'scenario_11';
    const isMrzMismatch = scenario.id === 'scenario_9';

    const pipelineSteps = [
      { step: 1, label: 'Image Quality Assessment' },
      { step: 2, label: 'Document Detection & Classification' },
      { step: 3, label: 'Neural OCR Field Extraction' },
      { step: 4, label: 'ICAO MRZ Checksum Validation' },
      { step: 5, label: 'Forensic ELA & Tamper Analysis' },
      { step: 6, label: 'ePASSPORT Chip Verification' },
      { step: 7, label: 'Biometric Face & Liveness' },
      { step: 8, label: 'Registries & Watchlist Query' },
      { step: 9, label: 'Identity Consistency Analysis' },
      { step: 10, label: 'Explainable Risk Synthesis' }
    ];

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Traveller & Screening Session Header -->
      <div style="background: var(--bg-card); border: 1px solid ${isPoorQuality ? 'rgba(245,158,11,0.4)' : isLostStolen ? 'rgba(239,68,68,0.4)' : 'var(--border-subtle)'}; border-radius: 8px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 11px; text-transform: uppercase; color: #38bdf8; font-weight: 700; background: rgba(56, 189, 248, 0.1); padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">
              ACTIVE SESSION
            </span>
            <h1 style="font-size: 18px; font-weight: 800; color: #f8fafc; font-family: var(--font-mono);">
              SCREENING ID: ${screening.screeningId || 'BG-2026-001248'}
            </h1>
            ${isLostStolen ? `<span class="badge badge-high">⚠ LOST/STOLEN ALERT</span>` : ''}
            ${isMultipleId ? `<span class="badge badge-review">⚠ IDENTITY LINK</span>` : ''}
            ${isMrzMismatch ? `<span class="badge badge-review">⚠ MRZ/VISUAL MISMATCH</span>` : ''}
            ${isPoorQuality ? `<span class="badge badge-review">⚠ RECAPTURE REQUIRED</span>` : ''}
          </div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            Officer: <strong style="color: #cbd5e1;">OFF-4819</strong> • Checkpoint: <span style="font-family: var(--font-mono); color: #cbd5e1;">DEL-T3-INTL (Lane 04)</span> • Ref: <span style="font-family: var(--font-mono); color: #cbd5e1;">${scenario.traveller?.referenceId || 'TRV-2026-08192'}</span>
          </div>
        </div>

        <!-- Quick Scenario Selector Bar -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Load Scenario:</span>
          <select id="selectDemoScenarioInConsole" class="filter-btn" style="padding: 6px 12px; background: #111c2e; border-color: #2a3f61; color: #38bdf8; font-weight: 700;">
            <option value="scenario_1" ${scenario.id === 'scenario_1' ? 'selected' : ''}>1: Genuine Passport (Low 12)</option>
            <option value="scenario_2" ${scenario.id === 'scenario_2' ? 'selected' : ''}>2: Altered Passport No. (High 76) ★</option>
            <option value="scenario_3" ${scenario.id === 'scenario_3' ? 'selected' : ''}>3: Photo Replacement (High 84)</option>
            <option value="scenario_4" ${scenario.id === 'scenario_4' ? 'selected' : ''}>4: Expired Passport (Review 58)</option>
            <option value="scenario_5" ${scenario.id === 'scenario_5' ? 'selected' : ''}>5: Visa Inconsistency (High 72)</option>
            <option value="scenario_6" ${scenario.id === 'scenario_6' ? 'selected' : ''}>6: Impersonator (High 88)</option>
            <option value="scenario_7" ${scenario.id === 'scenario_7' ? 'selected' : ''}>7: Watchlist Match (High 79)</option>
            <option value="scenario_8" ${scenario.id === 'scenario_8' ? 'selected' : ''}>8: Air-Gapped Offline (Low 15)</option>
            <option value="scenario_9" ${scenario.id === 'scenario_9' ? 'selected' : ''}>9: MRZ/Visual DOB Mismatch (Review 62)</option>
            <option value="scenario_10" ${scenario.id === 'scenario_10' ? 'selected' : ''}>10: Lost/Stolen Document (High 78)</option>
            <option value="scenario_11" ${scenario.id === 'scenario_11' ? 'selected' : ''}>11: Multiple Identity Link (Review 55)</option>
            <option value="scenario_12" ${scenario.id === 'scenario_12' ? 'selected' : ''}>12: Poor Image Quality (Review 45)</option>
          </select>

          <button id="btnRunAnalysisTrigger" class="btn btn-primary" ${isAnalyzing ? 'disabled' : ''}>
            ${isAnalyzing ? `
              <span class="pulse-dot" style="display: inline-block;"></span>
              <span>Scanning Pipeline Active...</span>
            ` : `
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Run AI Multi-Signal Analysis</span>
            `}
          </button>
        </div>
      </div>

      <!-- Animated Pipeline Execution Progress -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">
            AI Verification Pipeline
          </div>
          <div style="font-size: 11px; font-family: var(--font-mono); color: #38bdf8;">
            ${isAnalyzing ? `PROCESSING STAGE ${analysisStep} / 10` : '✓ MULTI-SIGNAL ANALYSIS COMPLETE'}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
          ${pipelineSteps.map(p => {
            const isDone = !isAnalyzing || analysisStep >= p.step;
            const isCurrent = isAnalyzing && analysisStep === p.step;
            const isSkipped = isPoorQuality && (p.step >= 3 && p.step !== 10);
            return `
              <div style="background: ${isDone ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-subtle)'}; border: 1px solid ${isDone ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}; border-radius: 4px; padding: 6px 10px; display: flex; align-items: center; gap: 8px; font-size: 11px;">
                <span style="color: ${isDone ? '#10b981' : (isCurrent ? '#38bdf8' : '#64748b')}; font-weight: 800;">
                  ${isDone ? '✓' : (isCurrent ? '◌' : '○')}
                </span>
                <span style="color: ${isDone ? '#f8fafc' : '#94a3b8'}; font-weight: ${isDone ? '600' : '400'};">
                  ${p.label}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Special Alert for Image Quality scenario -->
      ${isPoorQuality ? `
      <div style="background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.5); border-radius: 8px; padding: 16px 20px; display: flex; align-items: center; gap: 14px;">
        <span style="font-size: 28px;">⚠</span>
        <div>
          <div style="font-size: 14px; font-weight: 800; color: #f59e0b;">IMAGE QUALITY INSUFFICIENT — RECAPTURE REQUIRED</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Document image does not meet minimum quality standards. AI screening pipeline cannot produce reliable results. Please request the traveller to present the document again for scanning.</div>
          <div style="display: flex; gap: 8px; margin-top: 10px;">
            <button id="btnQualityRequest" class="btn btn-warning btn-sm">Request Document Recapture</button>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- Special Alert for Lost/Stolen scenario -->
      ${isLostStolen && state.currentDBResults?.lostStolen?.hasRecord ? `
      <div style="background: rgba(239,68,68,0.12); border: 2px solid rgba(239,68,68,0.6); border-radius: 8px; padding: 16px 20px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <span style="font-size: 20px;">🔴</span>
          <div style="font-size: 14px; font-weight: 800; color: #ef4444;">DOCUMENT REPORTED LOST/STOLEN — SIMULATED ALERT</div>
        </div>
        <div style="font-size: 12px; color: #cbd5e1;">
          <strong>Reference:</strong> ${state.currentDBResults.lostStolen.record?.referenceId || 'LST-2025-XXXXXX'} &nbsp;|&nbsp;
          <strong>Reported:</strong> ${state.currentDBResults.lostStolen.record?.reportedDate || '—'} &nbsp;|&nbsp;
          <strong>Authority:</strong> ${state.currentDBResults.lostStolen.record?.reportingAuthority || '—'}
        </div>
        <div style="font-size: 12px; color: #fca5a5; margin-top: 8px; font-weight: 600;">
          ${state.currentDBResults.lostStolen.record?.instructions || ''}
        </div>
        <div style="font-size: 11px; color: #94a3b8; margin-top: 6px; font-style: italic;">DEMONSTRATION ONLY — This record is simulated. Not connected to real government systems.</div>
      </div>
      ` : ''}

      <!-- Special Alert for Multiple Identity scenario -->
      ${isMultipleId && state.currentScenario?.multipleIdentityHit ? `
      <div style="background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.5); border-radius: 8px; padding: 16px 20px;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <span style="font-size: 20px;">🟡</span>
          <div style="font-size: 14px; font-weight: 800; color: #f59e0b;">CANDIDATE IDENTITY LINK DETECTED — REF: ${state.currentScenario.multipleIdentityHit.referenceId}</div>
        </div>
        <div style="font-size: 12px; color: #cbd5e1;">Potential match with existing record: <strong>${state.currentScenario.multipleIdentityHit.candidateRecord?.name}</strong> (Doc: ${state.currentScenario.multipleIdentityHit.candidateRecord?.docNumber}) — Biometric similarity: ${state.currentScenario.multipleIdentityHit.candidateRecord?.biometricSimilarity}</div>
        <div style="font-size: 11px; color: #94a3b8; margin-top: 6px; font-style: italic;">${state.currentScenario.multipleIdentityHit.note}</div>
      </div>
      ` : ''}

      <!-- Main Inspection Tabs -->
      <div style="display: flex; gap: 4px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 2px; flex-wrap: wrap;">
        <button class="filter-btn tab-btn ${this.activeTab === 'risk' ? 'active' : ''}" data-tab="risk">
          ⚡ Risk &amp; Officer Action
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'quality' ? 'active' : ''}" data-tab="quality">
          🖼️ Image Quality
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'forensics' ? 'active' : ''}" data-tab="forensics">
          🔬 Forensic Viewer
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'ocr_mrz' ? 'active' : ''}" data-tab="ocr_mrz">
          🔤 OCR &amp; MRZ
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'epassport' ? 'active' : ''}" data-tab="epassport">
          📡 ePASSPORT Chip
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'face' ? 'active' : ''}" data-tab="face">
          👤 Biometric &amp; Liveness
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'registries' ? 'active' : ''}" data-tab="registries">
          🏛️ Registries &amp; Watchlists
        </button>
      </div>

      <!-- Tab Content Mount Area -->
      <div id="screeningTabContentArea">
        ${this.renderActiveTab(state)}
      </div>
    </div>
    `;
  },

  renderActiveTab(state) {
    const scenario = state.currentScenario || {};
    const riskResult = state.currentRiskResult || {};
    const mrzData = state.currentMRZResult || {};
    const ocrData = scenario.ocrData || {};
    const tamperingData = scenario.tampering || {};
    const faceData = scenario.faceVerification || {};
    const livenessData = scenario.liveness || {};
    const dbResults = state.currentDBResults || {};
    const consistencyData = state.currentConsistency || {};
    const visaValidation = state.currentVisaValidation || {};
    const epassport = state.currentEpassport || {};
    const imageQuality = state.currentImageQuality || {};

    if (this.activeTab === 'risk') {
      return RiskEnginePanel.render(riskResult, scenario.traveller, scenario.document);
    } else if (this.activeTab === 'quality') {
      return this.renderImageQualityTab(imageQuality, scenario);
    } else if (this.activeTab === 'forensics') {
      return `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${DocumentViewer.render(scenario.images?.docImageUri)}
        ${ForensicsPanel.render(tamperingData, {})}
      </div>
      `;
    } else if (this.activeTab === 'ocr_mrz') {
      return `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${OCRPanel.render(ocrData, { type: scenario.document?.type, confidence: ocrData.overallOcrConfidence || 98.7 })}
        ${MRZPanel.render(mrzData)}
        ${CrossDocumentPanel.render(consistencyData, visaValidation)}
      </div>
      `;
    } else if (this.activeTab === 'epassport') {
      return this.renderEpassportTab(epassport, scenario);
    } else if (this.activeTab === 'face') {
      return FaceVerification.render(faceData, livenessData, scenario.images);
    } else if (this.activeTab === 'registries') {
      return `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        ${DatabasePanel.render(dbResults)}
        ${CrossDocumentPanel.render(consistencyData, visaValidation)}
      </div>
      `;
    }
    return '';
  },

  renderImageQualityTab(imageQuality, scenario) {
    const overall = imageQuality.overallQuality || 'SUFFICIENT';
    const checks = [
      { label: 'Resolution / DPI', ...imageQuality.resolution },
      { label: 'Focus / Blur (Laplacian)', ...imageQuality.blur },
      { label: 'Glare / Specular Reflection', ...imageQuality.glare },
      { label: 'Contrast / Histogram', ...imageQuality.contrast },
      { label: 'Document Boundary Detection', ...imageQuality.boundary }
    ];
    return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Image Quality Assessment</div>
          <div style="font-size: 22px; font-weight: 900; font-family: var(--font-mono); color: ${overall === 'SUFFICIENT' ? '#10b981' : '#f59e0b'};">${overall}</div>
        </div>
        <span class="badge ${overall === 'SUFFICIENT' ? 'badge-low' : 'badge-review'}">${imageQuality.action || 'PROCEED TO ANALYSIS'}</span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
        ${checks.map(c => `
          <div style="background: var(--bg-subtle); border: 1px solid ${c.passed === false ? 'rgba(245,158,11,0.4)' : 'var(--border-subtle)'}; border-radius: 6px; padding: 12px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-size: 12px; font-weight: 700; color: #f8fafc;">${c.label}</span>
              <span class="badge ${c.passed === false ? 'badge-review' : 'badge-low'}">${c.passed === false ? 'FAIL' : 'PASS'}</span>
            </div>
            <div style="font-size: 11px; color: #94a3b8;">${c.message || '—'}</div>
            ${c.value ? `<div style="font-size: 11px; color: #38bdf8; font-family: var(--font-mono); margin-top: 4px;">${c.value}</div>` : ''}
          </div>
        `).join('')}
      </div>
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px 18px; font-size: 12px; color: #94a3b8;">
        <strong style="color: #f8fafc;">ICAO Doc 9303 Requirements:</strong> Minimum face area 70–80% of image width, 600 DPI, neutral expression, full frontal, no glare, white/off-white background, document boundary fully visible.
      </div>
    </div>
    `;
  },

  renderEpassportTab(epassport, scenario) {
    const status = epassport.status || 'VALID';
    const color = status === 'VALID' ? '#10b981' : (status === 'UNAVAILABLE' ? '#64748b' : '#ef4444');
    return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 18px;">
          <span style="font-size: 28px;">📡</span>
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">ePASSPORT / ICAO 9303 CHIP VERIFICATION</div>
            <div style="font-size: 20px; font-weight: 900; font-family: var(--font-mono); color: ${color};">${status}</div>
          </div>
          <div style="margin-left: auto;"><span class="badge ${status === 'VALID' ? 'badge-low' : (status === 'UNAVAILABLE' ? 'badge-info' : 'badge-high')}">${status}</span></div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div style="background: var(--bg-subtle); border-radius: 6px; padding: 12px;">
            <div style="font-size: 11px; color: var(--text-muted);">NFC Chip Detected</div>
            <div style="font-size: 16px; font-weight: 800; color: ${epassport.chipDetected ? '#10b981' : '#ef4444'}; margin-top: 4px;">${epassport.chipDetected ? 'YES' : 'NO'}</div>
          </div>
          <div style="background: var(--bg-subtle); border-radius: 6px; padding: 12px;">
            <div style="font-size: 11px; color: var(--text-muted);">DS Certificate Signature</div>
            <div style="font-size: 16px; font-weight: 800; color: ${epassport.signatureValid ? '#10b981' : '#ef4444'}; margin-top: 4px;">${epassport.signatureValid ? 'VALID' : 'INVALID'}</div>
          </div>
          <div style="background: var(--bg-subtle); border-radius: 6px; padding: 12px;">
            <div style="font-size: 11px; color: var(--text-muted);">Chip Data vs MRZ Match</div>
            <div style="font-size: 16px; font-weight: 800; color: ${epassport.chipMrzMatch === false ? '#ef4444' : '#10b981'}; margin-top: 4px;">${epassport.chipMrzMatch === false ? 'MISMATCH' : (epassport.chipDetected ? 'MATCH' : 'N/A')}</div>
          </div>
        </div>
        <div style="margin-top: 14px; background: var(--bg-subtle); border-left: 4px solid ${color}; border-radius: 4px; padding: 12px 16px; font-size: 12px; color: #cbd5e1;">
          ${epassport.message || 'Verification complete.'}
        </div>
        ${epassport.note ? `<div style="margin-top: 8px; font-size: 11px; color: #64748b; font-style: italic;">${epassport.note}</div>` : ''}
      </div>
      <div style="background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 8px; padding: 14px 18px; font-size: 12px; color: #94a3b8;">
        <strong style="color: #38bdf8;">DEMONSTRATION:</strong> ePASSPORT chip verification is simulated for evaluation purposes only. This system does not contain an active ICAO PKI reader or BAC/PACE authentication module in this prototype.
      </div>
    </div>
    `;
  },

  initEvents(app) {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab');
        app.renderCurrentView();
      });
    });

    // Run Analysis Button
    const runBtn = document.getElementById('btnRunAnalysisTrigger');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        app.triggerScreeningProcess();
      });
    }

    // Scenario Select dropdown inside console
    const scenarioSelect = document.getElementById('selectDemoScenarioInConsole');
    if (scenarioSelect) {
      scenarioSelect.addEventListener('change', (e) => {
        app.loadScenario(e.target.value);
      });
    }

    // Initialize sub-component events based on active tab
    if (this.activeTab === 'risk') {
      RiskEnginePanel.initEvents(app);
    } else if (this.activeTab === 'forensics') {
      DocumentViewer.initEvents();
      const docUri = app.state.currentScenario?.images?.docImageUri;
      const boundingBoxes = app.state.currentScenario?.tampering?.tamperingBoundingBoxes || [];
      DocumentViewer.loadImage(docUri, boundingBoxes);
    } else if (this.activeTab === 'face') {
      FaceVerification.initEvents(app);
    }
  }
};
