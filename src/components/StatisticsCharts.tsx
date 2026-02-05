import { DailyLog, Category } from "@/types/missions";
import { useMemo } from "react";

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
   
   // Generate 3D pie chart paths
   const generatePieSlices = () => {
     const cx = 150;
     const cy = 140;
     const radius = 120;
     const depth = 25; // 3D depth
     let currentAngle = -90; // Start from top
     
     const slices: Array<{
       path: string;
       sidePath: string;
       color: string;
       darkColor: string;
       percent: number;
       midAngle: number;
       labelX: number;
       labelY: number;
     }> = [];
     
     chartDataWithPercent.forEach((item) => {
       const sliceAngle = (item.percent / 100) * 360;
       const startAngle = currentAngle;
       const endAngle = currentAngle + sliceAngle;
       const midAngle = startAngle + sliceAngle / 2;
       
       const startRad = (startAngle * Math.PI) / 180;
       const endRad = (endAngle * Math.PI) / 180;
       const midRad = (midAngle * Math.PI) / 180;
       
       const x1 = cx + radius * Math.cos(startRad);
       const y1 = cy + radius * Math.sin(startRad);
       const x2 = cx + radius * Math.cos(endRad);
       const y2 = cy + radius * Math.sin(endRad);
       
       const largeArc = sliceAngle > 180 ? 1 : 0;
       
       // Top face path
       const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
       
       // 3D side path (only for visible sides)
       let sidePath = "";
       if (endAngle > 0 && startAngle < 180) {
         const visibleStart = Math.max(startAngle, 0);
         const visibleEnd = Math.min(endAngle, 180);
         const startRadVis = (visibleStart * Math.PI) / 180;
         const endRadVis = (visibleEnd * Math.PI) / 180;
         
         const sx1 = cx + radius * Math.cos(startRadVis);
         const sy1 = cy + radius * Math.sin(startRadVis);
         const sx2 = cx + radius * Math.cos(endRadVis);
         const sy2 = cy + radius * Math.sin(endRadVis);
         
         const sideArc = (visibleEnd - visibleStart) > 180 ? 1 : 0;
         
         sidePath = `M ${sx1} ${sy1} 
                     A ${radius} ${radius} 0 ${sideArc} 1 ${sx2} ${sy2} 
                     L ${sx2} ${sy2 + depth} 
                     A ${radius} ${radius} 0 ${sideArc} 0 ${sx1} ${sy1 + depth} Z`;
       }
       
       // Label position
       const labelRadius = radius * 0.65;
       const labelX = cx + labelRadius * Math.cos(midRad);
       const labelY = cy + labelRadius * Math.sin(midRad);
       
       // Darker color for 3D side
       const darkColor = darkenColor(item.color, 0.4);
       
       slices.push({
         path,
         sidePath,
         color: item.color,
         darkColor,
         percent: item.percent,
         midAngle,
         labelX,
         labelY,
       });
       
       currentAngle = endAngle;
     });
     
     return slices;
   };
   
   // Helper to darken HSL color
   const darkenColor = (hslColor: string, amount: number) => {
     const match = hslColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
     if (match) {
       const h = parseInt(match[1]);
       const s = parseInt(match[2]);
       const l = Math.max(0, parseInt(match[3]) * (1 - amount));
       return `hsl(${h}, ${s}%, ${l}%)`;
     }
     return hslColor;
   };
   
   const slices = generatePieSlices();
  
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">{periodLabel}</h3>
        <span className="text-sm text-muted-foreground">{totalTasks} tarefas</span>
      </div>
      
       <div className="flex flex-col lg:flex-row items-center gap-6">
         {/* 3D Pie Chart */}
         <div className="flex-shrink-0">
           <svg 
             width="300" 
             height="300" 
             viewBox="0 0 300 300"
             className="drop-shadow-2xl"
           >
             <defs>
               {chartDataWithPercent.map((entry, index) => (
                 <linearGradient key={`grad-${index}`} id={`pieGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                   <stop offset="50%" stopColor={entry.color} stopOpacity={0.9} />
                   <stop offset="100%" stopColor={darkenColor(entry.color, 0.2)} stopOpacity={1} />
                 </linearGradient>
               ))}
               <filter id="pie3dShadow" x="-50%" y="-50%" width="200%" height="200%">
                 <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
               </filter>
               <filter id="innerGlow">
                 <feGaussianBlur stdDeviation="2" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
             </defs>
             
             <g filter="url(#pie3dShadow)">
               {/* 3D sides (render first, back to front) */}
               {slices.map((slice, index) => (
                 slice.sidePath && (
                   <path
                     key={`side-${index}`}
                     d={slice.sidePath}
                     fill={slice.darkColor}
                     stroke="hsl(0, 0%, 5%)"
                     strokeWidth="1"
                   />
                 )
               ))}
               
               {/* Top faces */}
               {slices.map((slice, index) => (
                 <path
                   key={`top-${index}`}
                   d={slice.path}
                   fill={`url(#pieGrad-${index})`}
                   stroke="hsl(0, 0%, 8%)"
                   strokeWidth="2"
                   className="transition-all duration-300 hover:brightness-110"
                 />
               ))}
               
               {/* Percentage labels */}
               {slices.map((slice, index) => (
                 slice.percent >= 5 && (
                   <text
                     key={`label-${index}`}
                     x={slice.labelX}
                     y={slice.labelY}
                     textAnchor="middle"
                     dominantBaseline="central"
                     className="font-bold text-base"
                     fill="white"
                     style={{ 
                       textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                       fontWeight: 700,
                     }}
                   >
                     {slice.percent}%
                   </text>
                 )
               ))}
             </g>
           </svg>
         </div>
         
         {/* Legend beside chart */}
         <div className="flex-1 space-y-3">
           {chartDataWithPercent.map((entry, index) => (
             <div 
               key={index} 
               className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
             >
               <div 
                 className="w-4 h-4 rounded-sm flex-shrink-0 shadow-md"
                 style={{ 
                   backgroundColor: entry.color,
                   boxShadow: `0 2px 8px ${entry.color}40`,
                 }}
               />
               <span className="text-foreground font-medium flex-1">{entry.name}</span>
               <span className="text-primary font-display font-bold text-lg">{entry.percent}%</span>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default StatisticsCharts;
