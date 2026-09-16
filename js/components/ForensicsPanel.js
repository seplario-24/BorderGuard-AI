/**
 * BorderGuard AI - AI Document Forensics & Tampering Analysis Panel
 * Detailed forensic inspection of photo replacement, font inconsistency,
 * digital stamp overlay, compression artifacts (ELA), and metadata anomalies.
 */

export const ForensicsPanel = {
  render(tamperingData = {}, metadata = {}) {
    const photo = tamperingData.photoIntegrity || { score: 96, status: 'NORMAL', details: 'Authentic photo substrate.' };
    const text = tamperingData.textForensics || { score: 95, regions: [] };
    const stamp = tamperingData.stampForensics || { score: 92, status: 'AUTHENTIC', details: 'Guilloche print continuous.' };
    const compression = tamperingData.compressionForensics || { score: 95, elaDiscrepancy: 'Low', noiseVariance: 'Uniform' };
    const overallScore = tamperingData.overallScore || 92;

    const meta = metadata.fileType ? metadata : {
      fileType: 'JPEG (JFIF 1.02)',
      resolution: '1920 × 1280 px (300 DPI)',
      creationTimestamp: '2026-03-10T14:22:18Z',
      modificationTimestamp: '2026-09-08T09:15:02Z',
      softwareTag: 'Camera Firmware v1.0.4',
      compressionRatio: 'JPEG Quality ~92%',
      exifConsistency: true
    };

    return `
    <div style="display: flex; flex-direction: column; gap: 18px;">
      <!-- Top Forensic Score Banner -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 14px 18px; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Composite Image Forensic Score</span>
          <div style="font-size: 22px; font-weight: 900; font-family: var(--font-mono); color: ${overallScore >= 80 ? '#10b981' : (overallScore >= 60 ? '#f59e0b' : '#ef4444')};">
            ${overallScore} / 100
          </div>
        </div>
        <div>
          <span class="badge ${overallScore >= 80 ? 'badge-low' : (overallScore >= 60 ? 'badge-review' : 'badge-high')}">
            ${overallScore >= 80 ? 'AUTHENTIC SUBSTRATE' : (overallScore >= 60 ? 'SUSPICIOUS ANOMALY' : 'CRITICAL TAMPERING')}
          </span>
        </div>
      </div>

      <!-- 4 Pillars of Forensics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        <!-- Photo Integrity -->
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 12px; color: #f8fafc;">Photo Replacement Analysis</strong>
            <span class="badge ${photo.status === 'NORMAL' ? 'badge-low' : 'badge-high'}">${photo.status}</span>
          </div>
          <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 8px;">${photo.details}</div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); color: #94a3b8;">
            <span>Integrity Confidence</span>
            <span style="font-weight: 700; color: #f8fafc;">${photo.score}%</span>
          </div>
        </div>

        <!-- Stamp / Consular Analysis -->
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 12px; color: #f8fafc;">Consular Stamp & Ink Analysis</strong>
            <span class="badge ${stamp.status === 'AUTHENTIC' ? 'badge-low' : 'badge-high'}">${stamp.status}</span>
          </div>
          <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 8px;">${stamp.details}</div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); color: #94a3b8;">
            <span>Authenticity Confidence</span>
            <span style="font-weight: 700; color: #f8fafc;">${stamp.score}%</span>
          </div>
        </div>

        <!-- ELA Compression -->
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 12px; color: #f8fafc;">JPEG Error Level Analysis (ELA)</strong>
            <span class="badge ${compression.score >= 80 ? 'badge-low' : 'badge-high'}">Score: ${compression.score}</span>
          </div>
          <div style="font-size: 11px; color: #cbd5e1; margin-bottom: 6px;">ELA Variance: <strong>${compression.elaDiscrepancy}</strong></div>
          <div style="font-size: 11px; color: #cbd5e1;">Noise Density: <strong>${compression.noiseVariance}</strong></div>
        </div>

        <!-- Metadata Analysis -->
        <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 12px; color: #f8fafc;">Metadata & Hardware Signature</strong>
            <span class="badge ${meta.exifConsistency ? 'badge-low' : 'badge-review'}">
              ${meta.exifConsistency ? 'NORMAL' : 'MODIFIED'}
            </span>
          </div>
          <div style="font-size: 11px; color: #94a3b8; line-height: 1.6;">
            <div>Format: <span style="color: #f8fafc;">${meta.fileType}</span></div>
            <div>Resolution: <span style="color: #f8fafc;">${meta.resolution}</span></div>
            <div>Software Tag: <span style="color: #f8fafc;">${meta.softwareTag}</span></div>
          </div>
        </div>
      </div>

      <!-- Text Forensics Regional Breakdown -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
        <div style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 12px;">
          Text Font, Alignment & Micro-Spacing Verification
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px;">
          ${(text.regions || []).map(r => `
            <div style="background: var(--bg-subtle); border: 1px solid ${r.status === 'SUSPICIOUS' ? '#ef4444' : 'var(--border-subtle)'}; border-radius: 6px; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: 700; color: #f8fafc;">${r.name}</span>
                <span class="badge ${r.status === 'NORMAL' ? 'badge-low' : 'badge-high'}">${r.status}</span>
              </div>
              ${r.anomalyType ? `
                <div style="font-size: 11px; color: #fca5a5; margin-top: 4px; font-weight: 600;">
                  ⚠ ${r.anomalyType}
                </div>
              ` : `
                <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
                  Standard font & microprint alignment verified.
                </div>
              `}
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
  }
};
