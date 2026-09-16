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
      mrzLine2: 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02'
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
        mrzLine2: 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02',
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
      mrzLine2: 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02'
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
        mrzLine2: 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02',
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
      mrzLine2: 'P5831042<4BRA9204106F3108194<<<<<<<<<<<<<<08'
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
        mrzLine2: 'P5831042<4BRA9204106F3108194<<<<<<<<<<<<<<08',
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
      mrzLine2: 'E9821430<3USA8411225M2402118<<<<<<<<<<<<<<04'
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
        mrzLine2: 'E9821430<3USA8411225M2402118<<<<<<<<<<<<<<04',
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
      mrzLine2: 'Z2948175<6GBR8907251M2911038<<<<<<<<<<<<<<04'
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
        mrzLine2: 'Z2948175<6GBR8907251M2911038<<<<<<<<<<<<<<04',
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
      mrzLine2: 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02'
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
        mrzLine2: 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02',
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
      mrzLine2: 'W7789012<8SYR8703124M2701092<<<<<<<<<<<<<<06'
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
        mrzLine2: 'W7789012<8SYR8703124M2701092<<<<<<<<<<<<<<06',
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
      docNumber: 'X7429136',
      countryCode: 'IND',
      issueDate: '2020-05-14',
      expiryDate: '2030-05-13',
      issuingAuthority: 'PASSPORT OFFICE DELHI',
      mrzLine1: 'P<INDSHARMA<<AMITA<<<<<<<<<<<<<<<<<<<<<<<<<<',
      mrzLine2: 'X7429136<8IND9311045F3005138<<<<<<<<<<<<<<06'
    },
    images: {
      docImageUri: SampleDocuments.getPassportSvg({
        countryName: 'REPUBLIC OF INDIA',
        countryCode: 'IND',
        surname: 'SHARMA',
        givenNames: 'AMITA',
        docNumber: 'X7429136',
        nationality: 'INDIAN',
        sex: 'F',
        dob: '1993-11-04',
        issueDate: '2020-05-14',
        expiryDate: '2030-05-13',
        issuingAuthority: 'PASSPORT OFFICE DELHI',
        mrzLine1: 'P<INDSHARMA<<AMITA<<<<<<<<<<<<<<<<<<<<<<<<<<',
        mrzLine2: 'X7429136<8IND9311045F3005138<<<<<<<<<<<<<<06',
        personId: 'maria_silva'
      }),
      extractedFaceUri: SampleDocuments.getPortraitSvg('maria_silva'),
      travellerLiveUri: SampleDocuments.getPortraitSvg('maria_silva')
    },
    ocrData: {
      fullName: 'AMITA SHARMA',
      surname: 'SHARMA',
      givenNames: 'AMITA',
      documentNumber: 'X7429136',
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
  }
];
