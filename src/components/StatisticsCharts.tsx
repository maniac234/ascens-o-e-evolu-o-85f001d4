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
  physical: "hsl(45, 100%, 50%)",      // Dourado brilhante
  energetic: "hsl(45, 80%, 45%)",      // Dourado médio
  astralBody: "hsl(45, 60%, 40%)",     // Dourado escuro
  mental: "hsl(0, 0%, 25%)",           // Cinza escuro
  spiritual: "hsl(0, 0%, 35%)",        // Cinza médio
  intraphysical: "hsl(0, 0%, 45%)",    // Cinza claro
  practices: "hsl(0, 0%, 20%)",        // Quase preto
  candles: "hsl(45, 90%, 55%)",        // Dourado claro
  astral: "hsl(0, 0%, 30%)",           // Cinza
};

const CATEGORY_LABELS: Record<Category, string> = {
  physical: "Autodesenv. Físico",
  energetic: "Energética",
  astralBody: "Corpo Astral",
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
  
  // Calculate percentages
  const chartDataWithPercent = chartData.map(item => ({
    ...item,
    percent: Math.round((item.value / totalTasks) * 100),
  }));
  
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.05) return null; // Don't show label for very small slices
    
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="font-bold text-sm drop-shadow-lg"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
      >
        {`${Math.round(percent * 100)}%`}
      </text>
    );
  };
  
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">{periodLabel}</h3>
        <span className="text-sm text-muted-foreground">{totalTasks} tarefas</span>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {chartDataWithPercent.map((entry, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                </linearGradient>
              ))}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.4" />
              </filter>
            </defs>
            <Pie
              data={chartDataWithPercent}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              stroke="hsl(0 0% 10%)"
              strokeWidth={2}
              style={{ filter: 'url(#shadow)' }}
            >
              {chartDataWithPercent.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 7%)",
                border: "1px solid hsl(45 30% 20%)",
                borderRadius: "0.75rem",
                color: "hsl(45 100% 95%)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
              formatter={(value: number, name: string) => [`${value} tarefas`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend below chart */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {chartDataWithPercent.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground truncate">{entry.name}</span>
            <span className="text-foreground font-medium ml-auto">{entry.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsCharts;
