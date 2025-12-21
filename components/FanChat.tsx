
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
        text: `The digital veil thins. I, ${newProfile.name}, have manifested into this neural layer. What business do you have with a ghost?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("Failed to initialize character:", err);
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
    } catch (err) {
      console.error("Chat response failed:", err);
    } finally {
      setIsTyping(false);
    }
  };

  if (!profile) {
    return (
      <div className={`w-full glass rounded-[2.5rem] p-8 border border-[#D4AF37]/10 text-center flex flex-col justify-center items-center space-y-8 animate-in fade-in duration-1000 ${isSidebarMode ? 'h-full bg-neutral-900/10' : 'max-w-4xl mx-auto py-24'}`}>
        <div className="w-20 h-20 rounded-[2rem] bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 shadow-[0_0_30px_rgba(212,175,55,0.1)] relative group">
          {isInitializing ? (
            <Loader2 size={32} className="animate-spin" />
          ) : (
            <>
              <MessageSquare size={32} className="group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-[2rem] animate-ping opacity-20" />
            </>
          )}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-cinzel font-bold tracking-[0.2em] text-white uppercase">
            {isInitializing ? 'SUMMONING...' : 'NEURAL INTERFACE'}
          </h2>
          <p className="text-neutral-500 text-xs font-light leading-relaxed max-w-xs mx-auto tracking-wide">
            {isInitializing ? 'Collapsing waveform for digital manifestation...' : 'Establish a link with a reinterpreted presence.'}
          </p>
        </div>
        
        {!isInitializing && (
          <form onSubmit={startNewChat} className="w-full max-w-xs space-y-4">
            <input
              type="text"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="e.g. Cyber-Viking Ronaldo"
              className="w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl px-5 py-4 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/40 focus:ring-1 focus:ring-[#D4AF37]/10 transition-all font-light"
            />
            <button 
              type="submit"
              disabled={!concept.trim()}
              className="w-full py-4 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black font-black text-[10px] tracking-[0.4em] rounded-2xl shadow-xl hover:shadow-[#D4AF37]/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 uppercase flex items-center justify-center gap-2 group"
            >
              <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
              INITIALIZE LINK
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col glass rounded-[2.5rem] overflow-hidden border border-neutral-800 shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-right-8 duration-1000 ${isSidebarMode ? 'h-full' : 'max-w-5xl mx-auto h-[750px]'}`}>
      
      {/* Dynamic Header */}
      <div className="px-6 py-5 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-2xl flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl border border-[#D4AF37]/30 bg-neutral-900 p-0.5 overflow-hidden shadow-lg shadow-black/50">
               <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.avatarSeed}`} alt="Avatar" className="w-full h-full rounded-[14px]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-cinzel font-bold text-sm text-white tracking-[0.2em] uppercase truncate">{profile.name}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[8px] text-[#D4AF37] font-black tracking-[0.3em] uppercase opacity-70">SYNERGY SYNCED</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => { setMessages([]); handleInitialize(profile.name); }}
            disabled={isTyping}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all disabled:opacity-20 group"
          >
            <RefreshCw size={16} className={`transition-transform duration-700 ${isTyping ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          </button>
          <button 
            onClick={() => setProfile(null)}
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-white transition-all"
          >
            <User size={16} />
          </button>
        </div>
      </div>

      {/* Messaging Chamber */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scroll-smooth bg-neutral-950/20 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
            <div 
              className={`max-w-[90%] p-5 rounded-2xl text-[11px] leading-relaxed shadow-xl transition-all duration-500 group ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-br from-[#D4AF37]/90 to-[#8B7326]/90 text-black rounded-tr-none font-semibold border border-[#D4AF37]/20' 
                  : 'bg-neutral-900/80 text-neutral-300 border border-neutral-800 rounded-tl-none font-light backdrop-blur-md'
              }`}
            >
              {m.sender === 'character' && (
                <span className="block text-[7px] font-black text-[#D4AF37] mb-2 uppercase tracking-[0.3em] opacity-80">
                  {profile.name}
                </span>
              )}
              <p className="tracking-wide">{m.text}</p>
              <div className={`flex items-center justify-end gap-2 mt-3 text-[7px] font-black tracking-widest ${m.sender === 'user' ? 'text-black/40' : 'text-neutral-600'}`}>
                {m.timestamp}
                {m.sender === 'user' && <CheckCheck size={10} />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex flex-col items-start animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 rounded-tl-none flex gap-1.5 items-center">
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-bounce" style={{ animationDelay: '0s' }} />
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-bounce" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50 animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Interface Port */}
      <div className="p-4 md:p-6 border-t border-neutral-800/50 bg-neutral-950/80 backdrop-blur-3xl">
        <form className="flex gap-2 items-center" onSubmit={handleSend}>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Speak..."
              autoFocus
              className="w-full bg-neutral-900/50 border border-neutral-800/80 rounded-xl px-4 py-3 text-[10px] text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/40 focus:bg-neutral-900 transition-all font-light"
            />
          </div>
          <button 
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black rounded-xl flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-xl disabled:opacity-20 group"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FanChat;
