/**
 * BorderGuard AI - Simulated Central Database & Watchlist Panel
 * Demonstrates simulated integration with National Passport Issuance Registry,
 * Electronic Visa Registry, and Interpol/National Watchlist databases.
 */

export const DatabasePanel = {
  render(dbResults = {}) {
    const passport = dbResults.passport || { found: true, status: 'VALID', severity: 'OK', details: 'Confirmed active in central registry.' };
    const visa = dbResults.visa || { found: true, status: 'VALID', severity: 'OK', details: 'Electronic visa valid for entry.' };
    const watchlist = dbResults.watchlist || { hasMatch: false, severity: 'OK', status: 'NO_MATCH', details: 'No active notices or flags.' };

    return `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- Simulation Warning Disclaimer -->
      <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 6px; padding: 10px 14px; font-size: 12px; color: #93c5fd; display: flex; align-items: center; gap: 10px;">
        <span>ℹ️</span>
        <div>
          <strong>AUTHORIZED DATA SOURCES — DEMO ENVIRONMENT:</strong> Queries simulated National Passport Issuance, Electronic Visa Gateways, and Interpol Border Notices. No live confidential citizen records accessed.
        </div>
      </div>

      <!-- Air-Gapped Edge Cache Notice if in Offline Mode -->
      ${passport.isOfflineCache ? `
        <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid #f59e0b; border-radius: 6px; padding: 10px 14px; font-size: 12px; color: #f59e0b; display: flex; align-items: center; gap: 10px;">
          <span>📴</span>
          <div>
            <strong>AIR-GAPPED CHECKPOINT NODE:</strong> WAN connection is offline. Queries are executing against the local cryptographically sealed Edge DB cache snapshot (Local NVMe SQLite). Live Central Passport &amp; Interpol queries suspended until WAN reconnection.
          </div>
        </div>
      ` : ''}

      <!-- Watchlist Notice Banner if Hit -->
      ${watchlist.hasMatch ? `
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; border-radius: 8px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 20px;">🚨</span>
              <strong style="font-size: 14px; color: #fca5a5;">SIMULATED WATCHLIST ALERT: ${watchlist.match?.referenceId || 'ALERT-REF'}</strong>
            </div>
            <span class="badge badge-high">${watchlist.match?.status || 'REQUIRES SUPERVISOR REVIEW'}</span>
          </div>
          <div style="font-size: 13px; color: #f8fafc; font-weight: 700; margin-top: 8px;">
            ${watchlist.match?.alertType || 'SECURITY WATCH'}
          </div>
          <p style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
            ${watchlist.match?.instructions || 'Refer subject to secondary examination immediately.'}
          </p>
        </div>
      ` : ''}

      <!-- Database Check Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
        <!-- Passport Registry -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 13px; color: #f8fafc;">National Passport Registry</strong>
            <span class="badge ${passport.status === 'VALID' ? 'badge-low' : (passport.status === 'EXPIRED' ? 'badge-review' : 'badge-high')}">
              ${passport.status || 'UNKNOWN'}
            </span>
          </div>
          <p style="font-size: 12px; color: #cbd5e1; margin-bottom: 10px;">
            ${passport.details}
          </p>
          <div style="font-size: 11px; font-family: var(--font-mono); color: #94a3b8; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
            Query Latency: <span style="color: #38bdf8;">142 ms</span> • Authority: Ministry of Interior
          </div>
        </div>

        <!-- Visa Registry -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 13px; color: #f8fafc;">Central Visa Repository</strong>
            <span class="badge ${visa.status === 'VALID' ? 'badge-low' : 'badge-high'}">
              ${visa.status || 'RECORD_FOUND'}
            </span>
          </div>
          <p style="font-size: 12px; color: #cbd5e1; margin-bottom: 10px;">
            ${visa.details}
          </p>
          <div style="font-size: 11px; font-family: var(--font-mono); color: #94a3b8; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
            Query Latency: <span style="color: #38bdf8;">88 ms</span> • Electronic Consular Network
          </div>
        </div>

        <!-- Interpol & Revocation -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong style="font-size: 13px; color: #f8fafc;">Interpol &amp; Revocation List</strong>
            <span class="badge ${watchlist.hasMatch ? 'badge-high' : 'badge-low'}">
              ${watchlist.hasMatch ? 'WATCHLIST HIT' : 'CLEAR / NO HIT'}
            </span>
          </div>
          <p style="font-size: 12px; color: #cbd5e1; margin-bottom: 10px;">
            ${watchlist.details}
          </p>
          <div style="font-size: 11px; font-family: var(--font-mono); color: #94a3b8; border-top: 1px solid var(--border-subtle); padding-top: 8px;">
            Query Latency: <span style="color: #38bdf8;">185 ms</span> • SLTD / Purple Notice Feed
          </div>
        </div>
      </div>
    </div>
    `;
  }
};
