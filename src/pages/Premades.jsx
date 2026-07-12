import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, X, FileText, Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { BookCover } from '../components/UIComponents';
import PremadeTermsModal from '../components/PremadeTermsModal';

const Premades = () => {
  // --- MANUALLY CHANGE 'taken: true' BELOW WHEN A COVER IS TRULY SOLD ---
  const coversList = [
    { id: 1, title: "The Snake King", genre: "Fantasy", price: "180 USD", image: "/assets/p1.png", taken: false },

  ];

  const [selectedCover, setSelectedCover] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
    agreedToTerms: false
  });

  // Added 'reset' from useForm to clear the Formspree success state
  const [state, handleSubmitFormspree, resetFormspree] = useForm("xqerzjbg");

  const handleClaim = (cover) => {
    if (cover.taken) return;

    // Force Formspree to reset its 'succeeded' state back to false
    resetFormspree();

    setSelectedCover(cover);
    setFormData({
      name: '',
      email: '',
      details: '',
      agreedToTerms: false
    });
  };

  const closeModal = () => {
    setSelectedCover(null);
    resetFormspree(); // Also reset when closing the modal
  };

  const handleCustomSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { alert('Please enter your name'); return; }
    if (!formData.email.trim()) { alert('Please enter your email'); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!formData.agreedToTerms) { alert('Please read and agree to the Terms of Service'); return; }
    await handleSubmitFormspree(e);
  };

  // Close modal automatically after 5 seconds of success
  useEffect(() => {
    if (state.succeeded && selectedCover) {
      const timer = setTimeout(() => {
        closeModal();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, selectedCover]);

  return (
    <section className="py-20 animate-fade-in relative">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-5xl font-serif text-amber-100 flex justify-center items-center gap-4">
          <div className="h-px w-12 bg-amber-500/50"></div>
          <span>Premade Covers</span>
          <div className="h-px w-12 bg-amber-500/50"></div>
        </h2>
        <div className="flex justify-center items-center gap-4 text-amber-500/40 mt-4">
          <Star className="w-4 h-4" />
        </div>
        <p className="text-amber-200/50 font-sans tracking-wide">UNIQUE READY-TO-USE DESIGNS</p>
        <p className="text-amber-100/60 max-w-2xl mx-auto leading-relaxed font-sans font-light mt-4">
          Each premade cover is sold only once. Text and typography can be customized to fit your title and author name. Select a cover to claim it for your story.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
        {coversList.map((cover) => (
          <PremadeItem
            key={cover.id}
            title={cover.title}
            genre={cover.genre}
            price={cover.price}
            color={cover.color}
            image={cover.image}
            taken={cover.taken}
            onClaim={() => handleClaim(cover)}
          />
        ))}
      </div>

      {/* Claim Modal */}
      {selectedCover && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1a0f2e] border border-amber-500/30 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden">

            <button onClick={closeModal} className="absolute top-4 right-4 z-20 text-amber-200/50 hover:text-amber-500 transition-colors bg-[#1a0f2e]/50 rounded-full p-1">
              <X size={24} />
            </button>

            {/* Left Side: Cover Preview */}
            <div className="md:w-1/3 bg-[#0a0510] border-r border-white/10 p-8 flex flex-col items-center justify-start relative overflow-y-auto custom-scrollbar">
              <div className="w-full max-w-[200px] mt-4">
                <BookCover
                  title={selectedCover.title}
                  genre={selectedCover.genre}
                  color={selectedCover.color}
                  image={selectedCover.image}
                />
              </div>
              <div className="mt-8 text-center px-4">
                <div className="text-amber-400 font-bold text-xl tracking-wider mb-6">{selectedCover.price}</div>

                <div className="text-left bg-amber-500/10 border border-amber-500/20 p-4 rounded-sm">
                  <h4 className="text-amber-300 font-serif text-sm mb-2">What you can change:</h4>
                  <ul className="text-amber-100/70 text-xs font-sans space-y-1 list-disc pl-4">
                    <li>Book Title & Author Name</li>
                    <li>Subtitle, Series Name, or Tagline</li>
                    <li>Minor typography color/placement tweaks</li>
                    <li>Minor artwork customizations (e.g., colors, small elements)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <h2 className="text-3xl font-serif text-amber-100 mb-6">Claim this cover</h2>

              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in py-12">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                    <Star className="text-amber-400 w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif text-amber-100">Claim Sent!</h3>
                  <p className="text-amber-200/70 font-sans max-w-sm">
                    Thank you for your interest! Your claim for <strong>{selectedCover.title}</strong> has been sent successfully. I will review it and contact you shortly.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-8 px-8 py-3 bg-amber-500 text-[#130b20] font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors"
                  >
                    Return to Gallery
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-6 font-sans">
                  {/* Honeypot field tells Formspree you have anti-spam measures built-in */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />

                  <input type="hidden" name="_subject" value={`Premade Claim: ${selectedCover.title}`} />
                  <input type="hidden" name="service" value={`Premade Cover Claim: ${selectedCover.title}`} />
                  <input type="hidden" name="price" value={selectedCover.price} />
                  <input type="hidden" name="termsAgreed" value="Yes" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="claim-name" className="text-xs uppercase tracking-widest text-amber-500/70">Your Name *</label>
                      <input
                        id="claim-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors"
                      />
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="claim-email" className="text-xs uppercase tracking-widest text-amber-500/70">Your Email *</label>
                      <input
                        id="claim-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors"
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="claim-details" className="text-xs uppercase tracking-widest text-amber-500/70">Title, Author Name & Minor Tweaks</label>
                    <textarea
                      id="claim-details"
                      name="details"
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Tell me the exact title and author name you want on the cover..."
                      className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors h-32 resize-none"
                    ></textarea>
                    <ValidationError prefix="Details" field="details" errors={state.errors} />
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="claim-terms"
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="w-4 h-4 bg-[#0a0510] border-white/10 accent-amber-500 cursor-pointer"
                      />
                      <label htmlFor="claim-terms" className="text-sm text-amber-200/70 select-none cursor-pointer">
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

                  {state.errors && state.errors.length > 0 && (
                    <div className="p-4 bg-red-900/30 border border-red-500/50 text-red-200 text-sm rounded-sm">
                      There was an error sending your request. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!formData.agreedToTerms || state.submitting}
                    className={`w-full py-4 border font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3
                     ${formData.agreedToTerms && !state.submitting
                        ? 'bg-gradient-to-r from-purple-700 to-purple-900 border-amber-500/30 text-amber-100 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer'
                        : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'}
                   `}
                  >
                    <Send size={16} />
                    {state.submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <PremadeTermsModal onClose={() => setShowTerms(false)} />
      )}
    </section>
  );
};

const PremadeItem = ({ title, genre, price, color, image, taken, onClaim }) => (
  <div className={`group relative transition-all duration-300 ${taken ? 'grayscale opacity-40 select-none' : ''}`}>
    <BookCover
      title={title}
      genre={genre}
      color={color}
      image={image}
    />
    <div className="mt-6 flex flex-col items-center gap-3">
      {!taken ? (
        <>
          <span className="text-amber-400 font-bold tracking-widest">{price}</span>
          <button
            onClick={onClaim}
            className="px-6 py-2 border border-amber-500/30 text-amber-200 text-xs font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500 transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart size={14} /> Claim Cover
          </button>
        </>
      ) : (
        <span className="text-neutral-500 font-bold uppercase text-xs tracking-widest border border-neutral-800 px-4 py-2 bg-neutral-950/40">
          Sold / Unavailable
        </span>
      )}
    </div>
  </div>
);

export default Premades;