
/**
 * Ensures prompts do not attempt to replicate real faces and 
 * prepends luxury granite/gold styling cues.
 */
export const applySafetyFilter = (userPrompt, style) => {
  const blocklist = ['photorealistic face', 'real person', 'celebrity'];
  
  let sanitized = userPrompt.toLowerCase();
  blocklist.forEach(word => {
    sanitized = sanitized.replace(word, 'stylized artifact');
  });

  const stylePrefixes = {
    cyberpunk: "neon noir, high-tech luxury, metallic gold highlights, charcoal granite textures, ",
    fantasy: "ethereal mythic realm, golden luminosity, ornate charcoal etchings, ",
    default: "premium dark aesthetic, gold leaf accents, charcoal depth, "
  };

  const prefix = stylePrefixes[style] || stylePrefixes.default;
  const suffix = ", dramatic lighting, high fidelity, completely fictional character design, no real people";

  return `${prefix}${sanitized}${suffix}`;
};
