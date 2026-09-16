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
  activeTab: 'risk', // 'risk', 'forensics', 'ocr_mrz', 'face', 'registries'

  render(state) {
    const scenario = state.currentScenario || {};
    const screening = state.currentScreening || {};
    const isAnalyzing = state.isAnalyzing || false;
    const analysisStep = state.analysisStep || 0;

    const pipelineSteps = [
      { step: 1, label: 'Document Detected & Rectified' },
      { step: 2, label: 'Document Type Classified (Passport TD3)' },
      { step: 3, label: 'OCR Extraction Completed' },
      { step: 4, label: 'MRZ Checksum Validated' },
      { step: 5, label: 'Forensic ELA & Tampering Analyzed' },
      { step: 6, label: 'Biometric Face Match Calculated' },
      { step: 7, label: 'Simulated Registries & Watchlists Queried' },
      { step: 8, label: 'Explainable AI Risk Engine Computed' }
    ];

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Traveller & Screening Session Header -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 18px 22px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 11px; text-transform: uppercase; color: #38bdf8; font-weight: 700; background: rgba(56, 189, 248, 0.1); padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">
              ACTIVE SESSION
            </span>
            <h1 style="font-size: 18px; font-weight: 800; color: #f8fafc; font-family: var(--font-mono);">
              SCREENING ID: ${screening.screeningId || 'BG-2026-001248'}
            </h1>
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
            <option value="scenario_7" ${scenario.id === 'scenario_7' ? 'selected' : ''}>7: Watchlist Match (Review 79)</option>
            <option value="scenario_8" ${scenario.id === 'scenario_8' ? 'selected' : ''}>8: Air-Gapped Offline Node (Low 15) 📴</option>
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

      <!-- Animated Pipeline Execution Progress (Visible when analyzing or completed) -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">
            Verification Pipeline Status
          </div>
          <div style="font-size: 11px; font-family: var(--font-mono); color: #38bdf8;">
            ${isAnalyzing ? `PROCESSING STAGE ${analysisStep} / 8` : '✓ MULTI-SIGNAL ANALYSIS COMPLETE'}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px;">
          ${pipelineSteps.map(p => {
            const isDone = !isAnalyzing || analysisStep >= p.step;
            const isCurrent = isAnalyzing && analysisStep === p.step;
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

      <!-- Main Inspection Tabs -->
      <div style="display: flex; gap: 4px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 2px;">
        <button class="filter-btn tab-btn ${this.activeTab === 'risk' ? 'active' : ''}" data-tab="risk">
          ⚡ Risk &amp; Officer Action
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'forensics' ? 'active' : ''}" data-tab="forensics">
          🔬 Forensic Document Viewer
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'ocr_mrz' ? 'active' : ''}" data-tab="ocr_mrz">
          🔤 OCR &amp; MRZ Checksums
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'face' ? 'active' : ''}" data-tab="face">
          👤 Biometric Face &amp; Liveness
        </button>
        <button class="filter-btn tab-btn ${this.activeTab === 'registries' ? 'active' : ''}" data-tab="registries">
          🏛️ Simulated Registries &amp; Visa
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

    if (this.activeTab === 'risk') {
      return RiskEnginePanel.render(riskResult, scenario.traveller, scenario.document);
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
        ${OCRPanel.render(ocrData, { type: scenario.document?.type, confidence: 98.7 })}
        ${MRZPanel.render(mrzData)}
        ${CrossDocumentPanel.render(consistencyData, visaValidation)}
      </div>
      `;
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
