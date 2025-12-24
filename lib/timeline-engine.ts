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
 */
export const generateTimeline = async (entityName: string): Promise<TimelineArtifact> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as a mythic chronicler of Divine Cyber-Sacredism. 
  Construct a profound three-stage spiritual arc for "${entityName}". 
  Narrate their life not as history, but as the manifestation of a legendary relic.
  
  STRUCTURE:
  Stage I — THE ASCENT (Early Career)
  Stage II — THE ZENITH (Peak Performance)
  Stage III — THE LEGACY (Wisdom, Mentorship)
  
  Return the stages in strict JSON format.`;

  try {
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
                  title: { type: Type.STRING },
                  year: { type: Type.STRING },
                  description: { type: Type.STRING },
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

    const text = response.text || "{\"stages\":[]}";
    const data = JSON.parse(text);
    return {
      entityName,
      stages: data.stages || []
    };
  } catch (error) {
    // Let the parent Forge Guard handle it
    throw error;
  }
};