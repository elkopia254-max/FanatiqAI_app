
import React, { useState, useEffect, useRef } from 'react';
import Header, { ViewType } from './components/Header';
import Hero from './components/Hero';
import PromptGenerator from './components/PromptGenerator';
import UsageTracker from './components/UsageTracker';
import ResultsSection from './components/ResultsSection';
import TimelineGenerator from './components/TimelineGenerator';
import FanChat from './components/FanChat';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModals from './components/AuthModals';
import { GoogleGenAI } from "@google/genai";
import { enhancePrompt, validatePrompt, SubArchetypeFlavor } from './lib/prompt-engine';
import { useSubscription } from './lib/subscription-store';
import { generateTimeline, TimelineArtifact } from './lib/timeline-engine';
import { categories } from './components/CategoriesGrid';
import { ForgeState, FORGE_MESSAGES, logForgeEvent } from './lib/forge-state';
import { Sparkles, X, Terminal, ShieldAlert, BookOpen, Shield, HelpCircle, FileText, Info, Power, Globe, Star, Users, Award, Mail, MessageSquare, Scale, Fingerprint } from 'lucide-react';

const ForgeStatusNotification: React.FC<{ message: string; onDismiss: () => void; isFailed?: boolean }> = ({ message, onDismiss, isFailed }) => (
  <div className={`fixed top-32 left-1/2 -translate-x-1/2 z-[5000] px-8 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 flex items-center gap-4 min-w-[320px] max-w-md ${
    isFailed 
      ? 'bg-red-500/10 border-red-500/50 text-red-200' 
      : 'bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37]'
  }`}>
    {isFailed ? <ShieldAlert size={20} /> : <Sparkles size={20} />}
    <div className="flex-1">
      <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-0.5">
        {isFailed ? 'System Alert' : 'Neural Broadcast'}
      </p>
      <p className="text-xs font-medium tracking-wide leading-relaxed">
        {message}
      </p>
    </div>
    <button 
      onClick={onDismiss}
      className="p-2 hover:bg-white/5 rounded-lg transition-colors opacity-60 hover:opacity-100"
    >
      <X size={16} />
    </button>
  </div>
);

const ForgeVeil: React.FC<{ isActive: boolean; status?: string | null; onDismantle: () => void }> = ({ isActive, status, onDismantle }) => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => setDots(prev => prev.length > 2 ? '' : prev + '.'), 500);
    return () => clearInterval(interval);
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
      
      <button 
        onClick={onDismantle}
        className="absolute top-10 right-10 z-50 p-4 bg-black/60 border border-white/10 rounded-full text-white/40 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all group flex items-center gap-3"
      >
        <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Dismantle Veil</span>
        <Power size={20} />
      </button>

      <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-lg">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-[0.5px] border-[#D4AF37]/50 border-t-[#D4AF37] animate-spin-slow shadow-[0_0_60px_rgba(212,175,55,0.3)]" />
          <Sparkles className="absolute inset-0 m-auto text-[#D4AF37] animate-pulse" size={40} />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-cinzel font-bold text-white tracking-[0.2em] uppercase drop-shadow-xl">Forging Resonance</h3>
          <div className="flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase bg-black/60 px-6 py-2.5 rounded-full border border-[#D4AF37]/40 shadow-2xl backdrop-blur-xl">
            <Terminal size={14} /> {status || FORGE_MESSAGES.LOADING}{dots}
          </div>
        </div>
        <div className="w-64 h-[2px] bg-black/20 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#D4AF37] animate-progress" />
        </div>
        <p className="text-white/80 text-[10px] font-black tracking-[0.3em] uppercase opacity-70">FanatiqAI Premium Forge Lane Active</p>
      </div>
    </div>
  );
};

