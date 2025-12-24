import React from 'react';
import { Palette, Cpu, TreePine, User, Globe, Camera } from 'lucide-react';

export interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  count: string;
  description: string;
}

export const categories: Category[] = [
  { id: 1, name: 'Digital Art', icon: <Palette size={24} />, count: '2.4k', description: 'Neural Shaders' },
  { id: 2, name: 'Fashion', icon: <User size={24} />, count: '1.8k', description: 'Couture Materials' },
  { id: 3, name: 'Architecture', icon: <Globe size={24} />, count: '940', description: 'Sacred Structures' },
  { id: 4, name: 'Cyberpunk', icon: <Cpu size={24} />, count: '3.1k', description: 'Neon Circuits' },
  { id: 5, name: 'Nature', icon: <TreePine size={24} />, count: '1.2k', description: 'Elemental Forms' },
  { id: 6, name: 'Photography', icon: <Camera size={24} />, count: '2.1k', description: 'Lens Realism' },
];

interface Props {
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const CategoriesGrid: React.FC<Props> = ({ selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {categories.map((cat) => {
        const isActive = selectedId === cat.id;
        return (
          <div
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`glass p-6 md:p-8 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer border transition-all duration-200 active:scale-95 hover-lift relative overflow-hidden ${
              isActive 
                ? 'border-[#D4AF37] bg-[#D4AF37]/15 scale-[1.02] shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)] ring-1 ring-[#D4AF37]/20 z-10' 
                : 'border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/[0.03]'
            }`}
          >
            {/* Inner Glow for Active State */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none" />
            )}

            <div className={`p-4 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'bg-neutral-800 text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.3)] scale-110' 
                : 'bg-neutral-800/40 text-neutral-500 group-hover:scale-110 group-hover:text-[#D4AF37]/80 group-hover:bg-neutral-800/80 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]'
            }`}>
              {cat.icon}
            </div>

            <h3 className={`text-[10px] font-black tracking-[0.3em] transition-colors mb-1 mt-6 uppercase ${
              isActive ? 'text-[#D4AF37]' : 'text-neutral-500 group-hover:text-neutral-300'
            }`}>
              {cat.name}
            </h3>

            <span className={`text-[7px] font-bold tracking-[0.2em] mb-1 transition-colors uppercase ${
              isActive ? 'text-neutral-400' : 'text-neutral-600 group-hover:text-neutral-400'
            }`}>
              {cat.description}
            </span>

            <span className={`text-[8px] font-black transition-colors tracking-widest ${
              isActive ? 'text-[#D4AF37]/80' : 'text-neutral-700 group-hover:text-neutral-500'
            }`}>
              {cat.count} ARTIFACTS
            </span>

            {/* Subtle bottom highlight for active */}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;