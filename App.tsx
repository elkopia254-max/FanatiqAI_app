
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
import { GoogleGenAI } from "@google/genai";
import { enhancePrompt, SubArchetypeFlavor } from './lib/prompt-engine';
import { useSubscription } from './lib/subscription-store';
import { generateTimeline, TimelineArtifact } from './lib/timeline-engine';
import { categories } from './components/CategoriesGrid';
import { ForgeState, FORGE_MESSAGES, logForgeEvent } from './lib/forge-state';
import { Sparkles, X, Terminal, ShieldAlert, Award, Info, Power, RefreshCw, BookOpen, ScrollText, Trophy, Users, Shield, LifeBuoy, Scale, Copyright, AlertTriangle, ArrowRight, CheckCircle, Globe, Zap } from 'lucide-react';

/**
 * Error Interpreter: Maps Gemini API errors to FanatiqAI Statuses
 */
function interpretGeminiError(err: any): { status: string } {
  const msg = err.message?.toLowerCase() || "";
  if (msg.includes("quota")) return { status: "API_LIMIT" };
  if (msg.includes("exceeded")) return { status: "OUT_OF_CREDITS" };
  if (msg.includes("network") || msg.includes("fetch")) return { status: "NETWORK_ERROR" };
  if (msg.includes("timeout") || msg.includes("busy")) return { status: "SERVER_BUSY" };
  return { status: "FORGE_FAILED" };
}

/**
 * Premium Upgrade Alert
 */
const UpgradeNotification: React.FC<{ onDismiss: () => void; onUpgrade: () => void }> = ({ onDismiss, onUpgrade }) => (
  <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[5000] px-8 py-6 rounded-[2.5rem] bg-black border-2 border-[#D4AF37] shadow-[0_30px_90px_rgba(212,175,55,0.4)] animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col md:flex-row items-center gap-6 min-w-[320px] max-w-lg backdrop-blur-2xl">
    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 flex-shrink-0">
      <ShieldAlert size={28} />
    </div>
    <div className="flex-1 text-center md:text-left">
      <p className="text-[12px] font-black tracking-[0.2em] text-[#D4AF37] uppercase mb-1">
        CREDITS EXHAUSTED
      </p>
      <p className="text-neutral-400 text-[10px] font-medium tracking-wide leading-relaxed">
        {FORGE_MESSAGES.UPGRADE_PROMPT}
      </p>
    </div>
    <div className="flex gap-3">
      <button 
        onClick={onUpgrade}
        className="px-6 py-3 bg-[#D4AF37] text-black text-[10px] font-black tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 uppercase"
      >
        Upgrade Now <ArrowRight size={14} />
      </button>
      <button onClick={onDismiss} className="p-3 text-neutral-600 hover:text-white transition-colors">
        <X size={18} />
      </button>
    </div>
  </div>
);

/**
 * Status Broadcast Notification for API/Process feedback
 */
const ForgeStatusNotification: React.FC<{ message: string; status: string; onDismiss: () => void; onRetry?: () => void }> = ({ message, status, onDismiss, onRetry }) => {
  const isError = ['API_LIMIT', 'NETWORK_ERROR', 'SERVER_BUSY', 'FORGE_FAILED'].includes(status);
  
  return (
    <div className={`fixed top-32 left-1/2 -translate-x-1/2 z-[5000] px-8 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 flex items-center gap-4 min-w-[320px] max-w-md ${
      isError 
        ? 'bg-red-500/10 border-red-500/50 text-red-200' 
        : 'bg-[#D4AF37]/10 border-[#D4AF37]/50 text-[#D4AF37]'
    }`}>
      {isError ? <ShieldAlert size={20} /> : <Sparkles size={20} />}
      <div className="flex-1">
        <p className="text-[10px] font-black tracking-[0.2em] uppercase mb-0.5">
          {status.replace('_', ' ')}
        </p>
        <p className="text-xs font-medium tracking-wide leading-relaxed">
          {message}
        </p>
      </div>
      {status === 'NETWORK_ERROR' && onRetry && (
        <button onClick={onRetry} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white">
          <RefreshCw size={14} />
        </button>
      )}
      <button onClick={onDismiss} className="p-2 hover:bg-white/5 rounded-lg transition-colors opacity-60 hover:opacity-100">
        <X size={16} />
      </button>
    </div>
  );
};

/**
 * The Forge Veil (High-fidelity loading screen)
 */
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_80%)]" />
      <button onClick={onDismantle} className="absolute top-10 right-10 z-50 p-4 bg-black/60 border border-white/10 rounded-full text-white/40 hover:text-[#D4AF37] transition-all group flex items-center gap-3">
        <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Dismantle Veil</span>
        <Power size={20} />
      </button>
      <div className="relative z-10 flex flex-col items-center text-center space-y-12 max-w-lg">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-[0.5px] border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin-slow shadow-[0_0_40px_rgba(212,175,55,0.1)]" />
          <Sparkles className="absolute inset-0 m-auto text-[#D4AF37] animate-pulse" size={30} />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-cinzel font-bold text-white tracking-[0.2em] uppercase drop-shadow-xl">Forging Resonance</h3>
          <div className="flex items-center justify-center gap-3 text-[9px] font-black tracking-[0.4em] text-[#D4AF37] uppercase bg-black/60 px-6 py-2 rounded-full border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl">
            <Terminal size={12} /> {status || FORGE_MESSAGES.LOADING}{dots}
          </div>
        </div>
        <div className="w-48 h-[1px] bg-black/20 relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#D4AF37] animate-progress" />
        </div>
      </div>
    </div>
  );
};

