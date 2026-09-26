import { DemoScenarios } from './data/demoScenarios.js';
import { MRZService } from './services/mrzService.js';
import { ValidationService } from './services/validationService.js';
import { DatabaseService } from './services/databaseService.js';
import { RiskService } from './services/riskService.js';
import { AuditService } from './services/auditService.js';

import { Header } from './components/Header.js';
import { Sidebar } from './components/Sidebar.js';
import { Dashboard } from './components/Dashboard.js';
import { NewScreening } from './components/NewScreening.js';
import { ScreeningHistory } from './components/ScreeningHistory.js';
import { AlertCenter } from './components/AlertCenter.js';
import { AnalyticsView } from './components/AnalyticsView.js';
import { AuditTrailView } from './components/AuditTrailView.js';
import { SystemStatus } from './components/SystemStatus.js';
import { ArchitectureView } from './components/ArchitectureView.js';
import { SettingsView } from './components/SettingsView.js';
import { LandingLogin } from './components/LandingLogin.js';
import { OfficerActionModal } from './components/OfficerActionModal.js';
import { EvidenceModal } from './components/EvidenceModal.js';

/**
 * BorderGuard AI - Master Application Coordinator & State Store
 * DEMONSTRATION SYSTEM — Not connected to live government databases.
 * AI-generated results are decision-support indicators. 
 * Final immigration decisions remain with authorized officers.
 */
export class BorderGuardApp {
  constructor() {
    this.state = {
      isAuthenticated: true, // Default true for seamless evaluation
      isOffline: false,
      pendingSyncCount: 0,
      currentView: 'dashboard',
      searchQuery: '',
      isAnalyzing: false,
      analysisStep: 0,
      currentScenario: null,
      currentScreening: null,
      currentMRZResult: null,
      currentRiskResult: null,
      currentDBResults: null,
      currentConsistency: null,
      currentVisaValidation: null,
      currentImageQuality: null,
      currentEpassport: null,
      stats: {
        activeScreenings: 1,
        screeningsToday: 1248,
        clearedToday: 1137,
        requiresReview: 82,
        highRisk: 29,
        avgScreeningTime: '4.8 sec',
        documentsAnalyzed: 3842,
        tamperingAlerts: 67,
        faceMismatchAlerts: 24
      },
      settings: {
        checkpointName: 'DEL-T3-INTL',
        laneNumber: '04',
        officerName: 'Toyesh Jalamkar',
        officerRole: 'Senior Immigration Inspector',
        thresholdLow: 30,
        thresholdReview: 69,
        thresholdFace: 80,
        weights: {
          authenticity: 25,
          tampering: 25,
          face: 20,
          mrzConsistency: 10,
          database: 10,
          visaDate: 5,
          liveness: 5
        }
      },
      alerts: [
        {
          alertId: 'ALT-9821',
          severity: 'CRITICAL',
          type: 'DOCUMENT NUMBER ALTERATION',
          screeningId: 'BG-2026-100002',
          reason: 'MRZ check digit failure; OCR number A1234567 differs from MRZ string X7429136.',
          timestamp: '2026-09-11 01:14:02 UTC',
          status: 'NEW'
        },
        {
          alertId: 'ALT-9818',
          severity: 'CRITICAL',
          type: 'BIOMETRIC VERIFICATION EXCEPTION',
          screeningId: 'BG-2026-100006',
          reason: 'Facial similarity 38.4% is below the 80% verification threshold. Officer review required.',
          timestamp: '2026-09-11 00:48:19 UTC',
          status: 'NEW'
        },
        {
          alertId: 'ALT-9805',
          severity: 'HIGH',
          type: 'LOST / STOLEN DOCUMENT NOTICE',
          screeningId: 'BG-2026-100010',
          reason: 'Document reported lost/stolen in central database registry on 2025-07-14.',
          timestamp: '2026-09-10 23:20:44 UTC',
          status: 'UNDER_REVIEW'
        },
        {
          alertId: 'ALT-9791',
          severity: 'MEDIUM',
          type: 'EXPIRED TRAVEL DOCUMENT',
          screeningId: 'BG-2026-100004',
          reason: 'Passport validity expired on 2024-02-11.',
          timestamp: '2026-09-10 21:15:30 UTC',
          status: 'RESOLVED'
        }
      ],
      screenings: [
        {
          screeningId: 'BG-2026-100002',
          timestamp: '2026-09-11 01:14:02 UTC',
          travellerRef: 'TRV-2026-04102',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 76,
          actionTaken: 'PENDING',
          tags: ['TAMPERING', 'ALTERED']
        },
        {
          screeningId: 'BG-2026-100001',
          timestamp: '2026-09-11 01:05:12 UTC',
          travellerRef: 'TRV-2026-08192',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 12,
          actionTaken: 'CLEARED',
          tags: ['GENUINE']
        },
        {
          screeningId: 'BG-2026-100006',
          timestamp: '2026-09-11 00:48:19 UTC',
          travellerRef: 'TRV-2026-07730',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 88,
          actionTaken: 'REFERRED',
          tags: ['FACE_MISMATCH']
        },
        {
          screeningId: 'BG-2026-100004',
          timestamp: '2026-09-10 21:15:30 UTC',
          travellerRef: 'TRV-2026-01183',
          documentType: 'Passport (TD3)',
          country: 'USA',
          riskScore: 58,
          actionTaken: 'REVIEW',
          tags: ['EXPIRED']
        },
        {
          screeningId: 'BG-2026-100010',
          timestamp: '2026-09-10 20:40:15 UTC',
          travellerRef: 'TRV-2026-06724',
          documentType: 'Passport (TD3)',
          country: 'MEX',
          riskScore: 78,
          actionTaken: 'REFERRED',
          tags: ['LOST_STOLEN']
        },
        {
          screeningId: 'BG-2026-100011',
          timestamp: '2026-09-10 19:22:40 UTC',
          travellerRef: 'TRV-2026-09988',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 55,
          actionTaken: 'REVIEW',
          tags: ['IDENTITY_LINK']
        }
      ]
    };
  }

