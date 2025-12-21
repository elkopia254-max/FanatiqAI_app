
import React from 'react';
import { Camera, Palette, Cpu, TreePine, User, Globe } from 'lucide-react';

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
      {categories.map((cat, idx) => {
        const isActive = selectedId === cat.id;
        return (
          <div
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            style={{ transitionDelay: `${idx * 50}ms` }}
            className={`glass p-8 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer border transition-all duration-500 hover-lift ${
              isActive 
                ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 scale-105 shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
                : 'border-transparent hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5'
            }`}
          >
            <div className={`p-4 rounded-2xl transition-all duration-500 ${
              isActive 
                ? 'bg-neutral-800 text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-110' 
                : 'bg-neutral-800/50 text-[#D4AF37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:bg-neutral-800'
            }`}>
              {cat.icon}
            </div>
            <h3 className={`text-xs font-bold tracking-[0.2em] transition-colors mb-1 mt-5 ${
              isActive ? 'text-[#D4AF37]' : 'text-neutral-300 group-hover:text-[#D4AF37]'
            }`}>
              {cat.name.toUpperCase()}
            </h3>
            <span className={`text-[8px] font-black tracking-[0.15em] mb-1 transition-colors ${
              isActive ? 'text-neutral-500' : 'text-neutral-600 group-hover:text-neutral-500'
            }`}>
              {cat.description.toUpperCase()}
            </span>
            <span className={`text-[9px] font-bold transition-colors ${
              isActive ? 'text-neutral-400' : 'text-neutral-600 group-hover:text-neutral-400'
            }`}>
              {cat.count} RELICS
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;
