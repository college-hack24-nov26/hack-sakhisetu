/**
 * Marathi Speech-to-Number & Confirmation Normalizer
 * Designed specifically for rural Self-Help Groups (SHGs)
 */

export const DEVANAGARI_DIGIT_MAP: Record<string, string> = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
};

export const WESTERN_TO_DEVANAGARI_MAP: Record<string, string> = {
  '0': '०', '1': '१', '2': '२', '3': '३', '4': '४',
  '5': '५', '6': '६', '7': '७', '8': '८', '9': '९',
};

// Standalone colloquial terms common in rural markets
export const COLLOQUIAL_TERMS: Record<string, number> = {
  'शंभर': 100,
  'सवाशे': 125,
  'दीडशे': 150,
  'पावणेदोनशे': 175,
  'दोनशे': 200,
  'सव्वादोनशे': 225,
  'अडीचशे': 250,
  'पावणेतीनशे': 275,
  'तीनशे': 300,
  'साडेतीनशे': 350,
  'चारशे': 400,
  'साडेचारशे': 450,
  'पाचशे': 500,
  'हजार': 1000,
};

// Hundreds prefix mapping (उदा. 'दोनशे' -> 200)
export const HUNDREDS_MAP: Record<string, number> = {
  'एकशे': 100,
  'दोनशे': 200,
  'तीनशे': 300,
  'चारशे': 400,
  'पाचशे': 500,
  'सहाशे': 600,
  'सातशे': 700,
  'आठशे': 800,
  'नऊशे': 900,
};

// Marathi 1-99 base numbers
export const BASE_NUMBERS: Record<string, number> = {
  'एक': 1, 'दोन': 2, 'तीन': 3, 'चार': 4, 'पाच': 5,
  'सहा': 6, 'सात': 7, 'आठ': 8, 'नऊ': 9, 'दहा': 10,
  'अकरा': 11, 'बारा': 12, 'तेरा': 13, 'चौदा': 14, 'पंधरा': 15,
  'सोळा': 16, 'सतरा': 17, 'अठरा': 18, 'एकोणीस': 19, 'वीस': 20,
  'एकवीस': 21, 'बावीस': 22, 'तेवीस': 23, 'चोवीस': 24, 'पंचवीस': 25,
  'सव्वीस': 26, 'सत्तावीस': 27, 'अठ्ठावीस': 28, 'एकोणतीस': 29, 'तीस': 30,
  'एकतीस': 31, 'बत्तीस': 32, 'तेहेतीस': 33, 'चौतीस': 34, 'पस्तीस': 35,
  'छत्तीस': 36, 'सदतीस': 37, 'अडतीस': 38, 'एकोणचाळीस': 39, 'चाळीस': 40,
  'एकेचाळीस': 41, 'बेचाळीस': 42, 'त्रेचाळीस': 43, 'चव्वेचाळीस': 44, 'पंचेचाळीस': 45,
  'शेचाळीस': 46, 'सत्तेचाळीस': 47, 'अठ्ठेचाळीस': 48, 'एकोणपन्नास': 49, 'पन्नास': 50,
  'एकावन्न': 51, 'बावन्न': 52, 'त्रेपन्न': 53, 'चौपन्न': 54, 'पंचावन्न': 55,
  'छप्पन्न': 56, 'सत्तावन्न': 57, 'अट्ठावन्न': 58, 'एकोणसाठ': 59, 'साठ': 60,
  'एकसष्ट': 61, 'बासष्ट': 62, 'त्रेसष्ट': 63, 'चौसष्ट': 64, 'पासष्ट': 65,
  'सहासष्ट': 66, 'सदुसष्ट': 67, 'अडुसष्ट': 68, 'एकोणसत्तर': 69, 'सत्तर': 70,
  'एकाहत्तर': 71, 'बहात्तर': 72, 'त्र्याहत्तर': 73, 'चौऱ्याहत्तर': 74, 'पंच्याहत्तर': 75,
  'शहात्तर': 76, 'सत्याहत्तर': 77, 'अठ्ठ्याहत्तर': 78, 'एकोणऐंशी': 79, 'ऐंशी': 80,
  'एक्याऐंशी': 81, 'ब्याऐंशी': 82, 'त्र्याऐंशी': 83, 'चौऱ्याऐंशी': 84, 'पंच्याऐंशी': 85,
  'शहाऐंशी': 86, 'सत्याऐंशी': 87, 'अठ्ठ्याऐंशी': 88, 'एकोणनव्वद': 89, 'नव्वद': 90,
  'एक्याण्णव': 91, 'ब्याण्णव': 92, 'त्र्याण्णव': 93, 'चौऱ्याण्णव': 94, 'पंच्याण्णव': 95,
  'शहाण्णव': 96, 'सत्याण्णव': 97, 'अठ्ठ्याण्णव': 98, 'नव्व्याण्णव': 99,
};

