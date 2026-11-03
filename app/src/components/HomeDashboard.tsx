import React from 'react';
import {
  PlusCircle,
  Sparkles,
  TrendingUp,
  ShoppingBag,
  BookOpen,
  Volume2,
  Mic,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types';
import { AudioService } from '../lib/audioService';

interface HomeDashboardProps {
  lang: Language;
  onNavigate: (tab: 'home' | 'register' | 'studio' | 'rates' | 'shop' | 'ledger') => void;
  onOpenCompliance?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  lang,
  onNavigate,
  onOpenCompliance,
}) => {
  const isMarathi = lang === 'mr';

  const handlePlayBannerSpeech = () => {
    const text = isMarathi
      ? 'जय भवानी महिला बचत गट, महाराष्ट्र मध्ये आपले स्वागत आहे! येथे ग्रामीण भगिनींची अस्सल घरगुती उत्पादने थेट ग्राहकांपर्यंत पोहोचवली जातात. नवीन वस्तू विकण्यासाठी विका बटण दाबा.'
      : 'Welcome to Jai Bhavani Women Self-Help Group, Maharashtra! Authentic homemade rural products delivered directly to customers. Tap Sell to voice register a new product.';

    AudioService.speak({
      text,
      lang: isMarathi ? 'mr-IN' : 'en-US',
      rate: 0.9,
    });
  };

  return (
    <div className="w-full max-w-xl md:max-w-3xl mx-auto space-y-6">
      {/* 1. HERO BANNER: Framed Authentic SHG Photograph */}
      <div className="relative rounded-3xl border-[6px] sm:border-[8px] border-[#994705] bg-[#803803] shadow-lg overflow-hidden transition-all">
        {/* Real photo of SHG women packaging authentic goods */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-stone-900">
          <img
            src="/shg_hero_photo.png"
            alt="जय भवानी महिला बचत गट - महाराष्ट्र"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />

          {/* Bottom gradient overlay for legible text */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Badges and Caption */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-col items-start gap-1">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-white font-bold text-base sm:text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {isMarathi
                  ? 'जय भवानी महिला बचत गट (महाराष्ट्र)'
                  : 'Jai Bhavani Women SHG (Maharashtra)'}
              </h2>

              {/* Voice greeting button */}
              <button
                type="button"
                onClick={handlePlayBannerSpeech}
                className="shrink-0 p-2 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-sm transition-transform active:scale-95"
                title={isMarathi ? 'परिचय ऐका' : 'Listen Welcome Intro'}
                aria-label="Listen welcome speech"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECTION TITLE: "तुम्ही काय करू इच्छिता?" */}
      <div className="pt-2">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F2942] tracking-tight">
          {isMarathi ? 'तुम्ही काय करू इच्छिता?' : 'What would you like to do?'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 font-semibold mt-0.5">
          {isMarathi
            ? 'खालीलपैकी पर्याय निवडा किंवा तळाशी दिलेले बटण दाबा.'
            : 'Select an option below or use the bottom navigation.'}
        </p>
      </div>

      {/* 3. ACTION CARDS LIST */}
      <div className="space-y-4">
        {/* CARD 1: १. नवीन वस्तू विका (Sell New Item) - Exact match to screenshot */}
        <div className="bg-white border-2 border-[#FCD34D] rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F59E0B] flex items-center justify-center text-white shadow-md shrink-0">
              <PlusCircle className="w-8 h-8 stroke-[2.2]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                {isMarathi ? '१. नवीन वस्तू विका' : '1. Sell New Item'}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 leading-relaxed">
                {isMarathi
                  ? 'फक्त ५ सोप्या पायऱ्यांत आवाजाने नाव आणि किंमत सांगा. फॉर्म भरण्याची गरज नाही.'
                  : 'Voice list your product in 5 simple steps. Zero form filling needed.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="touch-target flex-1 py-3 px-5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Mic className="w-5 h-5 text-amber-200" />
              <span>{isMarathi ? 'वस्तू नोंदणी करा (आवाजाने)' : 'Voice Register Product'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: २. AI फोटो स्टुडिओ (AI Magic Studio) */}
        <div className="bg-white border-2 border-purple-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#7C3AED] flex items-center justify-center text-white shadow-md shrink-0">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                {isMarathi ? '२. AI फोटो स्टुडिओ' : '2. AI Magic Studio'}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 leading-relaxed">
                {isMarathi
                  ? 'साध्या मोबाईल कॅमेऱ्याने काढलेल्या फोटोची पार्श्वभूमी बदला. ५ सुंदर देखावे आणि वास्तववादी सावली.'
                  : 'Enhance smartphone photos with background removal and 5 studio scenes with ground contact shadow.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-purple-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('studio')}
              className="touch-target flex-1 py-3 px-5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5 text-purple-200" />
              <span>{isMarathi ? 'फोटो सुंदर करा ✨' : 'Enhance Photo ✨'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 3: ३. बाजार भाव तपासा (APMC Mandi Rates) */}
        <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#059669] flex items-center justify-center text-white shadow-md shrink-0">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                {isMarathi ? '३. बाजार भाव तपासा' : '3. Market Rates (APMC)'}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 leading-relaxed">
                {isMarathi
                  ? 'स्थानिक APMC बाजारपेठेतील चालू दरांचा अंदाज तपासा आणि योग्य विक्री किंमत ठरवा.'
                  : 'Check regional APMC mandi price ranges and estimate fair selling prices.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('rates')}
              className="touch-target flex-1 py-3 px-5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <TrendingUp className="w-5 h-5 text-emerald-200" />
              <span>{isMarathi ? 'बाजार भाव पहा 📈' : 'Check Market Rates 📈'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 4: ४. संपूर्ण बाजारपेठ (Shop / Marketplace) */}
        <div className="bg-white border-2 border-amber-300 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D97706] flex items-center justify-center text-white shadow-md shrink-0">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                {isMarathi ? '४. खरेदी करा (बाजारपेठ)' : '4. Browse Marketplace'}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 leading-relaxed">
                {isMarathi
                  ? 'महाराष्ट्रातील बचत गटांची घरगुती लोणची, पापड, हळद, तेल आणि हस्तकला थेट मागवा.'
                  : 'Order authentic pickles, papads, spices, and handmade rural goods directly from SHGs.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="touch-target flex-1 py-3 px-5 rounded-2xl bg-[#D97706] hover:bg-[#B45309] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5 text-amber-200" />
              <span>{isMarathi ? 'बाजारपेठ उघडा 🛍️' : 'Open Marketplace 🛍️'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 5: ५. बचत गट हिशोब नोंदवही (SHG Ledger) */}
        <div className="bg-white border-2 border-sky-200 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shadow-md shrink-0">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-[#0F2942] tracking-tight">
                {isMarathi ? '५. हिशोब नोंदवही' : '5. SHG Sales Ledger'}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium mt-1 leading-relaxed">
                {isMarathi
                  ? 'पारदर्शक हिशोब. एकूण विक्री, शिल्लक आणि मिळालेली रक्कम. कॅश ऑन डिलिव्हरी नोंद.'
                  : 'Transparent accounting. Total sales, pending orders, and cash-on-delivery tracking.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('ledger')}
              className="touch-target flex-1 py-3 px-5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <BookOpen className="w-5 h-5 text-sky-200" />
              <span>{isMarathi ? 'नोंदवही पहा 📒' : 'View Ledger 📒'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Trust & Compliance Badge */}
      {onOpenCompliance && (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-stone-700 text-xs font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {isMarathi
                ? '१००% सत्यता व पारदर्शकता पडताळणी उपलब्ध'
                : '100% Truthfulness & Compliance Audit Available'}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenCompliance}
            className="text-xs font-black text-emerald-800 hover:text-emerald-950 underline underline-offset-2 shrink-0"
          >
            {isMarathi ? 'तपासा' : 'Verify'}
          </button>
        </div>
      )}
    </div>
  );
};