const PageWrapper: React.FC<{ title: string; subtitle?: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, icon, children }) => (
  <div className="py-20 max-w-6xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="glass p-10 md:p-20 rounded-[4rem] border-[#D4AF37]/20 shadow-2xl relative overflow-hidden min-h-[600px]">
      <div className="absolute top-0 right-0 p-16 text-[#D4AF37]/5 pointer-events-none scale-[2] md:scale-[3] opacity-20">
        {icon}
      </div>
      <div className="relative z-10 space-y-12">
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-cinzel font-bold tracking-[0.2em] text-white uppercase drop-shadow-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[9px] font-black tracking-[0.5em] text-[#D4AF37] uppercase opacity-80">
              {subtitle}
            </p>
          )}
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto md:mx-0" />
        </div>
        <div className="prose prose-invert max-w-none prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-lg prose-p:font-light prose-headings:font-cinzel prose-headings:text-white">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(() => (localStorage.getItem('fanatiq_active_view') as ViewType) || 'home');
  const [persistedPrompt, setPersistedPrompt] = useState(() => localStorage.getItem('fanatiq_last_prompt') || '');
  const [persistedArchetype, setPersistedArchetype] = useState<SubArchetypeFlavor>(() => (localStorage.getItem('fanatiq_last_archetype') as SubArchetypeFlavor) || 'classical');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(() => Number(localStorage.getItem('fanatiq_last_category')) || 1);
  const [forgeState, setForgeState] = useState<ForgeState>('DORMANT');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [timelineArtifact, setTimelineArtifact] = useState<TimelineArtifact | null>(null);
  const [chatConcept, setChatConcept] = useState<string | null>(null);
  const [isFastForgeActive, setIsFastForgeActive] = useState(() => localStorage.getItem('fanatiq_fast_forge') === 'true');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { state: subState, recordGeneration, canGenerate, upgradeToPro, downgradeToFree } = useSubscription();
  const watchdogRef = useRef<number | null>(null);
  const jobResolvedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (forgeState === 'FORGING') {
      document.body.classList.add('forge-blur');
    } else {
      document.body.classList.remove('forge-blur');
    }
  }, [forgeState]);

  useEffect(() => { 
    localStorage.setItem('fanatiq_active_view', activeView);
    localStorage.setItem('fanatiq_last_prompt', persistedPrompt);
    localStorage.setItem('fanatiq_last_archetype', persistedArchetype);
    localStorage.setItem('fanatiq_last_category', selectedCategoryId.toString());
    localStorage.setItem('fanatiq_fast_forge', isFastForgeActive.toString());
  }, [activeView, persistedPrompt, persistedArchetype, selectedCategoryId, isFastForgeActive]);

  const clearWatchdog = () => { if (watchdogRef.current) { window.clearTimeout(watchdogRef.current); watchdogRef.current = null; } };
  
  const resetForge = () => {
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setChatConcept(null);
    setPersistedPrompt("");
    setForgeState('DORMANT');
    setStatusMessage(null);
    jobResolvedRef.current = false;
    clearWatchdog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resolveJob = (finalState: 'COMPLETED' | 'FAILED', message: string | null = null) => {
    if (jobResolvedRef.current) return;
    jobResolvedRef.current = true;
    clearWatchdog();
    setForgeState(finalState);
    setStatusMessage(message);
    if (finalState === 'FAILED') {
      setTimeout(() => {
        setForgeState('DORMANT');
      }, 1500);
    }
  };

  const startWatchdog = () => {
    clearWatchdog();
    watchdogRef.current = window.setTimeout(() => {
      if (!jobResolvedRef.current) { 
        logForgeEvent('timeout', '20s strict threshold reached.'); 
        resolveJob('FAILED', FORGE_MESSAGES.TIMEOUT); 
      }
    }, 20000); 
  };

  const handleProUpgrade = async () => {
    if (typeof window.aistudio?.openSelectKey === 'function') { await window.aistudio.openSelectKey(); upgradeToPro(); }
    else { upgradeToPro(); }
  };

  const safeGenerateWithRetries = async (starInput: string, archetype: SubArchetypeFlavor, retries: number = 3): Promise<{ images: string[], timeline: TimelineArtifact } | null> => {
    const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];
    const enhancedPrompt = enhancePrompt(starInput, archetype, selectedCategory.name);
    
    for (let i = 0; i < retries; i++) {
      try {
        if (jobResolvedRef.current) return null;
        if (i > 0) setStatusMessage(`Retry Attempt ${i+1}: Stabilizing Neural Flux`);
        
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const imageCount = subState.tier === 'pro' ? 4 : 1;
        
        const imagePromise = (async () => {
          const results: string[] = [];
          const generationTasks = Array(imageCount).fill(null).map(() => ai.models.generateContent({
            model: 'gemini-2.5-flash-image', 
            contents: { parts: [{ text: enhancedPrompt }] },
            config: subState.tier === 'pro' ? { imageConfig: { imageSize: "1K", aspectRatio: "1:1" } } : undefined
          }));
          const responses = await Promise.all(generationTasks);
          responses.forEach(response => {
            response.candidates?.[0]?.content?.parts?.forEach(part => { if (part.inlineData) results.push(`data:image/png;base64,${part.inlineData.data}`); });
          });
          return results.length > 0 ? results : null;
        })();

        const timelinePromise = (async () => { 
          try { return await generateTimeline(starInput); } catch { return null; } 
        })();

        const [images, timeline] = await Promise.all([imagePromise, timelinePromise]);
        if (images && timeline) return { images, timeline };
        
      } catch (err: any) {
        if (err.message?.includes('429') || err.message?.includes('quota')) {
          setIsFastForgeActive(true);
          throw new Error('QUOTA_EXCEEDED');
        }
        console.warn(`Forge attempt ${i+1} failed, retrying...`, err);
        if (i < retries - 1) await new Promise(r => setTimeout(r, 800));
      }
    }
    return null;
  };

  const beginFastFormation = async (starInput: string) => {
    if (jobResolvedRef.current) return;
    setStatusMessage(FORGE_MESSAGES.FAST_FORGE);
    logForgeEvent('quota', 'Initiating Symbolic Relic Generator.');
    
    try {
      const timeline = await generateTimeline(starInput);
      setTimelineArtifact(timeline);
      setGeneratedImages(["https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800"]);
      resolveJob('COMPLETED');
    } catch (err) {
      resolveJob('FAILED', "Symbolic Manifestation Failed. Resetting Core.");
    }
  };

  const beginFormation = async (starInput: string, archetype: SubArchetypeFlavor) => {
    if (!canGenerate) {
      resolveJob('FAILED', FORGE_MESSAGES.QUOTA);
      return;
    }

    if (isFastForgeActive) {
      setForgeState("FORGING");
      startWatchdog();
      await beginFastFormation(starInput);
      return;
    }

    jobResolvedRef.current = false; 
    clearWatchdog(); 
    setGeneratedImages([]); 
    setTimelineArtifact(null); 
    setStatusMessage(null);
    
    const validation = validatePrompt(starInput);
    if (!validation.isValid) { resolveJob('FAILED', validation.reason || "Integrity Violation"); return; }
    
    setForgeState("FORGING"); 
    setChatConcept(starInput); 
    startWatchdog();
    
    try {
      const result = await safeGenerateWithRetries(starInput, archetype);
      
      if (!jobResolvedRef.current) {
        if (result) {
          setGeneratedImages(result.images); 
          setTimelineArtifact(result.timeline); 
          recordGeneration(); 
          resolveJob('COMPLETED');
          setTimeout(() => document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' }), 150);
        } else {
          resolveJob('FAILED', FORGE_MESSAGES.FAILED);
        }
      }
    } catch (err: any) {
      if (err.message === 'QUOTA_EXCEEDED') {
        setIsFastForgeActive(true);
        setStatusMessage(FORGE_MESSAGES.QUOTA_EXCEEDED);
        if (!jobResolvedRef.current) {
          await beginFastFormation(starInput);
        }
      } else if (!jobResolvedRef.current) {
        resolveJob('FAILED', FORGE_MESSAGES.FAILED);
      }
    }
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'home') {
      if (activeView === 'home' && (forgeState === 'COMPLETED' || forgeState === 'FAILED')) {
        resetForge();
        return;
      }
    }
    // Instant switch - clear any forge artifacts if we are moving to a purely separate "Core" sector like Chat
    if (view === 'fanchat' || view === 'fan-chat') {
      setForgeState('DORMANT');
      clearWatchdog();
      setStatusMessage(null);
    }
    setActiveView(view); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="min-h-screen granite-texture bg-[#0d0d0d] overflow-x-hidden font-inter relative">
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.04), transparent)`,
          opacity: (forgeState === 'FORGING' || activeView === 'fanchat' || activeView === 'fan-chat') ? 0 : 1
        }}
      />
      
      {/* Veil only for active Forge jobs */}
      <ForgeVeil 
        isActive={forgeState === 'FORGING'} 
        status={statusMessage || (isFastForgeActive ? FORGE_MESSAGES.FAST_FORGE : FORGE_MESSAGES.LOADING)} 
        onDismantle={() => { 
          clearWatchdog();
          setForgeState('DORMANT'); 
        }}
      />
      
      <Header tier={subState.tier} activeView={activeView} onViewChange={handleViewChange} onAuthClick={(m) => { setAuthMode(m); setIsAuthModalOpen(true); }} />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 relative z-10">
        {statusMessage && <ForgeStatusNotification onDismiss={() => setStatusMessage(null)} message={statusMessage} isFailed={forgeState === 'FAILED'} />}
        
        <div key={activeView} className="view-transition">
          {activeView === 'home' ? (
            <div className="space-y-16">
              <Hero selectedCategoryId={selectedCategoryId} onCategorySelect={(id) => { setSelectedCategoryId(id); if (forgeState === 'DORMANT') setForgeState('CONVENING'); }} />
              <section id="forgeContainer" className="space-y-8">
                <PromptGenerator onGenerate={beginFormation} forgeState={forgeState} tier={subState.tier} cooldown={subState.cooldownRemaining} canGenerate={canGenerate}
                  initialPrompt={persistedPrompt} initialArchetype={persistedArchetype} onPromptChange={setPersistedPrompt} onArchetypeChange={setPersistedArchetype}
                  onInputFocus={() => { if (forgeState === 'DORMANT' || forgeState === 'COMPLETED') setForgeState('CONVENING'); }} />
                <UsageTracker state={subState} forgeState={forgeState} onUpgradeClick={() => handleViewChange('pricing')} />
              </section>

              {forgeState === 'COMPLETED' && (
                <div id="results-dashboard" className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900/50 pb-10">
                    <div className="space-y-6">
                      <h3 className="text-4xl md:text-5xl font-cinzel font-bold tracking-[0.4em] uppercase filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
                        <span className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">ICONIC</span> <span className="text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">VISION</span>
                      </h3>
                      <p className="text-neutral-500 font-cinzel text-[11px] tracking-[0.5em] uppercase opacity-90 leading-relaxed max-w-xl">
                        {isFastForgeActive ? 'SYMBOLIC CORE FALLBACK • LIGHTWEIGHT MANIFESTATION' : 'DUAL-CHANNEL VISION & NEURAL SOCIAL LINK • PARALLEL MANIFESTATION'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div id="forgeOutput" className="lg:col-span-8">
                      <ResultsSection isLoading={false} images={generatedImages} tier={subState.tier} gridColsOverride="grid-cols-1 md:grid-cols-2" hideHeader={true} />
                    </div>
                    <div className="lg:col-span-4 lg:sticky lg:top-32">
                      <FanChat initialConcept={chatConcept} isSidebarMode={true} />
                    </div>
                  </div>

                  <div className="w-full">
                    <TimelineGenerator artifact={timelineArtifact} isLoading={false} />
                  </div>
                </div>
              )}
            </div>
          ) : activeView === 'fanchat' || activeView === 'fan-chat' ? (
            <div className="py-20 animate-in fade-in duration-300">
              <FanChat initialConcept={chatConcept} />
              <p className="mt-8 text-center text-[10px] text-[#D4AF37] font-black tracking-[0.6em] uppercase animate-pulse">Fan Chat Core Online</p>
            </div>
          ) : activeView === 'trending' ? (
            <Gallery title="Trending G.O.A.Ts" type="trending" />
          ) : activeView === 'goat' ? (
            <PageWrapper title="What is G.O.A.T?" subtitle="Greatest of All Time Protocol" icon={<Award />}>
              <p>The G.O.A.T protocol is FanatiqAI's internal ranking system that evaluates the resonance of every manifestation. It is not merely a vote; it is a calculation of fan-sentiment, technical fidelity, and historical significance.</p>
            </PageWrapper>
          ) : activeView === 'about' ? (
            <PageWrapper title="About FanatiqAI" subtitle="Neural Legacy Forge" icon={<Info />}>
              <p>FanatiqAI was founded on a singular principle: The spirit of fandom is sacred.</p>
            </PageWrapper>
          ) : activeView === 'pricing' ? (
            <Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? handleProUpgrade : downgradeToFree} />
          ) : (
            <div className="py-40 text-center text-neutral-500 font-cinzel tracking-[0.5em] uppercase">Sector Under Construction</div>
          )}
        </div>
      </main>
      
      <Footer onViewChange={handleViewChange} />
      <AuthModals isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};
export default App;
