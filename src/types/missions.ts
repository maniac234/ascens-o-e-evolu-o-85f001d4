// Mission types and categories
export type Category = 
  | "physical" 
  | "energetic" 
  | "emotional" 
  | "mental" 
  | "spiritual" 
  | "intraphysical"
  | "practices"
  | "candles"
  | "astral";

export interface Mission {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  category: Category;
  type?: "standard" | "practice" | "ritual" | "progress" | "text-entry";
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  completedMissions: CompletedMission[];
  totalPoints: number;
  practiceSelected?: "practice1" | "practice2" | "practice3" | null;
  runningKm: number;
  punches: number;
  candleIntentions: CandleIntention[];
  astralInsights: string[];
}

export interface CompletedMission {
  missionId: string;
  title: string;
  points: number;
  category: Category;
  completedAt: string; // ISO timestamp
}

export interface CandleIntention {
  color: CandleColor;
  intention: string;
  completedAt: string;
}

export type CandleColor = 
  | "lilac" 
  | "blue" 
  | "green" 
  | "gold" 
  | "orange" 
  | "red" 
  | "white";

export interface CategoryInfo {
  id: Category;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Candle ritual info
export const CANDLE_RITUALS: { color: CandleColor; name: string; colorClass: string }[] = [
  { color: "lilac", name: "Vela Lilás", colorClass: "bg-purple-400" },
  { color: "blue", name: "Vela Azul", colorClass: "bg-blue-500" },
  { color: "green", name: "Vela Verde", colorClass: "bg-green-500" },
  { color: "gold", name: "Vela Dourada", colorClass: "bg-yellow-500" },
  { color: "orange", name: "Vela Laranja", colorClass: "bg-orange-500" },
  { color: "red", name: "Vela Vermelha", colorClass: "bg-red-500" },
  { color: "white", name: "Vela Branca", colorClass: "bg-gray-100" },
];

// Practice penalties
export const PRACTICE_PENALTIES = {
  practice1: -40,
  practice2: -90,
  practice3: -150,
} as const;
