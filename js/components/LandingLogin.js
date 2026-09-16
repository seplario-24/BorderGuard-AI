/**
 * BorderGuard AI - Security Landing & Officer Login Portal Component
 * Executive security login console with quickstart demo shortcuts and architecture highlights.
 */

export const LandingLogin = {
  render() {
    return `
    <div style="min-height: 100vh; width: 100vw; background: radial-gradient(circle at 50% 20%, #111c2e 0%, #070c14 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; box-sizing: border-box;">
      <!-- Main Security Container -->
      <div style="width: 100%; max-width: 520px; background: #0b121e; border: 1px solid #1e2f4a; border-radius: 12px; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
        <!-- Brand Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="width: 56px; height: 56px; margin: 0 auto 16px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(2, 132, 199, 0.4);">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h1 style="font-size: 24px; font-weight: 800; color: #f8fafc; letter-spacing: -0.5px;">BorderGuard AI</h1>
          <div style="font-size: 13px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
            Ministry of Home Affairs
          </div>
          <div style="font-size: 11px; text-transform: uppercase; color: #38bdf8; font-weight: 700; letter-spacing: 1.5px; margin-top: 4px;">
            AI-Assisted Border Identity &amp; Document Screening Platform
          </div>
        </div>

        <!-- Secure Protocol Status -->
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 8px 12px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; font-size: 11px;">
          <span style="color: #cbd5e1;">ENCRYPTED TERMINAL LINK</span>
          <span style="color: #10b981; font-weight: 700;">● SYSTEM OPERATIONAL</span>
        </div>

        <!-- Simulated Authentication Form -->
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">
              Officer Credential ID
            </label>
            <input 
              type="text" 
              id="loginOfficerId" 
              value="OFF-4819" 
              style="width: 100%; background: #070c14; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px 14px; color: #f8fafc; font-family: var(--font-mono); font-size: 13px; outline: none;"
            />
          </div>

          <div>
            <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">
              Security Passcode / Token
            </label>
            <input 
              type="password" 
              id="loginPassword" 
              value="••••••••••••" 
              style="width: 100%; background: #070c14; border: 1px solid #2a3f61; border-radius: 6px; padding: 10px 14px; color: #f8fafc; font-family: var(--font-mono); font-size: 13px; outline: none;"
            />
          </div>

          <button id="btnLoginSubmit" class="btn btn-primary" style="padding: 12px; font-size: 14px; margin-top: 8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>Authenticate &amp; Launch Console</span>
          </button>

          <!-- 1-Click Demo Shortcut for Judges -->
          <button id="btnQuickDemoStart" class="btn btn-danger" style="padding: 12px; font-size: 14px; box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);">
            <span>⚡ Instant Demo Quickstart (Altered Passport Scenario)</span>
          </button>
        </div>

        <!-- Disclaimer Footer -->
        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #1e2f4a; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5;">
          Prototype / Demonstration System — Not connected to real government databases.<br/>
          AI-generated results are decision-support indicators. Final immigration decisions remain with authorized officers.
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app) {
    const loginBtn = document.getElementById('btnLoginSubmit');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        app.handleLogin();
      });
    }

    const quickDemoBtn = document.getElementById('btnQuickDemoStart');
    if (quickDemoBtn) {
      quickDemoBtn.addEventListener('click', () => {
        app.handleLogin();
        app.loadScenario('scenario_2');
        app.navigate('new_screening');
        app.triggerScreeningProcess();
      });
    }
  }
};
