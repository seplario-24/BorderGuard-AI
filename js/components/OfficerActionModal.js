/**
 * BorderGuard AI - Officer Decision Confirmation Modal
 * Requires explicit officer confirmation and records action to Section 65B audit trail.
 */

export const OfficerActionModal = {
  render(actionData = {}) {
    const action = actionData.action || 'REVIEW';
    const reason = actionData.reason || '';
    const note = actionData.note || 'No notes provided.';
    const screeningId = actionData.screeningId || 'BG-2026-001248';
    const travellerName = actionData.travellerName || 'JOHN DOE';

    let actionColor = '#10b981';
    let actionTitle = 'Confirm Clearance';
    if (action === 'REVIEW') {
      actionColor = '#f59e0b';
      actionTitle = 'Confirm Referral for Review';
    } else if (action === 'INVESTIGATION') {
      actionColor = '#ef4444';
      actionTitle = 'Confirm Flag for Investigation';
    }

    return `
    <div class="modal-overlay" id="officerActionModal">
      <div class="modal-box">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: ${actionColor};"></div>
            <h3 class="modal-title">${actionTitle}</h3>
          </div>
          <button id="btnCloseActionModal" style="background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer;">&times;</button>
        </div>

        <div class="modal-body">
          <div style="background: var(--bg-subtle); border-left: 4px solid ${actionColor}; padding: 12px 16px; border-radius: 4px; margin-bottom: 16px;">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Selected Disposition</div>
            <div style="font-size: 16px; font-weight: 800; color: #f8fafc; font-family: var(--font-mono); margin-top: 2px;">
              [ ${action} ]
            </div>
            <div style="font-size: 12px; color: #cbd5e1; margin-top: 4px;">${reason}</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; font-size: 12px;">
            <div>
              <span style="color: var(--text-muted);">Screening ID:</span>
              <div style="font-weight: 700; font-family: var(--font-mono); color: #38bdf8;">${screeningId}</div>
            </div>
            <div>
              <span style="color: var(--text-muted);">Subject Name:</span>
              <div style="font-weight: 700; color: #f8fafc;">${travellerName}</div>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Officer Notes / Remarks:</span>
            <div style="background: var(--bg-input); border: 1px solid var(--border-subtle); padding: 10px; border-radius: 6px; font-size: 12px; color: #cbd5e1; margin-top: 4px;">
              ${note}
            </div>
          </div>

          <div style="font-size: 11px; color: #94a3b8; line-height: 1.5; background: rgba(11, 18, 30, 0.6); padding: 10px; border-radius: 6px;">
            🔒 <strong>Statutory Record Notice:</strong> This action will be cryptographically hashed (SHA-256) into the immutable audit ledger with your Officer ID (OFF-4819). Once confirmed, this record cannot be retroactively modified or removed.
          </div>
        </div>

        <div class="modal-footer">
          <button id="btnCancelActionModal" class="btn btn-secondary">Cancel</button>
          <button id="btnConfirmActionExecution" class="btn" style="background-color: ${actionColor}; color: #ffffff;">
            Confirm &amp; Record Decision
          </button>
        </div>
      </div>
    </div>
    `;
  },

  initEvents(app, actionPayload) {
    const closeBtn = document.getElementById('btnCloseActionModal');
    const cancelBtn = document.getElementById('btnCancelActionModal');
    const confirmBtn = document.getElementById('btnConfirmActionExecution');

    const closeModal = () => {
      const el = document.getElementById('officerActionModal');
      if (el) el.remove();
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        app.executeOfficerAction(actionPayload);
        closeModal();
      });
    }
  }
};
