import React, { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Rocket, Timer, Layers, Circle, Square, Triangle, Activity, Check } from 'lucide-react';
import { SubArchetypeFlavor, SUB_ARCHETYPES } from '../lib/style-library';
import { UserTier } from '../lib/subscription-store';
import { ForgeState } from '../lib/forge-state';

interface Props {
  onGenerate: (prompt: string, archetype: SubArchetypeFlavor) => void;
  forgeState: ForgeState;
  tier: UserTier;
  cooldown: number;
  canGenerate: boolean;
  onInputFocus: () => void;
}

const ArchetypeIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'circle': return <Circle className={className} />;
    case 'square': return <Square className={className} />;
    case 'triangle': return <Triangle className={className} />;
    case 'activity': return <Activity className={className} />;
    default: return <Layers className={className} />;
  }
};

const PromptGenerator: React.FC<Props> = ({ onGenerate, forgeState, tier, cooldown, canGenerate, onInputFocus }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<SubArchetypeFlavor>('classical');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && (forgeState === 'CONVENING' || forgeState === 'DORMANT' || forgeState === 'COMPLETED') && canGenerate) {
      onGenerate(prompt, selectedStyle);
    }
  };

  const archetypesList = Object.values(SUB_ARCHETYPES);
  const isInputLocked = forgeState === 'SEALED' || forgeState === 'FORGING' || forgeState === 'SUSPENDED' || forgeState === 'FAILED';

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-0 relative z-[100]">
      <form onSubmit={handleSubmit} className="relative group">
        {/* Outer Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/5 via-[#D4AF37]/20 to-[#D4AF37]/5 rounded-[2.5rem] blur-xl opacity-0 transition duration-1000 ${forgeState === 'FORGING' ? 'opacity-100' : 'group-hover:opacity-100'}`} />
        
        <div className={`relative glass rounded-[2.5rem] p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 border-[#D4AF37]/20 shadow-2xl transition-all duration-500 z-10 ${forgeState === 'FORGING' ? 'border-[#D4AF37]/60 ring-2 ring-[#D4AF37]/10' : ''}`}>
          
          {/* Archetype Selector Trigger */}
          <div className="relative">
            <button 
              type="button"
              disabled={isInputLocked}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`h-full px-7 py-4 flex items-center justify-between gap-6 text-[10px] font-black tracking-[0.2em] border-b md:border-b-0 md:border-r border-neutral-800/50 hover:bg-white/[0.04] transition-all min-w-full md:min-w-[240px] rounded-2xl md:rounded-r-none group/select ${isDropdownOpen ? 'bg-white/[0.08] border-[#D4AF37]/40' : 'text-neutral-400'} ${isInputLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-[7px] text-[#D4AF37] mb-1.5 tracking-[0.4em] uppercase flex items-center gap-2 font-black">
                  <ArchetypeIcon type={SUB_ARCHETYPES[selectedStyle].iconType} className={`w-3 h-3 ${forgeState === 'FORGING' ? 'animate-pulse' : ''}`} /> 
                  NEURAL STYLE
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-white text-xs tracking-[0.1em] transition-colors duration-300 font-cinzel ${isDropdownOpen ? 'text-[#D4AF37]' : 'group-hover/select:text-[#D4AF37]'}`}>
                    {SUB_ARCHETYPES[selectedStyle]?.label}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180 text-[#D4AF37]' : 'text-neutral-600'}`} />
            </button>
            
            {/* Elegant Dropdown Menu */}
            {isDropdownOpen && !isInputLocked && (
              <>
                <div className="fixed inset-0 z-[110]" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute top-[calc(100%+16px)] left-0 w-full md:w-[520px] glass rounded-[3rem] overflow-hidden border border-[#D4AF37]/40 z-[120] shadow-[0_40px_100px_rgba(0,0,0,0.95)] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 backdrop-blur-3xl">
                  <div className="p-5 md:p-7 bg-[#050505]/95">
                    <div className="px-4 py-3 border-b border-neutral-800/50 mb-6 flex justify-between items-center">
                      <p className="text-[9px] font-black tracking-[0.5em] text-neutral-500 uppercase">SELECT NEURAL AESTHETIC</p>
                      <span className="text-[8px] text-[#D4AF37]/40 font-black tracking-widest uppercase">SYMMETRIC PROTOCOL</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {archetypesList.map((s) => {
                        const isSelected = selectedStyle === s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setSelectedStyle(s.id as SubArchetypeFlavor);
                              setIsDropdownOpen(false);
                            }}
                            className={`group/item text-left p-6 rounded-[2rem] transition-all duration-300 flex flex-col items-start border relative overflow-hidden ${
                              isSelected 
                                ? 'bg-[#D4AF37] border-transparent shadow-[0_15px_30px_rgba(212,175,55,0.25)] scale-[1.03]' 
                                : 'text-neutral-400 hover:text-white hover:bg-white/[0.05] border-neutral-900 hover:border-[#D4AF37]/30'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-4 right-4 text-black bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                                <Check size={12} />
                              </div>
                            )}

                            <div className={`p-3 rounded-xl mb-5 transition-all duration-300 ${
                              isSelected 
                                ? 'bg-black/10 text-black' 
                                : 'bg-neutral-900 text-neutral-600 group-hover/item:text-[#D4AF37] group-hover/item:bg-neutral-800'
                            }`}>
                              <ArchetypeIcon type={s.iconType} className="w-5 h-5" />
                            </div>

                            <span className={`text-[12px] font-black tracking-[0.2em] uppercase mb-1 font-cinzel ${isSelected ? 'text-black' : 'text-white'}`}>
                              {s.label}
                            </span>
                            
                            <p className={`text-[9px] font-bold tracking-wide leading-tight uppercase opacity-70 ${isSelected ? 'text-black/80' : 'text-neutral-500 group-hover/item:text-neutral-400'}`}>
                              {s.material}
                            </p>

                            {/* Hover Decorative Element */}
                            {!isSelected && (
                              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-t border-l border-[#D4AF37]/10 rounded-tl-[1.5rem] group-hover/item:border-[#D4AF37]/40 transition-all" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Main Input Field */}
          <div className="flex-1 px-4 sm:px-8 relative py-3 md:py-0 min-w-0 flex items-center gap-5">
            {forgeState === 'CONVENING' && (
              <div className="text-[#D4AF37] drop-shadow-[0_0_8px_#D4AF37] animate-in slide-in-from-left-2 fade-in duration-500">
                 <Rocket size={18} />
              </div>
            )}
            <input
              type="text"
              value={prompt}
              disabled={isInputLocked}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={onInputFocus}
              placeholder="Who is the Star or Club of your tribute?"
              className={`w-full h-full bg-transparent text-white placeholder-neutral-700 focus:outline-none text-base md:text-lg font-light py-5 transition-all focus:placeholder-neutral-500 truncate ${isInputLocked ? 'opacity-30' : ''}`}
            />
          </div>
          
          {/* Formation Trigger Button */}
          <button
            type="submit"
            disabled={isInputLocked || !prompt || !canGenerate}
            className={`px-8 md:px-12 py-5 md:py-6 rounded-2xl font-black text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden group/btn flex-shrink-0 ${
              isInputLocked || !prompt || !canGenerate
                ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed border border-neutral-800'
                : 'bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black shadow-xl hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {forgeState === 'FORGING' ? (
              <span className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                FORGING...
              </span>
            ) : forgeState === 'SEALED' ? (
              <span className="flex items-center gap-2">
                SEALING CORE
              </span>
            ) : cooldown > 0 ? (
              <span className="flex items-center gap-2">
                <Timer size={14} className="animate-pulse" />
                {Math.ceil(cooldown / 1000)}s
              </span>
            ) : (
              <>
                <Sparkles size={16} className={`transition-transform duration-500 ${forgeState === 'CONVENING' ? 'scale-110 text-black' : 'opacity-40 group-hover/btn:rotate-12 group-hover/btn:scale-110'}`} />
                Forge Accolade
                <ArrowRight size={16} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
              </>
            )}
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 skew-x-[-30deg]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptGenerator;