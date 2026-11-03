import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShieldCheck, CheckCircle2, Truck, Smartphone } from 'lucide-react';
import { CartItem, Language, Order } from '../types';
import { toDevanagariNumerals } from '../lib/marathiSpeechToNumber';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOrderPlaced: (order: Order) => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderPlaced,
  lang,
}) => {
  const isMarathi = lang === 'mr';

  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ESCROW_UPI'>('COD');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert(
        isMarathi
          ? 'कृपया नाव, फोन नंबर आणि पत्ता भरा.'
          : 'Please provide full name, phone number, and address.'
      );
      return;
    }

    const order: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      totalAmount,
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod,
      timestamp: new Date().toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'CONFIRMED',
    };

    setPlacedOrder(order);
    onOrderPlaced(order);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden border-l-2 border-stone-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#faf7f2]">
          <h2 className="text-xl font-black text-stone-900">
            {isMarathi ? 'खरेदी पिशवी (Shopping Bag)' : 'Your Shopping Bag'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-600 hover:text-stone-900 font-bold"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Screen after Order Placement */}
        {placedOrder ? (
          <div className="p-6 flex-1 overflow-y-auto space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 border-3 border-emerald-600 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-[#14532d]">
                {isMarathi ? 'ऑर्डर यशस्वीरीत्या नोंदवली!' : 'Order Confirmed!'}
              </h3>
              <p className="text-xs text-stone-500 font-semibold mt-1">
                {isMarathi
                  ? `ऑर्डर क्रमांक: #${placedOrder.id}`
                  : `Order Reference: #${placedOrder.id}`}
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl text-left space-y-2 text-xs">
              <div className="font-bold text-stone-700 pb-2 border-b border-stone-200 flex justify-between">
                <span>{isMarathi ? 'ग्राहक:' : 'Customer:'} {placedOrder.customerName}</span>
                <span className="font-mono text-emerald-800 font-bold">
                  ₹{isMarathi ? toDevanagariNumerals(placedOrder.totalAmount) : placedOrder.totalAmount}
                </span>
              </div>
              <div>
                <span className="text-stone-500 block">{isMarathi ? 'डिलिव्हरी पत्ता:' : 'Delivery Address:'}</span>
                <span className="font-medium text-stone-800">{placedOrder.customerAddress}</span>
              </div>
              <div>
                <span className="text-stone-500 block">{isMarathi ? 'पेमेंट प्रकार:' : 'Payment Mode:'}</span>
                <span className="font-bold text-stone-900">
                  {placedOrder.paymentMethod === 'COD'
                    ? isMarathi ? '💵 रोख डिलिव्हरी (Cash on Delivery)' : '💵 Cash on Delivery'
                    : isMarathi ? '📱 चाचणी सुरक्षित UPI' : '📱 Demo Escrow UPI'}
                </span>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-[11px] text-amber-900 leading-relaxed text-left">
              <span className="font-bold block">
                {isMarathi ? 'पारदर्शकता सूचना:' : 'Compliance Notice:'}
              </span>
              {isMarathi
                ? 'हा माल थेट संबंधित महिला बचत गटाला कळवला जाईल. पैशांची देवाणघेवाण डिलिव्हरी वेळी थेट रोखीने किंवा अधिकृत बँकेच्या UPI द्वारे केली जाईल.'
                : 'Direct SHG dispatch initiated. Payments are finalized directly via Cash On Delivery or banking UPI.'}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="touch-target w-full py-3.5 bg-[#80141c] text-white font-bold text-base rounded-2xl shadow-lg hover:bg-[#5d0c12]"
            >
              {isMarathi ? 'दुकान पाहणे सुरू ठेवा' : 'Continue Shopping'}
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty Bag */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
              <Truck className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-stone-600">
              {isMarathi ? 'तुमची खरेदी पिशवी रिकामी आहे.' : 'Your shopping bag is empty.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#80141c] text-white font-bold text-sm"
            >
              {isMarathi ? 'माल निवडा' : 'Browse Catalog'}
            </button>
          </div>
        ) : (
          /* Cart List & Checkout Form */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Itemized List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-2xl"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.nameMr}
                    className="w-14 h-14 rounded-xl object-contain bg-white border border-stone-200 p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {isMarathi ? item.product.nameMr : item.product.nameEn}
                    </h4>
                    <span className="text-xs text-stone-500 font-semibold block truncate">
                      {isMarathi ? item.product.shgNameMr : item.product.shgNameEn}
                    </span>
                    <div className="text-sm font-black text-[#80141c] mt-0.5">
                      ₹{isMarathi ? toDevanagariNumerals(item.product.price) : item.product.price}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-1 hover:bg-stone-100 rounded-lg text-stone-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-5 text-center font-mono">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-1 hover:bg-stone-100 rounded-lg text-stone-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-stone-400 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total and Checkout Form */}
            <form onSubmit={handleCheckout} className="p-5 border-t border-stone-200 bg-[#faf7f2] space-y-4">
              {/* Subtotal */}
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-stone-700">
                  {isMarathi ? 'एकूण रक्कम:' : 'Total Amount:'}
                </span>
                <span className="text-3xl font-black text-[#14532d] tracking-tight">
                  ₹{isMarathi ? toDevanagariNumerals(totalAmount) : totalAmount}
                </span>
              </div>

              {/* Delivery Info Inputs */}
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isMarathi ? 'तुमचे पूर्ण नाव' : 'Your Full Name'}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:border-[#80141c] outline-none"
                />
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={isMarathi ? 'मोबाईल नंबर (उदा. 9822000000)' : 'Phone Number'}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:border-[#80141c] outline-none"
                />
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={isMarathi ? 'डिलिव्हरी पत्ता व पिनकोड' : 'Delivery Address & Pincode'}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-semibold focus:border-[#80141c] outline-none resize-none"
                />
              </div>

              {/* Payment Mode Selection */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-600 block">
                  {isMarathi ? 'पेमेंट पद्धत निवडा:' : 'Select Payment:'}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#80141c] bg-red-50 text-[#80141c] font-bold'
                        : 'border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      <Truck className="w-4 h-4" />
                      <span>{isMarathi ? 'रोख डिलिव्हरी (COD)' : 'Cash on Delivery'}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ESCROW_UPI')}
                    className={`p-2.5 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === 'ESCROW_UPI'
                        ? 'border-[#80141c] bg-red-50 text-[#80141c] font-bold'
                        : 'border-stone-300 bg-white text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs">
                      <Smartphone className="w-4 h-4" />
                      <span>{isMarathi ? 'सुरक्षित UPI (चाचणी)' : 'Escrow UPI (Demo)'}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Compliance Disclaimer */}
              <div className="text-[10px] text-stone-500 flex items-start gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  {isMarathi
                    ? 'थेट ग्रामीण बचत गटाला पाठिंबा. कुठलाही छुपा मध्यस्थ नाही.'
                    : 'Direct payment to rural SHG. No hidden intermediaries.'}
                </span>
              </div>

              {/* Checkout Submit CTA (min-height >= 56px) */}
              <button
                type="submit"
                className="touch-target w-full min-h-[56px] bg-[#14532d] hover:bg-[#166534] active:scale-95 text-white font-black text-lg rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <span>{isMarathi ? 'ऑर्डर निश्चित करा' : 'Place Order'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
