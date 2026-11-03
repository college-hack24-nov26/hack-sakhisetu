import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { Language } from '../types';
import { toDevanagariNumerals } from '../lib/marathiSpeechToNumber';

interface PriceEstimateBadgeProps {
  estimatedPrice: number;
  currentPrice: number;
  apmcRange?: { min: number; max: number };
  lang: Language;
}

export const PriceEstimateBadge: React.FC<PriceEstimateBadgeProps> = ({
  estimatedPrice,
  currentPrice,
  apmcRange,
  lang,
}) => {
  const isMarathi = lang === 'mr';

  const displayEstimated = isMarathi
    ? `₹${toDevanagariNumerals(estimatedPrice)}`
    : `₹${estimatedPrice}`;

  const difference = currentPrice - estimatedPrice;
  const isFair = Math.abs(difference) <= 25;

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-left">
      <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-amber-900 mb-1">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          {isMarathi ? 'अंदाजित बाजार भाव (AI Estimate)' : 'Market Estimate (AI Estimate)'}
        </span>
        <span className="font-mono text-stone-700 font-semibold">{displayEstimated}</span>
      </div>

      {apmcRange && (
        <div className="text-[10px] text-stone-500 font-medium">
          {isMarathi ? 'स्थानिक बाजार अंदाज: ' : 'Local APMC band: '}
          <span className="font-semibold text-stone-700">
            {isMarathi
              ? `₹${toDevanagariNumerals(apmcRange.min)} - ₹${toDevanagariNumerals(apmcRange.max)}`
              : `₹${apmcRange.min} - ₹${apmcRange.max}`}
          </span>
        </div>
      )}

      <p className="text-[9.5px] text-stone-500 mt-1 leading-tight flex items-start gap-1">
        <Info className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
        <span>
          {isMarathi
            ? '*हा दर हंगामी सरासरीवर आधारित संगणकीय अंदाज आहे. अंतिम दर बचत गट ठरवतात.'
            : '*Algorithmic seasonal estimate. Final price is set directly by the SHG.'}
        </span>
      </p>
    </div>
  );
};
