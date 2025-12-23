import React from 'react';
import { HelpCircle, Shield, Copyright, Sparkles, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
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

  return (
    <footer className="w-full bg-[#0a0a0a] py-16 px-4 border-t border-[#D4AF37]/20 mt-20 relative overflow-visible">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Core Navigation Section */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
          {footerLinks.map((link) => (
            <div key={link.id} className="group relative">
              <button
                type="button"
                aria-label={link.label}
                className="flex items-center gap-2.5 text-neutral-500 hover:text-[#D4AF37] transition-all duration-300 text-[10px] font-black tracking-[0.2em] uppercase focus:outline-none"
              >
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                {link.label}
              </button>
              
              {/* Hover Popover (Dark Mode / Charcoal Aesthetic) */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 p-5 bg-neutral-900/95 border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-[100] backdrop-blur-xl">
                <div className="relative">
                  <p className="text-[11px] text-neutral-300 leading-relaxed font-medium italic text-center tracking-wide">
                    {link.content}
                  </p>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900/95 border-b border-r border-[#D4AF37]/30 rotate-45 mt-[-1.5px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Branding & Secondary Info */}
        <div className="space-y-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-[#D4AF37] font-cinzel font-bold text-lg tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">
              FANATIQAI
            </h2>
            <p className="text-[10px] text-neutral-500 font-black tracking-[0.5em] uppercase">
              Create. Honor. Share. For the stars you love.
            </p>
          </div>
          
          <div className="pt-8 border-t border-neutral-900/50">
            <p className="text-[9px] text-neutral-600 font-bold tracking-[0.3em] uppercase">
              © 2024 FANATIQAI • ESTABLISHED FOR THE FANS
            </p>
          </div>
        </div>
      </div>
      
      {/* Aesthetic Grain/Noise overlay for the footer area specifically */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/granite.png')] mix-blend-overlay"></div>
    </footer>
  );
};

export default Footer;