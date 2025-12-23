import React, { useState } from 'react';
import { Check, Star, ShieldCheck, ArrowRight, X, CreditCard, Smartphone, CheckCircle2 } from 'lucide-react';
import { UserTier } from '../lib/subscription-store';

interface Props {
  currentTier: UserTier;
  onSelect: () => void;
}

const Pricing: React.FC<Props> = ({ currentTier, onSelect }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [method, setMethod] = useState<'mpesa' | 'stripe' | 'paypal' | null>(null);

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSelect();
    setShowCheckout(false);
  };

  return (
    <div className="py-20 relative">
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#D4AF37]/5 blur-[200px] rounded-full" />
      
      <div className="text-center space-y-6 mb-24 stagger-reveal active px-4">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-neutral-900/50 border border-neutral-800 text-[9px] font-black tracking-[0.4em] text-neutral-500 uppercase">
          <ShieldCheck size={14} className="text-[#D4AF37]" />
          SECURE PROTOCOL ACTIVE
        </div>
        <h2 className="text-4xl md:text-7xl font-cinzel font-bold text-white uppercase tracking-[0.1em] leading-tight">
          CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326]">LEGACY</span>
        </h2>
        <p className="text-neutral-500 max-w-2xl mx-auto font-light text-lg md:text-xl leading-relaxed">
          Unlock the full spectrum of high-fidelity AI synthesis with our premium membership tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto px-4">
        {/* Free Plan */}
        <div className={`glass p-8 md:p-12 rounded-[2.5rem] border flex flex-col hover-lift bg-neutral-900/20 transition-all duration-700 ${currentTier === 'free' ? 'border-[#D4AF37]/30 shadow-2xl' : 'border-neutral-800/50 opacity-60'}`}>
          <div className="mb-10">
            <h3 className="text-xl font-cinzel font-bold text-neutral-400 mb-4 tracking-[0.3em] uppercase">INITIATE</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">$0</span>
              <span className="text-neutral-600 text-[10px] font-black tracking-[0.2em] uppercase">/ FREEFOREVER</span>
            </div>
          </div>
          
          <ul className="space-y-5 mb-12 flex-1">
            {[
              '3 Daily Generations',
              'Single Vision Output',
              'Standard Precision',
              'Global Watermark',
              'Neural Cooldown Active',
              'Public Feed Access'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-neutral-500 uppercase">
                <div className="w-5 h-5 rounded-lg bg-neutral-900 flex items-center justify-center flex-shrink-0 border border-neutral-800">
                  <Check size={12} className="text-neutral-600" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <button 
            disabled={currentTier === 'free'}
            onClick={currentTier === 'pro' ? onSelect : undefined}
            className={`w-full py-5 rounded-2xl border text-[10px] font-black tracking-[0.3em] transition-all duration-500 uppercase ${
              currentTier === 'free' 
                ? 'bg-neutral-900 border-neutral-800 text-neutral-600 cursor-default'
                : 'border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50'
            }`}
          >
            {currentTier === 'free' ? 'CURRENT ARCHETYPE' : 'RETURN TO FREE'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className={`relative glass p-8 md:p-12 rounded-[2.5rem] flex flex-col overflow-hidden hover-lift bg-neutral-900/40 transition-all duration-700 ${
          currentTier === 'pro' 
            ? 'border-[#D4AF37] shadow-[0_30px_70px_rgba(212,175,55,0.3)] ring-2 ring-[#D4AF37]/20' 
            : 'border-[#D4AF37]/40 shadow-xl'
        }`}>
          <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#8B7326] px-12 py-3 text-black text-[8px] font-black tracking-[0.4em] -rotate-45 translate-x-12 translate-y-4 origin-center z-10">
            ELITE
          </div>
          
          <div className="mb-10">
            <div className="flex items-center gap-3 text-[#D4AF37] mb-4">
              <Star size={20} fill="#D4AF37" className="animate-pulse" />
              <h3 className="text-xl font-cinzel font-bold tracking-[0.3em] uppercase">ASCENDED</h3>
            </div>
            <div className="flex items-baseline gap-2 text-white">
              <span className="text-5xl font-black">$10</span>
              <span className="text-neutral-500 text-[10px] font-black tracking-[0.2em] uppercase">/ MONTHLY</span>
            </div>
          </div>
          
          <ul className="space-y-5 mb-12 flex-1">
            {[
              'Unlimited Generations',
              'Quad-Vision Outputs',
              'Hyper-Precision Mode',
              'Pure Identity (No Watermarks)',
              'Zero Neural Latency',
              'Timeline Artifact Access',
              'Rare Style Unlocks',
              'Priority Server Core'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-white/80 uppercase">
                <div className="w-5 h-5 rounded-lg bg-[#D4AF37] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <CheckCircle2 size={12} className="text-black" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => currentTier === 'free' ? setShowCheckout(true) : onSelect()}
            className={`w-full py-6 rounded-2xl font-black text-[11px] tracking-[0.3em] transition-all duration-500 uppercase group flex items-center justify-center gap-3 ${
              currentTier === 'pro'
                ? 'bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 shadow-inner'
                : 'bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black shadow-[0_20px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_25px_60px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-95'
            }`}
          >
            {currentTier === 'pro' ? 'CANCEL SESSION' : (
              <>
                ASCEND TO PRO
                <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowCheckout(false)} />
          <div className="relative glass w-full max-w-md rounded-[3rem] border-[#D4AF37]/40 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden p-8 md:p-12 space-y-8 animate-in zoom-in-95 duration-500">
            <button onClick={() => setShowCheckout(false)} className="absolute top-8 right-8 text-neutral-600 hover:text-white transition-all hover:rotate-90">
              <X size={24} />
            </button>
            
            <div className="text-center space-y-2">
              <h3 className="font-cinzel text-2xl font-bold text-white tracking-[0.2em] uppercase">SECURE PORTAL</h3>
              <p className="text-[9px] font-black tracking-[0.4em] text-[#D4AF37] uppercase">ASCENDED STATUS • $10.00 USD</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => setMethod('mpesa')}
                className={`w-full p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between group ${method === 'mpesa' ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-600'}`}
              >
                <div className="flex items-center gap-4">
                  <Smartphone className={method === 'mpesa' ? 'text-[#D4AF37]' : 'text-neutral-600'} />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white tracking-wide">M-PESA / MOBILE</p>
                    <p className="text-[8px] text-neutral-500 uppercase tracking-widest font-black">LOCAL SETTLEMENT</p>
                  </div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${method === 'mpesa' ? 'bg-[#D4AF37] scale-100 shadow-[0_0_10px_#D4AF37]' : 'bg-neutral-800 scale-50'}`} />
              </button>

              <button 
                onClick={() => setMethod('stripe')}
                className={`w-full p-6 rounded-2xl border transition-all duration-500 flex items-center justify-between group ${method === 'stripe' ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-600'}`}
              >
                <div className="flex items-center gap-4">
                  <CreditCard className={method === 'stripe' ? 'text-[#D4AF37]' : 'text-neutral-600'} />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white tracking-wide">GLOBAL CARD</p>
                    <p className="text-[8px] text-neutral-500 uppercase tracking-widest font-black">ENCRYPTED CHECKOUT</p>
                  </div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${method === 'stripe' ? 'bg-[#D4AF37] scale-100 shadow-[0_0_10px_#D4AF37]' : 'bg-neutral-800 scale-50'}`} />
              </button>
            </div>

            <button 
              disabled={!method || isProcessing}
              onClick={handlePayment}
              className={`w-full py-6 rounded-2xl font-black text-xs tracking-[0.4em] transition-all duration-500 uppercase flex items-center justify-center gap-3 shadow-2xl ${
                !method || isProcessing 
                  ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed border border-neutral-800'
                  : 'bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black hover:scale-[1.02] active:scale-95'
              }`}
            >
              {isProcessing ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>PAY SECURELY <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;