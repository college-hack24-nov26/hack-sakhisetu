import { Product } from '../types';

// Product photos are stored locally so the marketplace also works on slow mobile connections.
const createPickleJarSvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fff8f0"/>
      <stop offset="100%" stop-color="#f0e2d0"/>
    </radialGradient>
    <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e8f4f8" stop-opacity="0.8"/>
      <stop offset="20%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="80%" stop-color="#d0e8f0" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#b0d4e0" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="mustardOil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="40%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#92400e"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#5a2d0c" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <!-- Charpoy wooden weave mat background -->
  <line x1="20" y1="260" x2="380" y2="260" stroke="#d5be9f" stroke-width="3" stroke-dasharray="8 6"/>
  <ellipse cx="200" cy="265" rx="90" ry="14" fill="#69391b" opacity="0.2"/>

  <!-- Glass Jar Body -->
  <g filter="url(#shadow)">
    <!-- Jar base contents (Mustard oil & mango pickle pieces with spices) -->
    <path d="M140,110 L260,110 C265,110 270,115 270,125 L266,245 C266,255 258,260 248,260 L152,260 C142,260 134,255 134,245 L130,125 C130,115 135,110 140,110 Z" fill="url(#mustardOil)"/>
    
    <!-- Authentic mango pickle chunks & fenugreek/mustard seeds -->
    <circle cx="165" cy="180" r="14" fill="#78350f" opacity="0.9"/>
    <circle cx="230" cy="195" r="16" fill="#854d0e" opacity="0.95"/>
    <circle cx="195" cy="150" r="12" fill="#713f12"/>
    <circle cx="185" cy="225" r="15" fill="#78350f"/>
    <circle cx="225" cy="140" r="10" fill="#92400e"/>
    <!-- Mustard seeds floating -->
    <circle cx="160" cy="140" r="2.5" fill="#fef08a"/>
    <circle cx="210" cy="175" r="2.5" fill="#fef08a"/>
    <circle cx="178" cy="205" r="2" fill="#fef08a"/>
    <circle cx="240" cy="220" r="2.5" fill="#fef08a"/>
    <circle cx="150" cy="230" r="2.5" fill="#fef08a"/>

    <!-- Glass reflections -->
    <path d="M140,110 L260,110 C265,110 270,115 270,125 L266,245 C266,255 258,260 248,260 L152,260 C142,260 134,255 134,245 L130,125 C130,115 135,110 140,110 Z" fill="url(#jarGlass)"/>
    <path d="M142,125 L146,245" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.6"/>

    <!-- Real Hand-tied Cloth Lid (Traditional Rural Style) -->
    <ellipse cx="200" cy="100" rx="65" ry="16" fill="#80141c"/>
    <path d="M135,100 Q200,82 265,100 L275,115 Q200,128 125,115 Z" fill="#991b1b"/>
    <!-- Jute rope tied around jar neck -->
    <ellipse cx="200" cy="115" rx="58" ry="8" fill="none" stroke="#d97706" stroke-width="5"/>
    <line x1="200" y1="120" x2="215" y2="145" stroke="#d97706" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="205" y1="120" x2="225" y2="140" stroke="#d97706" stroke-width="3" stroke-linecap="round"/>

    <!-- Authentic Paper Label (Savitribai Phule SHG) -->
    <rect x="148" y="160" width="104" height="64" rx="4" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>
    <text x="200" y="180" font-family="Noto Sans Devanagari, sans-serif" font-size="11" font-weight="bold" fill="#80141c" text-anchor="middle">आंब्याचे लोणचे</text>
    <text x="200" y="196" font-family="Noto Sans Devanagari, sans-serif" font-size="8.5" fill="#78350f" text-anchor="middle">सावित्रीबाई फुले बचत गट</text>
    <text x="200" y="210" font-family="sans-serif" font-size="8" font-weight="bold" fill="#14532d" text-anchor="middle">१००% घरगुती मोहरी तेल</text>
  </g>
</svg>
`)}`;

