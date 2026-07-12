import React from 'react';
import { Star } from 'lucide-react';
import { BookCover } from '../components/UIComponents';

const Portfolio = () => {
  return (
    <section className="py-20 animate-fade-in">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-5xl font-serif text-amber-100">
          Selected Works
        </h2>
        <div className="flex justify-center items-center gap-4 text-amber-500/40">
          <div className="h-px w-12 bg-current"></div>
          <Star className="w-4 h-4" />
          <div className="h-px w-12 bg-current"></div>
        </div>
        <p className="text-amber-200/50 font-sans tracking-wide">A CURATED COLLECTION OF BOOK COVERS</p>
      </div>

      {/* Book Grid - Vertical Aspect Ratio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4 md:px-0">
        <BookCover
          title="Beneath the Emblem of Brass and Sparks"
          author="T. Ufletor"
          genre="Steampunk Fantasy"
          color="from-red-900 to-rose-900"
          image="/assets/beneth.jpg"
          placeholderText="Golden Birdcage"
        />
        <BookCover
          title="Promises in the"
          author="Scarlett Winters "
          genre="Dark Romance"
          color="from-slate-900 to-gray-800"
          image="/assets/promises.jpg"
          placeholderText="Shadow Figure"
        />
        <BookCover
          title="Drumul înapoi spre mine"
          author="Anna Tyboleyn"
          genre="Contemporary Fiction"
          color="from-purple-900 to-indigo-900"
          image="/assets/IMG_20250216_173512_648.jpg"
          placeholderText="Drumul"
        />
        <BookCover
          title="Orgolii"
          author="Anna Tyboleyn"
          genre="Dark Romance"
          color="from-red-900 to-rose-900"
          image="/assets/IMG_20250216_221331_100.jpg"
          placeholderText="Orgolii"
        />
        <BookCover
          title="Îngerul meu căzut"
          author="Daria"
          genre="Dark Fantasy Romance"
          color="from-cyan-900 to-blue-900"
          image="/assets/îngerul.jpg"
          placeholderText="Space Void"
        />
        <BookCover
          title="Eroare"
          author="VLADISLAVA PANFILI"
          genre="Thriller&Mystery"
          color="from-amber-900 to-yellow-900"
          image="/assets/eroare.jpg"
          placeholderText="Golden Gear"
        />
        <BookCover
          title="Threaded in Red"
          author="Nala"
          genre="Dark Romance"
          color="from-emerald-900 to-teal-900"
          image="/assets/threats.jpg"
          placeholderText="Golden Birdcage"
        />
        <BookCover
          title="Pasiunea mea secretă"
          author="Anna Tyboleyn"
          genre="Romance"
          color="from-purple-900 to-indigo-900"
          image="/assets/pasiunea.jpg"
          placeholderText="Drumul"
        />
        <BookCover
          title="Aphelion"
          author="Aurette"
          genre="fantasy"
          color="from-red-900 to-rose-900"
          image="/assets/aphe.jpg"
          placeholderText="Orgolii"
        />
        <BookCover
          title="Un Babel"
          author="Nala"
          genre="YA Romance"
          color="from-amber-900 to-yellow-900"
          image="/assets/un.jpg"
          placeholderText="Golden Gear"
        />
        <BookCover
          title="Ce ma separa de tine"
          author="A.D. Andreea"
          genre="Contemporary Fiction"
          color="from-blue-900 to-indigo-900"
          image="/assets/cema.png"
          placeholderText="Golden Birdcage"
        />
      </div>
    </section>
  );
};

export default Portfolio;
