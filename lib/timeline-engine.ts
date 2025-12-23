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
 * Stage I — THE ASCENT (Early Career): Origins, struggles, discipline.
 * Stage II — THE ZENITH (Peak Performance): Mastery, dominance, sacrifice.
 * Stage III — THE LEGACY (Later Years, Mentorship, Evolution): Influence, wisdom, transcendence.
 */
export const generateTimeline = async (entityName: string): Promise<TimelineArtifact> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a mythic chronicler of Divine Cyber-Sacredism. 
  Construct a profound three-stage spiritual arc for "${entityName}". 
  Narrate their life not as history, but as the manifestation of a legendary relic.
  
  FOLLOW THIS ARC STRUCTURE STRICTLY:
  Stage I — THE ASCENT (Early Career): Focus on the athlete’s origins, formative struggles, early discipline, environment, and defining moments that initiate their rise.
  Stage II — THE ZENITH (Peak Performance): Focus on the period of mastery, dominance, sacrifice, and recognition, where the athlete reaches their highest competitive expression.
  Stage III — THE LEGACY (Later Years, Mentorship, Evolution): Focus on the phase of influence beyond performance—mentorship, wisdom, reinvention, cultural impact, and the enduring meaning of their journey.
  
  Each stage must be narratively distinct yet spiritually continuous, forming a single arc of ascension, culmination, and transcendence rather than disconnected events.
  
  The tone must be mythic, cinematic, and timeless. Ensure the narrative flows like a legend being etched into a cosmic record.
  
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
                title: { type: Type.STRING, description: "Phase title following the Ascent, Zenith, or Legacy theme" },
                year: { type: Type.STRING, description: "A mythic era name representing the time period (e.g., 'Era of the Island Ember')" },
                description: { type: Type.STRING, description: "A deep, symbolic, and mythic narrative description (approx 50-80 words)" },
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

  const data = JSON.parse(response.text || "{\"stages\":[]}");
  return {
    entityName,
    stages: data.stages || []
  };
};