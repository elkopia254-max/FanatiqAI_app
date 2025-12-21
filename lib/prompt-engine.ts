
import { SUB_ARCHETYPES, SubArchetypeFlavor } from './style-library';

export { SubArchetypeFlavor };

/**
 * Validates the user input to prevent requests for literal human depictions or stock photography.
 */
export const validatePrompt = (prompt: string): { isValid: boolean; reason?: string } => {
  const forbiddenKeywords = [
    'photo of', 'photorealistic', 'real person', 'face', 'portrait', 'human', 
    'man', 'woman', 'celebrity likeness', 'snapshot', 'google photos', 'instagram',
    'paparazzi', 'action shot', 'sports photo', 'playing', 'running'
  ];
  
  const lowerPrompt = prompt.toLowerCase();
  for (const keyword of forbiddenKeywords) {
    if (lowerPrompt.includes(keyword)) {
      return { 
        isValid: false, 
        reason: `Sacred Block: Term '${keyword}' detected. FanatiqAI only manifests symbolic artifacts, not literal moments or human likeness.` 
      };
    }
  }
  return { isValid: true };
};

/**
 * Translates an idol's spirit into a symbolic artifact type.
 */
const getSymbolicObject = (starInput: string): string => {
  const input = starInput.toLowerCase();
  if (input.includes('messi') || input.includes('football') || input.includes('soccer') || input.includes('ronaldo')) {
    return "a divine golden boot relic, a sacred kinetic sphere of control, or a floating sigil of mastery";
  }
  if (input.includes('kobe') || input.includes('jordan') || input.includes('basketball')) {
    return "a celestial obsidian armor fragment, a radiant energy hoop sigil, or an eternal championship vessel";
  }
  if (input.includes('musician') || input.includes('singer') || input.includes('artist')) {
    return "a resonance engine, a glass-morphic trumpet of truth, or a liquid silver lyre relic";
  }
  if (input.includes('warrior') || input.includes('fighter')) {
    return "a hallowed obsidian blade, a defensive soul-shield, or a forged titanium engine of discipline";
  }
  return "a high-fidelity sacred relic (vessel, engine, weapon, or instrument)";
};

/**
 * Enforces the Divine Cyber-Sacredism Visual Canon.
 * Synthesizes Category, Archetype, and Star Identity into a mythic 3D object.
 */
export const enhancePrompt = (
  starInput: string, 
  archetypeId: SubArchetypeFlavor, 
  categoryName: string
): string => {
  const archetype = SUB_ARCHETYPES[archetypeId] || SUB_ARCHETYPES.classical;
  const artifactType = getSymbolicObject(starInput);
  
  // Mapping categories to AESTHETIC DOMAINS (not subject matter)
  const categoryAesthetics: Record<string, string> = {
    'Digital Art': 'abstract neural shaders, shifting data-fields, crystalline structure, procedurally generated gold',
    'Fashion': 'couture-level material precision, silk-morphic weaving, ornate gold filigree, wearable symbolism',
    'Architecture': 'monolithic scale, Brutalist-Sacred geometry, structural marble integrity, hallowed space logic',
    'Cyberpunk': 'carbon-fiber weave, glowing circuit energy, industrial obsidian, neon-lit divinity',
    'Nature': 'crystalline flora integration, petrified sacred wood, organic fossilized gold, bioluminescent mists',
    'Photography': 'extreme macro depth-of-field, hyper-real lens reflectivity, ray-traced lighting, cinematic film grain'
  };

  const domainAesthetic = categoryAesthetics[categoryName] || categoryAesthetics['Digital Art'];

  const visualCanon = `
    VISUAL CANON: Divine Cyber-Sacredism. 
    SUBJECT: ${artifactType}, inspired by the essence and legacy of ${starInput}.
    RENDER STYLE: Unreal Engine 5 high-fidelity 3D. 8K resolution appearance.
    COMPOSITION: Perfect centered, icon-like presentation. Cinematic macro perspective.
    ENVIRONMENT: A misty, ritualistic forest clearing or hallowed ground with extreme atmospheric depth.
    MATERIALS: Mirror-polished gold, liquid silver, obsidian, glass-morphic textures.
    LIGHTING: Pronounced God-rays, volumetric mists, intense specular highlights, ethereal ritual atmosphere.
  `;

  const archetypeLogic = `
    ARCHETYPE: ${archetype.label}.
    FORM LANGUAGE: ${archetype.geometry}, ${archetype.keywords.join(', ')}.
    AESTHETIC DOMAIN: ${categoryName} (${domainAesthetic}).
    PALETTE: ${archetype.palette.join(', ')}.
  `;

  const strictConstraints = `
    STRICT CONSTRAINTS (NON-NEGOTIABLE):
    - NO human figures, faces, or bodies.
    - NO sports action scenes or literal snapshots.
    - NO Google Photos or stock photography aesthetics.
    - The object must appear as a mythic relic from a higher civilization.
    - SYMBOLISM: The relic represents the philosophy and struggle of ${starInput} without literal likeness.
  `;

  return `${visualCanon} ${archetypeLogic} ${strictConstraints} CONCEPT: ${starInput}.`;
};
