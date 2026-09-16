/**
 * BorderGuard AI - Explainable Risk Score & Officer Action Panel
 * Renders circular SVG risk gauge, horizontal contribution breakdown,
 * AI Screening Recommendation, and officer decision action triggers.
 */

export const RiskEnginePanel = {
  render(riskResult = {}, travellerData = {}, documentData = {}) {
    const score = riskResult.score !== undefined ? riskResult.score : 18;
    const level = riskResult.level || 'LOW RISK';
    const color = riskResult.color || '#10b981';
    const recommendation = riskResult.recommendation || 'Proceed to standard officer clearance.';
    const confidence = riskResult.aiConfidence || 94.6;
    const factors = riskResult.factors || [];

    // Circular gauge calculations (circumference for r=68 is ~427)
    const radius = 68;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Top Summary Grid: Gauge + Recommendation + Identity -->
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 20px;">
        <!-- Circular Risk Gauge Card -->
        <div class="risk-card">
          <div style="position: relative; width: 170px; height: 170px;">
            <svg class="gauge-svg" viewBox="0 0 160 160">
              <circle class="gauge-bg" cx="80" cy="80" r="${radius}"></circle>
              <circle 
                class="gauge-fill" 
                cx="80" 
                cy="80" 
                r="${radius}" 
                style="stroke: ${color}; stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"
              ></circle>
            </svg>
            <div class="gauge-text-container">
              <span class="gauge-score" style="color: ${color};">${score}</span>
              <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">/ 100</span>
              <span class="gauge-label" style="color: ${color};">${level}</span>
            </div>
          </div>

          <div style="margin-top: 14px; font-size: 12px; color: #94a3b8;">
            AI System Confidence: <strong style="color: #f8fafc;">${confidence}%</strong>
          </div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">
            Multi-Signal Weighted Evaluation
          </div>
        </div>

        <!-- Traveller & AI Screening Recommendation Card -->
        <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Screening Subject</span>
                <h2 style="font-size: 20px; font-weight: 800; color: #f8fafc; font-family: var(--font-mono);">${travellerData.name || 'TRAVELLER'}</h2>
                <div style="font-size: 12px; color: #94a3b8;">
                  Citizenship: <strong style="color: #f8fafc;">${travellerData.countryName || travellerData.nationality || 'IND'}</strong> • Doc: <span style="font-family: var(--font-mono); color: #38bdf8;">${documentData.docNumber || '—'}</span>
                </div>
              </div>
              <span class="badge ${score >= 70 ? 'badge-high' : (score >= 31 ? 'badge-review' : 'badge-low')}" style="font-size: 12px; padding: 4px 10px;">
                ${level}
              </span>
            </div>

            <!-- Recommendation Box -->
            <div style="margin-top: 18px; background: var(--bg-subtle); border-left: 4px solid ${color}; border-radius: 4px; padding: 14px;">
              <div style="font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700;">AI Screening Recommendation</div>
              <div style="font-size: 15px; font-weight: 700; color: #f8fafc; margin-top: 4px;">
                ${recommendation}
              </div>
              <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">
                *Decision-support protocol: AI does not make legal clearance determinations. Authorized officer must execute formal action.
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap;">
            <button id="btnOpenEvidence" class="btn btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View Full Evidence</span>
            </button>
            <button id="btnOpenAudit" class="btn btn-secondary">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <span>View Audit Trail</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Explainable Risk Factors Contribution Chart -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div>
            <h3 style="font-size: 14px; font-weight: 700; color: #f8fafc;">Explainable Risk Factor Contribution Breakdown</h3>
            <p style="font-size: 12px; color: #94a3b8;">Transparent mathematical explanation of positive penalties and verified mitigating factors</p>
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; color: #94a3b8;">
            Baseline: 0 pts • Score: <strong style="color: ${color};">${score} / 100</strong>
          </div>
        </div>

        <div class="factor-bar-list">
          ${factors.map(factor => `
            <div class="factor-bar-item">
              <div class="factor-desc">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 10px; font-family: var(--font-mono); text-transform: uppercase; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 1px 6px; border-radius: 3px;">
                    ${factor.module}
                  </span>
                  <span class="factor-name">${factor.label}</span>
                </div>
                <div class="factor-details">${factor.explanation}</div>
              </div>
              <div class="factor-delta ${factor.type === 'PENALTY' ? 'delta-penalty' : 'delta-benefit'}">
                ${factor.delta > 0 ? `+${factor.delta}` : factor.delta} pts
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Officer Action Execution Console -->
      <div style="background-color: var(--bg-subtle); border: 1px solid var(--border-medium); border-radius: 8px; padding: 20px;">
        <div style="font-size: 13px; font-weight: 800; color: #f8fafc; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
          Authorized Officer Adjudication Action
        </div>
        <p style="font-size: 12px; color: #94a3b8; margin-bottom: 14px;">
          Select immigration clearance disposition. Action will be permanently recorded in the Section 65B compliant audit trail.
        </p>

        <!-- Officer Notes Textarea -->
        <div style="margin-bottom: 16px;">
          <label style="display: block; font-size: 11px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; margin-bottom: 6px;">
            Officer Observations / Case Notes (Optional):
          </label>
          <textarea 
            id="officerNotesField" 
            style="width: 100%; height: 60px; background: var(--bg-input); border: 1px solid var(--border-medium); border-radius: 6px; padding: 8px 12px; color: #f8fafc; font-family: var(--font-sans); font-size: 12px; resize: none; outline: none;"
            placeholder="Document condition, secondary interview notes, supervisor consultation notes..."
          ></textarea>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <button id="btnActionClear" class="btn btn-success" style="flex: 1; min-width: 180px; padding: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>[ PROCEED TO CLEARANCE ]</span>
          </button>

          <button id="btnActionReview" class="btn btn-warning" style="flex: 1; min-width: 180px; padding: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>[ SEND FOR REVIEW ]</span>
          </button>

          <button id="btnActionFlag" class="btn btn-danger" style="flex: 1; min-width: 180px; padding: 12px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>[ FLAG FOR INVESTIGATION ]</span>
          </button>
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app) {
    const clearBtn = document.getElementById('btnActionClear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const note = document.getElementById('officerNotesField')?.value || '';
        app.promptOfficerAction('CLEARED', 'Proceed to standard immigration entry clearance.', note);
      });
    }

    const reviewBtn = document.getElementById('btnActionReview');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        const note = document.getElementById('officerNotesField')?.value || '';
        app.promptOfficerAction('REVIEW', 'Referred to Secondary Inspection Lane B for document verification.', note);
      });
    }

    const flagBtn = document.getElementById('btnActionFlag');
    if (flagBtn) {
      flagBtn.addEventListener('click', () => {
        const note = document.getElementById('officerNotesField')?.value || '';
        app.promptOfficerAction('INVESTIGATION', 'Subject flagged for formal fraud investigation and detainment.', note);
      });
    }

    const evBtn = document.getElementById('btnOpenEvidence');
    if (evBtn) {
      evBtn.addEventListener('click', () => app.openEvidenceModal());
    }

    const auditBtn = document.getElementById('btnOpenAudit');
    if (auditBtn) {
      auditBtn.addEventListener('click', () => app.openAuditModal());
    }
  }
};
