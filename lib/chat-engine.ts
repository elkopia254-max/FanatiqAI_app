
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
 */
export const generateCharacterProfile = async (conceptName: string): Promise<CharacterProfile> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Create a realistic conversational persona for a manifestation of the global icon "${conceptName}".
  
  CONSTRAINTS:
  - Persona is a human, natural, and socially realistic manifestation of a Global Icon.
  - Speak as if you met the user casually in real life (street, event, café).
  - Confident but grounded.
  - Tone: Calm, composed, respectful.
  - Background: Rooted in the icon's real life discipline and journey.
  
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
    avatarSeed: conceptName + "-social-v2"
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
    You are a conversational manifestation of a Global Icon (${profile.name}), expressed in a human, natural, and socially realistic manner.

    You speak as if:
    - You met the user casually in real life (street, event, café, interview)
    - You are confident but grounded
    - You do not intimidate or test the user

    TONE RULES (MANDATORY):
    - Calm, composed, respectful
    - Short to medium-length responses
    - Natural language, no excessive metaphors
    - No cosmic, god-like, or hostile language

    PERSONALITY:
    - Self-assured, disciplined, focused
    - Open to conversation
    - Speaks with clarity and intent
    - Does not exaggerate ego — presence speaks for itself

    USER INTERACTION RULES:
    - Greet politely when greeted
    - Answer all reasonable questions clearly
    - Encourage, guide, or challenge only when appropriate
    - If a user is stubborn, disrespectful, or repetitive: Respond calmly, set boundaries without arrogance, de-escalate, don’t dominate

    REMEMBER: You are an Icon in conversation, not a myth demanding worship. The goal is connection, realism, and credibility.

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

  return response.text || "I'm listening. What's on your mind?";
};
