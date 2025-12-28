
import React, { useState, useEffect } from 'react';
import { Heart, MessageSquare, ExternalLink, Sparkle, ShieldCheck, Hexagon, RefreshCw, Sparkles, Zap, Eye, Share2, Crown } from 'lucide-react';
import { galleryStore, Artifact, calculatePowerScore } from '../lib/gallery-store';

interface Props {
  title: string;
  type: 'trending' | 'community';
}

const Gallery: React.FC<Props> = ({ title, type }) => {
  const [items, setItems] = useState<Artifact[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const syncNetwork = () => {
    setIsScanning(true);
    setTimeout(() => {
      setItems(galleryStore.getByType(type));
      setIsScanning(false);
    }, 1500);
  };

  useEffect(() => {
    syncNetwork();
  }, [type]);

  const handleInteraction = (id: string, metric: 'likes' | 'views' | 'chatMessages' | 'forges' | 'shares') => {
    galleryStore.incrementMetric(id, metric);
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, [metric]: item[metric] + 1 } : item
    ));
  };

  return (
    <div className="space-y-12 py-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-900/50 pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase bg-[#D4AF37]/5 px-5 py-2 rounded-full border border-[#D4AF37]/20 shadow-inner">
              <Sparkle size={14} fill="#D4AF37" className={isScanning ? 'animate-spin' : 'animate-pulse'} />
              {type === 'trending' ? 'POWER RANKINGS' : 'FAN REPOSITORY'}
            </div>
            <div className="h-[1px] w-12 bg-neutral-900" />
            <span className="text-[9px] text-neutral-600 font-black tracking-[0.3em] uppercase">NEURAL LINK ACTIVE</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-[0.05em] uppercase leading-none drop-shadow-2xl">
            {title}
          </h2>
          
          <p className="text-neutral-500 font-cinzel text-[11px] tracking-[0.4em] uppercase opacity-70 max-w-2xl leading-relaxed">
            {type === 'trending' 
              ? 'THE MOST RESONANT MANIFESTATIONS FILTERED BY GLOBAL POWER SCORES.' 
              : 'A COLLECTIVE ARCHIVE OF SYMBOLIC TRIBUTES CONTRIBUTED BY THE NETWORK.'}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-5">
          <button 
            onClick={syncNetwork}
            disabled={isScanning}
            className="group relative px-10 py-5 overflow-hidden rounded-2xl bg-black border border-neutral-800 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-neutral-400 group-hover:text-[#D4AF37] transition-colors uppercase">
              {isScanning ? 'SYNCHRONIZING...' : 'RESCAN NETWORK'}
              <RefreshCw size={14} className={isScanning ? 'animate-spin' : ''} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {items.map((item, idx) => {
            const powerScore = calculatePowerScore(item);
            return (
              <div 
                key={item.id} 
                className={`group relative rounded-[3.5rem] overflow-hidden border bg-[#080808] hover-lift shadow-[0_60px_120px_rgba(0,0,0,0.8)] transition-all duration-1000 animate-in fade-in slide-in-from-bottom-8 ${
                  item.isPro ? 'border-[#D4AF37]/40 shadow-[#D4AF37]/10' : 'border-neutral-900 hover:border-[#D4AF37]/50'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
                onMouseEnter={() => handleInteraction(item.id, 'views')}
              >
                <div className="aspect-[3/4] overflow-hidden bg-black relative">
                  <img
                    src={item.image}
                    alt={item.starName}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] brightness-[0.7] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[2s] ease-out"
                  />
                  
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-90" />
                  
                  {/* Power Score Badge */}
                  <div className="absolute top-10 right-10 flex flex-col items-end">
                    <div className={`bg-black/90 backdrop-blur-2xl border px-6 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all ${
                      item.isPro ? 'border-[#D4AF37] shadow-[#D4AF37]/30' : 'border-neutral-800'
                    }`}>
                      <Zap size={14} className={item.isPro ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-neutral-500'} />
                      <span className={`text-xl font-cinzel font-bold tracking-widest ${item.isPro ? 'text-[#D4AF37]' : 'text-white'}`}>
                        {powerScore}
                      </span>
                    </div>
                    <span className="text-[7px] text-[#D4AF37] font-black tracking-[0.4em] uppercase mt-2">
                      {item.isPro ? 'PRO POWER SCORE (1.5X)' : 'POWER SCORE'}
                    </span>
                  </div>

                  <div className="absolute top-10 left-10 flex flex-col gap-2">
                    <span className="inline-flex items-center gap-2.5 text-[8px] font-black tracking-[0.5em] text-[#D4AF37] bg-black/80 backdrop-blur-2xl px-5 py-2.5 rounded-full border border-[#D4AF37]/40 uppercase shadow-2xl">
                      <Hexagon size={10} className="fill-[#D4AF37]" />
                      {item.type === 'trending' ? 'ZENITH' : 'LEGACY'}
                    </span>
                    {item.isPro && (
                      <span className="inline-flex items-center gap-2 text-[7px] font-black tracking-[0.4em] text-black bg-[#D4AF37] px-4 py-1.5 rounded-full uppercase self-start">
                        <Crown size={10} className="fill-black" /> ASCENDED
                      </span>
                    )}
                  </div>

                  {/* Quick Metrics Overlay */}
                  <div className="absolute bottom-10 left-10 flex gap-6 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2 text-[9px] text-white font-black tracking-widest">
                      <Eye size={12} className="text-[#D4AF37]" /> {item.views}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-white font-black tracking-widest">
                      <Heart size={12} className="text-[#D4AF37]" /> {item.likes}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-white font-black tracking-widest">
                      <Share2 size={12} className="text-[#D4AF37]" /> {item.shares}
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-end p-12 backdrop-blur-[4px] group-hover:backdrop-blur-0">
                  <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-1000 space-y-8">
                    <div className="flex justify-between items-start gap-6">
                      <div className="space-y-3">
                        <h4 className="font-cinzel text-2xl text-white font-bold leading-tight tracking-[0.1em] uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                          {item.starName}
                        </h4>
                        <p className="text-[11px] text-[#D4AF37] font-black tracking-[0.4em] uppercase flex items-center gap-4">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_15px_#D4AF37]" />
                          FORGED BY {item.author}
                        </p>
                      </div>
                      <button className="p-6 bg-black/95 backdrop-blur-3xl rounded-[2.5rem] border border-[#D4AF37]/20 text-white hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all shadow-3xl hover:scale-110 active:scale-95">
                        <ExternalLink size={24} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between text-white/70 text-[11px] font-black tracking-[0.6em] uppercase border-t border-white/10 pt-8">
                      <div className="flex gap-10">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleInteraction(item.id, 'likes'); }}
                          className="flex items-center gap-4 hover:text-[#D4AF37] transition-colors cursor-pointer group/stat"
                        >
                          <Heart size={18} className="group-hover/stat:fill-[#D4AF37] transition-all group-hover/stat:scale-125" /> 
                          {item.likes}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleInteraction(item.id, 'chatMessages'); }}
                          className="flex items-center gap-4 hover:text-[#D4AF37] transition-colors cursor-pointer"
                        >
                          <MessageSquare size={18} /> 
                          {item.chatMessages}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-[#D4AF37]/60">
                        <ShieldCheck size={16} />
                        <span className="text-[8px]">AUTHENTICATED</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-48 border-2 border-dashed border-neutral-900 rounded-[4rem] bg-neutral-950/20 backdrop-blur-md space-y-10">
          <div className="w-24 h-24 rounded-[2.5rem] border border-neutral-800 flex items-center justify-center text-neutral-800 group hover:border-[#D4AF37]/50 transition-all duration-700">
            <Sparkles size={40} className="group-hover:text-[#D4AF37] transition-colors" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="font-cinzel text-3xl text-neutral-700 tracking-[0.4em] uppercase">V-Vault DORMANT</h3>
            <p className="text-[10px] text-neutral-500 font-black tracking-[0.6em] uppercase opacity-60">NO POWERFUL ARTIFACTS SYNCHRONIZED YET</p>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-12 py-5 bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all text-[10px] font-black tracking-[0.4em] uppercase rounded-2xl"
          >
            Forge a Legend
          </button>
        </div>
      )}

      {items.length > 0 && (
        <div className="flex justify-center pt-10">
          <button className="px-14 py-5 bg-neutral-950 border border-neutral-900 rounded-[2.5rem] text-neutral-500 font-black text-[10px] tracking-[0.6em] uppercase hover:bg-neutral-900 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-700 shadow-2xl">
            SCAN DEEP ARCHIVES
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
