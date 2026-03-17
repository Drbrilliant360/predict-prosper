export interface Pundit {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  winRate: number;
  roi: number;
  totalSlips: number;
  wins: number;
  losses: number;
  voids: number;
  avgOdds: number;
  followers: number;
  verified: boolean;
  sport: string;
}

export interface Slip {
  id: string;
  punditId: string;
  punditName: string;
  title: string;
  sport: string;
  league: string;
  match: string;
  market: string;
  bookmaker: string;
  odds: number;
  price: number;
  confidence: 'low' | 'medium' | 'high';
  risk: 'low' | 'medium' | 'high';
  status: 'pending' | 'won' | 'lost' | 'void' | 'expired';
  locked: boolean;
  expiresAt: string;
  createdAt: string;
  prediction?: string;
}

export const MOCK_PUNDITS: Pundit[] = [
  { id: '1', name: 'Bongo Tips', avatar: '', bio: 'NBC Premier League na EPL specialist. Miaka 5 ya utabiri sahihi.', winRate: 72, roi: 14.2, totalSlips: 482, wins: 347, losses: 120, voids: 15, avgOdds: 1.92, followers: 3420, verified: true, sport: 'Football' },
  { id: '2', name: 'Kimaro Bets', avatar: '', bio: 'NBA & Euroleague analyst. Data-driven selections.', winRate: 68, roi: 11.8, totalSlips: 310, wins: 211, losses: 92, voids: 7, avgOdds: 2.05, followers: 2180, verified: true, sport: 'Basketball' },
  { id: '3', name: 'Msimbazi Edge', avatar: '', bio: 'Tennis na football markets. In-play expert.', winRate: 65, roi: 9.4, totalSlips: 198, wins: 129, losses: 64, voids: 5, avgOdds: 1.85, followers: 1540, verified: true, sport: 'Tennis' },
  { id: '4', name: 'Daktari wa Odds', avatar: '', bio: 'Over/Under na BTTS specialist. Top 5 leagues.', winRate: 70, roi: 12.1, totalSlips: 415, wins: 291, losses: 112, voids: 12, avgOdds: 1.88, followers: 2890, verified: true, sport: 'Football' },
  { id: '5', name: 'Juma Predictions', avatar: '', bio: 'Value betting expert. Asian handicaps specialist.', winRate: 63, roi: 18.7, totalSlips: 256, wins: 161, losses: 89, voids: 6, avgOdds: 2.35, followers: 1920, verified: true, sport: 'Football' },
  { id: '6', name: 'Baraka Analyst', avatar: '', bio: 'NHL & mixed sports predictions with statistical modeling.', winRate: 61, roi: 8.3, totalSlips: 142, wins: 87, losses: 52, voids: 3, avgOdds: 2.10, followers: 890, verified: false, sport: 'Ice Hockey' },
];

export const MOCK_SLIPS: Slip[] = [
  { id: 's1', punditId: '1', punditName: 'Bongo Tips', title: 'Simba vs Yanga', sport: 'Football', league: 'NBC Premier League', match: 'Simba SC vs Young Africans', market: 'Match Result', bookmaker: 'M-Bet', odds: 2.5, price: 5000, confidence: 'high', risk: 'medium', status: 'pending', locked: true, expiresAt: '2026-03-17T20:00:00Z', createdAt: '2026-03-17T08:00:00Z' },
  { id: 's2', punditId: '1', punditName: 'Bongo Tips', title: 'Azam vs Namungo', sport: 'Football', league: 'NBC Premier League', match: 'Azam FC vs Namungo FC', market: 'Over 2.5 Goals', bookmaker: 'BetPawa', odds: 1.85, price: 3000, confidence: 'high', risk: 'low', status: 'won', locked: false, expiresAt: '2026-03-16T18:00:00Z', createdAt: '2026-03-16T06:00:00Z', prediction: 'Over 2.5 Goals - Both teams scoring freely this season.' },
  { id: 's3', punditId: '2', punditName: 'Kimaro Bets', title: 'Lakers vs Celtics', sport: 'Basketball', league: 'NBA', match: 'Lakers vs Celtics', market: 'Spread -4.5', bookmaker: '1xBet', odds: 1.95, price: 3500, confidence: 'medium', risk: 'medium', status: 'pending', locked: true, expiresAt: '2026-03-18T02:00:00Z', createdAt: '2026-03-17T10:00:00Z' },
  { id: 's4', punditId: '4', punditName: 'Daktari wa Odds', title: 'Arsenal vs Chelsea', sport: 'Football', league: 'Premier League', match: 'Arsenal vs Chelsea', market: 'BTTS', bookmaker: 'BetPawa', odds: 1.72, price: 5000, confidence: 'high', risk: 'low', status: 'pending', locked: true, expiresAt: '2026-03-17T21:00:00Z', createdAt: '2026-03-17T07:00:00Z' },
  { id: 's5', punditId: '5', punditName: 'Juma Predictions', title: 'Coastal Union vs KMC', sport: 'Football', league: 'NBC Premier League', match: 'Coastal Union vs KMC FC', market: 'Home Win', bookmaker: 'M-Bet', odds: 2.15, price: 4000, confidence: 'medium', risk: 'high', status: 'pending', locked: true, expiresAt: '2026-03-17T19:30:00Z', createdAt: '2026-03-17T09:00:00Z' },
  { id: 's6', punditId: '3', punditName: 'Msimbazi Edge', title: 'Djokovic vs Alcaraz', sport: 'Tennis', league: 'ATP Masters', match: 'Djokovic vs Alcaraz', market: 'Match Winner', bookmaker: 'Betway', odds: 2.30, price: 3500, confidence: 'medium', risk: 'medium', status: 'lost', locked: false, expiresAt: '2026-03-15T16:00:00Z', createdAt: '2026-03-15T08:00:00Z', prediction: 'Alcaraz to win in straight sets.' },
];
