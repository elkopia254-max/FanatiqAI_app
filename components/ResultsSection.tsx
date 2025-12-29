
import React, { useState, useRef } from 'react';
import { Download, Share2, History, MessageCircle, ShieldAlert, Globe, Sparkles, Hexagon, CheckCircle2, Lock, EyeOff } from 'lucide-react';
import { UserTier } from '../lib/subscription-store';
import { LEGAL_DISCLAIMER } from '../lib/legal-engine';
import { galleryStore } from '../lib/gallery-store';
import ShareModal from './ShareModal';

interface Props {
  isLoading: boolean;
  images?: string[];
  tier: UserTier;
  gridColsOverride?: string;
  hideHeader?: boolean;
  starName?: string | null;
  onUpgradeClick?: () => void;
}

const ResultsSection: React.FC<Props> = ({ isLoading, images = [], tier, gridColsOverride, hideHeader = false, starName, onUpgradeClick }) => {
  const [shareData, setShareData] = useState<{ image: string; index: number } | null>(null);
  const [manifestedIds, setManifestedIds] = useState<Set<number>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const downloadImage = async (base64Data: string, index: number) => {
    const cleanName = (starName || 'legend').replace(/\s+/g, '-').toLowerCase();
    
    // ASCENDED / PRO TIER: Pure identity, no watermark
    if (tier === 'pro') {
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = `fanatiqai_${cleanName}_relic.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // FREE TIER: Burn "FanatiqAI.com" watermark into the image
    const img = new Image();
    img.src = base64Data;
    
    try {
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Canvas context failed");

      // Draw base image
      ctx.drawImage(img, 0, 0);

      // Setup Watermark Styling
      const fontSize = Math.floor(canvas.width / 18);
      ctx.font = `black ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Repeat diagonally across the entire canvas
      const step = fontSize * 4;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(-Math.PI / 4);
      
      for (let x = -canvas.width; x < canvas.width; x += step) {
        for (let y = -canvas.height; y < canvas.height; y += step / 2) {
          ctx.fillText('FanatiqAI.com', x, y);
        }
      }
      ctx.restore();

      const watermarkedData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = watermarkedData;
      link.download = `fanatiqai_${cleanName}_relic.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to process watermark:", err);
      // Fallback to direct download if canvas fails
      const link = document.createElement('a');
      link.href = base64Data;
      link.download = `fanatiqai_${cleanName}_relic.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleManifest = (img: string, index: number) => {
    if (manifestedIds.has(index)) return;
    
    const visibility = tier === 'pro' && isPrivate ? 'private' : 'public';
    galleryStore.saveArtifact(img, starName || 'Legend', 'Neural Prime', tier === 'pro');
    setManifestedIds(prev => new Set(prev).add(index));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const placeholders = Array(tier === 'pro' ? 4 : 1).fill(null);
  const gridClass = gridColsOverride || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  const isPro = tier === 'pro';

  return (
    <div id="results" className="space-y-8 relative">
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[6000] px-8 py-4 bg-[#D4AF37] text-black rounded-2xl font-black text-[10px] tracking-[0.3em] uppercase flex items-center gap-3 shadow-[0_20px_50px_rgba(212,175,55,0.4)] animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={18} /> Artifact Synchronized to {isPrivate ? 'Private' : 'Legacy'} Vault
        </div>
      )}

      {isLoading && (
        <div className="relative w-full h-1 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326] w-[60%] animate-[progress:3s_ease-in-out_infinite] shadow-[0_0_25px_#D4AF37]" />
        </div>
      )}

      {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900/50 pb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-8">
              <h3 className="text-4xl md:text-5xl font-cinzel font-bold tracking-[0.4em] uppercase filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">ICONIC</span> <span className="text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">VISION</span>
              </h3>
            </div>
            <p className="text-neutral-500 font-cinzel text-[11px] tracking-[0.5em] uppercase opacity-90 leading-relaxed max-w-xl">
              {isPro ? 'ELITE NEURAL SYNTHESIS • PURITY UNLOCKED' : 'STANDARD MANIFESTATION • WATERMARKED PREVIEW'}
            </p>
          </div>
          {isPro && (
            <div className="flex items-center gap-4 bg-neutral-950/50 p-2 rounded-2xl border border-neutral-900">
               <span className="text-[8px] font-black tracking-[0.3em] text-neutral-500 pl-4 uppercase">VAULT:</span>
               <button 
                 onClick={() => setIsPrivate(!isPrivate)}
                 className={`px-6 py-2.5 rounded-xl text-[9px] font-black tracking-[0.3em] uppercase transition-all flex items-center gap-2 ${isPrivate ? 'bg-[#D4AF37] text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
               >
                 {isPrivate ? <EyeOff size={12} /> : <Globe size={12} />}
                 {isPrivate ? 'PRIVATE' : 'PUBLIC'}
               </button>
            </div>
          )}
        </div>
      )}

      <div className={`grid ${gridClass} gap-8 md:gap-10 min-h-[400px]`}>
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
              className={`relative aspect-[4/5] rounded-[3.5rem] overflow-hidden glass border group shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col hover-lift transition-all duration-700 ${
                isPro 
                  ? 'border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/10 hover:shadow-[0_0_60px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/60' 
                  : 'border-neutral-800 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-neutral-700'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex-1 overflow-hidden relative bg-[#050505]">
                <img 
                  src={img} 
                  alt={`Generated Artifact ${i}`} 
                  className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:brightness-110 ${!isPro ? 'brightness-[0.8] contrast-[1.1]' : ''}`} 
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0, transition: 'opacity 1s ease-out' }}
                />
                
                {/* Global Watermark for Free Tier (UI Preview) */}
                {!isPro && (
                  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.08] mix-blend-overlay">
                    <div className="flex flex-wrap justify-center items-center gap-20 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 -rotate-45">
                      {Array(50).fill(0).map((_, idx) => (
                        <div key={idx} className="text-white font-black text-2xl tracking-[0.3em] uppercase whitespace-nowrap">
                          FanatiqAI.com
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/0 group-hover:border-[#D4AF37]/30 group-hover:shadow-[inset_0_0_80px_rgba(212,175,55,0.2)] transition-all duration-700 rounded-[3.5rem]" />

                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className={`backdrop-blur-xl border rounded-full px-4 py-1.5 flex items-center gap-2 ${isPro ? 'bg-[#D4AF37]/90 border-white/20' : 'bg-black/80 border-[#D4AF37]/40'}`}>
                    <Hexagon size={10} className={isPro ? 'text-black fill-black/20' : 'text-[#D4AF37] fill-[#D4AF37]/20'} />
                    <span className={`text-[7px] font-black tracking-[0.4em] uppercase ${isPro ? 'text-black' : 'text-white'}`}>
                      {isPro ? 'ASCENDED RELIC' : 'GENESIS RELIC'}
                    </span>
                  </div>
                </div>

                {!isPro && (
                  <div className="absolute top-6 right-6">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onUpgradeClick?.(); }}
                      className="bg-black/60 backdrop-blur-md border border-white/10 p-2 rounded-xl text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all flex items-center gap-2 group/rem"
                    >
                      <Lock size={12} />
                      <span className="text-[7px] font-black tracking-[0.2em] uppercase hidden group-hover/rem:inline">PURITY (REMOVE WATERMARK)</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-6 bg-neutral-950 border-t border-neutral-900 space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={() => downloadImage(img, i)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-black tracking-[0.2em] uppercase transition-all ${
                      isPro 
                        ? 'bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black shadow-[0_10px_20px_rgba(212,175,55,0.2)]' 
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Download size={16} /> {isPro ? 'Download Purity' : 'Download Relic'}
                  </button>
                  <button 
                    onClick={() => setShareData({ image: img, index: i })}
                    className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-neutral-900 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all"
                  >
                    <Share2 size={16} /> Share Relic
                  </button>
                </div>

                <button 
                  onClick={() => handleManifest(img, i)}
                  disabled={manifestedIds.has(i)}
                  className={`w-full py-3 text-black font-black text-[8px] rounded-lg tracking-[0.4em] uppercase shadow-lg transition-all flex items-center justify-center gap-2 group/publish ${
                    manifestedIds.has(i)
                      ? 'bg-neutral-800 text-neutral-500 cursor-default border border-neutral-700 shadow-none'
                      : isPro 
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30'
                        : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {manifestedIds.has(i) ? (
                    <>
                      <CheckCircle2 size={12} /> ARTIFACT ARCHIVED
                    </>
                  ) : (
                    <>
                      {isPro && isPrivate ? <Lock size={12} /> : <Globe size={12} />}
                      {isPro ? (isPrivate ? 'ARCHIVE IN PRIVATE VAULT' : 'ASCEND TO LEGACY HALL') : 'MANIFEST IN PUBLIC VAULT'}
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-56 border-2 border-dashed border-neutral-900 rounded-[4rem] bg-neutral-950/20 backdrop-blur-md">
            <div className="w-24 h-24 border border-neutral-900 rounded-[2.5rem] flex items-center justify-center mb-10 text-neutral-800">
              <Sparkles size={40} />
            </div>
            <p className="font-cinzel text-3xl text-neutral-800 tracking-[0.6em] uppercase text-center">READY TO FORGE A NEW LEGEND</p>
          </div>
        )}
      </div>

      {images.length > 0 && !hideHeader && (
        <div className="p-8 bg-neutral-950/60 border border-neutral-900 rounded-[2.5rem] text-center backdrop-blur-3xl">
          <p className="text-[10px] text-neutral-600 font-bold tracking-[0.3em] uppercase italic opacity-80 leading-relaxed">
            <span className="text-[#D4AF37]">DIGITAL COLLECTIBLE • NOT A HUMAN DEPICTION</span> • {LEGAL_DISCLAIMER}
          </p>
        </div>
      )}

      {shareData && (
        <ShareModal 
          isOpen={!!shareData} 
          onClose={() => setShareData(null)} 
          image={shareData.image} 
          starName={starName || 'Legend'} 
        />
      )}
    </div>
  );
};

export default ResultsSection;
