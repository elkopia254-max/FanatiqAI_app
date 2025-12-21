
import React from 'react';
import { Heart, MessageSquare, ExternalLink, Sparkle } from 'lucide-react';

interface Props {
  title: string;
  type: 'trending' | 'community';
}

const Gallery: React.FC<Props> = ({ title, type }) => {
  const items = Array(8).fill(null).map((_, i) => ({
    id: i,
    image: `https://picsum.photos/seed/${type}-${i}/800/1000`,
    title: `${title === 'Trending Creations' ? 'Masterwork' : 'Artifact'} #${2048 + i}`,
    author: `@visionary_${(i * 7) % 100}`,
    likes: Math.floor(Math.random() * 800) + 200,
  }));

  return (
    <div className="space-y-12">
      <div className="flex items-end justify-between border-b border-neutral-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-black tracking-[0.4em] uppercase">
            <Sparkle size={12} fill="#D4AF37" />
            Curated
          </div>
          <h2 className="text-4xl font-cinzel font-bold text-white tracking-widest">{title.toUpperCase()}</h2>
        </div>
        <button className="group flex items-center gap-3 text-[10px] font-black tracking-[0.2em] text-neutral-500 hover:text-[#D4AF37] transition-all uppercase">
          Expand Collection
          <div className="w-8 h-[1px] bg-neutral-800 group-hover:w-12 group-hover:bg-[#D4AF37] transition-all" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className="group relative rounded-3xl overflow-hidden border border-neutral-900 bg-neutral-950 hover-lift shadow-2xl"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-neutral-900">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.2s] ease-out opacity-0 animate-[reveal_1s_ease-out_forwards]"
                onLoad={(e) => (e.currentTarget.style.opacity = '1')}
              />
            </div>
            
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8">
              <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-700 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-xl text-white font-bold leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-[#D4AF37] font-black tracking-[0.2em] uppercase">{item.author}</p>
                  </div>
                  <button className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-[#D4AF37] hover:text-black transition-all">
                    <ExternalLink size={16} />
                  </button>
                </div>
                
                <div className="flex items-center gap-6 text-white/60 text-[10px] font-black tracking-widest">
                  <span className="flex items-center gap-2 group/stat cursor-pointer hover:text-[#D4AF37] transition-colors">
                    <Heart size={14} className="transition-transform group-hover/stat:scale-125" /> 
                    {item.likes}
                  </span>
                  <span className="flex items-center gap-2 group/stat cursor-pointer hover:text-[#D4AF37] transition-colors">
                    <MessageSquare size={14} className="transition-transform group-hover/stat:scale-125" /> 
                    {Math.floor(item.likes / 4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