  // Initialize and launch app
  async init() {
    // Load default flagship scenario 2 (Altered Passport)
    this.loadScenario('scenario_2', false);

    // Populate initial baseline audit events
    await AuditService.logEvent(
      'BG-2026-100002',
      'System Kernel',
      'Station Lane 04 Boot & Algorithm Integrity Verified',
      'COMPLETED',
      'SYSTEM',
      { status: 'ALL_ENGINES_ONLINE' }
    );

    this.render();
  }

  // Deterministic screening ID from scenario (no Math.random)
  getScreeningIdForScenario(scenarioId) {
    const idMap = {
      'scenario_1': 'BG-2026-100001',
      'scenario_2': 'BG-2026-100002',
      'scenario_3': 'BG-2026-100003',
      'scenario_4': 'BG-2026-100004',
      'scenario_5': 'BG-2026-100005',
      'scenario_6': 'BG-2026-100006',
      'scenario_7': 'BG-2026-100007',
      'scenario_8': 'BG-2026-100008',
      'scenario_9': 'BG-2026-100009',
      'scenario_10': 'BG-2026-100010',
      'scenario_11': 'BG-2026-100011',
      'scenario_12': 'BG-2026-100012',
    };
    return idMap[scenarioId] || `BG-2026-${scenarioId.replace('scenario_', '').padStart(6, '0')}`;
  }

  // Simulate ePassport verification result per scenario
  getEpassportForScenario(found, scenarioId) {
    const badScenarios = ['scenario_2', 'scenario_3'];
    const unavailableScenarios = ['scenario_12'];
    if (unavailableScenarios.includes(scenarioId)) {
      return { status: 'UNAVAILABLE', chipDetected: false, signatureValid: false, message: 'Unable to read chip — document quality insufficient.' };
    }
    if (badScenarios.includes(scenarioId)) {
      return { status: 'INVALID', chipDetected: true, signatureValid: false, chipMrzMatch: false, message: 'Chip data does not match visual MRZ. Possible document fraud indicator.' };
    }
    return {
      status: 'VALID',
      chipDetected: true,
      signatureValid: true,
      chipMrzMatch: true,
      message: 'Chip digital signature verified. Chip data matches MRZ payload.',
      note: 'SIMULATED ePASSPORT VERIFICATION — Demonstration model only.'
    };
  }

  // Simulate image quality result per scenario
  getImageQualityForScenario(found, scenarioId) {
    if (scenarioId === 'scenario_12') {
      return found.imageQuality || {
        resolution: { passed: false, value: '480×320 px (72 DPI)', message: 'Insufficient — minimum 600 DPI required' },
        blur: { passed: false, score: 28, message: 'High blur detected' },
        glare: { passed: false, score: 71, message: 'Significant glare detected' },
        contrast: { passed: false, score: 34, message: 'Low contrast' },
        boundary: { passed: false, message: 'Document boundary not fully detected' },
        overallQuality: 'INSUFFICIENT',
        action: 'RECAPTURE REQUIRED'
      };
    }
    return {
      resolution: { passed: true, value: '1920×1280 px (300 DPI)', message: 'Sufficient for analysis' },
      blur: { passed: true, score: 96, message: 'Sharp image — Laplacian variance 96' },
      glare: { passed: true, score: 4, message: 'Minimal glare detected' },
      contrast: { passed: true, score: 88, message: 'Good contrast range' },
      boundary: { passed: true, message: 'Document boundary fully detected' },
      overallQuality: 'SUFFICIENT',
      action: 'PROCEED TO ANALYSIS'
    };
  }

