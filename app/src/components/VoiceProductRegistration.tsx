import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Check,
  X,
  Volume2,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  ArrowLeft,
  Sparkle,
} from 'lucide-react';
import { AudioService } from '../lib/audioService';
import {
  marathiSpeechToNumber,
  normalizeConfirmationIntent,
  toDevanagariNumerals,
} from '../lib/marathiSpeechToNumber';
import { FailSafeNumericKeypad } from './FailSafeNumericKeypad';
import { VoiceHelpButton } from './VoiceHelpButton';
import { Product, Language, VoiceStep } from '../types';
import { mapSpokenItemToRealPhoto } from '../data/mockProducts';

interface VoiceProductRegistrationProps {
  onProductSaved: (newProduct: Product) => void;
  onBack?: () => void;
  lang: Language;
}

const SAMPLE_SPEECH_TESTS = [
  { label: 'लिंबाचे लोणचे - ₹६०', item: 'लिंबाचे लोणचे', pricePhrase: 'साठ', priceVal: 60 },
  { label: 'आंब्याचे लोणचे - ₹१८०', item: 'आंब्याचे लोणचे', pricePhrase: 'एकशे ऐंशी', priceVal: 180 },
  { label: 'उडीद पापड - ₹१२०', item: 'घरगुती खमंग उडीद पापड', pricePhrase: 'एकशे वीस', priceVal: 120 },
  { label: 'सेंद्रिय हळद - ₹१५०', item: 'सेंद्रिय राजापुरी हळद', pricePhrase: 'दीडशे', priceVal: 150 },
];

export const VoiceProductRegistration: React.FC<VoiceProductRegistrationProps> = ({
  onProductSaved,
  onBack,
  lang,
}) => {
  const isMarathi = lang === 'mr';
  const [step, setStep] = useState<VoiceStep>('IDLE');
  const [itemName, setItemName] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [activeSpeechLang, setActiveSpeechLang] = useState<'mr-IN' | 'hi-IN'>('mr-IN');
  const [langWarning, setLangWarning] = useState<string | null>(null);
  const [statusPrompt, setStatusPrompt] = useState<string>(
    isMarathi ? 'नोंदणीसाठी खालील लाल माइक बटण दाबा.' : 'Tap the red microphone button to start.'
  );
  const [micActive, setMicActive] = useState<boolean>(false);
  const [shgGroupName, setShgGroupName] = useState<string>('सावित्रीबाई फुले महिला बचत गट');
  const [locationName, setLocationName] = useState<string>('वडूज, जि. सातारा');

  const recognizerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      stopAnyRecognition();
      AudioService.stopSpeaking();
    };
  }, []);

  const stopAnyRecognition = () => {
    if (recognizerRef.current) {
      try {
        recognizerRef.current.abort();
      } catch {
        // ignore
      }
      recognizerRef.current = null;
    }
    setMicActive(false);
  };

  const speakPrompt = (text: string, onEnd?: () => void) => {
    AudioService.speak({
      text,
      lang: isMarathi ? activeSpeechLang : 'en-US',
      rate: 0.88,
      onEnd,
    });
  };

  const showManualEntryFallback = (message: string) => {
    setMicActive(false);
    setStatusPrompt(message);
    setStep('KEYPAD_FALLBACK');
  };

  // Step 1: Start listening for Product Name
  const startItemRecognition = (targetLang: 'mr-IN' | 'hi-IN' = activeSpeechLang) => {
    stopAnyRecognition();

    if (!AudioService.isSpeechRecognitionSupported()) {
      showManualEntryFallback(
        isMarathi
          ? 'या फोनवर आवाज ओळख उपलब्ध नाही. खाली मालाचे नाव आणि किंमत भरा.'
          : 'Speech recognition is unavailable on this phone. Enter the product name and price below.'
      );
      return;
    }

    try {
      const recognizer = AudioService.createRecognizer(targetLang);
      let recognitionSettled = false;
      recognizerRef.current = recognizer;
      setStep('LISTENING_ITEM');
      setMicActive(true);
      setStatusPrompt(
        isMarathi
          ? 'मालाचे नाव बोला... (उदा. लिंबाचे लोणचे किंवा उडीद पापड)'
          : 'Speak product name... (e.g. Lemon pickle or Urad papad)'
      );

      recognizer.onresult = (event: any) => {
        recognitionSettled = true;
        const transcript = event.results?.[0]?.[0]?.transcript?.trim();
        if (!transcript) {
          showManualEntryFallback(
            isMarathi ? 'मालाचे नाव ऐकू आले नाही. खाली टाइप करा.' : 'No product name was heard. Enter it below.'
          );
          return;
        }
        setMicActive(false);
        setItemName(transcript);
        promptForPrice(transcript);
      };

      recognizer.onerror = (e: any) => {
        recognitionSettled = true;
        handleRecognitionError(e, targetLang, () => startItemRecognition('hi-IN'));
      };

      recognizer.onend = () => {
        setMicActive(false);
        if (!recognitionSettled && recognizerRef.current === recognizer) {
          showManualEntryFallback(
            isMarathi ? 'मालाचे नाव ऐकू आले नाही. खाली टाइप करा.' : 'No product name was heard. Enter it below.'
          );
        }
      };

      recognizer.start();
    } catch (error) {
      console.warn('Unable to start product name recognition:', error);
      showManualEntryFallback(
        isMarathi ? 'माइक सुरू झाला नाही. खाली मालाचे नाव आणि किंमत भरा.' : 'Could not start the microphone. Enter the product name and price below.'
      );
    }
  };

  // Step 2: Speak Item acknowledgment, then prompt for Price
  const promptForPrice = (resolvedItem: string) => {
    const speech = isMarathi
      ? `${resolvedItem}. आता याची विक्री किंमत सांगा.`
      : `${resolvedItem}. Now speak the selling price.`;

    setStatusPrompt(
      isMarathi
        ? `मालाचे नाव समजले: "${resolvedItem}". आता किंमत सांगा...`
        : `Product noted: "${resolvedItem}". Now speak price...`
    );

    speakPrompt(speech, () => {
      startPriceRecognition(resolvedItem);
    });
  };

  const startPriceRecognition = (
    resolvedItem: string,
    targetLang: 'mr-IN' | 'hi-IN' = activeSpeechLang
  ) => {
    stopAnyRecognition();

    try {
      const recognizer = AudioService.createRecognizer(targetLang);
      let recognitionSettled = false;
      recognizerRef.current = recognizer;
      setStep('LISTENING_PRICE');
      setMicActive(true);
      setStatusPrompt(
        isMarathi
          ? 'किंमत बोला (उदा. साठ रुपये, पन्नास, दीडशे)...'
          : 'Speak price (e.g. 60 rupees, 50, 150)...'
      );

      recognizer.onresult = (event: any) => {
        recognitionSettled = true;
        const spokenPrice = event.results?.[0]?.[0]?.transcript?.trim();
        if (!spokenPrice) {
          showManualEntryFallback(
            isMarathi ? 'किंमत ऐकू आली नाही. खाली नाव आणि किंमत भरा.' : 'No price was heard. Enter the product name and price below.'
          );
          return;
        }
        setMicActive(false);
        const parsed = marathiSpeechToNumber(spokenPrice);

        if (parsed !== null && parsed > 0) {
          setPrice(parsed);
          triggerConfirmationLoop(resolvedItem, parsed);
        } else {
          // Fallback to keypad
          const failMsg = isMarathi
            ? 'किंमत स्पष्ट ऐकू आली नाही. कृपया खालील पाटीवर अंक दाबा.'
            : 'Price not recognized. Please use numeric keypad below.';
          setStatusPrompt(failMsg);
          speakPrompt(failMsg, () => {
            setStep('KEYPAD_FALLBACK');
          });
        }
      };

      recognizer.onerror = (e: any) => {
        recognitionSettled = true;
        handleRecognitionError(e, targetLang, () => startPriceRecognition(resolvedItem, 'hi-IN'));
      };

      recognizer.onend = () => {
        setMicActive(false);
        if (!recognitionSettled && recognizerRef.current === recognizer) {
          showManualEntryFallback(
            isMarathi ? 'किंमत ऐकू आली नाही. खाली किंमत भरा.' : 'No price was heard. Enter it below.'
          );
        }
      };

      recognizer.start();
    } catch (error) {
      console.warn('Unable to start price recognition:', error);
      showManualEntryFallback(
        isMarathi ? 'माइक सुरू झाला नाही. खाली किंमत भरा.' : 'Could not start the microphone. Enter the price below.'
      );
    }
  };

  // Step 3: Mandatory Voice Confirmation Loop
  const triggerConfirmationLoop = (finalItem: string, finalPrice: number) => {
    setStep('CONFIRMATION_PENDING');
    const spokenConfirmation = isMarathi
      ? `तुम्ही सांगितले: ${finalItem}, किंमत ${finalPrice} रुपये. हे बरोबर आहे का? 'हो' किंवा 'नाही' बोला.`
      : `You stated: ${finalItem}, price ${finalPrice} rupees. Is this correct? Say 'Yes' or 'No'.`;

    setStatusPrompt(spokenConfirmation);

    speakPrompt(spokenConfirmation, () => {
      listenForConfirmationResponse();
    });
  };

  const listenForConfirmationResponse = () => {
    stopAnyRecognition();
    try {
      const recognizer = AudioService.createRecognizer(activeSpeechLang);
      recognizerRef.current = recognizer;
      setMicActive(true);

      recognizer.onresult = (event: any) => {
        const rawResponse = event.results[0][0].transcript;
        setMicActive(false);
        const intent = normalizeConfirmationIntent(rawResponse);

        if (intent === 'CONFIRMED') {
          commitSaveProduct();
        } else if (intent === 'REJECTED') {
          handleReject();
        } else {
          setStatusPrompt(
            isMarathi
              ? 'आवाज समजला नाही. कृपया खालील हिरवे किंवा लाल बटण दाबा.'
              : 'Voice unclear. Please tap the green or red button below.'
          );
        }
      };

      recognizer.onerror = () => {
        setMicActive(false);
      };

      recognizer.start();
    } catch {
      setMicActive(false);
    }
  };

  // Save product directly to database with 'Voice Added' badge & map to real photo
  const commitSaveProduct = () => {
    stopAnyRecognition();

    const finalItem = itemName || (isMarathi ? 'लिंबाचे लोणचे' : 'Lemon Pickle');
    const finalPrice = price || 60;

    // Instantly map to authentic photo from dataset (e.g. real lemon pickle glass jar with mustard oil!)
    const mapped = mapSpokenItemToRealPhoto(finalItem);

    const newProd: Product = {
      id: `prod-voice-${Date.now()}`,
      nameMr: mapped.nameMr || finalItem,
      nameEn: mapped.nameEn || finalItem,
      price: finalPrice,
      unitMr: mapped.unitMr,
      unitEn: mapped.unitEn,
      categoryMr: mapped.categoryMr,
      categoryEn: mapped.categoryEn,
      shgNameMr: shgGroupName,
      shgNameEn: 'Savitribai Phule Women SHG',
      locationMr: locationName,
      locationEn: 'Satara, Maharashtra',
      descriptionMr: mapped.descriptionMr,
      descriptionEn: mapped.descriptionEn,
      imageUrl: mapped.imageUrl,
      estimatedMarketPrice: Math.round(finalPrice * 1.15),
      apmcRange: {
        min: Math.max(10, Math.round(finalPrice * 0.85)),
        max: Math.round(finalPrice * 1.3),
      },
      salesCount: 1,
      inStock: true,
      verifiedSHG: true,
      isVoiceAdded: true, // Distinctive 'Voice Added' badge
      audioDescriptionMr: `${shgGroupName} चा माल: ${mapped.nameMr}. विक्री किंमत ${finalPrice} रुपये.`,
      dateAdded: new Date().toISOString().split('T')[0],
    };

    // Save and seamlessly transition directly to Marketplace
    onProductSaved(newProd);

    speakPrompt(
      isMarathi
        ? `छान! ${newProd.nameMr} बाजारपेठेत जोडले गेले आहे.`
        : `Great! ${newProd.nameEn} has been added to the marketplace.`
    );
  };

  const handleReject = () => {
    stopAnyRecognition();
    speakPrompt(
      isMarathi
        ? 'नोंद रद्द केली. आपण पुन्हा नव्याने सुरू करू.'
        : 'Listing cancelled. Let us start again.',
      () => {
        resetForm();
      }
    );
  };

  const resetForm = () => {
    setItemName('');
    setPrice(null);
    setStep('IDLE');
    setMicActive(false);
    setStatusPrompt(
      isMarathi ? 'नोंदणीसाठी खालील लाल माइक बटण दाबा.' : 'Tap the red microphone button to start.'
    );
  };

  const handleRecognitionError = (
    e: any,
    recognitionLang: 'mr-IN' | 'hi-IN',
    retryHindi: () => void
  ) => {
    console.warn('Speech Recognition Event Error:', e?.error);
    setMicActive(false);

    if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
      showManualEntryFallback(
        isMarathi
          ? 'माइकची परवानगी नाही. खाली मालाचे नाव आणि किंमत भरा.'
          : 'Microphone permission was denied. Enter the product name and price below.'
      );
      return;
    }

    if (
      (e?.error === 'language-not-supported' || e?.error === 'no-speech') &&
      recognitionLang === 'mr-IN'
    ) {
      setActiveSpeechLang('hi-IN');
      setLangWarning(
        isMarathi
          ? 'मराठी व्हॉइस मॉडेल उपलब्ध नाही; हिंदी मॉडेल चालू केले आहे. स्पष्ट बोला.'
          : 'Marathi voice model unavailable; switched to Hindi voice model.'
      );
      retryHindi();
      return;
    }

    showManualEntryFallback(
      isMarathi
        ? 'आवाज ओळखता आला नाही. खाली मालाचे नाव आणि किंमत भरा.'
        : 'Speech could not be recognized. Enter the product name and price below.'
    );
  };

  // Quick Simulation Test for Reviewers / Hackathon Judges
  const handleSimulateVoice = (test: (typeof SAMPLE_SPEECH_TESTS)[0]) => {
    setItemName(test.item);
    const parsed = test.priceVal || marathiSpeechToNumber(test.pricePhrase) || 60;
    setPrice(parsed);
    triggerConfirmationLoop(test.item, parsed);
  };

  const handleSafeBack = () => {
    if (step !== 'IDLE' && itemName) {
      if (
        window.confirm(
          isMarathi
            ? 'नोंदणी अर्धवट आहे. आपण मागे जाऊ इच्छिता का?'
            : 'Registration is in progress. Do you wish to leave?'
        )
      ) {
        onBack?.();
      }
    } else {
      onBack?.();
    }
  };

  // Mapped preview for confirmation screen
  const previewMapped = itemName ? mapSpokenItemToRealPhoto(itemName) : null;

  return (
    <div className="w-full max-w-xl mx-auto bg-white border-3 border-stone-800 rounded-3xl p-6 shadow-2xl space-y-4">
      {/* Permanent Back Button with Data Loss Prevention */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-stone-200">
        {onBack && (
          <button
            type="button"
            onClick={handleSafeBack}
            className="touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-stone-300 hover:border-stone-500 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#80141c]" />
            <span>{isMarathi ? 'मागे जा (दुकान)' : 'Back to Shop'}</span>
          </button>
        )}

        <div className="text-right ml-auto">
          <VoiceHelpButton
            lang={lang}
            textToSpeak={
              isMarathi
                ? 'या पानावर तुम्ही तुमच्या मालाची नोंद करू शकता. लाल रंगाचे माइक बटण दाबून मालाचे नाव आणि किंमत सांगा. शेवटी हो बोलून खात्री करा.'
                : 'Here you can list your SHG product using voice. Tap the red mic, speak product name and price, then say yes to confirm.'
            }
          />
        </div>
      </div>

      {/* Screen Title */}
      <div>
        <h2 className="text-2xl font-black text-[#80141c]">
          {isMarathi ? 'व्हॉइस माल नोंदणी' : 'Voice Product Listing'}
        </h2>
        <p className="text-xs font-semibold text-stone-500 mt-0.5">
          {isMarathi
            ? 'फक्त बोला: उदा. "लिंबाचे लोणचे" आणि "६० रुपये"'
            : 'Simply speak: e.g. "Lemon pickle" and "60 rupees"'}
        </p>
      </div>

      {/* Language Fallback Warning */}
      {langWarning && (
        <div className="p-3 bg-amber-50 border-2 border-amber-500 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{langWarning}</span>
        </div>
      )}

      {/* High-Contrast Status Prompt */}
      <div className="p-5 bg-[#fffbeb] border-3 border-amber-500 rounded-2xl min-h-[110px] flex flex-col items-center justify-center text-center shadow-inner">
        <p className="text-xl md:text-2xl font-black text-stone-900 leading-snug">
          {statusPrompt}
        </p>
        {micActive && (
          <div className="flex items-center gap-2 mt-3 text-red-700 font-bold text-sm">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
            <span>{isMarathi ? 'माइक सुरू आहे... स्पष्ट बोला' : 'Microphone listening...'}</span>
          </div>
        )}
      </div>

      {/* STEP: IDLE - Big Primary Speak Button */}
      {step === 'IDLE' && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => startItemRecognition()}
            className="touch-target w-full min-h-[72px] bg-[#80141c] hover:bg-[#5d0c12] text-white text-2xl font-black rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform"
          >
            <Mic className="w-8 h-8 text-amber-300" />
            <span>{isMarathi ? 'मालाचे नाव सांगा' : 'Speak Product Name'}</span>
          </button>

          {/* Fallback to Keypad link */}
          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={() => setStep('KEYPAD_FALLBACK')}
              className="text-stone-600 font-bold hover:text-stone-900 underline underline-offset-2"
            >
              {isMarathi
                ? '⌨️ माइक वापरू शकत नाही? हाताने किंमत भरा'
                : '⌨️ Cannot use mic? Enter manually'}
            </button>
            <span className="text-stone-400">|</span>
            <span className="text-stone-500 font-medium">
              {isMarathi ? 'भाषा: मराठी (mr-IN)' : 'Lang: Marathi (mr-IN)'}
            </span>
          </div>

          {/* Quick Simulation Bar for Hackathon Judging & Evaluation */}
          <div className="pt-3 border-t border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700">
                {isMarathi ? 'द्रुत चाचणी नमुने (१-टॅप व्हॉइस सिम्युलेशन):' : 'Quick Test (1-Tap Voice Simulation):'}
              </span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
                {isMarathi ? 'थेट मॅपिंग' : 'Instant Photo Map'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLE_SPEECH_TESTS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSimulateVoice(sample)}
                  className="p-2.5 text-xs font-bold rounded-xl border-2 border-stone-300 bg-stone-50 hover:bg-amber-100 text-stone-800 text-left transition-colors shadow-sm"
                >
                  <span className="font-black text-[#80141c] block">{sample.label}</span>
                  <span className="text-[10px] text-stone-500">"{sample.item} - {sample.pricePhrase}"</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP: LISTENING_ITEM or LISTENING_PRICE */}
      {(step === 'LISTENING_ITEM' || step === 'LISTENING_PRICE') && (
        <div className="flex flex-col items-center py-6">
          <div className="relative mb-4">
            <div className="w-24 h-24 bg-red-600 rounded-full animate-ping opacity-30 absolute inset-0"></div>
            <div className="w-24 h-24 bg-[#80141c] rounded-full flex items-center justify-center text-white shadow-xl relative">
              <Mic className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <p className="text-lg font-black text-stone-900 mb-4">
            {step === 'LISTENING_ITEM'
              ? isMarathi
                ? 'मालाचे नाव स्पष्ट उच्चारात बोला... (उदा. लिंबाचे लोणचे)'
                : 'Speak item name clearly... (e.g. Lemon pickle)'
              : isMarathi
              ? 'किंमत बोला (उदा. ६० रुपये, पन्नास, दीडशे)...'
              : 'Speak price (e.g. 60 rupees, 50, 150)...'}
          </p>

          <button
            type="button"
            onClick={resetForm}
            className="touch-target px-6 py-3 rounded-xl border-2 border-stone-400 bg-stone-100 font-bold text-stone-700 text-sm hover:bg-stone-200"
          >
            {isMarathi ? 'रद्द करा' : 'Cancel'}
          </button>
        </div>
      )}

      {/* STEP: CONFIRMATION_PENDING (Mandatory Voice Confirmation Loop + Instant Real Photo Mapping) */}
      {step === 'CONFIRMATION_PENDING' && (
        <div className="space-y-4">
          {/* Real Photo Preview Mapped from Dataset */}
          <div className="p-4 bg-amber-50 border-3 border-amber-600 rounded-2xl shadow-md text-center space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 pb-2 border-b border-amber-200">
              <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1">
                <Sparkle className="w-3 h-3 text-emerald-700" />
                {isMarathi ? 'डेटासेटमधून अस्सल फोटो मॅप झाला' : 'Mapped from Verified Dataset'}
              </span>
              <span className="text-stone-500">{locationName}</span>
            </div>

            {/* Photo Container */}
            <div className="relative w-44 h-36 mx-auto rounded-xl overflow-hidden bg-white border-2 border-amber-400 shadow-inner p-1">
              {previewMapped && (
                <img
                  src={previewMapped.imageUrl}
                  alt={previewMapped.nameMr}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                {isMarathi ? 'नोंदवलेला तपशील' : 'Spoken Details'}
              </span>
              <div className="text-2xl font-black text-stone-900 my-0.5">
                {previewMapped?.nameMr || itemName}
              </div>
              <div className="text-4xl font-extrabold text-[#14532d]">
                ₹ {isMarathi ? toDevanagariNumerals(price || 0) : price}
              </div>
              <p className="text-xs text-stone-600 mt-1 font-semibold">
                {previewMapped?.descriptionMr}
              </p>
            </div>
          </div>

          <div className="p-3 bg-stone-100 rounded-xl text-center text-xs font-bold text-stone-700">
            {isMarathi
              ? "🎙️ 'हो' किंवा 'नाही' बोला, किंवा खालील मोठे बटण दाबा:"
              : "🎙️ Say 'Yes' or 'No', or tap the large buttons below:"}
          </div>

          {/* High-contrast confirmation buttons (min-height >= 56px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={commitSaveProduct}
              className="touch-target min-h-[64px] bg-[#14532d] hover:bg-[#166534] text-white text-xl font-black rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 border-2 border-[#052e16]"
            >
              <Check className="w-7 h-7" />
              <span>{isMarathi ? 'हो, बरोबर आहे' : 'Yes, Correct'}</span>
            </button>

            <button
              type="button"
              onClick={handleReject}
              className="touch-target min-h-[64px] bg-rose-700 hover:bg-rose-800 text-white text-xl font-black rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 border-2 border-rose-900"
            >
              <X className="w-7 h-7" />
              <span>{isMarathi ? 'नाही, पुन्हा सांगा' : 'No, Repeat'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP: KEYPAD_FALLBACK */}
      {step === 'KEYPAD_FALLBACK' && (
        <div className="pt-2 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-bold text-stone-800">
              {isMarathi ? 'मालाचे नाव' : 'Product name'}
            </span>
            <input
              type="text"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              placeholder={isMarathi ? 'उदा. लिंबाचे लोणचे' : 'e.g. Lemon pickle'}
              maxLength={100}
              autoComplete="off"
              className="w-full min-h-12 rounded-xl border-2 border-stone-300 bg-white px-4 py-3 text-base font-semibold text-stone-900 focus:border-[#80141c] focus:outline-none"
            />
          </label>
          <FailSafeNumericKeypad
            lang={lang}
            initialValue={price ?? undefined}
            onConfirm={(manualPrice) => {
              const productName = itemName.trim();
              if (!productName) {
                setStatusPrompt(isMarathi ? 'कृपया आधी मालाचे नाव भरा.' : 'Please enter a product name first.');
                return;
              }
              setItemName(productName);
              setPrice(manualPrice);
              triggerConfirmationLoop(productName, manualPrice);
            }}
            onCancel={resetForm}
          />
        </div>
      )}
    </div>
  );
};
