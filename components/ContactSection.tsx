
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { adminStore } from '../services/adminStore';

const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Warangal / Hanamkonda',
    service: 'Web Development',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save directly to Admin Enquiry Store
    adminStore.addEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 - Not provided',
      location: formData.location,
      service: formData.service,
      message: formData.message,
      source: 'Website Contact Form'
    });

    const whatsappNumber = "919010591950";
    const text = `*New Inquiry from RAKS IT SOLUTIONS Website*
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'N/A'}
*Location:* ${formData.location}
*Service:* ${formData.service}
*Message:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    
    // Set submitted state to show thank you UI
    setSubmitted(true);
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-brand-blue/20">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-4xl font-black text-white mb-4">Thank You, {formData.name.split(' ')[0]}!</h3>
          <p className="text-brand-white/60 text-lg mb-8 max-w-md mx-auto">
            Your inquiry has been processed. We've redirected you to WhatsApp to start a direct conversation with our team in Warangal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setSubmitted(false)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all border border-white/10"
            >
              Send Another Inquiry
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2"
            >
              Back to Home <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">Get In Touch</h2>
          <h3 className="text-4xl font-extrabold mb-8">Ready to start your project?</h3>
          <p className="text-brand-white/60 text-lg mb-12">
            Have a project in mind or want to know more about our services in your city? Reach out and our team will get back to you within 24 hours.
          </p>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue mr-4">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-white/40 uppercase">Call Us</p>
                <p className="text-xl font-bold">+91 90105 91950</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue mr-4">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-white/40 uppercase">Email Us</p>
                <p className="text-xl font-bold">hello@raksitsolutions.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue mr-4">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-white/40 uppercase">Head Office</p>
                <p className="text-xl font-bold">Tri-City Hub, Hanamkonda, Telangana</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-brand-white/40 mb-2 uppercase tracking-tight">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-brand-ash/40 border border-brand-ash/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-white/40 mb-2 uppercase tracking-tight">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-brand-ash/40 border border-brand-ash/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-white/40 mb-2 uppercase tracking-tight">Phone Number / WhatsApp</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-brand-ash/40 border border-brand-ash/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all text-white"
                placeholder="+91 90105 91950"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-white/40 mb-2 uppercase tracking-tight">Location</label>
              <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-brand-ash/40 border border-brand-ash/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all text-white appearance-none"
              >
                <option>Warangal / Hanamkonda</option>
                <option>Hyderabad</option>
                <option>Karimnagar</option>
                <option>Other Telangana City</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-white/40 mb-2 uppercase tracking-tight">Service Needed</label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-brand-ash/40 border border-brand-ash/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all text-white appearance-none"
              >
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>Digital Marketing</option>
                <option>Branding</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-brand-white/40 mb-2 uppercase tracking-tight">Message</label>
              <textarea 
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-brand-ash/40 border border-brand-ash/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all text-white"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-blue/40 transition-all flex items-center justify-center gap-2">
              Send via WhatsApp <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
