import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Sliders,
  Upload,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Sun,
  Eye,
  Layers,
  Download,
  Info,
  Loader2,
  Volume2,
  ArrowLeft,
  Camera,
  Smartphone,
} from 'lucide-react';
import { Language, Product } from '../types';
import { VoiceHelpButton } from './VoiceHelpButton';
import { AudioService } from '../lib/audioService';
import { extractProductCutout, CutoutResult } from '../lib/backgroundRemovalService';

export interface SceneDefinition {
  id: 'white_marble' | 'soft_light_studio' | 'rustic_teakwood' | 'festive_bokeh' | 'clean_retail';
  titleMr: string;
  titleEn: string;
  descMr: string;
  descEn: string;
  tag: string;
  hasReflection: boolean;
  contactShadowColor: string;
  ambientShadowColor: string;
  shadowWidthPct: number;
  shadowHeightPx: number;
  ambientShadowBlur: number;
}

export const SCENES: SceneDefinition[] = [
  {
    id: 'white_marble',
    titleMr: 'संगमरवरी टेबल',
    titleEn: 'White Marble',
    descMr: 'पॉलिश केलेली पांढरी संगमरवर लादी आणि वस्तूचे आरशासारखे प्रतिबिंब',
    descEn: 'Polished Italian Carrara marble with realistic product reflection',
    tag: 'पॉलिश प्रतिबिंब',
    hasReflection: true,
    contactShadowColor: 'rgba(15, 23, 42, 0.88)',
    ambientShadowColor: 'rgba(30, 41, 59, 0.32)',
    shadowWidthPct: 68,
    shadowHeightPx: 7,
    ambientShadowBlur: 14,
  },
  {
    id: 'soft_light_studio',
    titleMr: 'स्टुडिओ प्रकाश',
    titleEn: 'Soft-Light Studio',
    descMr: 'मृदू विखुरलेला प्रकाश, संतुलित सावल्या आणि स्वच्छ कॅटलॉग देखावा',
    descEn: 'Diffused studio cyclorama lighting for clean commercial catalog',
    tag: 'मृदू प्रकाश',
    hasReflection: false,
    contactShadowColor: 'rgba(28, 25, 23, 0.85)',
    ambientShadowColor: 'rgba(41, 37, 36, 0.28)',
    shadowWidthPct: 74,
    shadowHeightPx: 8,
    ambientShadowBlur: 18,
  },
  {
    id: 'rustic_teakwood',
    titleMr: 'लाकडी फळी',
    titleEn: 'Rustic Teakwood',
    descMr: 'अस्सल देशी सागवानी लाकडी फळी, उबदार प्रकाश व लाकडाच्या नक्षी',
    descEn: 'Authentic warm Indian teakwood surface with rich natural grain',
    tag: 'सागवानी लाकूड',
    hasReflection: false,
    contactShadowColor: 'rgba(41, 16, 4, 0.92)',
    ambientShadowColor: 'rgba(67, 26, 7, 0.38)',
    shadowWidthPct: 76,
    shadowHeightPx: 9,
    ambientShadowBlur: 16,
  },
  {
    id: 'festive_bokeh',
    titleMr: 'सण-उत्सव',
    titleEn: 'Festive Bokeh',
    descMr: 'सणासुदीचे उबदार वातावरण, पणत्यांचा प्रकाश व सोनेरी रोषणाई',
    descEn: 'Festive celebration ambiance with warm golden bokeh orbs',
    tag: 'सण-उत्सव',
    hasReflection: false,
    contactShadowColor: 'rgba(45, 10, 10, 0.9)',
    ambientShadowColor: 'rgba(120, 53, 15, 0.45)',
    shadowWidthPct: 72,
    shadowHeightPx: 8,
    ambientShadowBlur: 20,
  },
  {
    id: 'clean_retail',
    titleMr: 'स्वच्छ रंगछटा',
    titleEn: 'Clean Retail',
    descMr: 'आधुनिक ई-कॉमर्स शेल्फ, स्वच्छ सावल्या व थेट लक्ष वेधून घेणारे',
    descEn: 'Minimalist contemporary retail pedestal with sharp key lighting',
    tag: 'ई-कॉमर्स शेल्फ',
    hasReflection: false,
    contactShadowColor: 'rgba(15, 15, 18, 0.85)',
    ambientShadowColor: 'rgba(30, 30, 36, 0.3)',
    shadowWidthPct: 70,
    shadowHeightPx: 7,
    ambientShadowBlur: 12,
  },
];

export interface StudioSampleProduct {
  id: string;
  nameMr: string;
  nameEn: string;
  shapeTagMr: string;
  shapeTagEn: string;
  imageUrl: string;
  price: number;
  categoryMr: string;
  categoryEn: string;
}

