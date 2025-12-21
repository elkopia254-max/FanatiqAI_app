
import React from 'react';
import { Twitter, Instagram, Github, Mail, ShieldCheck, Scale } from 'lucide-react';
import { COMPLIANCE_LINKS } from '../lib/legal-engine';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/80 border-t border-neutral-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold text-sm font-cinzel">F</span>
              </div>
              <h1 className="text-xl font-cinzel font-bold tracking-widest text-[#D4AF37]">
                FANATIQ<span className="text-white">AI</span>
              </h1>
            </div>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Redefining creative boundaries through premium artificial intelligence. Built for visionaries, artists, and creators who demand the exceptional.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-cinzel text-sm text-white font-bold mb-6 tracking-widest">PLATFORM</h4>
            <ul className="space-y-3 text-xs text-neutral-500 font-medium">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Showcase</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-sm text-white font-bold mb-6 tracking-widest">COMPLIANCE</h4>
            <ul className="space-y-3 text-xs text-neutral-500 font-medium">
              <li><a href={COMPLIANCE_LINKS.GDPR} target="_blank" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <ShieldCheck size={12} /> GDPR Privacy
              </a></li>
              <li><a href={COMPLIANCE_LINKS.DMCA} target="_blank" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                <Scale size={12} /> DMCA Policy
              </a></li>
              <li><a href={COMPLIANCE_LINKS.LICENSE} target="_blank" className="hover:text-[#D4AF37] transition-colors">Usage License</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Ethics Guidelines</a></li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl border border-neutral-800 space-y-4">
            <h4 className="text-xs font-bold text-white tracking-[0.2em]">NEWSLETTER</h4>
            <p className="text-[10px] text-neutral-500">Subscribe for early access to experimental models.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-black border border-neutral-800 rounded-l-lg px-4 py-2 text-[10px] focus:outline-none focus:border-[#D4AF37]/40"
              />
              <button className="bg-[#D4AF37] text-black text-[10px] px-4 rounded-r-lg font-bold">JOIN</button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 text-center space-y-4">
          <p className="text-[10px] text-neutral-600 font-bold tracking-[0.3em]">
            © 2024 FANATIQAI INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex justify-center gap-4 text-[9px] text-neutral-700 italic">
            <span>Stylized Reinterpretation Engine Active</span>
            <span className="text-neutral-800">•</span>
            <span>GDPR Compliant</span>
            <span className="text-neutral-800">•</span>
            <span>DMCA Verified</span>
          </div>
          <p className="text-[9px] text-neutral-700 max-w-2xl mx-auto italic">
            Disclaimer: Images generated are property of the creator under Fanatiq License. AI systems may produce unexpected results. Always review output before publication.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
