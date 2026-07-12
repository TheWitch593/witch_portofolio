import React from 'react';
import { Shield, X } from 'lucide-react';

const TermsModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#1a0f2e] border border-amber-500/30 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#130b20]">
          <h3 className="text-2xl font-serif text-amber-100 flex items-center gap-3">
            <Shield className="text-amber-500" />
            Terms of Service
          </h3>
          <button onClick={onClose} className="text-amber-200/50 hover:text-amber-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto font-sans text-amber-100/80 leading-relaxed space-y-8 custom-scrollbar">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-sm text-sm">
            <strong>Legal Binding:</strong> Reading and submitting a project request constitutes a legally binding contract between Lilith Dolohov Designs and the Client. The information provided by the Client serves as a full legal signature acknowledging and agreeing to all terms contained within this document.
          </div>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">I. Payments & Fees (The Two-Part Protocol)</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Pricing:</strong> The price ranges for each type of project are stated on the Services page. The final price includes design complexity, hours of work, licensed resource acquisition, and standard revisions.</li>
              <li><strong>Two-Part Payment Structure:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-amber-200/70">
                  <li><strong>50% Non-Refundable Deposit:</strong> Due immediately upon approval of the design brief. Secures project date and covers resource acquisition.</li>
                  <li><strong>50% Final Payment:</strong> Due upon final review and approval. High-res files delivered only after full payment.</li>
                </ul>
              </li>
              <li><strong>Upfront Resource Cost:</strong> The deposit covers all necessary resource costs. If cancelled, the deposit is retained.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">II. Work & Design Process</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Scheduling:</strong> A project date will be scheduled once a mutual fit is established.</li>
              <li><strong>Creative Direction:</strong> Initial ideas or sketches provided for approval before the first draft.</li>
              <li><strong>Drafts & Revisions:</strong> Revisions made until finalized based on feedback. No changes requiring new stock resources without prior approval.</li>
              <li><strong>Scope Creep:</strong> Excessive revisions or conceptual pivots after work begins may incur additional costs ($30 USD/hour).</li>
              <li><strong>Timeline:</strong> Typically 1 to 2 weeks.</li>
              <li><strong>Abandonment:</strong> If the client abandons the project after the first draft, the deposit is retained, and the design may be repurposed.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">III. Licensing & Copyright</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Ownership:</strong> Intellectual property remains with Lilith Dolohov Designs unless a full copyright transfer is purchased.</li>
              <li><strong>Exclusive License:</strong> Client granted exclusive, non-transferable license for commercial use (Book, eBook, Audio, Marketing) upon final payment.</li>
              <li><strong>Merchandise Rights:</strong> Included for goods promoting the book.</li>
              <li><strong>No Modification:</strong> Client may not alter design files without written permission.</li>
              <li><strong>Portfolio Use:</strong> Designer retains right to use final cover in portfolio.</li>
            </ul>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">IV. AI Policy & Data Integrity</h4>
            <p className="text-sm"><strong>Prohibition:</strong> Lilith Dolohov Designs does not use AI-generated images. Feeding designs into AI platforms (Midjourney, etc.) is strictly prohibited and constitutes copyright infringement.</p>
          </section>

          <section>
            <h4 className="text-xl text-amber-400 font-serif mb-4">V. Complete Agreement</h4>
            <p className="text-sm"><strong>Underage Clients:</strong> Commissions not accepted from individuals under 18 without guardian consent.</p>
            <p className="text-sm mt-2"><strong>Liability:</strong> Lilith Dolohov Designs is not financially/legally responsible for printing errors or damages incurred from using the design.</p>
          </section>
        </div>

        <div className="p-6 border-t border-white/10 bg-[#130b20] flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-amber-500 text-[#130b20] font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors"
          >
            Close & Return
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
