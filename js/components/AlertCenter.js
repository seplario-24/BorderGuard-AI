/**
 * BorderGuard AI - Alert Center Component
 * Priority queue for document tampering, biometric fraud, and watchlist matches.
 */

export const AlertCenter = {
  render(state) {
    const alerts = state.alerts || [];

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Title -->
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">Priority Alert Center</h1>
          <p style="font-size: 12px; color: #94a3b8;">Real-time automated alarms triggered across checkpoint screening lanes</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-high" style="padding: 6px 12px; font-size: 12px;">
            ${alerts.filter(a => a.status === 'NEW').length} NEW ALERTS
          </span>
        </div>
      </div>

      <!-- Alerts Table -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Severity</th>
                <th>Alert Type</th>
                <th>Screening ID</th>
                <th>Reason &amp; Technical Signature</th>
                <th>Timestamp</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${alerts.map(alert => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: #f8fafc;">${alert.alertId}</td>
                  <td>
                    <span class="badge ${alert.severity === 'CRITICAL' ? 'badge-high' : (alert.severity === 'HIGH' ? 'badge-review' : 'badge-info')}">
                      ${alert.severity}
                    </span>
                  </td>
                  <td style="font-weight: 700; color: #f8fafc;">${alert.type}</td>
                  <td style="font-family: var(--font-mono); color: #38bdf8;">${alert.screeningId}</td>
                  <td style="font-size: 12px; color: #cbd5e1; max-width: 320px;">${alert.reason}</td>
                  <td style="font-family: var(--font-mono); font-size: 11px; color: #94a3b8;">${alert.timestamp}</td>
                  <td>
                    <span class="badge ${alert.status === 'NEW' ? 'badge-high' : (alert.status === 'UNDER_REVIEW' ? 'badge-review' : 'badge-low')}">
                      ${alert.status}
                    </span>
                  </td>
                  <td>
                    <div style="display: flex; gap: 6px;">
                      <button class="btn btn-secondary btn-sm btn-inspect-alert" data-id="${alert.screeningId}">Inspect</button>
                      ${alert.status !== 'RESOLVED' ? `
                        <button class="btn btn-primary btn-sm btn-resolve-alert" data-id="${alert.alertId}">Resolve</button>
                      ` : ''}
                    </div>
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
    document.querySelectorAll('.btn-inspect-alert').forEach(btn => {
      btn.addEventListener('click', () => {
        const screeningId = btn.getAttribute('data-id');
        app.inspectScreening(screeningId);
      });
    });

    document.querySelectorAll('.btn-resolve-alert').forEach(btn => {
      btn.addEventListener('click', () => {
        const alertId = btn.getAttribute('data-id');
        app.resolveAlert(alertId);
      });
    });
  }
};
