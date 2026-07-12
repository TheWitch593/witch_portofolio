import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Close mobile nav when location changes
  useEffect(() => {
    setIsMobileNavOpen(false);
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About' },
    { id: '/portfolio', label: 'Portfolio' },
    { id: '/premades', label: 'Premades' },
    { id: '/services', label: 'Services' },
    { id: '/contact', label: 'Contact' }
  ];

  return (
    <div className="relative min-h-screen bg-[#130b20] text-amber-50 overflow-x-hidden font-serif selection:bg-amber-500/30 selection:text-amber-200 flex flex-col">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
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

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 border-b border-amber-500/10 bg-[#130b20]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-5">
          <Link to="/" className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 flex items-center gap-3 cursor-pointer">
            <img
              src="/assets/Logo.png"
              alt="Lilith Dolohov logo"
              className="w-14 h-14 object-contain select-none"
              draggable={false}
            />
            <span className="tracking-widest uppercase text-lg">Lilith Dolohov</span>
          </Link>
          <div className="hidden md:flex gap-6 text-xs font-medium tracking-widest uppercase text-amber-200/60 font-sans">
            {navItems.map((item) => {
              const isActive = location.pathname === item.id;
              return (
                <Link 
                  key={item.id} 
                  to={item.id}
                  className={`transition-all duration-300 relative group py-2
                    ${isActive 
                      ? 'text-amber-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' 
                      : 'hover:text-amber-200 hover:drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]'
                    }
                  `}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-amber-400 transition-all duration-300 
                    ${isActive ? 'w-full shadow-[0_0_10px_rgba(251,191,36,0.8)]' : 'w-0 group-hover:w-full'}
                  `}></span>
                </Link>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-amber-500/30 text-amber-200/70 hover:text-amber-100 hover:border-amber-500/60 transition-colors"
            aria-label="Toggle navigation"
            aria-expanded={isMobileNavOpen}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-1">
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${isMobileNavOpen ? 'translate-y-[5px] rotate-45' : ''}`}></span>
              <span className={`h-px w-5 bg-current transition-opacity duration-300 ${isMobileNavOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`h-px w-5 bg-current transition-transform duration-300 ${isMobileNavOpen ? '-translate-y-[5px] -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
        {isMobileNavOpen && (
          <div className="md:hidden border-t border-amber-500/10 bg-[#130b20]/95 backdrop-blur-md px-6 py-4">
            <div className="flex flex-col gap-3 text-xs font-medium tracking-widest uppercase text-amber-200/70 font-sans">
              {navItems.map((item) => {
                const isActive = location.pathname === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.id}
                    className={`py-2 text-left transition-colors duration-200 ${isActive ? 'text-amber-100' : 'hover:text-amber-200'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="relative w-full flex-grow flex flex-col max-w-7xl mx-auto px-6">
        <Outlet />
      </main>

      <footer className="relative py-12 text-center text-amber-900/40 text-xs font-sans uppercase tracking-widest border-t border-amber-500/5 mt-auto bg-[#130b20]">
        <p>© {new Date().getFullYear()} Lilith Dolohov Design. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
