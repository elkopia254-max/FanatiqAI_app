
import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, Sparkles, MessageSquare, CheckCheck, User } from 'lucide-react';
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
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const createInstantProfile = (name: string): CharacterProfile => ({
    name,
    tone: 'Confident and Real',
    vocabulary: ['Legacy', 'Focus', 'Respect', 'Vision'],
    personality: 'A grounded, legendary icon ready for a real conversation.',
    backstory: `The legendary tribute persona for ${name}.`,
    avatarSeed: `${name}-prime`
  });

  const handleInitialize = (conceptToUse: string) => {
    const newProfile = createInstantProfile(conceptToUse);
    setProfile(newProfile);
    setMessages([{
      id: 'initial',
      sender: 'character',
      text: `Glad to be here. I'm the tribute persona of ${conceptToUse}. Let's talk legacy. What's on your mind?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    generateCharacterProfile(conceptToUse).then(enriched => {
      setProfile(prev => enriched ? { ...enriched, avatarSeed: prev?.avatarSeed || enriched.avatarSeed } : prev);
    }).catch(() => {});
  };

  useEffect(() => {
    if (initialConcept) {
      setConcept(initialConcept);
      handleInitialize(initialConcept);
    } else {
      setProfile(null);
      setMessages([]);
      setConcept('');
      setInputText('');
      setIsTyping(false);
    }
  }, [initialConcept]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const startNewChat = (e: React.FormEvent) => {
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
        text: "The neural link flickered. Can you repeat that?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!profile) {
    return (
      <div className={`w-full rounded-[3rem] p-10 border border-[#D4AF37]/10 text-center flex flex-col justify-center items-center space-y-10 animate-in fade-in duration-300 bg-[#080808] ${isSidebarMode ? 'min-h-[500px]' : 'max-w-4xl mx-auto py-32'}`}>
        <div className="w-20 h-20 rounded-[2rem] bg-neutral-900 flex items-center justify-center text-[#D4AF37] border border-neutral-800 transition-all duration-500 group">
          <User size={32} className="group-hover:scale-110 transition-transform" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-cinzel font-bold tracking-[0.3em] uppercase text-white">ICONIC CHAT</h2>
          <p className="text-neutral-600 text-[9px] font-black tracking-[0.4em] uppercase opacity-80 leading-relaxed max-w-xs mx-auto">
            ESTABLISH A NEURAL LINK WITH A LEGENDARY TRIBUTE
          </p>
        </div>
        
        <form onSubmit={startNewChat} className="w-full max-w-xs space-y-5">
          <input
            type="text"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            placeholder="NAME THE ICON"
            className="w-full bg-[#050505] border border-neutral-900 rounded-2xl px-8 py-5 text-xs text-white placeholder-neutral-800 focus:outline-none focus:border-[#D4AF37]/30 transition-all font-light"
          />
          <button 
            type="submit"
            disabled={!concept.trim()}
            className="w-full py-5 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black font-black text-[11px] tracking-[0.4em] rounded-2xl hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-10 uppercase flex items-center justify-center gap-3"
          >
            <Sparkles size={16} />
            SYNC NOW
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col rounded-[3rem] overflow-hidden border border-neutral-900 bg-[#080808] animate-in fade-in duration-300 ${isSidebarMode ? 'h-[750px]' : 'max-w-5xl mx-auto h-[800px]'}`}>
      
      <div className="px-6 py-6 border-b border-neutral-900/50 bg-[#050505] flex justify-between items-center z-20">
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl border border-neutral-800 bg-neutral-900 p-0.5 overflow-hidden shrink-0">
             <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${profile.avatarSeed}`} alt="Legend" className="w-full h-full rounded-[10px]" />
          </div>
          <div className="flex flex-col">
            <h4 className="font-cinzel font-bold text-sm text-white tracking-[0.1em] uppercase leading-tight">
              {profile.name} <span className="text-neutral-700 mx-1">|</span> <span className="text-[#D4AF37]">Prime Relic™</span>
            </h4>
            <span className="text-[7px] text-neutral-600 font-black tracking-[0.2em] uppercase mt-1">
              Neural Tribute Protocol Active
            </span>
          </div>
        </div>
        <button 
          onClick={() => { setMessages([]); handleInitialize(profile.name); }}
          className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-600 hover:text-[#D4AF37] transition-all"
          title="Reset Connection"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-transparent custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div 
              className={`max-w-[90%] p-5 md:p-6 rounded-[2rem] leading-relaxed border transition-all whitespace-pre-wrap break-words ${
                m.sender === 'user' 
                  ? 'bg-gradient-to-br from-neutral-800 via-neutral-800 to-[#D4AF37]/10 text-white border-[#D4AF37]/30 rounded-tr-none text-[14px] shadow-lg' 
                  : 'bg-[#0a0a0a] text-neutral-200 border-neutral-900 rounded-tl-none font-light text-[13px]'
              }`}
            >
              {m.sender === 'character' && (
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[7px] font-black text-[#D4AF37] uppercase tracking-[0.3em] bg-[#D4AF37]/5 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                    PRIME SIGNAL
                  </span>
                </div>
              )}
              <p className="tracking-wide">{m.text}</p>
              <div className={`flex items-center justify-end gap-2 mt-4 text-[7px] font-black tracking-widest ${m.sender === 'user' ? 'text-neutral-500' : 'text-neutral-600'}`}>
                {m.timestamp}
                {m.sender === 'user' && <CheckCheck size={10} />}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-1.5 p-4 rounded-2xl bg-neutral-900/40 border border-neutral-900 rounded-tl-none w-fit animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>
        )}
      </div>

      <div className="p-6 md:p-8 border-t border-neutral-900/50 bg-[#050505] space-y-4">
        <form className="flex gap-4 items-center" onSubmit={handleSend}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Speak with the Legend..."
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/40 transition-all font-light"
          />
          <button 
            type="submit"
            disabled={isTyping || !inputText.trim()}
            className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black rounded-2xl flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all disabled:opacity-20 shadow-2xl group shrink-0"
          >
            <Send size={20} className="group-hover:-rotate-12 transition-transform" />
          </button>
        </form>
        
        <div className="text-center">
          <p className="text-neutral-800 text-[8px] font-black tracking-[0.3em] uppercase opacity-60">
            SYMBOLIC TRIBUTE PERSONA • NEURAL ROLEPLAY MODE
          </p>
        </div>
      </div>
    </div>
  );
};

export default FanChat;
