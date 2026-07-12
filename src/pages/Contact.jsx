import React, { useState, useEffect } from 'react';
import { Mail, Instagram, ExternalLink, Shield, X, FileText, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SocialLink } from '../components/UIComponents';
import TermsModal from '../components/TermsModal';

const Contact = () => {
  const location = useLocation();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  // Initialize form with state from location if available (from Services page)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: location.state?.service || 'Ebook Package',
    addons: '',
    details: '',
    agreedToTerms: false
  });

  const handleCopyEmail = async () => {
    const email = 'lilithtpdolohov@gmail.com';

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) { alert('Please enter your name'); return; }
    if (!formData.email.trim()) { alert('Please enter your email'); return; }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (!formData.details.trim()) { alert('Please provide project details'); return; }
    if (!formData.agreedToTerms) { alert('Please read and agree to the Terms of Service'); return; }

    const formElement = e.target;
    const submitButton = formElement.querySelector('button[type="submit"]');
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch('https://formspree.io/f/mblnzwjl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          addons: formData.addons || 'None',
          details: formData.details,
          subject: `Commission Request: ${formData.service}`,
          message: `Service: ${formData.service}\nAdd-ons: ${formData.addons || 'None'}\n\nProject Details:\n${formData.details}\n\nTerms Agreed: Yes\n\nContact Email: ${formData.email}`
        })
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          service: 'Ebook Package',
          addons: '',
          details: '',
          agreedToTerms: false
        });
        alert('Message sent successfully!');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      const subject = encodeURIComponent(`Commission Request: ${formData.service}`);
      const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nAdd-ons: ${formData.addons || 'None'}\n\nProject Details:\n${formData.details}\n\nI have read and agreed to the Terms of Service.`;
      const body = encodeURIComponent(bodyContent);
      
      window.location.href = `mailto:lilithtpdolohov@gmail.com?subject=${subject}&body=${body}`;
      
      alert('Opening your email client as backup. If it doesn\'t open, please email directly to lilithtpdolohov@gmail.com');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg> Send Inquiry';
      }
    }
  };

  return (
    <>
      {copiedEmail && (
        <div className="fixed bottom-6 right-6 z-[60] bg-amber-500 text-[#130b20] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-sm shadow-lg">
          Email copied
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}

      <section className="py-20 animate-fade-in">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 px-6">
          
          {/* Contact Info Side */}
          <div className="md:w-1/3 space-y-8">
            <div>
              <h2 className="text-4xl font-serif text-amber-100 mb-4">Summon Me</h2>
              <div className="h-1 w-12 bg-amber-500"></div>
            </div>
            <p className="text-amber-200/60 leading-relaxed font-sans">
              Ready to give your story the face it deserves? Fill out the parchment to the right, or send a direct owl via email.
            </p>
            
            <div className="space-y-4 font-sans text-sm tracking-wide">
              <div className="flex items-center gap-4">
                <a href="mailto:lilithtpdolohov@gmail.com" className="flex items-center gap-4 text-amber-200/80 hover:text-amber-100 transition-colors">
                  <Mail className="text-amber-500" size={20} />
                  <span>lilithtpdolohov@gmail.com</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-[10px] uppercase tracking-widest px-2 py-1 border border-amber-500/40 text-amber-200/70 hover:text-amber-100 hover:border-amber-500/70 transition-colors"
                >
                  Copy
                </button>
              </div>
              <a href="https://instagram.com/lilith.p.6" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-amber-200/80 hover:text-amber-100 transition-colors">
                <Instagram className="text-amber-500" size={20} />
                <span>@lilith.p.6</span>
              </a>
            </div>

            <div className="pt-8 flex gap-4">
               <SocialLink icon={<Instagram />} href="https://instagram.com/lilith.p.6" label="Instagram" />
               <SocialLink icon={<Mail />} href="mailto:lilithtpdolohov@gmail.com" label="Email" />
               <SocialLink icon={<ExternalLink />} href="#" label="Behance" />
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="md:w-2/3 bg-white/5 p-8 md:p-12 border border-white/10 rounded-sm relative">
             <div className="absolute top-0 right-0 p-4 opacity-20">
               <img
                 src="/assets/Logo.png"
                 alt="Lilith Dolohov logo watermark"
                 className="w-[160px] h-[160px] object-contain select-none"
                 draggable={false}
               />
             </div>
             
             <form onSubmit={handleSubmit} className="space-y-6 font-sans relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-amber-500/70">Your Name *</label>
                   <input 
                    id="contact-name"
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors" 
                  />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-amber-500/70">Your Email *</label>
                   <input 
                    id="contact-email"
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors" 
                  />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label htmlFor="contact-service" className="text-xs uppercase tracking-widest text-amber-500/70">Service Required</label>
                 <select 
                   id="contact-service"
                   value={formData.service}
                   onChange={(e) => setFormData({...formData, service: e.target.value})}
                   className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors appearance-none"
                 >
                   <option>Ebook Package</option>
                   <option>Paperback Package</option>
                   <option>Dustjacket Package</option>
                 </select>
               </div>

               <div className="space-y-2">
                 <label htmlFor="contact-addons" className="text-xs uppercase tracking-widest text-amber-500/70">Add-ons (Optional)</label>
                 <input 
                   id="contact-addons"
                    type="text" 
                    value={formData.addons}
                    onChange={(e) => setFormData({...formData, addons: e.target.value})}
                    placeholder="e.g. Audiobook Cover, 3D Mockup"
                    className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors" 
                  />
               </div>

               <div className="space-y-2">
                 <label htmlFor="contact-details" className="text-xs uppercase tracking-widest text-amber-500/70">Project Details *</label>
                 <textarea 
                  id="contact-details"
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  required
                  placeholder="Tell me about your book, genre, themes, and any specific ideas you have..."
                  className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors h-32 resize-none"
                 ></textarea>
               </div>

               <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
                      className="w-4 h-4 bg-[#0a0510] border-white/10 accent-amber-500 cursor-pointer" 
                    />
                    <label htmlFor="terms" className="text-sm text-amber-200/70 select-none cursor-pointer">
                      I have read and agree to the Terms of Service.
                    </label>
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => setShowTerms(true)}
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-300 transition-colors w-fit"
                  >
                    <FileText size={14} />
                    Read Terms of Service
                  </button>
               </div>

               <button 
                type="submit"
                disabled={!formData.agreedToTerms}
                className={`w-full py-4 border font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3
                  ${formData.agreedToTerms 
                    ? 'bg-gradient-to-r from-purple-700 to-purple-900 border-amber-500/30 text-amber-100 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer' 
                    : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'}
                `}
               >
                 <Send size={16} />
                 Send Inquiry
               </button>
             </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;
