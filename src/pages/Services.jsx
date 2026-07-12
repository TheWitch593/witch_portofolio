import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PricingCard, AddOnItem } from '../components/UIComponents';

const Services = () => {
  const navigate = useNavigate();

  const handleSelectPackage = (packageName) => {
    navigate('/contact', { state: { service: packageName } });
  };

  return (
    <section className="py-20 animate-fade-in">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-5xl font-serif text-amber-100 flex justify-center items-center gap-4">
          <div className="h-px w-12 bg-amber-500/50"></div>
          <span>Services</span>
          <div className="h-px w-12 bg-amber-500/50"></div>
        </h2>
        <p className="text-amber-200/50 font-sans tracking-wide">CHOOSE YOUR ARTIFACT PACKAGE</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <PricingCard 
          title="Ebook Package"
          price="160 USD"
          features={[
            "The ebook cover",
            "No title cover artwork",
            "Artwork background",
            "A title page",
            "Transparent titles"
          ]}
          onSelect={handleSelectPackage}
        />
        <PricingCard 
          title="Paperback Package"
          price="250 USD"
          features={[
            "The ebook cover",
            "The paperback cover",
            "No title cover artwork",
            "Artwork background",
            "A title page",
            "Transparent titles"
          ]}
          note="If you need BOTH paperback and hardback files for the same edition, it will be an extra 20 USD."
          onSelect={handleSelectPackage}
        />
        <PricingCard 
          title="Dustjacket Package"
          price="300 USD"
          features={[
            "The ebook cover",
            "Paperback/Regular hardback cover",
            "The dustjacket cover",
            "No title cover artwork",
            "Artwork background",
            "Title page & Transparent titles"
          ]}
          note="Need a design for the naked hardcover? See the package below."
          onSelect={handleSelectPackage}
        />
      </div>

      {/* Add-ons Section */}
      <div className="max-w-4xl mx-auto bg-white/5 border border-amber-500/20 rounded-sm p-8 md:p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 text-amber-500/10">
           <Star size={120} strokeWidth={0.5} />
         </div>
         <h3 className="text-3xl font-serif text-amber-200 mb-8 relative z-10">Magical Add-ons</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 relative z-10 font-sans">
           <AddOnItem name="Audiobook Cover" price="30 USD" />
           <AddOnItem name="Bookmark Design" price="20 USD" />
           <AddOnItem name="Title & Cover Reveal" price="20 USD" />
           <AddOnItem name="Promotional Story Quotes" price="10 USD each" />
           <AddOnItem name="3D Mockup" price="20 USD each" />
         </div>
      </div>
    </section>
  );
};

export default Services;
