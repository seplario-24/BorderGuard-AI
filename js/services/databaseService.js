/**
 * BorderGuard AI - Simulated Database & Watchlist Registry Service
 * DISCLAIMER: Authorized Data Sources - DEMO / PROTOTYPE.
 * Not connected to real government, Interpol, or immigration databases. All records are fictional.
 */

export const DatabaseService = {
  // Offline edge-cache mode flag
  isOfflineMode: false,

  setOfflineMode(offline) {
    this.isOfflineMode = offline;
  },

  // Mock National Passport Registry database
  MOCK_PASSPORT_REGISTRY: {
    'X7429136': {
      docNumber: 'X7429136',
      holderName: 'JOHN DOE',
      status: 'VALID',
      issuingCountry: 'IND',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      registeredFacialHash: 'hash_sha256_doe_john_982a',
      flagged: false,
      notes: 'Standard 10-year biometric passport issued at RPO Delhi.'
    },
    'P5831042': {
      docNumber: 'P5831042',
      holderName: 'MARIA SILVA',
      status: 'VALID',
      issuingCountry: 'BRA',
      issueDate: '2021-08-20',
      expiryDate: '2031-08-19',
      registeredFacialHash: 'hash_sha256_silva_maria_771b',
      flagged: false,
      notes: 'Diplomatic / official passport series.'
    },
    'Z2948175': {
      docNumber: 'Z2948175',
      holderName: 'ALEX MORGAN',
      status: 'VALID',
      issuingCountry: 'GBR',
      issueDate: '2019-11-04',
      expiryDate: '2029-11-03',
      registeredFacialHash: 'hash_sha256_morgan_alex_120c',
      flagged: false,
      notes: 'Standard British Citizen passport issued in London.'
    },
    'A1234567': {
      docNumber: 'A1234567',
      holderName: 'JOHN DOE',
      status: 'MISMATCH_OR_UNKNOWN',
      issuingCountry: 'IND',
      issueDate: '2018-01-10',
      expiryDate: '2028-01-09',
      flagged: true,
      notes: 'Database record indicates document number A1234567 was cancelled / replaced in 2022 due to reported loss.'
    },
    'E9821430': {
      docNumber: 'E9821430',
      holderName: 'DAVID MILLER',
      status: 'EXPIRED',
      issuingCountry: 'USA',
      issueDate: '2014-02-12',
      expiryDate: '2024-02-11',
      flagged: false,
      notes: 'Expired passport; renewal application pending in central registry.'
    }
  },

  // Mock Visa Registry
  MOCK_VISA_REGISTRY: {
    'V-IN-981240': {
      visaNumber: 'V-IN-981240',
      linkedPassport: 'X7429136',
      type: 'BUSINESS (B-1 / B-2)',
      status: 'VALID',
      validFrom: '2025-01-01',
      validUntil: '2027-12-31',
      entriesAllowed: 'MULTIPLE',
      durationOfStay: '90 days per entry'
    },
    'V-UK-442198': {
      visaNumber: 'V-UK-442198',
      linkedPassport: 'Z2948175',
      type: 'TOURIST (V-6)',
      status: 'VALID',
      validFrom: '2026-06-01',
      validUntil: '2026-12-31',
      entriesAllowed: 'MULTIPLE',
      durationOfStay: '30 days'
    },
    'V-SUSP-7701': {
      visaNumber: 'V-SUSP-7701',
      linkedPassport: 'X9999999', // Discrepant passport association!
      type: 'TRANSIT',
      status: 'FLAGGED_ASSOCIATION',
      validFrom: '2026-08-01',
      validUntil: '2026-10-01',
      entriesAllowed: 'SINGLE',
      durationOfStay: '72 hours'
    }
  },

  // Mock Watchlist & Revocation Registry
  MOCK_WATCHLIST: [
    {
      referenceId: 'DEMO-WL-00421',
      targetName: 'TARIQ RASHID',
      passportReference: 'W7789012',
      nationality: 'SYR',
      alertType: 'INTERPOL PURPLE NOTICE (Document Fraud / Impersonation Alert)',
      severity: 'CRITICAL',
      status: 'ACTIVE - REQUIRES IMMEDIATE SUPERVISOR & OFFICER REVIEW',
      instructions: 'Do not alert passenger. Refer calmly to Secondary Inspection Lane B for supervisor debrief.'
    },
    {
      referenceId: 'DEMO-WL-00109',
      targetName: 'VIKTOR SOKOLOV',
      passportReference: 'K3342190',
      nationality: 'UKR',
      alertType: 'BORDER BAN - FINANCIAL INTELLIGENCE UNIT WATCH',
      severity: 'HIGH',
      status: 'ACTIVE - REFER TO SECONDARY INSPECTION',
      instructions: 'Verify customs declaration and financial instrument limits.'
    }
  ],

  // Check Passport against simulated National Registry
  checkPassportRegistry(docNumber) {
    const cleanNum = (docNumber || '').toUpperCase().trim();
    const match = this.MOCK_PASSPORT_REGISTRY[cleanNum];

    const registryName = this.isOfflineMode
      ? 'Local Checkpoint Edge DB Cache (Offline Air-Gapped Mode)'
      : 'National Central Passport Database (Demo)';

    if (!match) {
      return {
        found: false,
        status: 'RECORD_NOT_FOUND',
        registry: registryName,
        isOfflineCache: this.isOfflineMode,
        severity: 'HIGH',
        details: this.isOfflineMode
          ? `[OFFLINE EDGE CACHE] Passport ${cleanNum} not found in local cached registry snapshot.`
          : `Passport number ${cleanNum} does not exist in the simulated national issuance ledger. Possible counterfeit or unregistered sequence.`
      };
    }

    return {
      found: true,
      status: match.status,
      registry: registryName,
      record: match,
      isOfflineCache: this.isOfflineMode,
      severity: match.status === 'VALID' ? 'OK' : 'CRITICAL',
      details: match.status === 'VALID'
        ? (this.isOfflineMode
            ? `[OFFLINE CACHE HIT] Verified via Local Checkpoint Edge DB (Snapshot: 2h ago). Registered to ${match.holderName}, valid until ${match.expiryDate}.`
            : `Found in National Central Database. Registered to ${match.holderName}, valid until ${match.expiryDate}.`)
        : `Record found with status "${match.status}". ${match.notes}`
    };
  },

  // Check Visa Registry
  checkVisaRegistry(visaNumber, docNumber) {
    const cleanVisa = (visaNumber || '').toUpperCase().trim();
    const cleanDoc = (docNumber || '').toUpperCase().trim();
    const match = this.MOCK_VISA_REGISTRY[cleanVisa];

    if (!match) {
      return {
        found: false,
        status: 'VISA_NOT_FOUND',
        severity: 'MEDIUM',
        details: `Visa reference ${cleanVisa || 'UNKNOWN'} could not be retrieved from the central visa repository.`
      };
    }

    const linkedMatches = match.linkedPassport === cleanDoc;
    return {
      found: true,
      status: linkedMatches ? match.status : 'ASSOCIATION_MISMATCH',
      record: match,
      passportMatches: linkedMatches,
      severity: linkedMatches && match.status === 'VALID' ? 'OK' : 'CRITICAL',
      details: linkedMatches
        ? `Electronic Visa confirmed: ${match.type}, Valid until ${match.validUntil}.`
        : `CRITICAL VISA MISMATCH: Visa is registered to Passport ${match.linkedPassport}, but presented with Passport ${cleanDoc}.`
    };
  },

  // Check Watchlist & Revocation ledger
  checkWatchlist(name = '', docNumber = '', nationality = '') {
    const cleanName = (name || '').toUpperCase().trim();
    const cleanDoc = (docNumber || '').toUpperCase().trim();

    const hit = this.MOCK_WATCHLIST.find(entry => {
      const nameMatch = entry.targetName === cleanName || cleanName.includes(entry.targetName);
      const docMatch = entry.passportReference === cleanDoc;
      return nameMatch || docMatch;
    });

    if (hit) {
      return {
        hasMatch: true,
        match: hit,
        severity: hit.severity,
        status: 'WATCHLIST_HIT',
        isOfflineCache: this.isOfflineMode,
        details: this.isOfflineMode
          ? `[LOCAL WATCHLIST CACHE] Hit found on ${hit.targetName} (${hit.alertType}). Ref: ${hit.referenceId}. ${hit.instructions}`
          : `SIMULATED ALERT [${hit.referenceId}]: Match found on ${hit.targetName} (${hit.alertType}). ${hit.instructions}`
      };
    }

    return {
      hasMatch: false,
      severity: 'OK',
      status: 'NO_MATCH',
      isOfflineCache: this.isOfflineMode,
      details: this.isOfflineMode
        ? 'No match in Local Edge Watchlist Cache (Snapshot: 2h ago). Central Interpol live sync offline.'
        : 'No match identified across simulated Interpol, Border Alert, or Revocation ledgers.'
    };
  }
};
