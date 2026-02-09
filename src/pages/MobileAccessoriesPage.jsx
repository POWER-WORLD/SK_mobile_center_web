import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Tag, Star, Zap, Clock } from 'lucide-react';
import { accessoriesAPI } from '@/services/api';
import HeroSection from '@/components/ui/HeroSection';
import CategoryChips from '@/components/ui/CategoryChips';
import GlassCard from '@/components/ui/GlassCard';

function MobileAccessoriesPage() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setIsLoading(true);
        const data = await accessoriesAPI.getAll();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch accessories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  // Dynamically generate categories from products
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['All', ...uniqueCategories.sort()];
  }, [products]);

  const filteredProducts = products.filter(p => 
    activeCategory === 'All' || p.category === activeCategory
  );

  const bestDeals = products
    .filter(p => p.stock_status === 'in_stock')
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
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading accessories...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-32">
              <p className="text-red-600 font-medium">Failed to load accessories. Please try again later.</p>
            </div>
          ) : (
            <>
              {/* Best Deals Section */}
              {bestDeals.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="text-yellow-400 fill-yellow-400" /> Best Deals Today
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bestDeals.map((product) => {
                      return (
                        <GlassCard key={product.id} className="p-4 flex items-center gap-4 bg-white/80 border-white/60">
                          <img src={product.image_url || 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80'} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                          <div>
                            <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-bold text-green-600">₹{parseFloat(product.price).toFixed(0)}</span>
                            </div>
                            <span className="text-xs text-gray-500">{product.brand || 'Generic'}</span>
                          </div>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Main Catalog */}
              <div className="bg-white/30 backdrop-blur-xl rounded-[32px] p-6 border border-white/50 shadow-xl">
                <div className="mb-8">
                  <CategoryChips
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                  />
                </div>

                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  <AnimatePresence>
                    {filteredProducts.map((product) => {
                      return (
                        <GlassCard 
                          key={product.id} 
                          className="group p-0 h-full flex flex-col bg-white border-white/60"
                          hoverEffect={true}
                        >
                        {/* Image Area */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100 border-b border-gray-100">
                          <img 
                            src={product.image_url || 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&q=80'} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                          {product.stock_status !== 'in_stock' && (
                            <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                              Out of Stock
                            </span>
                          )}
                          {product.brand && (
                            <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-lg text-white bg-blue-500">
                              {product.brand}
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
                              <span className="text-xl font-bold text-gray-900">₹{parseFloat(product.price).toFixed(0)}</span>
                              {product.category && (
                                <span className="text-xs text-gray-500">{product.category}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MobileAccessoriesPage;