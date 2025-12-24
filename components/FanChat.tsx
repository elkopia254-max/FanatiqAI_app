
import React, { useState, useEffect, useRef } from 'react';
import { Send, User, RefreshCw, Loader2, Sparkles, MessageSquare, CheckCheck } from 'lucide-react';
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
        text: `Hi. How are you doing? What’s on your mind?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch {
      // Swallowed for Dignity
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
      // Swallowed for Dignity
    } finally {
      setIsTyping(false);
    }
  };

  if (!profile) {
    return (
      <div className={`w-full glass rounded-[3rem] p-10 border border-[#D4AF37]/20 text-center flex flex-col justify-center items-center space-y-10 animate-in fade-in duration-1000 shadow-2xl ${isSidebarMode ? 'h-full bg-neutral-900/10' : 'max-w-4xl mx-auto py-32'}`}>
        <div className="w-24 h-24 rounded-[2.5rem] bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30 shadow-[0_0_40px_rgba(212,175,55,0.2)] relative group">
          {isInitializing ? (
            <Loader2 size={36} className="animate-spin" />
          ) : (
            <>
              <MessageSquare size={36} className="group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-[2.5rem] animate-ping opacity-30" />
            </>
          )}
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-cinzel font-bold tracking-[0.3em] uppercase drop-shadow-lg">
            {isInitializing ? (
              <span className="text-white">CONNECTING...</span>
            ) : (
              <>
                <span className="text-white">ICONIC</span> <span className="text-[#D4AF37]">CHAT</span>
              </>
            )}
          </h2>
          <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-xs mx-auto tracking-widest opacity-80">
            {isInitializing ? 'Establishing grounded social connection...' : 'Casual conversations with high-fidelity realistic manifestations.'}
          </p>
        </div>
        
        {!isInitializing && (
          <form onSubmit={startNewChat} className="w-full max-w-xs space-y-5">
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Name of the Icon"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-6 py-5 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-all font-light shadow-inner"
            />
            <button 
              type="submit"
              disabled={!concept.trim()}
              className="w-full py-5 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black font-black text-[11px] tracking-[0.5em] rounded-2xl shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-20 uppercase flex items-center justify-center gap-3 group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              INITIATE LINK
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col glass rounded-[3rem] overflow-hidden border border-neutral-800 shadow-[0_60px_120px_rgba(0,0,0,0.6)] animate-in slide-in-from-right-12 duration-1000 ${isSidebarMode ? 'h-full' : 'max-w-5xl mx-auto h-[800px]'}`}>
      
      {/* Dynamic Header */}
      <div className="px-8 py-6 border-b border-neutral-800/60 bg-neutral-950/90 backdrop-blur-3xl flex justify-between items-center z-20 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl border border-[#D4AF37]/40 bg-neutral-900 p-0.5 overflow-hidden shadow-2xl ring-2 ring-black/50">
               <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.avatarSeed}`} alt="Avatar" className="w-full h-full rounded-[14px]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-cinzel font-bold text-base text-white tracking-[0.25em] uppercase truncate drop-shadow-md">{profile.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[9px] text-[#D4AF37] font-black tracking-[0.4em] uppercase opacity-90 drop-shadow-sm">Grounded Mode Active</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={() => { setMessages([]); handleInitialize(profile.name); }}
            disabled={isTyping}
            className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 hover:bg-neutral-800 transition-all disabled:opacity-20 group shadow-lg"
          >
            <RefreshCw size={18} className={`transition-transform duration-700 ${isTyping ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          </button>
          <button 
            onClick={() => setProfile(null)}
            className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-white transition-all shadow-lg"
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Messaging Chamber */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-10 space-y-8 scroll-smooth bg-neutral-950/30 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div 
              className={`max-w-[85%] p-6 rounded-3xl text-[12px] leading-relaxed shadow-2xl transition-all duration-500 group border ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black rounded-tr-none font-bold border-[#D4AF37]/20 shadow-[0_15px_30px_rgba(212,175,55,0.2)]' 
                  : 'bg-neutral-900/90 text-neutral-200 border-neutral-800 rounded-tl-none font-light backdrop-blur-xl'
              }`}
            >
              {m.sender === 'character' && (
                <span className="block text-[8px] font-black text-[#D4AF37] mb-3 uppercase tracking-[0.4em] opacity-90">
                  {profile.name}
                </span>
              )}
              <p className="tracking-wide leading-relaxed">{m.text}</p>
              <div className={`flex items-center justify-end gap-2 mt-4 text-[7px] font-black tracking-widest ${m.sender === 'user' ? 'text-black/50' : 'text-neutral-600'}`}>
                {m.timestamp}
                {m.sender === 'user' && <CheckCheck size={11} />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 rounded-tl-none flex gap-2 items-center shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Interface Port */}
      <div className="p-6 md:p-8 border-t border-neutral-800/60 bg-neutral-950/90 backdrop-blur-3xl shadow-2xl">
        <form className="flex gap-4 items-center" onSubmit={handleSend}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter casual message..."
              autoFocus
              className="w-full bg-neutral-900/60 border border-neutral-800/80 rounded-2xl px-6 py-4 text-sm text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-neutral-900 transition-all font-light shadow-inner"
            />
          </div>
          <button 
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black rounded-2xl flex items-center justify-center hover:scale-[1.08] active:scale-95 transition-all shadow-2xl disabled:opacity-20 group"
          >
            <Send size={22} className="group-hover:-rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FanChat;