export const STUDIO_SAMPLE_PRODUCTS: StudioSampleProduct[] = [
  {
    id: 'studio-mango-pickle',
    nameMr: 'गावरान आंब्याचे लोणचे',
    nameEn: 'Spicy Mango Pickle',
    shapeTagMr: 'काचेची बरणी (Jar)',
    shapeTagEn: 'Glass Jar',
    imageUrl: '/studio_mango_pickle.png',
    price: 180,
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
  },
  {
    id: 'studio-urad-papad',
    nameMr: 'उन्हाळी उडीद पापड',
    nameEn: 'Sun-dried Urad Papad',
    shapeTagMr: 'सपाट चकती (Flat Disc)',
    shapeTagEn: 'Flat Disc',
    imageUrl: '/studio_urad_papad.png',
    price: 120,
    categoryMr: 'खाद्यपदार्थ व पापड',
    categoryEn: 'Snacks & Papads',
  },
  {
    id: 'studio-bilona-ghee',
    nameMr: 'शुद्ध गावरान बिलोना तूप',
    nameEn: 'Pure Bilona Desi Ghee',
    shapeTagMr: 'उभी बाटली (Bottle/Tall Jar)',
    shapeTagEn: 'Bottle/Tall Jar',
    imageUrl: '/studio_bilona_ghee.png',
    price: 350,
    categoryMr: 'तेल व तूप',
    categoryEn: 'Oils & Ghee',
  },
  {
    id: 'studio-bamboo-basket',
    nameMr: 'हस्तनिर्मित बांबू टोपली',
    nameEn: 'Handmade Bamboo Basket',
    shapeTagMr: 'बांबू टोपली (Craft Basket)',
    shapeTagEn: 'Craft Basket',
    imageUrl: '/studio_bamboo_basket.png',
    price: 90,
    categoryMr: 'हस्तकला व गृहसजावट',
    categoryEn: 'Handicrafts',
  },
];

export const PHONE_CAMERA_PRODUCTS: StudioSampleProduct[] = [
  {
    id: 'phone-mango-pickle',
    nameMr: 'गावरान आंब्याचे लोणचे (बरणी व चमचा)',
    nameEn: 'Country Mango Pickle (Spoon & Jar)',
    shapeTagMr: 'काचेची बरणी (Jar)',
    shapeTagEn: 'Glass Jar',
    imageUrl: '/assets/aistudio/image_eda5c8c1.png',
    price: 190,
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
  },
  {
    id: 'phone-mixed-pickle',
    nameMr: 'हाताने बनवलेले गावरान मिश्र लोणचे',
    nameEn: 'Handmade Mixed Pickle Jar',
    shapeTagMr: 'उभी बाटली (Tall Jar)',
    shapeTagEn: 'Tall Jar',
    imageUrl: '/assets/aistudio/image_6fcaa828.png',
    price: 175,
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
  },
  {
    id: 'phone-clamp-jar-pickle',
    nameMr: 'क्लिप काचेच्या बरणीतील लोणचे',
    nameEn: 'Hermetic Clamp Jar Pickle',
    shapeTagMr: 'क्लिप बरणी (Clamp Jar)',
    shapeTagEn: 'Clamp Jar',
    imageUrl: '/assets/aistudio/image_e1a29b4a.png',
    price: 210,
    categoryMr: 'लोणचे व मसाले',
    categoryEn: 'Pickles & Spices',
  },
  {
    id: 'phone-crispy-papad',
    nameMr: 'तळलेले घरगुती कुरकुरीत पापड',
    nameEn: 'Fried Crispy Homemade Papads',
    shapeTagMr: 'सपाट चकती (Flat Crisps)',
    shapeTagEn: 'Snack Plate',
    imageUrl: '/assets/aistudio/image_9f31c43c.png',
    price: 130,
    categoryMr: 'खाद्यपदार्थ व पापड',
    categoryEn: 'Snacks & Papads',
  },
];

function createStudioProduct(sample: StudioSampleProduct): Product {
  return {
    id: sample.id,
    nameMr: sample.nameMr,
    nameEn: sample.nameEn,
    price: sample.price,
    unitMr: '१ बरणी / पाकीट',
    unitEn: '1 Unit',
    categoryMr: sample.categoryMr,
    categoryEn: sample.categoryEn,
    shgNameMr: 'जय भवानी महिला बचत गट',
    shgNameEn: 'Jai Bhavani Women SHG',
    locationMr: 'सातारा, महाराष्ट्र',
    locationEn: 'Satara, Maharashtra',
    descriptionMr: `${sample.nameMr} - अस्सल घरगुती पद्धतीने तयार केलेले पारंपारिक उत्पादन.`,
    descriptionEn: `${sample.nameEn} - Authentic homemade traditional product.`,
    imageUrl: sample.imageUrl,
    imageUnenhancedUrl: sample.imageUrl,
    estimatedMarketPrice: sample.price,
    apmcRange: {
      min: Math.max(20, sample.price - 25),
      max: sample.price + 30,
    },
    salesCount: 18,
    inStock: true,
    verifiedSHG: true,
    audioDescriptionMr: sample.nameMr,
    dateAdded: '2026-11-01',
    isVoiceAdded: false,
  };
}

