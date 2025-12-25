
import React from 'react';
import CategoriesGrid from './CategoriesGrid';

interface Props {
  selectedCategoryId: number | null;
  onCategorySelect: (id: number) => void;
}

const Hero: React.FC<Props> = ({ selectedCategoryId, onCategorySelect }) => {
  return (
    <div id="sub-category-selector" className="relative pt-8 pb-4 flex flex-col items-center text-center overflow-visible">
      {/* Dynamic light sources */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[400px] bg-[#D4AF37]/10 blur-[150px] rounded-full -z-10" />
      <div className="absolute -left-1/4 top-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="space-y-10 max-w-7xl px-4 stagger-reveal active w-full">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] text-[8px] md:text-[9px] font-black tracking-[0.4em] backdrop-blur-sm transition-all hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 cursor-default uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Forged For Future Fans
          </div>
          
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-cinzel font-bold leading-tight tracking-[0.1em] md:tracking-[0.15em] uppercase px-4">
            WRITE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#D4AF37] bg-[length:200%_auto] animate-[shimmer_8s_linear_infinite]">MULTIVERSE</span>
          </h2>
          
          <p className="text-xs sm:text-base md:text-xl lg:text-2xl text-neutral-400 font-cinzel font-light max-w-2xl mx-auto leading-relaxed tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-80">
            For the Stars, By Fans
          </p>
        </div>

        <div className="pt-8 pb-4">
          <CategoriesGrid selectedId={selectedCategoryId} onSelect={onCategorySelect} />
        </div>
      </div>

      <div className="hidden lg:block absolute left-0 top-1/2 w-32 h-32 border-[0.5px] border-[#D4AF37]/10 rounded-full opacity-20" />
      <div className="hidden lg:block absolute right-10 top-20 w-16 h-16 border-[0.5px] border-[#D4AF37]/10 rotate-45 opacity-10" />
    </div>
  );
};

export default Hero;
