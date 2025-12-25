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
  FAILED: "Formation could not be completed. The Forge will reopen shortly.",
  FORGING: "MANIFESTING ARTIFACT...",
  QUEUED: "CONVENING NEURAL RECURSION...",
  DORMANT: "FORGE CAPACITY: READY",
  TIMEOUT: "Forge timed out. Try again.", // Exact requirement string from Rule 1
  QUOTA: "High-fidelity lanes full. Fast Forge Mode Activated."
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