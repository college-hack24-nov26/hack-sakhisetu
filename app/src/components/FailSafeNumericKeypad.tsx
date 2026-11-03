import React, { useState } from 'react';
import { Delete, Check, AlertCircle } from 'lucide-react';
import { Language } from '../types';
import { toDevanagariNumerals } from '../lib/marathiSpeechToNumber';

interface KeypadProps {
  initialValue?: number;
  onConfirm: (val: number) => void;
  onCancel?: () => void;
  lang?: Language;
}

const KEYS = [
  { dev: '१', en: '1' },
  { dev: '२', en: '2' },
  { dev: '३', en: '3' },
  { dev: '४', en: '4' },
  { dev: '५', en: '5' },
  { dev: '६', en: '6' },
  { dev: '७', en: '7' },
  { dev: '८', en: '8' },
  { dev: '९', en: '9' },
  { dev: 'पुसा (C)', en: 'CLEAR', isAction: true },
  { dev: '०', en: '0' },
  { dev: 'जतन करा', en: 'OK', isAction: true },
];

const PRESETS = [50, 100, 150, 200, 250];

export const FailSafeNumericKeypad: React.FC<KeypadProps> = ({
  initialValue,
  onConfirm,
  onCancel,
  lang = 'mr',
}) => {
  const isMarathi = lang === 'mr';
  const [displayStr, setDisplayStr] = useState<string>(
    initialValue && initialValue > 0 ? String(initialValue) : ''
  );

  const handleKeyPress = (key: string) => {
    if (key === 'CLEAR') {
      setDisplayStr('');
    } else if (key === 'OK') {
      const parsed = parseInt(displayStr, 10);
      if (!isNaN(parsed) && parsed > 0) {
        onConfirm(parsed);
      }
    } else {
      if (displayStr.length < 5) {
        setDisplayStr((prev) => prev + key);
      }
    }
  };

  const handlePresetClick = (amount: number) => {
    setDisplayStr(String(amount));
  };

  const currentNumber = parseInt(displayStr, 10) || 0;
  const devanagariDisplay = toDevanagariNumerals(currentNumber);

  return (
    <div className="w-full max-w-sm mx-auto bg-white border-3 border-stone-800 rounded-3xl p-5 shadow-2xl">
      {/* Fallback Warning Banner */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-200">
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1.5 rounded-full">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>{isMarathi ? 'माइक बंद / हाताने किंमत भरा' : 'Mic Off / Manual Numeric Entry'}</span>
        </div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-stone-500 hover:text-stone-900 font-black p-1 text-base"
            aria-label="Cancel"
          >
            ✕
          </button>
        )}
      </div>

      {/* Screen Value Display */}
      <div className="w-full min-h-[72px] bg-amber-50 border-3 border-amber-600 rounded-2xl flex items-center justify-between px-4 mb-3 shadow-inner">
        <span className="text-sm font-bold text-stone-500">{isMarathi ? 'रुपये' : 'INR'}</span>
        <div className="text-right">
          <div className="text-3xl font-black text-stone-900 tracking-wider">
            ₹ {isMarathi ? devanagariDisplay : currentNumber || '0'}
          </div>
          {currentNumber > 0 && isMarathi && (
            <div className="text-xs text-stone-600 font-mono">({currentNumber} ₹)</div>
          )}
        </div>
      </div>

      {/* Quick Rural Presets */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
        <span className="text-[11px] font-bold text-stone-500 shrink-0">
          {isMarathi ? 'नेहमीचे दर:' : 'Common:'}
        </span>
        {PRESETS.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => handlePresetClick(amt)}
            className="px-2.5 py-1 text-xs font-bold rounded-lg border border-stone-300 bg-stone-100 hover:bg-stone-200 text-stone-800 shrink-0"
          >
            ₹{isMarathi ? toDevanagariNumerals(amt) : amt}
          </button>
        ))}
      </div>

      {/* 64px Large Touch Targets */}
      <div className="grid grid-cols-3 gap-2.5">
        {KEYS.map((k) => {
          const isSubmit = k.en === 'OK';
          const isClear = k.en === 'CLEAR';

          return (
            <button
              key={k.en}
              type="button"
              onClick={() => handleKeyPress(k.en)}
              className={`min-h-[64px] min-w-[64px] text-xl font-black rounded-2xl border-2 shadow-sm active:scale-90 transition-all flex flex-col items-center justify-center p-1 ${
                isSubmit
                  ? 'bg-[#14532d] hover:bg-[#166534] text-white border-[#052e16] shadow-md'
                  : isClear
                  ? 'bg-rose-700 hover:bg-rose-800 text-white border-rose-900 text-sm'
                  : 'bg-white hover:bg-amber-50 text-stone-900 border-stone-400'
              }`}
            >
              {isSubmit ? (
                <div className="flex flex-col items-center">
                  <Check className="w-6 h-6 mb-0.5" />
                  <span className="text-xs font-bold">{isMarathi ? 'जतन' : 'Save'}</span>
                </div>
              ) : isClear ? (
                <div className="flex flex-col items-center">
                  <Delete className="w-5 h-5 mb-0.5" />
                  <span className="text-xs font-bold">{isMarathi ? 'पुसा' : 'Clear'}</span>
                </div>
              ) : (
                <>
                  <span className="text-2xl leading-none">{k.dev}</span>
                  <span className="text-[11px] text-stone-500 font-sans font-normal mt-0.5">
                    {k.en}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
