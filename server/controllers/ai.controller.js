
import { GoogleGenAI } from "@google/genai";
import { applySafetyFilter } from '../utils/safetyFilter.js';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (req, res, next) => {
  try {
    const { prompt, style } = req.body;
    const tier = req.user.tier; // 'free' or 'pro'

    const filteredPrompt = applySafetyFilter(prompt, style);
    
    // Pro gets higher resolution or more steps if using Imagen
    const model = 'gemini-2.5-flash-image';
    
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ text: filteredPrompt }] },
    });

    // Save generation to DB
    // await Generation.create({ userId: req.user.id, prompt, result: response.text });

    res.status(200).json({ 
      success: true, 
      data: response.candidates[0].content.parts,
      metadata: { tier, style }
    });
  } catch (error) {
    next(error);
  }
};

export const generateTimeline = async (req, res, next) => {
  // Logic for timeline artifact generation
  res.status(200).json({ message: "Timeline Artifact Forged" });
};

export const chatWithCharacter = async (req, res, next) => {
  // Logic for dramatic fictional chat
  res.status(200).json({ message: "Neural Link Established" });
};
