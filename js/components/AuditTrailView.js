import { AuditService } from '../services/auditService.js';

/**
 * BorderGuard AI - Immutable Cryptographic Audit Trail Component
 * Displays Section 65B compliant audit records with SHA-256 hash chaining,
 * event timestamps, officer signatures, and interactive chain verification.
 */

export const AuditTrailView = {
  render(state) {
    const logs = AuditService.getAllLogs();
    const currentScreeningId = state.currentScreening?.screeningId || 'BG-2026-001248';

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Header Banner -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">Cryptographic Audit Ledger</h1>
          <p style="font-size: 12px; color: #94a3b8;">
            Section 65B (Evidence Act) Compliant Immutable Event Sequence • SHA-256 Hash Chained
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          <button id="btnVerifyChainIntegrity" class="btn btn-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
            <span>Verify Chain Integrity</span>
          </button>
        </div>
      </div>

      <!-- Air-Gapped Local Storage & Sync Queue Banner -->
      <div style="background: ${state.isOffline ? 'rgba(245, 158, 11, 0.12)' : 'rgba(2, 132, 199, 0.1)'}; border: 1px solid ${state.isOffline ? '#f59e0b' : '#0284c7'}; border-radius: 8px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 16px;">${state.isOffline ? '📴' : '🌐'}</span>
            <strong style="font-size: 13px; color: #f8fafc; text-transform: uppercase;">
              ${state.isOffline ? 'Air-Gapped Offline Mode: Local Section 65B Vault Active' : 'WAN Online Mode: Direct National Ledger Sync'}
            </strong>
          </div>
          <p style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">
            ${state.isOffline
              ? `WAN disconnected. All audit blocks are cryptographically signed locally (SHA-256) and held in the encrypted Local Edge Vault. ${AuditService.getPendingSyncCount()} record(s) queued for replication.`
              : `Connected to Central National Audit Backbone. Edge ledger verified against parent cloud root.`}
          </p>
        </div>

        <div style="display: flex; gap: 10px;">
          ${(state.isOffline || AuditService.getPendingSyncCount() > 0) ? `
            <button id="btnFlushOfflineQueue" class="btn btn-warning" style="font-weight: 700;">
              <span>⚡ Flush Local Queue &amp; Sync with Central Cloud</span>
            </button>
          ` : ''}
        </div>
      </div>

      <!-- Chain Verification Notification Box -->
      <div id="chainVerificationResult" style="display: none; padding: 12px 16px; border-radius: 6px; font-size: 12px; font-family: var(--font-mono);">
      </div>

      <!-- Audit Events Table -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <strong style="font-size: 13px; color: #f8fafc; text-transform: uppercase;">
            Event Ledger Entries (${logs.length} Records)
          </strong>
          <span style="font-size: 11px; color: #64748b; font-family: var(--font-mono);">
            Screening Context: ${currentScreeningId}
          </span>
        </div>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Seq #</th>
                <th>Timestamp (UTC)</th>
                <th>Screening ID</th>
                <th>Storage Tier</th>
                <th>Module</th>
                <th>Event Description</th>
                <th>Status</th>
                <th>Officer</th>
                <th>Cryptographic SHA-256 Signature</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map(log => `
                <tr>
                  <td style="font-family: var(--font-mono); font-size: 11px; color: #64748b;">#${log.index}</td>
                  <td style="font-family: var(--font-mono); font-size: 11px; color: #94a3b8;">${log.timestamp.split('T')[1]?.substring(0, 8)}</td>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8;">${log.screeningId}</td>
                  <td>
                    <span class="badge ${log.storageTier === 'LOCAL_OFFLINE_VAULT' ? 'badge-review' : 'badge-low'}" style="font-size: 9px;">
                      ${log.storageTier === 'LOCAL_OFFLINE_VAULT' ? '📴 LOCAL VAULT' : '🌐 CENTRAL'}
                    </span>
                  </td>
                  <td><span class="badge badge-info" style="font-size: 10px;">${log.module}</span></td>
                  <td style="font-weight: 600; color: #f8fafc;">${log.event}</td>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; color: ${log.status === 'ALERT' ? '#ef4444' : '#10b981'};">
                      ${log.status}
                    </span>
                  </td>
                  <td style="font-family: var(--font-mono); font-size: 11px;">${log.officer}</td>
                  <td style="font-family: var(--font-mono); font-size: 10px; color: #64748b; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${log.entryHash}">
                    ${log.entryHash.substring(0, 16)}...
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
    const verifyBtn = document.getElementById('btnVerifyChainIntegrity');
    if (verifyBtn) {
      verifyBtn.addEventListener('click', async () => {
        const resultEl = document.getElementById('chainVerificationResult');
        if (!resultEl) return;

        resultEl.style.display = 'block';
        resultEl.style.background = 'rgba(56, 189, 248, 0.1)';
        resultEl.style.border = '1px solid #0284c7';
        resultEl.style.color = '#38bdf8';
        resultEl.textContent = 'Verifying cryptographic chain signatures across all ledger blocks...';

        const verification = await AuditService.verifyChain();
        setTimeout(() => {
          if (verification.intact) {
            resultEl.style.background = 'rgba(16, 185, 129, 0.15)';
            resultEl.style.border = '1px solid #10b981';
            resultEl.style.color = '#10b981';
            resultEl.innerHTML = `✓ <strong>CRYPTOGRAPHIC CHAIN VERIFIED:</strong> All ${verification.totalEntries} blocks match their SHA-256 parent hash pointers. Zero retro-alterations detected. Ledger is legally admissible under Section 65B.`;
          } else {
            resultEl.style.background = 'rgba(239, 68, 68, 0.15)';
            resultEl.style.border = '1px solid #ef4444';
            resultEl.style.color = '#ef4444';
            resultEl.innerHTML = `✗ <strong>CHAIN INTEGRITY FAILURE:</strong> Hash pointer mismatch at block #${verification.brokenIndex}.`;
          }
        }, 500);
      });
    }

    const flushBtn = document.getElementById('btnFlushOfflineQueue');
    if (flushBtn) {
      flushBtn.addEventListener('click', async () => {
        const res = await AuditService.syncOfflineVaultToCentral();
        alert(`[WAN SYNC RESTORED] ${res.message}\nAll pending Section 65B offline blocks have been securely uploaded to the Central National Ledger.`);
        app.renderCurrentView();
      });
    }
  }
};
