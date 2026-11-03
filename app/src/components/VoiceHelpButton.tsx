import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AudioService } from '../lib/audioService';
import { Language } from '../types';

interface VoiceHelpButtonProps {
  textToSpeak: string;
  lang?: Language;
  label?: string;
}

export const VoiceHelpButton: React.FC<VoiceHelpButtonProps> = ({
  textToSpeak,
  lang = 'mr',
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      AudioService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      AudioService.speak({
        text: textToSpeak,
        lang: lang === 'mr' ? 'mr-IN' : 'en-US',
        rate: 0.88,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const buttonText = label || (lang === 'mr' ? 'मदत ऐका' : 'Listen Help');

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`touch-target inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 ${
        isPlaying
          ? 'bg-amber-400 text-stone-900 border-2 border-amber-600 ring-2 ring-amber-300 animate-pulse'
          : 'bg-amber-100 hover:bg-amber-200 text-stone-900 border-2 border-amber-500'
      }`}
      aria-label={buttonText}
      title={lang === 'mr' ? 'सूचना मोठ्याने ऐकण्यासाठी येथे दाबा' : 'Click to hear instructions aloud'}
    >
      {isPlaying ? (
        <>
          <VolumeX className="w-5 h-5 text-stone-900" />
          <span className="whitespace-nowrap">{lang === 'mr' ? 'थांबवा' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 text-amber-800" />
          <span className="whitespace-nowrap">{buttonText}</span>
        </>
      )}
    </button>
  );
};
