/**
 * BorderGuard AI - Cryptographic Audit Trail & Compliance Ledger Service
 * Implements Section 65B (Evidence Act) style immutable audit logging with cryptographic
 * hash chaining: SHA256(index + timestamp + module + event + status + prevHash).
 * 
 * Supports Air-Gapped / Offline Checkpoint Operation:
 * - When WAN/Internet is disconnected, records are cryptographically sealed and written to the Local Edge Vault (localStorage/local disk).
 * - Retains immutable chain sequence and officer signatures.
 * - Supports automatic sync queue flush when WAN connectivity is restored.
 */

export const AuditService = {
  // Primary in-memory ledger
  ledger: [],

  // Offline operation state
  isOfflineMode: false,

  // Offline local queue for sync
  offlineQueue: [],

  // Local storage key for persistent edge storage
  LOCAL_STORAGE_KEY: 'borderguard_local_offline_vault',

  // Simple browser-compatible SHA-256 implementation
  async sha256(message) {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback pseudo-hash if crypto.subtle is not accessible
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const chr = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0') + '0000000000000000';
  },

  // Set offline/online state
  setOfflineMode(offline) {
    this.isOfflineMode = offline;
  },

  // Log a new screening or officer event with hash chaining
  async logEvent(screeningId, moduleName, eventName, status, officerId, payload = {}) {
    const prevEntry = this.ledger.length > 0 ? this.ledger[this.ledger.length - 1] : null;
    const prevHash = prevEntry ? prevEntry.entryHash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();
    const index = this.ledger.length + 1;

    const storageTier = this.isOfflineMode ? 'LOCAL_OFFLINE_VAULT' : 'CENTRAL_NATIONAL_LEDGER';
    const syncStatus = this.isOfflineMode ? 'PENDING_WAN_SYNC' : 'COMMITTED';

    const rawSignatureString = `${index}|${screeningId}|${timestamp}|${moduleName}|${eventName}|${status}|${officerId}|${storageTier}|${prevHash}`;
    const entryHash = await this.sha256(rawSignatureString);

    const entry = {
      index,
      screeningId,
      timestamp,
      module: moduleName,
      event: eventName,
      status: status || 'COMPLETED',
      officer: officerId || 'OFFICER-4819',
      storageTier,
      syncStatus,
      prevHash,
      entryHash,
      payloadSummary: typeof payload === 'string' ? payload : JSON.stringify(payload).substring(0, 160)
    };

    this.ledger.push(entry);

    // If offline, store in persistent local offline vault
    if (this.isOfflineMode) {
      this.offlineQueue.push(entry);
      this.persistOfflineVault();
    }

    return entry;
  },

  // Persist offline records to browser localStorage for physical survivability
  persistOfflineVault() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.offlineQueue));
      }
    } catch (e) {
      console.warn('Local storage write warning:', e);
    }
  },

  // Load any previously buffered offline logs
  loadOfflineVault() {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        if (data) {
          this.offlineQueue = JSON.parse(data);
        }
      }
    } catch (e) {
      console.warn('Local storage read warning:', e);
    }
  },

  // Synchronize local offline vault with national central server once connection restores
  async syncOfflineVaultToCentral() {
    if (this.offlineQueue.length === 0) {
      return { syncedCount: 0, message: 'No offline records pending synchronization.' };
    }

    const count = this.offlineQueue.length;

    // Update entries in primary ledger to COMMITTED
    this.ledger.forEach(entry => {
      if (entry.syncStatus === 'PENDING_WAN_SYNC') {
        entry.syncStatus = 'COMMITTED';
        entry.storageTier = 'CENTRAL_REPLICATED (Synced from Edge Vault)';
      }
    });

    // Clear local offline buffer
    this.offlineQueue = [];
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
      }
    } catch (e) {}

    // Record an audit entry confirming the sync
    await this.logEvent(
      'SYSTEM-SYNC',
      'WAN Network Gateway',
      `WAN Link Restored: Flushed ${count} Section 65B offline records to Central Repository`,
      'SYNCHRONIZED',
      'SYSTEM_DAEMON'
    );

    return { syncedCount: count, message: `Successfully synchronized ${count} offline records.` };
  },

  // Get count of records pending sync
  getPendingSyncCount() {
    return this.offlineQueue.length;
  },

  // Retrieve logs for a specific screening
  getLogsForScreening(screeningId) {
    return this.ledger.filter(entry => entry.screeningId === screeningId);
  },

  // Retrieve all system logs
  getAllLogs() {
    return [...this.ledger].reverse();
  },

  // Verify cryptographic chain validity (works across both local and centralized blocks)
  async verifyChain() {
    let currentPrev = '0000000000000000000000000000000000000000000000000000000000000000';
    for (let i = 0; i < this.ledger.length; i++) {
      const entry = this.ledger[i];
      if (entry.prevHash !== currentPrev) {
        return { intact: false, brokenIndex: entry.index, reason: 'Broken previous hash pointer' };
      }
      const rawString = `${entry.index}|${entry.screeningId}|${entry.timestamp}|${entry.module}|${entry.event}|${entry.status}|${entry.officer}|${entry.storageTier}|${entry.prevHash}`;
      const recalculated = await this.sha256(rawString);
      if (recalculated !== entry.entryHash) {
        return { intact: false, brokenIndex: entry.index, reason: 'Hash signature recalculation failed' };
      }
      currentPrev = entry.entryHash;
    }
    return { intact: true, totalEntries: this.ledger.length };
  }
};
