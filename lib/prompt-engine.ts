import { SUB_ARCHETYPES, SubArchetypeFlavor } from './style-library';

export { SubArchetypeFlavor };

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

const getSymbolicObject = (starInput: string): string => {
  const input = starInput.toLowerCase();
  
  if (input.includes('messi')) {
    return "a levitating orbital sphere of absolute kinetic control, crafted from translucent diamond and woven gold filaments";
  }
  if (input.includes('ronaldo')) {
    return "a sharp, monolithic platinum obelisk of unyielding discipline, with pulsating neon-etched power veins";
  }
  if (input.includes('jordan') || input.includes('kobe') || input.includes('lebron')) {
    return "a transcendent championship vessel, floating in mid-air, surrounded by a revolving holographic crown of light";
  }
  if (input.includes('hamilton') || input.includes('racing') || input.includes('f1')) {
    return "a high-velocity aerodynamic shard of carbon-fiber obsidian and liquid silver, trailing holographic speed-waves";
  }
  
  return `a visually stunning, futuristic trophy artifact representing the essence of ${starInput}, combining high-tech innovation and artistic flair`;
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
    THE REVOLUTIONARY ARTIFACT:
    SUBJECT: ${artifactSubject}.
    DESIGN: Revolutionary, futuristic, blending luxury and digital-age aesthetics.
    FEATURES: Levitating components, floating abstract shapes, dynamic holographic effects, and personalized insignias.
    MATERIALS: Glowing gold, liquid silver, ${archetype.material}, diamond accents, and platinum.
    ATMOSPHERE: Hyper-detailed, cinematic lighting, ultra-realistic textures, awe-inspiring scale.
    COMPOSITION: Centered iconic museum presentation in a dark, premium void.
    STYLE: ${domainAesthetic} combined with ${archetype.label} archetype principles.
  `;

  const strictDoctrine = `
    STRICT DOCTRINE:
    - NO human depictions (faces, hands, skin).
    - NO real-world sports action or photography of people.
    - THE OUTPUT MUST BE A SINGLE, EXQUISITE 3D COLLECTIBLE OBJECT.
    - SYMBOLIZE THE IDOL "${starInput}" THROUGH PURE GEOMETRY AND MATERIAL.
  `;

  return `${coreTemplate} ${strictDoctrine}`;
};