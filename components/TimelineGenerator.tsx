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

const getStageLabel = (index: number) => {
  switch (index) {
    case 0: return 'THE ASCENT (Early Career)';
    case 1: return 'THE ZENITH (Peak Performance)';
    case 2: return 'THE LEGACY (Later Years, Mentorship, Evolution)';
    default: return '';
  }
};

const getRomanNumeral = (index: number) => {
  switch (index) {
    case 0: return 'I';
    case 1: return 'II';
    case 2: return 'III';
    default: return '';
  }
};

interface Props {
  artifact: TimelineArtifact | null;
  isLoading: boolean;
}

const TimelineGenerator: React.FC<Props> = ({ artifact, isLoading }) => {
  return (
    <div id="timeline" className="glass rounded-[3.5rem] p-10 md:p-14 border border-[#D4AF37]/20 relative min-h-[600px] transition-all duration-1000 flex flex-col group/timeline shadow-[0_50px_120px_rgba(0,0,0,0.6)] bg-neutral-950/20 backdrop-blur-3xl">
      {/* Decorative background History Icon */}
      <div className="absolute top-0 right-0 p-6 text-neutral-800/10 pointer-events-none group-hover/timeline:scale-110 transition-transform duration-[4s] ease-out select-none">
        <History size={400} />
      </div>
      
      <div className="max-w-5xl mx-auto space-y-16 w-full flex-1 flex flex-col relative z-10">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black tracking-[0.5em] uppercase border border-[#D4AF37]/30 shadow-[0_8px_20px_rgba(212,175,55,0.1)] mx-auto">
            <Calendar size={16} />
            CHRONICLE OF ASCENSION
          </div>
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold leading-tight tracking-[0.2em] uppercase drop-shadow-2xl">
            <span className="text-white">ICONIC</span> <span className="text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">TIMELINE</span>
          </h2>
          <p className="text-neutral-500 font-light text-base max-w-2xl mx-auto leading-relaxed italic tracking-widest opacity-80 uppercase text-[11px]">
            "A high-fidelity temporal mapping from origin to eternal resonance."
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-start">
          {artifact && !isLoading ? (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="relative pb-10">
                {/* Vertical Timeline Thread */}
                <div className="absolute left-[24px] md:left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-[#D4AF37]/0 via-neutral-800 to-[#D4AF37]/0 hidden md:block" />
                
                <div className="space-y-20 relative">
                  {artifact.stages.map((stage, idx) => (
                    <div key={idx} className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="flex-1 w-full">
                        <div className="bg-neutral-950/60 p-8 md:p-10 rounded-[3rem] border border-neutral-900/80 hover:border-[#D4AF37]/40 transition-all duration-700 hover:translate-y-[-10px] hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] group/card backdrop-blur-2xl">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-black text-[#D4AF37] tracking-[0.6em] uppercase mb-2 drop-shadow-sm">STAGE {getRomanNumeral(idx)} • {getStageLabel(idx)}</span>
                              <span className="text-neutral-500 text-[10px] font-bold tracking-[0.4em] uppercase">{stage.year}</span>
                            </div>
                            <div className="text-[#D4AF37] p-4 bg-black/80 rounded-2xl border border-neutral-800 group-hover/card:scale-115 transition-all duration-500 shadow-2xl group-hover/card:shadow-[#D4AF37]/30 group-hover/card:rotate-6">
                               <StageIcon type={stage.iconType} />
                            </div>
                          </div>
                          <h4 className="text-2xl font-cinzel font-bold text-white mb-5 tracking-[0.1em] uppercase group-hover/card:text-[#D4AF37] transition-colors drop-shadow-md">{stage.title}</h4>
                          <p className="text-neutral-400 text-[13px] font-medium leading-relaxed italic opacity-90 tracking-wide">
                            "{stage.description}"
                          </p>
                        </div>
                      </div>

                      {/* Timeline Node */}
                      <div className="relative z-10 hidden md:block">
                        <div className="w-16 h-16 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] group-hover/timeline:rotate-180 transition-transform duration-[3s] ring-1 ring-white/5">
                          <div className={`w-3.5 h-3.5 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_20px_#D4AF37] ${idx === 1 ? 'scale-150' : ''}`} />
                        </div>
                      </div>

                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-neutral-900/50">
                <button className="flex items-center gap-5 px-12 py-6 rounded-2xl border border-neutral-800 text-neutral-500 hover:text-white hover:border-neutral-600 transition-all duration-500 text-[11px] font-black tracking-[0.4em] uppercase group/act shadow-xl bg-black/40">
                  <Download size={20} className="group-hover/act:-translate-y-1 transition-transform" /> 
                  ARCHIVE CHRONICLE
                </button>
                <button className="flex items-center gap-5 px-12 py-6 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)] transition-all duration-500 text-[11px] font-black tracking-[0.4em] uppercase group/act shadow-2xl hover:scale-105 active:scale-95">
                  <Share2 size={20} className="group-hover/act:scale-125 transition-transform" /> 
                  MANIFEST LEGACY
                </button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="py-48 flex flex-col items-center gap-12 animate-pulse">
              <div className="relative">
                <div className="w-28 h-28 border-[3px] border-dashed border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin shadow-[0_0_50px_rgba(212,175,55,0.2)]" />
                <History className="absolute inset-0 m-auto text-[#D4AF37]/40" size={36} />
              </div>
              <div className="text-center space-y-4">
                <p className="text-[#D4AF37] text-base font-black tracking-[0.8em] uppercase drop-shadow-md">Aligning Neural Life-Cycle...</p>
                <p className="text-neutral-600 text-[10px] font-bold tracking-[0.4em] uppercase opacity-70">Synthesizing Ascent, Zenith, and Legacy Structures</p>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-neutral-950/20 rounded-[4rem] border border-neutral-900/60 border-dashed flex flex-col items-center justify-center text-center p-20 group transition-all duration-1000 hover:border-[#D4AF37]/20 shadow-inner">
               <div className="w-28 h-28 rounded-[3rem] border border-neutral-800 flex items-center justify-center mb-12 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-1000 shadow-2xl group-hover:rotate-180">
                  <History className="text-neutral-800 group-hover:text-[#D4AF37] transition-all duration-1000" size={42} />
               </div>
               <p className="text-neutral-600 font-cinzel text-xl tracking-[0.5em] uppercase group-hover:text-neutral-400 transition-all duration-1000 drop-shadow-lg">FORGE A STAR TO MAP THEIR ASCENSION</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineGenerator;