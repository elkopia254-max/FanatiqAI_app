
import React from 'react';
import CategoriesGrid from './CategoriesGrid';

interface Props {
  selectedCategoryId: number | null;
  onCategorySelect: (id: number) => void;
}

const Hero: React.FC<Props> = ({ selectedCategoryId, onCategorySelect }) => {
  return (
    <div className="relative pt-2 pb-2 flex flex-col items-center text-center overflow-visible">
      {/* Dynamic light sources */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full -z-10 float" />
      <div className="absolute -left-1/4 top-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full -z-10 float" style={{ animationDelay: '2s' }} />
      
      <div className="space-y-4 max-w-7xl px-4 stagger-reveal">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[9px] font-black tracking-[0.4em] backdrop-blur-sm transition-all hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 cursor-default uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            SACRED ICONOGRAPHY SYSTEM ACTIVE
          </div>
          
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel font-bold leading-tight tracking-[0.15em] uppercase whitespace-nowrap">
            FORGE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#D4AF37] bg-[length:200%_auto] animate-[shimmer_8s_linear_infinite]">LEGACY RELIC</span>
          </h2>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-neutral-400 font-cinzel font-light max-w-2xl mx-auto leading-relaxed tracking-[0.4em] uppercase opacity-80">
            Commune with Artifacts of the Divine
          </p>
        </div>

        {/* Categories Grid - Repositioned just below the tagline */}
        <div className="py-1">
          <CategoriesGrid selectedId={selectedCategoryId} onSelect={onCategorySelect} />
        </div>
      </div>

      {/* Atmospheric particles or shapes */}
      <div className="hidden lg:block absolute left-0 top-1/2 w-32 h-32 border-[0.5px] border-[#D4AF37]/10 rounded-full float opacity-20" style={{animationDuration: '12s'}}></div>
      <div className="hidden lg:block absolute right-10 top-20 w-16 h-16 border-[0.5px] border-[#D4AF37]/10 rotate-45 float opacity-10" style={{animationDuration: '15s', animationDelay: '1s'}}></div>
    </div>
  );
};

export default Hero;
