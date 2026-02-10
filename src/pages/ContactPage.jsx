import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitSuccess(true);
      toast({
        title: 'Message Sent Successfully!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact SK Mobile Center - Phone, WhatsApp, Location, Hours</title>
        <meta
          name="description"
          content="Contact SK Mobile Center in Khurpiya, Kichha. Call +91-9876543210, WhatsApp, or visit us for CSC services, mobile repairs, and accessories. Open 9 AM - 10 PM."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 font-display">
                Get In Touch
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
                We're here to help! Reach out to us for any queries or assistance.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 lg:p-8 shadow-xl border border-white/50">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
                    <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Phone Number</h3>
                      <a href="tel:+916393979967" className="text-blue-600 hover:text-blue-800 font-medium block mt-1 text-lg">
                        +91 6393979967
                      </a>
                      <p className="text-sm text-gray-500">Available 9 AM - 10 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors border border-transparent hover:border-green-100">
                    <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">WhatsApp</h3>
                      <a href="https://wa.me/916393979967" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 font-medium block mt-1 text-lg">
                        +91 63939 79967
                      </a>
                      <p className="text-sm text-gray-500">Chat with us directly</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100">
                    <div className="bg-purple-100 rounded-full p-3 flex-shrink-0">
                      <Mail className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Email Address</h3>
                      <a href="mailto:sk7360620@gmail.com" className="text-purple-600 hover:text-purple-800 font-medium block mt-1 text-lg break-all">
                        sk7360620@gmail.com
                      </a>
                      <p className="text-sm text-gray-500">Expect a reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-orange-50 transition-colors border border-transparent hover:border-orange-100">
                    <div className="bg-orange-100 rounded-full p-3 flex-shrink-0">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Business Hours</h3>
                      <p className="text-gray-900 font-medium mt-1 text-lg">9:00 AM – 10:00 PM</p>
                      <p className="text-green-600 font-bold text-sm">Open All Days</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                    <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Location</h3>
                      <p className="text-gray-700 leading-relaxed mt-1">
                        Khurpiya, Kichha,<br />
                        Udham Singh Nagar,<br />
                        Uttarakhand – 263148
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-2">
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg h-12"
                  >
                    <a href="tel:+916393979967">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg h-12"
                  >
                    <a
                      href="https://wa.me/916393979967"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full flex flex-col justify-center relative overflow-hidden">
                {submitSuccess && (
                  <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 max-w-xs">We have received your message and will get back to you shortly.</p>
                    <Button 
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-8 bg-gray-900 text-white hover:bg-gray-800"
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}

                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-gray-50 text-gray-900 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none ${errors.message ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold shadow-lg h-12 text-lg"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-2">
               <div className="relative w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1064.9995896984872!2d79.50913826963469!3d28.93835417212438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDU2JzE4LjEiTiA3OcKwMzAnMzUuMiJF!5e1!3m2!1sen!2sin!4v1770729993597!5m2!1sen!2sin" 
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="SK Mobile Center Location - Khurpiya, Kichha"
                    className="absolute inset-0"
                ></iframe>
               </div>
            </div>
            <p className="text-center text-gray-500 mt-4 text-sm font-medium">
              Visit us at: Khurpiya, Kichha, Udham Singh Nagar, Uttarakhand – 263148
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;