/**
 * BorderGuard AI - Header Component
 * Displays live checkpoint info, global search, live clock, session status, and quick scenario switcher.
 */

export const Header = {
  render(state) {
    const activeScenario = state.currentScenario?.id || 'scenario_1';

    return `
    <header class="top-header">
      <div class="header-left">
        <div class="checkpoint-badge">
          <div class="pulse-dot"></div>
          <span>${state.settings?.checkpointName || 'DEL-T3-INTL'} // LANE ${state.settings?.laneNumber || '04'}</span>
        </div>

        <div class="header-search-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="globalSearchInput" 
            placeholder="Search Screening ID, Passport #, Traveller Ref..." 
            value="${state.searchQuery || ''}"
          />
        </div>
      </div>

      <div class="header-right">
        <!-- Quick Scenario Switcher for Judges -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 11px; color: #94a3b8; font-weight: 700;">DEMO SCENARIO:</span>
          <select id="quickScenarioSelect" class="filter-btn" style="padding: 6px 10px; background: #111c2e; border-color: #2a3f61; color: #38bdf8; font-weight: 700;">
            <option value="scenario_1" ${activeScenario === 'scenario_1' ? 'selected' : ''}>1: Genuine Passport (Low Risk 12)</option>
            <option value="scenario_2" ${activeScenario === 'scenario_2' ? 'selected' : ''}>2: Altered Doc Number (High Risk 76) ★</option>
            <option value="scenario_3" ${activeScenario === 'scenario_3' ? 'selected' : ''}>3: Photo Replacement (High Risk 84)</option>
            <option value="scenario_4" ${activeScenario === 'scenario_4' ? 'selected' : ''}>4: Expired Passport (Review 58)</option>
            <option value="scenario_5" ${activeScenario === 'scenario_5' ? 'selected' : ''}>5: Visa Inconsistency (High Risk 72)</option>
            <option value="scenario_6" ${activeScenario === 'scenario_6' ? 'selected' : ''}>6: Impersonator (High Risk 88)</option>
            <option value="scenario_7" ${activeScenario === 'scenario_7' ? 'selected' : ''}>7: Watchlist Match (Review 79)</option>
            <option value="scenario_8" ${activeScenario === 'scenario_8' ? 'selected' : ''}>8: Air-Gapped Offline Node (Low 15) 📴</option>
          </select>
        </div>

        <!-- Interactive WAN / Offline Air-Gap Mode Toggle -->
        <button 
          id="btnToggleNetwork" 
          class="btn ${state.isOffline ? 'btn-warning' : 'btn-secondary'} btn-sm" 
          title="Click to toggle WAN Network connection / Air-Gapped mode"
          style="font-family: var(--font-mono); font-size: 11px; padding: 4px 10px;"
        >
          ${state.isOffline ? `
            <span style="color: #ef4444;">●</span> 📴 AIR-GAP OFFLINE ${state.pendingSyncCount > 0 ? `[Vault: ${state.pendingSyncCount}]` : ''}
          ` : `
            <span style="color: #10b981;">●</span> 🌐 WAN ONLINE
          `}
        </button>

        <div class="live-clock" id="headerClock">
          --:--:-- UTC
        </div>

        <div class="demo-badge-banner" title="Simulated evaluation environment">
          DEMO MODE
        </div>

        <button id="btnLockSession" class="btn btn-secondary btn-sm" title="Lock Workstation" style="padding: 5px 10px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Lock</span>
        </button>
      </div>
    </header>
    `;
  },

  initEvents(app) {
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        app.handleGlobalSearch(e.target.value);
      });
    }

    const scenarioSelect = document.getElementById('quickScenarioSelect');
    if (scenarioSelect) {
      scenarioSelect.addEventListener('change', (e) => {
        app.loadScenario(e.target.value);
      });
    }

    const networkToggleBtn = document.getElementById('btnToggleNetwork');
    if (networkToggleBtn) {
      networkToggleBtn.addEventListener('click', () => {
        app.toggleNetworkStatus();
      });
    }

    const lockBtn = document.getElementById('btnLockSession');
    if (lockBtn) {
      lockBtn.addEventListener('click', () => {
        app.lockSession();
      });
    }

    // Start live clock
    this.updateClock();
    if (!this.clockInterval) {
      this.clockInterval = setInterval(() => this.updateClock(), 1000);
    }
  },

  updateClock() {
    const el = document.getElementById('headerClock');
    if (el) {
      const now = new Date();
      el.textContent = now.toTimeString().split(' ')[0] + ' UTC';
    }
  }
};