  // Load a demo scenario and calculate all services (deterministic)
  loadScenario(scenarioId, shouldRender = true) {
    const found = DemoScenarios.find(s => s.id === scenarioId) || DemoScenarios[1];
    this.state.currentScenario = found;

    if (found.isOfflineScenario) {
      this.state.isOffline = true;
    } else {
      // Don't persist offline mode across non-offline scenarios
      // unless user explicitly toggled it
    }
    AuditService.setOfflineMode(this.state.isOffline);
    DatabaseService.setOfflineMode(this.state.isOffline);
    this.state.pendingSyncCount = AuditService.getPendingSyncCount();

    // DETERMINISTIC screening ID — no randomness
    const screeningId = this.getScreeningIdForScenario(found.id);
    this.state.currentScreening = {
      screeningId,
      timestamp: new Date().toISOString(),
      officerId: 'OFF-4819',
      scenarioId: found.id,
      isOffline: this.state.isOffline
    };

    // 1. Image Quality Assessment
    this.state.currentImageQuality = this.getImageQualityForScenario(found, found.id);

    // 2. Calculate MRZ Checksums
    const mrzResult = (found.document.mrzLine1 && found.document.mrzLine2)
      ? MRZService.parseTD3(found.document.mrzLine1, found.document.mrzLine2)
      : { success: false, error: 'MRZ not available — image quality insufficient' };
    this.state.currentMRZResult = mrzResult;

    // 3. Cross-field Consistency (OCR vs MRZ)
    let consistency = { items: [], consistencyScore: 100, allPassed: true };
    if (mrzResult.success) {
      consistency = ValidationService.crossCheckOCRvsMRZ(found.ocrData, mrzResult);
    }
    this.state.currentConsistency = consistency;

    // 4. Date Validations
    const dateChecks = ValidationService.validateDates(found.ocrData);

    // 5. Visa Validation
    let visaValidation = { checks: [], status: 'N/A', allPassed: true };
    if (found.visaData) {
      visaValidation = ValidationService.validateVisa(found.visaData, found.ocrData);
    }
    this.state.currentVisaValidation = visaValidation;

    // 6. Database & Watchlist Query
    const passportDb = DatabaseService.checkPassportRegistry(found.document.docNumber);
    let visaDb = { found: false, status: 'NO_VISA' };
    if (found.visaData) {
      visaDb = DatabaseService.checkVisaRegistry(found.visaData.visaNumber, found.document.docNumber);
    }
    const watchlist = DatabaseService.checkWatchlist(
      found.traveller.name,
      found.document.docNumber,
      found.traveller.nationality
    );

    // Lost/Stolen check
    const lostStolenCheck = DatabaseService.checkLostStolenRegistry(found.document.docNumber);

    this.state.currentDBResults = {
      passport: passportDb,
      visa: visaDb,
      watchlist: found.watchlistHit ? {
        hasMatch: true,
        match: {
          referenceId: found.watchlistHit.referenceId,
          targetName: found.traveller.name,
          alertType: found.watchlistHit.alertType,
          status: found.watchlistHit.status,
          instructions: 'Refer calmly to Secondary Inspection Lane B for supervisor debrief.'
        }
      } : watchlist,
      lostStolen: found.lostStolenHit ? {
        hasRecord: true,
        record: found.lostStolenHit,
        severity: 'CRITICAL',
        status: 'REPORTED LOST/STOLEN',
        details: `SIMULATED RECORD [${found.lostStolenHit.referenceId}]: ${found.lostStolenHit.status}. Reported: ${found.lostStolenHit.reportedDate}.`
      } : lostStolenCheck,
      multipleIdentity: found.multipleIdentityHit || null
    };

    // 7. ePassport simulation
    this.state.currentEpassport = this.getEpassportForScenario(found, found.id);

    // 8. Risk Engine Calculation
    const evidenceBundle = {
      documentAuth: { passed: found.tampering?.overallScore >= 70 },
      tampering: found.tampering,
      face: found.faceVerification,
      mrz: mrzResult,
      consistency: consistency,
      dates: dateChecks,
      visa: visaValidation,
      database: this.state.currentDBResults,
      liveness: found.liveness,
      imageQuality: this.state.currentImageQuality,
      scenarioRiskOverride: found.scenarioRiskOverride,
      aiConfidence: 94.6
    };

    this.state.currentRiskResult = RiskService.computeRiskScore(evidenceBundle, this.state.settings.weights);

    // Log to audit service
    AuditService.logEvent(
      screeningId,
      'Document Ingestion',
      `Document Loaded: ${found.document.type} [${found.title}]`,
      'INGESTED',
      'OFF-4819',
      { docNumber: found.document.docNumber, country: found.document.countryCode }
    );

    if (shouldRender) {
      this.render();
    }
  }

