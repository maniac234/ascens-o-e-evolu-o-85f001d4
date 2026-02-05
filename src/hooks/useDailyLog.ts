import { useState, useEffect, useCallback } from "react";
import { DailyLog, CompletedMission, CandleIntention, CandleColor, AstralBodyInsight } from "@/types/missions";
import { getCurrentDateKey, useDailyReset } from "./useDailyReset";

const LOGS_STORAGE_KEY = "ascencao-daily-logs";
const MONTHLY_HISTORY_KEY = "ascencao-monthly-history";
 const LIFETIME_POINTS_KEY = "ascencao-lifetime-points";

export interface MonthlyStats {
  month: string; // YYYY-MM
  totalKm: number;
  totalPunches: number;
  totalClona: number;
}

function getEmptyLog(date: string): DailyLog {
  return {
    date,
    completedMissions: [],
    totalPoints: 0,
    practiceSelected: null,
    runningKm: 0,
    punches: 0,
    clonaDrops: 0,
    candleIntentions: [],
    astralInsights: [],
    astralBodyInsights: [],
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

function loadMonthlyHistory(): MonthlyStats[] {
  try {
    const saved = localStorage.getItem(MONTHLY_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

 function loadLifetimePoints(): number {
   try {
     const saved = localStorage.getItem(LIFETIME_POINTS_KEY);
     return saved ? JSON.parse(saved) : 0;
   } catch {
     return 0;
   }
 }
 
 function saveLifetimePoints(points: number) {
   localStorage.setItem(LIFETIME_POINTS_KEY, JSON.stringify(points));
 }
 
function saveMonthlyHistory(history: MonthlyStats[]) {
  localStorage.setItem(MONTHLY_HISTORY_KEY, JSON.stringify(history));
}

export function useDailyLog() {
  const [currentDateKey, setCurrentDateKey] = useState(getCurrentDateKey);
  const [allLogs, setAllLogs] = useState<Record<string, DailyLog>>(loadAllLogs);
  const [monthlyHistory, setMonthlyHistory] = useState<MonthlyStats[]>(loadMonthlyHistory);
   const [lifetimePoints, setLifetimePoints] = useState<number>(loadLifetimePoints);
  
  const todayLog = allLogs[currentDateKey] || getEmptyLog(currentDateKey);
  
  // Check and archive previous month if needed
  useEffect(() => {
    const currentMonth = currentDateKey.slice(0, 7); // YYYY-MM
    const lastArchivedMonth = monthlyHistory[0]?.month;
    
    // Get all unique months from logs
    const logMonths = [...new Set(Object.keys(allLogs).map(date => date.slice(0, 7)))];
    
    // Find months that should be archived (not current month, not already archived)
    logMonths.forEach(month => {
      if (month !== currentMonth && !monthlyHistory.some(h => h.month === month)) {
        // Calculate stats for this month
        const monthLogs = Object.values(allLogs).filter(log => log.date.startsWith(month));
        if (monthLogs.length > 0) {
          const stats: MonthlyStats = {
            month,
            totalKm: monthLogs.reduce((sum, log) => sum + (log.runningKm || 0), 0),
            totalPunches: monthLogs.reduce((sum, log) => sum + (log.punches || 0), 0),
            totalClona: monthLogs.reduce((sum, log) => sum + (log.clonaDrops || 0), 0),
          };
          
          setMonthlyHistory(prev => {
            const updated = [stats, ...prev].sort((a, b) => b.month.localeCompare(a.month));
            saveMonthlyHistory(updated);
            return updated;
          });
        }
      }
    });
  }, [currentDateKey, allLogs, monthlyHistory]);
  
  // Handle daily reset
  const handleReset = useCallback(() => {
    const newDateKey = getCurrentDateKey();
    setCurrentDateKey(newDateKey);
  }, []);
  
  // Persist logs
  useEffect(() => {
    saveAllLogs(allLogs);
  }, [allLogs]);
   
   // Persist lifetime points
   useEffect(() => {
     saveLifetimePoints(lifetimePoints);
   }, [lifetimePoints]);
  
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
     // Add to lifetime points
     setLifetimePoints(prev => prev + mission.points);
  }, [currentDateKey]);
  
  // Remove completed mission
  const removeCompletedMission = useCallback((missionId: string) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      const mission = currentLog.completedMissions.find(m => m.missionId === missionId);
      if (!mission) return prev;
      
       // Remove from lifetime points (only allowed on same day)
       setLifetimePoints(prevPoints => prevPoints - mission.points);
       
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
       // Add penalty to lifetime points
       setLifetimePoints(prevPoints => prevPoints + penalties[practice]);
       
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
  
  // Update clona drops
  const updateClonaDrops = useCallback((count: number) => {
    updateTodayLog({ clonaDrops: Math.min(50, Math.max(0, count)) });
  }, [updateTodayLog]);
  
  // Add candle intention
  const addCandleIntention = useCallback((color: CandleColor, intention: string) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      const newIntention: CandleIntention = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
  
  // Update candle intention
  const updateCandleIntention = useCallback((id: string, intention: string) => {
    setAllLogs(prev => {
      const logs = { ...prev };
      Object.keys(logs).forEach(dateKey => {
        logs[dateKey] = {
          ...logs[dateKey],
          candleIntentions: logs[dateKey].candleIntentions.map(ci =>
            ci.id === id ? { ...ci, intention } : ci
          ),
        };
      });
      return logs;
    });
  }, []);
  
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
  
  // Add astral body insight
  const addAstralBodyInsight = useCallback((content: string) => {
    setAllLogs(prev => {
      const currentLog = prev[currentDateKey] || getEmptyLog(currentDateKey);
      const newInsight: AstralBodyInsight = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        [currentDateKey]: {
          ...currentLog,
          astralBodyInsights: [...currentLog.astralBodyInsights, newInsight],
        },
      };
    });
  }, [currentDateKey]);
  
  // Update astral body insight
  const updateAstralBodyInsight = useCallback((id: string, content: string) => {
    setAllLogs(prev => {
      const logs = { ...prev };
      Object.keys(logs).forEach(dateKey => {
        logs[dateKey] = {
          ...logs[dateKey],
          astralBodyInsights: (logs[dateKey].astralBodyInsights || []).map(i =>
            i.id === id ? { ...i, content, updatedAt: new Date().toISOString() } : i
          ),
        };
      });
      return logs;
    });
  }, []);
  
  // Get all insights (candles + astral body)
  const getAllInsights = useCallback(() => {
    const allInsights: { type: 'candle' | 'astralBody'; id: string; content: string; date: string; color?: string }[] = [];
    
    Object.values(allLogs).forEach(log => {
      log.candleIntentions.forEach(ci => {
        allInsights.push({
          type: 'candle',
          id: ci.id || ci.completedAt,
          content: ci.intention,
          date: log.date,
          color: ci.color,
        });
      });
      
      (log.astralBodyInsights || []).forEach(i => {
        allInsights.push({
          type: 'astralBody',
          id: i.id,
          content: i.content,
          date: log.date,
        });
      });
    });
    
    return allInsights.sort((a, b) => b.date.localeCompare(a.date));
  }, [allLogs]);
  
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
  
  // Get monthly cumulative stats
  const getMonthlyCumulativeStats = useCallback((month?: string) => {
    const targetMonth = month || currentDateKey.slice(0, 7);
    const monthLogs = Object.values(allLogs).filter(log => log.date.startsWith(targetMonth));
    
    return {
      month: targetMonth,
      totalKm: monthLogs.reduce((sum, log) => sum + (log.runningKm || 0), 0),
      totalPunches: monthLogs.reduce((sum, log) => sum + (log.punches || 0), 0),
      totalClona: monthLogs.reduce((sum, log) => sum + (log.clonaDrops || 0), 0),
      daysLogged: monthLogs.length,
    };
  }, [allLogs, currentDateKey]);
  
  return {
    todayLog,
    allLogs,
    currentDateKey,
    monthlyHistory,
     lifetimePoints,
    addCompletedMission,
    removeCompletedMission,
    selectPractice,
    updateRunningKm,
    updatePunches,
    updateClonaDrops,
    addCandleIntention,
    updateCandleIntention,
    addAstralInsight,
    addAstralBodyInsight,
    updateAstralBodyInsight,
    getAllInsights,
    getSortedLogs,
    getLogsForRange,
    getMonthlyCumulativeStats,
  };
}
