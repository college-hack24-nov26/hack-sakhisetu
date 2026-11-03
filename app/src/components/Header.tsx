import React, { useState } from 'react';
import { ShoppingBag, Globe, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { AudioService } from '../lib/audioService';

interface HeaderProps {
  activeTab: 'home' | 'register' | 'studio' | 'rates' | 'shop' | 'ledger';
  setActiveTab: (tab: 'home' | 'register' | 'studio' | 'rates' | 'shop' | 'ledger') => void;
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCompliance?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenCompliance,
}) => {
  const isMarathi = lang === 'mr';
  const [isSpeakingHelp, setIsSpeakingHelp] = useState(false);

  // Context-aware voice guidance for the current view
  const handleVoiceHelpClick = () => {
    if (isSpeakingHelp) {
      AudioService.stopSpeaking();
      setIsSpeakingHelp(false);
      return;
    }

    let speechText = '';
    if (activeTab === 'home') {
      speechText = isMarathi
        ? 'नमस्कार! बचत गट बाजार मध्ये आपले स्वागत आहे. येथे ग्रामीण महिला बचत गटांच्या अस्सल उत्पादनांची नोंदणी आवाजाने करू शकता, फोटो सुंदर करू शकता किंवा खरेदी करू शकता. नवीन वस्तू विकण्यासाठी विका बटण दाबा.'
        : 'Welcome to Bachat Gat Bazaar. Voice register authentic rural SHG products, enhance photos, or browse goods. Tap Sell to add a product.';
    } else if (activeTab === 'register') {
      speechText = isMarathi
        ? 'वस्तू नोंदणी: लाल रंगाचे माइक बटण दाबून मालाचे नाव आणि किंमत सांगा. उदाहरणार्थ: लिंबाचे लोणचे साठ रुपये. शेवटी हो बोलून खात्री करा.'
        : 'Voice listing: Tap the red mic button, speak item name and price like Lemon Pickle sixty rupees, then confirm.';
    } else if (activeTab === 'studio') {
      speechText = isMarathi
        ? 'AI मॅजिक स्टुडिओ: कॅमेऱ्याने काढलेल्या फोटोची पार्श्वभूमी काढून ५ सुंदर देखावे निवडा आणि वास्तववादी सावली जोडा.'
        : 'AI Magic Studio: Remove background and select from 5 authentic studio scenes with ground contact shadows.';
    } else if (activeTab === 'rates') {
      speechText = isMarathi
        ? 'बाजार भाव: महाराष्ट्रातील APMC बाजारपेठेतील अंदाजित दर आणि रास्त किंमत गणकयंत्र.'
        : 'Market rates: Check APMC mandi price estimates and calculate fair SHG selling prices.';
    } else if (activeTab === 'shop') {
      speechText = isMarathi
        ? 'बाजारपेठ: महिला बचत गटांची घरगुती उत्पादने पहा आणि खरेदी पिशवीत टाका. माहिती ऐकण्यासाठी स्पीकर दाबा.'
        : 'Marketplace: Browse authentic rural SHG goods and add to your shopping bag.';
    } else {
      speechText = isMarathi
        ? 'नोंदवही: आपल्या बचत गटाचा पारदर्शक हिशोब, एकूण विक्री आणि शिल्लक रक्कम पहा.'
        : 'Ledger: View your SHG sales, pending orders, and cash accounting.';
    }

    setIsSpeakingHelp(true);
    AudioService.speak({
      text: speechText,
      lang: isMarathi ? 'mr-IN' : 'en-US',
      rate: 0.9,
      onStart: () => setIsSpeakingHelp(true),
      onEnd: () => setIsSpeakingHelp(false),
      onError: () => setIsSpeakingHelp(false),
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b-2 border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto min-w-0 px-2 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-1 sm:gap-4">
        {/* Left: Orange Rounded Logo Square + Brand Name (Matches screenshot) */}
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="text-left min-w-0 flex flex-1 items-center gap-2 sm:gap-3 focus:outline-none group active:scale-95 transition-transform"
          title={isMarathi ? 'मुख्य पानावर जा' : 'Go to Home'}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-[#EA580C] shadow-md flex items-center justify-center text-white shrink-0 group-hover:shadow-lg transition-shadow">
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.4] text-white" />
          </div>

          <div className="min-w-0 flex flex-col">
            <span className="truncate text-base sm:text-2xl font-black tracking-tight text-[#2D1808] leading-tight block">
              {isMarathi ? 'बचत गट बाजार' : 'Bachat Gat Bazaar'}
            </span>
            <span className="text-[10px] text-stone-500 font-bold tracking-wider hidden sm:block">
              {isMarathi ? 'ग्रामीण महिला बचत गट व्यासपीठ' : 'Rural Women SHG Platform'}
            </span>
          </div>
        </button>

        {/* Right Controls: Pink Speaker Button + Yellow English Toggle + Cart Button */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Emerald Audio Help Button with 'मदत (ऐका)' - Exact match to screenshot */}
          <button
            type="button"
            onClick={handleVoiceHelpClick}
            className={`touch-target shrink-0 inline-flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-sm text-white font-black text-xs sm:text-sm active:scale-95 transition-all ${
              isSpeakingHelp
                ? 'bg-[#E11D48] ring-4 ring-rose-300 animate-pulse'
                : 'bg-[#059669] hover:bg-[#047857]'
            }`}
            title={
              isSpeakingHelp
                ? isMarathi
                  ? 'आवाज थांबवा'
                  : 'Stop Voice Guide'
                : isMarathi
                ? 'या पानाची माहिती मोठ्याने ऐका (मदत)'
                : 'Listen to page instructions aloud'
            }
            aria-label="Voice Help Guide"
          >
            {isSpeakingHelp ? (
              <>
                <VolumeX className="w-5 h-5 text-white stroke-[2.4]" />
                <span className="hidden sm:inline whitespace-nowrap">{isMarathi ? 'थांबवा' : 'Stop'}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 text-white stroke-[2.4]" />
                <span className="hidden sm:inline whitespace-nowrap">{isMarathi ? 'मदत (ऐका)' : 'Help'}</span>
              </>
            )}
          </button>

          {/* Light Golden-Yellow English/Marathi Toggle - Exact match to screenshot */}
          <button
            type="button"
            onClick={onToggleLang}
            className="touch-target shrink-0 min-w-0 inline-flex items-center justify-center gap-1 px-2 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-amber-300 bg-[#FFF4C7] hover:bg-[#FFEAA0] text-[11px] sm:text-sm font-extrabold shadow-sm active:scale-95 transition-all"
            title="Toggle Language / भाषा बदला"
          >
            <Globe className="w-4 h-4 text-[#D97706] shrink-0" />
            <span className="whitespace-nowrap font-black">
              {isMarathi ? 'English' : 'मराठी'}
            </span>
          </button>

          {/* Cart Bag Button */}
          {cartCount > 0 && (
            <button
              type="button"
              onClick={onOpenCart}
              className="touch-target shrink-0 relative inline-flex items-center justify-center p-2.5 sm:px-3 sm:py-2.5 rounded-2xl bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-md active:scale-95 transition-all"
              aria-label="Shopping Bag"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-300 text-stone-900 text-xs font-black flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          )}

          {/* Truthfulness Audit trigger */}
          {onOpenCompliance && (
            <button
              type="button"
              onClick={onOpenCompliance}
              className="hidden lg:inline-flex touch-target shrink-0 items-center justify-center gap-1 px-3 py-2 rounded-2xl border border-emerald-400 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-black shadow-xs"
              title="सत्यता व अनुपालन ऑडिट / Compliance Audit"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{isMarathi ? 'ऑडिट' : 'Audit'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
