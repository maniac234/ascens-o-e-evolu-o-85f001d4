import { useMemo } from "react";
import { DailyLog } from "@/types/missions";
import { TrendingUp, Footprints, Flame, Droplets } from "lucide-react";

interface CumulativeStatsPanelProps {
  logs: DailyLog[];
  monthlyHistory: MonthlyStats[];
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  totalKm: number;
  totalPunches: number;
  totalClona: number;
}

const CumulativeStatsPanel = ({ logs, monthlyHistory }: CumulativeStatsPanelProps) => {
  // Get current month in YYYY-MM format
  const currentMonth = new Date().toISOString().slice(0, 7);
  
  // Calculate current month's accumulated stats
  const currentMonthStats = useMemo(() => {
    const monthLogs = logs.filter(log => log.date.startsWith(currentMonth));
    
    return {
      totalKm: monthLogs.reduce((sum, log) => sum + (log.runningKm || 0), 0),
      totalPunches: monthLogs.reduce((sum, log) => sum + (log.punches || 0), 0),
      totalClona: monthLogs.reduce((sum, log) => sum + (log.clonaDrops || 0), 0),
      daysLogged: monthLogs.length,
    };
  }, [logs, currentMonth]);
  
  // Format month name in Portuguese
  const formatMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Current Month Panel */}
      <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/30 rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">Acumulado do Mês</h3>
            <p className="text-sm text-muted-foreground">{formatMonthName(currentMonth)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {/* KM Card */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
            <Footprints className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {currentMonthStats.totalKm.toFixed(1)}
            </div>
            <div className="text-xs text-muted-foreground mt-1">km corridos</div>
          </div>
          
          {/* Punches Card */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
            <Flame className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {currentMonthStats.totalPunches.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">socos</div>
          </div>
          
          {/* Clona Card */}
          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border">
            <Droplets className="w-6 h-6 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {currentMonthStats.totalClona}
            </div>
            <div className="text-xs text-muted-foreground mt-1">gotas clona</div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {currentMonthStats.daysLogged} dias registrados este mês
        </div>
      </div>
      
      {/* Monthly History */}
      {monthlyHistory.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-display font-semibold mb-4">Histórico Mensal</h3>
          
          <div className="space-y-3">
            {monthlyHistory.map((month) => (
              <div
                key={month.month}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              >
                <span className="font-medium text-sm">
                  {formatMonthName(month.month)}
                </span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-primary">
                    <Footprints className="w-3 h-3" />
                    {month.totalKm.toFixed(1)} km
                  </span>
                  <span className="flex items-center gap-1 text-accent">
                    <Flame className="w-3 h-3" />
                    {month.totalPunches.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-secondary">
                    <Droplets className="w-3 h-3" />
                    {month.totalClona}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CumulativeStatsPanel;
