import React from 'react';
import { BookOpen, DollarSign, Package, Users, Award, ArrowLeft } from 'lucide-react';
import { Product, Order, Language } from '../types';
import { toDevanagariNumerals } from '../lib/marathiSpeechToNumber';
import { VoiceHelpButton } from './VoiceHelpButton';
import { AudioService } from '../lib/audioService';

interface SHGLedgerProps {
  products: Product[];
  orders: Order[];
  onBack?: () => void;
  lang: Language;
}

export const SHGLedger: React.FC<SHGLedgerProps> = ({ products, orders, onBack, lang }) => {
  const isMarathi = lang === 'mr';

  const totalRegisteredProducts = products.length;
  const totalSalesCount = products.reduce((acc, p) => acc + p.salesCount, 0);
  const totalEarnings = products.reduce((acc, p) => acc + p.price * p.salesCount, 0);

  const handleReadLedgerAloud = () => {
    const text = isMarathi
      ? `बचत गट नोंदवही अहवाल: एकूण नोंदवलेला माल ${totalRegisteredProducts} वस्तू. एकूण विक्री ${totalSalesCount} नग. एकूण जमा झालेली रक्कम ${totalEarnings} रुपये.`
      : `SHG Ledger Report: Total listed products ${totalRegisteredProducts}. Total units sold ${totalSalesCount}. Total accumulated earnings ${totalEarnings} rupees.`;

    AudioService.speak({
      text,
      lang: isMarathi ? 'mr-IN' : 'en-US',
      rate: 0.88,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Ledger Header */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-6 shadow-sm">
        {onBack && (
          <div className="pb-3 mb-3 border-b border-stone-200">
            <button
              type="button"
              onClick={onBack}
              className="touch-target inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-stone-300 hover:border-stone-500 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#80141c]" />
              <span>{isMarathi ? 'मागे जा (दुकान / बाजारपेठ)' : 'Back to Marketplace'}</span>
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
                <BookOpen className="w-6 h-6 text-amber-700" />
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-stone-900">
                {isMarathi ? 'बचत गट हिशोब नोंदवही' : 'SHG Accounting Ledger'}
              </h1>
            </div>
            <p className="text-xs md:text-sm font-semibold text-stone-600 mt-1">
              {isMarathi
                ? 'विक्री, नफा आणि महिला सदस्यांच्या लाभांशाची पारदर्शक नोंद'
                : 'Transparent record of sales, revenue, and SHG member distribution'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReadLedgerAloud}
              className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm bg-amber-100 hover:bg-amber-200 text-stone-900 border-2 border-amber-500 shadow-sm"
            >
              <span>📢</span>
              <span>{isMarathi ? 'हिशोब ऐका' : 'Listen Ledger'}</span>
            </button>
            <VoiceHelpButton
              lang={lang}
              textToSpeak={
                isMarathi
                  ? 'या नोंदवहीत तुम्ही तुमच्या बचत गटाचा एकूण विकलेला माल आणि जमा झालेली रक्कम तपासू शकता. हिशोब ऐका बटण दाबल्यास अहवाल ऐकता येईल.'
                  : 'Here you can inspect total products sold and revenue. Tap Listen Ledger to hear the balance aloud.'
              }
            />
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
              <DollarSign className="w-4 h-4 text-emerald-800" />
              <span>{isMarathi ? 'एकूण जमा रक्कम' : 'Total Revenue'}</span>
            </div>
            <div className="text-3xl font-black text-[#14532d] mt-2 font-mono">
              ₹ {isMarathi ? toDevanagariNumerals(totalEarnings) : totalEarnings.toLocaleString()}
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              {isMarathi ? '*थेट बचत गट खात्यासाठी' : '*Direct for SHG accounts'}
            </span>
          </div>

          <div className="p-4 bg-stone-50 border-2 border-stone-300 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
              <Package className="w-4 h-4 text-amber-700" />
              <span>{isMarathi ? 'एकूण विकलेले नग' : 'Units Sold'}</span>
            </div>
            <div className="text-3xl font-black text-stone-900 mt-2 font-mono">
              {isMarathi ? toDevanagariNumerals(totalSalesCount) : totalSalesCount}
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              {isMarathi ? 'ग्राहकांपर्यंत पोहोचवला' : 'Delivered to buyers'}
            </span>
          </div>

          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-600">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>{isMarathi ? 'सक्रिय महिला सदस्य' : 'Active Members'}</span>
            </div>
            <div className="text-3xl font-black text-stone-900 mt-2 font-mono">
              {isMarathi ? toDevanagariNumerals(12) : 12}
            </div>
            <span className="text-[11px] text-stone-500 font-medium mt-1 block">
              {isMarathi ? 'नियमित उत्पादन करणाऱ्या' : 'Regular producers'}
            </span>
          </div>
        </div>
      </div>

      {/* Product Stock & Sales Table */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-black text-stone-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#80141c]" />
          <span>{isMarathi ? 'मालाचा तपशील व विक्री विवरण' : 'Inventory & Sales Breakdown'}</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b-2 border-stone-200 text-stone-600 font-bold">
                <th className="pb-3">{isMarathi ? 'मालाचे नाव' : 'Product'}</th>
                <th className="pb-3">{isMarathi ? 'बचत गट' : 'SHG Group'}</th>
                <th className="pb-3 text-right">{isMarathi ? 'किंमत' : 'Price'}</th>
                <th className="pb-3 text-right">{isMarathi ? 'विक्री नग' : 'Units Sold'}</th>
                <th className="pb-3 text-right">{isMarathi ? 'एकूण उत्पन्न' : 'Revenue'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p) => {
                const subtotal = p.price * p.salesCount;
                return (
                  <tr key={p.id} className="hover:bg-stone-50">
                    <td className="py-3 font-bold text-stone-900">
                      {isMarathi ? p.nameMr : p.nameEn}
                    </td>
                    <td className="py-3 text-stone-600">{isMarathi ? p.shgNameMr : p.shgNameEn}</td>
                    <td className="py-3 text-right font-mono font-bold text-stone-800">
                      ₹{isMarathi ? toDevanagariNumerals(p.price) : p.price}
                    </td>
                    <td className="py-3 text-right font-mono font-semibold text-stone-700">
                      {isMarathi ? toDevanagariNumerals(p.salesCount) : p.salesCount}
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-[#14532d]">
                      ₹{isMarathi ? toDevanagariNumerals(subtotal) : subtotal.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders Log if any */}
      {orders.length > 0 && (
        <div className="bg-white border-2 border-stone-300 rounded-3xl p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-black text-stone-900">
            {isMarathi ? 'नुकत्याच आलेल्या ऑनलाइन ऑर्डर्स' : 'Recent Inbound Orders'}
          </h2>
          <div className="space-y-2">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-bold text-stone-900">#{ord.id}</span>
                  <span className="text-stone-500 ml-2">({ord.timestamp})</span>
                  <p className="text-stone-700 font-medium">
                    {ord.customerName} · {ord.customerAddress}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-base text-[#14532d]">
                    ₹{isMarathi ? toDevanagariNumerals(ord.totalAmount) : ord.totalAmount}
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg text-[11px]">
                    {ord.paymentMethod === 'COD' ? 'रोख (COD)' : 'UPI Escrow'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
