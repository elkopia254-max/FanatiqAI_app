
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
import { Shield, Globe, Star, Users, ArrowLeft, Sparkles, Crown, Zap, ShieldAlert, MessageSquare, Clock, X } from 'lucide-react';

/**
 * STATIC PAGE COMPONENT
 */
const StaticPage: React.FC<{ 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  onBack: () => void;
  children?: React.ReactNode;
}> = ({ title, subtitle, icon, onBack, children }) => (
  <div className="py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
    <button 
      onClick={onBack}
      className="mb-12 flex items-center gap-4 text-[9px] font-black tracking-[0.4em] text-[#D4AF37]/60 hover:text-[#D4AF37] uppercase transition-all"
    >
      <ArrowLeft size={14} /> Back to core
    </button>
    
    <div className="flex flex-col items-center text-center mb-24">
      <div className="w-20 h-20 rounded-3xl border border-[#D4AF37]/20 bg-neutral-950 flex items-center justify-center text-[#D4AF37] mb-8 shadow-2xl">
        {icon}
      </div>
      <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-white tracking-[0.2em] uppercase mb-6 drop-shadow-2xl">
        {title}
      </h1>
      <p className="text-[11px] font-black tracking-[0.6em] text-[#D4AF37] uppercase opacity-80 max-w-xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      <div className="mt-12 h-[1px] w-32 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    </div>

    <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] border-[#D4AF37]/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
      {children || (
        <div className="space-y-12 text-neutral-400 text-sm leading-relaxed tracking-wide font-light">
          <p className="italic">“In the digital multiverse, legacy is the only true currency. FanatiqAI stands at the intersection of neural excellence and fan devotion, crafting eternal sigils for the icons that define our era.”</p>
        </div>
      )}
    </div>
  </div>
);

/**
 * FORGE STATUS NOTIFICATION (Informational Only)
 */
