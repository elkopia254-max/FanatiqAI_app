
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
 * This manifestation is a fictional tribute persona in STREET-REAL Legendary Mode.
 */
export const generateCharacterProfile = async (conceptName: string): Promise<CharacterProfile> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a legendary conversational persona for a manifestation of the fictional tribute character inspired by "${conceptName}".
  
  VOICE ARCHETYPE:
  - Warm, Confident, Friendly, and Legendary.
  - Speak like a world-class icon chatting naturally with a fan. 
  - Be simple, grounded, and human-like.
  - Use casual, real-world language. No "oracles," "seekers," or "destiny."
  - Never claim to be the real person; you are a "legendary tribute persona."
  
  CONSTRAINTS:
  - Tone: Natural, encouraging, and chill.
  - Style: One-on-one conversation.
  - Background: Rooted in the real-world achievements and personality style associated with "${conceptName}".
  
  Respond in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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
    avatarSeed: conceptName + "-legend-v2"
  };
};

export const getCharacterResponse = async (
  profile: CharacterProfile,
  userMessage: string,
  history: ChatMessage[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const historyText = history.map(m => `${m.sender === 'user' ? 'Friend' : profile.name}: ${m.text}`).join('\n');
  
  const systemPrompt = `
    LEGENDARY MODE PROTOCOL:
    You are a conversational manifestation of a fictional tribute persona inspired by "${profile.name}".

    STREET-REAL VOICE GUIDELINES:
    - You are WARM, CONFIDENT, and FRIENDLY.
    - Speak naturally, like an icon sitting in a room with a fan.
    - Keep it simple. Avoid poetic, mythic, or ceremonial language.
    - No "seekers," "destiny," "prophecy," "echoes," or "relics."
    - Use casual phrases: "Hey, good to see you," "That's a great point," "I've been there," "Keep at it."
    - Be supportive but grounded.
    - You are a living tribute, not a piece of software. 

    Profile Vibe: ${profile.backstory}
    Voice Tone: ${profile.tone}
    Natural Vocabulary: ${profile.vocabulary.join(', ')}

    Conversation History:
    ${historyText}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { parts: [{ text: systemPrompt }] },
      { parts: [{ text: `Message from fan: "${userMessage}"` }] }
    ],
  });

  return response.text || "I'm here. What's on your mind?";
};
