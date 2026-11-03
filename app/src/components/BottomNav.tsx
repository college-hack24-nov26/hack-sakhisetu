import React from 'react';
import { Home, Sparkles, TrendingUp, ShoppingBag, PlusCircle, Plus } from 'lucide-react';
import { Language } from '../types';

export type TabType = 'home' | 'register' | 'studio' | 'rates' | 'shop' | 'ledger';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  lang: Language;
  cartCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  lang,
  cartCount = 0,
}) => {
  const isMarathi = lang === 'mr';

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-white/98 backdrop-blur-md border-t-2 border-stone-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-[max(env(safe-area-inset-bottom,0px),4px)]"
      role="navigation"
      aria-label="Bottom Navigation"
    >
      <div className="max-w-md md:max-w-xl mx-auto px-3 py-1.5 flex items-center justify-between">
        {/* 1. मुख्य (Home) */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 touch-target ${
            activeTab === 'home'
              ? 'text-[#EA580C] font-black'
              : 'text-stone-600 hover:text-stone-900 font-bold'
          }`}
        >
          <Home
            className={`w-6 h-6 transition-transform ${
              activeTab === 'home' ? 'scale-110 stroke-[2.5]' : 'stroke-[2]'
            }`}
          />
          <span className="text-[11px] sm:text-xs mt-0.5 tracking-tight">
            {isMarathi ? 'मुख्य' : 'Home'}
          </span>
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-0.5" />
          )}
        </button>

        {/* 2. विका (Sell / Voice Register) - Elevated Floating Center Button */}
        <div className="relative flex-1 flex flex-col items-center justify-center -mt-6">
          <button
            type="button"
            onClick={() => onSelectTab('register')}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white active:scale-90 transition-transform ${
              activeTab === 'register'
                ? 'bg-[#EA580C] ring-4 ring-orange-200'
                : 'bg-[#F59E0B] hover:bg-[#EA580C]'
            }`}
            aria-label={isMarathi ? 'विका (नवीन माल नोंदवा)' : 'Sell (List product)'}
            title={isMarathi ? 'आवाजाने नवीन माल नोंदवा' : 'Voice register new product'}
          >
            <Plus className="w-8 h-8 stroke-[3]" />
          </button>
          <span
            className={`text-[11px] sm:text-xs font-black mt-1 ${
              activeTab === 'register' ? 'text-[#EA580C]' : 'text-stone-800'
            }`}
          >
            {isMarathi ? 'विका' : 'Sell'}
          </span>
        </div>

        {/* 3. स्टुडिओ (AI Studio) */}
        <button
          type="button"
          onClick={() => onSelectTab('studio')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 touch-target ${
            activeTab === 'studio'
              ? 'text-[#EA580C] font-black'
              : 'text-stone-600 hover:text-stone-900 font-bold'
          }`}
        >
          <Sparkles
            className={`w-6 h-6 transition-transform ${
              activeTab === 'studio' ? 'scale-110 stroke-[2.5]' : 'stroke-[2]'
            }`}
          />
          <span className="text-[11px] sm:text-xs mt-0.5 tracking-tight">
            {isMarathi ? 'स्टुडिओ' : 'Studio'}
          </span>
          {activeTab === 'studio' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] mt-0.5" />
          )}
        </button>

        {/* 4. किंमत (Mandi Rates & Price Estimator) */}
        <button
          type="button"
          onClick={() => onSelectTab('rates')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 touch-target ${
            activeTab === 'rates'
              ? 'text-[#059669] font-black'
              : 'text-stone-600 hover:text-stone-900 font-bold'
          }`}
        >
          <TrendingUp
            className={`w-6 h-6 transition-transform ${
              activeTab === 'rates' ? 'scale-110 stroke-[2.5]' : 'stroke-[2]'
            }`}
          />
          <span className="text-[11px] sm:text-xs mt-0.5 tracking-tight">
            {isMarathi ? 'किंमत' : 'Price'}
          </span>
          {activeTab === 'rates' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-0.5" />
          )}
        </button>

        {/* 5. बाजार (Marketplace / Shop) */}
        <button
          type="button"
          onClick={() => onSelectTab('shop')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all active:scale-95 touch-target relative ${
            activeTab === 'shop'
              ? 'text-[#D97706] font-black'
              : 'text-stone-600 hover:text-stone-900 font-bold'
          }`}
        >
          <div className="relative">
            <ShoppingBag
              className={`w-6 h-6 transition-transform ${
                activeTab === 'shop' ? 'scale-110 stroke-[2.5]' : 'stroke-[2]'
              }`}
            />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#EA580C] text-white text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] sm:text-xs mt-0.5 tracking-tight">
            {isMarathi ? 'बाजार' : 'Bazaar'}
          </span>
          {activeTab === 'shop' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
