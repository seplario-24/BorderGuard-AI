/**
 * BorderGuard AI - Screening History Registry Component
 * Filterable, searchable repository of all border inspections.
 */

export const ScreeningHistory = {
  currentFilter: 'ALL',

  render(state) {
    const list = state.screenings || [];
    let filtered = list;

    if (this.currentFilter === 'LOW') {
      filtered = list.filter(s => s.riskScore <= 30);
    } else if (this.currentFilter === 'REVIEW') {
      filtered = list.filter(s => s.riskScore > 30 && s.riskScore < 70);
    } else if (this.currentFilter === 'HIGH') {
      filtered = list.filter(s => s.riskScore >= 70);
    } else if (this.currentFilter === 'TAMPERING') {
      filtered = list.filter(s => s.tags?.includes('TAMPERING') || s.tags?.includes('ALTERED'));
    } else if (this.currentFilter === 'FACE_MISMATCH') {
      filtered = list.filter(s => s.tags?.includes('FACE_MISMATCH'));
    } else if (this.currentFilter === 'EXPIRED') {
      filtered = list.filter(s => s.tags?.includes('EXPIRED'));
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.screeningId.toLowerCase().includes(q) ||
        s.travellerRef.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q)
      );
    }

    const filters = [
      { id: 'ALL', label: 'All Cases' },
      { id: 'LOW', label: 'Low Risk' },
      { id: 'REVIEW', label: 'Under Review' },
      { id: 'HIGH', label: 'High Risk' },
      { id: 'TAMPERING', label: 'Tampering Alerts' },
      { id: 'FACE_MISMATCH', label: 'Face Mismatch' },
      { id: 'EXPIRED', label: 'Expired Docs' }
    ];

    return `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <!-- Title & Filters -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-size: 20px; font-weight: 800; color: #f8fafc;">Screening History Archive</h1>
          <p style="font-size: 12px; color: #94a3b8;">Central repository of inspected travel documents and officer clearance records</p>
        </div>

        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          ${filters.map(f => `
            <button 
              class="filter-btn ${this.currentFilter === f.id ? 'active' : ''} btn-history-filter" 
              data-filter="${f.id}"
            >
              ${f.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- History Table -->
      <div style="background-color: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px;">
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Screening ID</th>
                <th>Timestamp (UTC)</th>
                <th>Traveller Ref</th>
                <th>Document Type</th>
                <th>Country</th>
                <th>Risk Score</th>
                <th>Action Taken</th>
                <th>Officer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filtered.length === 0 ? `
                <tr>
                  <td colspan="9" style="text-align: center; color: #94a3b8; padding: 24px;">
                    No records found matching current criteria.
                  </td>
                </tr>
              ` : filtered.map(item => `
                <tr>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: #38bdf8;">${item.screeningId}</td>
                  <td style="font-family: var(--font-mono); font-size: 11px; color: #94a3b8;">${item.timestamp}</td>
                  <td style="font-family: var(--font-mono); font-size: 11px;">${item.travellerRef}</td>
                  <td>${item.documentType}</td>
                  <td><span style="font-weight: 700;">${item.country}</span></td>
                  <td>
                    <span class="badge ${item.riskScore >= 70 ? 'badge-high' : (item.riskScore >= 31 ? 'badge-review' : 'badge-low')}">
                      ${item.riskScore} / 100
                    </span>
                  </td>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; color: ${item.actionTaken === 'CLEARED' ? '#10b981' : (item.actionTaken === 'REVIEW' ? '#f59e0b' : '#ef4444')};">
                      ${item.actionTaken}
                    </span>
                  </td>
                  <td style="font-family: var(--font-mono); font-size: 11px;">${item.officerId || 'OFF-4819'}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm btn-inspect-history-item" data-id="${item.screeningId}">
                      Open Case
                    </button>
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
    document.querySelectorAll('.btn-history-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.getAttribute('data-filter');
        app.renderCurrentView();
      });
    });

    document.querySelectorAll('.btn-inspect-history-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        app.inspectScreening(id);
      });
    });
  }
};
