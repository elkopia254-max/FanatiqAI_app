import React, { useState } from 'react';
import { UserTier } from '../lib/subscription-store';
import { Crown, LogIn, UserPlus } from 'lucide-react';

export type ViewType = 'home' | 'trending' | 'community' | 'fanchat' | 'pricing';

interface Props {
  tier?: UserTier;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAuthClick: (mode: 'login' | 'signup') => void;
}

const DigitalOscarLogo = ({ className = "w-24 h-24" }) => (
  <div className={`relative flex items-center justify-center ${className} group cursor-pointer overflow-visible`}>
    <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[80px] rounded-full scale-[4] group-hover:bg-[#D4AF37]/15 transition-all duration-1000 pointer-events-none" />
    <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_35px_60px_rgba(0,0,0,0.95)] overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="obsidianDeep" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#050505" />
        </linearGradient>
        <linearGradient id="chromePolished" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A0A0A0" />
          <stop offset="25%" stopColor="#E0E0E0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#E0E0E0" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
        <linearGradient id="goldAccolade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F9E29C" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B7326" />
        </linearGradient>
        <filter id="prestigeGlow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <g className="transition-transform duration-700 group-hover:translate-y-[1px]">
        <path d="M40 190 L160 190 L150 175 L50 175 Z" fill="url(#obsidianDeep)" stroke="#111" strokeWidth="0.5" />
        <path d="M55 175 L145 175 L138 165 L62 165 Z" fill="#080808" stroke="#222" strokeWidth="0.5" />
        <path d="M70 165 L130 165 L125 160 L75 160 Z" fill="#0c0c0c" stroke="url(#chromePolished)" strokeWidth="0.3" opacity="0.6" />
      </g>
      <g className="transition-all duration-1000 group-hover:scale-[1.02] origin-bottom">
        <path d="M80 160 L120 160 L125 30 L100 20 L75 30 L80 160 Z" fill="url(#obsidianDeep)" stroke="url(#chromePolished)" strokeWidth="0.5" opacity="0.95" />
        <path d="M78 160 L73 30 L76 28 L81 160 Z" fill="url(#chromePolished)" opacity="0.8" />
        <path d="M122 160 L127 30 L124 28 L119 160 Z" fill="url(#chromePolished)" opacity="0.8" />
        <path d="M100 155 L115 140 L115 45 L100 35 L85 45 L85 140 Z" fill="#000" stroke="url(#goldAccolade)" strokeWidth="0.8" strokeOpacity="0.3" />
      </g>
      <g className="transition-all duration-700 group-hover:translate-y-[-2px]">
        <path d="M100 115 L125 100 L125 70 L100 55 L75 70 L75 100 Z" fill="rgba(0,0,0,0.8)" stroke="url(#goldAccolade)" strokeWidth="1.2" filter="url(#prestigeGlow)" />
        <circle cx="100" cy="85" r="25" fill="url(#goldAccolade)" opacity="0.08" filter="url(#prestigeGlow)" />
        <g transform="translate(86, 74) scale(0.72)">
          <path d="M5 5 L40 5 L35 15 L15 15 L15 28 L32 28 L28 38 L15 38 L15 65 L5 65 Z" fill="url(#goldAccolade)" />
        </g>
      </g>
      <path d="M90 25 L110 25 L100 15 Z" fill="url(#chromePolished)" filter="url(#prestigeGlow)" />
    </svg>
  </div>
);

const Header: React.FC<Props> = ({ tier = 'free', activeView, onViewChange, onAuthClick }) => {
  const [hoveredBtn, setHoveredBtn] = useState<'login' | 'signup' | null>(null);

  const navItems = [
    { label: 'CREATE TRIBUTE', value: 'home' as ViewType },
    { label: 'G.O.A.T', value: 'trending' as ViewType },
    { label: 'Fan Book', value: 'community' as ViewType },
    { label: 'Fan Chat', value: 'fanchat' as ViewType },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-[#D4AF37]/30 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-2 lg:px-4">
        <div className="flex justify-between items-center h-24 py-4">
          <div 
            className="flex items-center space-x-3 group cursor-pointer flex-shrink-0"
            onClick={() => onViewChange('home')}
          >
            <DigitalOscarLogo />
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-cinzel font-bold tracking-[0.2em] text-[#D4AF37] leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                FANATIQ<span className="text-white transition-colors group-hover:text-[#D4AF37]">AI</span>
              </h1>
              {tier === 'pro' && (
                <div className="flex items-center gap-1.5 text-[8px] font-black tracking-[0.4em] text-[#D4AF37] mt-2 uppercase opacity-90 drop-shadow-sm">
                  <Crown size={8} className="fill-[#D4AF37]" /> ASCENDED
                </div>
              )}
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-[10px] font-black tracking-[0.3em] flex-1 justify-center">
            {navItems.map((item) => (
              <button 
                key={item.value}
                onClick={() => onViewChange(item.value)} 
                className={`relative transition-all duration-150 group pb-2 uppercase whitespace-nowrap ${
                  activeView === item.value ? 'text-white' : 'text-neutral-500 hover:text-neutral-200'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-200 ${
                  activeView === item.value ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-80'
                }`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3 mr-4 border-r border-neutral-800 pr-6">
              <div className="relative group/auth">
                <button 
                  onClick={() => onAuthClick('login')}
                  onMouseEnter={() => setHoveredBtn('login')}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-400 hover:text-white transition-colors uppercase py-2"
                >
                  <LogIn size={14} /> LOGIN
                </button>
                {hoveredBtn === 'login' && (
                  <div className="absolute top-full right-0 mt-3 p-3 bg-neutral-900 border border-[#D4AF37]/30 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[60] w-48 text-center pointer-events-none">
                    <p className="text-[8px] font-black tracking-widest text-neutral-300 uppercase leading-relaxed">
                      Access your FanatiqAI account to continue creating.
                    </p>
                    <div className="absolute -top-1 right-10 w-2 h-2 bg-neutral-900 border-t border-l border-[#D4AF37]/30 rotate-45" />
                  </div>
                )}
              </div>

              <div className="relative group/auth">
                <button 
                  onClick={() => onAuthClick('signup')}
                  onMouseEnter={() => setHoveredBtn('signup')}
                  onMouseLeave={() => setHoveredBtn(null)}
                  className="flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-400 hover:text-[#D4AF37] transition-colors uppercase py-2"
                >
                  <UserPlus size={14} /> SIGN UP
                </button>
                {hoveredBtn === 'signup' && (
                  <div className="absolute top-full right-0 mt-3 p-3 bg-neutral-900 border border-[#D4AF37]/30 rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-[60] w-48 text-center pointer-events-none">
                    <p className="text-[8px] font-black tracking-widest text-[#D4AF37] uppercase leading-relaxed">
                      New? Join now and start building your tributes.
                    </p>
                    <div className="absolute -top-1 right-10 w-2 h-2 bg-neutral-900 border-t border-l border-[#D4AF37]/30 rotate-45" />
                  </div>
                )}
              </div>
            </div>

            <button 
              onClick={() => onViewChange('pricing')}
              className={`px-8 md:px-10 py-3.5 rounded-2xl border transition-all duration-150 font-black text-[11px] tracking-[0.3em] uppercase group/btn ${
                activeView === 'pricing' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.7)]' 
                  : 'border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]'
              }`}
            >
              {tier === 'pro' ? 'SESSION' : 'UPGRADE'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;