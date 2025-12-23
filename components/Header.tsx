import React from 'react';
import { UserTier } from '../lib/subscription-store';
import { Crown } from 'lucide-react';

export type ViewType = 'home' | 'trending' | 'community' | 'fanchat' | 'pricing';

interface Props {
  tier?: UserTier;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const DigitalOscarLogo = ({ className = "w-24 h-24" }) => (
  <div className={`relative flex items-center justify-center ${className} group cursor-pointer overflow-visible`}>
    {/* Atmospheric Depth Glow */}
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

      {/* 1. CEREMONIAL PEDESTAL (Weighted, Static) */}
      <g className="transition-transform duration-700 group-hover:translate-y-[1px]">
        {/* Foundation Base */}
        <path d="M40 190 L160 190 L150 175 L50 175 Z" fill="url(#obsidianDeep)" stroke="#111" strokeWidth="0.5" />
        {/* Tiered Granite Level */}
        <path d="M55 175 L145 175 L138 165 L62 165 Z" fill="#080808" stroke="#222" strokeWidth="0.5" />
        {/* Top Plinth */}
        <path d="M70 165 L130 165 L125 160 L75 160 Z" fill="#0c0c0c" stroke="url(#chromePolished)" strokeWidth="0.3" opacity="0.6" />
      </g>

      {/* 2. THE ASCENSION PILLAR (Vertical & Authoritative) */}
      <g className="transition-all duration-1000 group-hover:scale-[1.02] origin-bottom">
        {/* Main Obsidian Obelisk Body */}
        <path 
          d="M80 160 L120 160 L125 30 L100 20 L75 30 L80 160 Z" 
          fill="url(#obsidianDeep)" 
          stroke="url(#chromePolished)" 
          strokeWidth="0.5"
          opacity="0.95"
        />
        
        {/* Symmetrical Chrome Rails (Precision Accents) */}
        <path d="M78 160 L73 30 L76 28 L81 160 Z" fill="url(#chromePolished)" opacity="0.8" />
        <path d="M122 160 L127 30 L124 28 L119 160 Z" fill="url(#chromePolished)" opacity="0.8" />
        
        {/* Central Dark Glass Shard */}
        <path 
          d="M100 155 L115 140 L115 45 L100 35 L85 45 L85 140 Z" 
          fill="#000" 
          stroke="url(#goldAccolade)" 
          strokeWidth="0.8"
          strokeOpacity="0.3"
        />
      </g>

      {/* 3. ICONIC CORE (The "F" Monogram Emblem) */}
      <g className="transition-all duration-700 group-hover:translate-y-[-2px]">
        {/* Framing Shield (Hexagon Honor) */}
        <path 
          d="M100 115 L125 100 L125 70 L100 55 L75 70 L75 100 Z" 
          fill="rgba(0,0,0,0.8)" 
          stroke="url(#goldAccolade)" 
          strokeWidth="1.2"
          filter="url(#prestigeGlow)"
        />
        
        {/* Luminous Internal Glow */}
        <circle cx="100" cy="85" r="25" fill="url(#goldAccolade)" opacity="0.08" filter="url(#prestigeGlow)" />

        {/* The Monogram 'F' (Chrome/Gold Hybrid) */}
        <g transform="translate(86, 74) scale(0.72)">
          <path 
            d="M5 5 L40 5 L35 15 L15 15 L15 28 L32 28 L28 38 L15 38 L15 65 L5 65 Z" 
            fill="url(#goldAccolade)" 
          />
        </g>
      </g>

      {/* 4. CEREMONIAL FINIAL (The Cap) */}
      <path d="M90 25 L110 25 L100 15 Z" fill="url(#chromePolished)" filter="url(#prestigeGlow)" />
    </svg>
  </div>
);

const Header: React.FC<Props> = ({ tier = 'free', activeView, onViewChange }) => {
  const navItems = [
    { label: 'CREATE VARIANT', value: 'home' as ViewType },
    { label: 'NEW G.O.A.T', value: 'trending' as ViewType },
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