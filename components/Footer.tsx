import React from 'react';
import { HelpCircle, Shield, Copyright, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import { ViewType } from './Header';

interface Props {
  onViewChange?: (view: ViewType) => void;
}

const Footer: React.FC<Props> = ({ onViewChange }) => {
  const footerLinks = [
    {
      id: 'guide',
      label: 'User Guide',
      icon: <HelpCircle size={14} />,
      content: '“Step-by-step instructions to create meaningful tributes for your favorite stars or clubs. Simple, intuitive, and fan-focused.”'
    },
    {
      id: 'legal',
      label: 'Legal Policy',
      icon: <Shield size={14} />,
      content: '“We respect your rights and privacy. All interactions on FanatiqAI follow ethical, transparent, and legally compliant standards.”'
    },
    {
      id: 'copyright',
      label: 'Copyright',
      icon: <Copyright size={14} />,
      content: '“FanatiqAI honors all original works. Please ensure your tributes respect copyrights and the creativity of others.”'
    },
    {
      id: 'brand',
      label: 'Our Brand',
      icon: <Sparkles size={14} />,
      content: '“Discover the mission behind FanatiqAI: to empower true fans to create, honor, and preserve the legacies of the stars they love.”'
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: <MessageCircle size={14} />,
      content: '“Have questions or ideas? Reach out to our team and we’ll help you make the most of your FanatiqAI experience.”'
    }
  ];

  const coreNav = [
    { label: 'Create Tribute', value: 'home' as ViewType },
    { label: 'G.O.A.T', value: 'trending' as ViewType },
    { label: 'Fan Book', value: 'community' as ViewType },
    { label: 'Fan Chat', value: 'fanchat' as ViewType },
    { label: 'Pricing', value: 'pricing' as ViewType },
  ];

  return (
    <footer className="w-full bg-[#0a0a0a] py-20 px-4 border-t border-[#D4AF37]/20 mt-20 relative overflow-visible">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[#D4AF37] font-cinzel font-bold text-2xl tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                FANATIQ<span className="text-white">AI</span>
              </h2>
              <p className="text-[11px] text-neutral-500 font-black tracking-[0.3em] uppercase leading-relaxed max-w-sm">
                The definitive platform for the modern fan. Create, honor, and preserve the digital legacies of the stars you love through advanced neural manifestation.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all cursor-pointer">
                <Sparkles size={18} />
              </div>
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-all cursor-pointer">
                <MessageCircle size={18} />
              </div>
            </div>
          </div>

          {/* Core Navigation Access */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.5em] text-[#D4AF37] uppercase">CORE ACCESS</h4>
            <nav className="flex flex-col gap-4">
              {coreNav.map((nav) => (
                <button
                  key={nav.value}
                  onClick={() => onViewChange?.(nav.value)}
                  className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] text-neutral-400 hover:text-white transition-all group w-full text-left uppercase"
                >
                  {nav.label}
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              ))}
            </nav>
          </div>

          {/* Context Popovers */}
          <div className="lg:col-span-5 space-y-8">
            <h4 className="text-[10px] font-black tracking-[0.5em] text-[#D4AF37] uppercase">DOCUMENTATION</h4>
            <div className="flex flex-wrap gap-x-8 gap-y-6">
              {footerLinks.map((link) => (
                <div key={link.id} className="group relative">
                  <button
                    type="button"
                    className="flex items-center gap-2.5 text-neutral-500 hover:text-[#D4AF37] transition-all duration-300 text-[10px] font-black tracking-[0.2em] uppercase focus:outline-none"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                    {link.label}
                  </button>
                  
                  {/* Hover Popover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 p-5 bg-neutral-900/95 border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] backdrop-blur-xl">
                    <div className="relative">
                      <p className="text-[11px] text-neutral-300 leading-relaxed font-medium italic text-center tracking-wide">
                        {link.content}
                      </p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900/95 border-b border-r border-[#D4AF37]/30 rotate-45 mt-[-1.5px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Strip */}
        <div className="pt-12 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-neutral-600 font-black tracking-[0.4em] uppercase">
            © 2026 FANATIQAI • Forged For Future Fans
          </p>
          <div className="flex gap-8">
            <span className="text-[8px] text-neutral-700 font-bold tracking-widest uppercase cursor-help hover:text-neutral-500 transition-colors">Privacy Shield</span>
            <span className="text-[8px] text-neutral-700 font-bold tracking-widest uppercase cursor-help hover:text-neutral-500 transition-colors">Neural Policy</span>
            <span className="text-[8px] text-neutral-700 font-bold tracking-widest uppercase cursor-help hover:text-neutral-500 transition-colors">Terms of Formation</span>
          </div>
        </div>
      </div>
      
      {/* Aesthetic Grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/granite.png')] mix-blend-overlay"></div>
    </footer>
  );
};

export default Footer;