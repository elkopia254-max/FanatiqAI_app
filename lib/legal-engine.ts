
/**
 * FanatiqAI Legal & Safety Constants
 */

export const COMPLIANCE_LINKS = {
  DMCA: "https://fanatiq.ai/legal/dmca-policy",
  GDPR: "https://fanatiq.ai/legal/privacy-policy#gdpr",
  LICENSE: "https://fanatiq.ai/legal/fanatiq-license"
};

export const SAFETY_TAGS = {
  IMAGE: "STYLIZED REINTERPRETATION • NOT A REAL PERSON • AI GENERATED ART",
  TEXT: "FICTIONAL NARRATIVE • ROLE-PLAY ONLY • NOT REAL-WORLD GUIDANCE"
};

export const LEGAL_DISCLAIMER = "FanatiqAI utilizes advanced neural networks to create artistic reinterpretations. Output is for entertainment and creative purposes. Real-person likeness is strictly prohibited by our core architecture.";

/**
 * Returns a safety disclaimer block for UI injection
 */
export const getSafetyDisclaimer = (type: 'image' | 'text' = 'image'): string => {
  const tag = type === 'image' ? SAFETY_TAGS.IMAGE : SAFETY_TAGS.TEXT;
  return `${tag} | ${LEGAL_DISCLAIMER}`;
};
