import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Smartphone, Battery, Zap, Volume2, Droplets, Settings, CheckCircle, Shield, Award, Clock, Star, Wrench } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';
import HeroSection from '@/components/ui/HeroSection';
import GlassCard from '@/components/ui/GlassCard';
import TrustBadge from '@/components/ui/TrustBadge';

const ICON_MAP = {
  'Screen Replacement': Smartphone,
  'Battery Replacement': Battery,
  'Charging Port Repair': Zap,
  'Speaker & Mic': Volume2,
  'Software Issues': Settings,
  'Water Damage': Droplets,
  'General Checkup': Wrench
};

const DEFAULT_REPAIR_SERVICES = [
  { id: 1, title: 'Screen Replacement', description: 'Original quality displays with 6-month warranty. Replaced in 30 mins.', time: '30-45 mins', status: 'Active' },
  { id: 2, title: 'Battery Replacement', description: 'High capacity original batteries. Fix drainage issues instantly.', time: '20 mins', status: 'Active' },
  { id: 3, title: 'Charging Port Repair', description: 'Fix loose connections and slow charging problems.', time: '40 mins', status: 'Active' },
  { id: 4, title: 'Speaker & Mic', description: 'Crystal clear audio. Repair low sound or mic issues.', time: '30 mins', status: 'Active' },
  { id: 5, title: 'Software Issues', description: 'Flashing, unlocking, and software updates for all models.', time: '1-2 hours', status: 'Active' },
  { id: 6, title: 'Water Damage', description: 'Professional chemical wash and chip-level repair.', time: '24 hours', status: 'Active' },
];

function MobileRepairingPage() {
  const [services] = useLocalStorage('mobileRepairing', DEFAULT_REPAIR_SERVICES);

  return (
    <>
      <Helmet>
        <title>Professional Mobile Repair Services - Screen, Battery, Software Repair</title>
        <meta name="description" content="Expert mobile repair services in Kichha. Screen replacement, battery repair, water damage fix, and more. Fast service and genuine parts." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pb-20">
        <HeroSection
          title="Professional Mobile Repair Services"
          subtitle="Genuine Parts. Expert Technicians. Express Service. We bring your device back to life."
          badge="Authorized Service Center"
          backgroundImage="https://images.unsplash.com/photo-1658212662417-a2a76efe25df"
          gradientOverlay="bg-gradient-to-r from-green-900/90 via-emerald-900/80 to-blue-900/80"
          primaryAction={{ label: "Check Status", onClick: () => window.location.href='tel:+919876543210' }}
          secondaryAction={{ label: "Book Appointment", onClick: () => window.location.href='/contact' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {services.filter(s => s.status === 'Active').map((service, index) => {
              const Icon = ICON_MAP[service.title] || Smartphone;
              return (
                <GlassCard key={service.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {service.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                  <button className="text-green-600 font-semibold text-sm hover:underline flex items-center gap-1">
                    Book Service &rarr;
                  </button>
                </GlassCard>
              );
            })}
          </div>

          {/* Quality Assurance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-display text-gray-800">Quality Assurance</h2>
              <p className="text-gray-600">We don't just repair; we restore. Every repair comes with our promise of quality and durability.</p>
              
              <GlassCard className="p-6 bg-gradient-to-r from-blue-50 to-white border-blue-100">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                     <Shield className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900">6-Month Warranty</h4>
                     <p className="text-sm text-gray-600">On all screen and battery replacements</p>
                   </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 bg-gradient-to-r from-green-50 to-white border-green-100">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                     <Award className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900">ISO Certified</h4>
                     <p className="text-sm text-gray-600">Standardized repair procedures</p>
                   </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 bg-gradient-to-r from-yellow-50 to-white border-yellow-100">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                     <Star className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900">4.8/5 Star Rating</h4>
                     <p className="text-sm text-gray-600">Trusted by 500+ happy customers</p>
                   </div>
                </div>
              </GlassCard>
            </div>

            <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-inner min-h-[400px] relative">
               <img 
                 src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?auto=format&fit=crop&q=80" 
                 alt="Repair Technician" 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                 <h3 className="text-2xl font-bold mb-2">Expert Care for Your Device</h3>
                 <p className="text-gray-200">Our lab is equipped with state-of-the-art tools for precise repairs.</p>
               </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold font-display text-center mb-10 text-gray-800">Why Choose SK Mobile Center?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <TrustBadge icon={Shield} title="Genuine Parts" description="100% original components for durability" />
              <TrustBadge icon={Clock} title="Fast Service" description="Most repairs completed within 1 hour" />
              <TrustBadge icon={Wrench} title="Expert Tech" description="Certified technicians with 5+ years exp" />
              <TrustBadge icon={CheckCircle} title="Data Safe" description="Your data privacy is guaranteed" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default MobileRepairingPage;