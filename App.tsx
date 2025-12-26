
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
import { Sparkles, X, Terminal, ShieldAlert, BookOpen, Shield, HelpCircle, FileText, Info } from 'lucide-react';

const ForgeVeil: React.FC<{ isActive: boolean; status?: string | null }> = ({ isActive, status }) => {
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

const InfoView: React.FC<{ viewType: ViewType }> = ({ viewType }) => {
  const titles: Record<string, string> = {
    'about': 'ABOUT THE UNIVERSE',
    'law': 'REWRITE THE MULTIVERSE',
    'how-it-works': 'FORGE MECHANICS',
    'manifesto': 'THE FANATIQ MANIFESTO',
    'levels': 'CREATOR ASCENSION',
    'terms': 'TERMS OF SERVICE',
    'privacy': 'PRIVACY PROTOCOL',
    'copyright': 'COPYRIGHT DOCTRINE',
    'rules': 'COMMUNITY STATUTES',
    'report': 'REPORT DISCORDANCE',
    'support': 'NEURAL SUPPORT',
    'goat': 'WHAT IS G.O.A.T?'
  };

  const icons: Record<string, React.ReactNode> = {
    'about': <Info className="text-[#D4AF37]" size={32} />,
    'law': <Shield className="text-[#D4AF37]" size={32} />,
    'how-it-works': <HelpCircle className="text-[#D4AF37]" size={32} />,
    'manifesto': <BookOpen className="text-[#D4AF37]" size={32} />,
    'levels': <Sparkles className="text-[#D4AF37]" size={32} />,
    'terms': <FileText className="text-[#D4AF37]" size={32} />,
    'privacy': <Shield className="text-[#D4AF37]" size={32} />
  };

  return (
    <div className="py-20 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4">
      <div className="glass p-12 md:p-16 rounded-[4rem] border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 text-[#D4AF37]/5 pointer-events-none">
          {icons[viewType] || <BookOpen size={200} />}
        </div>
        <div className="space-y-10 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold tracking-[0.2em] text-white uppercase drop-shadow-xl">
              {titles[viewType] || 'DOCUMENTATION'}
            </h2>
            <div className="w-24 h-[1px] bg-[#D4AF37]" />
          </div>
          <div className="space-y-8 text-neutral-400 font-light leading-relaxed tracking-wide text-lg">
            <p className="first-letter:text-5xl first-letter:font-cinzel first-letter:text-[#D4AF37] first-letter:mr-3 first-letter:float-left">
              The FanatiqAI platform is a high-fidelity tribute environment designed for the celebration of legendary icons and clubs. 
              Our neural core ensures every manifestation is a unique symbolic relic, blending digital art with the essence of fandom.
            </p>
            <p>
              In this sector of the multiverse, we adhere to the strict doctrine of fictional representation. No literal human depictions are forged, 
              preserving the artistic integrity and legal balance of our shared universe.
            </p>
            <div className="p-8 bg-neutral-950 border border-neutral-800 rounded-3xl">
              <h4 className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase mb-4">Core Protocol</h4>
              <p className="text-sm italic opacity-80">
                "To celebrate is to forge; to forge is to remember. The legacy of the star belongs to those who carry their spirit into the digital age."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForgeStatusNotification: React.FC<{ onDismiss: () => void; isFailed?: boolean; message?: string }> = ({ onDismiss, isFailed, message }) => (
  <div className="fixed bottom-10 right-10 z-[10001] pointer-events-none animate-in slide-in-from-right-10 fade-in duration-500">
    <div className="glass p-6 rounded-[2rem] border-[#D4AF37]/30 shadow-2xl backdrop-blur-2xl pointer-events-auto flex items-center gap-6 max-w-sm">
      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center ${isFailed ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-neutral-800 bg-neutral-900'}`}>
        <div className={`w-2 h-2 rounded-full ${isFailed ? 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'bg-neutral-600 animate-pulse'}`} />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="text-[10px] font-black tracking-[0.2em] text-[#D4AF37] uppercase font-cinzel">{isFailed ? 'TERMINAL FAULT' : 'CORE UPDATE'}</h4>
        <p className="text-[10px] text-neutral-400 font-bold tracking-widest leading-relaxed uppercase">{message}</p>
      </div>
      <button onClick={onDismiss} className="text-neutral-600 hover:text-white transition-colors"><X size={14} /></button>
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
  const [isFailsafeActive, setIsFailsafeActive] = useState(false);
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
  }, [activeView, persistedPrompt, persistedArchetype, selectedCategoryId]);

  const clearWatchdog = () => { if (watchdogRef.current) { window.clearTimeout(watchdogRef.current); watchdogRef.current = null; } };
  
  const resetForge = () => {
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setChatConcept(null);
    setPersistedPrompt("");
    setForgeState('DORMANT');
    setStatusMessage(null);
    setIsFailsafeActive(false);
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
    if (finalState === 'FAILED') setTimeout(() => setForgeState('DORMANT'), 100);
  };

  const startWatchdog = () => {
    clearWatchdog();
    watchdogRef.current = window.setTimeout(() => {
      if (!jobResolvedRef.current) { 
        logForgeEvent('timeout', '20s threshold reached.'); 
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
        
      } catch (err) {
        console.warn(`Forge attempt ${i+1} failed, retrying...`, err);
        if (i < retries - 1) await new Promise(r => setTimeout(r, 1200));
      }
    }
    return null;
  };

  const beginFormation = async (starInput: string, archetype: SubArchetypeFlavor) => {
    if (!canGenerate) {
      resolveJob('FAILED', FORGE_MESSAGES.QUOTA);
      return;
    }

    jobResolvedRef.current = false; 
    clearWatchdog(); 
    setGeneratedImages([]); 
    setTimelineArtifact(null); 
    setIsFailsafeActive(false); 
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
    } catch {
      if (!jobResolvedRef.current) resolveJob('FAILED', FORGE_MESSAGES.FAILED);
    }
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'home') {
      if (activeView === 'home' && (forgeState === 'COMPLETED' || forgeState === 'FAILED')) {
        resetForge();
        return;
      }
    }
    setActiveView(view); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'home':
        return (
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
                      DUAL-CHANNEL VISION & NEURAL SOCIAL LINK • PARALLEL MANIFESTATION
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-3 text-[16px] font-black tracking-[0.6em] text-neutral-300 uppercase bg-neutral-950/90 px-8 py-4 rounded-xl border border-neutral-800/80 backdrop-blur-xl shadow-2xl">
                      <ShieldAlert size={18} className="text-[#D4AF37]" />
                      ICONIC <span className="text-[#D4AF37]">CHAT</span>
                    </div>
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
        );
      case 'trending':
      case 'clubs-top':
      case 'rankings':
      case 'goat':
        return <Gallery title={activeView === 'trending' ? "G.O.A.T" : activeView.replace('-', ' ').toUpperCase()} type="trending" />;
      case 'community':
      case 'tributes-new':
      case 'tributes-legendary':
        return <Gallery title={activeView === 'community' ? "Fan Book" : activeView.replace('-', ' ').toUpperCase()} type="community" />;
      case 'fanchat':
        return <FanChat initialConcept={chatConcept} />;
      case 'pricing':
        return <Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? handleProUpgrade : downgradeToFree} />;
      default:
        return <InfoView viewType={activeView} />;
    }
  };

  return (
    <div className="min-h-screen granite-texture bg-[#0d0d0d] overflow-x-hidden font-inter relative">
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.04), transparent)`,
          opacity: forgeState === 'FORGING' ? 0 : 1
        }}
      />
      <ForgeVeil isActive={forgeState === 'FORGING'} status={statusMessage || (isFailsafeActive ? "Initiating Symbolic Fallback" : FORGE_MESSAGES.LOADING)} />
      <Header tier={subState.tier} activeView={activeView} onViewChange={handleViewChange} onAuthClick={(m) => { setAuthMode(m); setIsAuthModalOpen(true); }} />
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 relative z-10">
        {statusMessage && <ForgeStatusNotification onDismiss={() => setStatusMessage(null)} message={statusMessage} isFailed={forgeState === 'FAILED'} />}
        <div key={activeView} className="view-transition">
          {renderActiveView()}
        </div>
      </main>
      <Footer onViewChange={handleViewChange} />
      <AuthModals isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};
export default App;