/**
 * Standard Informational Page Wrapper for all 20+ navigation views
 */
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
  const [currentStatus, setCurrentStatus] = useState<string>('DORMANT');
  const [showUpgradePanel, setShowUpgradePanel] = useState(false);
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
    localStorage.setItem('fanatiq_active_view', activeView);
    localStorage.setItem('fanatiq_last_prompt', persistedPrompt);
    localStorage.setItem('fanatiq_last_archetype', persistedArchetype);
    localStorage.setItem('fanatiq_last_category', selectedCategoryId.toString());
    localStorage.setItem('fanatiq_fast_forge', isFastForgeActive.toString());
  }, [activeView, persistedPrompt, persistedArchetype, selectedCategoryId, isFastForgeActive]);

  const clearWatchdog = () => { if (watchdogRef.current) { window.clearTimeout(watchdogRef.current); watchdogRef.current = null; } };
  
  const resetForgeSession = useCallback(() => {
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setChatConcept(null);
    setPersistedPrompt("");
    localStorage.removeItem('fanatiq_last_prompt');
    setForgeState('DORMANT');
    setCurrentStatus('DORMANT');
    setStatusMessage(null);
    setShowUpgradePanel(false);
    jobResolvedRef.current = true;
    clearWatchdog();
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.debug("[FORGE] Session Resynchronized. Rewrite the Multiverse.");
  }, []);

  const resolveJob = useCallback((finalState: 'COMPLETED' | 'FAILED', status: string, message: string | null = null) => {
    if (jobResolvedRef.current) return;
    jobResolvedRef.current = true;
    clearWatchdog();
    setForgeState(finalState);
    setCurrentStatus(status);
    setStatusMessage(message);
    if (finalState === 'FAILED') {
      setTimeout(() => { setForgeState('DORMANT'); setCurrentStatus('DORMANT'); }, 5000);
    }
  }, []);

  const startWatchdog = useCallback(() => {
    clearWatchdog();
    watchdogRef.current = window.setTimeout(() => {
      if (!jobResolvedRef.current) resolveJob('FAILED', 'SERVER_BUSY', FORGE_MESSAGES.TIMEOUT); 
    }, 25000); 
  }, [resolveJob]);

  const handleProUpgrade = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') { 
      await (window as any).aistudio.openSelectKey(); 
    }
    upgradeToPro();
    setActiveView('home');
  };

  const callGeminiForge = async (starInput: string, archetype: SubArchetypeFlavor) => {
    const selectedCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];
    const enhancedPrompt = enhancePrompt(starInput, archetype, selectedCategory.name);
    const timelinePromise = generateTimeline(starInput).catch(() => null);
    
    const isPro = subState.tier === 'pro';
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Use specialized image models for premium aesthetics
    const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

    try {
      const response = await ai.models.generateContent({
        model, 
        contents: { parts: [{ text: enhancedPrompt }] },
        config: { imageConfig: { aspectRatio: "1:1", ...(isPro && { imageSize: "2K" }) } }
      });
      
      const images: string[] = [];
      response.candidates?.[0]?.content?.parts?.forEach(part => { 
        if (part.inlineData) images.push(`data:image/png;base64,${part.inlineData.data}`); 
      });

      const timeline = await timelinePromise;
      if (images.length > 0) return { status: "SUCCESS", data: { images, timeline } };
      return { status: "NETWORK_ERROR" };
    } catch (err: any) {
      return interpretGeminiError(err);
    }
  };

  const beginFormation = async (starInput: string, archetype: SubArchetypeFlavor) => {
    setForgeState("FORGING"); 
    setCurrentStatus("LOADING");

    if (!canGenerate) {
      setShowUpgradePanel(true);
      setForgeState('DORMANT');
      setCurrentStatus('OUT_OF_CREDITS');
      return; 
    }
    
    setShowUpgradePanel(false);
    jobResolvedRef.current = false; 
    setChatConcept(starInput); 
    startWatchdog();

    const result = await callGeminiForge(starInput, archetype);
    
    if (result.status === 'SUCCESS') {
      const { images, timeline } = (result as any).data; 
      setGeneratedImages(images); 
      setTimelineArtifact(timeline); 
      recordGeneration(); 
      resolveJob('COMPLETED', 'SUCCESS');
      setTimeout(() => document.getElementById('results-dashboard')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (result.status === 'OUT_OF_CREDITS') {
      setShowUpgradePanel(true);
      resolveJob('FAILED', 'OUT_OF_CREDITS');
    } else if (result.status === 'SERVER_BUSY') {
      resolveJob('FAILED', 'SERVER_BUSY', FORGE_MESSAGES.SERVER_BUSY);
    } else if (result.status === 'NETWORK_ERROR') {
      resolveJob('FAILED', 'NETWORK_ERROR', FORGE_MESSAGES.NETWORK_ERROR);
    } else if (result.status === 'API_LIMIT') {
      resolveJob('FAILED', 'API_LIMIT', FORGE_MESSAGES.API_LIMIT);
    } else {
      resolveJob('FAILED', 'FORGE_FAILED', FORGE_MESSAGES.FAILED);
    }
  };

  const handleViewChange = (view: ViewType) => {
    if (view === 'join') { setAuthMode('signup'); setIsAuthModalOpen(true); return; }
    setActiveView(view); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  return (
    <div className="min-h-screen granite-texture bg-[#0d0d0d] overflow-x-hidden font-inter relative">
      <div className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000" style={{ background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(212, 175, 55, 0.04), transparent)`, opacity: activeView === 'home' ? 1 : 0 }} />
      {showUpgradePanel && <UpgradeNotification onDismiss={() => setShowUpgradePanel(false)} onUpgrade={() => handleViewChange('pricing')} />}
      
      {/* Universal Forge Veil for all Loading/Forging states */}
      <ForgeVeil 
        isActive={forgeState === 'FORGING' && activeView === 'home' && !showUpgradePanel} 
        status={statusMessage || (isFastForgeActive ? FORGE_MESSAGES.FAST_FORGE : FORGE_MESSAGES.LOADING)} 
        onDismantle={() => { clearWatchdog(); setForgeState('DORMANT'); setCurrentStatus('DORMANT'); }} 
      />
      
      <Header tier={subState.tier} activeView={activeView} onViewChange={handleViewChange} onCreateTribute={resetForgeSession} onAuthClick={(m) => { setAuthMode(m); setIsAuthModalOpen(true); }} />
      
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 relative z-10">
        {statusMessage && currentStatus !== 'LOADING' && (
          <ForgeStatusNotification 
            onDismiss={() => setStatusMessage(null)} 
            message={statusMessage} 
            status={currentStatus} 
            onRetry={() => beginFormation(chatConcept || persistedPrompt, persistedArchetype)} 
          />
        )}
        
        <div key={activeView} className="view-transition">
          {activeView === 'home' ? (
            <div className="space-y-16">
              <Hero selectedCategoryId={selectedCategoryId} onCategorySelect={(id) => { setSelectedCategoryId(id); if (forgeState === 'DORMANT') setForgeState('CONVENING'); }} />
              <section id="forgeContainer" className="space-y-8">
                <PromptGenerator onGenerate={beginFormation} forgeState={forgeState} tier={subState.tier} cooldown={subState.cooldownRemaining} canGenerate={canGenerate} initialPrompt={persistedPrompt} initialArchetype={persistedArchetype} onPromptChange={setPersistedPrompt} onArchetypeChange={setPersistedArchetype} onInputFocus={() => { if (forgeState === 'DORMANT' || forgeState === 'COMPLETED') setForgeState('CONVENING'); }} />
                <UsageTracker state={subState} forgeState={forgeState} onUpgradeClick={() => handleViewChange('pricing')} />
              </section>
              {forgeState === 'COMPLETED' && (
                <div id="results-dashboard" className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-900/50 pb-10">
                    <h3 className="text-4xl md:text-5xl font-cinzel font-bold tracking-[0.4em] uppercase filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]"><span className="text-white">ICONIC</span> <span className="text-[#D4AF37]">VISION</span></h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-6"><ResultsSection isLoading={false} images={generatedImages} tier={subState.tier} gridColsOverride="grid-cols-1" hideHeader={true} starName={chatConcept} /></div>
                    <div className="lg:col-span-6 lg:sticky lg:top-32"><FanChat initialConcept={chatConcept} isSidebarMode={true} /></div>
                  </div>
                  <TimelineGenerator artifact={timelineArtifact} isLoading={false} />
                </div>
              )}
            </div>
          ) : activeView === 'fanchat' || activeView === 'fan-chat' ? (
            <div className="py-20"><FanChat initialConcept={chatConcept} /></div>
          ) : activeView === 'trending' || activeView === 'clubs-top' || activeView === 'tributes-legendary' ? (
            <Gallery title={activeView === 'trending' ? "Trending G.O.A.Ts" : activeView === 'clubs-top' ? "Elite Clubs" : "Legendary Vault"} type="trending" />
          ) : activeView === 'community' || activeView === 'fan-book' || activeView === 'tributes-new' ? (
            <Gallery title={activeView === 'fan-book' ? "The Fan Book" : "New Manifestations"} type="community" />
          ) : activeView === 'pricing' ? (
            <Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? handleProUpgrade : downgradeToFree} />
          ) : activeView === 'about' ? (
            <PageWrapper title="About FanatiqAI" subtitle="Neural Legacy Forge" icon={<Info />}><p>FanatiqAI was founded on a singular principle: The spirit of fandom is sacred. We believe fans should have a place to honor their idols through high-fidelity symbolic reinterpretations.</p><p>By blending advanced neural synthesis with specific trade iconography, we create relics that capture the essence of greatness without literal depiction.</p></PageWrapper>
          ) : activeView === 'goat' ? (
            <PageWrapper title="What is G.O.A.T?" subtitle="Greatest of All Time Protocol" icon={<Award />}><p>The G.O.A.T protocol evaluates the resonance of every manifest based on technical fidelity, symbolic accuracy, and community sentiment.</p><p>Artifacts with the highest neural sync achieve Zenith status and are immortalized in the legendary vault.</p></PageWrapper>
          ) : activeView === 'manifesto' ? (
            <PageWrapper title="Fanatiq Manifesto" subtitle="Core Neural Principles" icon={<BookOpen />}><p>Fandom is the fuel of legends. We stand for the right of every fan to manifest their tribute in the highest possible quality. We believe symbols carry more weight than literal images.</p></PageWrapper>
          ) : activeView === 'terms' ? (
            <PageWrapper title="Terms of Service" icon={<Scale />}><p>By accessing the Forge, you agree to respect the symbolic integrity of all manifested relics. Use of the service constitutes agreement to our fair-use policies.</p></PageWrapper>
          ) : activeView === 'privacy' ? (
            <PageWrapper title="Privacy Policy" icon={<Shield />}><p>Your neural inputs and session data are encrypted using Fanatiq standard protocols. We never store personal biometric data.</p></PageWrapper>
          ) : activeView === 'copyright' ? (
            <PageWrapper title="Copyright & Ownership" icon={<Copyright />}><p>While FanatiqAI owns the neural models, the fans own the legacy of the tributes they manifest. These are digital collectibles intended for fan expression.</p></PageWrapper>
          ) : activeView === 'support' ? (
            <PageWrapper title="Support Hub" icon={<LifeBuoy />}><p>Need assistance with your manifest? Our neural support team is available 24/7 via the encrypted channel.</p></PageWrapper>
          ) : activeView === 'how-it-works' ? (
             <PageWrapper title="How it Works" icon={<Zap />}><p>The Fanatiq process involves three stages: 1. Input Resonance, 2. Neural Formation, 3. Legacy Manifestation. Each relic is unique to your session.</p></PageWrapper>
          ) : activeView === 'rankings' ? (
             <PageWrapper title="Fan Rankings" icon={<Trophy />}><p>The most dedicated Fanatiqs earn their place in the upper echelons of the network. Ranking is based on the quality and engagement of your manifested relics.</p></PageWrapper>
          ) : activeView === 'levels' ? (
             <PageWrapper title="Creator Levels" icon={<Award />}><p>Unlock new archetypes and materials as you progress through the creator tiers. From Novice to Ascended, your journey is tracked in real-time.</p></PageWrapper>
          ) : (
            <PageWrapper title={activeView.replace('-', ' ').toUpperCase()} icon={<Sparkles />}><p>This portal is currently synchronizing with the neural network. Please check back shortly.</p></PageWrapper>
          )}
        </div>
      </main>
      <Footer onViewChange={handleViewChange} />
      <AuthModals isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
    </div>
  );
};

export default App;
