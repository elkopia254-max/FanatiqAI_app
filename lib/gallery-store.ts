
export interface Artifact {
  id: string;
  image: string;
  starName: string;
  author: string;
  type: 'trending' | 'community';
  likes: number;
  views: number;
  chatMessages: number;
  forges: number;
  shares: number;
  isPro: boolean;
  timestamp: number;
  serial: string;
  style: string;
}

const STORAGE_KEY = 'fanatiq_legacy_vault';

/**
 * Power Score Calculation Engine
 * Power Score = (Views × 1) + (Chat Messages × 2) + (Forges × 5) + (Shares × 8) + (Likes × 10)
 * finalPower = baseScore * (artifact.isPro ? 1.5 : 1)
 */
export const calculatePowerScore = (artifact: Artifact): number => {
  const baseScore = (
    (artifact.views * 1) +
    (artifact.chatMessages * 2) +
    (artifact.forges * 5) +
    (artifact.shares * 8) +
    (artifact.likes * 10)
  );
  
  return Math.floor(baseScore * (artifact.isPro ? 1.5 : 1));
};

export const galleryStore = {
  saveArtifact: (image: string, starName: string, style: string, isPro: boolean = false): Artifact => {
    const existing = galleryStore.getAll();
    
    const newArtifact: Artifact = {
      id: Math.random().toString(36).substring(2, 15),
      image,
      starName: starName || 'UNKNOWN LEGEND',
      author: `@fanatiq_${Math.floor(Math.random() * 999)}`,
      type: Math.random() > 0.7 ? 'trending' : 'community',
      likes: Math.floor(Math.random() * 20) + 5,
      views: Math.floor(Math.random() * 200) + 50,
      chatMessages: Math.floor(Math.random() * 5),
      forges: 1, 
      shares: 0,
      isPro,
      timestamp: Date.now(),
      serial: `FNQ-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      style
    };

    const updated = [newArtifact, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newArtifact;
  },

  getAll: (): Artifact[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const artifacts: Artifact[] = JSON.parse(data);
    // Ensure Newest First (createdAt DESC)
    return artifacts.sort((a, b) => b.timestamp - a.timestamp);
  },

  getByType: (type: 'trending' | 'community'): Artifact[] => {
    return galleryStore.getAll().filter(a => a.type === type);
  },

  incrementMetric: (id: string, metric: 'likes' | 'views' | 'chatMessages' | 'forges' | 'shares'): void => {
    const all = galleryStore.getAll();
    const index = all.findIndex(a => a.id === id);
    if (index !== -1) {
      all[index][metric] += 1;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    }
  }
};
