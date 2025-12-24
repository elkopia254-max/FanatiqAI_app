export type ForgeState = 
  | 'DORMANT' 
  | 'CONVENING' 
  | 'SEALED' 
  | 'FORGING' 
  | 'SUSPENDED' 
  | 'COMPLETED' 
  | 'FAILED';

export const FORGE_MESSAGES = {
  SUSPENDED: "The Forge is resting. Current formation capacity has been reached.",
  FAILED: "Formation could not be completed. The Forge will reopen shortly.",
  FORGING: "MANIFESTING ARTIFACT...",
  DORMANT: "FORGE CAPACITY: LIMITED"
};
