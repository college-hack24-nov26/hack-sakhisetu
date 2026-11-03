import React, { useState } from 'react';
import {
  TrendingUp,
  ArrowLeft,
  Volume2,
  VolumeX,
  Calculator,
  ShieldCheck,
  Search,
  Sparkles,
  Info,
} from 'lucide-react';
import { Language } from '../types';
import { AudioService } from '../lib/audioService';
import { toDevanagariNumerals } from '../lib/marathiSpeechToNumber';

interface MandiRatesViewProps {
  lang: Language;
  onBack: () => void;
  onNavigateToRegister?: () => void;
}

interface MandiItem {
  id: string;
  nameMr: string;
  nameEn: string;
  unitMr: string;
  unitEn: string;
  apmcMin: number;
  apmcMax: number;
  avgRetail: number;
  marketTrend: 'rising' | 'stable' | 'competitive';
  district: string;
}

const APMC_DATA: MandiItem[] = [
  {
    id: 'lemon_pickle',
    nameMr: 'लिंबाचे लोणचे',
    nameEn: 'Lemon Pickle',
    unitMr: '२५० ग्रॅम बाटली',
    unitEn: '250g Jar',
    apmcMin: 50,
    apmcMax: 75,
    avgRetail: 60,
    marketTrend: 'stable',
    district: 'सातारा / पुणे APMC',
  },
  {
    id: 'mango_pickle',
    nameMr: 'आंब्याचे लोणचे',
    nameEn: 'Mango Pickle',
    unitMr: '५०० ग्रॅम बरणी',
    unitEn: '500g Jar',
    apmcMin: 150,
    apmcMax: 200,
    avgRetail: 180,
    marketTrend: 'rising',
    district: 'कोल्हापूर / सांगली APMC',
  },
  {
    id: 'urad_papad',
    nameMr: 'घरगुती उडीद पापड',
    nameEn: 'Urad Dal Papad',
    unitMr: '५०० ग्रॅम पाकीट',
    unitEn: '500g Pack',
    apmcMin: 100,
    apmcMax: 140,
    avgRetail: 120,
    marketTrend: 'stable',
    district: 'पुणे APMC',
  },
  {
    id: 'turmeric',
    nameMr: 'सेंद्रिय राजापुरी हळद',
    nameEn: 'Organic Turmeric',
    unitMr: '५०० ग्रॅम पाकीट',
    unitEn: '500g Pack',
    apmcMin: 130,
    apmcMax: 170,
    avgRetail: 150,
    marketTrend: 'rising',
    district: 'सांगली / सातारा APMC',
  },
  {
    id: 'groundnut_oil',
    nameMr: 'लाकडी घाणा शेंगदाणा तेल',
    nameEn: 'Cold-pressed Groundnut Oil',
    unitMr: '१ लिटर बाटली',
    unitEn: '1 Liter Bottle',
    apmcMin: 220,
    apmcMax: 270,
    avgRetail: 240,
    marketTrend: 'stable',
    district: 'सोलापूर APMC',
  },
  {
    id: 'bamboo_basket',
    nameMr: 'हस्तनिर्मित बांबू टोपली',
    nameEn: 'Handmade Bamboo Basket',
    unitMr: '१ नग (मध्यम)',
    unitEn: '1 Piece (Medium)',
    apmcMin: 70,
    apmcMax: 110,
    avgRetail: 85,
    marketTrend: 'competitive',
    district: 'गडचिरोली / अमरावती',
  },
  {
    id: 'jaggery',
    nameMr: 'सेंद्रिय काकवी गूळ',
    nameEn: 'Organic Chemical-free Jaggery',
    unitMr: '१ किलो ढेप',
    unitEn: '1 kg Block',
    apmcMin: 65,
    apmcMax: 90,
    avgRetail: 75,
    marketTrend: 'stable',
    district: 'कोल्हापूर APMC',
  },
];

