
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { fanatiqEngine } from './lib/fanatiq-engine';
import { enhancePrompt, SubArchetypeFlavor } from './lib/prompt-engine';
import { useSubscription } from './lib/subscription-store';
import { categories } from './components/CategoriesGrid';
import { ForgeState, FORGE_MESSAGES } from './lib/forge-state';
import { Sparkles, X, Terminal, ShieldAlert, Power, RefreshCw, CheckCircle, Zap, Plus, MessageSquare, Clock, ArrowUp, PlusCircle } from 'lucide-react';

/**
 * FanatiqAI Native Credit Gate - HARDENED VERSION
 */
const UpgradeNotification: React.FC<{ onDismiss: () => void; onUpgrade: () => void }> = ({ onDismiss, onUpgrade }) => (
  <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-500">
    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={onDismiss} />
    <div className="relative w-full max-w-lg px-8 py-10 rounded-[3rem] bg-[#050505] border-2 border-[#D4AF37] shadow-[0_40px_100px_rgba(212,175,55,0.4)] flex flex-col items-center text-center gap-8 backdrop-blur-3xl animate-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-3xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
        <ShieldAlert size={40} />
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-cinzel font-bold text-white tracking-[0.2em] uppercase">OUT OF CREDITS</h3>
        <p className="text-neutral-400 text-sm font-medium tracking-wide leading-relaxed max-w-sm">
          {FORGE_MESSAGES.UPGRADE_PROMPT}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button 
          onClick={onUpgrade}
          className="flex-1 px-8 py-5 bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black text-[11px] font-black tracking-[0.3em] rounded-2xl hover:scale-[1.03] active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase"
        >
          ✨ Upgrade Now
        </button>
        <button 
          onClick={onDismiss}
          className="flex-1 px-8 py-5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white text-[11px] font-black tracking-[0.3em] rounded-2xl transition-all uppercase flex items-center justify-center gap-3"
        >
          ⏳ Retry Tomorrow
        </button>
      </div>
      <button onClick={onDismiss} className="absolute top-6 right-6 p-2 text-neutral-600 hover:text-white transition-colors">
        <X size={20} />
      </button>
    </div>
  </div>
);

/**
 * Branded Status Notification
 */
const ForgeStatusNotification: React.FC<{ 
  message: string; 
  subMessage: string; 
  status: string; 
  onDismiss: () => void; 
  onRetry?: () => void; 
  onUpgrade?: () => void 
}> = ({ message, subMessage, status, onDismiss, onRetry, onUpgrade }) => {
  const isError = ['SERVER_BUSY', 'FORGE_UNAVAILABLE', 'NETWORK_ERROR'].includes(status);
  
  return (
    <div className={`fixed top-32 left-1/2 -translate-x-1/2 z-[5000] px-8 py-6 rounded-[2.5rem] border backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col items-center text-center gap-4 min-w-[320px] max-w-md ${
      isError 
        ? 'bg-red-950/20 border-red-500/30 text-red-100' 
        : 'bg-[#080808] border-[#D4AF37]/50 text-[#D4AF37]'
    }`}>
      {isError ? <ShieldAlert size={32} className="text-red-500 mb-2" /> : <Sparkles size={32} className="text-[#D4AF37] mb-2" />}
      
      <div className="space-y-2">
        <p className="text-[12px] font-cinzel font-black tracking-[0.4em] uppercase text-white">
          {message}
        </p>
        <p className="text-[10px] font-medium tracking-widest leading-relaxed uppercase opacity-80">
          {subMessage}
        </p>
      </div>

      <div className="flex items-center gap-3 w-full mt-2">
        {onRetry && (
          <button 
            onClick={onRetry}
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} /> Retry
          </button>
        )}
        {onUpgrade && (
          <button 
            onClick={onUpgrade}
            className="flex-1 py-3 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black rounded-xl text-[9px] font-black tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2"
          >
            <Zap size={14} /> Ascend
          </button>
        )}
      </div>

      <button onClick={onDismiss} className="absolute top-4 right-4 p-2 text-white/20 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

const ForgeVeil: React.FC<{ isActive: boolean; status?: string | null; onDismantle: () => void }> = ({ isActive, status, onDismantle }) => {
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => setDots(prev => prev.length > 2 ? '' : prev + '.'), 500);
    return () => clearInterval(interval);
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
      <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-lg">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-[1px] border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin-slow shadow-[0_0_60px_rgba(212,175,55,0.2)]" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Sparkles className="text-[#D4AF37] animate-pulse" size={40} />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-cinzel font-bold text-white tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]">SYNTHESIZING REALITY</h3>
          <div className="flex items-center justify-center gap-3 text-[10px] font-black tracking-[0.5em] text-[#D4AF37] uppercase bg-black/60 px-8 py-3 rounded-full border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl">
            <Terminal size={12} /> {status || FORGE_MESSAGES.LOADING}{dots}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(() => (localStorage.getItem('fanatiq_active_view') as ViewType) || 'home');
  const [persistedPrompt, setPersistedPrompt] = useState(() => localStorage.getItem('fanatiq_last_prompt') || '');
  const [persistedArchetype, setPersistedArchetype] = useState<SubArchetypeFlavor>(() => (localStorage.getItem('fanatiq_last_archetype') as SubArchetypeFlavor) || 'classical');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(() => Number(localStorage.getItem('fanatiq_last_category')) || 1);
  const [forgeState, setForgeState] = useState<ForgeState>('DORMANT');
  const [statusInfo, setStatusInfo] = useState<{message: string; subMessage: string; status: string} | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [timelineData, setTimelineData] = useState<any>(null);
  const [chatConcept, setChatConcept] = useState<string | null>(null);

  const promptInputRef = useRef<HTMLInputElement>(null);
  const forgeSectionRef = useRef<HTMLDivElement>(null);

  const { state: subState, upgradeToPro, recordGeneration, canGenerate } = useSubscription();

  useEffect(() => { localStorage.setItem('fanatiq_active_view', activeView); }, [activeView]);
  useEffect(() => { localStorage.setItem('fanatiq_last_prompt', persistedPrompt); }, [persistedPrompt]);
  useEffect(() => { localStorage.setItem('fanatiq_last_archetype', persistedArchetype); }, [persistedArchetype]);
  useEffect(() => { localStorage.setItem('fanatiq_last_category', String(selectedCategoryId)); }, [selectedCategoryId]);

  const scrollToForgeInput = useCallback(() => {
    if (activeView !== 'home') {
      setActiveView('home');
      // Give time for state to switch and DOM to update
      setTimeout(() => {
        forgeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        promptInputRef.current?.focus();
      }, 100);
    } else {
      forgeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      promptInputRef.current?.focus();
    }
  }, [activeView]);

  const handleStartNewForge = () => {
    setPersistedPrompt('');
    scrollToForgeInput();
  };

  const handleForge = async (prompt: string, archetype: SubArchetypeFlavor) => {
    if (!canGenerate) {
      setGeneratedImages([]);
      setTimelineData(null);
      setChatConcept(null);
      setShowUpgradeModal(true);
      return;
    }

    setPersistedPrompt(prompt);
    setPersistedArchetype(archetype);
    setForgeState('FORGING');
    setStatusInfo(null);
    setChatConcept(prompt);

    const category = categories.find(c => c.id === selectedCategoryId);
    const enhanced = enhancePrompt(prompt, archetype, category?.name || 'Digital Art');

    const result = await fanatiqEngine.forgeRelic(enhanced, subState.tier === 'pro');

    if (result.success && result.data) {
      setGeneratedImages(result.data);
      recordGeneration();
      setForgeState('COMPLETED');
      
      const tlResult = await fanatiqEngine.generateTimeline(prompt);
      if (tlResult.success) {
        setTimelineData({ 
          entityName: prompt, 
          verifiedStages: tlResult.data.filter((s: any) => s.isVerified), 
          symbolicStages: tlResult.data.filter((s: any) => !s.isVerified) 
        });
      }

      setTimeout(() => {
        document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      setForgeState('FAILED');
      setChatConcept(null);
      setStatusInfo({
        message: result.error?.message || 'FORGE FAILURE',
        subMessage: result.error?.subMessage || 'The neural link was severed. Please try again.',
        status: result.error?.status || 'SERVER_BUSY'
      });
      if (result.error?.status === 'OUT_OF_CREDITS') {
        setShowUpgradeModal(true);
        setForgeState('DORMANT');
      }
    }
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#D4AF37]/30">
      <Header 
        tier={subState.tier} 
        activeView={activeView} 
        onViewChange={setActiveView}
        onAuthClick={handleAuthClick}
        onCreateTribute={scrollToForgeInput}
      />

      <main className="pb-24">
        {activeView === 'home' && (
          <div className="space-y-24">
            <Hero 
              selectedCategoryId={selectedCategoryId} 
              onCategorySelect={setSelectedCategoryId} 
            />
            
            <div ref={forgeSectionRef}>
              <PromptGenerator 
                onGenerate={handleForge}
                forgeState={forgeState}
                tier={subState.tier}
                cooldown={subState.cooldownRemaining}
                canGenerate={canGenerate}
                onInputFocus={() => {}}
                initialPrompt={persistedPrompt}
                initialArchetype={persistedArchetype}
                onPromptChange={setPersistedPrompt}
                onArchetypeChange={setPersistedArchetype}
                onUpgradeClick={() => setActiveView('pricing')}
                inputRef={promptInputRef}
              />
            </div>

            <UsageTracker 
              state={subState} 
              forgeState={forgeState} 
              onUpgradeClick={() => setActiveView('pricing')} 
            />

            {(generatedImages.length > 0 || forgeState === 'FORGING') && (
              <div id="results-dashboard" className="max-w-[1600px] mx-auto px-4 lg:px-8 space-y-24 pt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  <div className="lg:col-span-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <ResultsSection 
                      isLoading={forgeState === 'FORGING'} 
                      images={generatedImages} 
                      tier={subState.tier}
                      starName={chatConcept}
                      onUpgradeClick={() => setActiveView('pricing')}
                      hideHeader={true}
                      gridColsOverride="grid-cols-1"
                    />
                  </div>

                  <div className="lg:col-span-6 lg:sticky lg:top-36 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="mb-8 flex items-center gap-4 border-b border-[#D4AF37]/30 pb-4">
                       <MessageSquare size={18} className="text-[#D4AF37]" />
                       <h3 className="text-2xl font-cinzel font-bold text-white tracking-[0.2em] uppercase">ICONIC <span className="text-[#D4AF37]">CHAT</span></h3>
                    </div>
                    <FanChat initialConcept={chatConcept} isSidebarMode={true} />
                  </div>
                </div>

                {(timelineData || forgeState === 'FORGING') && (
                  <div className="py-24 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <TimelineGenerator artifact={timelineData} isLoading={forgeState === 'FORGING'} />
                  </div>
                )}

                {/* Seamless Navigation Back for Another Forge */}
                {forgeState === 'COMPLETED' && (
                  <div className="flex flex-col items-center justify-center py-24 space-y-10 animate-in fade-in duration-1000">
                    <div className="h-[1px] w-full max-w-2xl bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
                    <div className="text-center space-y-4">
                      <h4 className="font-cinzel text-2xl font-bold tracking-[0.3em] text-white uppercase">ONE LEGEND FORGED.</h4>
                      <p className="text-neutral-500 text-[10px] font-black tracking-[0.6em] uppercase">REWRITE THE MULTIVERSE FURTHER</p>
                    </div>
                    <button 
                      onClick={handleStartNewForge}
                      className="group relative px-16 py-8 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37] via-[#F9E29C] to-[#8B7326] text-black font-black text-xs tracking-[0.5em] uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_30px_60px_rgba(212,175,55,0.3)] flex items-center gap-4"
                    >
                      <PlusCircle size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                      FORGE ANOTHER LEGEND
                      <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <button 
                      onClick={scrollToForgeInput}
                      className="text-neutral-500 hover:text-[#D4AF37] text-[9px] font-black tracking-[0.4em] uppercase transition-colors"
                    >
                      OR SCROLL TO EDIT PROMPT
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeView === 'trending' && (
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
            <Gallery title="ZENITH RANKINGS" type="trending" tier={subState.tier} />
          </div>
        )}

        {activeView === 'community' && (
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6">
            <Gallery title="LEGACY VAULT" type="community" tier={subState.tier} />
          </div>
        )}

        {activeView === 'fanchat' && (
          <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-12">
            <FanChat initialConcept={persistedPrompt} />
          </div>
        )}

        {activeView === 'pricing' && (
          <Pricing currentTier={subState.tier} onSelect={upgradeToPro} />
        )}
      </main>

      <Footer onViewChange={setActiveView} />

      <ForgeVeil 
        isActive={forgeState === 'FORGING'} 
        status={FORGE_MESSAGES.FORGING} 
        onDismantle={() => setForgeState('DORMANT')} 
      />

      {statusInfo && (
        <ForgeStatusNotification 
          {...statusInfo} 
          onDismiss={() => setStatusInfo(null)}
          onRetry={() => handleForge(persistedPrompt, persistedArchetype)}
          onUpgrade={() => setActiveView('pricing')}
        />
      )}

      {showUpgradeModal && (
        <UpgradeNotification 
          onDismiss={() => setShowUpgradeModal(false)} 
          onUpgrade={() => { setShowUpgradeModal(false); setActiveView('pricing'); }} 
        />
      )}

      <AuthModals 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
};

export default App;
