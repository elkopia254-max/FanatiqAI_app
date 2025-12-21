
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
import { GoogleGenAI } from "@google/genai";
import { enhancePrompt, validatePrompt, SubArchetypeFlavor } from './lib/prompt-engine';
import { useSubscription } from './lib/subscription-store';
import { generateTimeline, TimelineArtifact } from './lib/timeline-engine';
import { categories } from './components/CategoriesGrid';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTimelineLoading, setIsTimelineLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [timelineArtifact, setTimelineArtifact] = useState<TimelineArtifact | null>(null);
  const [chatConcept, setChatConcept] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
  
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
  }, [activeView]);

  const handleGenerate = async (starInput: string, archetype: SubArchetypeFlavor) => {
    if (!canGenerate) return;
    const validation = validatePrompt(starInput);
    if (!validation.isValid) {
      alert(validation.reason);
      return;
    }

    setIsGenerating(true);
    setIsTimelineLoading(true);
    setGeneratedImages([]);
    setTimelineArtifact(null);
    setChatConcept(starInput);
    
    const enhancedPrompt = enhancePrompt(starInput, archetype, selectedCategory.name);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imageCount = subState.tier === 'pro' ? 4 : 1;
      const results: string[] = [];

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
        
        if (results.length === 0) {
          results.push(`https://picsum.photos/seed/${Date.now()}/800/1200`);
        }
        setGeneratedImages(results);
      })();

      const timelinePromise = (async () => {
        try {
          const artifact = await generateTimeline(starInput);
          setTimelineArtifact(artifact);
        } catch (err) {
          console.error("Timeline generation failed:", err);
        } finally {
          setIsTimelineLoading(false);
        }
      })();

      await Promise.all([imagePromise, timelinePromise]);
      recordGeneration();
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsGenerating(false);
      setIsTimelineLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'trending':
        return (
          <section id="trending" className="reveal active py-20">
            <Gallery title="Trending Creations" type="trending" />
          </section>
        );
      case 'community':
        return (
          <section id="community" className="reveal active py-20">
            <Gallery title="Community Feed" type="community" />
          </section>
        );
      case 'fanchat':
        return (
          <section id="chat" className="reveal active py-20">
            <FanChat />
          </section>
        );
      case 'pricing':
        return (
          <section id="pricing" className="reveal active py-20">
            <Pricing currentTier={subState.tier} onSelect={subState.tier === 'free' ? upgradeToPro : downgradeToFree} />
          </section>
        );
      case 'home':
      default:
        return (
          <div className="space-y-12">
            <section className="reveal active">
              <Hero 
                selectedCategoryId={selectedCategoryId} 
                onCategorySelect={setSelectedCategoryId} 
              />
            </section>
            
            <section id="generate" className="reveal space-y-6">
              <PromptGenerator 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating} 
                tier={subState.tier} 
                cooldown={subState.cooldownRemaining}
                canGenerate={canGenerate}
              />
              <UsageTracker state={subState} />
            </section>

            <section id="command-center" className="reveal active py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                  <ResultsSection 
                    isLoading={isGenerating} 
                    images={generatedImages} 
                    tier={subState.tier} 
                    gridColsOverride="grid-cols-1 md:grid-cols-2" 
                  />
                </div>
                <div className="lg:col-span-4 sticky top-24 h-auto lg:h-[calc(100vh-140px)] min-h-[600px]">
                  <FanChat 
                    initialConcept={chatConcept} 
                    isSidebarMode={true} 
                  />
                </div>
              </div>
            </section>

            <section id="timeline-archive" className="reveal py-12">
              <TimelineGenerator artifact={timelineArtifact} isLoading={isTimelineLoading} />
            </section>
          </div>
        );
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
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
