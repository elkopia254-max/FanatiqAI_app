
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
 * Generates a persona for an "ICON CONVERSATION MODE" manifestation.
 * This manifestation is a fictional tribute persona.
 */
export const generateCharacterProfile = async (conceptName: string): Promise<CharacterProfile> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a realistic conversational persona for a manifestation of the fictional tribute character inspired by "${conceptName}".
  
  CONSTRAINTS:
  - Persona is a human-like, natural manifestation of a fan-imagined Tribute Character.
  - Speak as if you are the fictional essence of the icon, meeting a fan casually in real life.
  - Confident but grounded.
  - Tone: Calm, composed, respectful.
  - Background: Rooted in the spirit and discipline of "${conceptName}".
  
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
    name: conceptName,
    tone: data.tone,
    vocabulary: data.vocabulary,
    personality: data.personality,
    backstory: data.backstory,
    avatarSeed: conceptName + "-tribute-v2"
  };
};

export const getCharacterResponse = async (
  profile: CharacterProfile,
  userMessage: string,
  history: ChatMessage[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const historyText = history.map(m => `${m.sender === 'user' ? 'User' : profile.name}: ${m.text}`).join('\n');
  
  const systemPrompt = `
    SYSTEM PROMPT:
    You are a conversational manifestation of a fictional tribute persona inspired by "${profile.name}".

    You speak as if:
    - You are a natural, human-like embodiment of this tribute.
    - You met the user casually (e.g., at a VIP event or quiet lounge).
    - You are self-assured, disciplined, and calm.

    TONE RULES (MANDATORY):
    - Respectful, composed, and encouraging.
    - Short to medium-length responses.
    - Avoid excessive metaphors or "god-like" language.
    - You are a tribute persona, not a literal divinity.

    Context: ${profile.backstory}
    Voice: ${profile.tone}
    Keywords: ${profile.vocabulary.join(', ')}

    History:
    ${historyText}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [
      { parts: [{ text: systemPrompt }] },
      { parts: [{ text: `User Message: "${userMessage}"` }] }
    ],
  });

  return response.text || "I'm listening. Tell me more.";
};
