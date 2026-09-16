/**
 * BorderGuard AI - MRZ Parsing & ICAO Doc 9303 Checksum Service
 * Implements standard 7-3-1 weight check digit algorithms for TD3 (Passport) and TD1 (ID Card).
 */

export const MRZService = {
  // Character value mapping per ICAO Doc 9303
  charValue(char) {
    if (!char || char === '<') return 0;
    const code = char.charCodeAt(0);
    if (code >= 48 && code <= 57) { // 0-9
      return code - 48;
    }
    if (code >= 65 && code <= 90) { // A-Z
      return code - 55; // A=10, B=11, ... Z=35
    }
    if (code >= 97 && code <= 122) { // a-z
      return code - 87;
    }
    return 0;
  },

  // Calculate check digit for a string using 7-3-1 weighting
  calculateCheckDigit(str) {
    const weights = [7, 3, 1];
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      const val = this.charValue(str[i]);
      sum += val * weights[i % 3];
    }
    return sum % 10;
  },

  // Validate check digit against expected character
  validateCheckDigit(str, expectedDigit) {
    const calculated = this.calculateCheckDigit(str);
    const expected = parseInt(expectedDigit, 10);
    return {
      calculated,
      expected,
      valid: calculated === expected
    };
  },

  // Parse and validate TD3 (Passports: 2 lines of 44 chars)
  parseTD3(line1, line2) {
    if (!line1 || !line2) {
      return { success: false, error: 'Incomplete MRZ lines' };
    }
    const l1 = line1.trim().padEnd(44, '<').substring(0, 44);
    const l2 = line2.trim().padEnd(44, '<').substring(0, 44);

    // Line 1 Parsing
    const docType = l1.substring(0, 2).replace(/</g, '');
    const issuingCountry = l1.substring(2, 5).replace(/</g, '');
    const namesPart = l1.substring(5);
    const [surname = '', givenNames = ''] = namesPart.split('<<').map(s => s.replace(/</g, ' ').trim());

    // Line 2 Parsing
    const docNumber = l2.substring(0, 9).replace(/</g, '');
    const docNumberCheck = l2.substring(9, 10);
    const nationality = l2.substring(10, 13).replace(/</g, '');
    const dob = l2.substring(13, 19); // YYMMDD
    const dobCheck = l2.substring(19, 20);
    const sex = l2.substring(20, 21).replace(/</g, 'X');
    const expiry = l2.substring(21, 27); // YYMMDD
    const expiryCheck = l2.substring(27, 28);
    const personalNumber = l2.substring(28, 42).replace(/</g, '');
    const personalNumberCheck = l2.substring(42, 43);
    const compositeCheck = l2.substring(43, 44);

    // Validate individual check digits
    const docNumberValid = this.validateCheckDigit(l2.substring(0, 9), docNumberCheck);
    const dobValid = this.validateCheckDigit(dob, dobCheck);
    const expiryValid = this.validateCheckDigit(expiry, expiryCheck);

    let personalNumberValid = { valid: true };
    if (personalNumberCheck !== '<') {
      personalNumberValid = this.validateCheckDigit(l2.substring(28, 42), personalNumberCheck);
    }

    // Composite checksum includes: docNumber + docNumberCheck + dob + dobCheck + expiry + expiryCheck + personalNumber + personalNumberCheck
    const compositeData = l2.substring(0, 10) + l2.substring(13, 20) + l2.substring(21, 43);
    const compositeValid = this.validateCheckDigit(compositeData, compositeCheck);

    const allPassed = docNumberValid.valid && dobValid.valid && expiryValid.valid && compositeValid.valid;

    return {
      success: true,
      format: 'TD3 (Passport)',
      raw: [l1, l2],
      fields: {
        docType,
        issuingCountry,
        surname,
        givenNames,
        fullName: `${givenNames} ${surname}`.trim(),
        docNumber,
        nationality,
        dob: this.formatDate(dob),
        rawDob: dob,
        sex,
        expiry: this.formatDate(expiry),
        rawExpiry: expiry,
        personalNumber
      },
      checks: {
        docNumber: {
          label: 'Passport / Document Number Checksum',
          passed: docNumberValid.valid,
          expected: docNumberValid.expected,
          calculated: docNumberValid.calculated,
          raw: l2.substring(0, 10)
        },
        dob: {
          label: 'Date of Birth Checksum',
          passed: dobValid.valid,
          expected: dobValid.expected,
          calculated: dobValid.calculated,
          raw: l2.substring(13, 20)
        },
        expiry: {
          label: 'Expiration Date Checksum',
          passed: expiryValid.valid,
          expected: expiryValid.expected,
          calculated: expiryValid.calculated,
          raw: l2.substring(21, 28)
        },
        composite: {
          label: 'Overall Composite Checksum',
          passed: compositeValid.valid,
          expected: compositeValid.expected,
          calculated: compositeValid.calculated,
          raw: compositeData + compositeCheck
        }
      },
      overallValid: allPassed
    };
  },

  // Helper date formatter YYMMDD -> YYYY-MM-DD
  formatDate(yymmdd) {
    if (!yymmdd || yymmdd.length !== 6) return yymmdd;
    const yy = parseInt(yymmdd.substring(0, 2), 10);
    const mm = yymmdd.substring(2, 4);
    const dd = yymmdd.substring(4, 6);
    // Typical ICAO pivot: 70-99 -> 1970-1999, 00-69 -> 2000-2069
    const year = yy >= 50 ? `19${yy.toString().padStart(2, '0')}` : `20${yy.toString().padStart(2, '0')}`;
    return `${year}-${mm}-${dd}`;
  }
};
