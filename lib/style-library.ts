
export interface StyleDefinition {
  id: string;
  label: string;
  keywords: string[];
  palette: string[];
  geometry: string;
  material: string;
}

export const SUB_ARCHETYPES: Record<string, StyleDefinition> = {
  classical: {
    id: 'classical',
    label: 'CLASSICAL',
    keywords: ['timeless proportion', 'restraint', 'symmetry', 'calm mastery', 'eternal balance'],
    palette: ['ivory marble', 'burnished gold', 'pure white light'],
    geometry: 'perfectly symmetrical, sacred geometry',
    material: 'polished stone and inlaid precious metals'
  },
  iron_legacy: {
    id: 'iron_legacy',
    label: 'IRON LEGACY',
    keywords: ['forged metal', 'unyielding weight', 'discipline', 'endurance'],
    palette: ['obsidian', 'brushed steel', 'liquid silver'],
    geometry: 'sharp, monolithic, and grounded',
    material: 'heavy forged metals and volcanic glass'
  },
  spirit_flow: {
    id: 'spirit_flow',
    label: 'SPIRIT FLOW',
    keywords: ['fluidity', 'resonance', 'transcendence', 'ethereal trails'],
    palette: ['copper', 'iridescent glass', 'soft gold'],
    geometry: 'fluid, organic, and ascendant',
    material: 'silk-morphic energy and transparent resins'
  },
  solar_zenith: {
    id: 'solar_zenith',
    label: 'SOLAR ZENITH',
    keywords: ['radiance', 'ascension', 'momentum', 'dominance'],
    palette: ['pure gold', 'radiant amber', 'solar white'],
    geometry: 'explosive, radiant, and supreme',
    material: 'liquid light and mirror-polished gold'
  }
};

export type SubArchetypeFlavor = keyof typeof SUB_ARCHETYPES;
