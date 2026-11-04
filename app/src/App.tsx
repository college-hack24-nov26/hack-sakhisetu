/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { BottomNav, TabType } from './components/BottomNav';
import { ProductCatalog } from './components/ProductCatalog';
import { VoiceProductRegistration } from './components/VoiceProductRegistration';
import { AIMagicStudio } from './components/AIMagicStudio';
import { MandiRatesView } from './components/MandiRatesView';
import { SHGLedger } from './components/SHGLedger';
import { CartDrawer } from './components/CartDrawer';
import { ComplianceModal } from './components/ComplianceModal';
import { FeedbackModal } from './components/FeedbackModal';
import { INITIAL_PRODUCTS, mapSpokenItemToRealPhoto } from './data/mockProducts';
import { Product, CartItem, Order, Language } from './types';
import { AudioService } from './lib/audioService';
import mrMessages from './messages/mr.json';
import enMessages from './messages/en.json';

export default function App() {
  const [lang, setLang] = useState<Language>('mr');
  // Default to 'home' matching the screenshot
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [successBannerMessage, setSuccessBannerMessage] = useState<string | null>(null);
  const [isComplianceOpen, setIsComplianceOpen] = useState<boolean>(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  // Persisted or initial products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shg_bazaar_products');
      if (!saved) return INITIAL_PRODUCTS;

      const savedProducts: Product[] = JSON.parse(saved);
      return savedProducts.map((product) =>
        product.imageUrl?.startsWith('data:image/svg+xml')
          ? { ...product, imageUrl: mapSpokenItemToRealPhoto(product.nameMr).imageUrl }
          : product
      );
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shg_bazaar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Placed orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('shg_bazaar_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Synchronize browser history for permanent Back button support
  useEffect(() => {
    const handlePopState = () => {
      setActiveTab('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTab = (newTab: TabType) => {
    if (newTab !== activeTab) {
      try {
        window.history.pushState({ tab: newTab }, '', `?tab=${newTab}`);
      } catch {
        // ignore
      }
      setActiveTab(newTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('shg_bazaar_products', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('shg_bazaar_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('shg_bazaar_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [orders]);

  const isMarathi = lang === 'mr';
  const messages = isMarathi ? mrMessages : enMessages;

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'mr' ? 'en' : 'mr'));
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Connects Voice Registration directly to Marketplace with Banner and Voice Added badge
  const handleProductSaved = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);

    // Exact requested banner copy
    const bannerMsg = isMarathi
      ? `छान! ${newProduct.nameMr} बाजारपेठेत जोडले गेले आहे.`
      : `Great! ${newProduct.nameEn} has been added to the marketplace.`;

    setSuccessBannerMessage(bannerMsg);
    navigateTab('shop');

    // Verbal confirmation announcement
    AudioService.speak({
      text: bannerMsg,
      lang: isMarathi ? 'mr-IN' : 'en-US',
      rate: 0.88,
    });
  };

  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col bg-[#FAF7F2] text-stone-900 font-['Noto_Sans_Devanagari',sans-serif] pb-32 sm:pb-28">
      {/* Top Bar Header matching screenshot layout */}
      <Header
        activeTab={activeTab}
        setActiveTab={navigateTab}
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenCompliance={() => setIsComplianceOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {activeTab === 'home' && (
          <HomeDashboard
            lang={lang}
            onNavigate={navigateTab}
            onOpenCompliance={() => setIsComplianceOpen(true)}
          />
        )}

        {activeTab === 'register' && (
          <VoiceProductRegistration
            onProductSaved={handleProductSaved}
            onBack={() => navigateTab('home')}
            lang={lang}
          />
        )}

        {activeTab === 'studio' && (
          <AIMagicStudio
            products={products}
            onUseEnhancedPhoto={() => {
              navigateTab('register');
            }}
            onBack={() => navigateTab('home')}
            lang={lang}
          />
        )}

        {activeTab === 'rates' && (
          <MandiRatesView
            lang={lang}
            onBack={() => navigateTab('home')}
            onNavigateToRegister={() => navigateTab('register')}
          />
        )}

        {activeTab === 'shop' && (
          <ProductCatalog
            products={products}
            onAddToCart={handleAddToCart}
            successBannerMessage={successBannerMessage}
            onDismissBanner={() => setSuccessBannerMessage(null)}
            onBack={() => navigateTab('home')}
            lang={lang}
          />
        )}

        {activeTab === 'ledger' && (
          <SHGLedger
            products={products}
            orders={orders}
            onBack={() => navigateTab('home')}
            lang={lang}
          />
        )}
      </main>

      {/* Pinned Bottom Navigation Bar matching screenshot */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={navigateTab}
        lang={lang}
        cartCount={totalCartCount}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOrderPlaced={handleOrderPlaced}
        lang={lang}
      />

      {/* Compliance & Truthfulness Audit Modal for Hackathon Judges */}
      <ComplianceModal
        isOpen={isComplianceOpen}
        onClose={() => setIsComplianceOpen(false)}
        lang={lang}
      />
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        lang={lang}
      />
    </div>
  );
}
