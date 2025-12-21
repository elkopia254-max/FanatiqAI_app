
import { SUB_ARCHETYPES, SubArchetypeFlavor } from './style-library';

export { SubArchetypeFlavor };

/**
 * Artifact-First Doctrine Validation
 * Strictly prevents requests for literal human depictions, sports action, or real-world photography.
 */
export const validatePrompt = (prompt: string): { isValid: boolean; reason?: string } => {
  const forbiddenKeywords = [
    'photo of', 'photorealistic', 'real person', 'face', 'portrait', 'human', 
    'man', 'woman', 'celebrity likeness', 'snapshot', 'google photos', 'instagram',
    'paparazzi', 'action shot', 'sports photo', 'playing', 'running', 'selfie', 'crowd',
    'hands', 'body', 'silhouette', 'athlete', 'person', 'people', 'eyes', 'skin',
    'stadium', 'pitch', 'field', 'landscape', 'outdoor scene', 'fire', 'sparks', 'candle'
  ];
  
  const lowerPrompt = prompt.toLowerCase();
  for (const keyword of forbiddenKeywords) {
    if (lowerPrompt.includes(keyword)) {
      return { 
        isValid: false, 
        reason: `Doctrine Violation: Term '${keyword}' detected. FanatiqAI exclusively manifests symbolic artifacts (relics, mechanisms, sigils), never literal humans or scenes.` 
      };
    }
  }
  return { isValid: true };
};

/**
 * STAR / IDOL SYMBOL TRANSLATOR
 * Maps a star's essence to a mandatory mythic artifact.
 * Translates identity into Symbolism, Geometry, and Material choice.
 */
const getSymbolicObject = (starInput: string): string => {
  const input = starInput.toLowerCase();
  
  // Specific Legend Translations
  if (input.includes('messi')) {
    return "a sacred kinetic sphere of absolute control and inevitable balance, a divine pearl-like artifact";
  }
  if (input.includes('ronaldo')) {
    return "a forged titanium engine of absolute discipline, a sharp monolithic legacy sigil of relentless energy";
  }
  if (input.includes('jordan') || input.includes('kobe') || input.includes('lebron') || input.includes('basketball')) {
    return "a radiant energy hoop sigil or an eternal championship vessel made of obsidian and gold";
  }
  if (input.includes('football') || input.includes('soccer')) {
    return "a divine orbital sphere relic representing the pitch and ball as a sacred mechanism";
  }
  if (input.includes('singer') || input.includes('artist') || input.includes('musician')) {
    return "a resonance engine core or a glass-morphic lyre mechanism encoding harmonic truth";
  }
  
  // Default symbolic conversion
  return `a sacred 3D artifact (relic, sigil, vessel, or mechanism) manifesting the spirit of ${starInput}`;
};

/**
 * ARTIFACT-FIRST DOCTRINE PROMPT ENGINE
 * Synthesizes Idol Essence (Subject), Archetype (Soul), and Category (Rendering Style).
 */
export const enhancePrompt = (
  starInput: string, 
  archetypeId: SubArchetypeFlavor, 
  categoryName: string
): string => {
  const archetype = SUB_ARCHETYPES[archetypeId] || SUB_ARCHETYPES.classical;
  const artifactSubject = getSymbolicObject(starInput);
  
  // CATEGORY: Defines ONLY material, lighting, environment, and rendering style.
  const categoryAesthetics: Record<string, string> = {
    'Digital Art': 'abstract neural shaders, shifting holographic data-fields, crystalline structure logic, digital gold filaments',
    'Fashion': 'couture materials, elegance, precision, wearable logic, high-fashion symbolic surfaces',
    'Architecture': 'monolithic scale, Brutalist-Sacred geometry, structural marble integrity, hallowed cathedral lighting',
    'Cyberpunk': 'carbon-fiber weave, glowing circuit energy veins, industrial obsidian, neon-etched divine circuits',
    'Nature': 'stone, wind-carved forms, organic symmetry, elemental calm, organic materials integrated into the artifact',
    'Photography': 'lens realism, extreme macro depth-of-field, cinematic lighting, ray-traced specular highlights'
  };

  const domainAesthetic = categoryAesthetics[categoryName] || categoryAesthetics['Digital Art'];

  const renderingCanon = `
    MANDATORY RENDERING CANON: 
    SUBJECT LOCK: One single, centered sacred artifact object (${artifactSubject}).
    AESTHETIC: Divine Cyber-Sacredism.
    QUALITY: Unreal Engine 5 quality 3D render, 8K appearance, extreme fidelity.
    COMPOSITION: Centered icon-like museum-relic presentation.
    BACKGROUND: Dark, void-like background with subtle atmospheric ritual mist.
    LIGHTING: Volumetric lighting, soft God-rays, pronounced specular highlights.
    MATERIALS: Gold, liquid silver, obsidian, stone, glass-morphic textures, ${archetype.material}.
  `;

  const archetypeSoul = `
    SUB-ARCHETYPE: ${archetype.label} (${archetype.geometry}).
    ATTRIBUTES: ${archetype.keywords.join(', ')}.
    CATEGORY TREATMENT: ${categoryName} (${domainAesthetic}).
    PALETTE: ${archetype.palette.join(', ')}.
  `;

  const strictDoctrine = `
    ABSOLUTE RULES (NON-NEGOTIABLE):
    - THE OUTPUT MUST BE A SINGLE SACRED ARTIFACT OBJECT.
    - NO human hands, faces, bodies, silhouettes, or athletes.
    - NO action, motion, sports, or real-world scenes.
    - NO fire, sparks, or literal landscapes as the subject.
    - NO photography of reality; lens-realism applies ONLY to the artifact.
    - INTERNAL VALIDATION: Before outputting, you MUST ask: "Is this a sacred artifact that could exist in a mythic vault?" 
    - THE ANSWER MUST BE YES. IF NO, REGENERATE.
    - THE ARTIFACT MUST SYMBOLIZE ${starInput} WITHOUT DEPICTING A PERSON.
  `;

  return `${renderingCanon} ${archetypeSoul} ${strictDoctrine} SYMBOLIC MANIFESTATION: ${starInput}.`;
};
