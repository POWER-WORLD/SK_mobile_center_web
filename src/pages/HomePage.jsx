import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Award,
  Users,
  CheckCircle,
  Wifi,
  FileText,
  Smartphone,
  Wrench,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

function HomePage() {
  const services = [
    {
      icon: Wifi,
      title: 'Cyber Café Services',
      description: 'High-speed internet, printing, scanning, and online form filling services.',
      link: '/csc-services',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'CSC / Jan Seva Kendra',
      description: 'Government services like Aadhaar, PAN Card, Certificates, and Bill Payments.',
      link: '/csc-services',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Accessories',
      description: 'Premium mobile covers, chargers, earphones, and smart gadgets.',
      link: '/mobile-accessories',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Wrench,
      title: 'Mobile Repairing',
      description: 'Expert repair services for all mobile brands with genuine parts.',
      link: '/mobile-repairing',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const trustBadges = [
    {
      icon: Shield,
      title: 'CSC Authorized',
      description: 'Official Service Center',
    },
    {
      icon: CheckCircle,
      title: 'Genuine Parts',
      description: '100% Original Quality',
    },
    {
      icon: Award,
      title: 'Expert Technicians',
      description: '5+ Years Experience',
    },
    {
      icon: Users,
      title: 'Trusted Local Service',
      description: '1000+ Happy Customers',
    },
  ];

  return (
    <>
      <Helmet>
        <title>SK Mobile Center - CSC Services, Mobile Accessories & Repair in Kichha</title>
        <meta
          name="description"
          content="SK Mobile Center offers CSC authorized services, mobile repairing, accessories, and Jan Seva Kendra services in Khurpiya, Kichha, Uttarakhand. Your trusted local partner."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1678948874209-c8d8affb8b0d"
            alt="Modern mobile devices and technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-green-900/90"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-8 border border-white/20 shadow-glow">
              <Star className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-semibold text-sm sm:text-base">CSC Authorized Service Center</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight font-display tracking-tight">
              SK Mobile Center
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 mb-4 font-medium">
              Your One-Stop Solution for
            </p>

            <p className="text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-200 font-bold mb-8">
              CSC Services • Mobile Repair • Accessories
            </p>

            <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
              Serving Kichha with trusted digital services, expert repairs, and quality products.
              Visit us in Khurpiya, open 9 AM to 10 PM.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-7 text-lg shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Link to="/csc-services">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-blue-700 font-semibold px-8 py-7 text-lg shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/50"
              >
                <div className="bg-gradient-to-br from-blue-500 to-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md text-white transform rotate-3 hover:rotate-0 transition-transform">
                  <badge.icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 font-display">{badge.title}</h3>
                <p className="text-gray-600 text-sm">{badge.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-2 block">What We Offer</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-display">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital and mobile solutions tailored for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <Link to={service.link} className="block h-full">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className={`bg-gradient-to-br ${service.gradient} p-8 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                      <service.icon className="h-12 w-12 mb-4 relative z-10" />
                      <h3 className="text-2xl font-bold mb-2 relative z-10 font-display">{service.title}</h3>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 font-display">
              Years of Trusted Service in Kichha
            </h2>
            <p className="text-xl text-blue-50 mb-12 leading-relaxed font-light">
              With years of experience serving the local community, SK Mobile Center has become
              the trusted destination for CSC services, mobile repairs, and accessories in
              Khurpiya, Kichha. We pride ourselves on delivering quality service with genuine
              parts and expert technicians.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/20 pt-8">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-green-300 mb-2 font-display">5+</div>
                <div className="text-blue-100 font-medium">Years Experience</div>
              </div>
              <div className="text-center sm:border-l sm:border-r border-white/20">
                <div className="text-5xl font-extrabold text-green-300 mb-2 font-display">1000+</div>
                <div className="text-blue-100 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-extrabold text-green-300 mb-2 font-display">24/7</div>
                <div className="text-blue-100 font-medium">WhatsApp Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 font-display">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Visit us today or contact us for any queries. We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl"
              >
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default HomePage;