interface AIMagicStudioProps {
  products: Product[];
  onUseEnhancedPhoto?: (photoUrl: string) => void;
  onBack?: () => void;
  lang: Language;
}

export const AIMagicStudio: React.FC<AIMagicStudioProps> = ({
  products,
  onUseEnhancedPhoto,
  onBack,
  lang,
}) => {
  const isMarathi = lang === 'mr';
  const [photoSourceTab, setPhotoSourceTab] = useState<'samples' | 'phone'>('samples');

  const [selectedProduct, setSelectedProduct] = useState<Product>(() =>
    createStudioProduct(STUDIO_SAMPLE_PRODUCTS[0])
  );
  const [selectedScene, setSelectedScene] = useState<SceneDefinition>(SCENES[0]);
  const [cutoutData, setCutoutData] = useState<CutoutResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [progressPct, setProgressPct] = useState<number>(0);

  // Before/After Glide Slider State (0 to 100 percentage)
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Adjustments (Brightness, Contrast, Sharpness)
  const [brightness, setBrightness] = useState<number>(104);
  const [contrast, setContrast] = useState<number>(108);
  const [shadowLift, setShadowLift] = useState<number>(15);

  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Load and isolate product subject whenever selected product changes
  useEffect(() => {
    let isCancelled = false;

    async function processCutout() {
      setIsProcessing(true);
      setProgressPct(10);
      setProcessingStatus(
        isMarathi ? '@imgly/background-removal सुरू करत आहे...' : 'Extracting with @imgly/background-removal...'
      );

      try {
        const result = await extractProductCutout(selectedProduct.imageUrl, (pct, stage) => {
          if (!isCancelled) {
            setProgressPct(pct);
            setProcessingStatus(stage);
          }
        });

        if (!isCancelled) {
          setCutoutData(result);
        }
      } catch (err) {
        console.warn('Background removal error:', err);
      } finally {
        if (!isCancelled) {
          setIsProcessing(false);
          setProgressPct(100);
        }
      }
    }

    processCutout();

    return () => {
      isCancelled = true;
    };
  }, [selectedProduct, isMarathi]);

  // Handle glide drag interaction
  const updateSliderPos = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pct);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPos(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPos(e.clientX);
      }
    },
    [isDragging, updateSliderPos]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPos(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        if (e.cancelable) {
          e.preventDefault();
        }
        updateSliderPos(e.touches[0].clientX);
      }
    },
    [isDragging, updateSliderPos]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
      window.addEventListener('touchcancel', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchcancel', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        if (url) {
          const customProd: Product = {
            ...selectedProduct,
            id: `custom-${Date.now()}`,
            nameMr: file.name.split('.')[0] || 'अपलोड केलेला फोटो',
            nameEn: 'Uploaded Photo',
            imageUrl: url,
          };
          setSelectedProduct(customProd);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const speakSceneInfo = (scene: SceneDefinition) => {
    AudioService.speak({
      text: `${scene.titleMr}. ${scene.descMr}`,
      lang: 'mr-IN',
      rate: 0.88,
    });
  };

  // Render Scene Background Elements (Marble, Studio, Teakwood, Festive, Retail)
  const renderSceneBackground = (sceneId: SceneDefinition['id']) => {
    switch (sceneId) {
      case 'white_marble':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Top architectural wall */}
            <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]" />
            {/* Wall shadow gradient just above horizon line */}
            <div className="absolute inset-x-0 top-[52%] h-[10%] bg-gradient-to-b from-transparent to-stone-400/20" />
            {/* Crisp marble horizon line */}
            <div className="absolute inset-x-0 top-[62%] h-[1px] bg-stone-300 shadow-[0_1px_3px_rgba(0,0,0,0.06)]" />
            {/* Polished White Carrara Marble Floor */}
            <div className="absolute inset-x-0 top-[62%] bottom-0 bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e2e8f0]">
              {/* Marble Veins SVG pattern */}
              <svg
                className="absolute inset-0 w-full h-full opacity-35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M-50,20 Q120,45 280,15 T650,40"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                  strokeDasharray="60 30"
                />
                <path
                  d="M80,80 Q300,50 520,95 T900,60"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2.2"
                />
                <path
                  d="M200,10 Q340,70 480,30"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="0.8"
                  opacity="0.6"
                />
              </svg>
              {/* Surface specular sheen */}
              <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/70 to-transparent" />
            </div>
          </div>
        );

      case 'soft_light_studio':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Seamless Soft-Light Cyclorama Studio Wall & Floor */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fcfcfd] via-[#f1f5f9] to-[#cbd5e1]" />
            {/* Soft overhead key-light highlight spot */}
            <div className="absolute top-[15%] left-[25%] w-[50%] h-[35%] rounded-full bg-white/60 blur-3xl pointer-events-none" />
            {/* Floor Horizon transition */}
            <div className="absolute inset-x-0 top-[63%] h-[37%] bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1] opacity-60" />
          </div>
        );

      case 'rustic_teakwood':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Warm rustic plaster wall */}
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#fef3c7]/40 via-[#fde68a]/20 to-[#f5f5f4]" />
            {/* Wood Tabletop Horizon Edge */}
            <div className="absolute inset-x-0 top-[60%] h-2 bg-[#451a03] shadow-md z-10" />
            {/* Rich Teakwood Planks */}
            <div className="absolute inset-x-0 top-[60%] bottom-0 bg-[#78350f]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#92400e] via-[#78350f] to-[#451a03] opacity-90" />
              {/* Wood Grain Lines */}
              <div className="absolute inset-0 opacity-25">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full border-b border-[#fef08a]"
                    style={{ height: `${16 + i * 4}px` }}
                  />
                ))}
              </div>
              {/* Warm directional sunbeam reflection on wood */}
              <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-amber-200/30 to-transparent" />
            </div>
          </div>
        );

      case 'festive_bokeh':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Deep Royal Crimson Festive Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#991b1b]" />
            {/* Glowing Golden Bokeh Orbs */}
            <div className="absolute top-[10%] left-[15%] w-16 h-16 rounded-full bg-amber-400/40 blur-xl animate-pulse" />
            <div className="absolute top-[28%] left-[70%] w-24 h-24 rounded-full bg-yellow-400/35 blur-2xl" />
            <div className="absolute top-[45%] left-[30%] w-20 h-20 rounded-full bg-amber-300/30 blur-xl" />
            <div className="absolute top-[15%] left-[82%] w-14 h-14 rounded-full bg-amber-200/40 blur-lg" />
            <div className="absolute top-[35%] left-[8%] w-28 h-28 rounded-full bg-red-400/20 blur-2xl" />
            {/* Tabletop Brass / Silk Horizon */}
            <div className="absolute inset-x-0 top-[64%] bottom-0 bg-gradient-to-b from-[#78350f] via-[#451a03] to-[#290909]">
              <div className="absolute inset-x-0 top-0 h-1 bg-amber-400/60 shadow-[0_0_12px_#f59e0b]" />
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-amber-400/20 to-transparent" />
            </div>
          </div>
        );

      case 'clean_retail':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Architectural light off-white gallery wall */}
            <div className="absolute inset-x-0 top-0 h-[62%] bg-gradient-to-b from-[#f8fafc] to-[#ede9fe]/30" />
            {/* Clean Retail Display Horizon Line */}
            <div className="absolute inset-x-0 top-[62%] h-[2px] bg-stone-300 shadow-[0_1px_2px_rgba(0,0,0,0.08)] z-10" />
            {/* Clean Light Travertine / Pedestal Surface */}
            <div className="absolute inset-x-0 top-[62%] bottom-0 bg-gradient-to-b from-[#f5f5f4] via-[#e7e5e4] to-[#d6d3d1]">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/80 to-transparent" />
            </div>
          </div>
        );
    }
  };

  const productImgSrc = cutoutData?.url || selectedProduct.imageUrl;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header & Accessibility Guide */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-6 shadow-md">
        {onBack && (
          <div className="pb-3 mb-3 border-b border-stone-200">
            <button
              type="button"
              onClick={onBack}
              className="touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-stone-300 hover:border-stone-500 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#80141c]" />
              <span>{isMarathi ? 'मागे जा (दुकान / बाजारपेठ)' : 'Back to Marketplace'}</span>
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2.5 rounded-2xl bg-amber-100 text-amber-900 border border-amber-400">
                <Sparkles className="w-6 h-6 text-[#80141c]" />
              </span>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-stone-900">
                  {isMarathi ? 'AI मॅजिक स्टुडिओ (दृश्य देखावे)' : 'AI Magic Studio (Scene Showcase)'}
                </h1>
                <p className="text-xs md:text-sm font-semibold text-stone-600">
                  {isMarathi
                    ? '५ व्यावसायिक देखावे + अचूक संपर्क सावली + बिफोर/आफ्टर स्लायडर'
                    : '5 Authentic Scene Cards + Ground Contact Shadow + Before/After Split-Slider'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <VoiceHelpButton
              lang={lang}
              textToSpeak={
                isMarathi
                  ? 'हे AI मॅजिक स्टुडिओ आहे. पाच देखावे उपलब्ध आहेत: संगमरवरी टेबल (वस्तूच्या प्रतिबिंबासह), स्टुडिओ प्रकाश, लाकडी फळी, सण-उत्सव आणि स्वच्छ रंगछटा. स्लायडर फिरवून आधीचा आणि नंतरचा फरक तपासा.'
                  : 'Welcome to AI Magic Studio. Choose from 5 realistic scenes: White Marble with reflection, Soft-Light Studio, Rustic Teakwood, Festive Bokeh, and Clean Retail. Drag the slider to compare.'
              }
            />
          </div>
        </div>

        {/* Ethical Anti-Hallucination & Grounding Guarantee */}
        <div className="mt-4 p-4 bg-emerald-50 border-2 border-emerald-600 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-800 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-950 space-y-1">
            <span className="font-bold text-sm block">
              {isMarathi
                ? 'प्रामाणिक ग्रामीण छायाचित्र हमी (Zero Shrink / Zero Distortion Guarantee):'
                : 'Authentic Product Guarantee:'}
            </span>
            <p className="leading-relaxed font-medium">
              {isMarathi
                ? '@imgly/background-removal द्वारे पार्श्वभूमी काढून वस्तू जमिनीशी घट्ट जोडली जाते (Tight Contact Shadow). मूळ मालाचा आकार, लेबल किंवा चवदार पदार्थाची अस्सल रचना बदलली जात नाही.'
                : 'Using @imgly/background-removal, the product is placed with a real, tight ground contact shadow so it never floats in air. Native product aspect ratio, labels, and geometry are 100% preserved.'}
            </p>
          </div>
        </div>
      </div>

      {/* STEP 1: उत्पादनाचा अस्सल व्यावसायिक फोटो निवडा (Exact match to screenshot image_f5cb6d89.png) */}
      <div className="bg-white border-2 border-stone-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
            {isMarathi ? '१' : '1'}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
            {isMarathi ? 'उत्पादनाचा अस्सल व्यावसायिक फोटो निवडा' : 'Select Authentic Commercial Photo'}
          </h2>
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <span>✓</span>
            <span>{isMarathi ? 'विविध आकार (बरणी, बाटली, पापड, टोपली)' : 'Various Shapes (Jar, Bottle, Papad, Basket)'}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 pb-1">
          {/* Tab switcher: Samples vs Phone Camera Photos */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              type="button"
              onClick={() => setPhotoSourceTab('samples')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                photoSourceTab === 'samples'
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isMarathi ? 'प्रमाणित नमुने (४)' : 'Standard Samples (4)'}
            </button>
            <button
              type="button"
              onClick={() => setPhotoSourceTab('phone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all ${
                photoSourceTab === 'phone'
                  ? 'bg-white text-[#EA580C] shadow-sm border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{isMarathi ? '📱 फोन कॅमेरा फोटो (४)' : '📱 Phone Photos (4)'}</span>
            </button>
          </div>

          {/* Quick Direct Camera Snap Button for Phone */}
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-sm active:scale-95 transition-all">
            <Camera className="w-4 h-4 text-white" />
            <span>{isMarathi ? 'थेट कॅमेऱ्याने फोटो काढा' : 'Take Photo with Camera'}</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleCustomUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* 2x2 Grid matching screenshot */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
          {(photoSourceTab === 'phone' ? PHONE_CAMERA_PRODUCTS : STUDIO_SAMPLE_PRODUCTS).map((prod) => {
            const isSelected = selectedProduct.imageUrl === prod.imageUrl || selectedProduct.id === prod.id;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => {
                  setSelectedProduct(createStudioProduct(prod));
                  setCutoutData(null);
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all relative flex flex-col bg-white active:scale-[0.98] ${
                  isSelected
                    ? 'border-indigo-600 ring-4 ring-indigo-100 shadow-md'
                    : 'border-stone-200 hover:border-stone-400 shadow-xs'
                }`}
              >
                {/* Purple checkmark in top-right when selected (Matches screenshot) */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                    ✓
                  </div>
                )}

                {/* Photo container */}
                <div className="w-full aspect-square rounded-xl bg-stone-100 overflow-hidden mb-2.5 border border-stone-200">
                  <img
                    src={prod.imageUrl}
                    alt={prod.nameMr}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <span className="text-xs sm:text-sm font-black text-stone-900 leading-tight block truncate">
                  {isMarathi ? prod.nameMr : prod.nameEn}
                </span>

                {/* Shape tag */}
                <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg">
                    {isMarathi ? prod.shapeTagMr : prod.shapeTagEn}
                  </span>
                  {photoSourceTab === 'phone' && (
                    <span className="text-[9.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md">
                      फोन फोटो
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 SCENE CARDS SELECTOR (Horizontal Scrollable Grid) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-stone-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#80141c]" />
            <span>{isMarathi ? '५ व्यावसायिक देखावे (Scene Cards):' : '5 Scene Cards:'}</span>
          </h2>
          <span className="text-xs font-bold text-stone-500">
            {isMarathi ? 'निवडलेला देखावा: ' : 'Active: '}
            <span className="text-[#80141c] font-black">
              {isMarathi ? selectedScene.titleMr : selectedScene.titleEn}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SCENES.map((scene) => {
            const isSelected = selectedScene.id === scene.id;
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => setSelectedScene(scene)}
                className={`touch-target relative p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between overflow-hidden group ${
                  isSelected
                    ? 'border-[#80141c] bg-amber-50 shadow-md ring-2 ring-[#80141c]/30'
                    : 'border-stone-300 bg-white hover:border-stone-400 hover:shadow-sm'
                }`}
              >
                {/* Scene Mini Visual Preview */}
                <div className="relative w-full h-16 rounded-xl overflow-hidden mb-2 border border-stone-200">
                  {renderSceneBackground(scene.id)}
                  {/* Mini thumbnail silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-8 h-10 rounded-sm bg-stone-900/40 backdrop-blur-[1px] border border-white/40 shadow-sm"
                      style={{
                        boxShadow: `0 8px 10px ${scene.contactShadowColor}`,
                      }}
                    />
                  </div>
                </div>

                {/* Scene Name & Subtitle */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs sm:text-sm text-stone-900 leading-snug">
                      {isMarathi ? scene.titleMr : scene.titleEn}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSceneInfo(scene);
                      }}
                      className="p-1 text-stone-400 hover:text-amber-800"
                      title="माहिती ऐका"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] text-stone-500 line-clamp-1 mt-0.5 font-medium">
                    {isMarathi ? scene.descMr : scene.descEn}
                  </span>
                </div>

                {/* Badge Tag */}
                <div className="mt-2 pt-1 border-t border-stone-200/60 flex items-center justify-between">
                  <span
                    className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#80141c] text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {isMarathi ? scene.tag : scene.titleEn}
                  </span>
                  {scene.hasReflection && (
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1 rounded">
                      {isMarathi ? 'प्रतिबिंब' : 'Mirror'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN VIEWPORT: INTERACTIVE BEFORE/AFTER SPLIT-SLIDER */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-lg space-y-4">
        {/* Viewport Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-stone-600 pb-2 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-stone-800" />
            <span className="text-stone-900 font-black text-sm">
              {isMarathi ? 'बिफोर / आफ्टर स्लायडर' : 'Before / After Split-Slider'}
            </span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500 font-normal">
              {isMarathi ? 'रेषा डावीकडे-उजवीकडे सरकवा' : 'Glide divider across image'}
            </span>
          </div>

          {/* Quick Preset Buttons (25% | 50% | 75% | 100%) */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-stone-500">{isMarathi ? 'दृश्य:' : 'View:'}</span>
            {[
              { label: '०% आधी', pct: 0 },
              { label: '५०% मध्य', pct: 50 },
              { label: '१००% देखावा', pct: 100 },
            ].map((preset) => (
              <button
                key={preset.pct}
                type="button"
                onClick={() => setSliderPosition(preset.pct)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                  sliderPosition === preset.pct
                    ? 'bg-[#80141c] text-white border-[#80141c]'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Processing State Banner */}
        {isProcessing && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between text-xs text-amber-900 font-bold">
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-amber-700 animate-spin" />
              <span>{processingStatus || (isMarathi ? 'प्रक्रिया सुरू आहे...' : 'Processing cutout...')}</span>
            </div>
            <span className="font-mono">{progressPct}%</span>
          </div>
        )}

        {/* Interactive Split-Slider Canvas Viewport */}
        <div
          ref={sliderContainerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="touch-slider-canvas touch-none relative w-full aspect-[4/3] md:aspect-[16/10] bg-stone-100 rounded-2xl overflow-hidden border-2 border-stone-400 select-none cursor-ew-resize shadow-inner"
          style={{ touchAction: 'none' }}
        >
          {/* ========================================================= */}
          {/* LAYER 1: "AFTER" (AI Scene + Tight Ground Shadow + Mirror) */}
          {/* ========================================================= */}
          <div className="absolute inset-0 overflow-hidden">
            {/* The selected 3D realistic scene background */}
            {renderSceneBackground(selectedScene.id)}

            {/* PRODUCT COMPOSITION CONTAINER (Centered & Grounded at Horizon) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Product Sizing Box - Preserves natural aspect ratio without distortion */}
              <div
                className="relative w-[56%] h-[72%] flex flex-col items-center justify-end"
                style={{
                  marginBottom: '10%', // Sits firmly on the tabletop horizon
                }}
              >
                {/* 1. TIGHT PHYSICAL GROUND CONTACT SHADOW (CRITICAL FIX) */}
                {/* Layer A: Ambient Diffuse Shadow */}
                <div
                  className="absolute rounded-full pointer-events-none z-10 transition-all"
                  style={{
                    bottom: `${(cutoutData?.baselineOffsetRatio || 0.05) * 100}%`,
                    width: `${selectedScene.shadowWidthPct}%`,
                    height: `${selectedScene.shadowHeightPx * 2.5}px`,
                    background: selectedScene.ambientShadowColor,
                    filter: `blur(${selectedScene.ambientShadowBlur}px)`,
                    transform: 'translateY(50%)',
                  }}
                />

                {/* Layer B: Ultra-Tight Occlusion Shadow (Glues bottom to ground, no floating!) */}
                <div
                  className="absolute rounded-full pointer-events-none z-20 transition-all"
                  style={{
                    bottom: `${(cutoutData?.baselineOffsetRatio || 0.05) * 100}%`,
                    width: `${selectedScene.shadowWidthPct * 0.82}%`,
                    height: `${selectedScene.shadowHeightPx}px`,
                    background: selectedScene.contactShadowColor,
                    filter: 'blur(3px)',
                    transform: 'translateY(35%)',
                  }}
                />

                {/* 2. SPECULAR PRODUCT REFLECTION (Active for White Marble) */}
                {selectedScene.hasReflection && (
                  <div
                    className="absolute w-full h-[65%] pointer-events-none z-0 overflow-hidden"
                    style={{
                      top: '100%',
                      transform: 'scaleY(-1)',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 65%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 65%)',
                      filter: 'blur(1px) contrast(95%)',
                      opacity: 0.38,
                    }}
                  >
                    <img
                      src={productImgSrc}
                      alt="Reflection"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                {/* 3. PRODUCT IMAGE (No shrinking, no distortion) */}
                <div
                  className="relative z-30 w-full h-full flex items-end justify-center"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  }}
                >
                  <img
                    src={productImgSrc}
                    alt={selectedProduct.nameMr}
                    className="max-h-full max-w-full w-auto h-auto object-contain transition-all"
                    style={{
                      // Retain crisp packaging label without distortion
                      imageRendering: 'auto',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* "After" Label Badge */}
            <div className="absolute top-4 right-4 z-40 bg-emerald-800/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isMarathi ? 'नंतर: ' : 'After: '}
                {isMarathi ? selectedScene.titleMr : selectedScene.titleEn}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LAYER 2: "BEFORE" (Original Photo with Raw Phone Lighting) */}
          {/* ========================================================= */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none z-40"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Exactly matching dimensions container */}
            <div
              className="relative w-full h-full bg-[#f5f5f4]"
              style={{
                width: sliderContainerRef.current?.clientWidth || '100%',
                height: sliderContainerRef.current?.clientHeight || '100%',
              }}
            >
              {/* Raw Phone Camera Backdrop (Dim room tint) */}
              <div className="absolute inset-0 bg-[#e7e5e4] flex items-center justify-center">
                <img
                  src={selectedProduct.imageUrl}
                  alt="Original Raw Photo"
                  className="w-full h-full object-contain p-6 filter contrast-90 brightness-95"
                />
              </div>

              {/* "Before" Label Badge */}
              <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {isMarathi ? 'आधी (मूळ फोन फोटो)' : 'Before (Raw Photo)'}
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* LAYER 3: INTERACTIVE DIVIDER LINE & GRAB HANDLE           */}
          {/* ========================================================= */}
          <div
            className="absolute top-0 bottom-0 z-50 pointer-events-none flex items-center justify-center"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Vertical Hairline Divider */}
            <div className="absolute inset-y-0 w-[3px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]" />

            {/* Tactile Circular Glide Knob */}
            <div className="relative w-12 h-12 rounded-full bg-[#80141c] border-3 border-white text-white shadow-2xl flex items-center justify-center cursor-ew-resize active:scale-110 transition-transform">
              <span className="text-sm font-black tracking-tighter">◀ ‖ ▶</span>
            </div>
          </div>
        </div>

        {/* Range Slider Track for Accessible Fallback */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-xs font-bold text-stone-600">
            <span>{isMarathi ? 'डावीकडे: मूळ फोटो (०%)' : 'Left: Original (0%)'}</span>
            <span className="font-mono text-stone-900">{Math.round(sliderPosition)}%</span>
            <span>{isMarathi ? 'उजवीकडे: AI देखावा (१००%)' : 'Right: AI Scene (100%)'}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="w-full accent-[#80141c] cursor-pointer"
          />
        </div>

        {/* Bottom Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
          <div className="flex flex-wrap items-center gap-2">
            {/* 1. Direct Phone Camera Capture */}
            <label className="touch-target cursor-pointer inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 border-amber-500 bg-amber-50 hover:bg-amber-100 font-black text-amber-950 text-xs sm:text-sm shadow-xs active:scale-95 transition-all">
              <Camera className="w-4 h-4 text-amber-700" />
              <span>{isMarathi ? '📱 कॅमेऱ्याने फोटो काढा' : '📱 Take Photo with Camera'}</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCustomUpload}
                className="hidden"
              />
            </label>

            {/* 2. File / Gallery Upload */}
            <label className="touch-target cursor-pointer inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 border-stone-300 bg-stone-100 hover:bg-stone-200 font-bold text-stone-800 text-xs sm:text-sm shadow-xs active:scale-95 transition-all">
              <Upload className="w-4 h-4 text-stone-600" />
              <span>{isMarathi ? 'गॅलरीतून निवडा' : 'Upload from Gallery'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomUpload}
                className="hidden"
              />
            </label>
          </div>

          {onUseEnhancedPhoto && (
            <button
              type="button"
              onClick={() => onUseEnhancedPhoto(productImgSrc)}
              className="touch-target inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532d] hover:bg-[#166534] font-black text-white text-xs sm:text-sm shadow-md active:scale-95 transition-transform"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>{isMarathi ? 'हा देखावा मालासाठी वापरा' : 'Apply Scene to Product'}</span>
            </button>
          )}
        </div>
      </div>

      {/* SAMPLE PRODUCT SELECTOR */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-md">
        <h3 className="text-base font-black text-stone-900 mb-3 flex items-center gap-2">
          <Sun className="w-5 h-5 text-amber-600" />
          <span>{isMarathi ? 'इतर वस्तू निवडून चाचणी घ्या:' : 'Select Sample SHG Product:'}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {products.slice(0, 6).map((prod) => (
            <button
              key={prod.id}
              type="button"
              onClick={() => setSelectedProduct(prod)}
              className={`p-2.5 rounded-2xl border-2 text-left transition-all ${
                selectedProduct.id === prod.id
                  ? 'border-[#80141c] bg-red-50 text-[#80141c] font-black shadow-sm ring-2 ring-[#80141c]/20'
                  : 'border-stone-200 hover:border-stone-400 text-stone-700 font-semibold'
              }`}
            >
              <div className="w-full aspect-square rounded-xl bg-stone-100 mb-2 overflow-hidden border border-stone-200 p-1">
                <img
                  src={prod.imageUrl}
                  alt={prod.nameMr}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs block truncate leading-tight font-bold">
                {isMarathi ? prod.nameMr : prod.nameEn}
              </span>
              <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">
                ₹{prod.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTING & CLARITY FINE-TUNING */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-stone-200">
          <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-stone-700" />
            <span>{isMarathi ? 'सूक्ष्म प्रकाश व स्पष्टता नियंत्रणे' : 'Fine-Tuning Controls'}</span>
          </h3>
          <button
            type="button"
            onClick={() => {
              setBrightness(104);
              setContrast(108);
              setShadowLift(15);
            }}
            className="text-xs font-bold text-stone-500 hover:text-stone-900 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isMarathi ? 'मूळ स्थितीत' : 'Reset'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Brightness */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>{isMarathi ? 'उजेड / प्रकाश' : 'Brightness'}</span>
              <span className="font-mono text-amber-900">{brightness}%</span>
            </div>
            <input
              type="range"
              min="90"
              max="130"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full accent-[#80141c]"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>{isMarathi ? 'कॉन्ट्रास्ट व स्पष्टता' : 'Contrast & Clarity'}</span>
              <span className="font-mono text-amber-900">{contrast}%</span>
            </div>
            <input
              type="range"
              min="95"
              max="130"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full accent-[#80141c]"
            />
          </div>

          {/* Shadow Lift */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold text-stone-700">
              <span>{isMarathi ? 'सावल्या कमी करा' : 'Lift Shadows'}</span>
              <span className="font-mono text-amber-900">+{shadowLift}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              value={shadowLift}
              onChange={(e) => setShadowLift(Number(e.target.value))}
              className="w-full accent-[#80141c]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
