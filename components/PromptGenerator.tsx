
import React, { useState } from 'react';
import { Sparkles, ArrowRight, ChevronDown, Lock, Timer, Layers } from 'lucide-react';
import { SubArchetypeFlavor, SUB_ARCHETYPES } from '../lib/style-library';
import { UserTier } from '../lib/subscription-store';

interface Props {
  onGenerate: (prompt: string, archetype: SubArchetypeFlavor) => void;
  isGenerating: boolean;
  tier: UserTier;
  cooldown: number;
  canGenerate: boolean;
}

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

  const isPro = tier === 'pro';
  const archetypesList = Object.values(SUB_ARCHETYPES);

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-0 relative z-[60]">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/5 via-[#D4AF37]/20 to-[#D4AF37]/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
        
        <div className="relative glass rounded-[2rem] p-2 flex flex-col md:flex-row items-stretch md:items-center gap-2 border-[#D4AF37]/20 shadow-2xl focus-within:border-[#D4AF37]/50 transition-all duration-500">
          
          <div className="relative">
            <button 
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`h-full px-6 py-4 flex items-center justify-between gap-4 text-[10px] font-black tracking-[0.2em] border-b md:border-b-0 md:border-r border-neutral-800/50 hover:bg-white/[0.04] transition-all min-w-full md:min-w-[260px] rounded-2xl md:rounded-r-none group/select ${isDropdownOpen ? 'bg-white/[0.04]' : 'text-neutral-400'}`}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-[7px] text-[#D4AF37] mb-1 tracking-[0.3em] uppercase flex items-center gap-1.5 font-black">
                  <Layers size={8} /> SACRED SOUL
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-white transition-colors duration-300 ${isDropdownOpen ? 'text-[#D4AF37]' : 'group-hover/select:text-[#D4AF37]'}`}>
                    {SUB_ARCHETYPES[selectedStyle]?.label}
                  </span>
                </div>
              </div>
              <ChevronDown size={14} className={`transition-transform duration-500 ${isDropdownOpen ? 'rotate-180 text-[#D4AF37]' : 'text-neutral-600'}`} />
            </button>
            
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute top-[calc(100%+12px)] left-0 w-full md:w-[380px] glass rounded-[2rem] overflow-hidden border border-[#D4AF37]/30 z-50 shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
                  <div className="p-3 bg-neutral-950/95 backdrop-blur-3xl">
                    <div className="px-5 py-3 border-b border-neutral-800/50 mb-2 flex justify-between items-center">
                      <p className="text-[8px] font-black tracking-[0.4em] text-neutral-500 uppercase">AESTHETIC SOUL</p>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
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
                            className={`w-full text-left px-5 py-4 rounded-[1.2rem] transition-all flex items-center justify-between group/item border ${
                              isSelected 
                                ? 'bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black border-transparent shadow-lg scale-[1.02]' 
                                : 'text-neutral-400 hover:text-white hover:bg-white/[0.03] border-transparent hover:border-[#D4AF37]/10'
                            }`}
                          >
                            <div className="flex flex-col">
                              <span className="text-[11px] font-black tracking-widest uppercase">{s.label}</span>
                              <span className={`text-[7px] tracking-[0.1em] mt-1 font-medium ${isSelected ? 'text-black/70' : 'text-neutral-600'}`}>
                                {s.keywords[0].toUpperCase()} • {s.material.toUpperCase()}
                              </span>
                            </div>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex-1 px-4 sm:px-6 relative py-2 md:py-0">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Name the idol to forge (e.g. Kobe Bryant)"
              className="w-full h-full bg-transparent text-white placeholder-neutral-700 focus:outline-none text-lg md:text-xl font-light py-4 transition-all focus:placeholder-neutral-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={isGenerating || !prompt || !canGenerate}
            className={`px-10 py-4 md:py-5 rounded-2xl font-black text-[10px] tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden group/btn ${
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
