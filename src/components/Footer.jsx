import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronRight } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Branding Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-500 to-green-500 rounded-xl p-2.5 shadow-lg shadow-blue-900/50">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl block tracking-tight">SK Mobile Center</span>
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider">CSC Authorized</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-blue-500 pl-4">
              Your trusted partner for CSC services, mobile repairs, and digital solutions in Kichha. Serving the community with integrity.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-green-500 rounded-full"></span>
            </h3>
            <div className="space-y-4 text-sm">
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all group p-2 hover:bg-white/5 rounded-lg -ml-2"
              >
                <Phone className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all group p-2 hover:bg-white/5 rounded-lg -ml-2"
              >
                <MessageCircle className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: +91 98765 43210</span>
              </a>
              <a
                href="mailto:info@skmobilecenter.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-all group p-2 hover:bg-white/5 rounded-lg -ml-2"
              >
                <Mail className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform" />
                <span>info@skmobilecenter.com</span>
              </a>
            </div>
          </div>

          {/* Business Hours & Address */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white relative inline-block">
              Business Hours
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3 text-gray-300 bg-white/5 p-3 rounded-xl border border-white/10">
                <Clock className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">9:00 AM – 10:00 PM</p>
                  <p className="text-blue-400 text-xs font-bold uppercase mt-1">Open All Days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Khurpiya, Kichha, Udham Singh Nagar,<br />
                  Uttarakhand – 263148
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500 rounded-full"></span>
            </h3>
            <nav className="space-y-2 text-sm">
              {[
                { name: 'CSC Services', path: '/csc-services' },
                { name: 'Mobile Accessories', path: '/mobile-accessories' },
                { name: 'Mobile Repairing', path: '/mobile-repairing' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center text-gray-300 hover:text-white hover:translate-x-1 transition-all group py-1"
                >
                  <ChevronRight className="h-3 w-3 text-gray-500 group-hover:text-green-400 mr-2 transition-colors" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SK Mobile Center. All rights reserved. | CSC Authorized Service Center
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;