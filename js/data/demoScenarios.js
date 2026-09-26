import { SampleDocuments } from './sampleDocuments.js';

/**
 * BorderGuard AI - Standardized Pre-Built Demonstration Scenarios
 * Configured for multi-signal verification: OCR, MRZ, Forensics, Biometrics, Registry Checks, and Risk.
 */

export const DemoScenarios = [
  // -------------------------------------------------------------
  // Scenario 1: Genuine Passport
  // -------------------------------------------------------------
  {
    id: 'scenario_1',
    title: 'Scenario 1 — Genuine Passport',
    tag: 'GENUINE',
    badgeClass: 'badge-low',
    shortDesc: 'Fully authentic Indian biometric passport with passing MRZ, valid registry status, and 97% biometric face match.',
    traveller: {
      referenceId: 'TRV-2026-08192',
      name: 'JOHN DOE',
      surname: 'DOE',
      givenNames: 'JOHN',
      nationality: 'IND',
      countryName: 'REPUBLIC OF INDIA',
      dob: '1995-08-15',
      gender: 'M',
      personId: 'john_doe'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Ordinary 36-Page Biometric',
      docNumber: 'X7429136',
      countryCode: 'IND',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      mrzLine1: 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'X7429136<7IND9508152M3005132<<<<<<<<<<<<<<<0'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'DOE',
        givenNames: 'JOHN',
        docNumber: 'X7429136',
        nationality: 'INDIAN',
        sex: 'M',
        dob: '1995-08-15',
        issueDate: '2020-05-14',
        expiryDate: '2030-05-13',
        issuingAuthority: 'PASSPORT OFFICE DELHI',
        mrzLine1: 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'X7429136<7IND9508152M3005132<<<<<<<<<<<<<<<0',
        personId: 'john_doe'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('john_doe'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('john_doe')
    },
    ocrData: {
      fullName: 'JOHN DOE',
      surname: 'DOE',
      givenNames: 'JOHN',
      documentNumber: 'X7429136',
      nationality: 'IND',
      dob: '1995-08-15',
      sex: 'M',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      overallOcrConfidence: 99.4
    },
    faceVerification: {
      similarityScore: 97.4,
      threshold: 80.0,
      docQuality: 'ICAO Compliant (98%)',
      liveQuality: 'Optimal Frontal (96%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 96
    },
    tampering: {
      overallScore: 96,
      photoIntegrity: { score: 98, status: 'NORMAL', details: 'No boundary cut-line artifacts, consistent microprint substrate.' },
      textForensics: {
        score: 97,
        regions: [
          { name: 'Surname / Given Name', status: 'NORMAL', confidence: 99 },
          { name: 'Passport Number', status: 'NORMAL', confidence: 99 },
          { name: 'Date of Birth', status: 'NORMAL', confidence: 98 },
          { name: 'Expiry Date', status: 'NORMAL', confidence: 98 }
        ]
      },
      stampForensics: { score: 95, status: 'AUTHENTIC', details: 'Guilloche lines unbroken across optical scan.' },
      compressionForensics: { score: 96, elaDiscrepancy: 'Negligible (1.1%)', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: []
    },
    scenarioRiskOverride: 12,
    expectedOutcome: 'LOW RISK (12/100) — Standard Clearance'
  },

  // -------------------------------------------------------------
  // Scenario 2: Altered Passport Number (Flagship Demo)
  // -------------------------------------------------------------
  {
    id: 'scenario_2',
    title: 'Scenario 2 — Altered Passport Number',
    tag: 'ALTERED DOC',
    badgeClass: 'badge-high',
    shortDesc: 'Visual passport number altered from X7429136 to A1234567. Triggers OCR vs MRZ checksum discrepancy, local ELA anomaly, and registry mismatch.',
    traveller: {
      referenceId: 'TRV-2026-04102',
      name: 'JOHN DOE',
      surname: 'DOE',
      givenNames: 'JOHN',
      nationality: 'IND',
      countryName: 'REPUBLIC OF INDIA',
      dob: '1995-08-15',
      gender: 'M',
      personId: 'john_doe'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Ordinary Biometric',
      docNumber: 'A1234567', // Visual altered number
      countryCode: 'IND',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      // Notice: MRZ still contains the original genuine number and check digit!
      mrzLine1: 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'X7429136<7IND9508152M3005132<<<<<<<<<<<<<<<0'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'DOE',
        givenNames: 'JOHN',
        docNumber: 'X7429136',
        nationality: 'INDIAN',
        sex: 'M',
        dob: '1995-08-15',
        issueDate: '2020-05-14',
        expiryDate: '2030-05-13',
        issuingAuthority: 'PASSPORT OFFICE DELHI',
        mrzLine1: 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'X7429136<7IND9508152M3005132<<<<<<<<<<<<<<<0',
        personId: 'john_doe'
      }, { alteredNumber: true }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('john_doe'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('john_doe')
    },
    ocrData: {
      fullName: 'JOHN DOE',
      surname: 'DOE',
      givenNames: 'JOHN',
      documentNumber: 'A1234567', // Altered visual text!
      nationality: 'IND',
      dob: '1995-08-15',
      sex: 'M',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      overallOcrConfidence: 98.8
    },
    faceVerification: {
      similarityScore: 96.8,
      threshold: 80.0,
      docQuality: 'ICAO Compliant (96%)',
      liveQuality: 'Optimal Frontal (95%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 95
    },
    tampering: {
      overallScore: 54,
      photoIntegrity: { score: 95, status: 'NORMAL', details: 'Portrait region authentic.' },
      textForensics: {
        score: 42,
        regions: [
          { name: 'Surname / Given Name', status: 'NORMAL', confidence: 99 },
          { name: 'Passport Number', status: 'SUSPICIOUS', confidence: 98, anomalyType: 'Font kerning mismatch & ELA compression discontinuity' },
          { name: 'Date of Birth', status: 'NORMAL', confidence: 98 },
          { name: 'Expiry Date', status: 'NORMAL', confidence: 97 }
        ]
      },
      stampForensics: { score: 92, status: 'AUTHENTIC', details: 'No stamp anomalies.' },
      compressionForensics: { score: 48, elaDiscrepancy: 'Severe (18.4% local spike)', noiseVariance: 'Discontinuous over Doc No. box' },
      tamperingBoundingBoxes: [
        { x: 0.53, y: 0.20, w: 0.22, h: 0.08, severity: 'CRITICAL', label: 'DOC NUMBER', anomaly: 'Font & ELA Discontinuity' }
      ]
    },
    scenarioRiskOverride: 76,
    expectedOutcome: 'HIGH RISK (76/100) — Refer for Enhanced Officer Inspection'
  },

  // -------------------------------------------------------------
  // Scenario 3: Photo Replacement
  // -------------------------------------------------------------
  {
    id: 'scenario_3',
    title: 'Scenario 3 — Photo Replacement',
    tag: 'PHOTO FRAUD',
    badgeClass: 'badge-high',
    shortDesc: 'Substituted portrait detected via boundary cut-line halo and low facial similarity score (41.2%) against live camera capture.',
    traveller: {
      referenceId: 'TRV-2026-09312',
      name: 'MARIA SILVA',
      surname: 'SILVA',
      givenNames: 'MARIA',
      nationality: 'BRA',
      countryName: 'FEDERATIVE REPUBLIC OF BRAZIL',
      dob: '1992-04-10',
      gender: 'F',
      personId: 'maria_silva'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Official Series',
      docNumber: 'P5831042',
      countryCode: 'BRA',
      issueDate: '2021-08-20',
      expiryDate: '2031-08-19',
      issuingAuthority: 'POLICIA FEDERAL BRASILIA',
      mrzLine1: 'P<BRASILVA<<MARIA<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'P5831042<6BRA9204100F3108192<<<<<<<<<<<<<<<4'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'FEDERATIVE REPUBLIC OF BRAZIL',
        countryCode: 'BRA',
        surname: 'SILVA',
        givenNames: 'MARIA',
        docNumber: 'P5831042',
        nationality: 'BRAZILIAN',
        sex: 'F',
        dob: '1992-04-10',
        issueDate: '2021-08-20',
        expiryDate: '2031-08-19',
        issuingAuthority: 'POLICIA FEDERAL BRASILIA',
        mrzLine1: 'P<BRASILVA<<MARIA<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'P5831042<6BRA9204100F3108192<<<<<<<<<<<<<<<4',
        personId: 'maria_silva'
      }, { photoSpliced: true }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('maria_silva'),
      // Live traveller is an impostor with different face structure!
      travellerLiveUri: SampleDocuments.getPortraitSvg('impersonator_male')
    },
    ocrData: {
      fullName: 'MARIA SILVA',
      surname: 'SILVA',
      givenNames: 'MARIA',
      documentNumber: 'P5831042',
      nationality: 'BRA',
      dob: '1992-04-10',
      sex: 'F',
      issueDate: '2021-08-20',
      expiryDate: '2031-08-19',
      issuingAuthority: 'POLICIA FEDERAL BRASILIA',
      overallOcrConfidence: 99.1
    },
    faceVerification: {
      similarityScore: 41.2,
      threshold: 80.0,
      docQuality: 'Substituted Substrate Artifact',
      liveQuality: 'Optimal'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 94
    },
    tampering: {
      overallScore: 46,
      photoIntegrity: { score: 38, status: 'SUSPICIOUS', details: 'Perimeter border splicing, halo compression artifact around ear margin.' },
      textForensics: {
        score: 94,
        regions: [
          { name: 'Surname / Given Name', status: 'NORMAL', confidence: 98 },
          { name: 'Passport Number', status: 'NORMAL', confidence: 99 },
          { name: 'Date of Birth', status: 'NORMAL', confidence: 98 },
          { name: 'Expiry Date', status: 'NORMAL', confidence: 98 }
        ]
      },
      stampForensics: { score: 88, status: 'AUTHENTIC', details: 'Guilloche intact outside photo window.' },
      compressionForensics: { score: 40, elaDiscrepancy: 'Severe (24.1% on photo frame)', noiseVariance: 'Non-uniform' },
      tamperingBoundingBoxes: [
        { x: 0.05, y: 0.18, w: 0.25, h: 0.48, severity: 'CRITICAL', label: 'PORTRAIT SPLICING', anomaly: 'Physical Boundary Cut Detected' }
      ]
    },
    scenarioRiskOverride: 84,
    expectedOutcome: 'HIGH RISK (84/100) — Photo Splicing & Face Mismatch'
  },

  // -------------------------------------------------------------
  // Scenario 4: Expired Passport
  // -------------------------------------------------------------
  {
    id: 'scenario_4',
    title: 'Scenario 4 — Expired Passport',
    tag: 'EXPIRED DOC',
    badgeClass: 'badge-review',
    shortDesc: 'Genuine document but expired on 2024-02-11. Database confirms EXPIRED status. Prompts officer review for re-entry or renewal grace rules.',
    traveller: {
      referenceId: 'TRV-2026-01183',
      name: 'DAVID MILLER',
      surname: 'MILLER',
      givenNames: 'DAVID',
      nationality: 'USA',
      countryName: 'UNITED STATES OF AMERICA',
      dob: '1984-11-22',
      gender: 'M',
      personId: 'david_miller'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Regular',
      docNumber: 'E9821430',
      countryCode: 'USA',
      issueDate: '2014-02-12',
      expiryDate: '2024-02-11', // Expired!
      issuingAuthority: 'US DEPT OF STATE',
      mrzLine1: 'P<USAMILLER<<DAVID<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'E9821430<5USA8411224M2402114<<<<<<<<<<<<<<<2'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'UNITED STATES OF AMERICA',
        countryCode: 'USA',
        surname: 'MILLER',
        givenNames: 'DAVID',
        docNumber: 'E9821430',
        nationality: 'UNITED STATES CITIZEN',
        sex: 'M',
        dob: '1984-11-22',
        issueDate: '2014-02-12',
        expiryDate: '2024-02-11',
        issuingAuthority: 'US DEPT OF STATE',
        mrzLine1: 'P<USAMILLER<<DAVID<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'E9821430<5USA8411224M2402114<<<<<<<<<<<<<<<2',
        personId: 'david_miller'
      }, { expired: true }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('david_miller'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('david_miller')
    },
    ocrData: {
      fullName: 'DAVID MILLER',
      surname: 'MILLER',
      givenNames: 'DAVID',
      documentNumber: 'E9821430',
      nationality: 'USA',
      dob: '1984-11-22',
      sex: 'M',
      issueDate: '2014-02-12',
      expiryDate: '2024-02-11', // Lapsed
      issuingAuthority: 'US DEPT OF STATE',
      overallOcrConfidence: 99.0
    },
    faceVerification: {
      similarityScore: 96.1,
      threshold: 80.0,
      docQuality: 'Good',
      liveQuality: 'Optimal'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 95
    },
    tampering: {
      overallScore: 95,
      photoIntegrity: { score: 96, status: 'NORMAL', details: 'Authentic photo.' },
      textForensics: {
        score: 97,
        regions: [
          { name: 'Surname / Given Name', status: 'NORMAL', confidence: 99 },
          { name: 'Passport Number', status: 'NORMAL', confidence: 99 },
          { name: 'Date of Birth', status: 'NORMAL', confidence: 98 },
          { name: 'Expiry Date', status: 'NORMAL', confidence: 98 }
        ]
      },
      stampForensics: { score: 94, status: 'AUTHENTIC', details: 'Original substrate.' },
      compressionForensics: { score: 95, elaDiscrepancy: 'Low (1.4%)', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: [
        { x: 0.31, y: 0.52, w: 0.22, h: 0.08, severity: 'SUSPICIOUS', label: 'DATE LAPSED', anomaly: 'Expired 2024-02-11' }
      ]
    },
    scenarioRiskOverride: 58,
    expectedOutcome: 'REVIEW REQUIRED (58/100) — Expired Travel Document'
  },

  // -------------------------------------------------------------
  // Scenario 5: Visa Inconsistency
  // -------------------------------------------------------------
  {
    id: 'scenario_5',
    title: 'Scenario 5 — Visa Inconsistency',
    tag: 'VISA MISMATCH',
    badgeClass: 'badge-high',
    shortDesc: 'Electronic visa registered to passport X9999999 presented with passport Z2948175. Digital overlay detected on consular stamp.',
    traveller: {
      referenceId: 'TRV-2026-05591',
      name: 'ALEX MORGAN',
      surname: 'MORGAN',
      givenNames: 'ALEX',
      nationality: 'GBR',
      countryName: 'UNITED KINGDOM',
      dob: '1989-07-25',
      gender: 'M',
      personId: 'alex_morgan'
    },
    document: {
      type: 'PASSPORT + VISA',
      subType: 'British Citizen + Consular Visa',
      docNumber: 'Z2948175',
      countryCode: 'GBR',
      issueDate: '2019-11-04',
      expiryDate: '2029-11-03',
      issuingAuthority: 'HMPO LONDON',
      mrzLine1: 'P<GBRMORGAN<<ALEX<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'Z2948175<7GBR8907253M2911032<<<<<<<<<<<<<<<6'
    },
    visaData: {
      visaNumber: 'V-SUSP-7701',
      passportNumber: 'X9999999', // Mismatched!
      type: 'BUSINESS TRANSIT (C-1)',
      issuingCountry: 'USA',
      validFrom: '2026-08-01',
      validUntil: '2026-10-01',
      entriesAllowed: 'SINGLE',
      durationOfStay: '72 hours'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'UNITED KINGDOM',
        countryCode: 'GBR',
        surname: 'MORGAN',
        givenNames: 'ALEX',
        docNumber: 'Z2948175',
        nationality: 'BRITISH CITIZEN',
        sex: 'M',
        dob: '1989-07-25',
        issueDate: '2019-11-04',
        expiryDate: '2029-11-03',
        issuingAuthority: 'HMPO LONDON',
        mrzLine1: 'P<GBRMORGAN<<ALEX<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'Z2948175<7GBR8907253M2911032<<<<<<<<<<<<<<<6',
        personId: 'alex_morgan'
      }),
      secondaryDocUri: SampleDocuments.getVisaSvg({
        visaNumber: 'V-SUSP-7701',
        travellerName: 'MORGAN, ALEX',
        passportNumber: 'X9999999',
        type: 'BUSINESS TRANSIT',
        issuingCountry: 'UNITED STATES',
        validFrom: '2026-08-01',
        validUntil: '2026-10-01'
      }, { overlayAlert: true, mismatchedPassport: true }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('alex_morgan'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('alex_morgan')
    },
    ocrData: {
      fullName: 'ALEX MORGAN',
      surname: 'MORGAN',
      givenNames: 'ALEX',
      documentNumber: 'Z2948175',
      nationality: 'GBR',
      dob: '1989-07-25',
      sex: 'M',
      issueDate: '2019-11-04',
      expiryDate: '2029-11-03',
      issuingAuthority: 'HMPO LONDON',
      overallOcrConfidence: 99.2
    },
    faceVerification: {
      similarityScore: 95.8,
      threshold: 80.0,
      docQuality: 'Optimal',
      liveQuality: 'Optimal'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 95
    },
    tampering: {
      overallScore: 68,
      photoIntegrity: { score: 96, status: 'NORMAL', details: 'Passport photo authentic.' },
      textForensics: { score: 92, regions: [{ name: 'All Visual Fields', status: 'NORMAL', confidence: 98 }] },
      stampForensics: { score: 55, status: 'SUSPICIOUS', details: 'Digital raster overlay signature on consular entry stamp.' },
      compressionForensics: { score: 65, elaDiscrepancy: 'Localized stamp anomaly', noiseVariance: 'Discontinuous stamp edges' },
      tamperingBoundingBoxes: [
        { x: 0.68, y: 0.30, w: 0.25, h: 0.38, severity: 'HIGH', label: 'DIGITAL STAMP OVERLAY', anomaly: 'Raster Layer Artifact' }
      ]
    },
    scenarioRiskOverride: 72,
    expectedOutcome: 'HIGH RISK (72/100) — Visa Mismatch & Digital Overlay'
  },

  // -------------------------------------------------------------
  // Scenario 6: Identity Mismatch (Impersonator)
  // -------------------------------------------------------------
  {
    id: 'scenario_6',
    title: 'Scenario 6 — Biometric Impersonator',
    tag: 'IMPERSONATOR',
    badgeClass: 'badge-high',
    shortDesc: 'A genuine travel document presented by an unauthorized individual. Biometric facial matching yields only 38.4% similarity.',
    traveller: {
      referenceId: 'TRV-2026-07730',
      name: 'JOHN DOE',
      surname: 'DOE',
      givenNames: 'JOHN',
      nationality: 'IND',
      countryName: 'REPUBLIC OF INDIA',
      dob: '1995-08-15',
      gender: 'M',
      personId: 'john_doe'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Biometric',
      docNumber: 'X7429136',
      countryCode: 'IND',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      mrzLine1: 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'X7429136<7IND9508152M3005132<<<<<<<<<<<<<<<0'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'DOE',
        givenNames: 'JOHN',
        docNumber: 'X7429136',
        nationality: 'INDIAN',
        sex: 'M',
        dob: '1995-08-15',
        issueDate: '2020-05-14',
        expiryDate: '2030-05-13',
        issuingAuthority: 'PASSPORT OFFICE DELHI',
        mrzLine1: 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'X7429136<7IND9508152M3005132<<<<<<<<<<<<<<<0',
        personId: 'john_doe'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('john_doe'),
      // Live traveller is completely different person!
      travellerLiveUri: SampleDocuments.getPortraitSvg('impersonator_male')
    },
    ocrData: {
      fullName: 'JOHN DOE',
      surname: 'DOE',
      givenNames: 'JOHN',
      documentNumber: 'X7429136',
      nationality: 'IND',
      dob: '1995-08-15',
      sex: 'M',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      overallOcrConfidence: 99.4
    },
    faceVerification: {
      similarityScore: 38.4, // Deep mismatch!
      threshold: 80.0,
      docQuality: 'Optimal (98%)',
      liveQuality: 'Optimal (97%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 94
    },
    tampering: {
      overallScore: 96,
      photoIntegrity: { score: 98, status: 'NORMAL', details: 'Document photo is untouched and authentic.' },
      textForensics: { score: 97, regions: [{ name: 'All Fields', status: 'NORMAL', confidence: 99 }] },
      stampForensics: { score: 95, status: 'AUTHENTIC', details: 'Clean substrate.' },
      compressionForensics: { score: 96, elaDiscrepancy: 'Low', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: []
    },
    scenarioRiskOverride: 88,
    expectedOutcome: 'HIGH RISK (88/100) — Biometric Impersonator Detected'
  },

  // -------------------------------------------------------------
  // Scenario 7: Watchlist Demo Match
  // -------------------------------------------------------------
  {
    id: 'scenario_7',
    title: 'Scenario 7 — Watchlist Demo Match',
    tag: 'WATCHLIST HIT',
    badgeClass: 'badge-high',
    shortDesc: 'Document is authentic and biometrics match, but traveller triggers simulated Interpol Purple Notice (DEMO-WL-00421).',
    traveller: {
      referenceId: 'TRV-2026-00421',
      name: 'TARIQ RASHID',
      surname: 'RASHID',
      givenNames: 'TARIQ',
      nationality: 'SYR',
      countryName: 'SYRIAN ARAB REPUBLIC',
      dob: '1987-03-12',
      gender: 'M',
      personId: 'impersonator_male'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Regular',
      docNumber: 'W7789012',
      countryCode: 'SYR',
      issueDate: '2021-01-10',
      expiryDate: '2027-01-09',
      issuingAuthority: 'MINISTRY OF INTERIOR',
      mrzLine1: 'P<SYRRASHID<<TARIQ<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'W7789012<8SYR8703123M2701091<<<<<<<<<<<<<<<8'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'SYRIAN ARAB REPUBLIC',
        countryCode: 'SYR',
        surname: 'RASHID',
        givenNames: 'TARIQ',
        docNumber: 'W7789012',
        nationality: 'SYRIAN',
        sex: 'M',
        dob: '1987-03-12',
        issueDate: '2021-01-10',
        expiryDate: '2027-01-09',
        issuingAuthority: 'MINISTRY OF INTERIOR',
        mrzLine1: 'P<SYRRASHID<<TARIQ<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'W7789012<8SYR8703123M2701091<<<<<<<<<<<<<<<8',
        personId: 'impersonator_male'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('impersonator_male'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('impersonator_male')
    },
    ocrData: {
      fullName: 'TARIQ RASHID',
      surname: 'RASHID',
      givenNames: 'TARIQ',
      documentNumber: 'W7789012',
      nationality: 'SYR',
      dob: '1987-03-12',
      sex: 'M',
      issueDate: '2021-01-10',
      expiryDate: '2027-01-09',
      issuingAuthority: 'MINISTRY OF INTERIOR',
      overallOcrConfidence: 98.6
    },
    faceVerification: {
      similarityScore: 95.4,
      threshold: 80.0,
      docQuality: 'Good',
      liveQuality: 'Optimal'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 95
    },
    tampering: {
      overallScore: 94,
      photoIntegrity: { score: 95, status: 'NORMAL', details: 'Substrate valid.' },
      textForensics: { score: 96, regions: [{ name: 'All Fields', status: 'NORMAL', confidence: 98 }] },
      stampForensics: { score: 92, status: 'AUTHENTIC', details: 'No alterations.' },
      compressionForensics: { score: 94, elaDiscrepancy: 'Low', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: []
    },
    watchlistHit: {
      referenceId: 'DEMO-WL-00421',
      alertType: 'INTERPOL PURPLE NOTICE',
      status: 'ACTIVE - SUPERVISOR DEBRIEF REQUIRED'
    },
    scenarioRiskOverride: 79,
    expectedOutcome: 'OFFICER REVIEW (79/100) — Simulated Watchlist Alert'
  },

  // -------------------------------------------------------------
  // Scenario 8: Air-Gapped Offline Inspection (WAN Network Outage)
  // -------------------------------------------------------------
  {
    id: 'scenario_8',
    title: 'Scenario 8 — Air-Gapped Offline Inspection',
    tag: 'OFFLINE AIR-GAP',
    badgeClass: 'badge-info',
    isOfflineScenario: true,
    shortDesc: 'WAN/Internet link disconnected at checkpoint. All AI engines (OCR, MRZ, Forensics, Face Match) run 100% on local Edge workstation. Audit records cryptographically sealed into local Section 65B vault.',
    traveller: {
      referenceId: 'TRV-2026-09941',
      name: 'AMITA SHARMA',
      surname: 'SHARMA',
      givenNames: 'AMITA',
      nationality: 'IND',
      countryName: 'REPUBLIC OF INDIA',
      dob: '1993-11-04',
      gender: 'F',
      personId: 'maria_silva'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Biometric (Offline Node)',
      docNumber: 'S8921450',
      countryCode: 'IND',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      mrzLine1: 'P<INDSHARMA<<AMITA<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'S8921450<5IND9311044F3005132<<<<<<<<<<<<<<<6'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'SHARMA',
        givenNames: 'AMITA',
        docNumber: 'S8921450',
        nationality: 'INDIAN',
        sex: 'F',
        dob: '1993-11-04',
        issueDate: '2020-05-14',
        expiryDate: '2030-05-13',
        issuingAuthority: 'PASSPORT OFFICE DELHI',
        mrzLine1: 'P<INDSHARMA<<AMITA<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'S8921450<5IND9311044F3005132<<<<<<<<<<<<<<<6',
        personId: 'maria_silva'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('maria_silva'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('maria_silva')
    },
    ocrData: {
      fullName: 'AMITA SHARMA',
      surname: 'SHARMA',
      givenNames: 'AMITA',
      documentNumber: 'S8921450',
      nationality: 'IND',
      dob: '1993-11-04',
      sex: 'F',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      overallOcrConfidence: 99.2
    },
    faceVerification: {
      similarityScore: 97.1,
      threshold: 80.0,
      docQuality: 'ICAO Compliant (98%)',
      liveQuality: 'Optimal (96%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 96
    },
    tampering: {
      overallScore: 95,
      photoIntegrity: { score: 97, status: 'NORMAL', details: 'No boundary cut-lines; microprint continuous.' },
      textForensics: { score: 96, regions: [{ name: 'All Fields', status: 'NORMAL', confidence: 99 }] },
      stampForensics: { score: 94, status: 'AUTHENTIC', details: 'Guilloche print intact.' },
      compressionForensics: { score: 95, elaDiscrepancy: 'Negligible (1.2%)', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: []
    },
    scenarioRiskOverride: 15,
    expectedOutcome: 'LOW RISK (15/100) — Local Edge Clearance (Queued for WAN Sync)'
  },

  // -------------------------------------------------------------
  // Scenario 9: MRZ / Visual DOB Mismatch
  // -------------------------------------------------------------
  {
    id: 'scenario_9',
    title: 'Scenario 9 — MRZ / Visual DOB Mismatch',
    tag: 'DATA INCONSISTENCY',
    badgeClass: 'badge-review',
    shortDesc: 'Visual DOB shows 12 May 1995 but MRZ encodes 12 May 1985. Ten-year discrepancy detected by cross-field consistency engine.',
    traveller: {
      referenceId: 'TRV-2026-03387',
      name: 'PRIYA NAIR',
      surname: 'NAIR',
      givenNames: 'PRIYA',
      nationality: 'IND',
      countryName: 'REPUBLIC OF INDIA',
      dob: '1995-05-12', // Visual DOB
      gender: 'F',
      personId: 'maria_silva'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Biometric',
      docNumber: 'N4419273',
      countryCode: 'IND',
      issueDate: '2022-03-18',
      expiryDate: '2032-03-17',
      issuingAuthority: 'PASSPORT OFFICE MUMBAI',
      // MRZ encodes DOB as 1985-05-12 (85) but visual shows 1995-05-12
      mrzLine1: 'P<INDNAIR<<PRIYA<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'N4419273<1IND8505121F3203178<<<<<<<<<<<<<<<6'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'NAIR',
        givenNames: 'PRIYA',
        docNumber: 'N4419273',
        nationality: 'INDIAN',
        sex: 'F',
        dob: '1995-05-12', // Visual shows 1995
        issueDate: '2022-03-18',
        expiryDate: '2032-03-17',
        issuingAuthority: 'PASSPORT OFFICE MUMBAI',
        mrzLine1: 'P<INDNAIR<<PRIYA<<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'N4419273<1IND8505121F3203178<<<<<<<<<<<<<<<6',
        personId: 'maria_silva'
      }, { mrzDobMismatch: true }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('maria_silva'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('maria_silva')
    },
    ocrData: {
      fullName: 'PRIYA NAIR',
      surname: 'NAIR',
      givenNames: 'PRIYA',
      documentNumber: 'N4419273',
      nationality: 'IND',
      dob: '1995-05-12', // Visual OCR reads 1995
      sex: 'F',
      issueDate: '2022-03-18',
      expiryDate: '2032-03-17',
      issuingAuthority: 'PASSPORT OFFICE MUMBAI',
      overallOcrConfidence: 98.8
    },
    faceVerification: {
      similarityScore: 93.2,
      threshold: 80.0,
      docQuality: 'ICAO Compliant (96%)',
      liveQuality: 'Optimal (95%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 94
    },
    tampering: {
      overallScore: 88,
      photoIntegrity: { score: 96, status: 'NORMAL', details: 'Portrait region authentic.' },
      textForensics: {
        score: 78,
        regions: [
          { name: 'Surname / Given Name', status: 'NORMAL', confidence: 98 },
          { name: 'Passport Number', status: 'NORMAL', confidence: 99 },
          { name: 'Date of Birth', status: 'SUSPICIOUS', confidence: 81, anomalyType: 'Digit character inconsistency: visual "9" in year position, MRZ encodes "8"' },
          { name: 'Expiry Date', status: 'NORMAL', confidence: 97 }
        ]
      },
      stampForensics: { score: 92, status: 'AUTHENTIC', details: 'Guilloche lines intact.' },
      compressionForensics: { score: 86, elaDiscrepancy: 'Moderate (DOB region: 8.2%)', noiseVariance: 'Slight discontinuity at DOB field' },
      tamperingBoundingBoxes: [
        { x: 0.0, y: 0.47, w: 0.45, h: 0.09, severity: 'HIGH', label: 'DOB DISCREPANCY', anomaly: 'Visual "1995" vs MRZ "1985"' }
      ]
    },
    mrzDobMismatch: true,
    scenarioRiskOverride: 62,
    expectedOutcome: 'REVIEW REQUIRED (62/100) — Visual DOB / MRZ DOB Inconsistency'
  },

  // -------------------------------------------------------------
  // Scenario 10: Lost / Stolen Document
  // -------------------------------------------------------------
  {
    id: 'scenario_10',
    title: 'Scenario 10 — Lost / Stolen Document',
    tag: 'LOST/STOLEN',
    badgeClass: 'badge-high',
    shortDesc: 'Document was reported lost in 2025. Registry confirms REPORTED LOST/STOLEN status. Biometrics pass but document is flagged.',
    traveller: {
      referenceId: 'TRV-2026-06724',
      name: 'CAROLINA REYES',
      surname: 'REYES',
      givenNames: 'CAROLINA',
      nationality: 'MEX',
      countryName: 'UNITED MEXICAN STATES',
      dob: '1990-06-28',
      gender: 'F',
      personId: 'maria_silva'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Biometric',
      docNumber: 'M7741390',
      countryCode: 'MEX',
      issueDate: '2019-04-15',
      expiryDate: '2029-04-14',
      issuingAuthority: 'SECRETARIA DE RELACIONES EXTERIORES',
      mrzLine1: 'P<MEXREYES<<CAROLINA<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'M7741390<9MEX9006289F2904146<<<<<<<<<<<<<<<6'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'UNITED MEXICAN STATES',
        countryCode: 'MEX',
        surname: 'REYES',
        givenNames: 'CAROLINA',
        docNumber: 'M7741390',
        nationality: 'MEXICAN',
        sex: 'F',
        dob: '1990-06-28',
        issueDate: '2019-04-15',
        expiryDate: '2029-04-14',
        issuingAuthority: 'SECRETARIA DE RELACIONES EXTERIORES',
        mrzLine1: 'P<MEXREYES<<CAROLINA<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'M7741390<9MEX9006289F2904146<<<<<<<<<<<<<<<6',
        personId: 'maria_silva'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('maria_silva'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('maria_silva')
    },
    ocrData: {
      fullName: 'CAROLINA REYES',
      surname: 'REYES',
      givenNames: 'CAROLINA',
      documentNumber: 'M7741390',
      nationality: 'MEX',
      dob: '1990-06-28',
      sex: 'F',
      issueDate: '2019-04-15',
      expiryDate: '2029-04-14',
      issuingAuthority: 'SECRETARIA DE RELACIONES EXTERIORES',
      overallOcrConfidence: 99.0
    },
    faceVerification: {
      similarityScore: 94.6,
      threshold: 80.0,
      docQuality: 'Good (94%)',
      liveQuality: 'Optimal (97%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 95
    },
    tampering: {
      overallScore: 94,
      photoIntegrity: { score: 96, status: 'NORMAL', details: 'Portrait region authentic. No splicing detected.' },
      textForensics: { score: 95, regions: [{ name: 'All Fields', status: 'NORMAL', confidence: 97 }] },
      stampForensics: { score: 92, status: 'AUTHENTIC', details: 'Embossed seals consistent.' },
      compressionForensics: { score: 94, elaDiscrepancy: 'Low (1.8%)', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: []
    },
    lostStolenHit: {
      referenceId: 'LST-2025-M7741390',
      reportedDate: '2025-07-14',
      reportingAuthority: 'DEMO — Secretaría de Relaciones Exteriores / Mexican Consulate',
      status: 'REPORTED LOST — SIMULATED RECORD',
      instructions: 'Document reported lost by holder on 2025-07-14. Secondary inspection and document verification required.'
    },
    scenarioRiskOverride: 78,
    expectedOutcome: 'HIGH RISK (78/100) — Lost / Stolen Document Alert'
  },

  // -------------------------------------------------------------
  // Scenario 11: Multiple Identity Indicator
  // -------------------------------------------------------------
  {
    id: 'scenario_11',
    title: 'Scenario 11 — Multiple Identity Indicator',
    tag: 'IDENTITY LINK',
    badgeClass: 'badge-review',
    shortDesc: 'Two distinct passport records (JOHN DOE / JONATHAN DOE) with different document numbers show high biometric similarity. Candidate match flagged for authorized investigation.',
    traveller: {
      referenceId: 'TRV-2026-09988',
      name: 'JONATHAN DOE',
      surname: 'DOE',
      givenNames: 'JONATHAN',
      nationality: 'IND',
      countryName: 'REPUBLIC OF INDIA',
      dob: '1995-08-15',
      gender: 'M',
      personId: 'john_doe'
    },
    document: {
      type: 'PASSPORT',
      subType: 'Standard Biometric',
      docNumber: 'P7654321',
      countryCode: 'IND',
      issueDate: '2021-11-20',
      expiryDate: '2031-11-19',
      issuingAuthority: 'PASSPORT OFFICE BANGALORE',
      mrzLine1: 'P<INDDOE<<JONATHAN<<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'P7654321<9IND9508152M3111194<<<<<<<<<<<<<<<2'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'DOE',
        givenNames: 'JONATHAN',
        docNumber: 'P7654321',
        nationality: 'INDIAN',
        sex: 'M',
        dob: '1995-08-15',
        issueDate: '2021-11-20',
        expiryDate: '2031-11-19',
        issuingAuthority: 'PASSPORT OFFICE BANGALORE',
        mrzLine1: 'P<INDDOE<<JONATHAN<<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'P7654321<9IND9508152M3111194<<<<<<<<<<<<<<<2',
        personId: 'john_doe'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('john_doe'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('john_doe')
    },
    ocrData: {
      fullName: 'JONATHAN DOE',
      surname: 'DOE',
      givenNames: 'JONATHAN',
      documentNumber: 'P7654321',
      nationality: 'IND',
      dob: '1995-08-15',
      sex: 'M',
      issueDate: '2021-11-20',
      expiryDate: '2031-11-19',
      issuingAuthority: 'PASSPORT OFFICE BANGALORE',
      overallOcrConfidence: 99.3
    },
    faceVerification: {
      similarityScore: 96.1,
      threshold: 80.0,
      docQuality: 'ICAO Compliant (97%)',
      liveQuality: 'Optimal (95%)'
    },
    liveness: {
      status: 'PASS',
      livenessConfidence: 95
    },
    tampering: {
      overallScore: 95,
      photoIntegrity: { score: 97, status: 'NORMAL', details: 'No splicing detected.' },
      textForensics: { score: 96, regions: [{ name: 'All Fields', status: 'NORMAL', confidence: 98 }] },
      stampForensics: { score: 93, status: 'AUTHENTIC', details: 'Seals consistent.' },
      compressionForensics: { score: 95, elaDiscrepancy: 'Low (1.3%)', noiseVariance: 'Uniform' },
      tamperingBoundingBoxes: []
    },
    multipleIdentityHit: {
      candidateRecord: {
        name: 'JOHN DOE',
        docNumber: 'X7429136',
        nationality: 'IND',
        dob: '1995-08-15',
        issuingAuthority: 'PASSPORT OFFICE DELHI',
        biometricSimilarity: 'HIGH (91.4%)',
        matchingSignals: ['DOB identical', 'Nationality consistent', 'Surname partial match (DOE)', 'Biometric high similarity']
      },
      referenceId: 'MII-2026-00341',
      status: 'CANDIDATE MATCH — AUTHORIZED INVESTIGATION REQUIRED',
      note: 'This is not a confirmation of identity fraud. This is a candidate match requiring authorized officer investigation.'
    },
    scenarioRiskOverride: 55,
    expectedOutcome: 'REVIEW REQUIRED (55/100) — Potential Identity Link Detected'
  },

  // -------------------------------------------------------------
  // Scenario 12: Poor Image Quality
  // -------------------------------------------------------------
  {
    id: 'scenario_12',
    title: 'Scenario 12 — Poor Image Quality',
    tag: 'IMAGE QUALITY',
    badgeClass: 'badge-review',
    shortDesc: 'Document captured with glare, blur, and insufficient resolution. OCR confidence low. System cannot reliably extract fields. Recapture required.',
    traveller: {
      referenceId: 'TRV-2026-07411',
      name: 'UNKNOWN — OCR INSUFFICIENT',
      surname: 'UNKNOWN',
      givenNames: 'UNKNOWN',
      nationality: 'UNK',
      countryName: 'UNKNOWN — RECAPTURE REQUIRED',
      dob: 'UNREADABLE',
      gender: 'U',
      personId: 'john_doe'
    },
    document: {
      type: 'PASSPORT',
      subType: 'UNDETECTED — LOW QUALITY',
      docNumber: 'UNREADABLE',
      countryCode: 'UNK',
      issueDate: 'UNREADABLE',
      expiryDate: 'UNREADABLE',
      issuingAuthority: 'UNREADABLE',
      mrzLine1: '',
      mrzLine2: ''
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'UNKNOWN',
        countryCode: '---',
        surname: '????????',
        givenNames: '????????',
        docNumber: '?????????',
        nationality: '???',
        sex: '?',
        dob: '????-??-??',
        issueDate: '????-??-??',
        expiryDate: '????-??-??',
        issuingAuthority: '??? — POOR QUALITY',
        mrzLine1: '?<??????????????????????????????????????????????????',
        mrzLine2: '??????????????????????????????????????????',
        personId: 'john_doe'
      }, { poorQuality: true }),
      extractedFaceUri: null,
      travellerLiveUri: null
    },
    ocrData: {
      fullName: 'NOT DETECTED',
      surname: 'NOT DETECTED',
      givenNames: 'NOT DETECTED',
      documentNumber: 'NOT DETECTED',
      nationality: 'NOT DETECTED',
      dob: 'NOT DETECTED',
      sex: 'NOT DETECTED',
      issueDate: 'NOT DETECTED',
      expiryDate: 'NOT DETECTED',
      issuingAuthority: 'NOT DETECTED',
      overallOcrConfidence: 18.3,
      poorQuality: true
    },
    imageQuality: {
      resolution: { passed: false, value: '480×320 px (72 DPI)', message: 'Insufficient — minimum 600 DPI required' },
      blur: { passed: false, score: 28, message: 'High blur detected — Laplacian variance 28 (threshold: 100)' },
      glare: { passed: false, score: 71, message: 'Significant glare detected on upper-right region' },
      contrast: { passed: false, score: 34, message: 'Low contrast — histogram compression detected' },
      boundary: { passed: false, message: 'Document boundary not fully detected' },
      overallQuality: 'INSUFFICIENT',
      action: 'RECAPTURE REQUIRED'
    },
    faceVerification: {
      similarityScore: 0,
      threshold: 80.0,
      docQuality: 'INSUFFICIENT — Cannot Extract Face',
      liveQuality: 'Unavailable'
    },
    liveness: {
      status: 'UNAVAILABLE',
      livenessConfidence: 0
    },
    tampering: {
      overallScore: 0,
      photoIntegrity: { score: 0, status: 'UNAVAILABLE', details: 'Insufficient image quality for analysis.' },
      textForensics: { score: 0, regions: [] },
      stampForensics: { score: 0, status: 'UNAVAILABLE', details: 'Cannot analyze.' },
      compressionForensics: { score: 0, elaDiscrepancy: 'N/A', noiseVariance: 'N/A' },
      tamperingBoundingBoxes: []
    },
    scenarioRiskOverride: 45,
    expectedOutcome: 'REVIEW REQUIRED (45/100) — Image Quality Insufficient — Recapture Required'
  }
];
