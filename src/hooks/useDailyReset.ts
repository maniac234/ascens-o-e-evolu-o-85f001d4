import { useEffect, useCallback } from "react";

const RESET_HOUR = 4; // 4:00 AM
const BRAZIL_OFFSET = -3; // UTC-3

/**
 * Get the current date key in YYYY-MM-DD format based on Brazil timezone
 * Days reset at 4:00 AM Brazil time (UTC-3)
 */
export function getCurrentDateKey(): string {
  const now = new Date();
  
  // Convert to Brazil time (UTC-3)
  const utcHours = now.getUTCHours();
  const brazilHours = (utcHours + 24 + BRAZIL_OFFSET) % 24;
  
  // Create a date object for Brazil time
  const brazilDate = new Date(now);
  brazilDate.setUTCHours(brazilDate.getUTCHours() + BRAZIL_OFFSET);
  
  // If before 4 AM Brazil time, use previous day
  if (brazilHours < RESET_HOUR) {
    brazilDate.setUTCDate(brazilDate.getUTCDate() - 1);
  }
  
  return brazilDate.toISOString().split("T")[0];
}

/**
 * Get milliseconds until next reset (4:00 AM Brazil time)
 */
export function getMillisUntilReset(): number {
  const now = new Date();
  
  // Calculate next reset time in Brazil
  const nextReset = new Date(now);
  nextReset.setUTCHours(RESET_HOUR - BRAZIL_OFFSET, 0, 0, 0);
  
  // If we're past today's reset, schedule for tomorrow
  if (now >= nextReset) {
    nextReset.setUTCDate(nextReset.getUTCDate() + 1);
  }
  
  return nextReset.getTime() - now.getTime();
}

/**
 * Hook that triggers a callback when the daily reset occurs
 */
export function useDailyReset(onReset: () => void) {
  useEffect(() => {
    const scheduleReset = () => {
      const millisUntilReset = getMillisUntilReset();
      
      const timeout = setTimeout(() => {
        onReset();
        // Schedule next reset
        scheduleReset();
      }, millisUntilReset);
      
      return () => clearTimeout(timeout);
    };
    
    return scheduleReset();
  }, [onReset]);
}

/**
 * Check if a given date key is the current day
 */
export function isCurrentDay(dateKey: string): boolean {
  return dateKey === getCurrentDateKey();
}

/**
 * Format date key to readable format
 */
export function formatDateKey(dateKey: string): string {
  const date = new Date(dateKey + "T12:00:00");
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
