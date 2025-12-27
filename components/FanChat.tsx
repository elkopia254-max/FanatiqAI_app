
import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, Loader2, Sparkles, MessageSquare, CheckCheck, Info, User, Flame } from 'lucide-react';
import { generateCharacterProfile, getCharacterResponse, CharacterProfile, ChatMessage } from '../lib/chat-engine';

interface Props {
  initialConcept?: string | null;
  isSidebarMode?: boolean;
}

const FanChat: React.FC<Props> = ({ initialConcept, isSidebarMode = false }) => {
  const [concept, setConcept] = useState('');
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialConcept) {
      setConcept(initialConcept);
      handleInitialize(initialConcept);
    }
  }, [initialConcept]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleInitialize = async (conceptToUse: string) => {
    setIsInitializing(true);
    try {
      const newProfile = await generateCharacterProfile(conceptToUse);
      setProfile(newProfile);
      setMessages([{
        id: 'initial',
        sender: 'character',
        text: `Hey, great to see you. Glad we could connect. I'm the legendary tribute version of ${conceptToUse}. What's happening?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      setProfile({
        name: conceptToUse,
        tone: 'Friendly',
        vocabulary: ['Focus', 'Work', 'Journey', 'Respect'],
        personality: 'Warm and Confident',
        backstory: 'A legendary tribute persona built for real talk.',
        avatarSeed: conceptToUse
      });
    } finally {
      setIsInitializing(false);
    }
  };

  const startNewChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;
    handleInitialize(concept);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !profile || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await getCharacterResponse(profile, userMsg.text, messages);
      const characterMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'character',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, characterMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: 'error',
        sender: 'character',
        text: "Sorry, I missed that. Say that again?",
        timestamp: ''
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!profile) {
    return (
      <div className={`w-full glass rounded-[3rem] p-10 border border-[#D4AF37]/20 text-center flex flex-col justify-center items-center space-y-10 animate-in fade-in duration-500 shadow-2xl ${isSidebarMode ? 'min-h-[500px] bg-neutral-900/10' : 'max-w-4xl mx-auto py-32'}`}>
        <div className="w-24 h-24 rounded-[2.5rem] bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.25)] relative group">
          {isInitializing ? (
            <Loader2 size={36} className="animate-spin" />
          ) : (
            <>
              <User size={36} className="group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-[2.5rem] animate-ping opacity-20" />
            </>
          )}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-cinzel font-bold tracking-[0.3em] uppercase drop-shadow-lg">
            {isInitializing ? 'LINKING UP...' : 'LEGENDARY MODE'}
          </h2>
          <p className="text-neutral-500 text-[10px] font-black tracking-[0.5em] uppercase opacity-70 leading-relaxed max-w-xs mx-auto">
            {isInitializing ? 'GETTING THE ICON ON THE LINE...' : 'TALK WITH THE SPIRIT OF THE GAME'}
          </p>
        </div>
        
        {!isInitializing && (
          <form onSubmit={startNewChat} className="w-full max-w-xs space-y-6">
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="ENTER STAR NAME"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-8 py-5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-all font-light"
            />
            <button 
              type="submit"
              disabled={!concept.trim()}
              className="w-full py-5 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black font-black text-[11px] tracking-[0.5em] rounded-2xl shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-20 uppercase flex items-center justify-center gap-3 group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              START CHAT
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col glass rounded-[3rem] overflow-hidden border border-neutral-800 shadow-[0_60px_120px_rgba(0,0,0,0.7)] animate-in fade-in duration-500 ${isSidebarMode ? 'h-[750px]' : 'max-w-5xl mx-auto h-[800px]'}`}>
      
      {/* Legendary Header - Expanded to prevent truncation */}
      <div className="px-6 md:px-10 py-8 border-b border-neutral-800/60 bg-neutral-950/90 flex justify-between items-center z-20">
        <div className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
          <div className="relative group flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl border-2 border-[#D4AF37]/40 bg-neutral-900 p-0.5 shadow-2xl transition-all duration-700 group-hover:border-[#D4AF37]">
               <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.avatarSeed}`} alt="Legend" className="w-full h-full rounded-[12px] opacity-80" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 md:w-4 h-3 md:h-4 bg-[#D4AF37] border-2 border-black rounded-full animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.7)]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="font-cinzel font-bold text-sm md:text-base text-white tracking-[0.1em] md:tracking-[0.15em] uppercase leading-tight drop-shadow-md break-words">
              {profile.name} – <span className="text-[#D4AF37] whitespace-nowrap">Prime Relic™</span>
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] text-neutral-500 font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-80">
                (Symbolic Tribute Persona)
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => { setMessages([]); handleInitialize(profile.name); }}
          className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all shadow-lg group ml-4 flex-shrink-0"
        >
          <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
        </button>
      </div>

      {/* Casual Dialogue Chamber */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-neutral-950/40 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
            <div 
              className={`max-w-[85%] md:max-w-[80%] p-5 md:p-6 rounded-[2rem] text-[12px] leading-relaxed border transition-all shadow-2xl ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black border-[#D4AF37]/20 rounded-tr-none font-bold' 
                  : 'bg-neutral-900/90 text-neutral-100 border-neutral-800 rounded-tl-none font-light backdrop-blur-xl'
              }`}
            >
              {m.sender === 'character' && (
                <div className="flex items-center gap-3 mb-3">
                  <span className="block text-[8px] font-black text-[#D4AF37] uppercase tracking-[0.4em] opacity-90">
                    LEGENDARY MODE ACTIVE
                  </span>
                </div>
              )}
              <p className="tracking-wide leading-relaxed">{m.text}</p>
              <div className={`flex items-center justify-end gap-2 mt-4 text-[7px] font-black tracking-widest ${m.sender === 'user' ? 'text-black/40' : 'text-neutral-500'}`}>
                {m.timestamp}
                {m.sender === 'user' && <CheckCheck size={12} />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-in fade-in duration-500">
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 rounded-tl-none flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Dialogue Port */}
      <div className="p-6 md:p-8 border-t border-neutral-800/60 bg-neutral-950/90 backdrop-blur-2xl space-y-5">
        <form className="flex gap-3 md:gap-4 items-center" onSubmit={handleSend}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              autoFocus
              className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-5 md:px-7 py-4 md:py-5 text-[13px] text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-4 focus:ring-[#D4AF37]/5 transition-all font-light"
            />
          </div>
          <button 
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black rounded-2xl flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-20 shadow-[0_15px_30px_rgba(212,175,55,0.4)] group"
          >
            <Send size={22} className="group-hover:-rotate-12 transition-transform" />
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-neutral-600 text-[9px] font-black tracking-[0.3em] md:tracking-[0.4em] uppercase opacity-80 leading-relaxed px-4">
            “This is a fan-imagined symbolic tribute persona. It is not the real person and does not represent actual views or statements.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default FanChat;