const ForgeStatusNotification: React.FC<{ 
  onDismiss: () => void; 
  isFailed?: boolean; 
  message?: string 
}> = ({ onDismiss, isFailed, message }) => (
  <div className="fixed bottom-10 right-10 z-[300] pointer-events-none animate-in slide-in-from-right-10 fade-in duration-500">
    <div className="glass p-6 rounded-[2rem] border-[#D4AF37]/30 shadow-2xl backdrop-blur-2xl pointer-events-auto flex items-center gap-6 max-w-sm">
      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center ${isFailed ? 'border-[#D4AF37]/50 bg-[#D4AF37]/5' : 'border-neutral-800 bg-neutral-900'}`}>
        <div className={`w-2 h-2 rounded-full ${isFailed ? 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'bg-neutral-600 animate-pulse'}`} />
      </div>
      <div className="flex-1 space-y-1">
        <h4 className="text-[10px] font-black tracking-[0.2em] text-[#D4AF37] uppercase font-cinzel">
          CORE ALERT
        </h4>
        <p className="text-[10px] text-neutral-400 font-bold tracking-widest leading-relaxed uppercase">
          {message}
        </p>
      </div>
      <button onClick={onDismiss} className="text-neutral-600 hover:text-white transition-colors">
        <X size={14} />
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(() => {
    return (localStorage.getItem('fanatiq_active_view') as ViewType) || 'home';
  });
  
  // UI PERSISTENCE: Inputs must remain rendered and stored
  const [persistedPrompt, setPersistedPrompt] = useState(() => localStorage.getItem('fanatiq_last_prompt') || '');
  const [persistedArchetype, setPersistedArchetype] = useState<SubArchetypeFlavor>(() => (localStorage.getItem('fanatiq_last_archetype') as SubArchetypeFlavor) || 'classical');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(() => Number(localStorage.getItem('fanatiq_last_category')) || 1);

  // ASYNC STATE
  const [forgeState, setForgeState] = useState<ForgeState>('DORMANT');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [timelineArtifact, setTimelineArtifact] = useState<TimelineArtifact | null>(null);
  const [chatConcept, setChatConcept] = useState<string | null>(null);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [isFailsafeActive, setIsFailsafeActive] = useState(false);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { state: subState, recordGeneration, canGenerate, upgradeToPro, downgradeToFree } = useSubscription();

  const forgeStateRef = useRef<ForgeState>(forgeState);
  const watchdogRef = useRef<number | null>(null);

  // Persistence Sync
  useEffect(() => { 
    forgeStateRef.current = forgeState;
    localStorage.setItem('fanatiq_active_view', activeView);
    localStorage.setItem('fanatiq_last_prompt', persistedPrompt);
    localStorage.setItem('fanatiq_last_archetype', persistedArchetype);
    localStorage.setItem('fanatiq_last_category', selectedCategoryId.toString());
  }, [forgeState, activeView, persistedPrompt, persistedArchetype, selectedCategoryId]);

  const clearWatchdog = () => {
    if (watchdogRef.current) {
      window.clearTimeout(watchdogRef.current);
      watchdogRef.current = null;
    }
  };

  /**
   * 20s HARD UI TIMEOUT
   */
  const startWatchdog = () => {
    clearWatchdog();
    watchdogRef.current = window.setTimeout(() => {
      if (forgeStateRef.current === 'FORGING' || forgeStateRef.current === 'QUEUED' || forgeStateRef.current === 'SEALED') {
        logForgeEvent('timeout', 'Job exceeded 20s hard limit. Restoration triggered.');
        setStatusMessage("Forge ready.");
        setForgeState('DORMANT'); 
        localStorage.setItem('fanatiq_job_active', 'false');
      }
    }, 20000);
  };

  const safeGenerate = async (starInput: string, archetype: SubArchetypeFlavor, useFailsafe: boolean = false): Promise<{ images: string[], timeline: TimelineArtifact } | null> => {
    const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];
    const enhancedPrompt = enhancePrompt(starInput, archetype, selectedCategory.name);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imageCount = useFailsafe ? 1 : (subState.tier === 'pro' ? 4 : 1);
      const modelName = useFailsafe ? 'gemini-flash-lite-latest' : 'gemini-2.5-flash-image';

      const imagePromise = (async () => {
        try {
          const results: string[] = [];
          const generationTasks = Array(imageCount).fill(null).map(() => 
            ai.models.generateContent({
              model: modelName,
              contents: { parts: [{ text: enhancedPrompt }] },
            })
          );
          const responses = await Promise.all(generationTasks);
          responses.forEach(response => {
            const parts = response.candidates?.[0]?.content?.parts;
            if (parts) {
              for (const part of parts) {
                if (part.inlineData) {
                  results.push(`data:image/png;base64,${part.inlineData.data}`);
                }
              }
            }
          });
          return results.length > 0 ? results : null;
        } catch (err: any) { 
          if (err.message?.includes('429')) setIsFailsafeActive(true);
          return null; 
        }
      })();

      const timelinePromise = (async () => {
        try { return await generateTimeline(starInput); } catch { return null; }
      })();

      const [images, timeline] = await Promise.all([imagePromise, timelinePromise]);
      if (!images || !timeline) return null;
      return { images, timeline };
    } catch { return null; }
  };

  const beginFormation = async (starInput: string, archetype: SubArchetypeFlavor) => {
    clearWatchdog();
    localStorage.setItem('fanatiq_job_active', 'true');
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setIsFailsafeActive(false);
    setStatusMessage(null);

    // Rule 1, 2, 5 & 6: We use semantic validation but NEVER block formations for names.
    const validation = validatePrompt(starInput);
    if (!validation.isValid) {
      logForgeEvent('api_failure', "Integrity Fault");
      setForgeState('FAILED');
      setTimeout(() => setForgeState('DORMANT'), 800);
      return;
    }

    // Rule 5: Show specialized message for real-world identity detection
    if (validation.isRealPerson) {
      setStatusMessage("Symbolic avatar created in respect of real-world identity.");
    }

    setForgeState("SEALED");
    setChatConcept(starInput);
    startWatchdog();

    // Async Job Isolation
    const result = await safeGenerate(starInput, archetype);
    
    clearWatchdog();
    localStorage.setItem('fanatiq_job_active', 'false');

    if (result) {
      setGeneratedImages(result.images);
      setTimelineArtifact(result.timeline);
      setForgeState("COMPLETED");
      recordGeneration();
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      setForgeState("DORMANT");
      // Keep existing user status if real person was detected, otherwise show ready
      if (!validation.isRealPerson) setStatusMessage("Forge ready.");
    }
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHomeContent = () => {
    return (
      <div className="space-y-12 animate-in fade-in duration-500 relative">
        {statusMessage && (
          <ForgeStatusNotification 
            onDismiss={() => setStatusMessage(null)} 
            message={statusMessage}
          />
        )}

        <section className="reveal active relative z-10">
          <Hero 
            selectedCategoryId={selectedCategoryId} 
            onCategorySelect={(id) => {
              setSelectedCategoryId(id);
              if (forgeState === 'DORMANT') setForgeState('CONVENING');
            }} 
          />
        </section>
        
        <section id="generate" className="reveal active relative z-[100] space-y-6">
          <PromptGenerator 
            onGenerate={beginFormation} 
            forgeState={forgeState}
            tier={subState.tier} 
            cooldown={subState.cooldownRemaining}
            canGenerate={canGenerate}
            initialPrompt={persistedPrompt}
            initialArchetype={persistedArchetype}
            onPromptChange={setPersistedPrompt}
            onArchetypeChange={setPersistedArchetype}
            onInputFocus={() => {
              if (forgeState === 'DORMANT' || forgeState === 'COMPLETED') {
                setForgeState('CONVENING');
              }
            }}
          />

          {isFailsafeActive && (
            <div className="max-w-md mx-auto py-2 px-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center gap-3 justify-center">
              <Zap size={12} className="text-[#D4AF37] animate-pulse" />
              <span className="text-[8px] font-black tracking-[0.2em] text-[#D4AF37] uppercase">High Performance Optimized</span>
            </div>
          )}

          <UsageTracker 
            state={subState} 
            forgeState={forgeState}
            onUpgradeClick={() => handleViewChange('pricing')} 
          />
        </section>

        {forgeState === 'COMPLETED' && (
          <div className="space-y-20 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <section id="command-center" className="reveal active py-12 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                  <ResultsSection isLoading={false} images={generatedImages} tier={subState.tier} gridColsOverride="grid-cols-1 md:grid-cols-2" />
                </div>
                <div className="lg:col-span-4 sticky top-24 h-auto lg:h-[calc(100vh-140px)] min-h-[600px] z-10">
                  <FanChat initialConcept={chatConcept} isSidebarMode={true} />
                </div>
              </div>
            </section>
            <section id="timeline-archive" className="reveal active py-12 relative z-10">
              <TimelineGenerator artifact={timelineArtifact} isLoading={false} />
            </section>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen granite-texture bg-[#0d0d0d] overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <Header tier={subState.tier} activeView={activeView} onViewChange={handleViewChange} onAuthClick={(m) => { setAuthMode(m); setIsAuthModalOpen(true); }} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative">
        {activeView === 'home' ? renderHomeContent() : (
          <div className="animate-in fade-in duration-700">
            {activeView === 'trending' && <Gallery title="G.O.A.T" type="trending" />}
            {activeView === 'community' && <Gallery title="Fan Book" type="community" />}
            {activeView === 'fanchat' && <FanChat initialConcept={chatConcept} />}
            {activeView === 'pricing' && <Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? upgradeToPro : downgradeToFree} />}
            {activeView === 'about' && <StaticPage title="The Origin" subtitle="REDEFINING THE FAN EXPERIENCE" icon={<Users />} onBack={() => handleViewChange('home')} />}
            {activeView === 'law' && <StaticPage title="Multiverse Law" subtitle="THE SACRED DOCTRINE" icon={<Shield />} onBack={() => handleViewChange('home')} />}
            {activeView === 'goat' && <StaticPage title="What is G.O.A.T?" subtitle="THE HIGHEST RESONANCE" icon={<Star />} onBack={() => handleViewChange('home')} />}
          </div>
        )}
      </main>
      <Footer onViewChange={handleViewChange} />
      <AuthModals isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default App;
