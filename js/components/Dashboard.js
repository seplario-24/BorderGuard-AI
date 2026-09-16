/**
 * BorderGuard AI - Main Command Dashboard Component
 * Displays real-time operational statistics, recent traveller screenings,
 * alert indicators, and one-click demo launch cards.
 */

export const Dashboard = {
  render(state) {
    const stats = state.stats || {
      activeScreenings: 1,
      screeningsToday: 1248,
      clearedToday: 1137,
      requiresReview: 82,
      highRisk: 29,
      avgScreeningTime: '4.8 sec',
      documentsAnalyzed: 3842,
      tamperingAlerts: 67,
      faceMismatchAlerts: 24
    };

    const recentScreenings = state.screenings || [];

    return `
    <div class="dashboard-view">
      <!-- Legal / AI Decision-Support Disclaimer Banner -->
      <div class="disclaimer-bar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" style="flex-shrink: 0;">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div>
          <strong>AI DECISION-SUPPORT PROTOCOL:</strong> AI-generated signals and risk metrics are investigative indicators to support officer judgement. Final immigration clearance decisions remain with authorized border officers under national jurisdiction.
        </div>
      </div>

      <!-- Quick Action / Demo Header Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h1 style="font-size: 22px; font-weight: 800; color: #f8fafc; letter-spacing: -0.5px;">Border Screening Command Center</h1>
          <p style="font-size: 13px; color: #94a3b8;">Terminal 3 International Arrivals • Automated Multi-Signal Verification Console</p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button id="btnLaunchFlagshipDemo" class="btn btn-danger" style="box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);">
            <span>⚡ Run Flagship Demo (Altered Passport)</span>
          </button>
          <button id="btnStartNewScreening" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>New Screening</span>
          </button>
        </div>
      </div>

      <!-- Operational Metric Cards (9 Cards) -->
      <div class="grid-cards">
        <div class="stat-card stat-info">
          <div class="stat-header">
            <span>Active Screening</span>
            <span class="pulse-dot"></span>
          </div>
          <div class="stat-value">${stats.activeScreenings}</div>
          <div class="stat-subtext">Traveller at Lane 04 scanner</div>
        </div>

        <div class="stat-card stat-info">
          <div class="stat-header">
            <span>Screenings Today</span>
            <span>📅</span>
          </div>
          <div class="stat-value">${stats.screeningsToday.toLocaleString()}</div>
          <div class="stat-subtext">+14.2% vs previous 24h</div>
        </div>

        <div class="stat-card stat-low">
          <div class="stat-header">
            <span>Cleared</span>
            <span style="color: var(--status-low);">✓</span>
          </div>
          <div class="stat-value" style="color: var(--status-low);">${stats.clearedToday.toLocaleString()}</div>
          <div class="stat-subtext">91.1% standard clearance</div>
        </div>

        <div class="stat-card stat-review">
          <div class="stat-header">
            <span>Requires Review</span>
            <span style="color: var(--status-review);">⚠</span>
          </div>
          <div class="stat-value" style="color: var(--status-review);">${stats.requiresReview}</div>
          <div class="stat-subtext">Secondary document review</div>
        </div>

        <div class="stat-card stat-high">
          <div class="stat-header">
            <span>High Risk</span>
            <span style="color: var(--status-high);">🚨</span>
          </div>
          <div class="stat-value" style="color: var(--status-high);">${stats.highRisk}</div>
          <div class="stat-subtext">Referred for secondary inspection</div>
        </div>

        <div class="stat-card stat-info">
          <div class="stat-header">
            <span>Avg Screening Time</span>
            <span>⏱</span>
          </div>
          <div class="stat-value">${stats.avgScreeningTime}</div>
          <div class="stat-subtext">vs. 4.5 min manual inspection</div>
        </div>

        <div class="stat-card stat-info">
          <div class="stat-header">
            <span>Documents Analyzed</span>
            <span>📑</span>
          </div>
          <div class="stat-value">${stats.documentsAnalyzed.toLocaleString()}</div>
          <div class="stat-subtext">Passports, Visas, Permits</div>
        </div>

        <div class="stat-card stat-high">
          <div class="stat-header">
            <span>Tampering Alerts</span>
            <span>🔍</span>
          </div>
          <div class="stat-value" style="color: var(--status-high);">${stats.tamperingAlerts}</div>
          <div class="stat-subtext">Font, ELA & photo alterations</div>
        </div>

        <div class="stat-card stat-review">
          <div class="stat-header">
            <span>Face Mismatches</span>
            <span>👤</span>
          </div>
          <div class="stat-value" style="color: var(--status-review);">${stats.faceMismatchAlerts}</div>
          <div class="stat-subtext">Biometric similarity &lt; 80%</div>
        </div>
      </div>

      <!-- Interactive Pre-Built Scenarios Tray for Judges -->
      <div style="background: #0f1826; border: 1px solid #1e2f4a; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">🎯</span>
            <span style="font-size: 14px; font-weight: 700; color: #f8fafc;">Select Pre-Configured Test Scenario for Inspection:</span>
          </div>
          <span style="font-size: 11px; color: #64748b; font-family: var(--font-mono);">7 DETERMINISTIC BENCHMARK CASES</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px;">
          <div class="scenario-pill-btn" data-scenario="scenario_1" style="cursor: pointer; background: #142033; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #f8fafc;">1. Genuine Passport</strong>
              <span class="badge badge-low">Score: 12</span>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Clean ICAO MRZ, 97% biometric match, verified registry.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_2" style="cursor: pointer; background: #1c1a29; border: 1px solid #ef4444; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #fca5a5;">2. Altered Passport No. ★</strong>
              <span class="badge badge-high">Score: 76</span>
            </div>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">Visual number A1234567 vs MRZ X7429136, local ELA anomaly.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_3" style="cursor: pointer; background: #142033; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #f8fafc;">3. Photo Replacement</strong>
              <span class="badge badge-high">Score: 84</span>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Portrait border cut-line halo; face match drops to 41.2%.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_4" style="cursor: pointer; background: #142033; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #f8fafc;">4. Expired Passport</strong>
              <span class="badge badge-review">Score: 58</span>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Document expired 2024-02-11; prompts renewal verification.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_5" style="cursor: pointer; background: #142033; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #f8fafc;">5. Visa Inconsistency</strong>
              <span class="badge badge-high">Score: 72</span>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Visa issued to another passport; digital overlay stamp detected.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_6" style="cursor: pointer; background: #142033; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #f8fafc;">6. Biometric Impersonator</strong>
              <span class="badge badge-high">Score: 88</span>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Valid document presented by wrong person; 38.4% face match.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_7" style="cursor: pointer; background: #142033; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #f8fafc;">7. Watchlist Match</strong>
              <span class="badge badge-high">Score: 79</span>
            </div>
            <p style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Simulated Interpol Purple Notice (DEMO-WL-00421) alert.</p>
          </div>

          <div class="scenario-pill-btn" data-scenario="scenario_8" style="cursor: pointer; background: #172418; border: 1px solid #10b981; border-radius: 6px; padding: 10px; transition: all 0.15s;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="font-size: 12px; color: #86efac;">8. Air-Gapped Offline Node 📴</strong>
              <span class="badge badge-low">Score: 15</span>
            </div>
            <p style="font-size: 11px; color: #cbd5e1; margin-top: 4px;">WAN disconnected. Local Edge AI + Local Section 65B Vault storage.</p>
          </div>
        </div>
      </div>

      <!-- Recent Screenings Table -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 style="font-size: 15px; font-weight: 700; color: #f8fafc;">Recent Checkpoint Screenings (Lane 04)</h2>
            <p style="font-size: 12px; color: #94a3b8;">Automated multi-signal audit log and officer actions</p>
          </div>
          <button id="btnViewAllHistory" class="btn btn-secondary btn-sm">View Full History</button>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Screening ID</th>
                <th>Timestamp</th>
                <th>Traveller Ref</th>
                <th>Document</th>
                <th>Country</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${recentScreenings.slice(0, 5).map(s => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8;">${s.screeningId}</td>
                  <td style="font-family: var(--font-mono); font-size: 12px; color: #94a3b8;">${s.timestamp.split('T')[1]?.substring(0, 8) || s.timestamp}</td>
                  <td style="font-family: var(--font-mono); font-size: 12px;">${s.travellerRef}</td>
                  <td>${s.documentType}</td>
                  <td><span style="font-weight: 700;">${s.country}</span></td>
                  <td>
                    <span class="badge ${s.riskScore >= 70 ? 'badge-high' : (s.riskScore >= 31 ? 'badge-review' : 'badge-low')}">
                      ${s.riskScore} / 100
                    </span>
                  </td>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; color: ${s.actionTaken === 'CLEARED' ? '#10b981' : (s.actionTaken === 'REVIEW' ? '#f59e0b' : '#ef4444')};">
                      ${s.actionTaken || 'PENDING'}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm btn-inspect-row" data-id="${s.screeningId}">Inspect</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app) {
    const newBtn = document.getElementById('btnStartNewScreening');
    if (newBtn) {
      newBtn.addEventListener('click', () => app.navigate('new_screening'));
    }

    const flagshipBtn = document.getElementById('btnLaunchFlagshipDemo');
    if (flagshipBtn) {
      flagshipBtn.addEventListener('click', () => {
        app.loadScenario('scenario_2');
        app.navigate('new_screening');
        app.triggerScreeningProcess();
      });
    }

    const viewAllBtn = document.getElementById('btnViewAllHistory');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', () => app.navigate('screening_history'));
    }

    document.querySelectorAll('.scenario-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const scenarioId = btn.getAttribute('data-scenario');
        app.loadScenario(scenarioId);
        app.navigate('new_screening');
      });
    });

    document.querySelectorAll('.btn-inspect-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        app.inspectScreening(id);
      });
    });
  }
};
