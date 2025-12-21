
import React from 'react';
import { History, Calendar, Sparkles, Download, Share2, TrendingUp, Trophy, Crown } from 'lucide-react';
import { TimelineArtifact } from '../lib/timeline-engine';

const StageIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'ascent': return <TrendingUp size={20} />;
    case 'zenith': return <Trophy size={20} />;
    case 'legacy': return <Crown size={20} />;
    default: return <Sparkles size={20} />;
  }
};

interface Props {
  artifact: TimelineArtifact | null;
  isLoading: boolean;
}

const TimelineGenerator: React.FC<Props> = ({ artifact, isLoading }) => {
  return (
    <div id="timeline" className="glass rounded-[3rem] p-8 md:p-12 border border-[#D4AF37]/15 relative h-full overflow-hidden transition-all duration-1000 flex flex-col group/timeline">
      <div className="absolute top-0 right-0 p-4 text-[#D4AF37]/2 pointer-events-none group-hover/timeline:scale-110 transition-transform duration-[3s] ease-out">
        <History size={200} />
      </div>
      
      <div className="max-w-4xl mx-auto space-y-12 w-full flex-1 flex flex-col relative z-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-black tracking-[0.4em] uppercase border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
            <Calendar size={14} />
            CHRONICLE OF ASCENSION
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-white leading-tight tracking-[0.1em] uppercase">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#8B7326]">SPIRIT ARC</span>
          </h2>
          <p className="text-neutral-500 font-light text-sm max-w-lg mx-auto leading-relaxed italic tracking-wide">
            "Forging the journey from origins to eternal influence."
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center min-h-[400px]">
          {artifact && !isLoading ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="relative">
                <div className="absolute left-[24px] md:left-1/2 top-6 bottom-6 w-[1px] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent hidden md:block" />
                
                <div className="space-y-10 relative">
                  {artifact.stages.map((stage, idx) => (
                    <div key={idx} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="flex-1 w-full">
                        <div className="glass p-7 rounded-[2rem] border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all duration-700 hover-lift group/card bg-neutral-900/10 backdrop-blur-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                              <span className="text-[7px] font-black text-[#D4AF37] tracking-[0.4em] uppercase mb-1">STAGE {idx + 1}</span>
                              <span className="text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase">{stage.year}</span>
                            </div>
                            <div className="text-[#D4AF37] p-2.5 bg-neutral-900 rounded-xl border border-neutral-800 group-hover/card:scale-110 transition-transform duration-500 shadow-lg group-hover/card:shadow-[#D4AF37]/10">
                               <StageIcon type={stage.iconType} />
                            </div>
                          </div>
                          <h4 className="text-lg font-cinzel font-bold text-white mb-3 tracking-widest uppercase group-hover/card:text-[#D4AF37] transition-colors">{stage.title}</h4>
                          <p className="text-neutral-400 text-[11px] font-light leading-relaxed italic opacity-80">
                            "{stage.description}"
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 hidden md:block">
                        <div className="w-14 h-14 rounded-full bg-neutral-950 border border-[#D4AF37]/30 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)] group-hover/timeline:rotate-90 transition-transform duration-[2s]">
                          <div className={`w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37] ${idx === 1 ? 'scale-150' : ''}`} />
                        </div>
                      </div>

                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-8">
                <button className="flex items-center gap-3 px-8 py-4 rounded-xl border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-neutral-900 transition-all duration-500 text-[10px] font-black tracking-[0.3em] uppercase group/act">
                  <Download size={16} className="group-hover/act:-translate-y-1 transition-transform" /> 
                  SAVE CHRONICLE
                </button>
                <button className="flex items-center gap-3 px-8 py-4 rounded-xl border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-neutral-900 transition-all duration-500 text-[10px] font-black tracking-[0.3em] uppercase group/act">
                  <Share2 size={16} className="group-hover/act:scale-125 transition-transform" /> 
                  REVEAL LEGACY
                </button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="py-24 flex flex-col items-center gap-8 animate-pulse">
              <div className="relative">
                <div className="w-20 h-20 border-2 border-dashed border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
                <History className="absolute inset-0 m-auto text-[#D4AF37]/40" size={24} />
              </div>
              <div className="text-center space-y-2">
                <p className="text-[#D4AF37] text-xs font-black tracking-[0.5em] uppercase">Aligning Neural Life-Cycle...</p>
                <p className="text-neutral-700 text-[8px] font-bold tracking-[0.2em] uppercase">Weaving the Ascent, Zenith, and Legacy</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video glass rounded-[3rem] border border-neutral-800/20 flex flex-col items-center justify-center text-center p-12 group transition-all duration-1000 hover:border-[#D4AF37]/20 bg-neutral-950/20">
               <div className="w-20 h-20 rounded-[2rem] border border-neutral-800 flex items-center justify-center mb-8 group-hover:bg-[#D4AF37]/5 group-hover:border-[#D4AF37]/40 transition-all duration-700 shadow-inner">
                  <History className="text-neutral-700 group-hover:text-[#D4AF37] transition-all duration-700 group-hover:rotate-180" size={32} />
               </div>
               <p className="text-neutral-500 font-cinzel text-lg tracking-[0.3em] uppercase group-hover:text-white transition-all duration-700">FORGE A STAR TO CHART THEIR ASCENSION</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineGenerator;