export const createLemonPickleJarSvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgLemon" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="100%" stop-color="#fef3c7"/>
    </radialGradient>
    <linearGradient id="lemonOil" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#eab308"/>
      <stop offset="35%" stop-color="#ca8a04"/>
      <stop offset="75%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#9a3412"/>
    </linearGradient>
    <linearGradient id="lemonGlass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f0fdf4" stop-opacity="0.85"/>
      <stop offset="22%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="78%" stop-color="#e2e8f0" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.85"/>
    </linearGradient>
    <filter id="shadowLemon" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#854d0e" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgLemon)"/>
  
  <!-- Charpoy wooden weave mat background -->
  <line x1="20" y1="262" x2="380" y2="262" stroke="#d5be9f" stroke-width="3" stroke-dasharray="8 6"/>
  <ellipse cx="200" cy="265" rx="85" ry="14" fill="#78350f" opacity="0.25"/>

  <!-- Glass Jar Body with Lemon Pickle -->
  <g filter="url(#shadowLemon)">
    <!-- Oil & Spices Base -->
    <path d="M140,110 L260,110 C265,110 270,115 270,125 L266,245 C266,255 258,260 248,260 L152,260 C142,260 134,255 134,245 L130,125 C130,115 135,110 140,110 Z" fill="url(#lemonOil)"/>

    <!-- Cut Lemon Wedges & Spiced Chunks -->
    <!-- Lemon wedge 1 -->
    <path d="M155,140 Q180,135 190,160 Q165,165 155,140 Z" fill="#facc15" stroke="#a16207" stroke-width="1.2"/>
    <circle cx="170" cy="150" r="3" fill="#ca8a04"/>
    <!-- Lemon wedge 2 -->
    <path d="M210,145 Q240,140 245,170 Q220,175 210,145 Z" fill="#fef08a" stroke="#a16207" stroke-width="1.2"/>
    <!-- Lemon wedge 3 (lower) -->
    <path d="M165,195 Q195,190 205,225 Q175,230 165,195 Z" fill="#facc15" stroke="#a16207" stroke-width="1.2"/>
    <!-- Lemon wedge 4 -->
    <path d="M215,200 Q245,195 250,230 Q225,235 215,200 Z" fill="#fde047" stroke="#a16207" stroke-width="1.2"/>
    
    <!-- Floating Mustard & Fenugreek seeds & red chili specks -->
    <circle cx="160" cy="175" r="2.5" fill="#fef08a"/>
    <circle cx="195" cy="180" r="2" fill="#7f1d1d"/>
    <circle cx="230" cy="185" r="2.5" fill="#fef08a"/>
    <circle cx="180" cy="220" r="2" fill="#7f1d1d"/>
    <circle cx="200" cy="240" r="2.5" fill="#fef08a"/>
    <circle cx="240" cy="160" r="2" fill="#7f1d1d"/>

    <!-- Glass Reflection Highlights -->
    <path d="M140,110 L260,110 C265,110 270,115 270,125 L266,245 C266,255 258,260 248,260 L152,260 C142,260 134,255 134,245 L130,125 C130,115 135,110 140,110 Z" fill="url(#lemonGlass)"/>
    <path d="M142,125 L146,245" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" opacity="0.65"/>
    <path d="M256,130 L253,240" stroke="#ffffff" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

    <!-- Traditional Cloth Tied Lid (Yellow Muslin Cloth for Lemon) -->
    <ellipse cx="200" cy="100" rx="65" ry="16" fill="#f59e0b"/>
    <path d="M135,100 Q200,82 265,100 L275,115 Q200,128 125,115 Z" fill="#d97706"/>
    <!-- Jute rope around neck -->
    <ellipse cx="200" cy="115" rx="58" ry="8" fill="none" stroke="#78350f" stroke-width="5"/>
    <line x1="200" y1="120" x2="215" y2="145" stroke="#78350f" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="205" y1="120" x2="225" y2="140" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>

    <!-- Authentic Paper Label (लिंबाचे लोणचे / Lemon Pickle) -->
    <rect x="148" y="160" width="104" height="66" rx="4" fill="#fffbeb" stroke="#b45309" stroke-width="1.5"/>
    <text x="200" y="180" font-family="Noto Sans Devanagari, sans-serif" font-size="11.5" font-weight="900" fill="#80141c" text-anchor="middle">लिंबाचे लोणचे</text>
    <text x="200" y="196" font-family="Noto Sans Devanagari, sans-serif" font-size="8.5" font-weight="bold" fill="#78350f" text-anchor="middle">सावित्रीबाई फुले बचत गट</text>
    <text x="200" y="211" font-family="Noto Sans Devanagari, sans-serif" font-size="7.5" font-weight="bold" fill="#14532d" text-anchor="middle">१००% गावरान लिंबू व मसाले</text>
  </g>
</svg>
`)}`;

const createPapadSvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgP" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="100%" stop-color="#fef3c7"/>
    </radialGradient>
    <radialGradient id="papadGrad" cx="45%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="60%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </radialGradient>
    <filter id="papadShadow">
      <feDropShadow dx="4" dy="10" stdDeviation="8" flood-color="#854d0e" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgP)"/>
  
  <!-- Bamboo wicker tray / Supa -->
  <ellipse cx="200" cy="180" rx="150" ry="85" fill="#d97706" opacity="0.3"/>
  <ellipse cx="200" cy="180" rx="145" ry="80" fill="none" stroke="#b45309" stroke-width="6" stroke-dasharray="10 8"/>

  <!-- Stack of handmade urad papads -->
  <g filter="url(#papadShadow)">
    <!-- Bottom papad -->
    <ellipse cx="180" cy="185" rx="75" ry="50" fill="url(#papadGrad)" opacity="0.9"/>
    <!-- Middle papad -->
    <ellipse cx="220" cy="175" rx="76" ry="52" fill="url(#papadGrad)" opacity="0.95"/>
    <!-- Top papad -->
    <ellipse cx="195" cy="160" rx="80" ry="54" fill="url(#papadGrad)"/>
    <!-- Black pepper & cumin specks on top papad -->
    <circle cx="160" cy="150" r="3" fill="#1c1917"/>
    <circle cx="225" cy="145" r="2.5" fill="#1c1917"/>
    <circle cx="190" cy="170" r="3.2" fill="#1c1917"/>
    <circle cx="210" cy="180" r="2.8" fill="#1c1917"/>
    <circle cx="175" cy="135" r="2" fill="#1c1917"/>
    <circle cx="240" cy="165" r="2.5" fill="#1c1917"/>
    <circle cx="150" cy="175" r="2.2" fill="#1c1917"/>
    <circle cx="185" cy="185" r="2.6" fill="#1c1917"/>
    <!-- Hand pressed irregular edges -->
    <ellipse cx="195" cy="160" rx="80" ry="54" fill="none" stroke="#ca8a04" stroke-width="2" stroke-dasharray="14 3"/>
  </g>

  <!-- SHG Label Tag -->
  <rect x="140" y="240" width="120" height="34" rx="6" fill="#ffffff" stroke="#b45309" stroke-width="1.5"/>
  <text x="200" y="256" font-family="Noto Sans Devanagari, sans-serif" font-size="10" font-weight="bold" fill="#80141c" text-anchor="middle">खमंग उडीद पापड</text>
  <text x="200" y="268" font-family="Noto Sans Devanagari, sans-serif" font-size="8" fill="#78350f" text-anchor="middle">महालक्ष्मी महिला बचत गट</text>
</svg>
`)}`;

const createTurmericSvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgT" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="100%" stop-color="#fef2f2"/>
    </radialGradient>
    <linearGradient id="haldiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#facc15"/>
      <stop offset="40%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#ca8a04"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgT)"/>

  <!-- Clay bowl containing organic turmeric powder -->
  <ellipse cx="200" cy="245" rx="80" ry="12" fill="#78350f" opacity="0.2"/>
  <!-- Terracotta bowl base -->
  <path d="M120,180 C120,240 280,240 280,180 Z" fill="#9a3412"/>
  <ellipse cx="200" cy="180" rx="80" ry="24" fill="#7c2d12"/>

  <!-- Heap of vibrant turmeric powder (Haldi) -->
  <ellipse cx="200" cy="175" rx="72" ry="22" fill="url(#haldiGrad)"/>
  <path d="M140,175 Q200,105 260,175 Z" fill="url(#haldiGrad)"/>
  <ellipse cx="200" cy="120" rx="14" ry="7" fill="#fde047"/>

  <!-- Whole dried turmeric rhizomes / kadi haldi pieces beside bowl -->
  <ellipse cx="110" cy="240" rx="22" ry="9" transform="rotate(-15 110 240)" fill="#a16207"/>
  <ellipse cx="100" cy="245" rx="16" ry="7" transform="rotate(25 100 245)" fill="#ca8a04"/>
  <ellipse cx="295" cy="235" rx="26" ry="10" transform="rotate(30 295 235)" fill="#a16207"/>

  <!-- Authentic SHG Banner -->
  <rect x="130" y="30" width="140" height="36" rx="6" fill="#ffffff" stroke="#9a3412" stroke-width="1.5"/>
  <text x="200" y="47" font-family="Noto Sans Devanagari, sans-serif" font-size="11" font-weight="bold" fill="#80141c" text-anchor="middle">सेंद्रिय राजापुरी हळद</text>
  <text x="200" y="60" font-family="Noto Sans Devanagari, sans-serif" font-size="8" fill="#78350f" text-anchor="middle">जिजामाता महिला गट, सांगली</text>
</svg>
`)}`;

const createOilSvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgO" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fff8f0"/>
      <stop offset="100%" stop-color="#fdf4ff"/>
    </radialGradient>
    <linearGradient id="oilAmber" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ca8a04"/>
      <stop offset="45%" stop-color="#facc15"/>
      <stop offset="85%" stop-color="#eab308"/>
      <stop offset="100%" stop-color="#a16207"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgO)"/>
  <ellipse cx="200" cy="265" rx="60" ry="10" fill="#3b0764" opacity="0.15"/>

  <!-- Traditional Glass / Metal Oil Dispenser -->
  <path d="M165,110 L235,110 L245,250 C245,255 240,260 230,260 L170,260 C160,260 155,255 155,250 Z" fill="url(#oilAmber)"/>
  <!-- Bottle neck & cork -->
  <rect x="185" y="80" width="30" height="30" fill="#e2e8f0" opacity="0.8"/>
  <path d="M188,70 L212,70 L210,80 L190,80 Z" fill="#92400e"/>

  <!-- Bottle reflections -->
  <line x1="168" y1="120" x2="168" y2="245" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>

  <!-- Authentic Peanut pod illustrations around -->
  <ellipse cx="120" cy="245" rx="18" ry="9" transform="rotate(-20 120 245)" fill="#d97706"/>
  <ellipse cx="132" cy="240" rx="14" ry="8" transform="rotate(-15 132 240)" fill="#b45309"/>
  <ellipse cx="280" cy="250" rx="20" ry="10" transform="rotate(15 280 250)" fill="#d97706"/>

  <!-- Label -->
  <rect x="168" y="155" width="64" height="65" rx="3" fill="#ffffff" stroke="#ca8a04" stroke-width="1.5"/>
  <text x="200" y="175" font-family="Noto Sans Devanagari, sans-serif" font-size="9" font-weight="bold" fill="#80141c" text-anchor="middle">घाण्याचे तेल</text>
  <text x="200" y="190" font-family="Noto Sans Devanagari, sans-serif" font-size="7.5" fill="#78350f" text-anchor="middle">शुद्ध शेंगदाणा</text>
  <text x="200" y="205" font-family="sans-serif" font-size="7" font-weight="bold" fill="#14532d" text-anchor="middle">यशस्विनी बचत गट</text>
</svg>
`)}`;

const createBasketSvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgB" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fffbeb"/>
      <stop offset="100%" stop-color="#fef3c7"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgB)"/>
  <ellipse cx="200" cy="255" rx="90" ry="15" fill="#78350f" opacity="0.2"/>

  <!-- Handwoven Bamboo Basket -->
  <path d="M120,130 C125,230 275,230 280,130 Z" fill="#d97706"/>
  <!-- Basket Rim -->
  <ellipse cx="200" cy="130" rx="80" ry="20" fill="#b45309"/>
  <ellipse cx="200" cy="130" rx="74" ry="16" fill="#78350f"/>
  
  <!-- Bamboo cross weave lattice -->
  <path d="M135,145 Q200,220 265,145" stroke="#fef08a" stroke-width="2.5" fill="none"/>
  <path d="M145,160 Q200,230 255,160" stroke="#fef08a" stroke-width="2.5" fill="none"/>
  <path d="M155,180 Q200,235 245,180" stroke="#fef08a" stroke-width="2.5" fill="none"/>
  <!-- Vertical ribs -->
  <line x1="160" y1="145" x2="175" y2="220" stroke="#92400e" stroke-width="2"/>
  <line x1="200" y1="150" x2="200" y2="225" stroke="#92400e" stroke-width="2"/>
  <line x1="240" y1="145" x2="225" y2="220" stroke="#92400e" stroke-width="2"/>

  <!-- Handle -->
  <path d="M125,130 Q200,40 275,130" fill="none" stroke="#92400e" stroke-width="7"/>
  <path d="M125,130 Q200,40 275,130" fill="none" stroke="#fef08a" stroke-width="2.5" stroke-dasharray="6 4"/>

  <!-- Label -->
  <rect x="140" y="250" width="120" height="30" rx="4" fill="#ffffff" stroke="#78350f" stroke-width="1.5"/>
  <text x="200" y="268" font-family="Noto Sans Devanagari, sans-serif" font-size="9" font-weight="bold" fill="#80141c" text-anchor="middle">हस्तकला बांबू टोपली</text>
</svg>
`)}`;

