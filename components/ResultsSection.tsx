import React from 'react';
import { Download, Share2, History, MessageCircle, Lock, ShieldAlert, Globe, Sparkles, Box, Hexagon } from 'lucide-react';
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
    link.download = `fanatiq-relic-${Date.now()}-${index}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gridClass = gridColsOverride || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div id="results" className="space-y-12">
      {isLoading && (
        <div className="relative w-full h-1 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326] w-[60%] animate-[progress:3s_ease-in-out_infinite] shadow-[0_0_25px_#D4AF37]" />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900/50 pb-10">
        <div className="space-y-6">
          <div className="flex items-center gap-8">
            <h3 className="text-4xl md:text-5xl font-cinzel font-bold tracking-[0.4em] uppercase filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
              <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">ICONIC</span> <span className="text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">VISION</span>
            </h3>
            {isLoading && (
              <div className="flex items-center gap-3 px-6 py-2.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/40 animate-pulse">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="text-[10px] font-black tracking-[0.6em] text-[#D4AF37] uppercase">FORGING RELIC</span>
              </div>
            )}
          </div>
          <p className="text-neutral-500 font-cinzel text-[11px] tracking-[0.5em] uppercase opacity-90 leading-relaxed max-w-xl">
            REVOLUTIONARY ARTIFACT MANIFESTATIONS • PHASE 2.0
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-3 text-[9px] font-black tracking-[0.6em] text-neutral-300 uppercase bg-neutral-950/90 px-8 py-4 rounded-xl border border-neutral-800/80 backdrop-blur-xl shadow-2xl">
            <ShieldAlert size={14} className="text-[#D4AF37]" />
            COLLECTIBLE-GRADE DOCTRINE
          </div>
        </div>
      </div>

      <div className={`grid ${gridClass} gap-12 md:gap-16 min-h-[400px]`}>
        {isLoading ? (
          placeholders.map((_, i) => (
            <div key={i} className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden glass border border-[#D4AF37]/10 animate-pulse bg-neutral-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#D4AF37]/10 to-transparent animate-shimmer" />
            </div>
          ))
        ) : images.length > 0 ? (
          images.map((img, i) => (
            <div 
              key={i} 
              className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden glass border border-[#D4AF37]/30 group shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col hover-lift transition-all duration-700"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Container with Collectible Overlays */}
              <div className="flex-1 overflow-hidden relative bg-[#050505]">
                <img 
                  src={img} 
                  alt={`Generated Artifact ${i}`} 
                  className="w-full h-full object-cover transition-all duration-[2s] group-hover:scale-105" 
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0, transition: 'opacity 1s ease-out' }}
                />
                
                {/* Holographic Edge Glow Overlay */}
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/0 group-hover:border-[#D4AF37]/20 group-hover:shadow-[inset_0_0_60px_rgba(212,175,55,0.1)] transition-all duration-1000 rounded-[3.5rem]" />

                {/* Technical Label (Top Left) */}
                <div className="absolute top-8 left-8 flex flex-col gap-2">
                  <div className="bg-black/80 backdrop-blur-xl border border-[#D4AF37]/40 rounded-full px-4 py-1.5 flex items-center gap-2">
                    <Hexagon size={10} className="text-[#D4AF37] fill-[#D4AF37]/20" />
                    <span className="text-[7px] font-black text-white tracking-[0.4em] uppercase">GENESIS ARTIFACT</span>
                  </div>
                </div>

                {/* Controls (Top Right) */}
                <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-5 group-hover:translate-x-0">
                  <button 
                    onClick={() => downloadImage(img, i)}
                    className="p-4 bg-black/95 backdrop-blur-3xl rounded-xl border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl hover:scale-110"
                  >
                    <Download size={20} />
                  </button>
                  <button className="p-4 bg-black/95 backdrop-blur-3xl rounded-xl border border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-all shadow-2xl hover:scale-110">
                    <Share2 size={20} />
                  </button>
                </div>

                {/* Artifact Spec Label (Bottom Right) */}
                <div className="absolute bottom-8 right-8 text-right space-y-1">
                   <p className="text-[7px] font-black text-white/40 tracking-[0.3em] uppercase">METRIC ACCURACY</p>
                   <p className="text-[10px] font-black text-[#D4AF37] tracking-[0.2em] uppercase">99.8% NEURAL SYNC</p>
                </div>
              </div>

              {/* Manifestation Panel */}
              <div className="p-8 bg-neutral-950 border-t border-neutral-900 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-black tracking-[0.6em] text-[#D4AF37] uppercase">
                      IDOL RESONANCE UNIT
                    </span>
                    <p className="text-white text-[11px] font-cinzel font-bold tracking-[0.1em] uppercase">REVOLUTIONARY SPECIMEN</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] transition-all">
                      <History size={16} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] transition-all">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black font-black text-[9px] rounded-xl tracking-[0.5em] uppercase shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group/publish">
                  <Globe size={14} className="group-hover/publish:rotate-12 transition-transform" />
                  MANIFEST IN LEGACY VAULT
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-56 border-2 border-dashed border-neutral-900 rounded-[4rem] bg-neutral-950/20 backdrop-blur-md">
            <div className="w-24 h-24 border border-neutral-900 rounded-[2.5rem] flex items-center justify-center mb-10 text-neutral-800">
              <Sparkles size={40} />
            </div>
            <p className="font-cinzel text-3xl text-neutral-800 tracking-[0.6em] uppercase text-center">AWAITING FORGE</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="p-8 bg-neutral-950/60 border border-neutral-900 rounded-[2.5rem] text-center backdrop-blur-3xl">
          <p className="text-[10px] text-neutral-600 font-bold tracking-[0.3em] uppercase italic opacity-80 leading-relaxed">
            <span className="text-[#D4AF37]">DIGITAL COLLECTIBLE • NOT A HUMAN DEPICTION</span> • {LEGAL_DISCLAIMER}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;