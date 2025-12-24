import React from 'react';
import { SubscriptionState } from '../lib/subscription-store';
import { Zap, Crown, ArrowRight, Shield } from 'lucide-react';
import { ForgeState, FORGE_MESSAGES } from '../lib/forge-state';

interface Props {
  state: SubscriptionState;
  forgeState: ForgeState;
  onUpgradeClick: () => void;
}

const UsageTracker: React.FC<Props> = ({ state, forgeState, onUpgradeClick }) => {
  const isPro = state.tier === 'pro';
  const progress = isPro ? 100 : (state.dailyUsage / state.maxDaily) * 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-0 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Quiet Capacity Signal */}
      <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-neutral-900 bg-neutral-950/40 opacity-60">
        <Shield size={12} className="text-[#D4AF37]/40" />
        <span className="text-[8px] font-black tracking-[0.4em] text-neutral-600 uppercase">
          {FORGE_MESSAGES.DORMANT}
        </span>
      </div>

      <div className="glass p-3 md:p-4 rounded-[1.2rem] flex flex-col md:flex-row items-center gap-4 border-[#D4AF37]/15 hover:border-[#D4AF37]/30 transition-all duration-700 w-full md:w-auto md:min-w-[450px]">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`p-2 rounded-lg transition-all duration-500 ${isPro ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-neutral-900 border border-neutral-800 text-neutral-600'}`}>
            {isPro ? <Crown size={14} /> : <Zap size={14} />}
          </div>
          <div className="whitespace-nowrap">
            <h4 className="text-[7px] font-black tracking-[0.3em] text-white uppercase mb-0.5">
              {isPro ? 'NEURAL UNLIMITED' : 'DAILY RESONANCE'}
            </h4>
            <p className="text-[8px] text-neutral-500 font-bold tracking-widest">
              {isPro ? 'ASCENDED' : `${state.dailyUsage} / ${state.maxDaily}`}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full h-1 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900/50">
          <div 
            className={`h-full transition-all duration-[1.5s] ease-out relative ${isPro ? 'bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326]' : 'bg-[#D4AF37]/30'}`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        {!isPro && (
          <button 
            className="w-full md:w-auto px-4 py-2 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] text-[7px] font-black tracking-[0.3em] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:shadow-[0_10px_20px_rgba(212,175,55,0.2)] transition-all duration-500 uppercase flex items-center justify-center gap-2 group"
            onClick={onUpgradeClick}
          >
            UPGRADE
            <ArrowRight size={10} className="transition-transform duration-500 group-hover:translate-x-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UsageTracker;