const createJaggerySvg = () => `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <radialGradient id="bgJ" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#fff8f0"/>
      <stop offset="100%" stop-color="#ffedd5"/>
    </radialGradient>
    <linearGradient id="gulGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="50%" stop-color="#78350f"/>
      <stop offset="100%" stop-color="#451a03"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bgJ)"/>
  <ellipse cx="200" cy="255" rx="85" ry="14" fill="#451a03" opacity="0.25"/>

  <!-- Golden Brown Pure Jaggery Bucket Mold (Kolhapuri Gul Dhep) -->
  <path d="M150,110 L250,110 L270,240 C270,248 260,252 250,252 L150,252 C140,252 130,248 130,240 Z" fill="url(#gulGrad)"/>
  <ellipse cx="200" cy="110" rx="50" ry="14" fill="#92400e"/>
  
  <!-- Jaggery texture cracks & sugarcane stalk in background -->
  <line x1="90" y1="260" x2="130" y2="70" stroke="#65a30d" stroke-width="8" stroke-linecap="round"/>
  <line x1="95" y1="210" x2="120" y2="210" stroke="#365314" stroke-width="3"/>
  <line x1="105" y1="150" x2="125" y2="150" stroke="#365314" stroke-width="3"/>

  <!-- Label -->
  <rect x="145" y="160" width="110" height="50" rx="4" fill="#fffbeb" stroke="#78350f" stroke-width="1.5"/>
  <text x="200" y="180" font-family="Noto Sans Devanagari, sans-serif" font-size="10" font-weight="bold" fill="#80141c" text-anchor="middle">सेंद्रिय कोल्हापुरी गूळ</text>
  <text x="200" y="196" font-family="Noto Sans Devanagari, sans-serif" font-size="8" fill="#78350f" text-anchor="middle">क्रांती महिला बचत गट, कऱ्हाड</text>
</svg>
`)}`;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    nameMr: 'तिखट गावठी आंब्याचे लोणचे',
    nameEn: 'Spicy Country Mango Pickle',
    price: 180,
    unitMr: '१ काचेची बरणी (५०० ग्रॅम)',
    unitEn: '1 Glass Jar (500g)',
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
    shgNameMr: 'सावित्रीबाई फुले महिला बचत गट',
    shgNameEn: 'Savitribai Phule Women SHG',
    locationMr: 'वडूज, जि. सातारा',
    locationEn: 'Vaduj, Satara',
    descriptionMr: 'स्थानिक गावठी कैरी, शुद्ध मोहरीचे तेल, मेथी दाणे आणि घरगुती मसाल्यांपासून तयार केलेले अस्सल सातारी लोणचे. वर्षभर टिकणारे व चवदार.',
    descriptionEn: 'Authentic Satara-style raw mango pickle prepared in cold-pressed mustard oil, fenugreek, and grandma’s secret spice blend.',
    imageUrl: '/assets/aistudio/image_eda5c8c1.png',
    estimatedMarketPrice: 200,
    apmcRange: { min: 160, max: 220 },
    salesCount: 142,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'सावित्रीबाई फुले बचत गटाचे अस्सल गावठी आंब्याचे लोणचे. किंमत एकशे ऐंशी रुपये. शुद्ध मोहरीच्या तेलात बनवलेले, काचेच्या बरणीमध्ये पॅक केलेले.',
    dateAdded: '2026-10-15',
  },
  {
    id: 'prod-2',
    nameMr: 'घरगुती खमंग उडीद पापड',
    nameEn: 'Handmade Crunchy Urad Dal Papad',
    price: 120,
    unitMr: '१ पॅकेट (२५० ग्रॅम - २० पापड)',
    unitEn: '1 Pack (250g - 20 Papads)',
    categoryMr: 'खाद्यपदार्थ व पापड',
    categoryEn: 'Snacks & Papads',
    shgNameMr: 'महालक्ष्मी महिला बचत गट',
    shgNameEn: 'Mahalakshmi Women SHG',
    locationMr: 'इचलकरंजी, जि. कोल्हापूर',
    locationEn: 'Ichalkaranji, Kolhapur',
    descriptionMr: 'उच्च दर्जाची काळी उडीद डाळ, हिंग, जिरे आणि कुटलेली काळी मिरी घालून हाताने लाटलेले व उन्हात वाळवलेले पारंपरिक पापड.',
    descriptionEn: 'Crispy sun-dried urad dal papads crafted with stone-ground black pepper, asafoetida, and cumin seeds by Kolhapur artisans.',
    imageUrl: '/assets/aistudio/image_9f31c43c.png',
    estimatedMarketPrice: 135,
    apmcRange: { min: 110, max: 140 },
    salesCount: 289,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'महालक्ष्मी महिला बचत गटाचे घरगुती खमंग उडीद पापड. किंमत एकशे वीस रुपये. उन्हात वाळवलेले आणि काळ्या मिरीची चव असलेले.',
    dateAdded: '2026-10-20',
  },
  {
    id: 'prod-mixed-pickle',
    nameMr: 'पारंपारिक गावरान मिश्र लोणचे',
    nameEn: 'Traditional Handcrafted Mixed Pickle',
    price: 175,
    unitMr: '१ बरणी (७५० ग्रॅम)',
    unitEn: '1 Jar (750g)',
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
    shgNameMr: 'जय भवानी महिला बचत गट',
    shgNameEn: 'Jai Bhavani Women SHG',
    locationMr: 'सातारा, महाराष्ट्र',
    locationEn: 'Satara, Maharashtra',
    descriptionMr: 'अस्सल ग्रामीण चूल आणि पारंपारिक पद्धतीचा वापर करून महिलांनी स्वतः हाताने भरलेली मिश्र लोणच्याची बरणी.',
    descriptionEn: 'Authentic mixed vegetable pickle lovingly made in rural SHG kitchens and bottled in glass jars.',
    imageUrl: '/assets/aistudio/image_6fcaa828.png',
    estimatedMarketPrice: 195,
    apmcRange: { min: 150, max: 210 },
    salesCount: 88,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'जय भवानी महिला बचत गटाचे पारंपारिक मिश्र लोणचे. किंमत एकशे पंच्याहत्तर रुपये.',
    dateAdded: '2026-11-01',
  },
  {
    id: 'prod-clamp-pickle',
    nameMr: 'काचेच्या क्लिप बरणीतील लोणचे',
    nameEn: 'Hermetic Glass Jar Pickle',
    price: 210,
    unitMr: '१ क्लिप बरणी (१ किलो)',
    unitEn: '1 Clamp Jar (1 kg)',
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
    shgNameMr: 'जिजाऊ महिला बचत गट',
    shgNameEn: 'Jijau Women SHG',
    locationMr: 'पुणे, महाराष्ट्र',
    locationEn: 'Pune, Maharashtra',
    descriptionMr: 'हवाबंद काचेच्या क्लिप बरणीमध्ये नैसर्गिकरित्या मुरवलेले चवदार पारंपारिक लोणचे.',
    descriptionEn: 'Naturally cured traditional pickle preserved in hermetic airtight glass clamp jar.',
    imageUrl: '/assets/aistudio/image_e1a29b4a.png',
    estimatedMarketPrice: 240,
    apmcRange: { min: 180, max: 250 },
    salesCount: 64,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'जिजाऊ महिला बचत गटाचे क्लिप बरणीतील लोणचे. किंमत दोनशे दहा रुपये.',
    dateAdded: '2026-11-02',
  },
  {
    id: 'prod-3',
    nameMr: 'सेंद्रिय सुगंधी राजापुरी हळद पावडर',
    nameEn: 'Organic Rajapuri Turmeric Powder',
    price: 150,
    unitMr: '५०० ग्रॅम कापडी पिशवी',
    unitEn: '500g Cloth Pouch',
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
    shgNameMr: 'जिजामाता महिला शेतकरी गट',
    shgNameEn: 'Jijamata Women Farmer Group',
    locationMr: 'इस्लामपूर, जि. सांगली',
    locationEn: 'Islampur, Sangli',
    descriptionMr: 'सांगलीची प्रसिद्ध राजापुरी हळद. कसलीही भेसळ नाही. उच्च कर्क्युमिन (Curcumin > 5%) आणि गडद नैसर्गिक पिवळा रंग.',
    descriptionEn: 'Famous Sangli Rajapuri turmeric powder directly harvested from pesticide-free farms with verified high curcumin content.',
    imageUrl: '/products/turmeric.jpg',
    estimatedMarketPrice: 165,
    apmcRange: { min: 140, max: 180 },
    salesCount: 215,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'जिजामाता शेतकरी गटाची सेंद्रिय राजापुरी हळद. किंमत दीडशे रुपये. पाचशे ग्रॅमचे पॅकेट, उच्च कर्क्युमिन युक्त नैसर्गिक औषधी हळद.',
    dateAdded: '2026-10-25',
  },
  {
    id: 'prod-4',
    nameMr: 'लाकडी घाण्याचे शुद्ध शेंगदाणा तेल',
    nameEn: 'Wood-Pressed Groundnut Oil',
    price: 260,
    unitMr: '१ लिटर बाटली',
    unitEn: '1 Liter Bottle',
    categoryMr: 'तेल व तूप',
    categoryEn: 'Oils & Ghee',
    shgNameMr: 'यशस्विनी महिला बचत गट',
    shgNameEn: 'Yashaswini Women SHG',
    locationMr: 'बारामती, जि. पुणे',
    locationEn: 'Baramati, Pune',
    descriptionMr: 'लाकडी घाण्यावर मंद गतीने काढलेले अस्सल शेंगदाणा तेल. कुठल्याही केमिकल किंवा उष्णतेचा वापर नाही. नैसर्गिक सुगंध व पोषणमूल्ये शाबूत.',
    descriptionEn: 'Cold pressed in traditional wooden Ghani at slow RPMs to preserve rich peanut aroma and natural antioxidants.',
    imageUrl: '/products/groundnut-oil.jpg',
    estimatedMarketPrice: 280,
    apmcRange: { min: 250, max: 290 },
    salesCount: 178,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'यशस्विनी बचत गटाचे लाकडी घाण्याचे शुद्ध शेंगदाणा तेल. किंमत दोनशे साठ रुपये. एक लिटर बाटली, न तापवलेले अस्सल तेल.',
    dateAdded: '2026-10-28',
  },
  {
    id: 'prod-5',
    nameMr: 'हाताने विणलेली नैसर्गिक बांबू टोपली',
    nameEn: 'Handwoven Natural Bamboo Basket',
    price: 220,
    unitMr: '१ नग (मध्यम आकार)',
    unitEn: '1 Piece (Medium)',
    categoryMr: 'हस्तकला व गृहसजावट',
    categoryEn: 'Handicrafts & Decor',
    shgNameMr: 'एकलव्य आदिवासी महिला गट',
    shgNameEn: 'Eklavya Adivasi Women Group',
    locationMr: 'धडगाव, जि. नंदुरबार',
    locationEn: 'Dhadgaon, Nandurbar',
    descriptionMr: 'नंदुरबारच्या जंगलातील बांबूपासून आदिवासी महिलांनी स्वतःच्या हाताने विणलेली मजबूत, पर्यावरणपूरक आणि सुंदर टोपली.',
    descriptionEn: 'Durable, eco-friendly multipurpose storage basket woven from wild bamboo strips by tribal women artisans in Nandurbar.',
    imageUrl: '/studio_bamboo_basket.png',
    estimatedMarketPrice: 250,
    apmcRange: { min: 200, max: 270 },
    salesCount: 94,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'एकलव्य आदिवासी महिला गटाची हाताने विणलेली बांबूची टोपली. किंमत दोनशे वीस रुपये. मजबूत आणि पर्यावरणपूरक भाजी किंवा फळे ठेवण्यासाठी उत्तम.',
    dateAdded: '2026-11-01',
  },
  {
    id: 'prod-6',
    nameMr: 'सेंद्रिय कोल्हापुरी गूळ ढेप',
    nameEn: 'Organic Kolhapuri Jaggery Block',
    price: 80,
    unitMr: '१ किलो ढेप',
    unitEn: '1 kg Block',
    categoryMr: 'खाद्यपदार्थ व पापड',
    categoryEn: 'Snacks & Papads',
    shgNameMr: 'क्रांती महिला बचत गट',
    shgNameEn: 'Kranti Women SHG',
    locationMr: 'कऱ्हाड, जि. सातारा',
    locationEn: 'Karad, Satara',
    descriptionMr: 'ऊस रसापासून रासायनिक पावडर न वापरता चुलीवर उकळून तयार केलेला अस्सल गडद तपकिरी गूळ. लोह आणि खनिजांनी परिपूर्ण.',
    descriptionEn: 'Pure unrefined chemical-free jaggery block naturally boiled in traditional open pans, rich in organic minerals and iron.',
    imageUrl: '/products/jaggery.jpg',
    estimatedMarketPrice: 90,
    apmcRange: { min: 75, max: 95 },
    salesCount: 310,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: 'क्रांती महिला बचत गटाचा सेंद्रिय कोल्हापुरी गूळ. किंमत ऐंशी रुपये प्रति किलो. केमिकल विरहित पारंपरिक पद्धतीने चुलीवर बनवलेला गूळ.',
    dateAdded: '2026-11-02',
  },
];

export interface SpokenItemMapping {
  imageUrl: string;
  nameMr: string;
  nameEn: string;
  categoryMr: string;
  categoryEn: string;
  unitMr: string;
  unitEn: string;
  descriptionMr: string;
  descriptionEn: string;
}

/**
 * Instantly maps spoken Marathi item names to authentic real photos from our verified SHG dataset.
 * e.g., 'लिंबाचे लोणचे' -> Glass jar with lemon pickle & mustard oil
 */
export function mapSpokenItemToRealPhoto(spokenItem: string): SpokenItemMapping {
  const normalized = spokenItem.trim().toLowerCase();

  // 1. Lemon Pickle (लिंबाचे लोणचे)
  if (normalized.includes('लिंब') || normalized.includes('लिंबू') || normalized.includes('lemon')) {
    return {
      imageUrl: '/products/lemon-pickle.jpg',
      nameMr: 'गावठी लिंबाचे लोणचे',
      nameEn: 'Country Lemon Pickle in Glass Jar',
      categoryMr: 'लोणचे व मसाले',
      categoryEn: 'Pickles & Spices',
      unitMr: '१ काचेची बरणी (२५० ग्रॅम)',
      unitEn: '1 Glass Jar (250g)',
      descriptionMr: 'अस्सल गावरान कागदी लिंबू, मोहरी डाळ, मेथी दाणे आणि शुद्ध तेलात मुरवलेले रुचकर व पाचक लोणचे.',
      descriptionEn: 'Authentic Indian country lemons marinated in mustard oil, fenugreek, and grandma spices.',
    };
  }

  // 2. Mango Pickle (आंब्याचे लोणचे)
  if (normalized.includes('आंब') || normalized.includes('कैरी') || normalized.includes('mango') || normalized.includes('लोणचे')) {
    return {
      imageUrl: '/assets/aistudio/image_eda5c8c1.png',
      nameMr: 'तिखट गावठी आंब्याचे लोणचे',
      nameEn: 'Spicy Mango Pickle in Glass Jar',
      categoryMr: 'लोणचे व मसाले',
      categoryEn: 'Pickles & Spices',
      unitMr: '१ काचेची बरणी (५०० ग्रॅम)',
      unitEn: '1 Glass Jar (500g)',
      descriptionMr: 'स्थानिक गावठी कैरी, शुद्ध मोहरीचे तेल आणि घरगुती मसाल्यांपासून तयार केलेले अस्सल सातारी लोणचे.',
      descriptionEn: 'Authentic Satara raw mango pickle prepared in cold-pressed mustard oil.',
    };
  }

  // 3. Papad (उडीद पापड)
  if (normalized.includes('पापड') || normalized.includes('उडीद') || normalized.includes('papad')) {
    return {
      imageUrl: '/assets/aistudio/image_9f31c43c.png',
      nameMr: 'घरगुती खमंग उडीद पापड',
      nameEn: 'Handmade Crunchy Urad Dal Papad',
      categoryMr: 'खाद्यपदार्थ व पापड',
      categoryEn: 'Snacks & Papads',
      unitMr: '१ पॅकेट (२५० ग्रॅम - २० पापड)',
      unitEn: '1 Pack (250g - 20 Papads)',
      descriptionMr: 'उच्च दर्जाची काळी उडीद डाळ, हिंग, जिरे आणि कुटलेली काळी मिरी घालून हाताने लाटलेले व उन्हात वाळवलेले पारंपरिक पापड.',
      descriptionEn: 'Crispy sun-dried urad dal papads crafted with black pepper, hing, and cumin.',
    };
  }

  // 4. Turmeric (हळद)
  if (normalized.includes('हळद') || normalized.includes('हळदी') || normalized.includes('turmeric')) {
    return {
      imageUrl: '/products/turmeric.jpg',
      nameMr: 'सेंद्रिय सुगंधी राजापुरी हळद',
      nameEn: 'Organic Rajapuri Turmeric Powder',
      categoryMr: 'लोणचे व मसाले',
      categoryEn: 'Pickles & Spices',
      unitMr: '५०० ग्रॅम कापडी पिशवी',
      unitEn: '500g Cloth Pouch',
      descriptionMr: 'सांगलीची प्रसिद्ध राजापुरी हळद. कसलीही भेसळ नाही. उच्च कर्क्युमिन (Curcumin > 5%) आणि गडद नैसर्गिक पिवळा रंग.',
      descriptionEn: 'Famous Sangli Rajapuri turmeric powder directly harvested from pesticide-free farms.',
    };
  }

  // 5. Oil (तेल / शेंगदाणा तेल)
  if (normalized.includes('तेल') || normalized.includes('शेंगदाणा') || normalized.includes('oil')) {
    return {
      imageUrl: '/products/groundnut-oil.jpg',
      nameMr: 'लाकडी घाण्याचे शुद्ध शेंगदाणा तेल',
      nameEn: 'Wood-Pressed Groundnut Oil',
      categoryMr: 'तेल व तूप',
      categoryEn: 'Oils & Ghee',
      unitMr: '१ लिटर बाटली',
      unitEn: '1 Liter Bottle',
      descriptionMr: 'लाकडी घाण्यावर मंद गतीने काढलेले अस्सल शेंगदाणा तेल. कुठल्याही केमिकल किंवा उष्णतेचा वापर नाही.',
      descriptionEn: 'Cold-pressed groundnut oil extracted in traditional wooden Ghani.',
    };
  }

  // 6. Bamboo Basket (टोपली / बांबू)
  if (normalized.includes('टोपली') || normalized.includes('बांबू') || normalized.includes('basket')) {
    return {
      imageUrl: '/studio_bamboo_basket.png',
      nameMr: 'हाताने विणलेली नैसर्गिक बांबू टोपली',
      nameEn: 'Handwoven Natural Bamboo Basket',
      categoryMr: 'हस्तकला व गृहसजावट',
      categoryEn: 'Handicrafts & Decor',
      unitMr: '१ नग (मध्यम आकार)',
      unitEn: '1 Piece (Medium)',
      descriptionMr: 'नंदुरबारच्या जंगलातील बांबूपासून आदिवासी महिलांनी स्वतःच्या हाताने विणलेली मजबूत, पर्यावरणपूरक टोपली.',
      descriptionEn: 'Durable, eco-friendly multipurpose storage basket woven from wild bamboo strips.',
    };
  }

  // 7. Jaggery (गूळ)
  if (normalized.includes('गूळ') || normalized.includes('गुळ') || normalized.includes('jaggery')) {
    return {
      imageUrl: '/products/jaggery.jpg',
      nameMr: 'सेंद्रिय कोल्हापुरी गूळ ढेप',
      nameEn: 'Organic Kolhapuri Jaggery Block',
      categoryMr: 'खाद्यपदार्थ व पापड',
      categoryEn: 'Snacks & Papads',
      unitMr: '१ किलो ढेप',
      unitEn: '1 kg Block',
      descriptionMr: 'ऊस रसापासून रासायनिक पावडर न वापरता चुलीवर उकळून तयार केलेला अस्सल गडद तपकिरी गूळ.',
      descriptionEn: 'Pure unrefined chemical-free jaggery block naturally boiled in traditional open pans.',
    };
  }

  // Default Fallback: Glass Jar with Authentic SHG Seal
  return {
    imageUrl: '/studio_mango_pickle.png',
    nameMr: spokenItem,
    nameEn: spokenItem,
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
    unitMr: '१ पॅक / बरणी',
    unitEn: '1 Pack / Jar',
    descriptionMr: 'स्थानिक महिला बचत गटाने पारंपारिक पद्धतीने बनवलेला अस्सल दर्जेदार माल.',
    descriptionEn: 'Authentic handmade rural SHG product crafted with local farm-fresh ingredients.',
  };
}
