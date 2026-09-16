/**
 * BorderGuard AI - Comprehensive Evidence Dossier Modal
 * Deep-dive inspection drawer providing side-by-side evidence,
 * technical forensic findings translated to plain English, and model confidence metrics.
 */

export const EvidenceModal = {
  render(evidenceBundle = {}) {
    const risk = evidenceBundle.risk || { score: 18, level: 'LOW RISK', recommendation: '' };
    const mrz = evidenceBundle.mrz || {};
    const ocr = evidenceBundle.ocr || {};
    const tampering = evidenceBundle.tampering || {};
    const face = evidenceBundle.face || {};
    const db = evidenceBundle.database || {};
    const docData = evidenceBundle.document || {};

    return `
    <div class="modal-overlay" id="evidenceModalOverlay">
      <div class="modal-box" style="max-width: 900px; max-height: 92vh;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">🔎</span>
            <div>
              <h3 class="modal-title">Evidence Dossier: ${evidenceBundle.screeningId || 'BG-2026-001248'}</h3>
              <div style="font-size: 11px; color: #94a3b8;">Explainable AI Evidence Breakdown • Subject: ${evidenceBundle.traveller?.name || 'TRAVELLER'}</div>
            </div>
          </div>
          <button id="btnCloseEvidenceModal" style="background: none; border: none; color: #94a3b8; font-size: 24px; cursor: pointer;">&times;</button>
        </div>

        <div class="modal-body" style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Evidence Summary Banner -->
          <div style="background: var(--bg-subtle); border-left: 4px solid ${risk.color || '#38bdf8'}; border-radius: 6px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Overall Risk Assessment</div>
              <div style="font-size: 20px; font-weight: 800; color: #f8fafc; font-family: var(--font-mono);">
                ${risk.score} / 100 — <span style="color: ${risk.color || '#10b981'};">${risk.level}</span>
              </div>
              <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
                ${risk.recommendation}
              </div>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-info">AI CONFIDENCE: ${risk.aiConfidence || 94.6}%</span>
            </div>
          </div>

          <!-- Section 1: Physical & Forensic Tampering Evidence -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 14px;">🔬</span>
              <strong style="font-size: 13px; color: #f8fafc; text-transform: uppercase;">1. Forensic Image &amp; Tampering Findings</strong>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px; font-size: 12px;">
                <div style="font-weight: 700; color: #f8fafc; margin-bottom: 4px;">Photo Replacement Analysis</div>
                <div style="color: ${tampering.photoIntegrity?.status === 'NORMAL' ? '#10b981' : '#ef4444'}; font-weight: 600;">
                  Status: ${tampering.photoIntegrity?.status || 'NORMAL'}
                </div>
                <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">
                  ${tampering.photoIntegrity?.details || 'No boundary cut-line artifacts.'}
                </div>
              </div>

              <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px; font-size: 12px;">
                <div style="font-weight: 700; color: #f8fafc; margin-bottom: 4px;">Error Level Analysis (ELA)</div>
                <div style="color: ${(tampering.compressionForensics?.score || 95) >= 80 ? '#10b981' : '#ef4444'}; font-weight: 600;">
                  Variance: ${tampering.compressionForensics?.elaDiscrepancy || 'Low'}
                </div>
                <div style="color: #cbd5e1; font-size: 11px; margin-top: 4px;">
                  Compression characteristics across portrait and metadata text zones.
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Machine Readable Zone & Cross-Field Consistency -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 14px;">📑</span>
              <strong style="font-size: 13px; color: #f8fafc; text-transform: uppercase;">2. OCR vs. MRZ Cross-Check Evidence</strong>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 12px;">
              <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px;">
                <span style="color: var(--text-muted); font-size: 11px;">Visual OCR Document Number:</span>
                <div style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: #f8fafc;">
                  ${ocr.documentNumber || docData.docNumber || '—'}
                </div>
              </div>

              <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px;">
                <span style="color: var(--text-muted); font-size: 11px;">MRZ Decoded Document Number:</span>
                <div style="font-family: var(--font-mono); font-size: 15px; font-weight: 700; color: #93c5fd;">
                  ${mrz.fields?.docNumber || '—'}
                </div>
              </div>
            </div>

            <div style="margin-top: 10px; font-size: 11px; color: #cbd5e1;">
              Checksum Status: <strong style="color: ${mrz.overallValid ? '#10b981' : '#ef4444'};">${mrz.overallValid ? 'ALL ICAO CHECK DIGITS VERIFIED' : 'MATHEMATICAL CHECKSUM MISMATCH DETECTED'}</strong>
            </div>
          </div>

          <!-- Section 3: Biometric Face Match & Registry Checks -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
              <span style="font-size: 14px;">👤</span>
              <strong style="font-size: 13px; color: #f8fafc; text-transform: uppercase;">3. Biometric &amp; Central Registry Results</strong>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 12px;">
              <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px;">
                <div style="font-weight: 700; color: #f8fafc;">Facial Similarity: ${(face.similarityScore || 96.8).toFixed(1)}%</div>
                <div style="font-size: 11px; color: ${(face.similarityScore || 96.8) >= 80 ? '#10b981' : '#ef4444'}; margin-top: 2px;">
                  Threshold: 80% • Status: ${(face.similarityScore || 96.8) >= 80 ? 'CONCORDANT' : 'DISCREPANT'}
                </div>
              </div>

              <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px;">
                <div style="font-weight: 700; color: #f8fafc;">National Registry Status</div>
                <div style="font-size: 11px; color: ${db.passport?.status === 'VALID' ? '#10b981' : '#ef4444'}; margin-top: 2px;">
                  ${db.passport?.status || 'VALID'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button id="btnCloseEvidenceFooter" class="btn btn-primary">Close Evidence Dossier</button>
        </div>
      </div>
    </div>
    `;
  },

  initEvents() {
    const closeBtn = document.getElementById('btnCloseEvidenceModal');
    const footerBtn = document.getElementById('btnCloseEvidenceFooter');

    const closeModal = () => {
      const el = document.getElementById('evidenceModalOverlay');
      if (el) el.remove();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (footerBtn) footerBtn.addEventListener('click', closeModal);
  }
};
