import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'CSC Services', path: '/csc-services' },
    { name: 'Mobile Accessories', path: '/mobile-accessories' },
    { name: 'Mobile Repairing', path: '/mobile-repairing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Branding */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="bg-white rounded-lg p-2 shadow-md group-hover:shadow-lg transition-shadow">
              <Phone className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg md:text-2xl tracking-tight leading-tight">
                SK Mobile Center
              </span>
              <span className="text-blue-100 text-[10px] md:text-xs font-medium tracking-wide">CSC Authorized</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-white text-blue-700 shadow-md transform scale-105'
                    : 'text-white hover:bg-white/10 hover:shadow-sm'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3 ml-4">
            <a
              href="tel:+919876543210"
              className="flex items-center space-x-1.5 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-blue-700 rounded-full transition-all duration-300 border border-white/20 text-sm font-medium backdrop-blur-sm"
            >
              <Phone className="h-4 w-4" />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/30 text-sm font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-blue-800 border-t border-blue-600 overflow-hidden"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-white text-blue-700 shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 grid grid-cols-2 gap-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-white text-blue-700 rounded-lg font-bold shadow-md active:scale-95 transition-transform"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call</span>
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg font-bold shadow-md active:scale-95 transition-transform"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;