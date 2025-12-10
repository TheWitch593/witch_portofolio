import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Mail, 
  Instagram, 
  Twitter, 
  ExternalLink, 
  ChevronDown,
  Star,
  User,
  Send,
  Shield,
  X,
  FileText
} from 'lucide-react';

// Custom Snake Icon Component
const SnakeIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 11c3 0 6.4 1.5 3.6 5.6-1.7 2.5-5.7.5-4-2.1.9-1.4 2.8-.7 1.4.9-.8 1-1.9.9-2.5.3-1.3-1.3.2-3 1.5-3z" />
    <path d="M9 7c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
    <path d="M13 11c0-3.3-2.7-6-6-6S1 7.7 1 11c0 2.3 1.3 4.3 3.3 5.3" />
    <path d="M13 11l4 0" />
    <circle cx="9" cy="9" r="0.5" fill="currentColor" />
  </svg>
);

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showTerms, setShowTerms] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Full Book Cover Design',
    addons: '',
    details: '',
    agreedToTerms: false
  });

  // Handle Mouse Move for the "Torch" effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleSelectPackage = (packageName) => {
    setFormData(prev => ({ ...prev, service: packageName }));
    scrollToSection('contact');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

    // Construct Mailto Link
    const subject = `Commission Request: ${formData.service}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AService: ${formData.service}%0D%0AAdd-ons: ${formData.addons}%0D%0A%0D%0AProject Details:%0D%0A${formData.details}%0D%0A%0D%0AI have read and agreed to the Terms of Service.`;
    
    window.location.href = `mailto:lilithtpdolohov@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen bg-[#130b20] text-amber-50 overflow-x-hidden font-serif selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1a0f2e] border border-amber-500/30 rounded-sm w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#130b20]">
              <h3 className="text-2xl font-serif text-amber-100 flex items-center gap-3">
                <Shield className="text-amber-500" />
                Terms of Service
              </h3>
              <button onClick={() => setShowTerms(false)} className="text-amber-200/50 hover:text-amber-500 transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto font-sans text-amber-100/80 leading-relaxed space-y-8 custom-scrollbar">
              
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-sm text-sm">
                <strong>Legal Binding:</strong> Reading and submitting a project request constitutes a legally binding contract between Lilith Dolohov Designs and the Client. The information provided by the Client serves as a full legal signature acknowledging and agreeing to all terms contained within this document.
              </div>

              <section>
                <h4 className="text-xl text-amber-400 font-serif mb-4">I. Payments & Fees (The Two-Part Protocol)</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Pricing:</strong> The price ranges for each type of project are stated on the Services page. The final price includes design complexity, hours of work, licensed resource acquisition, and standard revisions.</li>
                  <li><strong>Two-Part Payment Structure:</strong>
                    <ul className="list-circle pl-5 mt-2 space-y-1 text-amber-200/70">
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

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-[#130b20] flex justify-end">
              <button 
                onClick={() => setShowTerms(false)}
                className="px-6 py-2 bg-amber-500 text-[#130b20] font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors"
              >
                Close & Return to Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f2e] via-[#130b20] to-[#0a0510]"></div>
        
        {/* Animated Orbs - Purple and Gold */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-900/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-600/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      {/* Magical Cursor Torch Effect - Golden Glow */}
      <div 
        className="fixed z-50 pointer-events-none mix-blend-screen transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, rgba(0,0,0,0) 60%)',
          opacity: 1
        }}
      />
      <div 
        className="fixed z-50 pointer-events-none w-3 h-3 bg-amber-200 rounded-full mix-blend-screen blur-[1px]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Progress Bar (Gold) */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-800 via-amber-500 to-purple-800 z-50 transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md border-b border-amber-500/10 bg-[#130b20]/90">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <SnakeIcon className="text-amber-400 w-8 h-8" />
            <span className="tracking-widest uppercase text-lg">Lilith Dolohov</span>
          </div>
          <div className="hidden md:flex gap-6 text-xs font-medium tracking-widest uppercase text-amber-200/60 font-sans">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'services', label: 'Services' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 relative group py-2
                  ${activeSection === item.id 
                    ? 'text-amber-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                    : 'hover:text-amber-200 hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]'
                  }
                `}
              >
                {item.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-amber-400 transition-all duration-300 
                  ${activeSection === item.id ? 'w-full shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'w-0 group-hover:w-full'}
                `}></span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center pt-20">
          <div className="space-y-8 max-w-4xl relative">
            {/* Decorative Elements */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-amber-500/10 animate-spin-slow pointer-events-none">
               <Star size={300} strokeWidth={0.5} />
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-300 text-xs font-sans font-medium uppercase tracking-[0.2em] animate-fade-in backdrop-blur-sm">
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
              Specializing in fantasy, romance, and dark academia book covers. I weave typography and imagery into portals for your readers.
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8 font-sans">
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="px-10 py-4 bg-amber-500 text-[#130b20] font-bold uppercase tracking-wider rounded-sm hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] flex items-center gap-2"
              >
                View Portfolio <BookOpen className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 bg-transparent border border-amber-500/30 text-amber-200 font-bold uppercase tracking-wider rounded-sm hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-300 flex items-center gap-2"
              >
                Request Commission <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-amber-500/50">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-32 border-t border-amber-500/10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="md:w-1/2 relative">
                {/* Decorative Frame for Image */}
                <div className="absolute -inset-4 border border-amber-500/20 rotate-3 rounded-sm"></div>
                <div className="absolute -inset-4 border border-purple-500/20 -rotate-2 rounded-sm"></div>
                
                <div className="relative h-[500px] w-full bg-[#0a0510] border border-white/10 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
                  <User size={64} className="text-amber-500/50" />
                  <span className="absolute bottom-4 text-xs font-sans tracking-widest text-amber-500/50">Designer Portrait Placeholder</span>
                </div>
             </div>
             
             <div className="md:w-1/2 space-y-8">
               <h2 className="text-5xl font-serif text-amber-100">The Arcanist</h2>
               <div className="h-px w-20 bg-amber-500/50"></div>
               
               <p className="text-amber-100/70 text-lg leading-relaxed font-sans font-light">
                 I'm Lilith, a visual storyteller obsessed with the liminal spaces between reality and fiction. My design journey began in the darkroom of a fine arts college and evolved into digital sorcery.
               </p>
               <p className="text-amber-100/70 text-lg leading-relaxed font-sans font-light">
                 When I'm not blending layers in Photoshop, I'm scouring antique bookstores for vintage typography or studying the golden ratio in nature. I believe a book cover isn't just packaging—it's the first sentence of your story.
               </p>
               
               <div className="flex gap-4 pt-4">
                 <div className="text-center p-4 border border-white/5 bg-white/5 rounded-sm">
                   <h4 className="text-3xl font-serif text-amber-400">7+</h4>
                   <span className="text-[10px] uppercase tracking-widest text-amber-200/50">Years Exp.</span>
                 </div>
                 <div className="text-center p-4 border border-white/5 bg-white/5 rounded-sm">
                   <h4 className="text-3xl font-serif text-amber-400">100+</h4>
                   <span className="text-[10px] uppercase tracking-widest text-amber-200/50">Covers</span>
                 </div>
                 <div className="text-center p-4 border border-white/5 bg-white/5 rounded-sm">
                   <h4 className="text-3xl font-serif text-amber-400">NYT</h4>
                   <span className="text-[10px] uppercase tracking-widest text-amber-200/50">Bestsellers</span>
                 </div>
               </div>
             </div>
          </div>
        </section>

        {/* SERVICES (Formerly Pricing) */}
        <section id="services" className="py-32 border-t border-amber-500/10">
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
              price="260-300 USD"
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
              price="300-340 USD"
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
              price="340-370 USD"
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
            <PricingCard 
              title="Dustjacket + Naked Hardcase"
              price="370-450 USD"
              features={[
                "The ebook cover",
                "The paperback cover",
                "The dustjacket cover",
                "The naked hardcase cover",
                "No title cover artwork",
                "Artwork background"
              ]}
              highlight={true}
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
               <AddOnItem name="3D Mockup" price="10 USD each" />
             </div>
          </div>
        </section>

        {/* PORTFOLIO GRID */}
        <section id="portfolio" className="py-32 border-t border-amber-500/10">
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
              title="The Midnight Crown"
              author="J.K. Sterling"
              genre="YA Fantasy"
              color="from-purple-900 to-indigo-900"
              placeholderText="Crown & Dagger"
            />
            <BookCover 
              title="Velvet & Steel"
              author="Elena Rose"
              genre="Paranormal Romance"
              color="from-red-900 to-rose-900"
              placeholderText="Rose on Fire"
            />
            <BookCover 
              title="The Alchemist's Daughter"
              author="M.T. Black"
              genre="Steampunk / Magic"
              color="from-amber-900 to-yellow-900"
              placeholderText="Golden Gear"
            />
            <BookCover 
              title="Whispers in the Void"
              author="S.L. Vane"
              genre="Sci-Fi Thriller"
              color="from-cyan-900 to-blue-900"
              placeholderText="Space Void"
            />
            <BookCover 
              title="Gilded Cage"
              author="Victoria Aveyard"
              genre="Historical Fantasy"
              color="from-emerald-900 to-teal-900"
              placeholderText="Golden Birdcage"
            />
             <BookCover 
              title="Heart of Shadows"
              author="Lilith D."
              genre="Dark Fantasy"
              color="from-slate-900 to-gray-800"
              placeholderText="Shadow Figure"
            />
          </div>
        </section>

        {/* CONTACT SECTION WITH FORM */}
        <section id="contact" className="py-32 border-t border-amber-500/10">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 px-6">
            
            {/* Contact Info Side */}
            <div className="md:w-1/3 space-y-8">
              <div>
                <h2 className="text-4xl font-serif text-amber-100 mb-4">Summon Me</h2>
                <div className="h-1 w-12 bg-amber-500"></div>
              </div>
              <p className="text-amber-200/60 leading-relaxed font-sans">
                Ready to give your story the face it deserves? Fill out the parchment to the right, or send a direct owl via email.
              </p>
              
              <div className="space-y-4 font-sans text-sm tracking-wide">
                <div className="flex items-center gap-4 text-amber-200/80">
                  <Mail className="text-amber-500" size={20} />
                  <span>lilithtpdolohov@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-amber-200/80">
                  <Twitter className="text-amber-500" size={20} />
                  <span>@lilithdolohov</span>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                 <SocialLink icon={<Instagram />} href="#" label="Instagram" />
                 <SocialLink icon={<Twitter />} href="#" label="Twitter" />
                 <SocialLink icon={<ExternalLink />} href="#" label="Behance" />
              </div>
            </div>

            {/* Contact Form Side */}
            <div className="md:w-2/3 bg-white/5 p-8 md:p-12 border border-white/10 rounded-sm relative">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                 <SnakeIcon size={100} className="text-amber-500/20" />
               </div>
               
               <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-amber-500/70">Your Name</label>
                     <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors" 
                    />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs uppercase tracking-widest text-amber-500/70">Your Email</label>
                     <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors" 
                    />
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-amber-500/70">Service Required</label>
                   <select 
                     value={formData.service}
                     onChange={(e) => setFormData({...formData, service: e.target.value})}
                     className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors appearance-none"
                   >
                     <option>Ebook Package</option>
                     <option>Paperback Package</option>
                     <option>Dustjacket Package</option>
                     <option>Dustjacket + Naked Hardcase</option>
                     <option>Illustration Commission</option>
                     <option>Typography & Title Design</option>
                     <option>Other / General Inquiry</option>
                   </select>
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-amber-500/70">Add-ons (Optional)</label>
                   <input 
                      type="text" 
                      value={formData.addons}
                      onChange={(e) => setFormData({...formData, addons: e.target.value})}
                      placeholder="e.g. Audiobook Cover, 3D Mockup"
                      className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors" 
                    />
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs uppercase tracking-widest text-amber-500/70">Project Details</label>
                   <textarea 
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full bg-[#0a0510] border border-white/10 p-4 text-amber-100 focus:border-amber-500/50 focus:outline-none transition-colors h-32 resize-none"
                   ></textarea>
                 </div>

                 {/* Terms of Service Agreement */}
                 <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({...formData, agreedToTerms: e.target.checked})}
                        className="w-4 h-4 bg-[#0a0510] border-white/10 accent-amber-500 cursor-pointer" 
                      />
                      <label htmlFor="terms" className="text-sm text-amber-200/70 select-none cursor-pointer">
                        I have read and agree to the Terms of Service.
                      </label>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => setShowTerms(true)}
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-amber-300 transition-colors"
                    >
                      <FileText size={14} />
                      Read Terms of Service
                    </button>
                 </div>

                 <button 
                  disabled={!formData.agreedToTerms}
                  className={`w-full py-4 border font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3
                    ${formData.agreedToTerms 
                      ? 'bg-gradient-to-r from-purple-700 to-purple-900 border-amber-500/30 text-amber-100 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer' 
                      : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'}
                  `}
                 >
                   <Send size={16} />
                   Send Inquiry
                 </button>
               </form>
            </div>

          </div>
        </section>

        <footer className="py-12 text-center text-amber-900/40 text-xs font-sans uppercase tracking-widest border-t border-amber-500/5">
          <p>© {new Date().getFullYear()} Lilith Dolohov Design. All Rights Reserved.</p>
        </footer>

      </main>
    </div>
  );
};

// --- Sub Components ---

const PricingCard = ({ title, price, features, note, highlight, onSelect }) => (
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

const AddOnItem = ({ name, price }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2 hover:pl-2 transition-all duration-300 group cursor-default">
    <span className="text-amber-200/70 text-sm group-hover:text-amber-200">{name}</span>
    <span className="text-amber-500/80 text-sm font-bold tracking-wider">{price}</span>
  </div>
);

const BookCover = ({ title, author, genre, color, placeholderText }) => (
  <div className="group cursor-pointer relative perspective-1000">
    {/* Book Aspect Ratio Container (2:3 ratio standard for books) */}
    <div className="relative w-full pb-[150%] shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
      
      {/* Background/Image Placeholder */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} overflow-hidden border border-white/10`}>
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
        
        {/* Mock Content for Placeholder */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60 pt-4">{author}</span>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-white drop-shadow-lg leading-tight">{title}</h3>
            <div className="w-8 h-px bg-white/50 mx-auto"></div>
          </div>
          <span className="text-[10px] tracking-widest uppercase text-amber-400/80 pb-4">{genre}</span>
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform"></div>
      </div>
    </div>

    {/* Info below book */}
    <div className="mt-4 text-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
      <h4 className="text-amber-100 font-serif text-lg">{title}</h4>
      <p className="text-xs text-amber-500/70 font-sans uppercase tracking-widest mt-1">{genre}</p>
    </div>
  </div>
);

const SocialLink = ({ icon, href, label }) => (
  <a 
    href={href} 
    className="group relative p-4 rounded-full bg-white/5 text-amber-200/60 hover:text-amber-200 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-500/30"
    aria-label={label}
  >
    {React.cloneElement(icon, { size: 24 })}
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-amber-500/80">
      {label}
    </span>
  </a>
);

export default App;