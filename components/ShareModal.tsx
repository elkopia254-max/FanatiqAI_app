
import React, { useState } from 'react';
import { X, Copy, Check, Download, Send, Twitter, Facebook, Instagram, Mail, MessageSquare, Share as ShareIcon, Youtube, Music2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  starName: string;
}

const ShareModal: React.FC<Props> = ({ isOpen, onClose, image, starName }) => {
  const [copied, setCopied] = useState(false);
  
  // Create a unique shareable link
  const shareUrl = `${window.location.origin}?relic=${encodeURIComponent(btoa(starName))}`;
  
  // User Requested Share Text Template
  const SHARE_TEXT = `I just forged a legendary symbolic relic on FanatiqAI ✨\nRewrite the Multiverse.\nView it here → `;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT}${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `FanatiqAI | ${starName} Tribute`,
          text: SHARE_TEXT,
          url: shareUrl,
        });
        return true;
      } catch (err) {
        console.debug('Native share cancelled or failed:', err);
        return false;
      }
    }
    return false;
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `fanatiq-relic-${starName.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareActions = [
    { 
      name: 'WhatsApp', 
      icon: <MessageSquare size={18} />, 
      color: 'bg-[#25D366] text-white',
      action: async () => {
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + shareUrl)}`, "_blank");
      }
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={18} />, 
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white',
      action: async () => {
        await copyToClipboard();
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://www.instagram.com/`, "_blank");
      }
    },
    { 
      name: 'TikTok', 
      icon: <Music2 size={18} />, 
      color: 'bg-black text-white border-white/20',
      action: async () => {
        await copyToClipboard();
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://www.tiktok.com/upload?lang=en`, "_blank");
      }
    },
    { 
      name: 'X (Twitter)', 
      icon: <Twitter size={18} />, 
      color: 'bg-black text-white border-white/10',
      action: async () => {
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
      }
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={18} />, 
      color: 'bg-[#1877F2] text-white',
      action: async () => {
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
      }
    },
    { 
      name: 'Telegram', 
      icon: <Send size={18} />, 
      color: 'bg-[#0088cc] text-white',
      action: async () => {
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(SHARE_TEXT)}`, "_blank");
      }
    },
    { 
      name: 'Reddit', 
      icon: <ShareIcon size={18} />, 
      color: 'bg-[#FF4500] text-white',
      action: async () => {
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("Forged on FanatiqAI")}`, "_blank");
      }
    },
    { 
      name: 'YouTube', 
      icon: <Youtube size={18} />, 
      color: 'bg-[#FF0000] text-white',
      action: async () => {
        await copyToClipboard();
        const shared = await handleNativeShare();
        if (!shared) window.open(`https://www.youtube.com/`, '_blank');
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative glass w-full max-w-4xl rounded-[4rem] border-[#D4AF37]/30 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Artifact Preview */}
        <div className="w-full md:w-5/12 aspect-square md:aspect-auto bg-[#050505] relative group">
          <img src={image} alt="Artifact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-10 left-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-[8px] font-black tracking-[0.5em] text-[#D4AF37] uppercase">PRIME RELIC™</span>
            </div>
            <h4 className="font-cinzel font-bold text-white text-3xl tracking-wider uppercase drop-shadow-2xl">{starName}</h4>
            <p className="text-neutral-500 text-[7px] font-black tracking-[0.4em] uppercase mt-2">Manifested on FanatiqAI</p>
          </div>
        </div>

        {/* Share Options */}
        <div className="w-full md:w-7/12 p-10 md:p-14 space-y-10 flex flex-col justify-center bg-black/40">
          <button onClick={onClose} className="absolute top-10 right-10 text-neutral-600 hover:text-white transition-all hover:rotate-90">
            <X size={28} />
          </button>

          <div className="space-y-3">
            <h3 className="font-cinzel text-3xl font-bold text-white tracking-[0.1em] uppercase">BroadCast Legacy</h3>
            <p className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase opacity-80">Sync your artifact across the global fan network</p>
          </div>

          {/* Copy Link Section */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000" />
              <div className="relative flex">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-l-2xl px-6 py-5 text-[11px] text-white/50 font-medium focus:outline-none"
                />
                <button 
                  onClick={copyToClipboard}
                  className="px-8 bg-neutral-800 border-y border-r border-neutral-700 rounded-r-2xl text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-3 text-[10px] font-black tracking-widest uppercase"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied' : 'Copy Link'}
                </button>
              </div>
            </div>
          </div>

          {/* Social Stack - 4x2 Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {shareActions.map((social) => (
              <button
                key={social.name}
                onClick={social.action}
                className={`flex flex-col items-center justify-center py-6 rounded-3xl transition-all hover:scale-[1.05] active:scale-95 space-y-3 border border-transparent shadow-xl group ${social.color}`}
              >
                <div className="p-2 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                  {social.icon}
                </div>
                <span className="text-[8px] font-black tracking-[0.2em] uppercase">{social.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-10 border-t border-neutral-800/50 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={downloadImage}
              className="flex-1 flex items-center justify-center gap-4 py-5 rounded-[1.5rem] bg-gradient-to-br from-[#D4AF37] to-[#8B7326] text-black text-[11px] font-black tracking-[0.3em] uppercase hover:shadow-[0_20px_40px_rgba(212,175,55,0.3)] transition-all"
            >
              <Download size={20} /> Download Relic
            </button>
            {navigator.share && (
              <button 
                onClick={handleNativeShare}
                className="flex-1 flex items-center justify-center gap-4 py-5 rounded-[1.5rem] bg-neutral-900 border border-neutral-800 text-white text-[11px] font-black tracking-[0.3em] uppercase hover:bg-neutral-800 transition-all"
              >
                <ShareIcon size={20} /> Smart Share
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="text-[8px] text-neutral-600 font-bold tracking-[0.3em] uppercase">
              Encrypted Fanatiq Protocol • Viral-Ready Artifact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
