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
            className={`glass p-8 rounded-2xl flex flex-col items-center justify-center text-center group cursor-pointer border transition-all duration-300 active:scale-95 hover-lift ${
              isActive 
                ? 'border-[#D4AF37] bg-[#D4AF37]/10 scale-105 shadow-[0_0_50px_rgba(212,175,55,0.25)]' 
                : 'border-transparent hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]'
            }`}
          >
            <div className={`p-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-neutral-800 text-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.5)] scale-110' 
                : 'bg-neutral-800/40 text-neutral-500 group-hover:scale-110 group-hover:text-[#D4AF37] group-hover:bg-neutral-800 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]'
            }`}>
              {cat.icon}
            </div>
            <h3 className={`text-[10px] font-black tracking-[0.3em] transition-colors mb-1 mt-6 uppercase ${
              isActive ? 'text-[#D4AF37]' : 'text-neutral-400 group-hover:text-[#D4AF37]'
            }`}>
              {cat.name}
            </h3>
            <span className={`text-[7px] font-bold tracking-[0.2em] mb-1 transition-colors uppercase ${
              isActive ? 'text-neutral-500' : 'text-neutral-600 group-hover:text-neutral-400'
            }`}>
              {cat.description}
            </span>
            <span className={`text-[8px] font-black transition-colors tracking-widest ${
              isActive ? 'text-[#D4AF37]/60' : 'text-neutral-700 group-hover:text-neutral-500'
            }`}>
              {cat.count} ARTIFACTS
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesGrid;