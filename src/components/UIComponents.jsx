import React from 'react';
import { Sparkles } from 'lucide-react';

export const PricingCard = ({ title, price, features, note, highlight, onSelect }) => (
  <div className={`flex flex-col p-8 rounded-sm border transition-all duration-300 relative group
    ${highlight 
      ? 'bg-gradient-to-br from-amber-500/10 to-purple-900/20 border-amber-500/50 shadow-lg' 
      : 'bg-white/[0.02] border-white/10 hover:border-amber-500/30'
    }
  `}>
    {highlight && (
       <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-amber-500 text-[#130b20] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-b-sm">
         Most Popular
       </div>
    )}
    
    <div className="text-center mb-6 border-b border-white/10 pb-6">
      <h3 className="text-2xl font-serif text-amber-100 mb-2">{title}</h3>
      <div className="text-amber-400 font-sans font-bold text-lg tracking-wider">{price}</div>
    </div>
    
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-amber-200/70 font-sans leading-relaxed">
          <Sparkles className="w-4 h-4 text-amber-500/50 mt-0.5 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    
    {note && (
      <div className="mt-auto pt-4 border-t border-white/5 text-[11px] text-amber-200/40 italic text-center font-sans">
        * {note}
      </div>
    )}
    
    <button 
      onClick={() => onSelect(title)}
      className={`w-full mt-6 py-3 border font-bold uppercase tracking-widest text-xs transition-all duration-300
       ${highlight 
         ? 'bg-amber-500 text-[#130b20] border-amber-500 hover:bg-amber-400' 
         : 'bg-transparent border-white/20 text-amber-200/80 hover:bg-white/5 hover:text-amber-100 hover:border-amber-500/30'
       }
    `}>
      Select Package
    </button>
  </div>
);

export const AddOnItem = ({ name, price }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300 group cursor-default">
    <span className="text-amber-200/70 text-sm group-hover:text-amber-200">{name}</span>
    <span className="text-amber-500/80 text-sm font-bold tracking-wider">{price}</span>
  </div>
);

export const BookCover = ({ title, author, genre, color, placeholderText, image, taken }) => {
  const [isEnlarged, setIsEnlarged] = React.useState(false);

  return (
    <>
      <div 
        className={`group relative perspective-1000 ${image && !taken ? 'cursor-zoom-in' : 'cursor-default'}`}
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => image && !taken && setIsEnlarged(true)}
      >
        <div className="relative w-full shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
          
          <div className={`relative w-full overflow-hidden border border-white/10 ${!image ? 'aspect-[2/3]' : ''}`}>
            
            {image ? (
              <img 
                src={image}
                alt={`${title} cover`}
                className="w-full h-auto block relative z-10"
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
            )}

            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-25 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] z-0 pointer-events-none"></div>

            {taken && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none overflow-hidden">
                <div className="bg-red-900/90 border-y border-red-500/50 text-red-50 font-bold uppercase tracking-[0.4em] text-2xl py-3 w-[150%] text-center -rotate-45 shadow-[0_0_30px_rgba(220,38,38,0.6)] backdrop-blur-sm">
                  Sold
                </div>
              </div>
            )}
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform z-20"></div>
          </div>
        </div>

        {/* Info below book */}
        <div className="mt-4 text-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-amber-100 font-serif text-lg">{title}</h4>
          <p className="text-xs text-amber-500/70 font-sans uppercase tracking-widest mt-1">{genre}</p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isEnlarged && image && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-black/95 backdrop-blur-md cursor-zoom-out animate-fade-in"
          onClick={() => setIsEnlarged(false)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            {/* Using a pseudo-element for close instruction could be added, but click-to-close is intuitive */}
            <p className="absolute -top-10 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest uppercase font-sans whitespace-nowrap">
              Click anywhere to close
            </p>
            <img 
              src={image} 
              alt={`${title} cover enlarged`} 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}
    </>
  );
};

export const SocialLink = ({ icon, href, label }) => (
  <a 
    href={href}
    target={href.startsWith('http') ? '_blank' : '_self'}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="group relative p-4 rounded-full bg-white/5 text-amber-200/60 hover:text-amber-200 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-500/30"
    aria-label={label}
  >
    {React.cloneElement(icon, { size: 24 })}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-amber-500/80">
      {label}
    </span>
  </a>
);
