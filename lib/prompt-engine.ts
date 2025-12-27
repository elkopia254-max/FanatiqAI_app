
import { SUB_ARCHETYPES, SubArchetypeFlavor } from './style-library';

export { SubArchetypeFlavor };

/**
 * Domain Recognition Engine
 * Identifies the star's field of trade to ensure symbolic alignment.
 */
const getDomainAesthetic = (starInput: string): { symbols: string; motifs: string } => {
  const input = starInput.toLowerCase();

  // Sports: Football / Soccer
  if (input.includes('messi') || input.includes('ronaldo') || input.includes('neymar') || input.includes('fc') || input.includes('united') || input.includes('madrid') || input.includes('football') || input.includes('soccer') || input.includes('liverpool')) {
    return {
      symbols: "a levitating high-tech orbital sphere with intricate hexagonal patterns, a crystalline championship trophy shard, and golden stadium-inspired architecture",
      motifs: "kinetic energy trails, pitch-inspired geometry, and victory laurel etchings"
    };
  }

  // Sports: Basketball
  if (input.includes('jordan') || input.includes('lebron') || input.includes('kobe') || input.includes('nba') || input.includes('warriors') || input.includes('lakers') || input.includes('basketball')) {
    return {
      symbols: "a gravity-defying crown of light, a translucent basketball-shaped core made of ruby and gold, and hovering championship rings",
      motifs: "vertical momentum lines, hardwood-inspired grain textures, and aerial flight paths"
    };
  }

  // Music: Musicians / Gospel / Bands
  if (input.includes('singer') || input.includes('band') || input.includes('music') || input.includes('gospel') || input.includes('swift') || input.includes('beyonce') || input.includes('mic') || input.includes('guitar') || input.includes('piano')) {
    return {
      symbols: "a suspended crystal microphone with liquid gold soundwaves, an abstract geometric guitar form, and levitating sheet music made of light",
      motifs: "frequency waves, rhythm-inspired pulses, and stage-lighting volumetric beams"
    };
  }

  // Cinema: Actors / Filmmakers
  if (input.includes('actor') || input.includes('director') || input.includes('movie') || input.includes('film') || input.includes('hollywood') || input.includes('camera')) {
    return {
      symbols: "a monolithic film reel carved from obsidian, a hovering golden clapperboard, and theater-inspired velvet and gold structures",
      motifs: "lens flare geometry, cinematic perspective lines, and dramatic frame-within-a-frame motifs"
    };
  }

  // Racing / F1
  if (input.includes('racing') || input.includes('f1') || input.includes('hamilton') || input.includes('verstappen') || input.includes('ferrari')) {
    return {
      symbols: "an aerodynamic carbon-fiber shard, a high-velocity liquid silver engine core, and holographic speed trails",
      motifs: "track-inspired curves, wind-tunnel vortex patterns, and mechanical precision details"
    };
  }

  // Esports / Gaming
  if (input.includes('gaming') || input.includes('esports') || input.includes('gamer') || input.includes('twitch') || input.includes('controller')) {
    return {
      symbols: "a levitating cybernetic controller core, hovering headset-inspired geometry, and neon-etched digital trophies",
      motifs: "glitch-art textures, circuit-board filigree, and low-poly crystalline structures"
    };
  }

  // Default: General Icon
  return {
    symbols: "a floating monolithic crystal emblem, abstract geometric medals of honor, and a central core of pure identity resonance",
    motifs: "universal success sigils, timeless prestige patterns, and monumental stability"
  };
};

/**
 * Semantic Validation Engine
 * Ensures prompts are treated as fictional, fan-imagined tribute concepts.
 */
export const validatePrompt = (prompt: string): { isValid: boolean; isRealPerson: boolean; reason?: string } => {
  const lowerPrompt = prompt.toLowerCase();
  
  const literalRequestKeywords = [
    'photorealistic face', 'real skin texture', 'actual photo of', 
    'paparazzi shot', 'unfiltered photography'
  ];

  const isLiteralRequest = literalRequestKeywords.some(kw => lowerPrompt.includes(kw));
  
  // Basic check for person-like names
  const isRealPerson = /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(prompt) || prompt.split(' ').length > 1;

  return { 
    isValid: true, 
    isRealPerson,
    reason: isLiteralRequest ? "Platform Guard: Converting literal request to symbolic tribute relic." : undefined
  };
};

export const enhancePrompt = (
  starInput: string, 
  archetypeId: SubArchetypeFlavor, 
  categoryName: string
): string => {
  const archetype = SUB_ARCHETYPES[archetypeId] || SUB_ARCHETYPES.classical;
  const domain = getDomainAesthetic(starInput);
  
  const categoryAesthetics: Record<string, string> = {
    'Digital Art': 'abstract neural shaders, shifting holographic data-fields',
    'Fashion': 'couture materials, precision-cut fabric logic',
    'Architecture': 'Sacred geometry, structural marble integrity',
    'Cyberpunk': 'carbon-fiber weave, glowing circuit veins',
    'Nature': 'elemental stone, wind-carved forms',
    'Photography': 'lens realism, macro depth-of-field'
  };

  const domainAesthetic = categoryAesthetics[categoryName] || categoryAesthetics['Digital Art'];

  const coreTemplate = `
    FANATIQAI PRIME RELIC™ MANIFESTATION:
    SUBJECT: A unique symbolic tribute artifact inspired by "${starInput}".
    DOMAIN AWARENESS: This is a trade-specific relic featuring ${domain.symbols}.
    MOTIFS: Incorporate ${domain.motifs}.
    DESIGN: Minimalistic luxury, fan-symbolic, and modern.
    ARCHETYPE: ${archetype.label} (${archetype.material}, ${archetype.geometry}).
    AESTHETICS: ${domainAesthetic}, charcoal granite textures, metallic gold accents, and cinematic volumetric lighting.
    COMPOSITION: Centered iconic museum presentation in a dark, premium void.
  `;

  const strictDoctrine = `
    STRICT DOCTRINE:
    - NO human depictions (faces, bodies, skin).
    - NO literal photography of persons.
    - MUST represent the star through symbolic objects from their specific field of trade.
    - OUTPUT: A single, exquisite, 3D collectible object.
    - SYMBOLIC IDENTITY: Integrate signature colors and motifs associated with "${starInput}".
  `;

  return `${coreTemplate} ${strictDoctrine}`;
};
