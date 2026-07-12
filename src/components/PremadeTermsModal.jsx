import React from 'react';
import { Shield, X } from 'lucide-react';

const PremadeTermsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1a0f2e] border border-amber-500/30 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#130b20]">
          <h3 className="text-2xl font-serif text-amber-100 flex items-center gap-3">
            <Shield className="text-amber-500" />
            Premade Cover Terms
          </h3>
          <button onClick={onClose} className="text-amber-200/50 hover:text-amber-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto font-sans text-amber-100/80 leading-relaxed space-y-8 custom-scrollbar">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-sm text-sm">
            <strong>Legal Binding:</strong> Reading and submitting a claim request constitutes a legally binding contract between Lilith Dolohov Designs and the Client. The information provided by the Client serves as a full legal signature acknowledging and agreeing to all terms contained within this document.
          </div>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">I. Exclusivity & Ownership</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>One of a Kind:</strong> Each premade cover is sold only once. Once purchased, it will be removed from the available gallery and will never be resold.</li>
              <li><strong>Licensing:</strong> Client is granted an exclusive, non-transferable license for commercial use (Book, eBook, Audio, Marketing). Ownership of the base artwork and copyright remains with the designer.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">II. Payments & Fees</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Two-Part Payment Structure:</strong> Premade covers follow a standard two-part protocol:
                <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-200/70">
                  <li><strong>50% Non-Refundable Deposit:</strong> Due immediately to claim the cover and begin text modifications.</li>
                  <li><strong>50% Final Payment:</strong> Due upon final review of the text modifications. High-res files are delivered only after full payment.</li>
                </ul>
              </li>
              <li><strong>Holds:</strong> Covers can be placed on hold for a maximum of 48 hours. If the deposit is not paid within this timeframe, the cover will be relisted.</li>
              <li><strong>Refunds:</strong> All sales of premade covers are final and the deposit is non-refundable.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">III. Included Customizations</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Text Updates:</strong> The listed price includes replacing the placeholder text with your Book Title, Author Name, and an optional Subtitle/Series Name or Tagline.</li>
              <li><strong>Typography Tweaks:</strong> Minor typography adjustments (color changes, slight repositioning) are included. Complete font overhauls may incur a small fee.</li>
              <li><strong>Artwork Changes:</strong> Minor customizations to the artwork (e.g., color tweaks, minor character feature adjustments, or swapping small elements) are included. Please specify any desired artwork changes in your claim form so we can discuss the specifics. Major overhauls may incur a custom fee.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">IV. Delivery & Add-ons</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Delivery Time:</strong> Final high-resolution files are typically delivered within 3-5 business days after payment and text details are received.</li>
              <li><strong>Continuations:</strong> If you purchase a premade for book one and need sequels later, please note that custom continuation covers will be priced at standard commission rates.</li>
              <li><strong>Add-ons:</strong> You may request standard add-ons (Audiobook cover, bookmark, 3D mockups) for the additional fees listed on the Services page.</li>
            </ul>
          </section>
        </div>

        <div className="p-6 border-t border-white/10 bg-[#130b20] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-amber-500 text-[#130b20] font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors"
          >
            Close & Return to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremadeTermsModal;
