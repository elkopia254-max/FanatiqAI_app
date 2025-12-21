
import { GoogleGenAI, Type } from "@google/genai";

export interface TimelineStage {
  title: string;
  year: string;
  description: string;
  iconType: 'ascent' | 'zenith' | 'legacy';
}

export interface TimelineArtifact {
  entityName: string;
  stages: TimelineStage[];
}

/**
 * Generates a symbolic 3-stage timeline for the specific star/idol.
 * Stage I — THE ASCENT: Origins, formative struggles, early rise.
 * Stage II — THE ZENITH: Mastery, dominance, peak performance.
 * Stage III — THE LEGACY: Mentorship, influence, transcendence.
 */
export const generateTimeline = async (entityName: string): Promise<TimelineArtifact> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a mythic chronicler of Divine Cyber-Sacredism. 
  Construct a profound three-stage spiritual arc for "${entityName}". 
  Narrate their life not as history, but as the manifestation of a legendary relic.
  
  FOLLOW THIS ARC:
  Stage I — THE ASCENT: Focus on "${entityName}"'s origins, their early discipline in a harsh or formative environment, and the spark that initiated their climb.
  Stage II — THE ZENITH: Focus on the period of absolute mastery and dominance where they reached the peak of their expression and sacrificed for greatness.
  Stage III — THE LEGACY: Focus on the wisdom, mentorship, and enduring meaning of their journey that anchors their spirit for future generations.
  
  The tone must be mythic, cinematic, and timeless. Ensure the stages form a single, spiritually continuous arc of transcendence.
  
  Return the stages in JSON format.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          stages: {
            type: Type.ARRAY,
            minItems: 3,
            maxItems: 3,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Phase title (Ascent, Zenith, or Legacy themed)" },
                year: { type: Type.STRING, description: "A mythic era name (e.g. 'The Forging Years', 'Solar Peak', 'Eternal Echo')" },
                description: { type: Type.STRING, description: "A deep, symbolic, and mythic narrative description" },
                iconType: { 
                  type: Type.STRING,
                  enum: ["ascent", "zenith", "legacy"]
                }
              },
              required: ["title", "year", "description", "iconType"]
            }
          }
        },
        required: ["stages"]
      }
    },
    contents: [{ parts: [{ text: prompt }] }],
  });

  const data = JSON.parse(response.text || "{}");
  return {
    entityName,
    stages: data.stages || []
  };
};
