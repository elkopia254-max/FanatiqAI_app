import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [forgeState, setForgeState] = useState<ForgeState>('DORMANT');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [timelineArtifact, setTimelineArtifact] = useState<TimelineArtifact | null>(null);
  const [chatConcept, setChatConcept] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { state: subState, recordGeneration, canGenerate, upgradeToPro, downgradeToFree } = useSubscription();

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

  const handleGenerate = async (starInput: string, archetype: SubArchetypeFlavor) => {
    if (!canGenerate) return;
    const validation = validatePrompt(starInput);
    if (!validation.isValid) {
      alert(validation.reason);
      return;
    }

    // PHASE: SEALED
    setForgeState('SEALED');
    
    // Brief ceremony delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // PHASE: FORGING
    setForgeState('FORGING');
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setChatConcept(starInput);
    
    const enhancedPrompt = enhancePrompt(starInput, archetype, selectedCategory.name);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imageCount = subState.tier === 'pro' ? 4 : 1;
      const results: string[] = [];

      // Intercept and handle all potential failure points
      const imagePromise = (async () => {
        const generationTasks = Array(imageCount).fill(null).map(() => 
          ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: enhancedPrompt }] },
          })
        );

        const responses = await Promise.all(generationTasks);
        responses.forEach(response => {
          if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
              if (part.inlineData) {
                results.push(`data:image/png;base64,${part.inlineData.data}`);
              }
            }
          }
        });
        
        if (results.length === 0) throw new Error("quota exceeded"); // Simulated for safety or catch real empty
        return results;
      })();

      const timelinePromise = (async () => {
        return await generateTimeline(starInput);
      })();

      // ALL or NOTHING rendering
      const [images, timeline] = await Promise.all([imagePromise, timelinePromise]);
      
      setGeneratedImages(images);
      setTimelineArtifact(timeline);
      
      // PHASE: COMPLETED (Only now components mount)
      setForgeState('COMPLETED');
      recordGeneration();
      
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);

    } catch (error: any) {
      // FORGE INTEGRITY: Convert all technical noise into dignified states
      console.error("Forge Error Catch:", error);
      const errorStr = (error.message || "").toLowerCase();
      
      if (
        errorStr.includes("quota") || 
        errorStr.includes("limit") || 
        errorStr.includes("overload") || 
        errorStr.includes("timeout") ||
        errorStr.includes("socket") ||
        errorStr.includes("partial")
      ) {
        setForgeState('SUSPENDED');
      } else {
        setForgeState('FAILED');
      }
    }
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const renderHomeContent = () => {
    return (
      <div className="space-y-12">
        {/* DORMANT / CONVENING / SEALED / FORGING States always show Hero and Input */}
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
            onGenerate={handleGenerate} 
            forgeState={forgeState}
            tier={subState.tier} 
            cooldown={subState.cooldownRemaining}
            canGenerate={canGenerate}
            onInputFocus={() => {
              if (forgeState === 'DORMANT' || forgeState === 'COMPLETED' || forgeState === 'FAILED') {
                setForgeState('CONVENING');
              }
            }}
          />
          <UsageTracker 
            state={subState} 
            forgeState={forgeState}
            onUpgradeClick={() => {
              setActiveView('pricing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
          />
        </section>

        {/* SUSPENDED STATE: Dignified Rest Screen */}
        {forgeState === 'SUSPENDED' && (
          <section className="reveal active py-24 flex flex-col items-center justify-center text-center space-y-8 glass rounded-[4rem] border-[#D4AF37]/10 mx-auto max-w-4xl animate-in fade-in duration-700">
            <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
              <div className="w-3 h-3 rounded-full bg-neutral-700 animate-pulse" />
            </div>
            <p className="font-cinzel text-xl md:text-2xl tracking-[0.4em] uppercase text-neutral-400 px-10 leading-relaxed">
              {FORGE_MESSAGES.SUSPENDED}
            </p>
            <button 
              onClick={() => setForgeState('DORMANT')}
              className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase hover:underline opacity-60 hover:opacity-100 transition-opacity"
            >
              Quiet Reset
            </button>
          </section>
        )}

        {/* FAILED STATE: Quiet Failure Screen */}
        {forgeState === 'FAILED' && (
          <section className="reveal active py-24 flex flex-col items-center justify-center text-center space-y-8 glass rounded-[4rem] border-[#D4AF37]/10 mx-auto max-w-4xl animate-in fade-in duration-700">
            <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-700">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            </div>
            <p className="font-cinzel text-xl md:text-2xl tracking-[0.4em] uppercase text-neutral-500 px-10 leading-relaxed">
              {FORGE_MESSAGES.FAILED}
            </p>
            <button 
              onClick={() => setForgeState('DORMANT')}
              className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase hover:underline opacity-60 hover:opacity-100 transition-opacity"
            >
              Reopen Forge
            </button>
          </section>
        )}

        {/* COMPLETED STATE: The only state allowed to render these components */}
        {forgeState === 'COMPLETED' && (
          <>
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
          </>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case 'trending':
        return (
          <section id="trending" className="reveal active py-20 relative z-10">
            <Gallery title="New G.O.A.T" type="trending" />
          </section>
        );
      case 'community':
        return (
          <section id="community" className="reveal active py-20 relative z-10">
            <Gallery title="Fan Book" type="community" />
          </section>
        );
      case 'fanchat':
        // Individual chat view should also respect the COMPLETED rule or show a placeholder
        return (
          <section id="chat" className="reveal active py-20 relative z-10">
            {forgeState === 'COMPLETED' ? <FanChat /> : (
              <div className="glass rounded-[4rem] p-24 text-center border-neutral-900">
                <p className="font-cinzel text-neutral-700 tracking-[0.5em] uppercase">Awaiting Formation Completion</p>
              </div>
            )}
          </section>
        );
      case 'pricing':
        return (
          <section id="pricing" className="reveal active py-20 relative z-10">
            <Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? upgradeToPro : downgradeToFree} />
          </section>
        );
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
        onViewChange={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        onAuthClick={handleAuthClick}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 relative">
        {renderContent()}
      </main>

      <Footer />

      <AuthModals 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
};

export default App;