/**
 * BorderGuard AI - Sidebar Navigation Component
 * Fixed security navigation console with badge indicator and active state styling.
 */

export const Sidebar = {
  render(state) {
    const currentTab = state.currentView || 'dashboard';
    const alertCount = state.alerts?.filter(a => a.status === 'NEW').length || 3;

    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'new_screening', label: 'New Screening', icon: '🔍', highlight: true },
      { id: 'screening_history', label: 'Screening History', icon: '📋' },
      { id: 'alerts', label: 'Alert Center', icon: '🚨', badge: alertCount },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'audit_trail', label: 'Audit Trail', icon: '📜' },
      { id: 'system_status', label: 'System Status', icon: '⚡' },
      { id: 'architecture', label: 'How It Works', icon: '🏛️' },
      { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    return `
    <aside class="sidebar">
      <div class="brand-section">
        <div class="brand-logo-shield">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <div>
          <div class="brand-title">BorderGuard AI</div>
          <div style="font-size: 10px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.5px;">Ministry of Home Affairs</div>
          <div class="brand-subtitle">Screening Console</div>
        </div>
      </div>

      <nav class="nav-group">
        ${navItems.map(item => `
          <div 
            class="nav-item ${currentTab === item.id ? 'active' : ''}" 
            data-view="${item.id}"
            style="${item.highlight ? 'border-left: 3px solid #38bdf8;' : ''}"
          >
            <span class="nav-icon">${item.icon}</span>
            <span style="flex: 1;">${item.label}</span>
            ${item.badge ? `<span class="badge badge-high" style="font-size: 10px; padding: 1px 6px;">${item.badge}</span>` : ''}
          </div>
        `).join('')}
      </nav>

      <div class="sidebar-bottom">
        <div class="officer-badge-card">
          <div class="officer-avatar">
            KS
          </div>
          <div class="officer-details">
            <div class="officer-name">Insp. K. Sharma</div>
            <div class="officer-role">ID: OFF-4819 • Shift A</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 10px; color: #64748b; padding: 2px 4px;">
          <span>SECURE PROTOCOL</span>
          <span style="color: #10b981; font-weight: 700;">● ENCRYPTED</span>
        </div>
      </div>
    </aside>
    `;
  },

  initEvents(app) {
    document.querySelectorAll('.sidebar .nav-item').forEach(el => {
      el.addEventListener('click', () => {
        const view = el.getAttribute('data-view');
        if (view) {
          app.navigate(view);
        }
      });
    });
  }
};
