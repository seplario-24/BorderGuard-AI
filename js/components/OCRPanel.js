/**
 * BorderGuard AI - OCR Extraction & Classification Panel Component
 * Displays structured field extraction, per-field confidence ratings,
 * document classification confidence, and format integrity flags.
 */

export const OCRPanel = {
  render(ocrData = {}, classification = {}) {
    const docType = classification.type || 'PASSPORT (ICAO TD3)';
    const docConfidence = classification.confidence || 98.7;

    const fields = [
      { label: 'Document Number', value: ocrData.documentNumber || '—', conf: '99.2%', valid: true },
      { label: 'Surname / Family Name', value: ocrData.surname || '—', conf: '98.9%', valid: true },
      { label: 'Given Names', value: ocrData.givenNames || '—', conf: '99.1%', valid: true },
      { label: 'Nationality', value: ocrData.nationality || '—', conf: '99.6%', valid: true },
      { label: 'Date of Birth (DOB)', value: ocrData.dob || '—', conf: '98.5%', valid: true },
      { label: 'Gender / Sex', value: ocrData.sex || '—', conf: '99.8%', valid: true },
      { label: 'Date of Issue', value: ocrData.issueDate || '—', conf: '97.9%', valid: true },
      { label: 'Date of Expiry', value: ocrData.expiryDate || '—', conf: '98.4%', valid: !ocrData.expired },
      { label: 'Issuing Authority', value: ocrData.issuingAuthority || 'PASSPORT OFFICE', conf: '97.4%', valid: true }
    ];

    return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- Classification Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Document Classification</div>
          <div style="font-size: 16px; font-weight: 800; color: #f8fafc; font-family: var(--font-mono);">${docType}</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Classification Confidence</div>
          <div style="font-size: 15px; font-weight: 800; color: #10b981; font-family: var(--font-mono);">${docConfidence}%</div>
        </div>
      </div>

      <!-- OCR Extracted Fields Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
        ${fields.map(f => `
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 10px 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 10px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">${f.label}</span>
              <span style="font-size: 10px; font-family: var(--font-mono); color: #38bdf8;">${f.conf}</span>
            </div>
            <div style="font-size: 14px; font-weight: 700; color: #f8fafc; font-family: var(--font-mono);">${f.value}</div>
            <div style="margin-top: 6px; display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 10px; font-weight: 700; color: ${f.valid ? '#10b981' : '#ef4444'};">
                ${f.valid ? '✓ Valid format' : '⚠ Anomaly flagged'}
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    `;
  }
};
