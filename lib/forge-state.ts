
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
  SUSPENDED: "THE FORGE IS RESTING. CAPACITY REACHED.",
  FAILED: "FORGE UNAVAILABLE. OUR SERVERS ARE CURRENTLY STABILIZING.",
  STABILIZING_SUB: "PLEASE TRY AGAIN SHORTLY — OR ASCEND FOR PRIORITY ACCESS.",
  FORGING: "FORGING ARTIFACT...",
  QUEUED: "CONVENING NEURAL RECURSION...",
  DORMANT: "FORGE CAPACITY: READY",
  TIMEOUT: "FORGE DISCORDANCE. CONNECTION STABILIZING...", 
  QUOTA: "OUT OF CREDITS",
  UPGRADE_PROMPT: "You’ve used all free daily forges. Upgrade to Ascended to unlock unlimited relic creation, rare styles, zero latency, and private vault access.",
  LOADING: "ALIGNING NEURAL CORE...",
  FAST_FORGE: "FAST FORGE MODE: GENERATING SYMBOLIC PERSONA...",
  QUOTA_EXCEEDED: "OUT OF CREDITS",
  API_LIMIT: "OUT OF CREDITS",
  SERVER_BUSY: "FORGE OVERLOAD. STABILIZING NEURAL CORES...",
  NETWORK_ERROR: "SYNC FAILURE. SERVER RE-STABILIZING."
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