/**
 * Converts Western digits ('50') to Devanagari numerals ('५०')
 */
export function toDevanagariNumerals(num: number | string): string {
  const str = String(num);
  return str.replace(/[0-9]/g, (digit) => WESTERN_TO_DEVANAGARI_MAP[digit] || digit);
}

/**
 * Converts Devanagari numerals ('५०') to Western digits ('50')
 */
export function convertDevanagariNumeralsToWestern(input: string): string {
  return input.replace(/[०-९]/g, (char) => DEVANAGARI_DIGIT_MAP[char] || char);
}

/**
 * Parses Marathi spoken speech or Devanagari numerals into a valid integer.
 * Examples:
 *  - "५०" -> 50
 *  - "दोनशे वीस" -> 220
 *  - "दीडशे" -> 150
 *  - "अडीचशे" -> 250
 *  - "पाचशे पन्नास" -> 550
 *  - "रुपये ५००" -> 500
 */
export function marathiSpeechToNumber(transcript: string): number | null {
  if (!transcript) return null;
  const cleaned = transcript.trim().toLowerCase();

  // 1. Direct Regex check for Devanagari numerals: [०-९]
  const devanagariDigitRegex = /[०-९]+/g;
  const devanagariMatch = cleaned.match(devanagariDigitRegex);
  if (devanagariMatch) {
    const westernized = convertDevanagariNumeralsToWestern(devanagariMatch[0]);
    const parsed = parseInt(westernized, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }

  // 2. Direct Regex check for Western numerals (often produced by keyboards or speech-to-text engines)
  const westernDigitMatch = cleaned.match(/\d+/);
  if (westernDigitMatch) {
    const parsed = parseInt(westernDigitMatch[0], 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }

  // 3. Check exact match for standalone colloquial terms
  for (const [term, val] of Object.entries(COLLOQUIAL_TERMS)) {
    const regex = new RegExp(`(^|\\s)${term}(\\s|$)`, 'i');
    if (regex.test(cleaned)) {
      return val;
    }
  }

  // 4. Token-based compound calculation (उदा. "दोनशे वीस" -> 200 + 20 = 220)
  const tokens = cleaned.split(/[\s,.-]+/);
  let total = 0;
  let hasValidToken = false;

  for (const token of tokens) {
    if (HUNDREDS_MAP[token]) {
      total += HUNDREDS_MAP[token];
      hasValidToken = true;
    } else if (BASE_NUMBERS[token]) {
      total += BASE_NUMBERS[token];
      hasValidToken = true;
    } else if (COLLOQUIAL_TERMS[token]) {
      total += COLLOQUIAL_TERMS[token];
      hasValidToken = true;
    }
  }

  if (hasValidToken && total > 0) {
    return total;
  }

  // 5. Basic unit match in cleaned string if single word
  for (const [word, val] of Object.entries(BASE_NUMBERS)) {
    if (cleaned.includes(word)) {
      return val;
    }
  }

  return null;
}

/**
 * Normalizes confirmation response (Spoken "हो" vs "नाही")
 */
export function normalizeConfirmationIntent(transcript: string): 'CONFIRMED' | 'REJECTED' | 'UNKNOWN' {
  const normalized = transcript.trim().toLowerCase();
  const affirmativeTriggers = [
    'हो', 'बरोबर', 'होय', 'करा', 'बरोबर आहे', 'हो चालेल',
    'yes', 'ho', 'barobar', 'chalel', 'tik', 'confirm', 'save'
  ];
  const negativeTriggers = [
    'नाही', 'नाय', 'नको', 'चूक', 'थांबा', 'पुन्हा सांगा',
    'no', 'nahi', 'parat', 'cancel', 'reject', 'thamba'
  ];

  if (affirmativeTriggers.some(trigger => normalized.includes(trigger))) {
    return 'CONFIRMED';
  }
  if (negativeTriggers.some(trigger => normalized.includes(trigger))) {
    return 'REJECTED';
  }
  return 'UNKNOWN';
}
