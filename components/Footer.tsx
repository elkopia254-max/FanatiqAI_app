import React, { useState } from 'react';
import { Twitter, Instagram, Github, Mail, ShieldCheck, Scale, CheckCircle2, Loader2 } from 'lucide-react';
import { COMPLIANCE_LINKS } from '../lib/legal-engine';

const DigitalOscarLogo = ({ className = "w-16 h-16" }) => (
  <div className={`relative flex items-center justify-center ${className} group overflow-visible`}>
    <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B7326" />
        </linearGradient>
        <linearGradient id="obsidianFooter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#222" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      
      {/* 1. PEDESTAL */}
      <path d="M55 175 L145 175 L160 190 L40 190 Z" fill="url(#obsidianFooter)" stroke="url(#goldGradientFooter)" strokeWidth="0.5" />
      
      {/* 2. MAIN OBELISK PILLAR */}
      <path 
        d="M80 160 L120 160 L125 35 L100 25 L75 35 L80 160 Z" 
        fill="url(#obsidianFooter)" 
        stroke="url(#goldGradientFooter)" 
        strokeWidth="1.2"
      />
      
      {/* 3. CENTER EMBLEM */}
      <g transform="translate(86, 74) scale(0.65)">
        <path d="M5 5 L40 5 L35 15 L15 15 L15 28 L32 28 L28 38 L15 38 L15 65 L5 65 Z" fill="url(#goldGradientFooter)" />
      </g>

      {/* Symmetrical Rails */}
      <path d="M76 160 L71 35 L74 33 L79 160 Z" fill="url(#goldGradientFooter)" opacity="0.2" />
      <path d="M124 160 L129 35 L126 33 L121 160 Z" fill="url(#goldGradientFooter)" opacity="0.2" />
    </svg>
  </div>
);

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    
    // Simulate API call to Fanatiq Neural Backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-black/80 border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center space-x-6">
              <DigitalOscarLogo />
              <h1 className="text-2xl font-cinzel font-bold tracking-widest text-[#D4AF37]">
                FANATIQ<span className="text-white">AI</span>
              </h1>
            </div>
            <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-xs">
              Redefining creative boundaries through premium artificial intelligence. Built for visionaries, artists, and creators who demand the exceptional.
            </p>
            <div className="flex gap-5">
              {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-3 rounded-full border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all shadow-lg hover:-translate-y-1">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-cinzel text-sm text-white font-bold mb-8 tracking-[0.2em]">PLATFORM</h4>
            <ul className="space-y-4 text-xs text-neutral-500 font-bold tracking-widest">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors uppercase">Showcase</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors uppercase">Documentation</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors uppercase">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors uppercase">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-sm text-white font-bold mb-8 tracking-[0.2em]">COMPLIANCE</h4>
            <ul className="space-y-4 text-xs text-neutral-500 font-bold tracking-widest">
              <li><a href={COMPLIANCE_LINKS.GDPR} target="_blank" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 uppercase">
                <ShieldCheck size={14} /> GDPR Privacy
              </a></li>
              <li><a href={COMPLIANCE_LINKS.DMCA} target="_blank" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 uppercase">
                <Scale size={14} /> DMCA Policy
              </a></li>
              <li><a href={COMPLIANCE_LINKS.LICENSE} target="_blank" className="hover:text-[#D4AF37] transition-colors uppercase">Usage License</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors uppercase">Ethics Guidelines</a></li>
            </ul>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-neutral-800 space-y-6 shadow-2xl relative overflow-hidden min-h-[220px] flex flex-col justify-center">
            {status === 'success' ? (
              <div className="text-center space-y-4 animate-in fade-in zoom-in duration-700">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    <CheckCircle2 size={24} />
                  </div>
                </div>
                <h4 className="text-xs font-black text-white tracking-[0.3em] uppercase">LINK ESTABLISHED</h4>
                <p className="text-[10px] text-[#D4AF37] font-medium tracking-wide uppercase opacity-80">Welcome to the inner circle.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-[8px] font-black text-neutral-600 hover:text-neutral-400 tracking-[0.3em] uppercase transition-colors"
                >
                  ADD ANOTHER ENTITY
                </button>
              </div>
            ) : (
              <>
                <h4 className="text-xs font-black text-white tracking-[0.3em] uppercase">NEWSLETTER</h4>
                <p className="text-[10px] text-neutral-500 font-medium tracking-wide">Subscribe for early access to experimental models.</p>
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Secure email"
                    className="w-full bg-black border border-neutral-800 rounded-xl px-5 py-3 text-[11px] focus:outline-none focus:border-[#D4AF37]/50 transition-all text-white placeholder-neutral-700"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#D4AF37] text-black text-[11px] py-3 rounded-xl font-black tracking-[0.2em] uppercase hover:bg-[#F9E29C] transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        SYNCHRONIZING...
                      </>
                    ) : (
                      'SUBSCRIBE'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="pt-10 border-t border-neutral-900 text-center space-y-6">
          <p className="text-[11px] text-neutral-600 font-black tracking-[0.4em] uppercase">
            © 2024 FANATIQAI INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] text-neutral-700 font-bold tracking-widest uppercase">
            <span>Stylized Reinterpretation Engine Active</span>
            <span className="text-neutral-900">•</span>
            <span>GDPR Compliant</span>
            <span className="text-neutral-900">•</span>
            <span>DMCA Verified</span>
          </div>
          <p className="text-[10px] text-neutral-700 max-w-3xl mx-auto italic leading-relaxed">
            Disclaimer: Images generated are property of the creator under Fanatiq License. FanatiqAI utilizes advanced neural networks to create artistic reinterpretations. Real-person likeness is strictly prohibited by our core architecture.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;