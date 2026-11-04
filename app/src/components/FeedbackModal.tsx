import React, { FormEvent, useState } from 'react';
import { MessageSquareText, X } from 'lucide-react';
import { Language } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, lang }) => {
  const isMarathi = lang === 'mr';
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('General');

  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = isMarathi ? 'बचत गट बाजार अभिप्राय' : 'Bachat Gat Bazaar feedback';
    const body = `${isMarathi ? 'विषय' : 'Topic'}: ${topic}\n\n${message.trim()}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-stone-900/65 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-heading"
        className="my-auto w-full max-w-lg overflow-hidden rounded-3xl border-2 border-stone-300 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-stone-200 bg-amber-50 p-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-amber-100 p-2 text-amber-900">
              <MessageSquareText className="h-6 w-6" />
            </span>
            <h2 id="feedback-heading" className="text-xl font-black text-stone-900">
              {isMarathi ? 'तुमचा अभिप्राय द्या' : 'Share your feedback'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="touch-target rounded-xl p-2 text-stone-600 hover:bg-stone-200"
            aria-label={isMarathi ? 'बंद करा' : 'Close'}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <label className="block text-sm font-bold text-stone-700">
            {isMarathi ? 'अभिप्रायाचा विषय' : 'Feedback topic'}
            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="mt-1 min-h-12 w-full rounded-xl border border-stone-300 bg-white px-3"
            >
              <option value="General">{isMarathi ? 'सामान्य सूचना' : 'General suggestion'}</option>
              <option value="Voice">{isMarathi ? 'आवाज / मराठी बोलणे' : 'Voice / Marathi speech'}</option>
              <option value="Product">{isMarathi ? 'उत्पादन किंवा लेबल' : 'Product or labeling'}</option>
              <option value="Delivery">{isMarathi ? 'डिलिव्हरी' : 'Delivery'}</option>
              <option value="Problem">{isMarathi ? 'समस्या कळवा' : 'Report a problem'}</option>
            </select>
          </label>

          <label className="block text-sm font-bold text-stone-700">
            {isMarathi ? 'तुमचा संदेश' : 'Your message'}
            <textarea
              required
              minLength={5}
              maxLength={2000}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              className="mt-1 w-full resize-y rounded-xl border border-stone-300 p-3 font-medium"
              placeholder={isMarathi ? 'काय चांगले आहे किंवा काय सुधारावे ते लिहा…' : 'Tell us what works well or what we can improve…'}
            />
          </label>

          <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm leading-relaxed text-amber-950">
            {isMarathi
              ? 'पाठवल्यावर तुमच्या डिव्हाइसचा ईमेल अॅप उघडेल. प्राप्तकर्त्याचा ईमेल पत्ता स्वतः भरा; सध्या अॅपमध्ये अभिप्रायासाठी पत्ता जोडलेला नाही.'
              : 'Submit opens your device’s email app. Enter the recipient address there; no feedback recipient is configured in the app yet.'}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="touch-target flex-1 rounded-xl border border-stone-300 px-4 py-3 font-bold text-stone-700 hover:bg-stone-50"
            >
              {isMarathi ? 'रद्द करा' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="touch-target flex-1 rounded-xl bg-amber-700 px-4 py-3 font-black text-white hover:bg-amber-800"
            >
              {isMarathi ? 'ईमेल मसुदा उघडा' : 'Open email draft'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
