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
  ExternalLink,
} from 'lucide-react';
import { Language } from '../types';
import { AudioService } from '../lib/audioService';
import { DeliveryPartnerSection } from './DeliveryPartnerSection';
import { ProductLabelGuide } from './ProductLabelGuide';

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

  const handlePlayFssaiInstructions = () => {
    const text = isMarathi
      ? 'अन्न व्यवसायासाठी FSSAI नोंदणी किंवा परवाना घ्या. प्रथम व्यवसायाची माहिती आणि आवश्यक कागदपत्रे तयार ठेवा. अधिकृत फॉस्कॉस संकेतस्थळ उघडा. तुमच्या व्यवसायाला लागू असलेली नोंदणी किंवा परवान्याचा प्रकार निवडा, अर्ज भरा, कागदपत्रे अपलोड करा आणि लागू शुल्क भरून अर्ज पाठवा. अर्जाची स्थिती तपासा आणि मागितलेली माहिती द्या. प्रमाणपत्र मिळाल्यानंतरच FSSAI क्रमांक पॅकेजिंगवर छापा.'
      : 'Get the FSSAI registration or license required for your food business. Prepare your business details and documents, then open the official FoSCoS website. Choose the registration or license type that applies to your business, complete the application, upload the requested documents, and pay the applicable fee. Track your application and respond to any requests. Print an FSSAI number on packaging only after your certificate is issued.';

    AudioService.speak({
      text,
      lang: isMarathi ? 'mr-IN' : 'en-US',
      rate: 0.88,
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

      {/* FSSAI application guide for women-led food businesses */}
      <section
        aria-labelledby="fssai-guide-heading"
        className="rounded-3xl border-2 border-emerald-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-md">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 id="fssai-guide-heading" className="text-xl font-black tracking-tight text-[#0F2942] sm:text-2xl">
              {isMarathi ? 'FSSAI नोंदणी / परवाना कसा घ्याल?' : 'How to get FSSAI registration / license'}
            </h3>
            <p className="mt-1 text-sm font-medium leading-relaxed text-stone-600 sm:text-base">
              {isMarathi
                ? 'अन्नपदार्थ बनवून किंवा विकून व्यवसाय सुरू करताना ही पायरी पूर्ण करा.'
                : 'Follow these steps when starting a food-making or food-selling business.'}
            </p>
          </div>
          <button
            type="button"
            onClick={handlePlayFssaiInstructions}
            className="touch-target shrink-0 rounded-xl bg-emerald-50 p-3 text-emerald-800 hover:bg-emerald-100"
            aria-label={isMarathi ? 'FSSAI सूचना ऐका' : 'Listen to FSSAI instructions'}
            title={isMarathi ? 'सूचना ऐका' : 'Listen to instructions'}
          >
            <Volume2 className="h-5 w-5" />
          </button>
        </div>

        <ol className="mt-5 space-y-3">
          {(isMarathi
            ? [
                ['माहिती व कागदपत्रे तयार ठेवा', 'व्यवसायाचा पत्ता, ओळखपत्र, फोटो आणि अन्न व्यवसायाची माहिती जवळ ठेवा. नेमकी कागदपत्रे व्यवसायाच्या प्रकारानुसार बदलू शकतात.'],
                ['अधिकृत FoSCoS पोर्टल उघडा', 'foscos.fssai.gov.in वर जा आणि नवीन अर्ज सुरू करा.'],
                ['योग्य प्रकार निवडा', 'पोर्टलवर तुमच्या व्यवसायासाठी लागू असलेली नोंदणी किंवा परवाना श्रेणी निवडा; शंका असल्यास FSSAI मदत केंद्राची मदत घ्या.'],
                ['अर्ज भरा आणि पाठवा', 'माहिती तपासून भरा, मागितलेली कागदपत्रे अपलोड करा आणि पोर्टलवर दाखवलेले लागू शुल्क भरून अर्ज सबमिट करा.'],
                ['स्थिती तपासा व प्रमाणपत्र जतन करा', 'अर्ज क्रमांकाने स्थिती तपासा. अतिरिक्त माहिती किंवा तपासणी मागितल्यास प्रतिसाद द्या. मंजुरीनंतर प्रमाणपत्र डाउनलोड करा.'],
              ]
            : [
                ['Prepare your details and documents', 'Keep your business address, identity proof, photograph, and food-business details ready. Exact documents depend on your business type.'],
                ['Open the official FoSCoS portal', 'Go to foscos.fssai.gov.in and start a new application.'],
                ['Choose the applicable category', 'Select the registration or license category that applies to your business. If unsure, contact FSSAI support for guidance.'],
                ['Complete and submit the application', 'Fill in accurate details, upload the requested documents, and pay the fee shown on the portal.'],
                ['Track the application and save your certificate', 'Use your application reference to check status. Respond to requests for information or inspection, then download your certificate after approval.'],
              ]
          ).map(([title, detail], index) => (
            <li key={title} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-black text-emerald-900">
                {index + 1}
              </span>
              <div>
                <p className="font-bold text-stone-800">{title}</p>
                <p className="text-sm leading-relaxed text-stone-600">{detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm font-semibold leading-relaxed text-amber-950">
          {isMarathi
            ? 'महत्त्वाचे: अर्ज केल्याने मंजुरी मिळाली असे होत नाही. प्रमाणपत्र मिळेपर्यंत FSSAI क्रमांक किंवा मंजुरीचा दावा पॅकेजिंगवर छापू नका. नियम व कागदपत्रे बदलू शकतात—अंतिम माहितीसाठी अधिकृत पोर्टल तपासा.'
            : 'Important: Applying does not mean you are approved. Do not print an FSSAI number or claim approval on packaging until your certificate is issued. Requirements can change; confirm the latest details on the official portal.'}
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <a
            href="https://foscos.fssai.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="touch-target flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-center text-sm font-black text-white shadow-md transition-colors hover:bg-emerald-900"
          >
            <span>{isMarathi ? 'अधिकृत FoSCoS पोर्टल उघडा' : 'Open official FoSCoS portal'}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      <ProductLabelGuide lang={lang} />
      <DeliveryPartnerSection lang={lang} />

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