export const MandiRatesView: React.FC<MandiRatesViewProps> = ({
  lang,
  onBack,
  onNavigateToRegister,
}) => {
  const isMarathi = lang === 'mr';
  const [search, setSearch] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  // Calculator state for fair rural SHG pricing
  const [rawCost, setRawCost] = useState<number>(35);
  const [packagingCost, setPackagingCost] = useState<number>(10);
  const [laborHours, setLaborHours] = useState<number>(1);
  const hourlyLaborRate = 25; // Fair minimum rural SHG wage allowance

  const calculatedTotalCost = rawCost + packagingCost + laborHours * hourlyLaborRate;
  const recommendedFairPrice = Math.round(calculatedTotalCost * 1.25); // 25% fair SHG collective profit margin

  const handleReadRatesAloud = () => {
    if (isPlaying) {
      AudioService.stopSpeaking();
      setIsPlaying(false);
      return;
    }

    const text = isMarathi
      ? 'महाराष्ट्र APMC बाजार भाव अंदाज: लिंबाचे लोणचे साठ रुपये, आंब्याचे लोणचे एकशे ऐंशी रुपये, उडीद पापड एकशे वीस रुपये, आणि सेंद्रिय हळद दीडशे रुपये. हा दर अंदाजित बाजार भाव आहे.'
      : 'Maharashtra APMC mandi price estimates: Lemon pickle sixty rupees, Mango pickle one hundred eighty rupees, Urad papad one hundred twenty rupees, and Organic turmeric one hundred fifty rupees. This is an AI estimated price range.';

    setIsPlaying(true);
    AudioService.speak({
      text,
      lang: isMarathi ? 'mr-IN' : 'en-US',
      rate: 0.9,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const filtered = APMC_DATA.filter((item) =>
    item.nameMr.toLowerCase().includes(search.toLowerCase()) ||
    item.nameEn.toLowerCase().includes(search.toLowerCase()) ||
    item.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-xl md:max-w-3xl mx-auto space-y-6">
      {/* Permanent Back Button & Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="touch-target inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 border-stone-300 hover:border-stone-500 bg-white text-stone-800 text-xs sm:text-sm font-black shadow-sm active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#EA580C]" />
          <span>{isMarathi ? '← मागे जा' : '← Back to Home'}</span>
        </button>

        <button
          type="button"
          onClick={handleReadRatesAloud}
          className={`touch-target inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm shadow-sm active:scale-95 transition-all ${
            isPlaying
              ? 'bg-[#F06277] text-white animate-pulse'
              : 'bg-[#F06277] hover:bg-[#E25368] text-white'
          }`}
        >
          {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isPlaying ? (isMarathi ? 'थांबवा' : 'Stop') : (isMarathi ? 'भाव ऐका' : 'Listen Rates')}</span>
        </button>
      </div>

      {/* Main Card */}
      <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#059669] flex items-center justify-center text-white shadow-md shrink-0">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#0F2942]">
              {isMarathi ? 'बाजार भाव (APMC दर व AI अंदाज)' : 'Market Rates & APMC Intelligence'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1">
              {isMarathi
                ? 'महाराष्ट्रातील प्रमुख APMC बाजारपेठांमधील चालू दरांचा अंदाज.'
                : 'Regional agricultural market price estimates for rural SHG goods.'}
            </p>
          </div>
        </div>

        {/* Compliance Label: AI Estimate Disclaimer */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5">
          <Info className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950">
            <span className="font-black block text-amber-900">
              {isMarathi ? 'अंदाजित बाजार भाव (AI Estimate)' : 'Estimated Market Rate (AI Estimate)'}
            </span>
            <span className="font-medium">
              {isMarathi
                ? '*हा दर हंगामी सरासरीवर आधारित संगणकीय अंदाज आहे. अंतिम विक्री दर बचत गट स्वतः ठरवतात.'
                : '*This rate is an algorithmic estimate based on seasonal APMC ranges. Final price is set directly by the SHG.'}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isMarathi ? 'मालाचे किंवा जिल्ह्याचे नाव शोधा...' : 'Search item or district...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-stone-200 focus:border-emerald-500 focus:outline-none text-sm font-bold bg-stone-50"
          />
        </div>

        {/* Rates Table */}
        <div className="mt-4 divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200">
          {filtered.map((item) => (
            <div key={item.id} className="p-4 bg-white hover:bg-stone-50 transition-colors flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="font-black text-stone-900 text-sm sm:text-base block">
                  {isMarathi ? item.nameMr : item.nameEn}
                </span>
                <span className="text-[11px] font-semibold text-stone-500 block">
                  {isMarathi ? item.unitMr : item.unitEn} · {item.district}
                </span>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm sm:text-base font-black text-emerald-900">
                  ₹{isMarathi ? toDevanagariNumerals(item.avgRetail) : item.avgRetail}
                </div>
                <div className="text-[10px] font-bold text-stone-500">
                  ₹{isMarathi ? toDevanagariNumerals(item.apmcMin) : item.apmcMin} - ₹{isMarathi ? toDevanagariNumerals(item.apmcMax) : item.apmcMax}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive SHG Fair Price Calculator */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-[#0F2942]">
              {isMarathi ? 'बचत गट योग्य भाव गणकयंत्र (Calculator)' : 'SHG Fair Price Calculator'}
            </h3>
            <p className="text-xs text-stone-500 font-semibold">
              {isMarathi ? 'कच्चा माल व मेहनतीनुसार रास्त विक्री किंमत काढा' : 'Calculate fair price based on raw material and labor'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMarathi ? 'कच्चा माल खर्च (₹)' : 'Raw Material Cost (₹)'}
            </label>
            <input
              type="number"
              value={rawCost}
              onChange={(e) => setRawCost(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border-2 border-stone-200 font-bold text-sm bg-stone-50"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMarathi ? 'पॅकिंग व बरणी खर्च (₹)' : 'Packaging Cost (₹)'}
            </label>
            <input
              type="number"
              value={packagingCost}
              onChange={(e) => setPackagingCost(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border-2 border-stone-200 font-bold text-sm bg-stone-50"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              {isMarathi ? 'मेहनतीचे तास' : 'Labor Hours'}
            </label>
            <input
              type="number"
              step="0.5"
              value={laborHours}
              onChange={(e) => setLaborHours(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border-2 border-stone-200 font-bold text-sm bg-stone-50"
            />
          </div>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-amber-100/60 border border-amber-300 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-amber-950 font-bold block">
              {isMarathi ? 'शिफारस केलेली रास्त विक्री किंमत:' : 'Recommended Fair Selling Price:'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-[#EA580C]">
              ₹{isMarathi ? toDevanagariNumerals(recommendedFairPrice) : recommendedFairPrice}
            </span>
            <span className="text-[11px] text-stone-600 block">
              {isMarathi ? '(खर्च ₹' + (isMarathi ? toDevanagariNumerals(calculatedTotalCost) : calculatedTotalCost) + ' + २५% बचत गट नफा)' : `(Cost ₹${calculatedTotalCost} + 25% SHG margin)`}
            </span>
          </div>

          {onNavigateToRegister && (
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="touch-target px-4 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-transform shrink-0"
            >
              {isMarathi ? 'हा भाव नोंदवा' : 'List at this Price'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
