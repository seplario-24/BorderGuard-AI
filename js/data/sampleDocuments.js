/**
 * BorderGuard AI - Synthetic Document & Biometric Portrait Asset Generator
 * Produces realistic vector SVGs (Passport Biodata Pages, Visas, National IDs, Portraits)
 * designed specifically for border inspection consoles.
 */

export const SampleDocuments = {
  // Helper to create an SVG Data URI
  svgToDataUri(svgString) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
  },

  // Generate Synthetic Portrait SVG
  getPortraitSvg(personId = 'john_doe', expression = 'neutral', lighting = 'balanced') {
    let hairColor = '#2b1d0c';
    let skinTone = '#e0a97a';
    let shirtColor = '#1e3a8a';
    let glasses = false;

    if (personId === 'maria_silva') {
      hairColor = '#1c1917';
      skinTone = '#d49b6a';
      shirtColor = '#065f46';
    } else if (personId === 'alex_morgan') {
      hairColor = '#854d0e';
      skinTone = '#fcd34d';
      shirtColor = '#7c2d12';
      glasses = true;
    } else if (personId === 'david_miller') {
      hairColor = '#475569';
      skinTone = '#fbcfe8';
      shirtColor = '#334155';
    } else if (personId === 'impersonator_male') {
      hairColor = '#09090b';
      skinTone = '#b45309';
      shirtColor = '#475569';
    }

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
        <radialGradient id="faceGrad" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stop-color="${skinTone}" stop-opacity="1"/>
          <stop offset="100%" stop-color="${skinTone}" stop-opacity="0.85"/>
        </radialGradient>
      </defs>
      <!-- Background -->
      <rect width="400" height="500" fill="url(#bgGrad)"/>
      <!-- Watermark / Security microtext -->
      <text x="20" y="30" font-family="monospace" font-size="10" fill="#64748b" opacity="0.3">ICAO 9303 BIOMETRIC PORTRAIT SPECIFICATION 2026</text>
      <!-- Torso / Shoulders -->
      <path d="M 60 500 C 70 380, 140 360, 200 360 C 260 360, 330 380, 340 500 Z" fill="${shirtColor}"/>
      <!-- Neck -->
      <rect x="165" y="300" width="70" height="80" rx="10" fill="${skinTone}"/>
      <!-- Head / Face Oval -->
      <ellipse cx="200" cy="230" rx="90" ry="120" fill="url(#faceGrad)"/>
      <!-- Hair -->
      <path d="M 110 210 C 110 110, 290 110, 290 210 C 270 140, 130 140, 110 210 Z" fill="${hairColor}"/>
      <!-- Eyes -->
      <ellipse cx="165" cy="220" rx="14" ry="7" fill="#ffffff"/>
      <circle cx="165" cy="220" r="5" fill="#1e293b"/>
      <ellipse cx="235" cy="220" rx="14" ry="7" fill="#ffffff"/>
      <circle cx="235" cy="220" r="5" fill="#1e293b"/>
      <!-- Eyebrows -->
      <path d="M 150 205 Q 165 200 180 205" stroke="${hairColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 220 205 Q 235 200 250 205" stroke="${hairColor}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Nose -->
      <path d="M 200 215 L 195 260 L 205 260" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- Mouth -->
      <path d="M 180 295 Q 200 305 220 295" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Security Ghost overlay indicator -->
      <circle cx="350" cy="80" r="30" fill="none" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="350" y="84" font-family="monospace" font-size="8" fill="#475569" text-anchor="middle">CHIP ID</text>
    </svg>
    `;
    return this.svgToDataUri(svg);
  },

  // Generate High-Fidelity Passport Biodata Page SVG
  getPassportSvg(docData, options = {}) {
    const portraitUri = this.getPortraitSvg(docData.personId || 'john_doe');
    const isAlteredNumber = options.alteredNumber || false;
    const isPhotoSpliced = options.photoSpliced || false;
    const isExpired = options.expired || false;

    const displayDocNum = isAlteredNumber ? 'A1234567' : docData.docNumber;
    const numColor = isAlteredNumber ? '#991b1b' : '#0f172a'; // slightly anomalous tint if altered

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
      <defs>
        <!-- Security Guilloche Pattern -->
        <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 20 Q 10 0, 20 20 T 40 20" fill="none" stroke="#93c5fd" stroke-width="0.75" opacity="0.35"/>
          <path d="M 20 0 Q 0 10, 20 20 T 20 40" fill="none" stroke="#fbcfe8" stroke-width="0.75" opacity="0.25"/>
          <circle cx="20" cy="20" r="15" fill="none" stroke="#cbd5e1" stroke-width="0.5" opacity="0.3"/>
        </pattern>
        <!-- Security Holographic Seal -->
        <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
          <stop offset="50%" stop-color="#ec4899" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#eab308" stop-opacity="0.3"/>
        </linearGradient>
      </defs>

      <!-- Document Substrate / Paper Base -->
      <rect width="900" height="600" rx="16" fill="#f8fafc" stroke="#334155" stroke-width="3"/>
      <!-- Security Guilloche Background -->
      <rect width="900" height="600" rx="16" fill="url(#guilloche)"/>

      <!-- Header Banner -->
      <rect x="0" y="0" width="900" height="75" fill="#1e293b"/>
      <text x="40" y="46" font-family="'Inter', sans-serif" font-weight="800" font-size="24" fill="#f8fafc" letter-spacing="2">${docData.countryName || 'REPUBLIC OF IDENTITY'}</text>
      <text x="740" y="46" font-family="'Inter', sans-serif" font-weight="700" font-size="20" fill="#94a3b8" letter-spacing="3">PASSPORT</text>

      <!-- Biometric Symbol -->
      <g transform="translate(835, 26)">
        <rect x="0" y="0" width="28" height="20" rx="3" fill="none" stroke="#f8fafc" stroke-width="1.8"/>
        <line x1="0" y1="10" x2="28" y2="10" stroke="#f8fafc" stroke-width="1.8"/>
        <circle cx="14" cy="10" r="5" fill="#1e293b" stroke="#f8fafc" stroke-width="1.8"/>
      </g>

      <!-- Portrait Box -->
      <g transform="translate(45, 110)">
        <rect width="210" height="270" rx="6" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
        <image href="${portraitUri}" x="5" y="5" width="200" height="260" preserveAspectRatio="xMidYMid slice"/>

        ${isPhotoSpliced ? `
          <!-- Visible Cut line / Splicing defect for scenario 3 -->
          <rect x="0" y="0" width="210" height="270" rx="6" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="8,4"/>
          <circle cx="205" cy="10" r="8" fill="#ef4444"/>
          <text x="205" y="14" font-family="monospace" font-size="11" fill="#ffffff" text-anchor="middle">!</text>
        ` : ''}

        <!-- Holographic Eagle / Crest Overlay -->
        <circle cx="105" cy="135" r="55" fill="url(#holo)"/>
        <path d="M 85 135 L 125 135 M 105 115 L 105 155" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
      </g>

      <!-- Secondary Ghost Portrait -->
      <g transform="translate(740, 160)" opacity="0.45">
        <rect width="105" height="135" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
        <image href="${portraitUri}" x="2" y="2" width="101" height="131" preserveAspectRatio="xMidYMid slice"/>
        <text x="52" y="148" font-family="monospace" font-size="8" fill="#64748b" text-anchor="middle">GHOST IMAGE</text>
      </g>

      <!-- Data Fields Column 1 -->
      <g transform="translate(285, 115)" font-family="'Inter', sans-serif">
        <!-- Document Type & Code -->
        <text x="0" y="16" font-size="11" font-weight="600" fill="#64748b">TYPE / TYPE</text>
        <text x="0" y="38" font-size="16" font-weight="700" fill="#0f172a">P</text>

        <text x="80" y="16" font-size="11" font-weight="600" fill="#64748b">COUNTRY CODE</text>
        <text x="80" y="38" font-size="16" font-weight="700" fill="#0f172a">${docData.countryCode || 'IND'}</text>

        <!-- Document Number -->
        <text x="230" y="16" font-size="11" font-weight="600" fill="#64748b">PASSPORT NO. / NO. DU PASSEPORT</text>
        <text x="230" y="38" font-size="20" font-weight="800" font-family="'IBM Plex Mono', monospace" fill="${numColor}">${displayDocNum}</text>
        ${isAlteredNumber ? `
          <!-- Local ELA artifact boundary around altered number -->
          <rect x="226" y="18" width="165" height="26" fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="4,2"/>
        ` : ''}

        <!-- Surname -->
        <text x="0" y="76" font-size="11" font-weight="600" fill="#64748b">SURNAME / NOM</text>
        <text x="0" y="98" font-size="17" font-weight="800" fill="#0f172a">${docData.surname || 'DOE'}</text>

        <!-- Given Names -->
        <text x="0" y="132" font-size="11" font-weight="600" fill="#64748b">GIVEN NAMES / PRENOMS</text>
        <text x="0" y="154" font-size="17" font-weight="800" fill="#0f172a">${docData.givenNames || 'JOHN'}</text>

        <!-- Nationality & Sex -->
        <text x="0" y="188" font-size="11" font-weight="600" fill="#64748b">NATIONALITY / NATIONALITE</text>
        <text x="0" y="210" font-size="15" font-weight="700" fill="#0f172a">${docData.nationality || 'INDIAN'}</text>

        <text x="230" y="188" font-size="11" font-weight="600" fill="#64748b">SEX / SEXE</text>
        <text x="230" y="210" font-size="15" font-weight="700" fill="#0f172a">${docData.sex || 'M'}</text>

        <!-- DOB -->
        <text x="0" y="244" font-size="11" font-weight="600" fill="#64748b">DATE OF BIRTH / DATE DE NAISSANCE</text>
        <text x="0" y="266" font-size="15" font-weight="700" fill="#0f172a">${docData.dob || '1995-08-15'}</text>

        <!-- Issue & Expiry Dates -->
        <text x="230" y="244" font-size="11" font-weight="600" fill="#64748b">DATE OF ISSUE</text>
        <text x="230" y="266" font-size="15" font-weight="700" fill="#0f172a">${docData.issueDate || '2020-05-14'}</text>

        <text x="0" y="300" font-size="11" font-weight="600" fill="#64748b">DATE OF EXPIRY / EXPIRATION</text>
        <text x="0" y="322" font-size="16" font-weight="800" fill="${isExpired ? '#dc2626' : '#0f172a'}">${docData.expiryDate || '2030-05-13'}</text>

        <text x="230" y="300" font-size="11" font-weight="600" fill="#64748b">AUTHORITY / AUTORITE</text>
        <text x="230" y="322" font-size="14" font-weight="700" fill="#0f172a">${docData.issuingAuthority || 'PASSPORT OFFICE DELHI'}</text>
      </g>

      <!-- MRZ Zone (Lower Box) -->
      <g transform="translate(30, 460)">
        <rect width="840" height="110" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
        <text x="20" y="45" font-family="'OCR-B', 'IBM Plex Mono', monospace" font-size="24" font-weight="600" fill="#0f172a" letter-spacing="4">
          ${docData.mrzLine1 || 'P<INDDOE<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<'}
        </text>
        <text x="20" y="85" font-family="'OCR-B', 'IBM Plex Mono', monospace" font-size="24" font-weight="600" fill="#0f172a" letter-spacing="4">
          ${docData.mrzLine2 || 'X7429136<8IND9508159M3005138<<<<<<<<<<<<<<02'}
        </text>
      </g>
    </svg>
    `;
    return this.svgToDataUri(svg);
  },

  // Generate Synthetic Visa Page SVG
  getVisaSvg(visaData, options = {}) {
    const isOverlayAlert = options.overlayAlert || false;

    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 550" width="900" height="550">
      <defs>
        <pattern id="visaLines" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 0 15 L 30 15 M 15 0 L 15 30" stroke="#bfdbfe" stroke-width="0.5" opacity="0.4"/>
        </pattern>
      </defs>
      <rect width="900" height="550" rx="14" fill="#eff6ff" stroke="#1d4ed8" stroke-width="3"/>
      <rect width="900" height="550" rx="14" fill="url(#visaLines)"/>

      <!-- Visa Header -->
      <rect x="0" y="0" width="900" height="70" fill="#1e3a8a"/>
      <text x="40" y="44" font-family="'Inter', sans-serif" font-weight="800" font-size="22" fill="#ffffff" letter-spacing="2">BORDER CONTROL IMMIGRATION VISA</text>
      <text x="700" y="44" font-family="monospace" font-size="18" fill="#93c5fd">${visaData.visaNumber || 'V-IN-981240'}</text>

      <g transform="translate(60, 100)" font-family="'Inter', sans-serif">
        <text x="0" y="20" font-size="12" font-weight="600" fill="#475569">ISSUING STATE</text>
        <text x="0" y="44" font-size="18" font-weight="800" fill="#1e293b">${visaData.issuingCountry || 'UNITED STATES OF AMERICA'}</text>

        <text x="350" y="20" font-size="12" font-weight="600" fill="#475569">VISA CATEGORY</text>
        <text x="350" y="44" font-size="18" font-weight="800" fill="#1e293b">${visaData.type || 'BUSINESS / TOURISM (B1/B2)'}</text>

        <text x="0" y="90" font-size="12" font-weight="600" fill="#475569">TRAVELLER NAME</text>
        <text x="0" y="114" font-size="18" font-weight="800" fill="#1e293b">${visaData.travellerName || 'DOE, JOHN'}</text>

        <text x="350" y="90" font-size="12" font-weight="600" fill="#475569">PASSPORT NUMBER ASSOCIATION</text>
        <text x="350" y="114" font-size="18" font-weight="800" font-family="monospace" fill="${options.mismatchedPassport ? '#dc2626' : '#1e293b'}">${visaData.passportNumber || 'X7429136'}</text>

        <text x="0" y="160" font-size="12" font-weight="600" fill="#475569">VALID FROM</text>
        <text x="0" y="184" font-size="16" font-weight="700" fill="#1e293b">${visaData.validFrom || '2025-01-01'}</text>

        <text x="200" y="160" font-size="12" font-weight="600" fill="#475569">VALID UNTIL</text>
        <text x="200" y="184" font-size="16" font-weight="700" fill="#1e293b">${visaData.validUntil || '2027-12-31'}</text>

        <text x="400" y="160" font-size="12" font-weight="600" fill="#475569">ENTRIES</text>
        <text x="400" y="184" font-size="16" font-weight="700" fill="#1e293b">${visaData.entries || 'MULTIPLE'}</text>
      </g>

      <!-- Official Consular Stamp -->
      <g transform="translate(620, 160)">
        <circle cx="90" cy="90" r="80" fill="none" stroke="#dc2626" stroke-width="3" opacity="0.85"/>
        <circle cx="90" cy="90" r="68" fill="none" stroke="#dc2626" stroke-width="1.5" opacity="0.85"/>
        <text x="90" y="65" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">IMMIGRATION &amp; BORDER</text>
        <text x="90" y="95" font-family="monospace" font-size="16" font-weight="800" fill="#dc2626" text-anchor="middle">OFFICIALLY VERIFIED</text>
        <text x="90" y="125" font-family="'Inter', sans-serif" font-size="10" fill="#dc2626" text-anchor="middle">STAMP ID 4082-A</text>

        ${isOverlayAlert ? `
          <!-- Digital overlay highlight box -->
          <rect x="-10" y="-10" width="200" height="200" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,3"/>
          <text x="90" y="208" font-family="monospace" font-size="10" fill="#ef4444" text-anchor="middle">[!] DIGITAL OVERLAY ARTIFACT</text>
        ` : ''}
      </g>

      <!-- MRZ Zone for Visa -->
      <g transform="translate(30, 420)">
        <rect width="840" height="95" rx="6" fill="#ffffff" stroke="#93c5fd" stroke-width="1.5"/>
        <text x="20" y="38" font-family="'IBM Plex Mono', monospace" font-size="20" font-weight="600" fill="#0f172a" letter-spacing="3">
          V&lt;USA${(visaData.travellerName || 'DOE<<JOHN').replace(/[, ]+/g, '<<')}&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
        </text>
        <text x="20" y="72" font-family="'IBM Plex Mono', monospace" font-size="20" font-weight="600" fill="#0f172a" letter-spacing="3">
          ${visaData.visaNumber || 'V981240'}&lt;5IND9508159M2712314${visaData.passportNumber || 'X7429136'}&lt;&lt;&lt;&lt;&lt;
        </text>
      </g>
    </svg>
    `;
    return this.svgToDataUri(svg);
  }
};
