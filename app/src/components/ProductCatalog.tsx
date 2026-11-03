import React, { useState } from 'react';
import { Volume2, ShoppingBag, CheckCircle, Search, Filter, ArrowLeft } from 'lucide-react';
import { Product, Language } from '../types';
import { PriceEstimateBadge } from './PriceEstimateBadge';
import { VoiceHelpButton } from './VoiceHelpButton';
import { toDevanagariNumerals } from '../lib/marathiSpeechToNumber';
import { AudioService } from '../lib/audioService';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  successBannerMessage?: string | null;
  onDismissBanner?: () => void;
  onBack?: () => void;
  lang: Language;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  successBannerMessage,
  onDismissBanner,
  onBack,
  lang,
}) => {
  const isMarathi = lang === 'mr';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingProductId, setPlayingProductId] = useState<string | null>(null);

  const categories = [
    { id: 'all', mr: 'सर्व माल', en: 'All Goods' },
    { id: 'लोणचे व मसाले', mr: 'लोणचे व मसाले', en: 'Pickles & Spices' },
    { id: 'खाद्यपदार्थ व पापड', mr: 'खाद्यपदार्थ व पापड', en: 'Snacks & Papads' },
    { id: 'तेल व तूप', mr: 'तेल व तूप', en: 'Oils & Ghee' },
    { id: 'हस्तकला व गृहसजावट', mr: 'हस्तकला', en: 'Handicrafts' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      p.categoryMr === selectedCategory ||
      p.categoryEn === selectedCategory;

    const matchesSearch =
      p.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shgNameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.locationMr.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSpeakProduct = (product: Product) => {
    if (playingProductId === product.id) {
      AudioService.stopSpeaking();
      setPlayingProductId(null);
    } else {
      setPlayingProductId(product.id);
      AudioService.speak({
        text: product.audioDescriptionMr,
        lang: 'mr-IN',
        rate: 0.88,
        onEnd: () => setPlayingProductId(null),
        onError: () => setPlayingProductId(null),
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Prominent Success Banner when product is voice-added */}
      {successBannerMessage && (
        <div className="p-4 sm:p-5 bg-emerald-50 border-3 border-emerald-600 rounded-3xl flex items-center justify-between shadow-lg ring-4 ring-emerald-100 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
              ✓
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-black text-emerald-950">
                {successBannerMessage}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                {isMarathi
                  ? 'माल आता थेट ग्राहकांना खरेदीसाठी व तपासण्यासाठी उपलब्ध झाला आहे.'
                  : 'Item is now saved to database and live in the marketplace.'}
              </p>
            </div>
          </div>
          {onDismissBanner && (
            <button
              type="button"
              onClick={onDismissBanner}
              className="text-emerald-800 hover:text-emerald-950 font-black p-2 text-base rounded-lg hover:bg-emerald-100 shrink-0"
              aria-label="Dismiss banner"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Category Filter and Search Toolbar */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-sm space-y-4">
        {onBack && (
          <div className="pb-3 border-b border-stone-200">
            <button
              type="button"
              onClick={onBack}
              className="touch-target inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-stone-300 hover:border-stone-500 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#EA580C]" />
              <span>{isMarathi ? '← मागे जा' : '← Back to Home'}</span>
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-stone-900">
              {isMarathi ? 'बचत गट बाजारपेठ' : 'SHG Marketplace'}
            </h1>
            <p className="text-xs md:text-sm font-semibold text-stone-600 mt-0.5">
              {isMarathi
                ? 'महिला बचत गटांनी स्वतः तयार केलेला अस्सल माल, थेट खरेदी करा'
                : 'Directly buy authentic handmade goods crafted by rural women groups'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <VoiceHelpButton
              lang={lang}
              textToSpeak={
                isMarathi
                  ? 'या दुकानातून तुम्ही ग्रामीण महिला बचत गटांनी हाताने तयार केलेले अस्सल पदार्थ थेट मागवू शकता. मालाची माहिती ऐकण्यासाठी पिवळे स्पीकर बटण दाबा.'
                  : 'In this shop you can directly order authentic products made by rural women SHGs. Tap the yellow speaker button on any item to hear details.'
              }
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isMarathi
                ? 'मालाचे नाव, बचत गट किंवा गाव शोधा (उदा. लोणचे, सातारा)...'
                : 'Search product, SHG, or village (e.g. Pickle, Satara)...'
            }
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-300 rounded-2xl text-stone-900 font-semibold text-sm focus:border-[#80141c] focus:bg-white outline-none"
          />
        </div>

        {/* Categories Segmented Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-stone-500 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#80141c] text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
              }`}
            >
              {isMarathi ? cat.mr : cat.en}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const isPlayingThis = playingProductId === product.id;
          const priceDisplay = isMarathi
            ? `₹${toDevanagariNumerals(product.price)}`
            : `₹${product.price}`;

          return (
            <div
              key={product.id}
              className="bg-white border-2 border-stone-300 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Product Image Lead (65%-75% visual prominence) */}
                <div className="relative w-full aspect-4/3 bg-stone-100 border-b border-stone-200 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={isMarathi ? product.nameMr : product.nameEn}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* SHG Location Chip */}
                  <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>{isMarathi ? product.locationMr : product.locationEn}</span>
                  </div>

                  {/* Distinctive 'Voice Added' Badge */}
                  {product.isVoiceAdded && (
                    <div className="absolute bottom-3 left-3 bg-[#80141c] text-amber-300 text-[11px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-lg border border-amber-400">
                      <span>🎙️</span>
                      <span>{isMarathi ? 'व्हॉइस नोंदणी (Voice Added)' : 'Voice Added'}</span>
                    </div>
                  )}

                  {/* Spoken Audio Button for Accessibility */}
                  <button
                    type="button"
                    onClick={() => handleSpeakProduct(product)}
                    className={`touch-target absolute top-3 right-3 p-2.5 rounded-full shadow-lg border-2 transition-transform active:scale-90 ${
                      isPlayingThis
                        ? 'bg-amber-400 text-stone-900 border-amber-600 ring-2 ring-amber-300 animate-pulse'
                        : 'bg-white hover:bg-amber-100 text-stone-800 border-stone-300'
                    }`}
                    title={isMarathi ? 'माहिती मोठ्याने ऐका' : 'Listen to product audio description'}
                    aria-label="Speak product details"
                  >
                    <Volume2 className="w-5 h-5 text-amber-900" />
                  </button>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  {/* SHG Verified Header */}
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">
                      {isMarathi ? product.shgNameMr : product.shgNameEn}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-xl font-black text-stone-900 leading-snug">
                    {isMarathi ? product.nameMr : product.nameEn}
                  </h3>

                  {/* Price & Weight Unit */}
                  <div className="flex items-baseline justify-between pt-1">
                    <div className="text-3xl font-black text-[#80141c] tracking-tight">
                      {priceDisplay}
                    </div>
                    <span className="text-xs text-stone-600 font-bold bg-stone-100 px-2.5 py-1 rounded-lg">
                      {isMarathi ? product.unitMr : product.unitEn}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {isMarathi ? product.descriptionMr : product.descriptionEn}
                  </p>

                  {/* Price Estimate Badge (Strict Compliance Guardrail) */}
                  <PriceEstimateBadge
                    estimatedPrice={product.estimatedMarketPrice}
                    currentPrice={product.price}
                    apmcRange={product.apmcRange}
                    lang={lang}
                  />
                </div>
              </div>

              {/* Card Footer: Large Buy CTA (>= 56px touch target) */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="touch-target w-full min-h-[56px] bg-[#14532d] hover:bg-[#166534] active:scale-95 text-white font-black text-lg rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{isMarathi ? 'खरेदी करा (पिशवीत टाका)' : 'Add to Bag'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
