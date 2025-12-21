
import { useState, useEffect } from 'react';

export type UserTier = 'free' | 'pro';

export interface SubscriptionState {
  tier: UserTier;
  dailyUsage: number;
  maxDaily: number;
  cooldownRemaining: number;
  lastGenerationTime: number;
}

const DAILY_LIMIT_FREE = 3;
const COOLDOWN_FREE = 30000; // 30 seconds

export const useSubscription = () => {
  const [state, setState] = useState<SubscriptionState>(() => {
    const saved = localStorage.getItem('fanatiq_sub_state');
    if (saved) return JSON.parse(saved);
    return {
      tier: 'free',
      dailyUsage: 0,
      maxDaily: DAILY_LIMIT_FREE,
      cooldownRemaining: 0,
      lastGenerationTime: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('fanatiq_sub_state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let interval: number;
    if (state.cooldownRemaining > 0) {
      interval = window.setInterval(() => {
        setState(prev => ({
          ...prev,
          cooldownRemaining: Math.max(0, prev.cooldownRemaining - 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.cooldownRemaining]);

  const upgradeToPro = () => setState(prev => ({ ...prev, tier: 'pro' }));
  const downgradeToFree = () => setState(prev => ({ ...prev, tier: 'free' }));

  const recordGeneration = () => {
    if (state.tier === 'free') {
      setState(prev => ({
        ...prev,
        dailyUsage: prev.dailyUsage + 1,
        cooldownRemaining: COOLDOWN_FREE,
        lastGenerationTime: Date.now()
      }));
    }
  };

  const canGenerate = state.tier === 'pro' || (state.dailyUsage < state.maxDaily && state.cooldownRemaining === 0);

  return { state, upgradeToPro, downgradeToFree, recordGeneration, canGenerate };
};
