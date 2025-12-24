
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
import { ForgeState, FORGE_MESSAGES } from './lib/forge-state';

/**
 * FORGE REST SCREEN (BRAND LAW)
 * A high-luxury transition screen that replaces technical failures with a dignified "Rest" state.
 */
const ForgeRestScreen: React.FC<{ 
  onReset: () => void; 
  isFailed?: boolean; 
  customMessage?: string 
}> = ({ onReset, isFailed, customMessage }) => (
  <div className="forge-veil flex flex-col items-center justify-center text-center p-8 space-y-10 animate-in fade-in duration-1000">
    <div className="w-24 h-24 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
       <div className={`w-3 h-3 rounded-full ${isFailed ? 'bg-[#D4AF37]/50' : 'bg-neutral-700 animate-pulse'}`} />
    </div>
    <div className="space-y-6">
      <h2 className="font-cinzel text-2xl md:text-3xl tracking-[0.3em] uppercase text-[#D4AF37] drop-shadow-md">
        {isFailed ? 'FORMATION STALLED' : 'RESONANCE REST'}
      </h2>
      <p className="font-inter text-neutral-400 max-w-lg mx-auto tracking-widest uppercase text-[10px] leading-relaxed px-6 opacity-80">
        {customMessage || (isFailed ? FORGE_MESSAGES.FAILED : FORGE_MESSAGES.SUSPENDED)}
      </p>
    </div>
    <button 
      onClick={onReset}
      className="text-[9px] font-black tracking-[0.5em] text-[#D4AF37]/40 hover:text-[#D4AF37] uppercase transition-all"
    >
      [ RETURN TO CORE ]
    </button>
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [forgeState, setForgeState] = useState<ForgeState>('DORMANT');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [timelineArtifact, setTimelineArtifact] = useState<TimelineArtifact | null>(null);
  const [chatConcept, setChatConcept] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { state: subState, recordGeneration, canGenerate, upgradeToPro, downgradeToFree } = useSubscription();

  // Root Forge Guard: Ensures state dignity during fatal errors
  const forgeStateRef = useRef<ForgeState>(forgeState);
  useEffect(() => { forgeStateRef.current = forgeState; }, [forgeState]);

  useEffect(() => {
    const handleFatalError = () => {
      setForgeState("SUSPENDED");
      return true; 
    };
    window.onerror = handleFatalError;
    window.onunhandledrejection = handleFatalError;
    return () => {
      window.onerror = null;
      window.onunhandledrejection = null;
    };
  }, []);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeView, forgeState]);

  /**
   * SAFE GENERATE (CORE PROTOCOL)
   * The atomic wrapper for all multi-modal Gemini API calls.
   */
  const safeGenerate = async (starInput: string, archetype: SubArchetypeFlavor): Promise<{ images: string[], timeline: TimelineArtifact } | null> => {
    // Protocol Guard: Only proceed if forging state is active
    if (forgeStateRef.current !== "FORGING") return null;

    const enhancedPrompt = enhancePrompt(starInput, archetype, selectedCategory.name);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imageCount = subState.tier === 'pro' ? 4 : 1;

      // Atomic Image Manifestation
      const imagePromise = (async () => {
        try {
          const results: string[] = [];
          const generationTasks = Array(imageCount).fill(null).map(() => 
            ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
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
        } catch { return null; }
      })();

      // Atomic Timeline Chronicling
      const timelinePromise = (async () => {
        try { return await generateTimeline(starInput); } catch { return null; }
      })();

      const [images, timeline] = await Promise.all([imagePromise, timelinePromise]);
      
      if (!images || !timeline) return null;
      return { images, timeline };
    } catch {
      return null;
    }
  };

  /**
   * BEGIN FORMATION (STATE PROTOCOL)
   * Strictly adheres to the transition: SEALED -> FORGING -> GENERATE -> COMPLETED/SUSPENDED
   */
  const beginFormation = async (starInput: string, archetype: SubArchetypeFlavor) => {
    if (!canGenerate) return;

    // 1. Pre-validation Integrity
    const validation = validatePrompt(starInput);
    if (!validation.isValid) {
      setValidationError(validation.reason || "Doctrine Violation Detected");
      setForgeState('FAILED');
      return;
    }

    // 2. Initial Sealing
    setForgeState("SEALED");
    setValidationError(null);
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setChatConcept(starInput);

    // Minor delay to manifest sealing visuals
    await new Promise(r => setTimeout(r, 400));

    // 3. Initiate Forging
    setForgeState("FORGING");
    forgeStateRef.current = "FORGING"; // Direct ref update for safeGenerate check

    // 4. Atomic Execution
    const result = await safeGenerate(starInput, archetype);

    // 5. Finalize State
    if (result) {
      setGeneratedImages(result.images);
      setTimelineArtifact(result.timeline);
      setForgeState("COMPLETED");
      recordGeneration();
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      setForgeState("SUSPENDED");
    }
  };

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHomeContent = () => {
    if (forgeState === 'SUSPENDED' || forgeState === 'FAILED') {
      return (
        <ForgeRestScreen 
          onReset={() => {
            setForgeState('DORMANT');
            setValidationError(null);
          }} 
          isFailed={forgeState === 'FAILED'} 
          customMessage={validationError || undefined}
        />
      );
    }

    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <section className="reveal active relative z-10">
          <Hero 
            selectedCategoryId={selectedCategoryId} 
            onCategorySelect={(id) => {
              setSelectedCategoryId(id);
              if (forgeState === 'DORMANT') setForgeState('CONVENING');
            }} 
          />
        </section>
        
        <section id="generate" className="reveal relative z-[100] space-y-6">
          <PromptGenerator 
            onGenerate={beginFormation} 
            forgeState={forgeState}
            tier={subState.tier} 
            cooldown={subState.cooldownRemaining}
            canGenerate={canGenerate}
            onInputFocus={() => {
              if (forgeState === 'DORMANT' || forgeState === 'COMPLETED') {
                setForgeState('CONVENING');
              }
            }}
          />
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
                  <ResultsSection 
                    isLoading={false} 
                    images={generatedImages} 
                    tier={subState.tier} 
                    gridColsOverride="grid-cols-1 md:grid-cols-2" 
                  />
                </div>
                <div className="lg:col-span-4 sticky top-24 h-auto lg:h-[calc(100vh-140px)] min-h-[600px] z-10">
                  <FanChat 
                    initialConcept={chatConcept} 
                    isSidebarMode={true} 
                  />
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

  const renderContent = () => {
    switch (activeView) {
      case 'trending':
        return <section className="reveal active py-20"><Gallery title="New G.O.A.T" type="trending" /></section>;
      case 'community':
        return <section className="reveal active py-20"><Gallery title="Fan Book" type="community" /></section>;
      case 'fanchat':
        return (
          <section className="reveal active py-20">
            <FanChat initialConcept={chatConcept} />
          </section>
        );
      case 'pricing':
        return <section className="reveal active py-20"><Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? upgradeToPro : downgradeToFree} /></section>;
      case 'home':
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen granite-texture bg-[#0d0d0d] overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      <Header 
        tier={subState.tier} 
        activeView={activeView} 
        onViewChange={handleViewChange} 
        onAuthClick={(m) => { setAuthMode(m); setIsAuthModalOpen(true); }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative">
        {renderContent()}
      </main>
      <Footer onViewChange={handleViewChange} />
      <AuthModals isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default App;
