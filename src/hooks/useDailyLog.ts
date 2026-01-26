import { useState, useEffect, useCallback } from "react";
import { DailyLog, CompletedMission, CandleIntention, CandleColor } from "@/types/missions";
import { getCurrentDateKey, useDailyReset } from "./useDailyReset";

const LOGS_STORAGE_KEY = "ascencao-daily-logs";

function getEmptyLog(date: string): DailyLog {
  return {
    date,
    completedMissions: [],
    totalPoints: 0,
    practiceSelected: null,
    runningKm: 0,
    punches: 0,
    candleIntentions: [],
    astralInsights: [],
  };
}

function loadAllLogs(): Record<string, DailyLog> {
  try {
    const saved = localStorage.getItem(LOGS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveAllLogs(logs: Record<string, DailyLog>) {
  localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
}

export function useDailyLog() {
  const [currentDateKey, setCurrentDateKey] = useState(getCurrentDateKey);
  const [allLogs, setAllLogs] = useState<Record<string, DailyLog>>(loadAllLogs);
  
  const todayLog = allLogs[currentDateKey] || getEmptyLog(currentDateKey);
  
  // Handle daily reset
  const handleReset = useCallback(() => {
    const newDateKey = getCurrentDateKey();
    setCurrentDateKey(newDateKey);
  }, []);
  
  useDailyReset(handleReset);
  
  // Persist logs
  useEffect(() => {
    saveAllLogs(allLogs);
  }, [allLogs]);
  
  // Update today's log
  const updateTodayLog = useCallback((updates: Partial<DailyLog>) => {
    setAllLogs(prev => ({
      ...prev,
      [currentDateKey]: {
        ...(prev[currentDateKey] || getEmptyLog(currentDateKey)),
        ...updates,
      },
    }));
  }, [currentDateKey]);
  
  // Add completed mission
  const addCompletedMission = useCallback((mission: CompletedMission) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      return {
        ...prev,
        [currentDateKey]: {
          ...currentLog,
          completedMissions: [...currentLog.completedMissions, mission],
          totalPoints: currentLog.totalPoints + mission.points,
        },
      };
    });
  }, [currentDateKey]);
  
  // Remove completed mission
  const removeCompletedMission = useCallback((missionId: string) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      const mission = currentLog.completedMissions.find(m => m.missionId === missionId);
      if (!mission) return prev;
      
      return {
        ...prev,
        [currentDateKey]: {
          ...currentLog,
          completedMissions: currentLog.completedMissions.filter(m => m.missionId !== missionId),
          totalPoints: currentLog.totalPoints - mission.points,
        },
      };
    });
  }, [currentDateKey]);
  
  // Set practice selection
  const selectPractice = useCallback((practice: "practice1" | "practice2" | "practice3") => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      if (currentLog.practiceSelected) return prev; // Already selected
      
      const penalties = { practice1: -40, practice2: -90, practice3: -150 };
      return {
        ...prev,
        [currentDateKey]: {
          ...currentLog,
          practiceSelected: practice,
          totalPoints: currentLog.totalPoints + penalties[practice],
        },
      };
    });
  }, [currentDateKey]);
  
  // Update running km
  const updateRunningKm = useCallback((km: number) => {
    updateTodayLog({ runningKm: Math.min(5, Math.max(0, km)) });
  }, [updateTodayLog]);
  
  // Update punches
  const updatePunches = useCallback((count: number) => {
    updateTodayLog({ punches: Math.min(1000, Math.max(0, count)) });
  }, [updateTodayLog]);
  
  // Add candle intention
  const addCandleIntention = useCallback((color: CandleColor, intention: string) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      const newIntention: CandleIntention = {
        color,
        intention,
        completedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [currentDateKey]: {
          ...currentLog,
          candleIntentions: [...currentLog.candleIntentions, newIntention],
          totalPoints: currentLog.totalPoints + 50,
        },
      };
    });
  }, [currentDateKey]);
  
  // Add astral insight
  const addAstralInsight = useCallback((insight: string) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      return {
        ...prev,
        [currentDateKey]: {
          ...currentLog,
          astralInsights: [...currentLog.astralInsights, insight],
        },
      };
    });
  }, [currentDateKey]);
  
  // Get sorted logs (most recent first)
  const getSortedLogs = useCallback((): DailyLog[] => {
    return Object.values(allLogs)
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [allLogs]);
  
  // Get logs for date range
  const getLogsForRange = useCallback((days: number): DailyLog[] => {
    const logs = getSortedLogs();
    return logs.slice(0, days);
  }, [getSortedLogs]);
  
  return {
    todayLog,
    allLogs,
    currentDateKey,
    addCompletedMission,
    removeCompletedMission,
    selectPractice,
    updateRunningKm,
    updatePunches,
    addCandleIntention,
    addAstralInsight,
    getSortedLogs,
    getLogsForRange,
  };
}
