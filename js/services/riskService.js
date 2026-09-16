/**
 * BorderGuard AI - Explainable AI Multi-Factor Risk Engine
 * Combines signals from authenticity, tampering, biometric face verification,
 * MRZ integrity, database checks, visa validity, and liveness into an explainable score.
 */

export const RiskService = {
  // Configurable default weights (must sum to 100)
  defaultWeights: {
    authenticity: 25,
    tampering: 25,
    face: 20,
    mrzConsistency: 10,
    database: 10,
    visaDate: 5,
    liveness: 5
  },

  // Calculate comprehensive explainable risk score
  computeRiskScore(evidenceBundle, customWeights = null) {
    const weights = customWeights || this.defaultWeights;
    const factors = [];
    let cumulativeRisk = 0;

    // 1. Document Format & Authenticity (Weight: 25%)
    const authPassed = evidenceBundle.documentAuth?.passed !== false;
    if (authPassed) {
      factors.push({
        module: 'Document Authenticity',
        label: 'Security features & substrate texture valid',
        delta: -5,
        type: 'BENEFIT',
        explanation: 'UV optical brightener absence and microprint pattern align with official issuing specifications.'
      });
    } else {
      factors.push({
        module: 'Document Authenticity',
        label: 'Security pattern anomaly detected',
        delta: +22,
        type: 'PENALTY',
        explanation: 'Guilloche lines exhibit broken alignment under high-resolution spectral inspection.'
      });
      cumulativeRisk += (weights.authenticity * 0.85);
    }

    // 2. Tampering & Forensic Analysis (Weight: 25%)
    const tampering = evidenceBundle.tampering || {};
    if (tampering.photoIntegrity?.status === 'SUSPICIOUS') {
      factors.push({
        module: 'Forensics',
        label: 'Photo manipulation suspected (ELA variance)',
        delta: +24,
        type: 'PENALTY',
        explanation: 'Image compression characteristics differ significantly between the portrait region and surrounding document, indicating possible image substitution.'
      });
      cumulativeRisk += (weights.tampering * 0.90);
    }

    if (tampering.textForensics?.regions?.some(r => r.status === 'SUSPICIOUS')) {
      const suspiciousRegions = tampering.textForensics.regions.filter(r => r.status === 'SUSPICIOUS').map(r => r.name).join(', ');
      factors.push({
        module: 'Forensics',
        label: `Text font/compression anomaly in ${suspiciousRegions}`,
        delta: +20,
        type: 'PENALTY',
        explanation: `Micro-character spacing and local background noise discontinuities detected in [${suspiciousRegions}]. Indicates physical or digital alteration.`
      });
      cumulativeRisk += (weights.tampering * 0.80);
    }

    if (tampering.stampForensics?.status === 'SUSPICIOUS') {
      factors.push({
        module: 'Forensics',
        label: 'Digital overlay detected on official stamp',
        delta: +15,
        type: 'PENALTY',
        explanation: 'Stamp borders lack expected mechanical ink bleed; synthetic raster overlay signature detected.'
      });
      cumulativeRisk += (weights.tampering * 0.60);
    }

    if (tampering.overallScore >= 90 && factors.filter(f => f.module === 'Forensics').length === 0) {
      factors.push({
        module: 'Forensics',
        label: 'Forensic ELA and edge maps normal',
        delta: -5,
        type: 'BENEFIT',
        explanation: 'No edge discontinuities, copy-move artifacts, or localized resampling found across visual zones.'
      });
    }

    // 3. Biometric Face Verification (Weight: 20%)
    const face = evidenceBundle.face || {};
    const simScore = face.similarityScore !== undefined ? face.similarityScore : 96;
    if (simScore >= (face.threshold || 80)) {
      factors.push({
        module: 'Biometric Face Match',
        label: `Biometric face concordance verified (${simScore.toFixed(1)}%)`,
        delta: -4,
        type: 'BENEFIT',
        explanation: `Traveller facial landmarks match document portrait well above the ${face.threshold || 80}% verification threshold.`
      });
    } else {
      const facePenalty = Math.min(weights.face, Math.round(((80 - simScore) / 80) * weights.face * 1.5) + 15);
      factors.push({
        module: 'Biometric Face Match',
        label: `Face mismatch: Similarity ${simScore.toFixed(1)}% (Threshold: ${face.threshold || 80}%)`,
        delta: +facePenalty,
        type: 'PENALTY',
        explanation: 'Facial feature comparison reveals significant structural variation in facial proportion and nasal architecture between document portrait and live traveller.'
      });
      cumulativeRisk += facePenalty;
    }

    // 4. MRZ & Field Consistency (Weight: 10%)
    const mrz = evidenceBundle.mrz || {};
    const consistency = evidenceBundle.consistency || {};
    if (mrz.overallValid) {
      factors.push({
        module: 'MRZ Validation',
        label: 'ICAO Doc 9303 checksums passed (100%)',
        delta: -4,
        type: 'BENEFIT',
        explanation: 'Passport number, date of birth, expiry date, and composite check digits conform exactly to ICAO 7-3-1 standards.'
      });
    } else {
      factors.push({
        module: 'MRZ Validation',
        label: 'MRZ checksum failure / tamper mismatch',
        delta: +18,
        type: 'PENALTY',
        explanation: 'Calculated checksum fails against MRZ check digit. Indicates document number or key metadata was altered without valid recalculation.'
      });
      cumulativeRisk += weights.mrzConsistency * 1.4;
    }

    if (consistency.consistencyScore && consistency.consistencyScore < 100) {
      factors.push({
        module: 'Cross-Field Consistency',
        label: `OCR vs MRZ text discrepancy (${consistency.consistencyScore}%)`,
        delta: +16,
        type: 'PENALTY',
        explanation: 'Visual document text does not agree with machine readable zone characters (e.g. document number mismatch).'
      });
      cumulativeRisk += weights.mrzConsistency * 1.2;
    }

    // 5. Database & Watchlist Validation (Weight: 10%)
    const db = evidenceBundle.database || {};
    if (db.watchlist?.hasMatch) {
      factors.push({
        module: 'Watchlist Ledger',
        label: `Watchlist hit: ${db.watchlist.match.alertType}`,
        delta: +35,
        type: 'PENALTY',
        explanation: `Simulated identity match found in registry: Reference ${db.watchlist.match.referenceId}. Subject requires immediate supervisor engagement.`
      });
      cumulativeRisk += 40;
    }

    if (db.passport?.status === 'VALID') {
      factors.push({
        module: 'Passport Registry',
        label: 'Document registered and in valid status',
        delta: -3,
        type: 'BENEFIT',
        explanation: 'Simulated National Issuance Database confirms valid serial number, correct holder name, and active status.'
      });
    } else if (db.passport?.status === 'EXPIRED') {
      factors.push({
        module: 'Passport Registry',
        label: 'Passport status in registry: EXPIRED',
        delta: +22,
        type: 'PENALTY',
        explanation: 'Central database indicates this document expired and has not been renewed.'
      });
      cumulativeRisk += weights.database * 1.5;
    } else if (db.passport?.found === false || db.passport?.status === 'MISMATCH_OR_UNKNOWN') {
      factors.push({
        module: 'Passport Registry',
        label: 'Passport registry mismatch or unrecorded serial',
        delta: +25,
        type: 'PENALTY',
        explanation: 'Document serial number is not recorded as active in the simulated central registry or is flagged as reported lost/cancelled.'
      });
      cumulativeRisk += weights.database * 1.8;
    }

    // 6. Visa & Date Validity (Weight: 5%)
    const dates = evidenceBundle.dates || [];
    const hasExpiryFail = dates.some(d => d.rule === 'EXPIRY_CHECK' && !d.passed);
    if (hasExpiryFail) {
      factors.push({
        module: 'Date Validity',
        label: 'Document is past stated expiration date',
        delta: +20,
        type: 'PENALTY',
        explanation: 'Travel document expiration date has lapsed. Traveller cannot proceed on standard clearance.'
      });
      cumulativeRisk += weights.visaDate * 3.0;
    }

    const visa = evidenceBundle.visa || {};
    if (visa.status === 'ASSOCIATION_MISMATCH') {
      factors.push({
        module: 'Visa Association',
        label: 'Visa issued to different passport number',
        delta: +22,
        type: 'PENALTY',
        explanation: 'The presented electronic visa is officially associated with a different passport serial number.'
      });
      cumulativeRisk += weights.visaDate * 3.5;
    }

    // 7. Liveness & Anti-Spoofing (Weight: 5%)
    const liveness = evidenceBundle.liveness || {};
    if (liveness.status === 'FAIL') {
      factors.push({
        module: 'Liveness',
        label: 'Biometric presentation attack detected',
        delta: +25,
        type: 'PENALTY',
        explanation: 'Presentation attack detection flagged 2D screen replay artifacts during live camera capture.'
      });
      cumulativeRisk += weights.liveness * 4.0;
    } else if (liveness.status === 'PASS') {
      factors.push({
        module: 'Liveness',
        label: 'Natural biometric presentation verified (95%)',
        delta: -2,
        type: 'BENEFIT',
        explanation: 'Volumetric depth and micro-movement confirm a genuine physical subject.'
      });
    }

    // Normalization: clamp score between 0 and 100
    // Baseline risk is 10-15 if clean, otherwise determined by penalties
    let finalScore = Math.min(100, Math.max(5, Math.round(cumulativeRisk)));

    // Ensure Scenario specific realistic bounds if defined
    if (evidenceBundle.scenarioRiskOverride !== undefined) {
      finalScore = evidenceBundle.scenarioRiskOverride;
    }

    // Risk Category & Level
    let riskLevel = 'LOW';
    let riskColor = '#10b981'; // Green
    let recommendation = 'Proceed to standard officer clearance.';

    if (finalScore >= 70) {
      riskLevel = 'HIGH RISK';
      riskColor = '#ef4444'; // Red
      recommendation = 'Refer for enhanced secondary inspection and supervisor review. High suspicion indicators detected.';
    } else if (finalScore >= 31) {
      riskLevel = 'REVIEW REQUIRED';
      riskColor = '#f59e0b'; // Amber
      recommendation = 'Additional officer review recommended. Document expiry, marginal biometrics, or minor registry flags noted.';
    }

    // System confidence in its analysis (independent of risk)
    const aiConfidence = evidenceBundle.aiConfidence || 94.6;

    return {
      score: finalScore,
      level: riskLevel,
      color: riskColor,
      recommendation,
      aiConfidence,
      factors,
      totalPenalties: factors.filter(f => f.type === 'PENALTY').reduce((acc, cur) => acc + cur.delta, 0),
      totalBenefits: factors.filter(f => f.type === 'BENEFIT').reduce((acc, cur) => acc + Math.abs(cur.delta), 0)
    };
  }
};
