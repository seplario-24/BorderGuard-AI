/**
 * BorderGuard AI - Document Validation & Cross-Field Consistency Engine
 * Executes deterministic border compliance rules: dates, format, expiry, and cross-source consistency.
 */

export const ValidationService = {
  // Validate standard dates and chronological order
  validateDates(docData) {
    const today = new Date().toISOString().split('T')[0]; // Current checkpoint date
    const results = [];

    // 1. Expiry Check
    if (docData.expiryDate) {
      const isExpired = docData.expiryDate < today;
      results.push({
        rule: 'EXPIRY_CHECK',
        label: 'Document Expiration Status',
        passed: !isExpired,
        severity: isExpired ? 'CRITICAL' : 'OK',
        message: isExpired
          ? `Document expired on ${docData.expiryDate} (Current: ${today})`
          : `Valid through ${docData.expiryDate}`
      });
    }

    // 2. Issue Date vs Expiry Date
    if (docData.issueDate && docData.expiryDate) {
      const validChronology = docData.issueDate < docData.expiryDate;
      results.push({
        rule: 'ISSUE_BEFORE_EXPIRY',
        label: 'Issue & Expiry Sequence',
        passed: validChronology,
        severity: validChronology ? 'OK' : 'HIGH',
        message: validChronology
          ? 'Issue date precedes expiry date'
          : `Contradiction: Issue date (${docData.issueDate}) is after expiry date (${docData.expiryDate})`
      });
    }

    // 3. DOB vs Issue Date
    if (docData.dob && docData.issueDate) {
      const validDob = docData.dob < docData.issueDate;
      results.push({
        rule: 'DOB_BEFORE_ISSUE',
        label: 'Date of Birth Chronology',
        passed: validDob,
        severity: validDob ? 'OK' : 'CRITICAL',
        message: validDob
          ? 'Date of birth precedes document issuance'
          : `Impossible timeline: Date of birth (${docData.dob}) occurs after document issue date (${docData.issueDate})`
      });
    }

    return results;
  },

  // Cross-field consistency check: Visual OCR vs MRZ
  crossCheckOCRvsMRZ(ocrData, mrzData) {
    const items = [];

    // Check Document / Passport Number
    const ocrNum = (ocrData.documentNumber || '').replace(/\s+/g, '').toUpperCase();
    const mrzNum = (mrzData.fields?.docNumber || '').replace(/\s+/g, '').toUpperCase();
    const numMatch = ocrNum && mrzNum && ocrNum === mrzNum;
    items.push({
      field: 'Passport / Document Number',
      ocrValue: ocrNum,
      mrzValue: mrzNum,
      match: numMatch,
      severity: numMatch ? 'OK' : 'CRITICAL',
      explanation: numMatch
        ? 'OCR visual document number matches MRZ payload exactly'
        : `Discrepancy detected: Visual OCR shows "${ocrNum}", but MRZ encodes "${mrzNum}". Possible physical overlay or altered visual text.`
    });

    // Check Date of Birth
    const ocrDob = (ocrData.dob || '').trim();
    const mrzDob = (mrzData.fields?.dob || '').trim();
    const dobMatch = ocrDob && mrzDob && ocrDob === mrzDob;
    items.push({
      field: 'Date of Birth',
      ocrValue: ocrDob,
      mrzValue: mrzDob,
      match: dobMatch,
      severity: dobMatch ? 'OK' : 'HIGH',
      explanation: dobMatch
        ? 'Visual DOB aligns with MRZ encoded date'
        : `DOB mismatch: OCR visual indicates "${ocrDob}", MRZ encodes "${mrzDob}".`
    });

    // Check Expiry Date
    const ocrExp = (ocrData.expiryDate || '').trim();
    const mrzExp = (mrzData.fields?.expiry || '').trim();
    const expMatch = ocrExp && mrzExp && ocrExp === mrzExp;
    items.push({
      field: 'Expiry Date',
      ocrValue: ocrExp,
      mrzValue: mrzExp,
      match: expMatch,
      severity: expMatch ? 'OK' : 'HIGH',
      explanation: expMatch
        ? 'Visual expiration date matches MRZ encoded date'
        : `Expiry mismatch: OCR visual shows "${ocrExp}", MRZ encodes "${mrzExp}".`
    });

    // Check Full Name / Surname
    const ocrSurname = (ocrData.surname || ocrData.fullName || '').toUpperCase().trim();
    const mrzSurname = (mrzData.fields?.surname || '').toUpperCase().trim();
    const surnameMatch = !mrzSurname || ocrSurname.includes(mrzSurname) || mrzSurname.includes(ocrSurname);
    items.push({
      field: 'Surname / Holder Name',
      ocrValue: ocrSurname,
      mrzValue: mrzSurname,
      match: surnameMatch,
      severity: surnameMatch ? 'OK' : 'CRITICAL',
      explanation: surnameMatch
        ? 'Visual holder name aligns with MRZ machine characters'
        : `Name mismatch: Visual name "${ocrSurname}" does not conform to MRZ characters "${mrzSurname}".`
    });

    // Check Nationality
    const ocrNat = (ocrData.nationality || '').toUpperCase().trim();
    const mrzNat = (mrzData.fields?.nationality || '').toUpperCase().trim();
    const natMatch = !mrzNat || ocrNat === mrzNat || (ocrNat === 'INDIA' && mrzNat === 'IND') || (ocrNat === 'BRAZIL' && mrzNat === 'BRA') || (ocrNat === 'UNITED KINGDOM' && mrzNat === 'GBR');
    items.push({
      field: 'Nationality Code',
      ocrValue: ocrNat,
      mrzValue: mrzNat,
      match: natMatch,
      severity: natMatch ? 'OK' : 'HIGH',
      explanation: natMatch
        ? 'Country of citizenship matches ICAO 3-letter code'
        : `Nationality discrepancy: Visual "${ocrNat}" vs MRZ "${mrzNat}".`
    });

    const total = items.length;
    const matched = items.filter(i => i.match).length;
    const consistencyScore = Math.round((matched / total) * 100);

    return {
      items,
      consistencyScore,
      allPassed: consistencyScore === 100
    };
  },

  // Validate Visa details
  validateVisa(visaData, passportData) {
    const today = new Date().toISOString().split('T')[0];
    const checks = [];

    // 1. Passport association
    const passportMatches = visaData.passportNumber && passportData.documentNumber &&
      visaData.passportNumber.toUpperCase().replace(/\s+/g, '') === passportData.documentNumber.toUpperCase().replace(/\s+/g, '');

    checks.push({
      item: 'Passport Association',
      passed: passportMatches,
      severity: passportMatches ? 'OK' : 'CRITICAL',
      details: passportMatches
        ? `Visa is legitimately linked to Passport ${passportData.documentNumber}`
        : `MISMATCH: Visa issued to Passport ${visaData.passportNumber}, but traveller presented Passport ${passportData.documentNumber}`
    });

    // 2. Visa Date Validity
    const notExpired = visaData.validUntil ? visaData.validUntil >= today : true;
    const started = visaData.validFrom ? visaData.validFrom <= today : true;
    const datesValid = notExpired && started;

    checks.push({
      item: 'Validity Period',
      passed: datesValid,
      severity: notExpired ? (started ? 'OK' : 'MEDIUM') : 'CRITICAL',
      details: !notExpired
        ? `Visa expired on ${visaData.validUntil}`
        : (!started ? `Visa not yet valid (Starts ${visaData.validFrom})` : `Valid from ${visaData.validFrom} to ${visaData.validUntil}`)
    });

    // 3. Entry Count
    const entriesValid = visaData.entriesAllowed && (visaData.entriesAllowed === 'MULTIPLE' || parseInt(visaData.entriesRemaining || 1, 10) > 0);
    checks.push({
      item: 'Entry Permission',
      passed: entriesValid,
      severity: entriesValid ? 'OK' : 'HIGH',
      details: entriesValid
        ? `Permitted (${visaData.entriesAllowed} entries, stay up to ${visaData.durationOfStay || '90 days'})`
        : 'Entry limit exceeded or single-entry already exhausted'
    });

    const allPassed = checks.every(c => c.passed);
    return {
      checks,
      status: allPassed ? 'VALID' : (checks.some(c => c.item === 'Passport Association' && !c.passed) ? 'ASSOCIATION_MISMATCH' : 'EXPIRED_OR_INVALID'),
      allPassed
    };
  }
};
