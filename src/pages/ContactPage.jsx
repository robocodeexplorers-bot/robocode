import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Mail, MessageCircle, Send, Home } from 'lucide-react';

const ContactPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        alert('Thank you for your message! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-yellow-50">
      {/* Header */}
   <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div className="flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gradient-to-br from-[#2364aa] to-[#3da5d9] rounded-lg flex items-center justify-center">
          <Code className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-[#2364aa]">
          RoboCode Explorers
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-6">
        <Link to="/challenges" className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors">
          All Challenges
        </Link>
        <Link to="/lessons" className="text-gray-700 hover:text-[#2364aa] font-semibold transition-colors">
          Lessons
        </Link>
        <Link to="/contact" className="text-[#2364aa] font-semibold">
          Contact Us
        </Link>
      </div>

      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
        <div className="w-6 h-0.5 bg-gray-700"></div>
      </button>
    </div>

    {mobileMenuOpen && (
      <div className="md:hidden mt-4 pb-4 space-y-2">
        <Link 
          to="/challenges" 
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
        >
          All Challenges
        </Link>
        <Link 
          to="/lessons" 
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold transition-colors"
        >
          Lessons
        </Link>
        <Link 
          to="/contact" 
          onClick={() => setMobileMenuOpen(false)}
          className="block px-4 py-2 text-[#2364aa] bg-gray-100 rounded-lg font-semibold"
        >
          Contact Us
        </Link>
      </div>
    )}
  </div>
</nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-[#2364aa] hover:text-[#3da5d9] mb-4 font-semibold">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions, feedback, or suggestions? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#2364aa]/10 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-[#2364aa]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm mb-3">
                Send us an email and we'll respond within 24 hours.
              </p>
              <a href="mailto:hello@robocode.com" className="text-[#2364aa] font-semibold text-sm hover:underline">
                contactus@robocodeexolrers.com
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="w-12 h-12 bg-[#3da5d9]/10 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-[#3da5d9]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">FAQs</h3>
              <p className="text-gray-600 text-sm mb-3">
                Check out our frequently asked questions for quick answers.
              </p>
              <a href="#" className="text-[#2364aa] font-semibold text-sm hover:underline">
                View FAQs
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
              >
                {/* Hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2364aa] focus:ring-2 focus:ring-[#2364aa]/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2364aa] focus:ring-2 focus:ring-[#2364aa]/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2364aa] focus:ring-2 focus:ring-[#2364aa]/20 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2364aa] focus:ring-2 focus:ring-[#2364aa]/20 outline-none transition-all resize-none"
                    placeholder="Tell us more about your question or feedback..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2364aa] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1a4d7f] transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2364aa] to-[#3da5d9] rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2364aa]">
                RoboCode Explorers
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Making coding fun and accessible for kids everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;