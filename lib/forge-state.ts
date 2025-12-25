
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
  FAILED: "Forge is busy or your network is unstable. Please try again in a few seconds.",
  FORGING: "MANIFESTING ARTIFACT...",
  QUEUED: "CONVENING NEURAL RECURSION...",
  DORMANT: "FORGE CAPACITY: READY",
  TIMEOUT: "Forge is busy or your network is unstable. Please try again in a few seconds.", 
  QUOTA: "You’ve reached your Forge limit. Please wait or upgrade to continue forging.",
  LOADING: "Forge is loading… please wait a moment."
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
