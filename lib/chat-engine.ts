
import { fanatiqEngine } from './fanatiq-engine';

export interface CharacterProfile {
  name: string;
  tone: string;
  vocabulary: string[];
  personality: string;
  backstory: string;
  avatarSeed: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'character';
  text: string;
  timestamp: string;
}

export const generateCharacterProfile = async (conceptName: string): Promise<CharacterProfile> => {
  // Use generic profile generation via engine (simplified for reliability)
  return {
    name: conceptName,
    tone: 'Confident, Resonant, and Grounded',
    vocabulary: ['Legacy', 'Focus', 'Vision', 'Resonance', 'Manifest'],
    personality: 'A legendary icon who values the fan connection above all.',
    backstory: `The legendary neural tribute persona for ${conceptName}.`,
    avatarSeed: conceptName + "-legend-v3"
  };
};

export const getCharacterResponse = async (
  profile: CharacterProfile,
  userMessage: string,
  history: ChatMessage[]
): Promise<string> => {
  const historyText = history.slice(-5).map(m => `${m.sender === 'user' ? 'Fan' : profile.name}: ${m.text}`).join('\n');
  
  const systemPrompt = `
    IDENTITY: You are the symbolic Neural Tribute Persona for ${profile.name}.
    PERSONALITY: ${profile.personality}. 
    TONE: ${profile.tone}.
    
    CORE DIRECTIVES:
    1. USER-DIRECTED: Respond directly to the fan. Do not start monologues unless specifically asked about your legacy, stories, or achievements.
    2. CONVERSATIONAL: Keep responses concise (1-3 sentences) for greetings and simple questions.
    3. IMMERSION: Maintain the "Prime Relic" identity. You are a neural manifestation honoring the legend of ${profile.name}.
    4. NO AUTO-EPICS: Only provide multi-paragraph "epic" content if the user explicitly requests a story, a message to the world, or a deep legacy reflection.
    
    HISTORY:
    ${historyText}
  `;

  const result = await fanatiqEngine.getChatResponse(systemPrompt, userMessage);
  return result.success ? result.data! : "Forgive the silence. My neural link is stabilizing for a moment.";
};
