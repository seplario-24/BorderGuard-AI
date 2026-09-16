/**
 * BorderGuard AI - Cross-Document Consistency & Visa Validation Panel
 * Compares multi-document stack (Passport, Visa, National ID) for identity coherence.
 */

export const CrossDocumentPanel = {
  render(consistencyData = {}, visaValidation = {}) {
    const consistencyItems = consistencyData.items || [];
    const consistencyScore = consistencyData.consistencyScore !== undefined ? consistencyData.consistencyScore : 100;
    const visaChecks = visaValidation.checks || [];

    return `
    <div style="display: flex; flex-direction: column; gap: 18px;">
      <!-- Identity Consistency Score Header -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Multi-Source Identity Consistency</span>
          <div style="font-size: 24px; font-weight: 900; font-family: var(--font-mono); color: ${consistencyScore === 100 ? '#10b981' : (consistencyScore >= 70 ? '#f59e0b' : '#ef4444')};">
            ${consistencyScore}%
          </div>
        </div>
        <div>
          <span class="badge ${consistencyScore === 100 ? 'badge-low' : 'badge-high'}">
            ${consistencyScore === 100 ? 'COHERENT IDENTITY' : 'DISCREPANCY DETECTED'}
          </span>
        </div>
      </div>

      <!-- Cross-Check Table -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
        <div style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 12px;">
          Field Concordance: Visual OCR vs. MRZ vs. Registry
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Identity Field</th>
                <th>Visual Document Value</th>
                <th>MRZ / Secondary Value</th>
                <th>Status</th>
                <th>Forensic Explanation</th>
              </tr>
            </thead>
            <tbody>
              ${consistencyItems.map(item => `
                <tr>
                  <td style="font-weight: 700;">${item.field}</td>
                  <td style="font-family: var(--font-mono); font-weight: 600; color: #f8fafc;">${item.ocrValue || '—'}</td>
                  <td style="font-family: var(--font-mono); font-weight: 600; color: ${item.match ? '#93c5fd' : '#fca5a5'};">${item.mrzValue || '—'}</td>
                  <td>
                    <span class="badge ${item.match ? 'badge-low' : 'badge-high'}">
                      ${item.match ? '✓ MATCH' : '✗ MISMATCH'}
                    </span>
                  </td>
                  <td style="font-size: 11px; color: #cbd5e1; max-width: 320px;">${item.explanation}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Visa Status Panel if Visa Checks present -->
      ${visaChecks.length > 0 ? `
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="font-size: 12px; font-weight: 700; color: #f8fafc; text-transform: uppercase;">
              Electronic Visa Association &amp; Entry Rules
            </div>
            <span class="badge ${visaValidation.allPassed ? 'badge-low' : 'badge-high'}">
              ${visaValidation.status}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
            ${visaChecks.map(check => `
              <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <strong style="font-size: 12px; color: #f8fafc;">${check.item}</strong>
                  <span class="badge ${check.passed ? 'badge-low' : 'badge-high'}">${check.passed ? 'PASS' : 'FAIL'}</span>
                </div>
                <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">
                  ${check.details}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
    `;
  }
};
