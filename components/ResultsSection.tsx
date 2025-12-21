
import React from 'react';
import { Download, Share2, History, MessageCircle, Lock, ShieldAlert, Globe, Sparkles } from 'lucide-react';
import { UserTier } from '../lib/subscription-store';
import { SAFETY_TAGS, LEGAL_DISCLAIMER } from '../lib/legal-engine';

interface Props {
  isLoading: boolean;
  images?: string[];
  tier: UserTier;
  gridColsOverride?: string;
}

const ResultsSection: React.FC<Props> = ({ isLoading, images = [], tier, gridColsOverride }) => {
  const placeholders = Array(tier === 'pro' ? 4 : 1).fill(null);
  const isPro = tier === 'pro';

  const downloadImage = (base64Data: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = `fanatiq-artifact-${Date.now()}-${index}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gridClass = gridColsOverride || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div id="results" className="space-y-12">
      {/* Dynamic Progress Indicator */}
      {isLoading && (
        <div className="relative w-full h-1 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326] w-[60%] animate-[progress:3s_ease-in-out_infinite] shadow-[0_0_25px_#D4AF37]" />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900 pb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-white tracking-[0.25em] uppercase">MYTHIC VAULT</h3>
            {isLoading && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="text-[9px] font-black tracking-[0.4em] text-[#D4AF37] uppercase">FORGING RELIC</span>
              </div>
            )}
          </div>
          <p className="text-neutral-500 font-cinzel text-[10px] tracking-[0.3em] uppercase opacity-60">High-Fidelity Symbolic Reinterpretations</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2.5 text-[8px] font-black tracking-[0.4em] text-neutral-500 uppercase bg-neutral-950/50 px-4 py-2.5 rounded-xl border border-neutral-900 backdrop-blur-sm">
            <ShieldAlert size={12} className="text-[#D4AF37]/50" />
            ARTIFACT-FIRST DOCTRINE ACTIVE
          </div>
          {!isPro && images.length > 0 && (
            <div className="px-4 py-1.5 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/20 flex items-center gap-2">
              <Lock size={10} className="text-[#D4AF37]/60" />
              <span className="text-[7px] font-black tracking-[0.4em] text-[#D4AF37]/60 uppercase">RESTRICTED RESOLUTION</span>
            </div>
          )}
        </div>
      </div>

      <div className={`grid ${gridClass} gap-8 md:gap-10 min-h-[400px]`}>
        {isLoading ? (
          placeholders.map((_, i) => (
            <div key={i} className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass border border-[#D4AF37]/10 animate-pulse bg-neutral-900/10">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#D4AF37]/5 to-transparent animate-shimmer" />
            </div>
          ))
        ) : images.length > 0 ? (
          images.map((img, i) => (
            <div 
              key={i} 
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass border border-[#D4AF37]/20 group shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col hover-lift transition-all duration-1000 ease-out"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="flex-1 overflow-hidden relative bg-neutral-950">
                <img 
                  src={img} 
                  alt={`Generated Artifact ${i}`} 
                  className="w-full h-full object-cover transition-all duration-[2.5s] ease-out group-hover:scale-105" 
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.filter = 'blur(0px)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  style={{ 
                    opacity: 0, 
                    filter: 'blur(30px)', 
                    transform: 'scale(1.1)',
                    transition: 'opacity 1.5s ease-out, filter 1.2s ease-out, transform 2s cubic-bezier(0.16, 1, 0.3, 1)' 
                  }}
                />
                
                {!isPro && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.08] overflow-hidden">
                    <div className="rotate-[-45deg] whitespace-nowrap text-[#D4AF37] font-black text-4xl tracking-[1.5em] uppercase">
                      VAULT ARTIFACT
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-3 group-hover:translate-x-0">
                  <button 
                    onClick={() => downloadImage(img, i)}
                    className="p-3 bg-black/70 backdrop-blur-3xl rounded-[1rem] border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all shadow-2xl hover:scale-110 active:scale-90 group/btn"
                    title="Archive Relic"
                  >
                    <Download size={18} className="group-hover/btn:animate-bounce" />
                  </button>
                  <button className="p-3 bg-black/70 backdrop-blur-3xl rounded-[1rem] border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all shadow-2xl hover:scale-110 active:scale-90">
                    <Share2 size={18} />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 p-2.5 bg-black/40 backdrop-blur-md rounded-lg border border-[#D4AF37]/20 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-y-3 group-hover:translate-y-0">
                  <Sparkles size={14} className="animate-pulse" />
                </div>
              </div>

              <div className="p-5 bg-gradient-to-b from-neutral-950/80 to-black/95 border-t border-neutral-900/50 backdrop-blur-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="text-[7px] font-black tracking-[0.5em] text-[#D4AF37] uppercase">
                      IDOL-BORN MECHANISM
                    </span>
                    <p className="text-neutral-500 text-[7px] font-bold tracking-[0.2em] uppercase italic opacity-60">SYMBOLIC LEGACY INTERPRETATION</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-neutral-800 transition-all group/icon">
                      <History size={14} className="group-hover/icon:rotate-180 transition-transform duration-700" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-neutral-800 transition-all group/icon">
                      <MessageCircle size={14} className="group-hover/icon:scale-125 transition-transform" />
                    </button>
                  </div>
                </div>

                <button className="w-full py-3 bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black font-black text-[8px] rounded-lg tracking-[0.4em] uppercase shadow-[0_10px_20px_rgba(212,175,55,0.1)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/publish">
                  <Globe size={12} className="group-hover/publish:rotate-12 transition-transform duration-500" />
                  MANIFEST IN GALLERY
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-40 text-neutral-800 border-2 border-dashed border-neutral-900 rounded-[3rem] group bg-neutral-950/20 backdrop-blur-sm transition-all duration-1000 hover:bg-neutral-900/20 hover:border-[#D4AF37]/20">
            <div className="w-24 h-24 border border-neutral-900 rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10 transition-all duration-1000 group-hover:rotate-12 shadow-inner">
              <Sparkles size={32} className="text-neutral-900 group-hover:text-[#D4AF37] group-hover:animate-pulse transition-all duration-1000" />
            </div>
            <p className="font-cinzel text-2xl md:text-3xl text-neutral-800 group-hover:text-white transition-all duration-1000 tracking-[0.6em] uppercase text-center">NEURAL VOID</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="p-6 bg-neutral-950/40 border border-neutral-900 rounded-[2rem] text-center backdrop-blur-md relative overflow-hidden group">
          <p className="text-[9px] text-neutral-500 font-bold tracking-[0.25em] leading-relaxed italic opacity-80 max-w-4xl mx-auto">
            <span className="text-[#D4AF37]/60">SYMBOLIC ARTIFACT • NOT A REAL PERSON</span> • {LEGAL_DISCLAIMER}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
