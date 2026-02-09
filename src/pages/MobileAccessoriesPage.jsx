import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Tag, Star, Zap, Clock } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';
import HeroSection from '@/components/ui/HeroSection';
import CategoryChips from '@/components/ui/CategoryChips';
import GlassCard from '@/components/ui/GlassCard';

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Premium Leather Mobile Cover', originalPrice: 499, discount: 20, status: 'Available', category: 'Covers', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80', badge: 'Best Seller', description: 'Premium quality leather mobile cover with enhanced shock protection and elegant design' },
  { id: 2, name: '9H Tempered Glass Guard', originalPrice: 299, discount: 50, status: 'Available', category: 'Screen Guards', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80', badge: 'Best Deal', description: '9H hardness tempered glass screen protector with oleophobic coating for ultimate protection' },
  { id: 3, name: '30W Fast Charger Adapter', originalPrice: 899, discount: 15, status: 'Available', category: 'Chargers', image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80', description: '30W fast charger with type-C cable included, compatible with all modern smartphones' },
  { id: 4, name: 'Wireless Earbuds Pro', originalPrice: 2499, discount: 30, status: 'Available', category: 'Earphones', image: 'https://images.unsplash.com/photo-1572569028738-411a09774e1f?auto=format&fit=crop&q=80', badge: 'New Arrival', description: 'Premium wireless earbuds with active noise cancellation and 24-hour battery life' },
  { id: 5, name: '10000mAh Power Bank', originalPrice: 1599, discount: 25, status: 'Out of Stock', category: 'Power Banks', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&q=80', badge: 'Limited Stock', description: 'Portable 10000mAh power bank with dual USB ports and fast charging support' },
  { id: 6, name: 'Smart Watch Series 7', originalPrice: 3999, discount: 40, status: 'Available', category: 'Smart Watches', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80', description: 'Feature-rich smart watch with fitness tracking, heart rate monitor, and waterproof design' },
  { id: 7, name: 'Bluetooth Speaker Mini', originalPrice: 1299, discount: 20, status: 'Available', category: 'Speakers', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80', description: 'Compact portable wireless bluetooth speaker with 360° surround sound and 12-hour playtime' },
];

function MobileAccessoriesPage() {
  const [products] = useLocalStorage('mobileAccessories', DEFAULT_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // Dynamically generate categories from products
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['All', ...uniqueCategories.sort()];
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  );

  const bestDeals = products
    .filter(p => p.discount >= 25 && p.status === 'Available')
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Premium Mobile Accessories - Covers, Chargers, Earphones, Power Banks</title>
        <meta name="description" content="Shop high-quality mobile accessories in Kichha. Best deals on covers, chargers, earphones, and more at SK Mobile Center." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pb-20">
        <HeroSection
          title="Premium Mobile Accessories"
          subtitle="Elevate your device with our curated collection of high-quality cases, chargers, and audio gear."
          badge="New Collection 2024"
          backgroundImage="https://images.unsplash.com/photo-1544011904-01ca6919a2bd"
          gradientOverlay="bg-gradient-to-r from-cyan-900/90 via-blue-900/80 to-purple-900/80"
          primaryAction={{ label: "Visit Store", onClick: () => window.location.href='/contact' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
          {/* Best Deals Section */}
          <div className="mb-16">
             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
               <Zap className="text-yellow-400 fill-yellow-400" /> Best Deals Today
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {bestDeals.map((product) => {
                 const finalPrice = Math.round(product.originalPrice * (1 - product.discount/100));
                 return (
                   <GlassCard key={product.id} className="p-4 flex items-center gap-4 bg-white/80 border-white/60">
                     <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                     <div>
                       <span className="text-xs font-bold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full mb-1 inline-block">{product.discount}% OFF</span>
                       <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                       <div className="flex items-center gap-2 mt-1">
                         <span className="text-lg font-bold text-green-600">₹{finalPrice}</span>
                         <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                       </div>
                     </div>
                   </GlassCard>
                 );
               })}
             </div>
          </div>

          {/* Main Catalog */}
          <div className="bg-white/30 backdrop-blur-xl rounded-[32px] p-6 border border-white/50 shadow-xl">
            <div className="mb-8">
              <CategoryChips
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {isLoading ? (
              <div className="h-64 flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                <p className="text-blue-600 font-medium">Loading collection...</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <AnimatePresence>
                  {filteredProducts.map((product) => {
                    const finalPrice = Math.round(product.originalPrice * (1 - product.discount/100));
                    return (
                      <GlassCard 
                        key={product.id} 
                        className="group p-0 h-full flex flex-col bg-white border-white/60"
                        hoverEffect={true}
                      >
                        {/* Image Area */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100 border-b border-gray-100">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          {product.discount > 0 && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              {product.discount}% OFF
                            </span>
                          )}
                          {product.badge && (
                            <span className={`absolute top-3 right-3 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-lg text-white
                              ${product.badge === 'Best Seller' ? 'bg-yellow-500' : product.badge === 'New Arrival' ? 'bg-blue-500' : 'bg-red-500'}`}>
                              {product.badge}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>

                          {product.description && (
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2">
                              {product.description}
                            </p>
                          )}

                          <div className="mt-auto pt-3">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-xl font-bold text-gray-900">₹{finalPrice}</span>
                              {product.discount > 0 && (
                                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileAccessoriesPage;