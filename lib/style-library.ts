export interface StyleDefinition {
  id: string;
  label: string;
  keywords: string[];
  palette: string[];
  geometry: string;
  material: string;
  iconType: 'circle' | 'square' | 'triangle' | 'activity';
}

export const SUB_ARCHETYPES: Record<string, StyleDefinition> = {
  classical: {
    id: 'classical',
    label: 'CLASSICAL',
    keywords: ['timeless proportion', 'ivory restraint', 'symmetry', 'calm mastery'],
    palette: ['ivory marble', 'burnished gold', 'pure white light'],
    geometry: 'perfectly symmetrical, sacred geometry',
    material: 'polished ivory marble and inlaid 24k gold',
    iconType: 'circle'
  },
  iron_legacy: {
    id: 'iron_legacy',
    label: 'IRON LEGACY',
    keywords: ['forged metal', 'unyielding weight', 'discipline', 'platinum accents'],
    palette: ['obsidian', 'brushed platinum', 'liquid silver'],
    geometry: 'sharp, monolithic, and grounded',
    material: 'heavy forged obsidian and iridescent platinum',
    iconType: 'square'
  },
  spirit_flow: {
    id: 'spirit_flow',
    label: 'SPIRIT FLOW',
    keywords: ['fluidity', 'resonance', 'transcendence', 'ethereal trails'],
    palette: ['crystalline diamond', 'iridescent glass', 'soft gold'],
    geometry: 'fluid, organic, and levitating',
    material: 'diamond-morphic energy and transparent resins',
    iconType: 'activity'
  },
  solar_zenith: {
    id: 'solar_zenith',
    label: 'SOLAR ZENITH',
    keywords: ['radiance', 'ascension', 'momentum', 'dominance'],
    palette: ['pure gold', 'radiant amber', 'solar white'],
    geometry: 'explosive, radiant, and supreme',
    material: 'liquid light and mirror-polished gold',
    iconType: 'triangle'
  }
};

export type SubArchetypeFlavor = keyof typeof SUB_ARCHETYPES;