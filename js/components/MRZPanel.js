/**
 * BorderGuard AI - MRZ Inspection & Checksum Validation Panel
 * Renders monospace ICAO Doc 9303 MRZ text, individual 7-3-1 check digit status,
 * and composite check evaluation.
 */

export const MRZPanel = {
  render(mrzData) {
    if (!mrzData || !mrzData.checks) {
      return `
      <div class="mrz-card" style="text-align: center; padding: 24px; color: #94a3b8;">
        No Machine Readable Zone (MRZ) detected on this document.
      </div>
      `;
    }

    const checks = mrzData.checks;
    const lines = mrzData.raw || [];

    return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- Monospace MRZ Text Display -->
      <div class="mrz-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">ICAO Doc 9303 Standard TD3 MRZ</span>
          <span class="badge ${mrzData.overallValid ? 'badge-low' : 'badge-high'}">
            ${mrzData.overallValid ? 'CHECKSUM VERIFIED' : 'CHECKSUM FAILURE'}
          </span>
        </div>
        <div class="mrz-line" style="color: #93c5fd;">${lines[0] || ''}</div>
        <div class="mrz-line" style="color: ${mrzData.overallValid ? '#f8fafc' : '#fca5a5'};">${lines[1] || ''}</div>
      </div>

      <!-- Individual Checksum Matrix -->
      <div>
        <div style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px;">
          Mathematical Modulo-10 (7-3-1 Weight) Verification Matrix
        </div>

        <div class="mrz-check-grid">
          <!-- Document Number Check -->
          <div class="mrz-check-item">
            <div class="mrz-check-title">${checks.docNumber.label}</div>
            <div class="mrz-check-status">
              <span style="font-family: var(--font-mono); font-size: 11px; color: #cbd5e1;">Calc: ${checks.docNumber.calculated} | Exp: ${checks.docNumber.expected}</span>
              <span style="color: ${checks.docNumber.passed ? '#10b981' : '#ef4444'};">
                ${checks.docNumber.passed ? '✓ PASS' : '✗ MISMATCH'}
              </span>
            </div>
          </div>

          <!-- DOB Check -->
          <div class="mrz-check-item">
            <div class="mrz-check-title">${checks.dob.label}</div>
            <div class="mrz-check-status">
              <span style="font-family: var(--font-mono); font-size: 11px; color: #cbd5e1;">Calc: ${checks.dob.calculated} | Exp: ${checks.dob.expected}</span>
              <span style="color: ${checks.dob.passed ? '#10b981' : '#ef4444'};">
                ${checks.dob.passed ? '✓ PASS' : '✗ MISMATCH'}
              </span>
            </div>
          </div>

          <!-- Expiry Check -->
          <div class="mrz-check-item">
            <div class="mrz-check-title">${checks.expiry.label}</div>
            <div class="mrz-check-status">
              <span style="font-family: var(--font-mono); font-size: 11px; color: #cbd5e1;">Calc: ${checks.expiry.calculated} | Exp: ${checks.expiry.expected}</span>
              <span style="color: ${checks.expiry.passed ? '#10b981' : '#ef4444'};">
                ${checks.expiry.passed ? '✓ PASS' : '✗ MISMATCH'}
              </span>
            </div>
          </div>

          <!-- Composite Check -->
          <div class="mrz-check-item">
            <div class="mrz-check-title">${checks.composite.label}</div>
            <div class="mrz-check-status">
              <span style="font-family: var(--font-mono); font-size: 11px; color: #cbd5e1;">Calc: ${checks.composite.calculated} | Exp: ${checks.composite.expected}</span>
              <span style="color: ${checks.composite.passed ? '#10b981' : '#ef4444'};">
                ${checks.composite.passed ? '✓ PASS' : '✗ MISMATCH'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
};
