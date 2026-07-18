import React, { useEffect, useState } from 'react';
import { FileText, Send, Star, X } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import { BookCover } from '../components/UIComponents';
import PremadeTermsModal from '../components/PremadeTermsModal';
import { getPremadeCoverById } from '../data/premadeCovers';

const currencyLabels = {
  USD: 'US Dollars',
  EUR: 'Euros',
};

const PremadeClaim = () => {
  const { coverId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCover = getPremadeCoverById(coverId);
  const [showTerms, setShowTerms] = useState(false);
  const initialCurrency = new URLSearchParams(location.search).get('currency');
  const initialPriceCurrency = initialCurrency === 'EUR' ? 'EUR' : 'USD';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
    currency: initialPriceCurrency,
    agreedToTerms: false,
  });

  const [state, handleSubmitFormspree, resetFormspree] = useForm('xqerzjbg');

  useEffect(() => {
    resetFormspree();
    setFormData({
      name: '',
      email: '',
      details: '',
      currency: initialPriceCurrency,
      agreedToTerms: false,
    });
  }, [coverId, initialPriceCurrency]);

  useEffect(() => {
    if (selectedCover && !selectedCover.taken) {
      return undefined;
    }

    const timer = setTimeout(() => {
      navigate('/premades', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, selectedCover]);

  useEffect(() => {
    if (state.succeeded && selectedCover) {
      const timer = setTimeout(() => {
        navigate('/premades', { replace: true });
      }, 5000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [navigate, selectedCover, state.succeeded]);

  const handleCustomSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCover || selectedCover.taken) {
      return;
    }

    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Please read and agree to the Terms of Service');
      return;
    }

    await handleSubmitFormspree(e);
  };

  if (!selectedCover) {
    return (
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl font-serif text-amber-100 mb-4">Cover not found</h1>
        <p className="text-amber-200/70 mb-8">That premade cover does not exist anymore.</p>
        <Link to="/premades" className="inline-flex px-6 py-3 border border-amber-500/30 text-amber-200 uppercase tracking-wider text-xs">
          Back to Premades
        </Link>
      </section>
    );
  }

  if (selectedCover.taken) {
    return (
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl font-serif text-amber-100 mb-4">Sold / Unavailable</h1>
        <p className="text-amber-200/70 mb-8">This premade cover has already been claimed.</p>
        <Link to="/premades" className="inline-flex px-6 py-3 border border-amber-500/30 text-amber-200 uppercase tracking-wider text-xs">
          Back to Premades
        </Link>
      </section>
    );
  }

  const currentPrice = selectedCover.prices[formData.currency];

  return (
    <section className="py-20 animate-fade-in relative">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-0">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to="/premades" className="text-amber-300/70 hover:text-amber-300 uppercase tracking-widest text-xs flex items-center gap-2">
            <X size={14} /> Back to gallery
          </Link>
          <button
            onClick={() => setShowTerms(true)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-300 transition-colors"
            type="button"
          >
            <FileText size={14} /> Read Terms of Service
          </button>
        </div>

        <div className="bg-[#1a0f2e] border border-amber-500/30 rounded-sm w-full flex flex-col md:flex-row shadow-2xl relative overflow-hidden">
          <div className="md:w-1/3 bg-[#0a0510] border-r border-white/10 p-8 flex flex-col items-center justify-start relative overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-[200px] mt-4">
              <BookCover
                title={selectedCover.title}
                genre={selectedCover.genre}
                color={selectedCover.color}
                image={selectedCover.image}
              />
            </div>
            <div className="mt-8 text-center px-4 space-y-4">
              <div className="text-amber-400 font-bold text-xl tracking-wider">
                {selectedCover.prices.USD} USD / {selectedCover.prices.EUR} EUR
              </div>
              <div className="text-amber-200/70 text-sm">
                Choose your preferred currency in the form before sending the claim.
              </div>
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

          <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto custom-scrollbar">
            <div className="mb-6 flex items-center gap-3 text-amber-300/70 text-sm uppercase tracking-widest">
              <Star className="w-4 h-4" /> Standalone Claim Page
            </div>
            <h1 className="text-3xl font-serif text-amber-100 mb-2">Claim this cover</h1>
            <p className="text-amber-200/60 mb-8">
              {selectedCover.title} - choose the currency you want to buy in. The amount stays fixed to the price you set for that cover.
            </p>

            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in py-12">
                <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4">
                  <Star className="text-amber-400 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif text-amber-100">Claim Sent!</h2>
                <p className="text-amber-200/70 font-sans max-w-sm">
                  Thank you for your interest! Your claim for <strong>{selectedCover.title}</strong> has been sent successfully. I will review it and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-6 font-sans">
                <input type="text" name="_gotcha" style={{ display: 'none' }} />
                <input type="hidden" name="_subject" value={`Premade Claim: ${selectedCover.title}`} />
                <input type="hidden" name="service" value={`Premade Cover Claim: ${selectedCover.title}`} />
                <input type="hidden" name="price" value={`${currentPrice} ${formData.currency}`} />
                <input type="hidden" name="currency" value={formData.currency} />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="claim-currency" className="text-xs uppercase tracking-widest text-amber-500/70">Currency to Buy In</label>
                    <select
                      id="claim-currency"
                      name="currencySelection"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors"
                    >
                      <option value="USD">USD - US Dollars</option>
                      <option value="EUR">EUR - Euros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-widest text-amber-500/70">Fixed Price Set By You</div>
                    <div className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 flex items-center justify-between gap-3">
                      <span>{currentPrice}</span>
                      <span className="text-amber-200/70 text-xs uppercase tracking-widest">{formData.currency}</span>
                    </div>
                    <p className="text-amber-100/40 text-xs">
                      This price is fixed from the cover listing.
                    </p>
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

      {showTerms && <PremadeTermsModal onClose={() => setShowTerms(false)} />}
    </section>
  );
};

export default PremadeClaim;