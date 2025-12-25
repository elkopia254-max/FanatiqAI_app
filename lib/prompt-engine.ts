
import { SUB_ARCHETYPES, SubArchetypeFlavor } from './style-library';

export { SubArchetypeFlavor };

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

  const namePatterns = [
    /\b[A-Z][a-z]+ [A-Z][a-z]+\b/,
    /\bmessi\b/i, /\bronaldo\b/i, /\bneymar\b/i, /\bjordan\b/i, /\bkobe\b/i,
    /\blebron\b/i, /\bhamilton\b/i, /\btaylor swift\b/i, /\beyoncé\b/i
  ];

  const isRealPerson = namePatterns.some(pattern => pattern.test(prompt));

  return { 
    isValid: true, 
    isRealPerson: isRealPerson,
    reason: isLiteralRequest ? "Platform Guard: Converting literal request to symbolic tribute relic." : undefined
  };
};

const getSymbolicObject = (starInput: string): string => {
  const input = starInput.toLowerCase();
  
  if (input.includes('messi')) {
    return "a fictional levitating orbital sphere of absolute kinetic control, inspired by the spirit of a legendary footballer, crafted from translucent diamond and woven gold filaments";
  }
  if (input.includes('ronaldo')) {
    return "a sharp, monolithic platinum obelisk of unyielding discipline and peak athleticism, representing a fictional fan tribute, with pulsating neon-etched power veins";
  }
  if (input.includes('jordan') || input.includes('kobe') || input.includes('lebron')) {
    return "a transcendent championship vessel and fictional tribute, floating in mid-air, surrounded by a revolving holographic crown of light";
  }
  if (input.includes('hamilton') || input.includes('racing') || input.includes('f1')) {
    return "a high-velocity aerodynamic shard of carbon-fiber obsidian and liquid silver, trailing holographic speed-waves, representing a fictional tribute to speed";
  }
  
  return `a visually stunning, futuristic tribute persona and symbolic artifact representing the fan-imagined essence of ${starInput}, combining high-tech innovation and artistic flair`;
};

export const enhancePrompt = (
  starInput: string, 
  archetypeId: SubArchetypeFlavor, 
  categoryName: string
): string => {
  const archetype = SUB_ARCHETYPES[archetypeId] || SUB_ARCHETYPES.classical;
  const artifactSubject = getSymbolicObject(starInput);
  
  const categoryAesthetics: Record<string, string> = {
    'Digital Art': 'abstract neural shaders, shifting holographic data-fields, digital gold filaments',
    'Fashion': 'couture materials, precision-cut fabric logic, wearable symbolic surfaces',
    'Architecture': 'Sacred geometry, structural marble integrity, hallowed cathedral lighting',
    'Cyberpunk': 'carbon-fiber weave, glowing circuit veins, industrial obsidian',
    'Nature': 'elemental stone, wind-carved forms, organic symmetry integrated into the artifact',
    'Photography': 'lens realism, macro depth-of-field, cinematic volumetric lighting'
  };

  const domainAesthetic = categoryAesthetics[categoryName] || categoryAesthetics['Digital Art'];

  const coreTemplate = `
    FICTIONAL FAN-IMAGINED TRIBUTE PERSONA:
    SUBJECT: ${artifactSubject}.
    DESIGN: Revolutionary, futuristic, blending luxury and digital-age aesthetics for a tribute character.
    FEATURES: Levitating components, floating abstract shapes, dynamic holographic effects, and personalized insignias.
    MATERIALS: Glowing gold, liquid silver, ${archetype.material}, diamond accents, and platinum.
    ATMOSPHERE: Hyper-detailed, cinematic lighting, ultra-realistic textures, awe-inspiring scale.
    COMPOSITION: Centered iconic museum presentation in a dark, premium void.
    STYLE: ${domainAesthetic} combined with ${archetype.label} archetype principles.
  `;

  const strictDoctrine = `
    STRICT DOCTRINE:
    - NO human depictions (faces, hands, skin).
    - NO real-world sports action or photography of actual people.
    - THE OUTPUT MUST BE A SINGLE, EXQUISITE 3D COLLECTIBLE OBJECT REPRESENTING A FICTIONAL PERSONA TRIBUTE.
    - SYMBOLIZE THE IDOL "${starInput}" THROUGH PURE GEOMETRY AND MATERIAL.
  `;

  return `${coreTemplate} ${strictDoctrine}`;
};
