import React from 'react';
import { Heart, MessageSquare, ExternalLink, Sparkle, ShieldCheck, Hexagon } from 'lucide-react';

interface Props {
  title: string;
  type: 'trending' | 'community';
}

const Gallery: React.FC<Props> = ({ title, type }) => {
  /**
   * TYPOLOGY: A high-fidelity digital ceremonial trophy—minimal, iconic, and prestigious—
   * crafted from obsidian-dark materials and luminous metallic accents.
   */
  
  // Trending (New G.O.A.T): The Golden Zenith set
  const trendingImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', // Abstract gold waves
    'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800', // Liquid gold flow
    'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?auto=format&fit=crop&q=80&w=800', // 3D Golden Geometry
    'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800', // Gold on black lines
    'https://images.unsplash.com/photo-1635331008011-537446549a02?auto=format&fit=crop&q=80&w=800', // Metallic shard
    'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800', // Dark obsidian sculpture
    'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800', // Crystalline gold structure
    'https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=800'  // Atmospheric gold depth
  ];

  // Community (Fan Book): The Obsidian Relic set
  const communityImages = [
    'https://images.unsplash.com/photo-1550684848-86a5d8727436?auto=format&fit=crop&q=80&w=800', // Black fluid sculpture
    'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800', // Dark energy manifestation
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800', // Monolithic dark shard
    'https://images.unsplash.com/photo-1543157145-f78c636d023d?auto=format&fit=crop&q=80&w=800', // Marble & Gold relic
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=800', // Abstract white/gold stone
    'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800', // Dark material logic
    'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800', // Neon gold circuits
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800'  // Silver/Chrome artifact
  ];

  const images = type === 'trending' ? trendingImages : communityImages;

  const items = images.map((img, i) => ({
    id: i,
    image: img,
    title: `${type === 'trending' ? 'ZENITH' : 'RELIC'} • ${7000 + i}`,
    author: `@visionary_${(i * 23) % 100}`,
    likes: Math.floor(Math.random() * 3000) + 1500,
    tier: type === 'trending' ? 'ASCENDED' : 'LEGACY',
    serial: `FNQ-${type === 'trending' ? 'Z' : 'R'}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
  }));

  return (
    <div className="space-y-12 py-10">
      {/* Archival Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-900/50 pb-10 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-[#D4AF37] text-[10px] font-black tracking-[0.6em] uppercase bg-[#D4AF37]/5 px-5 py-2 rounded-full border border-[#D4AF37]/20 shadow-inner">
              <Sparkle size={14} fill="#D4AF37" className="animate-pulse" />
              {type === 'trending' ? 'GLOBAL ZENITH' : 'COMMUNITY ARCHIVE'}
            </div>
            <div className="h-[1px] w-12 bg-neutral-900" />
            <span className="text-[9px] text-neutral-600 font-black tracking-[0.3em] uppercase">SYSTEM V4.2</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white tracking-[0.05em] uppercase leading-none drop-shadow-2xl">
            {title}
          </h2>
          
          <p className="text-neutral-500 font-cinzel text-[11px] tracking-[0.4em] uppercase opacity-70 max-w-2xl leading-relaxed">
            {type === 'trending' 
              ? 'THE HIGHEST RESONANCE MANIFESTATIONS SYNCHRONIZED ACCOMPANIED BY NEURAL AUTHENTICATION.' 
              : 'A COLLECTIVE MEMORY OF SACRED SIGILS AND SYMBOLIC RELICS CURATED BY THE FANATIQ COMMUNITY.'}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-5">
          <button className="group relative px-10 py-5 overflow-hidden rounded-2xl bg-black border border-neutral-800 transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="relative z-10 flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-neutral-400 group-hover:text-[#D4AF37] transition-colors uppercase">
              RESCAN NETWORK
              <div className="w-8 h-[1px] bg-neutral-800 group-hover:w-16 group-hover:bg-[#D4AF37] transition-all duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </div>
      </div>

      {/* Archival Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className="group relative rounded-[3.5rem] overflow-hidden border border-neutral-900 bg-[#080808] hover-lift shadow-[0_60px_120px_rgba(0,0,0,0.8)] transition-all duration-1000 hover:border-[#D4AF37]/50"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            {/* Visual Manifestation Area */}
            <div className="aspect-[3/4] overflow-hidden bg-black relative">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] brightness-[0.7] group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-[2s] ease-out opacity-0"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              />
              
              {/* Scanline & Atmosphere Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] opacity-90" />
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.005),rgba(0,0,255,0.01))] bg-[length:100%_4px,4px_100%] opacity-20" />
              
              {/* Archival Badges */}
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <span className="inline-flex items-center gap-2.5 text-[8px] font-black tracking-[0.5em] text-[#D4AF37] bg-black/80 backdrop-blur-2xl px-5 py-2.5 rounded-full border border-[#D4AF37]/40 uppercase shadow-2xl">
                  <Hexagon size={10} className="fill-[#D4AF37]" />
                  {item.tier} ARTIFACT
                </span>
                <span className="text-[7px] text-neutral-500 font-black tracking-[0.4em] bg-black/40 px-4 py-1.5 rounded-md border border-white/5 uppercase backdrop-blur-sm">
                  {item.serial}
                </span>
              </div>
            </div>
            
            {/* Archival Metadata Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000 flex flex-col justify-end p-12 backdrop-blur-[4px] group-hover:backdrop-blur-0">
              <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-1000 space-y-8">
                <div className="flex justify-between items-start gap-6">
                  <div className="space-y-3">
                    <h4 className="font-cinzel text-3xl text-white font-bold leading-tight tracking-[0.1em] uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
                      {item.title}
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
                
                {/* Stats & Authentication */}
                <div className="flex items-center justify-between text-white/70 text-[11px] font-black tracking-[0.6em] uppercase border-t border-white/10 pt-8">
                  <div className="flex gap-10">
                    <span className="flex items-center gap-4 hover:text-[#D4AF37] transition-colors cursor-pointer group/stat">
                      <Heart size={18} className="group-hover/stat:fill-[#D4AF37] transition-all group-hover/stat:scale-125" /> 
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-4 hover:text-[#D4AF37] transition-colors cursor-pointer">
                      <MessageSquare size={18} /> 
                      {Math.floor(item.likes / 5.5)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#D4AF37]/60">
                    <ShieldCheck size={16} />
                    <span className="text-[8px]">VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Archive Control */}
      <div className="flex justify-center pt-10">
        <button className="px-14 py-5 bg-neutral-950 border border-neutral-900 rounded-[2.5rem] text-neutral-500 font-black text-[10px] tracking-[0.6em] uppercase hover:bg-neutral-900 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-700 shadow-2xl">
          LOAD DEEP ARCHIVES
        </button>
      </div>
    </div>
  );
};

export default Gallery;