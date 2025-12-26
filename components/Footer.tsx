
import React from 'react';
import { Globe, Star, Shield, Users } from 'lucide-react';
import { ViewType } from './Header';

interface Props {
  onViewChange?: (view: ViewType) => void;
}

const DigitalOscarLogo = ({ className = "w-20 h-20" }) => (
  <div className={`relative flex items-center justify-center ${className} group cursor-pointer overflow-visible`}>
    <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[60px] rounded-full scale-[3] group-hover:bg-[#D4AF37]/15 transition-all duration-1000 pointer-events-none" />
    <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const Footer: React.FC<Props> = ({ onViewChange }) => {
  const columns = [
    {
      title: 'THE UNIVERSE',
      icon: <Globe size={12} className="text-[#D4AF37]" />,
      links: [
        { label: 'About FanatiqAI', value: 'about' as ViewType },
        { label: 'Rewrite the Multiverse', value: 'law' as ViewType },
        { label: 'What is G.O.A.T?', value: 'goat' as ViewType },
        { label: 'How FanatiqAI Works', value: 'how-it-works' as ViewType },
        { label: 'FanatiqAI Manifesto', value: 'manifesto' as ViewType },
      ],
    },
    {
      title: 'THE STARS',
      icon: <Star size={12} className="text-[#D4AF37]" />,
      links: [
        { label: 'Trending G.O.A.Ts', value: 'trending' as ViewType },
        { label: 'Top Clubs', value: 'clubs-top' as ViewType },
        { label: 'New Tributes', value: 'tributes-new' as ViewType },
        { label: 'Legendary Tributes', value: 'tributes-legendary' as ViewType },
        { label: 'Fan Rankings', value: 'rankings' as ViewType },
      ],
    },
    {
      title: 'THE FANS',
      icon: <Users size={12} className="text-[#D4AF37]" />,
      links: [
        { label: 'Create a Tribute', value: 'home' as ViewType },
        { label: 'Fan Book', value: 'fan-book' as ViewType },
        { label: 'Fan Chat', value: 'fan-chat' as ViewType },
        { label: 'Become a Fanatiq', value: 'join' as ViewType },
        { label: 'Creator Levels & Badges', value: 'levels' as ViewType },
      ],
    },
    {
      title: 'THE LAW',
      icon: <Shield size={12} className="text-[#D4AF37]" />,
      links: [
        { label: 'Terms of Service', value: 'terms' as ViewType },
        { label: 'Privacy Policy', value: 'privacy' as ViewType },
        { label: 'Copyright & Ownership', value: 'copyright' as ViewType },
        { label: 'Community Rules', value: 'rules' as ViewType },
        { label: 'DMCA / Report Abuse', value: 'report' as ViewType },
        { label: 'Contact Support', value: 'support' as ViewType },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#050505] pt-24 pb-16 px-6 relative overflow-hidden border-t border-[#D4AF37]/10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#D4AF37]/5 blur-[160px] rounded-full -z-10 pointer-events-none opacity-40" />
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <div 
            className="mb-6 cursor-pointer transition-transform duration-700 hover:scale-110" 
            onClick={() => onViewChange?.('home')}
          >
            <DigitalOscarLogo className="w-12 h-12" />
          </div>
          <h2 className="text-[#D4AF37] font-cinzel font-bold text-lg md:text-xl tracking-[0.5em] uppercase mb-4 cursor-pointer" onClick={() => onViewChange?.('home')}>
            FANATIQ<span className="text-white">AI</span>
          </h2>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          {columns.map((col, idx) => (
            <div key={idx} className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  {col.icon}
                  <h4 className="text-[9px] font-black tracking-[0.4em] text-[#D4AF37] uppercase font-cinzel">
                    {col.title}
                  </h4>
                </div>
                <div className="relative w-full h-[1px] bg-neutral-900 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/40 to-transparent w-full" />
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-0.5 h-0.5 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37] animate-pulse" />
                </div>
              </div>

              <nav className="flex flex-col gap-4">
                {col.links.map((link, lIdx) => (
                  <button
                    key={lIdx}
                    onClick={() => onViewChange?.(link.value)}
                    className="group flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-neutral-500 hover:text-white transition-all duration-300 uppercase text-left w-fit"
                  >
                    <div className="w-0 h-[1px] bg-[#D4AF37] group-hover:w-3 transition-all duration-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-500">{link.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <p 
              className="text-[8px] text-white/40 font-black tracking-[0.5em] uppercase cursor-pointer hover:text-white transition-colors"
              onClick={() => onViewChange?.('law')}
            >
              © FANATIQAI — REWRITE THE MULTIVERSE
            </p>
            <p 
              className="text-[7px] text-[#D4AF37]/60 font-black tracking-[0.3em] uppercase cursor-pointer hover:text-[#D4AF37] transition-colors"
              onClick={() => onViewChange?.('copyright')}
            >
              All Tributes Belong to Their Fans.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex gap-5">
              {['Discord', 'X', 'Legacy'].map((social) => (
                <button key={social} className="text-[8px] font-black tracking-widest text-neutral-600 hover:text-[#D4AF37] transition-colors uppercase">
                  {social}
                </button>
              ))}
            </div>
            <div className="h-6 w-[1px] bg-neutral-900 hidden md:block" />
            <div className="flex items-center gap-2 text-[8px] font-black tracking-[0.4em] text-neutral-600 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              Core Synchronized
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/granite.png')] mix-blend-overlay"></div>
    </footer>
  );
};

export default Footer;
