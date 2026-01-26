import { DailyLog, Category } from "@/types/missions";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface StatisticsChartsProps {
  logs: DailyLog[];
  period: "weekly" | "biweekly" | "monthly";
}

const CATEGORY_COLORS: Record<Category, string> = {
  physical: "hsl(0, 85%, 55%)",
  energetic: "hsl(30, 100%, 50%)",
  emotional: "hsl(320, 80%, 55%)",
  mental: "hsl(200, 100%, 50%)",
  spiritual: "hsl(270, 80%, 60%)",
  intraphysical: "hsl(150, 70%, 45%)",
  practices: "hsl(0, 70%, 50%)",
  candles: "hsl(45, 100%, 50%)",
  astral: "hsl(240, 60%, 60%)",
};

const CATEGORY_LABELS: Record<Category, string> = {
  physical: "Autodesenv. Físico",
  energetic: "Energética",
  emotional: "Emocional",
  mental: "Mental",
  spiritual: "Espiritual",
  intraphysical: "Intrafísica",
  practices: "Práticas",
  candles: "Rituais com Velas",
  astral: "Realidade Astral",
};

const StatisticsCharts = ({ logs, period }: StatisticsChartsProps) => {
  const periodDays = period === "weekly" ? 7 : period === "biweekly" ? 15 : 30;
  const periodLabel = period === "weekly" ? "Últimos 7 dias" : 
                      period === "biweekly" ? "Últimos 15 dias" : "Este mês";
  
  const chartData = useMemo(() => {
    const relevantLogs = logs.slice(0, periodDays);
    const categoryCount: Record<string, number> = {};
    
    relevantLogs.forEach(log => {
      log.completedMissions.forEach(mission => {
        const category = mission.category;
        categoryCount[category] = (categoryCount[category] || 0) + 1;
      });
      
      // Count candle rituals
      if (log.candleIntentions.length > 0) {
        categoryCount["candles"] = (categoryCount["candles"] || 0) + log.candleIntentions.length;
      }
      
      // Count practice selection
      if (log.practiceSelected) {
        categoryCount["practices"] = (categoryCount["practices"] || 0) + 1;
      }
    });
    
    return Object.entries(categoryCount)
      .filter(([_, count]) => count > 0)
      .map(([category, count]) => ({
        name: CATEGORY_LABELS[category as Category] || category,
        value: count,
        color: CATEGORY_COLORS[category as Category] || "#888",
      }));
  }, [logs, periodDays]);
  
  const totalTasks = chartData.reduce((sum, item) => sum + item.value, 0);
  
  if (chartData.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Sem dados para o período selecionado</p>
      </div>
    );
  }
  
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold">{periodLabel}</h3>
        <span className="text-sm text-muted-foreground">{totalTasks} tarefas</span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 7%)",
                border: "1px solid hsl(45 30% 20%)",
                borderRadius: "0.75rem",
                color: "hsl(45 100% 95%)",
              }}
            />
            <Legend 
              layout="vertical" 
              align="right" 
              verticalAlign="middle"
              wrapperStyle={{ fontSize: "12px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsCharts;
