import React, { useState, useEffect } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in on mount
    setIsVisible(true);
  }, []);

  return (
    <section className="py-20 animate-fade-in">
      <div className="group flex flex-col md:flex-row gap-16 items-center">
         <div className="md:w-1/2 relative">
            {/* Decorative Frame for Image */}
            <div className="absolute -inset-4 border border-amber-500/20 rotate-3 rounded-sm"></div>
            <div className="absolute -inset-4 border border-purple-500/20 -rotate-2 rounded-sm"></div>
            <div className="relative h-[500px] w-full bg-[#0a0510] border border-white/10 flex items-center justify-center overflow-hidden">
              <div className={`absolute inset-0 transition-opacity duration-700 bg-[radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.25),transparent_55%)] ${isVisible ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`}></div>
              <div className="absolute inset-0 border border-amber-500/20 mix-blend-screen opacity-60"></div>
              <img 
              src="/assets/eu.png" 
              alt="Lilith Dolohov" 
              className={`relative h-[500px] w-full object-cover border border-white/10 transition-all duration-700 ${isVisible ? 'grayscale-0 brightness-100' : 'grayscale brightness-75'} group-hover:grayscale-0 group-hover:brightness-100`}
              />
            </div>
         </div>
         
         <div className="md:w-1/2 space-y-8">
           <h2 className="text-5xl font-serif text-amber-100">The Arcanist</h2>
           <div className="h-px w-20 bg-amber-500/50"></div>
           
           <p className="text-amber-100/70 text-lg leading-relaxed font-sans font-light">
             I'm Lilith, a 21-year-old Romanian artist working at the intersection of fine art and fantasy. For the past seven years, I've specialized in crafting book covers through photomanipulation and realistic digital illustration,transforming stories into their visual essence.
           </p>
           <p className="text-amber-100/70 text-lg leading-relaxed font-sans font-light">
             When I'm not editing in Photoshop, you'll find me writing code or exploring old bookstores for typography inspiration, studying composition theory, or experimenting with new visual techniques. I believe a book cover is more than packaging,it's an invitation, the visual first line that draws readers into a world. My work is dedicated to making that moment unforgettable.
           </p>
           
           <div className="flex gap-4 pt-4">
             <div className="text-center p-4 border border-white/5 bg-white/5 rounded-sm">
               <h4 className="text-3xl font-serif text-amber-400">7+</h4>
               <span className="text-[10px] uppercase tracking-widest text-amber-200/50">Years Exp.</span>
             </div>
             <div className="text-center p-4 border border-white/5 bg-white/5 rounded-sm">
               <h4 className="text-3xl font-serif text-amber-400">50+</h4>
               <span className="text-[10px] uppercase tracking-widest text-amber-200/50">Covers</span>
             </div>
           </div>
         </div>
      </div>
    </section>
  );
};

export default About;
