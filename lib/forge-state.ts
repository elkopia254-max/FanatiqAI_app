
export type ForgeState = 
  | 'DORMANT' 
  | 'CONVENING' 
  | 'SEALED' 
  | 'FORGING' 
  | 'QUEUED'
  | 'SUSPENDED' 
  | 'COMPLETED' // Terminal: DONE
  | 'FAILED';    // Terminal: FAIL

export const FORGE_MESSAGES = {
  SUSPENDED: "The Forge is resting. Current formation capacity has been reached.",
  FAILED: "Forge temporarily unavailable. Please try again shortly.",
  FORGING: "FORGING ARTIFACT...",
  QUEUED: "CONVENING NEURAL RECURSION...",
  DORMANT: "FORGE CAPACITY: READY",
  TIMEOUT: "Forge response delayed. Stabilizing local symbolic preview...", 
  QUOTA: "You’ve reached your free forge limit.",
  UPGRADE_PROMPT: "Upgrade to continue creating legendary tributes.",
  LOADING: "Aligning Neural Core...",
  FAST_FORGE: "Fast Forge Mode: Generating Symbolic Persona...",
  QUOTA_EXCEEDED: "Global Quota Busy. Manifesting Lightweight Symbolic Relic.",
  API_LIMIT: "Neural API limits reached. Resynchronize or Upgrade.",
  SERVER_BUSY: "Server cores are heavily loaded. Retrying connection...",
  NETWORK_ERROR: "Neural network synchronization failed. Check your broadcast."
};

export interface ForgeLog {
  timestamp: number;
  reason: 'timeout' | 'quota' | 'api_failure' | 'memory_overflow' | 'doctrine_violation' | 'multiple_resolution' | 'null_response';
  context: string;
}

export const logForgeEvent = (reason: ForgeLog['reason'], context: string) => {
  const log: ForgeLog = { timestamp: Date.now(), reason, context };
  console.warn(`[FORGE_LOG] ${reason.toUpperCase()}: ${context}`, log);
  return log;
};
