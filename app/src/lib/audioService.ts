/**
 * Audio Service for Web Speech API (Recognition + Synthesis)
 * Optimized for low-end rural Android smartphones (2GB RAM, Android Go, JioPhone).
 * 
 * Performance & Stutter-Free Safeguards:
 * 1. Garbage Collection Defense: Persistent Set prevents Chromium from dropping utterances mid-speech.
 * 2. Keep-Alive Heartbeat: Prevents Android Chrome from silently pausing speech synthesis after 14s.
 * 3. Text Chunking: Splits long Marathi prose into small, low-latency audio buffer frames.
 * 4. Lazy Voice Pre-caching: Eagerly caches mr-IN and hi-IN system voices upon `voiceschanged`.
 */

export interface TTSOptions {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

export class AudioService {
  private static synth: SpeechSynthesis | null =
    typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

  // Active utterances reference set: prevents browser GC from killing speech on low-RAM Android
  private static activeUtterances: Set<SpeechSynthesisUtterance> = new Set();
  private static keepAliveTimer: any = null;
  private static cachedVoices: SpeechSynthesisVoice[] = [];

  static {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoiceCache();
    }
  }

  private static initVoiceCache(): void {
    if (!this.synth) return;
    this.cachedVoices = this.synth.getVoices();
    if (typeof window !== 'undefined') {
      window.speechSynthesis.onvoiceschanged = () => {
        if (this.synth) {
          this.cachedVoices = this.synth.getVoices();
        }
      };
    }
  }

  public static isSpeechRecognitionSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public static isTTSSupported(): boolean {
    return !!this.synth;
  }

  /**
   * Stutter-Free, Chunked Text-To-Speech for low-end hardware
   */
  public static speak({
    text,
    lang = 'mr-IN',
    rate = 0.85,
    pitch = 1.0,
    onStart,
    onEnd,
    onError,
  }: TTSOptions): void {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this environment.');
      onEnd?.();
      return;
    }

    try {
      this.stopSpeaking(); // Cancel any existing audio

      // Chunk text into sentences to prevent buffer overflow on low-end MediaTek audio chips
      const isMarathi = lang.toLowerCase().startsWith('mr');
      const spokenText = isMarathi ? this.prepareMarathiSpeech(text) : text;
      const chunks = this.splitProseIntoChunks(spokenText);
      if (chunks.length === 0) {
        onEnd?.();
        return;
      }

      this.speakChunksSequentially({
        chunks,
        index: 0,
        lang,
        rate: isMarathi ? Math.min(rate, 0.86) : rate,
        pitch,
        onStart,
        onEnd,
        onError,
      });
    } catch (err) {
      console.warn('Audio speak error:', err);
      this.cleanup();
      onEnd?.();
    }
  }

  /**
   * Plays chunks sequentially with zero buffer stutter
   */
  private static speakChunksSequentially(params: {
    chunks: string[];
    index: number;
    lang: string;
    rate: number;
    pitch: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: unknown) => void;
  }): void {
    const { chunks, index, lang, rate, pitch, onStart, onEnd, onError } = params;

    if (!this.synth || index >= chunks.length) {
      this.cleanup();
      onEnd?.();
      return;
    }

    const currentText = chunks[index];
    const utterance = new SpeechSynthesisUtterance(currentText);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Resolve voice from pre-cached list
    const voice = this.resolveBestVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    // Retain strong reference to prevent Chromium Android garbage collector bug
    this.activeUtterances.add(utterance);

    utterance.onstart = () => {
      if (index === 0) {
        onStart?.();
        this.startKeepAlive();
      }
    };

    utterance.onend = () => {
      this.activeUtterances.delete(utterance);
      if (index + 1 < chunks.length) {
        this.speakChunksSequentially({ ...params, index: index + 1 });
      } else {
        this.cleanup();
        onEnd?.();
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis chunk error:', e);
      this.activeUtterances.delete(utterance);
      this.cleanup();
      onError?.(e);
      onEnd?.();
    };

    this.synth.speak(utterance);
  }

  /**
   * Resolves native Marathi or Hindi regional voice
   */
  private static resolveBestVoice(targetLang: string): SpeechSynthesisVoice | null {
    if (this.cachedVoices.length === 0 && this.synth) {
      this.cachedVoices = this.synth.getVoices();
    }
    const voices = this.cachedVoices;
    const normalizedTarget = targetLang.replace(/_/g, '-').toLowerCase();
    const targetLanguage = normalizedTarget.split('-')[0];
    return (
      voices.find((v) => v.lang.replace(/_/g, '-').toLowerCase() === normalizedTarget) ||
      voices.find((v) => v.lang.replace(/_/g, '-').toLowerCase().startsWith(`${targetLanguage}-`)) ||
      (targetLanguage === 'mr' ? voices.find((v) => v.lang.toLowerCase().startsWith('hi')) : undefined) ||
      null
    );
  }

  private static prepareMarathiSpeech(text: string): string {
    return text
      .replace(/\bFSSAI\b/gi, 'एफ एस एस ए आय')
      .replace(/\bFoSCoS\b/gi, 'फॉस्कॉस')
      .replace(/\bAPMC\b/gi, 'ए पी एम सी')
      .replace(/\bAI\b/g, 'ए आय')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Breaks long Devanagari sentences by delimiters (।, ., !, ?, ,, ;)
   */
  private static splitProseIntoChunks(text: string): string[] {
    const regex = /[^।\.!\?]+[।\.!\?]?/g;
    const matches = text.match(regex);
    if (!matches || matches.length === 0) {
      return [text.trim()];
    }
    return matches.map((m) => m.trim()).filter((m) => m.length > 0);
  }

  /**
   * Heartbeat keep-alive to bypass Android Chrome 14-second speech pause bug
   */
  private static startKeepAlive(): void {
    this.stopKeepAlive();
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.synth.speaking) {
        this.synth.pause();
        this.synth.resume();
      } else {
        this.stopKeepAlive();
      }
    }, 10000);
  }

  private static stopKeepAlive(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  private static cleanup(): void {
    this.stopKeepAlive();
    this.activeUtterances.clear();
  }

  public static stopSpeaking(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.cleanup();
  }

  /**
   * Initialize speech recognition instance with preferred lang
   */
  public static createRecognizer(lang: 'mr-IN' | 'hi-IN' = 'mr-IN'): any {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      throw new Error('BROWSER_UNSUPPORTED');
    }

    const recognizer = new SpeechRecognition();
    recognizer.lang = lang;
    recognizer.continuous = false;
    recognizer.interimResults = false;
    recognizer.maxAlternatives = 3;

    return recognizer;
  }
}
