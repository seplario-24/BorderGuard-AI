/**
 * BorderGuard AI - Operations & Detection Analytics Component
 * Visualizes screening volumes, risk distributions, tampering categories,
 * and benchmark speed comparisons (Manual 4.5m vs AI 4.8s).
 */

export const AnalyticsView = {
  render(state) {
    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Title & Benchmark Note -->
      <div>
        <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">Border Operations &amp; Intelligence Analytics</h1>
        <p style="font-size: 12px; color: #94a3b8;">
          Checkpoint throughput, risk distribution curves, and document fraud detection metrics
        </p>
      </div>

      <!-- Benchmark Card: Manual vs AI Speed -->
      <div style="background: linear-gradient(135deg, #111c2e 0%, #172740 100%); border: 1px solid #2a3f61; border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div>
            <strong style="font-size: 14px; color: #f8fafc;">Processing Speed Benchmark Comparison</strong>
            <div style="font-size: 11px; color: #38bdf8; font-family: var(--font-mono); margin-top: 2px;">
              *Prototype benchmark / simulated demonstration metrics
            </div>
          </div>
          <span class="badge badge-low" style="font-size: 13px; padding: 6px 12px;">56x FASTER THROUGHPUT</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Manual Inspection -->
          <div style="background: rgba(11, 18, 30, 0.7); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Traditional Manual Inspection</div>
            <div style="font-size: 28px; font-weight: 900; font-family: var(--font-mono); color: #94a3b8; margin: 4px 0;">
              ~4.5 min
            </div>
            <p style="font-size: 11px; color: #64748b;">
              Manual UV lamp check, physical loupe inspection, manual terminal queries, typing passport numbers.
            </p>
          </div>

          <!-- AI-Assisted Screening -->
          <div style="background: rgba(11, 18, 30, 0.7); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 6px; padding: 14px;">
            <div style="font-size: 11px; text-transform: uppercase; color: #10b981; font-weight: 700;">BorderGuard AI-Assisted Screening</div>
            <div style="font-size: 28px; font-weight: 900; font-family: var(--font-mono); color: #10b981; margin: 4px 0;">
              ~4.8 sec
            </div>
            <p style="font-size: 11px; color: #cbd5e1;">
              Simultaneous classification, OCR, MRZ modulo check, ELA tampering, biometrics &amp; watchlist query.
            </p>
          </div>
        </div>
      </div>

      <!-- Risk Distribution & Detection Categories Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- Risk Distribution Chart -->
        <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
          <div style="font-size: 13px; font-weight: 800; color: #f8fafc; text-transform: uppercase; margin-bottom: 14px;">
            Risk Profile Distribution (Last 30 Days)
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Low Risk -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="font-weight: 700; color: #10b981;">Low Risk (0–30 pts)</span>
                <span style="font-family: var(--font-mono); font-weight: 700;">91.1% (3,498 travellers)</span>
              </div>
              <div style="height: 10px; background: var(--bg-subtle); border-radius: 5px; overflow: hidden;">
                <div style="width: 91.1%; height: 100%; background: #10b981; border-radius: 5px;"></div>
              </div>
            </div>

            <!-- Review -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="font-weight: 700; color: #f59e0b;">Officer Review Required (31–69 pts)</span>
                <span style="font-family: var(--font-mono); font-weight: 700;">6.6% (253 travellers)</span>
              </div>
              <div style="height: 10px; background: var(--bg-subtle); border-radius: 5px; overflow: hidden;">
                <div style="width: 6.6%; height: 100%; background: #f59e0b; border-radius: 5px;"></div>
              </div>
            </div>

            <!-- High Risk -->
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                <span style="font-weight: 700; color: #ef4444;">High Risk / Anomaly (70–100 pts)</span>
                <span style="font-family: var(--font-mono); font-weight: 700;">2.3% (91 travellers)</span>
              </div>
              <div style="height: 10px; background: var(--bg-subtle); border-radius: 5px; overflow: hidden;">
                <div style="width: 2.3%; height: 100%; background: #ef4444; border-radius: 5px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detection Categories Breakdown -->
        <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
          <div style="font-size: 13px; font-weight: 800; color: #f8fafc; text-transform: uppercase; margin-bottom: 14px;">
            Primary Alert Categories
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-subtle); padding: 10px 12px; border-radius: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: #f8fafc;">Document Tampering / Font Inconsistency</span>
              <span class="badge badge-high">67 cases</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-subtle); padding: 10px 12px; border-radius: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: #f8fafc;">Biometric Facial Mismatch (&lt; 80%)</span>
              <span class="badge badge-review">24 cases</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-subtle); padding: 10px 12px; border-radius: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: #f8fafc;">Expired / Lapsed Travel Documents</span>
              <span class="badge badge-info">19 cases</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-subtle); padding: 10px 12px; border-radius: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: #f8fafc;">MRZ Checksum / Parity Failures</span>
              <span class="badge badge-high">14 cases</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-subtle); padding: 10px 12px; border-radius: 6px;">
              <span style="font-size: 12px; font-weight: 600; color: #f8fafc;">Simulated Watchlist / Interpol Hits</span>
              <span class="badge badge-high">8 cases</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
};
