
import { GoogleGenAI, Type } from "@google/genai";
import { FORGE_MESSAGES } from './forge-state';

/**
 * FanatiqAI Sovereignty Engine
 * DETACHED from Google Studio preview logic.
 * All calls are mediated through this security layer.
 */

export interface EngineResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    status: 'FORGE_UNAVAILABLE' | 'OUT_OF_CREDITS' | 'SERVER_BUSY';
    message: string;
    subMessage: string;
  };
}

const getAI = () => {
  // Always use the hard-configured internal Fanatiq Engine Key
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * The Error Firewall
 * Intercepts technical leaks and converts to FanatiqAI-native branding.
 */
const firewall = (err: any): EngineResponse<any>['error'] => {
  const msg = err?.message?.toLowerCase() || "";
  
  // Tier/Credit/Quota Interception
  if (msg.includes("quota") || msg.includes("exceeded") || msg.includes("billing") || msg.includes("credit")) {
    return {
      status: 'OUT_OF_CREDITS',
      message: 'OUT OF CREDITS',
      subMessage: FORGE_MESSAGES.UPGRADE_PROMPT
    };
  }

  // Permission/Studio/System Interception
  if (msg.includes("permission") || msg.includes("denied") || msg.includes("failed to call") || msg.includes("api key") || msg.includes("project")) {
    return {
      status: 'FORGE_UNAVAILABLE',
      message: 'FORGE UNAVAILABLE',
      subMessage: 'Our servers are currently stabilizing. Please try again shortly — or upgrade to Ascended for priority access.'
    };
  }

  // Generic/Network Interception
  return {
    status: 'SERVER_BUSY',
    message: 'FORGE UNAVAILABLE',
    subMessage: 'Our servers are currently stabilizing. Please try again shortly.'
  };
};

export const fanatiqEngine = {
  /**
   * Forges an iconic relic image
   */
  async forgeRelic(prompt: string, isPro: boolean): Promise<EngineResponse<string[]>> {
    try {
      const ai = getAI();
      const model = isPro ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
      
      const response = await ai.models.generateContent({
        model,
        contents: { parts: [{ text: prompt }] },
        config: { 
          imageConfig: { 
            aspectRatio: "1:1", 
            ...(isPro && { imageSize: "2K" }) 
          } 
        }
      });

      const images: string[] = [];
      response.candidates?.[0]?.content?.parts?.forEach(part => {
        if (part.inlineData) images.push(`data:image/png;base64,${part.inlineData.data}`);
      });

      if (images.length === 0) throw new Error("Null manifestation");

      return { success: true, data: images };
    } catch (err) {
      return { success: false, error: firewall(err) };
    }
  },

  /**
   * Generates career timeline artifacts
   */
  async generateTimeline(prompt: string): Promise<EngineResponse<any>> {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              stages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    year: { type: Type.STRING },
                    description: { type: Type.STRING },
                    iconType: { type: Type.STRING, enum: ["ascent", "zenith", "legacy"] },
                    isVerified: { type: Type.BOOLEAN }
                  },
                  required: ["title", "year", "description", "iconType", "isVerified"]
                }
              }
            },
            required: ["stages"]
          }
        },
        contents: [{ parts: [{ text: prompt }] }],
      });

      const data = JSON.parse(response.text || "{}");
      return { success: true, data: data.stages };
    } catch (err) {
      return { success: false, error: firewall(err) };
    }
  },

  /**
   * Mediates Fan Chat interactions
   */
  async getChatResponse(systemPrompt: string, userMessage: string): Promise<EngineResponse<string>> {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { parts: [{ text: systemPrompt }] },
          { parts: [{ text: userMessage }] }
        ],
      });
      return { success: true, data: response.text || "Connection stable." };
    } catch (err) {
      return { success: false, error: firewall(err) };
    }
  }
};
