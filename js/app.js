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
 */
export class BorderGuardApp {
  constructor() {
    this.state = {
      isAuthenticated: true, // Default true for seamless evaluation, supports logout
      isOffline: false,      // Air-Gapped Offline Checkpoint Node Mode
      pendingSyncCount: 0,   // Local Section 65B offline vault queue
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
          screeningId: 'BG-2026-001248',
          reason: 'MRZ check digit failure; OCR number A1234567 differs from MRZ string X7429136.',
          timestamp: '2026-09-11 01:14:02 UTC',
          status: 'NEW'
        },
        {
          alertId: 'ALT-9818',
          severity: 'CRITICAL',
          type: 'BIOMETRIC IMPERSONATION',
          screeningId: 'BG-2026-001242',
          reason: 'Facial similarity 38.4% is significantly below 80% threshold. Suspected impostor.',
          timestamp: '2026-09-11 00:48:19 UTC',
          status: 'NEW'
        },
        {
          alertId: 'ALT-9805',
          severity: 'HIGH',
          type: 'VISA ASSOCIATION MISMATCH',
          screeningId: 'BG-2026-001235',
          reason: 'Electronic visa presented was issued to a different passport number.',
          timestamp: '2026-09-10 23:20:44 UTC',
          status: 'UNDER_REVIEW'
        },
        {
          alertId: 'ALT-9791',
          severity: 'MEDIUM',
          type: 'EXPIRED TRAVEL DOCUMENT',
          screeningId: 'BG-2026-001210',
          reason: 'Passport validity expired on 2024-02-11.',
          timestamp: '2026-09-10 21:15:30 UTC',
          status: 'RESOLVED'
        }
      ],
      screenings: [
        {
          screeningId: 'BG-2026-001248',
          timestamp: '2026-09-11 01:14:02 UTC',
          travellerRef: 'TRV-2026-04102',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 76,
          actionTaken: 'PENDING',
          tags: ['TAMPERING', 'ALTERED']
        },
        {
          screeningId: 'BG-2026-001247',
          timestamp: '2026-09-11 01:05:12 UTC',
          travellerRef: 'TRV-2026-08192',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 12,
          actionTaken: 'CLEARED',
          tags: ['GENUINE']
        },
        {
          screeningId: 'BG-2026-001242',
          timestamp: '2026-09-11 00:48:19 UTC',
          travellerRef: 'TRV-2026-07730',
          documentType: 'Passport (TD3)',
          country: 'IND',
          riskScore: 88,
          actionTaken: 'INVESTIGATION',
          tags: ['FACE_MISMATCH']
        },
        {
          screeningId: 'BG-2026-001235',
          timestamp: '2026-09-10 23:20:44 UTC',
          travellerRef: 'TRV-2026-05591',
          documentType: 'Passport + Visa',
          country: 'GBR',
          riskScore: 72,
          actionTaken: 'REVIEW',
          tags: ['VISA_MISMATCH']
        },
        {
          screeningId: 'BG-2026-001210',
          timestamp: '2026-09-10 21:15:30 UTC',
          travellerRef: 'TRV-2026-01183',
          documentType: 'Passport (TD3)',
          country: 'USA',
          riskScore: 58,
          actionTaken: 'REVIEW',
          tags: ['EXPIRED']
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
      'BG-2026-001248',
      'System Kernel',
      'Station Lane 04 Boot & Algorithm Integrity Verified',
      'COMPLETED',
      'SYSTEM',
      { status: 'ALL_ENGINES_ONLINE' }
    );

    this.render();
  }

  // Load a demo scenario and calculate all services
  loadScenario(scenarioId, shouldRender = true) {
    const found = DemoScenarios.find(s => s.id === scenarioId) || DemoScenarios[1];
    this.state.currentScenario = found;

    if (found.isOfflineScenario) {
      this.state.isOffline = true;
    }
    AuditService.setOfflineMode(this.state.isOffline);
    DatabaseService.setOfflineMode(this.state.isOffline);
    this.state.pendingSyncCount = AuditService.getPendingSyncCount();

    const screeningId = 'BG-2026-' + Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);
    this.state.currentScreening = {
      screeningId,
      timestamp: new Date().toISOString(),
      officerId: 'OFF-4819',
      scenarioId: found.id,
      isOffline: this.state.isOffline
    };

    // 1. Calculate MRZ Checksums
    const mrzResult = MRZService.parseTD3(found.document.mrzLine1, found.document.mrzLine2);
    this.state.currentMRZResult = mrzResult;

    // 2. Cross-field Consistency (OCR vs MRZ)
    const consistency = ValidationService.crossCheckOCRvsMRZ(found.ocrData, mrzResult);
    this.state.currentConsistency = consistency;

    // 3. Date Validations
    const dateChecks = ValidationService.validateDates(found.ocrData);

    // 4. Visa Validation
    let visaValidation = { checks: [], status: 'N/A', allPassed: true };
    if (found.visaData) {
      visaValidation = ValidationService.validateVisa(found.visaData, found.ocrData);
    }
    this.state.currentVisaValidation = visaValidation;

    // 5. Database & Watchlist Query
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
      } : watchlist
    };

    // 6. Risk Engine Calculation
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

    for (let step = 1; step <= 8; step++) {
      await new Promise(r => setTimeout(r, 280));
      this.state.analysisStep = step;

      const stepNames = [
        'Document Capture & Normalization',
        'Document Type Classification',
        'Neural OCR Extraction',
        'ICAO MRZ Checksum Parsing',
        'Spectral ELA Tampering Forensics',
        'Biometric Face Verification',
        'Simulated Registry & Watchlist Query',
        'Explainable Risk Synthesis'
      ];

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
    // Recalculate current scenario with new weights
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

    // Log to immutable Section 65B Audit
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

    alert(`Officer Disposition [${action}] recorded successfully into Section 65B audit ledger.`);
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
      database: this.state.currentDBResults
    });

    EvidenceModal.initEvents();
  }

  // Open Audit Modal / View
  openAuditModal() {
    this.navigate('audit_trail');
  }

  // Inspect Screening Record
  inspectScreening(screeningId) {
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
