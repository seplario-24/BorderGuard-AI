/**
 * BorderGuard AI - System & Risk Model Settings Component
 * Allows authorized administrators to configure risk thresholds, model weights,
 * checkpoint lane parameters, and audit retention policies.
 */

export const SettingsView = {
  render(state) {
    const settings = state.settings || {
      checkpointName: 'DEL-T3-INTL',
      laneNumber: '04',
      officerName: 'Toyesh Jalamkar',
      officerRole: 'Senior Immigration Inspector',
      thresholdLow: 30,
      thresholdReview: 69,
      thresholdFace: 80,
      weights: {
        authenticity: 25,
        tampering: 25,
        face: 20,
        mrzConsistency: 10,
        database: 10,
        visaDate: 5,
        liveness: 5
      }
    };

    const w = settings.weights;
    const currentSum = w.authenticity + w.tampering + w.face + w.mrzConsistency + w.database + w.visaDate + w.liveness;

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Title -->
      <div>
        <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">System &amp; Risk Engine Configuration</h1>
        <p style="font-size: 12px; color: #94a3b8;">Fine-tune decision-support risk parameters, mathematical weighting, and terminal routing</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <!-- Checkpoint & Station Identity -->
        <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
          <div style="font-size: 13px; font-weight: 800; color: #f8fafc; text-transform: uppercase; margin-bottom: 14px;">
            1. Checkpoint Station Configuration
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
            <div>
              <label style="display: block; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">CHECKPOINT IDENTIFIER</label>
              <input type="text" id="settingCheckpoint" value="${settings.checkpointName}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 8px 12px; color: #f8fafc; font-family: var(--font-mono); outline: none;"/>
            </div>

            <div>
              <label style="display: block; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">INSPECTION LANE NUMBER</label>
              <input type="text" id="settingLane" value="${settings.laneNumber}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 8px 12px; color: #f8fafc; font-family: var(--font-mono); outline: none;"/>
            </div>

            <div>
              <label style="display: block; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">INSPECTOR / OFFICER NAME</label>
              <input type="text" id="settingOfficerName" value="${settings.officerName || 'Toyesh Jalamkar'}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 8px 12px; color: #f8fafc; outline: none;"/>
            </div>

            <div>
              <label style="display: block; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">OFFICER AUTHORIZATION TIER</label>
              <input type="text" id="settingRole" value="${settings.officerRole}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 8px 12px; color: #f8fafc; outline: none;"/>
            </div>

            <div>
              <label style="display: block; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">FACIAL VERIFICATION MATCH THRESHOLD (%)</label>
              <input type="number" id="settingFaceThreshold" value="${settings.thresholdFace}" min="50" max="99" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 8px 12px; color: #f8fafc; font-family: var(--font-mono); outline: none;"/>
            </div>
          </div>
        </div>

        <!-- Risk Thresholds -->
        <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
          <div style="font-size: 13px; font-weight: 800; color: #f8fafc; text-transform: uppercase; margin-bottom: 14px;">
            2. Risk Level Threshold Boundaries
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; font-size: 12px;">
            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px; border-left: 4px solid var(--status-low);">
              <div style="font-weight: 700; color: #10b981;">LOW RISK THRESHOLD: 0 – 30 pts</div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Standard clearance workflow. Low inspection friction.</div>
            </div>

            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px; border-left: 4px solid var(--status-review);">
              <div style="font-weight: 700; color: #f59e0b;">OFFICER REVIEW THRESHOLD: 31 – 69 pts</div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Prompts mandatory manual secondary document verification.</div>
            </div>

            <div style="background: var(--bg-subtle); padding: 12px; border-radius: 6px; border-left: 4px solid var(--status-high);">
              <div style="font-weight: 700; color: #ef4444;">HIGH RISK THRESHOLD: 70 – 100 pts</div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Immediate supervisor referral and formal forensics investigation.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Configurable Model Weights -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div>
            <div style="font-size: 13px; font-weight: 800; color: #f8fafc; text-transform: uppercase;">
              3. AI Multi-Signal Weighting Matrix
            </div>
            <div style="font-size: 11px; color: #94a3b8;">Weights dictate relative contribution to cumulative risk score (Total must equal 100%)</div>
          </div>
          <span class="badge ${currentSum === 100 ? 'badge-low' : 'badge-high'}" id="weightSumBadge">
            TOTAL: ${currentSum}%
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; font-size: 12px;">
          <div>
            <label style="color: var(--text-muted); font-weight: 700;">DOCUMENT AUTHENTICITY</label>
            <input type="number" id="weightAuth" class="weight-input" value="${w.authenticity}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>

          <div>
            <label style="color: var(--text-muted); font-weight: 700;">TAMPERING / FORENSICS</label>
            <input type="number" id="weightTamper" class="weight-input" value="${w.tampering}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>

          <div>
            <label style="color: var(--text-muted); font-weight: 700;">BIOMETRIC FACE MATCH</label>
            <input type="number" id="weightFace" class="weight-input" value="${w.face}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>

          <div>
            <label style="color: var(--text-muted); font-weight: 700;">MRZ / CONSISTENCY</label>
            <input type="number" id="weightMrz" class="weight-input" value="${w.mrzConsistency}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>

          <div>
            <label style="color: var(--text-muted); font-weight: 700;">CENTRAL REGISTRIES</label>
            <input type="number" id="weightDb" class="weight-input" value="${w.database}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>

          <div>
            <label style="color: var(--text-muted); font-weight: 700;">VISA / EXPIRY DATES</label>
            <input type="number" id="weightVisa" class="weight-input" value="${w.visaDate}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>

          <div>
            <label style="color: var(--text-muted); font-weight: 700;">LIVENESS / SPOOFING</label>
            <input type="number" id="weightLiveness" class="weight-input" value="${w.liveness}" style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 8px; color: #f8fafc; font-family: var(--font-mono); border-radius: 4px; margin-top: 4px;"/>
          </div>
        </div>

        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <button id="btnSaveSettings" class="btn btn-primary">
            Save Configuration Changes
          </button>
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app) {
    const saveBtn = document.getElementById('btnSaveSettings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const auth = parseInt(document.getElementById('weightAuth')?.value || 25, 10);
        const tamper = parseInt(document.getElementById('weightTamper')?.value || 25, 10);
        const face = parseInt(document.getElementById('weightFace')?.value || 20, 10);
        const mrz = parseInt(document.getElementById('weightMrz')?.value || 10, 10);
        const db = parseInt(document.getElementById('weightDb')?.value || 10, 10);
        const visa = parseInt(document.getElementById('weightVisa')?.value || 5, 10);
        const liveness = parseInt(document.getElementById('weightLiveness')?.value || 5, 10);

        const total = auth + tamper + face + mrz + db + visa + liveness;
        if (total !== 100) {
          alert(`Warning: Model weights must sum to exactly 100% (Current sum is ${total}%). Please adjust values.`);
          return;
        }

        app.updateSettings({
          checkpointName: document.getElementById('settingCheckpoint')?.value || 'DEL-T3-INTL',
          laneNumber: document.getElementById('settingLane')?.value || '04',
          officerName: document.getElementById('settingOfficerName')?.value || 'Toyesh Jalamkar',
          officerRole: document.getElementById('settingRole')?.value || 'Senior Immigration Inspector',
          thresholdFace: parseFloat(document.getElementById('settingFaceThreshold')?.value || 80),
          weights: {
            authenticity: auth,
            tampering: tamper,
            face,
            mrzConsistency: mrz,
            database: db,
            visaDate: visa,
            liveness
          }
        });

        alert('Settings and AI model weights updated successfully.');
      });
    }
  }
};
