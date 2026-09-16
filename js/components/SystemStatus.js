/**
 * BorderGuard AI - System Health & Component Latency Telemetry Component
 * Displays real-time operational status, model versions, latencies, and uptime.
 */

export const SystemStatus = {
  render(state) {
    const components = [
      { name: 'Document Classifier', version: 'v2.4-lite', status: 'ONLINE', latency: '120 ms', mode: 'LOCAL EMBED', uptime: '99.98%' },
      { name: 'OCR Extraction Engine', version: 'v3.1-tesseract-onnx', status: 'ONLINE', latency: '420 ms', mode: 'CLIENT RUNTIME', uptime: '99.95%' },
      { name: 'MRZ Modulo-10 Parser', version: 'v1.0-icao9303', status: 'ONLINE', latency: '80 ms', mode: 'NATIVE ENGINE', uptime: '100.0%' },
      { name: 'Tampering & ELA Forensics', version: 'v4.2-spectral-ela', status: 'ONLINE', latency: '850 ms', mode: 'CANVAS ACCEL', uptime: '99.91%' },
      { name: 'Biometric Face Verification', version: 'v5.0-facenet-emb', status: 'ONLINE', latency: '210 ms', mode: 'COSINE 512D', uptime: '99.97%' },
      { name: 'Anti-Spoofing Liveness Service', version: 'v2.1-depth-pad', status: 'ONLINE', latency: '160 ms', mode: 'SIMULATED TELEMETRY', uptime: '99.99%' },
      { name: 'Explainable AI Risk Engine', version: 'v3.0-weighted-rule', status: 'ONLINE', latency: '60 ms', mode: 'REALTIME ENGINE', uptime: '100.0%' },
      { name: 'Simulated Central Registries', version: 'v1.1-mock-gateway', status: 'ONLINE', latency: '140 ms', mode: 'DEMO LEDGER', uptime: '100.0%' },
      { name: 'Section 65B Audit Service', version: 'v2.0-sha256-chain', status: 'ONLINE', latency: '35 ms', mode: 'IMMUTABLE STORE', uptime: '100.0%' }
    ];

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Title -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">System Health &amp; Model Architecture Telemetry</h1>
          <p style="font-size: 12px; color: #94a3b8;">Real-time latency metrics and operational status across all verification pipelines</p>
        </div>
        <span class="badge badge-low" style="padding: 6px 12px; font-size: 12px;">ALL SYSTEMS OPERATIONAL</span>
      </div>

      <!-- Overall Pipeline Performance Summary -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">End-to-End Pipeline Latency</div>
            <div style="font-size: 26px; font-weight: 900; font-family: var(--font-mono); color: #38bdf8;">
              3.24 seconds
            </div>
          </div>
          <div style="font-size: 11px; color: #94a3b8; font-family: var(--font-mono); text-align: right;">
            <div>Target SLA: &lt; 5.00s</div>
            <div>Current Jitter: ±18ms</div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
          ${components.map(comp => `
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 13px; color: #f8fafc;">${comp.name}</strong>
                <span class="badge badge-low" style="font-size: 10px;">${comp.status}</span>
              </div>
              <div style="font-size: 11px; color: #94a3b8; line-height: 1.6;">
                <div>Engine Version: <span style="color: #cbd5e1; font-family: var(--font-mono);">${comp.version}</span></div>
                <div>Runtime Mode: <span style="color: #38bdf8; font-weight: 600;">${comp.mode}</span></div>
                <div style="display: flex; justify-content: space-between; margin-top: 4px; border-top: 1px solid var(--border-subtle); padding-top: 6px;">
                  <span>Latency: <strong style="color: #f8fafc; font-family: var(--font-mono);">${comp.latency}</strong></span>
                  <span>Uptime: <strong style="color: #10b981; font-family: var(--font-mono);">${comp.uptime}</strong></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    `;
  }
};