  // Trigger simulated animated scanning pipeline
  async triggerScreeningProcess() {
    this.state.isAnalyzing = true;
    this.state.analysisStep = 0;
    this.render();

    const screeningId = this.state.currentScreening.screeningId;

    const stepNames = [
      'Document Capture & Image Quality Assessment',
      'Document Detection & Type Classification',
      'Neural OCR Field Extraction',
      'ICAO MRZ Checksum Validation',
      'Forensic ELA & Tamper Analysis',
      'ePASSPORT Chip Verification',
      'Biometric Face Verification',
      'Authorized Registry & Watchlist Query',
      'Identity Consistency Analysis',
      'Explainable Risk Synthesis'
    ];

    for (let step = 1; step <= stepNames.length; step++) {
      await new Promise(r => setTimeout(r, 250));
      this.state.analysisStep = step;

      await AuditService.logEvent(
        screeningId,
        stepNames[step - 1],
        `Stage ${step} Completed: ${stepNames[step - 1]}`,
        'COMPLETED',
        'SYSTEM'
      );

      this.render();
    }

    this.state.isAnalyzing = false;
    this.render();
  }

  // Navigation
  navigate(viewId) {
    this.state.currentView = viewId;
    this.render();
  }

  // Toggle Network State (Online vs Air-Gapped Offline)
  toggleNetworkStatus(forceState = null) {
    this.state.isOffline = forceState !== null ? forceState : !this.state.isOffline;
    AuditService.setOfflineMode(this.state.isOffline);
    DatabaseService.setOfflineMode(this.state.isOffline);
    this.state.pendingSyncCount = AuditService.getPendingSyncCount();

    if (this.state.currentScenario) {
      this.loadScenario(this.state.currentScenario.id, true);
    } else {
      this.render();
    }
  }

  // Search
  handleGlobalSearch(query) {
    this.state.searchQuery = query;
    if (this.state.currentView !== 'screening_history') {
      this.navigate('screening_history');
    } else {
      this.renderCurrentView();
    }
  }

