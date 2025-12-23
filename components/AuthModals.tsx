import React, { useState } from 'react';
import { X, Mail, Lock, Chrome, Apple, ArrowRight, UserPlus, LogIn, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

const AuthModals: React.FC<Props> = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className="relative glass w-full max-w-md rounded-[3.5rem] border-[#D4AF37]/30 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden p-8 md:p-12 animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-neutral-600 hover:text-white transition-all hover:rotate-90 z-10"
        >
          <X size={24} />
        </button>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
                {mode === 'login' ? <LogIn className="text-[#D4AF37]" size={28} /> : <UserPlus className="text-[#D4AF37]" size={28} />}
              </div>
            </div>
            
            <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-white tracking-[0.1em] uppercase">
              {mode === 'login' ? 'Continue building your legacy.' : 'Join today and start honoring your favorite stars.'}
            </h3>
            
            <p className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase">
              {mode === 'login' ? 'WELCOME BACK TO THE VAULT' : 'CREATE TRIBUTES FOR JUST $10/MONTH'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Social Authentication */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all">
                <Chrome size={16} /> Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 text-white text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all">
                <Apple size={16} /> Apple
              </button>
            </div>

            <div className="relative py-4 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-neutral-800" />
              <span className="text-[8px] font-black text-neutral-600 tracking-[0.3em] uppercase">OR EMAIL</span>
              <div className="flex-1 h-[1px] bg-neutral-800" />
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-14 py-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#D4AF37] transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-14 py-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-all font-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button type="button" className="text-[9px] font-black text-neutral-500 hover:text-[#D4AF37] tracking-[0.2em] uppercase transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button className="w-full py-5 bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black font-black text-[11px] tracking-[0.5em] rounded-2xl shadow-2xl hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95 transition-all uppercase flex items-center justify-center gap-3">
                {mode === 'login' ? 'ACCESS VAULT' : 'INITIATE LEGACY'}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="text-center pt-4">
            <button 
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[9px] font-black text-neutral-500 tracking-[0.3em] uppercase hover:text-white transition-colors"
            >
              {mode === 'login' ? "NEW? JOIN NOW AND START BUILDING YOUR TRIBUTES." : "ALREADY A MEMBER? CONTINUE YOUR LEGACY."}
            </button>
          </div>

          <div className="pt-6 border-t border-neutral-800/50 flex flex-col items-center gap-3">
             <div className="flex items-center gap-2 text-[8px] text-neutral-600 font-black tracking-widest uppercase">
               <Sparkles size={10} className="text-[#D4AF37]" />
               Encrypted Neural Protocol Active
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModals;