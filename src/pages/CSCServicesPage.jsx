import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FileText, CreditCard, Printer, Scan, Shield, Heart, Users, 
  Landmark, Plane, Train, Zap, Smartphone, FileCheck, Award, 
  Clipboard, WalletCards as IdCard, CheckCircle, Lock, Building, Loader2
} from 'lucide-react';
import { cscServicesAPI } from '@/services/api';
import HeroSection from '@/components/ui/HeroSection';
import CategoryChips from '@/components/ui/CategoryChips';
import GlassCard from '@/components/ui/GlassCard';
import TrustBadge from '@/components/ui/TrustBadge';

const ICON_MAP = {
  'Online Form Filling': FileText,
  'Aadhaar Services': IdCard,
  'PAN Card': CreditCard,
  'Ayushman Card': Heart,
  'Ration Card': Users,
  'Certificates': FileCheck,
  'PM Schemes': Award,
  'Insurance': Shield,
  'Pension': Landmark,
  'Digital Seva': Clipboard,
  'Printing & Scan': Printer,
  'Scanning & Photocopy': Scan,
  'Passport/Visa': Plane,
  'Ticket Booking': Train,
  'Bill Payments': Zap,
  'Banking & Money Transfer': Smartphone
};

function CSCServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await cscServicesAPI.getAll();
        setServices(data);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch CSC services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Dynamically generate categories from services
  const categories = React.useMemo(() => {
    const uniqueCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
    return ['All', ...uniqueCategories.sort()];
  }, [services]);

  const filteredServices = services.filter(s =>
    s.is_active && (activeCategory === 'All' || s.category === activeCategory)
  );

  return (
    <>
      <Helmet>
        <title>CSC / Jan Seva Kendra Services - Aadhaar, PAN, Bills, Certificates</title>
        <meta name="description" content="Authorized CSC / Jan Seva Kendra in Kichha. Services include Aadhaar, PAN Card, Money Transfer, Bill Payments, and Government Schemes." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pb-20">
        <HeroSection
          title="Digital Services at Your Doorstep"
          subtitle="One-stop destination for all government and digital services. Secure, fast, and reliable."
          badge="CSC Authorized Center"
          backgroundImage="https://images.unsplash.com/photo-1641699439750-dd460f65cb92"
          gradientOverlay="bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-green-900/80"
          primaryAction={{ label: "Call Now", onClick: () => window.location.href='tel:+919876543210' }}
          secondaryAction={{ label: "Contact Us", onClick: () => window.location.href='/contact' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 font-medium">Loading services...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-red-600 font-medium">Failed to load services. Please try again later.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <CategoryChips
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20"
              >
                {filteredServices.map((service, index) => {
                  const Icon = ICON_MAP[service.name] || FileText;
                  return (
                    <GlassCard key={service.id || index} className="p-6 h-full flex flex-col">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center mb-6 shadow-lg text-white transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold font-display text-gray-800 mb-3">{service.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{service.description}</p>
                      <div className="pt-4 border-t border-gray-100/50 flex justify-between items-center">
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                          {service.category || 'Service'}
                        </span>
                        <button className="text-blue-600 text-sm font-bold hover:underline">Details &rarr;</button>
                      </div>
                    </GlassCard>
                  );
                })}
              </motion.div>

              <div className="mb-16">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold font-display text-gray-800">Why Choose Us?</h2>
                  <p className="text-gray-500 mt-2">Trusted by thousands for reliable digital services</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <TrustBadge icon={Award} title="CSC Authorized" description="Officially recognized Common Service Center" />
                  <TrustBadge icon={Lock} title="Secure & Confidential" description="Your data privacy is our top priority" />
                  <TrustBadge icon={Building} title="Govt. Approved" description="Legitimate government service provider" />
                  <TrustBadge icon={Users} title="1000+ Customers" description="Trusted by the local community" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CSCServicesPage;