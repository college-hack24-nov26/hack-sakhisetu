import React, { FormEvent, useEffect, useState } from 'react';
import { Bike, Trash2 } from 'lucide-react';
import { Language } from '../types';

interface DeliveryPartner {
  id: string;
  name: string;
  phone: string;
  area: string;
}

interface DeliveryPartnerSectionProps {
  lang: Language;
}

const STORAGE_KEY = 'shg_bazaar_delivery_partners';

const isDeliveryPartner = (value: unknown): value is DeliveryPartner =>
  typeof value === 'object'
  && value !== null
  && 'id' in value
  && typeof value.id === 'string'
  && 'name' in value
  && typeof value.name === 'string'
  && 'phone' in value
  && typeof value.phone === 'string'
  && 'area' in value
  && typeof value.area === 'string';

export const DeliveryPartnerSection: React.FC<DeliveryPartnerSectionProps> = ({ lang }) => {
  const isMarathi = lang === 'mr';
  const [storageError, setStorageError] = useState(false);
  const [partners, setPartners] = useState<DeliveryPartner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];

      const parsed: unknown = JSON.parse(saved);
      if (!Array.isArray(parsed) || !parsed.every(isDeliveryPartner)) {
        console.warn('Saved delivery partner details have an unexpected format.');
        return [];
      }
      return parsed;
    } catch (error) {
      console.warn('Could not load delivery partner details:', error);
      return [];
    }
  });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(partners));
      setStorageError(false);
    } catch (error) {
      console.warn('Could not save delivery partner details:', error);
      setStorageError(true);
    }
  }, [partners]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPartner: DeliveryPartner = {
      id: `${Date.now()}-${phone}`,
      name: name.trim(),
      phone: phone.trim(),
      area: area.trim(),
    };

    setPartners((current) => [newPartner, ...current]);
    setName('');
    setPhone('');
    setArea('');
  };

  const removePartner = (id: string) => {
    setPartners((current) => current.filter((partner) => partner.id !== id));
  };

  return (
    <section
      aria-labelledby="delivery-partners-heading"
      className="rounded-3xl border-2 border-sky-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-700 text-white shadow-md">
          <Bike className="h-8 w-8" />
        </div>
        <div>
          <h3 id="delivery-partners-heading" className="text-xl font-black text-[#0F2942] sm:text-2xl">
            {isMarathi ? 'डिलिव्हरी पार्टनर नोंदणी' : 'Delivery partner registration'}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-stone-600 sm:text-base">
            {isMarathi
              ? 'ऑर्डर ग्राहकांपर्यंत पोहोचवण्यासाठी स्थानिक डिलिव्हरी पार्टनरची माहिती नोंदवा.'
              : 'Save a local delivery partner’s contact details to help coordinate product drop-offs.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-bold text-stone-700">
          {isMarathi ? 'पार्टनरचे नाव' : 'Partner name'}
          <input
            required
            pattern=".*\S.*"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="mt-1 min-h-12 w-full rounded-xl border border-stone-300 px-3 font-medium"
            placeholder={isMarathi ? 'पूर्ण नाव' : 'Full name'}
          />
        </label>
        <label className="text-sm font-bold text-stone-700">
          {isMarathi ? 'मोबाईल क्रमांक' : 'Mobile number'}
          <input
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            value={phone}
            onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
            className="mt-1 min-h-12 w-full rounded-xl border border-stone-300 px-3 font-medium"
            placeholder="9876543210"
            title={isMarathi ? '१० अंकी भारतीय मोबाईल क्रमांक भरा' : 'Enter a 10-digit Indian mobile number'}
          />
        </label>
        <label className="text-sm font-bold text-stone-700 sm:col-span-2">
          {isMarathi ? 'सेवा देण्याचे गाव / परिसर' : 'Village / service area'}
          <input
            required
            pattern=".*\S.*"
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="mt-1 min-h-12 w-full rounded-xl border border-stone-300 px-3 font-medium"
            placeholder={isMarathi ? 'गाव किंवा जवळचा परिसर' : 'Village or nearby area'}
          />
        </label>
        <label className="flex items-start gap-2 text-sm leading-relaxed text-stone-700 sm:col-span-2">
          <input required type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-sky-800" />
          <span>
            {isMarathi
              ? 'या व्यक्तीची संपर्क माहिती येथे नोंदवण्याची त्यांची परवानगी घेतली आहे.'
              : 'I have the person’s permission to save their contact details here.'}
          </span>
        </label>
        <button
          type="submit"
          className="touch-target rounded-2xl bg-sky-800 px-5 py-3 text-sm font-black text-white shadow-md transition-colors hover:bg-sky-900 sm:col-span-2"
        >
          {isMarathi ? 'डिलिव्हरी पार्टनर जतन करा' : 'Save delivery partner'}
        </button>
      </form>

      {partners.length > 0 && (
        <div className="mt-5 space-y-2">
          <h4 className="font-bold text-stone-800">
            {isMarathi ? 'नोंदवलेले पार्टनर' : 'Saved partners'}
          </h4>
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3">
              <div className="min-w-0">
                <p className="truncate font-bold text-stone-800">{partner.name}</p>
                <p className="text-sm text-stone-600">{partner.phone} · {partner.area}</p>
              </div>
              <button
                type="button"
                onClick={() => removePartner(partner.id)}
                className="touch-target shrink-0 rounded-lg p-2 text-red-700 hover:bg-red-50"
                aria-label={isMarathi ? `${partner.name} काढून टाका` : `Remove ${partner.name}`}
                title={isMarathi ? 'नोंद काढा' : 'Remove entry'}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {storageError && (
        <p role="alert" className="mt-4 rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-900">
          {isMarathi
            ? 'माहिती या डिव्हाइसवर जतन करता आली नाही. कृपया ब्राउझर स्टोरेज तपासा.'
            : 'Could not save these details on this device. Please check browser storage.'}
        </p>
      )}

      <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm font-semibold leading-relaxed text-amber-950">
        {isMarathi
          ? 'नोंद फक्त या डिव्हाइसवर जतन होते; पार्टनरला सूचना जात नाही आणि ऑर्डरचे वाटप/ट्रॅकिंग होत नाही. संपर्क माहिती फक्त परवानगीने नोंदवा.'
          : 'Entries are stored only on this device. This does not notify partners or assign/track deliveries. Save contact details only with permission.'}
      </p>
    </section>
  );
};
