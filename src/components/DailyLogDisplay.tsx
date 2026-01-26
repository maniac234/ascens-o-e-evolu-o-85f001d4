import { useState } from "react";
import { DailyLog } from "@/types/missions";
import { formatDateKey, isCurrentDay } from "@/hooks/useDailyReset";
import { ChevronDown, ChevronUp, Calendar, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DailyLogDisplayProps {
  logs: DailyLog[];
  maxDisplay?: number;
}

const DailyLogDisplay = ({ logs, maxDisplay = 7 }: DailyLogDisplayProps) => {
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set([logs[0]?.date]));
  const [showAll, setShowAll] = useState(false);
  
  const displayLogs = showAll ? logs : logs.slice(0, maxDisplay);
  
  const toggleDay = (date: string) => {
    setExpandedDays(prev => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };
  
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>Nenhum registro encontrado</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {displayLogs.map((log) => {
        const isToday = isCurrentDay(log.date);
        const isExpanded = expandedDays.has(log.date);
        
        return (
          <motion.div
            key={log.date}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border rounded-xl overflow-hidden ${
              isToday ? 'border-primary/50 bg-primary/5' : 'border-border bg-card'
            }`}
          >
            <button
              onClick={() => toggleDay(log.date)}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isToday ? 'bg-primary/20' : 'bg-muted'}`}>
                  <Calendar className={`w-4 h-4 ${isToday ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="text-left">
                  <p className={`font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                    {isToday ? 'Hoje' : formatDateKey(log.date)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {log.completedMissions.length} missões • {log.totalPoints > 0 ? '+' : ''}{log.totalPoints} pts
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-border"
                >
                  <div className="p-4 space-y-2">
                    {log.completedMissions.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        Nenhuma missão completada
                      </p>
                    ) : (
                      log.completedMissions.map((mission, idx) => (
                        <div
                          key={`${mission.missionId}-${idx}`}
                          className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            <span className="text-sm">{mission.title}</span>
                          </div>
                          <span className={`text-sm font-medium ${
                            mission.points >= 0 ? 'text-primary' : 'text-destructive'
                          }`}>
                            {mission.points > 0 ? '+' : ''}{mission.points}
                          </span>
                        </div>
                      ))
                    )}
                    
                    {/* Show practice selection */}
                    {log.practiceSelected && (
                      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-destructive/10">
                        <span className="text-sm text-destructive">
                          Prática {log.practiceSelected.replace('practice', '')} selecionada
                        </span>
                        <span className="text-sm font-medium text-destructive">
                          {log.practiceSelected === 'practice1' ? '-40' : 
                           log.practiceSelected === 'practice2' ? '-90' : '-150'}
                        </span>
                      </div>
                    )}
                    
                    {/* Show progress items */}
                    {(log.runningKm > 0 || log.punches > 0) && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Progresso Físico</p>
                        {log.runningKm > 0 && (
                          <p className="text-sm">🏃 Corrida: {log.runningKm} km</p>
                        )}
                        {log.punches > 0 && (
                          <p className="text-sm">🥊 Socos: {log.punches}</p>
                        )}
                      </div>
                    )}
                    
                    {/* Show candle intentions */}
                    {log.candleIntentions.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Rituais com Velas</p>
                        {log.candleIntentions.map((intention, idx) => (
                          <div key={idx} className="text-sm bg-muted/30 p-2 rounded mb-1">
                            <span className="font-medium capitalize">{intention.color}</span>: {intention.intention}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
      
      {logs.length > maxDisplay && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-3 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver mais {logs.length - maxDisplay} dias
        </button>
      )}
    </div>
  );
};

export default DailyLogDisplay;