  // Update Settings
  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    if (this.state.currentScenario) {
      this.loadScenario(this.state.currentScenario.id, true);
    }
  }

  // Liveness Simulator Trigger
  updateLivenessState(livenessState) {
    if (this.state.currentScenario) {
      this.state.currentScenario.liveness.status = livenessState;
      this.state.currentScenario.liveness.livenessConfidence = livenessState === 'PASS' ? 95 : (livenessState === 'REVIEW' ? 68 : 24);
      this.loadScenario(this.state.currentScenario.id, true);
    }
  }

  // Prompt Officer Action Modal
  promptOfficerAction(action, reason, note) {
    const modalContainer = document.getElementById('modalMount');
    if (!modalContainer) return;

    modalContainer.innerHTML = OfficerActionModal.render({
      action,
      reason,
      note,
      screeningId: this.state.currentScreening?.screeningId,
      travellerName: this.state.currentScenario?.traveller?.name
    });

    OfficerActionModal.initEvents(this, { action, reason, note });
  }

  // Execute Officer Decision
  async executeOfficerAction({ action, reason, note }) {
    const screeningId = this.state.currentScreening.screeningId;

    // Log to immutable audit
    await AuditService.logEvent(
      screeningId,
      'Officer Adjudication',
      `Officer Disposition Executed: [${action}]`,
      action === 'CLEARED' ? 'CLEARED' : 'REFERRED',
      'OFF-4819',
      { action, reason, note }
    );

    // Update historical table
    const existing = this.state.screenings.find(s => s.screeningId === screeningId);
    if (existing) {
      existing.actionTaken = action;
    } else {
      this.state.screenings.unshift({
        screeningId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        travellerRef: this.state.currentScenario.traveller.referenceId,
        documentType: this.state.currentScenario.document.type,
        country: this.state.currentScenario.document.countryCode,
        riskScore: this.state.currentRiskResult.score,
        actionTaken: action,
        tags: [action]
      });
    }

    // Update stats counters
    if (action === 'CLEARED') {
      this.state.stats.clearedToday++;
    } else if (action === 'REVIEW') {
      this.state.stats.requiresReview++;
    } else if (action === 'INVESTIGATION') {
      this.state.stats.highRisk++;
    }

    alert(`Officer disposition [${action}] recorded. Entry logged to audit trail.`);
    this.navigate('screening_history');
  }

  // Open Evidence Modal
  openEvidenceModal() {
    const modalContainer = document.getElementById('modalMount');
    if (!modalContainer) return;

    modalContainer.innerHTML = EvidenceModal.render({
      screeningId: this.state.currentScreening.screeningId,
      traveller: this.state.currentScenario.traveller,
      document: this.state.currentScenario.document,
      risk: this.state.currentRiskResult,
      mrz: this.state.currentMRZResult,
      ocr: this.state.currentScenario.ocrData,
      tampering: this.state.currentScenario.tampering,
      face: this.state.currentScenario.faceVerification,
      database: this.state.currentDBResults,
      consistency: this.state.currentConsistency,
      imageQuality: this.state.currentImageQuality,
      epassport: this.state.currentEpassport,
      scenario: this.state.currentScenario
    });

    EvidenceModal.initEvents();
  }

  // Open Audit Modal / View
  openAuditModal() {
    this.navigate('audit_trail');
  }

  // Inspect Screening Record (loads scenario deterministically)
  inspectScreening(screeningId) {
    const sc = DemoScenarios.find(s => this.getScreeningIdForScenario(s.id) === screeningId);
    if (sc) {
      this.loadScenario(sc.id);
    }
    this.navigate('new_screening');
  }

  // Resolve Alert
  resolveAlert(alertId) {
    const alert = this.state.alerts.find(a => a.alertId === alertId);
    if (alert) {
      alert.status = 'RESOLVED';
      this.renderCurrentView();
    }
  }

  // Authentication
  handleLogin() {
    this.state.isAuthenticated = true;
    this.render();
  }

  lockSession() {
    this.state.isAuthenticated = false;
    this.render();
  }

  // Render App Shell or Landing
  render() {
    const root = document.getElementById('app');
    if (!root) return;

    if (!this.state.isAuthenticated) {
      root.innerHTML = LandingLogin.render();
      LandingLogin.initEvents(this);
      return;
    }

    root.innerHTML = `
      <div id="appShell" style="display: flex; height: 100vh; width: 100vw; overflow: hidden;">
        ${Sidebar.render(this.state)}
        <div class="main-wrapper">
          ${Header.render(this.state)}
          <main class="content-viewport" id="mainContentArea">
            <!-- View mounts here -->
          </main>
        </div>
      </div>
      <div id="modalMount"></div>
    `;

    Sidebar.initEvents(this);
    Header.initEvents(this);
    this.renderCurrentView();
  }

  // Render Current Sub-View
  renderCurrentView() {
    const contentArea = document.getElementById('mainContentArea');
    if (!contentArea) return;

    const view = this.state.currentView;

    if (view === 'dashboard') {
      contentArea.innerHTML = Dashboard.render(this.state);
      Dashboard.initEvents(this);
    } else if (view === 'new_screening') {
      contentArea.innerHTML = NewScreening.render(this.state);
      NewScreening.initEvents(this);
    } else if (view === 'screening_history') {
      contentArea.innerHTML = ScreeningHistory.render(this.state);
      ScreeningHistory.initEvents(this);
    } else if (view === 'alerts') {
      contentArea.innerHTML = AlertCenter.render(this.state);
      AlertCenter.initEvents(this);
    } else if (view === 'analytics') {
      contentArea.innerHTML = AnalyticsView.render(this.state);
    } else if (view === 'audit_trail') {
      contentArea.innerHTML = AuditTrailView.render(this.state);
      AuditTrailView.initEvents(this);
    } else if (view === 'system_status') {
      contentArea.innerHTML = SystemStatus.render(this.state);
    } else if (view === 'architecture') {
      contentArea.innerHTML = ArchitectureView.render(this.state);
      ArchitectureView.initEvents(this);
    } else if (view === 'settings') {
      contentArea.innerHTML = SettingsView.render(this.state);
      SettingsView.initEvents(this);
    }
  }
}
