
import React from 'react';
import { UserTier } from '../lib/subscription-store';
import { Crown, Trophy, Sparkles } from 'lucide-react';

export type ViewType = 'home' | 'trending' | 'community' | 'fanchat' | 'pricing';

interface Props {
  tier?: UserTier;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Header: React.FC<Props> = ({ tier = 'free', activeView, onViewChange }) => {
  const navItems = [
    { label: 'Build Your Star', value: 'home' as ViewType },
    { label: 'Top Trending', value: 'trending' as ViewType },
    { label: 'Community Feeds', value: 'community' as ViewType },
    { label: 'Fan Chat', value: 'fanchat' as ViewType },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-[#D4AF37]/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center space-x-4 group cursor-pointer"
            onClick={() => onViewChange('home')}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-xl rotate-45 group-hover:rotate-[225deg] transition-transform duration-1000 ease-in-out"></div>
              <div className="absolute inset-1.5 border border-[#D4AF37]/40 rounded-lg -rotate-12 group-hover:rotate-[168deg] transition-transform duration-700 ease-out delay-75"></div>
              <div className="absolute inset-0 bg-[#D4AF37]/5 blur-md rounded-full group-hover:bg-[#D4AF37]/15 transition-colors duration-500"></div>
              <div className="relative z-10 text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] group-hover:scale-110 transition-all duration-500">
                <Trophy size={18} strokeWidth={1.5} />
                <Sparkles size={6} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-cinzel font-bold tracking-widest text-[#D4AF37] leading-none">
                FANATIQ<span className="text-white transition-colors group-hover:text-[#D4AF37]">AI</span>
              </h1>
              {tier === 'pro' && (
                <div className="flex items-center gap-1 text-[7px] font-black tracking-[0.3em] text-[#D4AF37] mt-1 uppercase">
                  <Crown size={7} /> Ascended
                </div>
              )}
            </div>
          </div>
          
          <nav className="hidden lg:flex space-x-10 text-[9px] font-black tracking-[0.3em]">
            {navItems.map((item) => (
              <button 
                key={item.value}
                onClick={() => onViewChange(item.value)} 
                className={`relative transition-all duration-500 group pb-1 uppercase whitespace-nowrap ${
                  activeView === item.value ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transition-all duration-700 ${
                  activeView === item.value ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                }`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onViewChange('pricing')}
              className={`px-6 md:px-8 py-2.5 rounded-xl border transition-all duration-500 font-black text-[9px] tracking-[0.3em] uppercase group/btn ${
                activeView === 'pricing' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' 
                  : 'border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]'
              }`}
            >
              {tier === 'pro' ? 'SUBSCRIPTION' : 'UPGRADE'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
