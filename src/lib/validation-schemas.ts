import { z } from 'zod';
import type { DailyLog, Mission, CompletedMission, CandleIntention, AstralBodyInsight, Category } from '@/types/missions';

// Category enum schema
const CategorySchema = z.enum([
  "physical",
  "energetic",
  "astralBody",
  "mental",
  "spiritual",
  "intraphysical",
  "practices",
  "candles",
  "astral"
]);

// Candle color schema
const CandleColorSchema = z.enum([
  "lilac",
  "blue",
  "green",
  "gold",
  "orange",
  "red",
  "white"
]);

// Completed mission schema
const CompletedMissionSchema = z.object({
  missionId: z.string(),
  title: z.string(),
  points: z.number(),
  category: CategorySchema,
  completedAt: z.string(),
});

// Candle intention schema
const CandleIntentionSchema = z.object({
  id: z.string().optional(),
  color: CandleColorSchema,
  intention: z.string(),
  completedAt: z.string(),
});

// Astral body insight schema
const AstralBodyInsightSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Daily log schema
const DailyLogSchema = z.object({
  date: z.string(),
  completedMissions: z.array(CompletedMissionSchema),
  totalPoints: z.number(),
  practiceSelected: z.enum(['practice1', 'practice2', 'practice3']).nullable().optional(),
  runningKm: z.number(),
  punches: z.number(),
  clonaDrops: z.number(),
  candleIntentions: z.array(CandleIntentionSchema),
  astralInsights: z.array(z.string()),
  astralBodyInsights: z.array(AstralBodyInsightSchema).optional().default([]),
});

// Mission schema
const MissionSchema = z.object({
  id: z.string(),
  title: z.string(),
  points: z.number(),
  completed: z.boolean(),
  category: CategorySchema,
  type: z.enum(["standard", "practice", "ritual", "progress", "text-entry"]).optional(),
});

// Monthly stats schema
const MonthlyStatsSchema = z.object({
  month: z.string(),
  totalKm: z.number(),
  totalPunches: z.number(),
  totalClona: z.number(),
});

/**
 * Validates and parses daily logs from localStorage
 * Returns only valid logs, discarding any corrupted entries
 */
export function validateDailyLogs(data: unknown): Record<string, DailyLog> {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const validated: Record<string, DailyLog> = {};
  
  for (const [key, value] of Object.entries(data)) {
    const result = DailyLogSchema.safeParse(value);
    if (result.success) {
      validated[key] = result.data as DailyLog;
    }
  }
  
  return validated;
}

/**
 * Validates and parses monthly history from localStorage
 * Returns only valid entries, discarding any corrupted ones
 */
export function validateMonthlyHistory(data: unknown): Array<{ month: string; totalKm: number; totalPunches: number; totalClona: number }> {
  if (!Array.isArray(data)) {
    return [];
  }

  const validated: Array<{ month: string; totalKm: number; totalPunches: number; totalClona: number }> = [];
  
  for (const item of data) {
    const result = MonthlyStatsSchema.safeParse(item);
    if (result.success) {
      validated.push({
        month: result.data.month,
        totalKm: result.data.totalKm,
        totalPunches: result.data.totalPunches,
        totalClona: result.data.totalClona,
      });
    }
  }
  
  return validated;
}

/**
 * Validates lifetime points from localStorage
 * Returns 0 if invalid
 */
export function validateLifetimePoints(data: unknown): number {
  const result = z.number().safeParse(data);
  return result.success ? result.data : 0;
}

/**
 * Validates and parses missions from localStorage
 * Returns only valid missions, discarding any corrupted entries
 */
export function validateMissions(data: unknown): Mission[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter((item) => {
    const result = MissionSchema.safeParse(item);
    return result.success;
  }).map((item) => MissionSchema.parse(item) as Mission);
}

/**
 * Validates and parses custom tasks from localStorage
 * Returns only valid tasks, discarding any corrupted entries
 */
export function validateCustomTasks(data: unknown): Mission[] {
  return validateMissions(data);
}

export {
  DailyLogSchema,
  MissionSchema,
  MonthlyStatsSchema,
  CompletedMissionSchema,
  CandleIntentionSchema,
  AstralBodyInsightSchema,
  CategorySchema,
  CandleColorSchema,
};
