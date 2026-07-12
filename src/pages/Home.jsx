import React from 'react';
import { Sparkles, BookOpen, Mail, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center pt-10 pb-20 animate-fade-in">
      <div className="space-y-8 max-w-4xl relative">
        {/* Decorative Elements */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-amber-500/10 animate-spin-slow pointer-events-none">
           <Star size={300} strokeWidth={0.5} />
        </div>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs font-sans font-medium uppercase tracking-[0.2em] backdrop-blur-sm">
          <Sparkles className="w-3 h-3" />
          <span>Book Cover Design & Illustration</span>
          <Sparkles className="w-3 h-3" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-serif font-medium leading-none tracking-tight">
          Bringing Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 animate-gradient-x drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            Worlds to Life
          </span>
        </h1>
        
        <p className="text-xl text-amber-100/60 max-w-2xl mx-auto leading-relaxed font-sans font-light">
          Specializing in fantasy, romance, and other genre book covers. I weave typography and imagery into portals for your readers.
        </p>

        <div className="flex flex-wrap justify-center gap-6 pt-8 font-sans">
          <Link 
            to="/portfolio"
            className="px-10 py-4 bg-amber-500 text-[#130b20] font-bold uppercase tracking-wider rounded-sm hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] flex items-center gap-2"
          >
            View Portfolio <BookOpen className="w-4 h-4" />
          </Link>
          <Link 
            to="/contact"
            className="px-10 py-4 bg-transparent border border-amber-500/30 text-amber-200 font-bold uppercase tracking-wider rounded-sm hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-300 flex items-center gap-2"
          >
            Request Commission <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
