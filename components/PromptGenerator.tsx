import React, { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Lock, Timer, Layers, Circle, Square, Triangle, Activity } from 'lucide-react';
import { SubArchetypeFlavor, SUB_ARCHETYPES } from '../lib/style-library';
import { UserTier } from '../lib/subscription-store';

interface Props {
  onGenerate: (prompt: string, archetype: SubArchetypeFlavor) => void;
  isGenerating: boolean;
  tier: UserTier;
  cooldown: number;
  canGenerate: boolean;
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

const PromptGenerator: React.FC<Props> = ({ onGenerate, isGenerating, tier, cooldown, canGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<SubArchetypeFlavor>('classical');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating && canGenerate) {
      onGenerate(prompt, selectedStyle);
    }
  };

  const archetypesList = Object.values(SUB_ARCHETYPES);

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-0 relative z-[100]">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/5 via-[#D4AF37]/20 to-[#D4AF37]/5 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
        
        <div className="relative glass rounded-[2.5rem] p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 border-[#D4AF37]/20 shadow-2xl focus-within:border-[#D4AF37]/50 transition-all duration-500 z-10">
          
          {/* Left Button: Archetype Selector */}
          <div className="relative">
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`h-full px-6 py-4 flex items-center justify-between gap-4 text-[10px] font-black tracking-[0.2em] border-b md:border-b-0 md:border-r border-neutral-800/50 hover:bg-white/[0.04] transition-all min-w-full md:min-w-[220px] rounded-2xl md:rounded-r-none group/select ${isDropdownOpen ? 'bg-white/[0.04]' : 'text-neutral-400'}`}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-[7px] text-[#D4AF37] mb-1.5 tracking-[0.4em] uppercase flex items-center gap-2 font-black">
                  <ArchetypeIcon type={SUB_ARCHETYPES[selectedStyle].iconType} className="w-2.5 h-2.5" /> 
                  SOUL ARTIFACT
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-white text-xs tracking-[0.1em] transition-colors duration-300 ${isDropdownOpen ? 'text-[#D4AF37]' : 'group-hover/select:text-[#D4AF37]'}`}>
                    {SUB_ARCHETYPES[selectedStyle]?.label}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180 text-[#D4AF37]' : 'text-neutral-600'}`} />
            </button>
            
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-[110]" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute top-[calc(100%+20px)] left-0 w-full md:w-[480px] glass rounded-[2.5rem] overflow-hidden border border-[#D4AF37]/40 z-[120] shadow-[0_40px_80px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
                  <div className="p-4 bg-neutral-950/98 backdrop-blur-3xl">
                    <div className="px-6 py-4 border-b border-neutral-900 mb-4 flex justify-between items-center">
                      <p className="text-[9px] font-black tracking-[0.5em] text-neutral-500 uppercase">SELECT NEURAL AESTHETIC</p>
                      <span className="px-3 py-1 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20 text-[#D4AF37] text-[8px] font-black tracking-widest uppercase">4 VARIANTS AVAILABLE</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
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
                            className={`group/item text-left p-5 rounded-[1.8rem] transition-all duration-300 flex flex-col items-start border ${
                              isSelected 
                                ? 'bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black border-transparent shadow-[0_10px_25px_rgba(212,175,55,0.3)] scale-[1.02]' 
                                : 'text-neutral-400 hover:text-white hover:bg-white/[0.04] border-neutral-900 hover:border-[#D4AF37]/30'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl mb-4 transition-all duration-300 ${
                              isSelected ? 'bg-black/10 text-black' : 'bg-neutral-900 text-neutral-600 group-hover/item:text-[#D4AF37] group-hover/item:bg-neutral-800'
                            }`}>
                              <ArchetypeIcon type={s.iconType} className="w-4 h-4" />
                            </div>
                            
                            <span className="text-[11px] font-black tracking-[0.2em] uppercase mb-1">{s.label}</span>
                            <p className={`text-[8px] font-bold tracking-wide leading-tight uppercase opacity-60 ${isSelected ? 'text-black' : 'text-neutral-500'}`}>
                              {s.material}
                            </p>
                            
                            {isSelected && (
                              <div className="mt-4 w-full h-0.5 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-black/40 w-full animate-[progress_2s_ease-in-out_infinite]" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 px-6 py-4 bg-neutral-900/40 rounded-2xl border border-neutral-900 flex items-center justify-between">
                      <span className="text-[8px] text-neutral-600 font-bold tracking-widest uppercase">SYMMETRY LOCK</span>
                      <div className="w-8 h-4 bg-[#D4AF37]/20 rounded-full border border-[#D4AF37]/40 relative flex items-center px-0.5">
                        <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full shadow-[0_0_8px_#D4AF37]" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Central Input Area */}
          <div className="flex-1 px-4 sm:px-8 relative py-2 md:py-0 min-w-0">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Name the idol to forge (e.g. Lewis Hamilton)"
              className="w-full h-full bg-transparent text-white placeholder-neutral-700 focus:outline-none text-base md:text-lg font-light py-4 transition-all focus:placeholder-neutral-500 truncate"
            />
          </div>
          
          {/* Right Button: Forge Artifact */}
          <button
            type="submit"
            disabled={isGenerating || !prompt || !canGenerate}
            className={`px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden group/btn flex-shrink-0 ${
              isGenerating || !prompt || !canGenerate
                ? 'bg-neutral-900 text-neutral-700 cursor-not-allowed border border-neutral-800'
                : 'bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-95'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center gap-3">
                <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                MANIFESTING
              </span>
            ) : cooldown > 0 ? (
              <span className="flex items-center gap-2">
                <Timer size={14} className="animate-pulse" />
                {Math.ceil(cooldown / 1000)}s
              </span>
            ) : (
              <>
                <Sparkles size={14} className="transition-transform duration-500 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                FORGE ARTIFACT
                <ArrowRight size={14} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
              </>
            )}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptGenerator;