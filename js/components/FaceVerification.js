/**
 * BorderGuard AI - Biometric Face Verification & Liveness Panel
 * Side-by-side comparison of document portrait vs live camera capture,
 * similarity score evaluation against 80% threshold, and anti-spoofing liveness indicators.
 */

export const FaceVerification = {
  render(faceData = {}, livenessData = {}, images = {}) {
    const similarity = faceData.similarityScore !== undefined ? faceData.similarityScore : 96.8;
    const threshold = faceData.threshold || 80.0;
    const isMatch = faceData.isMatch !== undefined ? faceData.isMatch : (similarity >= threshold);
    const liveness = livenessData.status || 'PASS';

    return `
    <div style="display: flex; flex-direction: column; gap: 18px;">
      <!-- Biometric Comparison Arena -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- Left: Document Portrait -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; text-align: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Extracted Document Portrait</span>
            <span class="badge badge-info">CHIP / BIODATA</span>
          </div>

          <div style="position: relative; display: inline-block; width: 180px; height: 220px; border-radius: 6px; overflow: hidden; border: 2px solid var(--border-medium); background: #000;">
            <img src="${images.extractedFaceUri || ''}" style="width: 100%; height: 100%; object-fit: cover;" alt="Document Face"/>
            <!-- Biometric Bounding Box -->
            <div style="position: absolute; top: 15%; left: 15%; width: 70%; height: 70%; border: 2px dashed #38bdf8; border-radius: 4px; pointer-events: none;">
              <span style="position: absolute; top: 2px; left: 4px; font-size: 8px; font-family: monospace; color: #38bdf8; background: rgba(0,0,0,0.6); padding: 1px 3px;">PORTRAIT BOX</span>
            </div>
          </div>

          <div style="margin-top: 10px; font-size: 11px; color: #94a3b8;">
            ICAO Quality: <strong style="color: #f8fafc;">${faceData.docQuality || 'Optimal (98%)'}</strong>
          </div>
        </div>

        <!-- Right: Live / Captured Traveller Image -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; text-align: center;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Live Checkpoint Capture</span>
            <span class="badge badge-low">LANE 04 CAMERA</span>
          </div>

          <div style="position: relative; display: inline-block; width: 180px; height: 220px; border-radius: 6px; overflow: hidden; border: 2px solid ${isMatch ? '#10b981' : '#ef4444'}; background: #000;">
            <img src="${images.travellerLiveUri || ''}" style="width: 100%; height: 100%; object-fit: cover;" alt="Live Face"/>
            <!-- Biometric Bounding Box -->
            <div style="position: absolute; top: 12%; left: 15%; width: 70%; height: 75%; border: 2px solid ${isMatch ? '#10b981' : '#ef4444'}; border-radius: 4px; pointer-events: none;">
              <span style="position: absolute; top: 2px; left: 4px; font-size: 8px; font-family: monospace; color: ${isMatch ? '#10b981' : '#ef4444'}; background: rgba(0,0,0,0.6); padding: 1px 3px;">
                ${isMatch ? 'BIOMETRIC MATCH' : 'FACIAL MISMATCH'}
              </span>
            </div>
          </div>

          <div style="margin-top: 10px; font-size: 11px; color: #94a3b8;">
            Capture Quality: <strong style="color: #f8fafc;">${faceData.liveQuality || 'Optimal (96%)'}</strong>
          </div>
        </div>
      </div>

      <!-- Similarity Score Gauge Card -->
      <div style="background: var(--bg-subtle); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Biometric Cosine Similarity</div>
          <div style="font-size: 32px; font-weight: 900; font-family: var(--font-mono); color: ${isMatch ? '#10b981' : '#ef4444'}; line-height: 1.1;">
            ${similarity.toFixed(1)}%
          </div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            Verification Threshold: <strong>${threshold}%</strong>
          </div>
        </div>

        <div>
          <span class="badge ${isMatch ? 'badge-low' : 'badge-high'}" style="font-size: 14px; padding: 6px 14px;">
            ${isMatch ? '✓ BIOMETRIC MATCH VERIFIED' : '✗ BIOMETRIC MISMATCH DETECTED'}
          </span>
        </div>
      </div>

      <!-- Liveness & Anti-Spoofing Simulation Module -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="font-size: 12px; font-weight: 700; color: #f8fafc; text-transform: uppercase;">
            Anti-Spoofing & Liveness Telemetry (Prototype Simulation)
          </div>
          <!-- Liveness Simulator Switcher -->
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary btn-sm btn-sim-liveness" data-state="PASS" style="font-size: 10px; padding: 2px 8px;">Simulate PASS</button>
            <button class="btn btn-secondary btn-sm btn-sim-liveness" data-state="REVIEW" style="font-size: 10px; padding: 2px 8px;">Simulate REVIEW</button>
            <button class="btn btn-secondary btn-sm btn-sim-liveness" data-state="FAIL" style="font-size: 10px; padding: 2px 8px;">Simulate FAIL</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <div style="background: var(--bg-subtle); padding: 10px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Face Volumetric Depth</div>
            <div style="font-size: 13px; font-weight: 700; color: ${liveness === 'FAIL' ? '#ef4444' : '#10b981'}; margin-top: 4px;">
              ${liveness === 'FAIL' ? '✗ 2D Screen Detected' : '✓ 3D Depth Verified'}
            </div>
          </div>

          <div style="background: var(--bg-subtle); padding: 10px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Micro-Movement Analysis</div>
            <div style="font-size: 13px; font-weight: 700; color: ${liveness === 'FAIL' ? '#ef4444' : '#10b981'}; margin-top: 4px;">
              ${liveness === 'FAIL' ? '✗ Static Frame Replay' : '✓ Natural Ocular Saccades'}
            </div>
          </div>

          <div style="background: var(--bg-subtle); padding: 10px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Presentation Attack (PAD)</div>
            <div style="font-size: 13px; font-weight: 700; color: ${liveness === 'FAIL' ? '#ef4444' : '#10b981'}; margin-top: 4px;">
              ${liveness === 'FAIL' ? '🚨 Attack Flagged' : '✓ None Detected'}
            </div>
          </div>

          <div style="background: var(--bg-subtle); padding: 10px; border-radius: 6px;">
            <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Liveness Confidence</div>
            <div style="font-size: 13px; font-weight: 700; color: #38bdf8; margin-top: 4px;">
              ${livenessData.livenessConfidence || 95}%
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app) {
    document.querySelectorAll('.btn-sim-liveness').forEach(btn => {
      btn.addEventListener('click', () => {
        const state = btn.getAttribute('data-state');
        app.updateLivenessState(state);
      });
    });
  }
};
