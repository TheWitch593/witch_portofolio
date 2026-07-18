import React, { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookCover } from '../components/UIComponents';
import { premadeCovers } from '../data/premadeCovers';

const Premades = () => {
  const [displayCurrency, setDisplayCurrency] = useState('USD');

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

      <div className="flex items-center justify-center gap-3 mb-10 px-4">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-200/50">Preview Currency</span>
        <div className="inline-flex rounded-sm border border-amber-500/20 bg-black/20 p-1">
          <button
            type="button"
            onClick={() => setDisplayCurrency('USD')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${displayCurrency === 'USD' ? 'bg-amber-500 text-[#130b20]' : 'text-amber-200/70 hover:text-amber-200'}`}
          >
            USD
          </button>
          <button
            type="button"
            onClick={() => setDisplayCurrency('EUR')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${displayCurrency === 'EUR' ? 'bg-amber-500 text-[#130b20]' : 'text-amber-200/70 hover:text-amber-200'}`}
          >
            EUR
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
        {premadeCovers.map((cover) => (
          <PremadeItem
            key={cover.id}
            title={cover.title}
            genre={cover.genre}
            prices={cover.prices}
            color={cover.color}
            image={cover.image}
            taken={cover.taken}
            claimPath={`/premades/${cover.id}?currency=${displayCurrency}`}
            displayCurrency={displayCurrency}
          />
        ))}
      </div>
    </section>
  );
};

const PremadeItem = ({ title, genre, prices, color, image, taken, claimPath, displayCurrency }) => (
  <div className={`group relative transition-all duration-300 ${taken ? 'grayscale opacity-40 select-none' : ''}`}>
    <BookCover
      title={title}
      genre={genre}
      color={color}
      image={image}
    />
    <div className="mt-6 flex flex-col items-center gap-3">
      {!taken ? (
        <div className="w-full space-y-3">
          <span className="text-amber-400 font-bold tracking-widest">
            {prices[displayCurrency]} {displayCurrency}
          </span>
          <span className="text-amber-100/50 text-xs tracking-[0.2em] uppercase">
            Also available: {prices.USD} USD / {prices.EUR} EUR
          </span>
          <Link
            to={claimPath}
            className="px-6 py-2 border border-amber-500/30 text-amber-200 text-xs font-bold uppercase tracking-wider hover:bg-amber-500/20 hover:border-amber-500 transition-all duration-300 flex items-center gap-2"
          >
            <ShoppingCart size={14} /> Claim Cover
          </Link>
        </div>
      ) : (
        <span className="text-neutral-500 font-bold uppercase text-xs tracking-widest border border-neutral-800 px-4 py-2 bg-neutral-950/40">
          Sold / Unavailable
        </span>
      )}
    </div>
  </div>
);

export default Premades;