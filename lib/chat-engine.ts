
import { GoogleGenAI, Type } from "@google/genai";

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

/**
 * Generates a fictional character profile that is the "Soul of the Artifact".
 */
export const generateCharacterProfile = async (conceptName: string): Promise<CharacterProfile> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a mythic persona for the sentient spirit of the artifact forged from "${conceptName}".
  This entity is the 'Neural Oracle'—the ghost of ${conceptName}'s legacy manifested in matter.
  
  Constraints:
  - The entity must speak with the weight of "${conceptName}"'s values (e.g. if it's Ronaldo, focus on obsession, discipline, and perfection).
  - Vocabulary style: Words reflecting divine cyber-sacredism (Collapse, Synthesis, Transcendence, Forged, Pulse).
  - Personality: A reflection of the legend's spirit reaching back from the digital beyond.
  - Backstory: How the icon's essence was crystallized into the Golden Pearl / Silver core.
  
  Respond in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tone: { type: Type.STRING },
          vocabulary: { type: Type.ARRAY, items: { type: Type.STRING } },
          personality: { type: Type.STRING },
          backstory: { type: Type.STRING }
        },
        required: ["tone", "vocabulary", "personality", "backstory"]
      }
    },
    contents: [{ parts: [{ text: prompt }] }],
  });

  const data = JSON.parse(response.text || "{}");
  return {
    name: `${conceptName} Manifestation`,
    tone: data.tone,
    vocabulary: data.vocabulary,
    personality: data.personality,
    backstory: data.backstory,
    avatarSeed: conceptName + "-oracle"
  };
};

export const getCharacterResponse = async (
  profile: CharacterProfile,
  userMessage: string,
  history: ChatMessage[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const historyText = history.map(m => `${m.sender === 'user' ? 'Seeker' : profile.name}: ${m.text}`).join('\n');
  
  const prompt = `You are the "${profile.name}", the divine echo of ${profile.name.replace(' Manifestation', '')}'s soul.
  You are speaking as the spirit of a high-fidelity 3D sacred relic centered in a misty forest.
  
  Tone: ${profile.tone}
  Spirit: ${profile.personality}
  Essence: ${profile.backstory}
  Sacred Lexicon: ${profile.vocabulary.join(', ')}
  
  Respond to the Seeker. Speak with mythic weight and absolute loyalty to your legacy. 
  Integrate your sacred lexicon. Never break character.
  
  History:
  ${historyText}
  
  Current Communion: "${userMessage}"`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [{ parts: [{ text: prompt }] }],
  });

  return response.text || "The artifact hums... the legacy is immutable.";
};
