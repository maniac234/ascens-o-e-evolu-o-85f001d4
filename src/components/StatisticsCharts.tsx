 import { DailyLog, Category } from "@/types/missions";
 import { useMemo } from "react";
 
 interface StatisticsChartsProps {
   logs: DailyLog[];
   period: "weekly" | "biweekly" | "monthly";
 }
 
 // Rich, vibrant color palette for each category with gradient stops
 const CATEGORY_COLORS: Record<Category, { main: string; light: string; dark: string; glow: string }> = {
   physical: { 
     main: "hsl(45, 100%, 50%)",
     light: "hsl(50, 100%, 70%)",
     dark: "hsl(40, 100%, 30%)",
     glow: "rgba(255, 215, 0, 0.6)"
   },
   energetic: { 
     main: "hsl(280, 85%, 55%)",
     light: "hsl(285, 90%, 72%)",
     dark: "hsl(275, 80%, 32%)",
     glow: "rgba(180, 100, 255, 0.6)"
   },
   astralBody: { 
     main: "hsl(200, 90%, 50%)",
     light: "hsl(195, 95%, 68%)",
     dark: "hsl(205, 85%, 28%)",
     glow: "rgba(50, 180, 255, 0.6)"
   },
   mental: { 
     main: "hsl(145, 80%, 42%)",
     light: "hsl(140, 85%, 58%)",
     dark: "hsl(150, 75%, 22%)",
     glow: "rgba(50, 200, 100, 0.6)"
   },
   spiritual: { 
     main: "hsl(320, 80%, 55%)",
     light: "hsl(315, 85%, 72%)",
     dark: "hsl(325, 75%, 32%)",
     glow: "rgba(255, 100, 180, 0.6)"
   },
   intraphysical: { 
     main: "hsl(25, 95%, 55%)",
     light: "hsl(30, 100%, 72%)",
     dark: "hsl(20, 90%, 32%)",
     glow: "rgba(255, 140, 50, 0.6)"
   },
   practices: { 
     main: "hsl(0, 75%, 50%)",
     light: "hsl(5, 80%, 65%)",
     dark: "hsl(355, 70%, 28%)",
     glow: "rgba(220, 60, 60, 0.6)"
   },
   candles: { 
     main: "hsl(55, 100%, 50%)",
     light: "hsl(60, 100%, 68%)",
     dark: "hsl(50, 95%, 30%)",
     glow: "rgba(255, 230, 50, 0.6)"
   },
   astral: { 
     main: "hsl(220, 85%, 55%)",
     light: "hsl(215, 90%, 72%)",
     dark: "hsl(225, 80%, 32%)",
     glow: "rgba(80, 120, 255, 0.6)"
   },
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
       
       if (log.candleIntentions.length > 0) {
         categoryCount["candles"] = (categoryCount["candles"] || 0) + log.candleIntentions.length;
       }
       
       if (log.practiceSelected) {
         categoryCount["practices"] = (categoryCount["practices"] || 0) + 1;
       }
     });
     
     return Object.entries(categoryCount)
       .filter(([_, count]) => count > 0)
       .map(([category, count]) => ({
         name: CATEGORY_LABELS[category as Category] || category,
         value: count,
         colors: CATEGORY_COLORS[category as Category] || { main: "#888", light: "#aaa", dark: "#555", glow: "rgba(136,136,136,0.6)" },
         category: category as Category,
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
   
   const chartDataWithPercent = chartData.map(item => ({
     ...item,
     percent: Math.round((item.value / totalTasks) * 100),
   }));
   
   const generatePieSlices = () => {
     const cx = 150;
     const cy = 130;
     const radius = 110;
     const depth = 35;
     let currentAngle = -90;
     
     const slices: Array<{
       topPath: string;
       sidePath: string;
       colors: { main: string; light: string; dark: string; glow: string };
       percent: number;
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
       const topPath = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
       
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
         
         sidePath = `M ${sx1} ${sy1} A ${radius} ${radius} 0 ${sideArc} 1 ${sx2} ${sy2} L ${sx2} ${sy2 + depth} A ${radius} ${radius} 0 ${sideArc} 0 ${sx1} ${sy1 + depth} Z`;
       }
       
       const labelRadius = radius * 0.55;
       const labelX = cx + labelRadius * Math.cos(midRad);
       const labelY = cy + labelRadius * Math.sin(midRad);
       
       slices.push({
         topPath,
         sidePath,
         colors: item.colors,
         percent: item.percent,
         labelX,
         labelY,
       });
       
       currentAngle = endAngle;
     });
     
     return slices;
   };
   
   const slices = generatePieSlices();
   
   return (
     <div className="bg-card border border-border rounded-xl p-6">
       <div className="flex items-center justify-between mb-6">
         <h3 className="font-display font-semibold text-lg">{periodLabel}</h3>
         <span className="text-sm text-muted-foreground">{totalTasks} tarefas</span>
       </div>
       
       <div className="flex flex-col lg:flex-row items-center gap-8">
         {/* 3D Pie Chart */}
         <div className="flex-shrink-0">
           <svg 
             width="320" 
             height="320" 
             viewBox="0 0 300 300"
             style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
           >
             <defs>
               {/* Top surface gradients - metallic effect */}
               {chartDataWithPercent.map((entry, index) => (
                 <linearGradient 
                   key={`topGrad-${index}`} 
                   id={`topGrad-${index}`} 
                   x1="0%" 
                   y1="0%" 
                   x2="100%" 
                   y2="100%"
                 >
                   <stop offset="0%" stopColor={entry.colors.light} />
                   <stop offset="25%" stopColor={entry.colors.main} />
                   <stop offset="75%" stopColor={entry.colors.main} />
                   <stop offset="100%" stopColor={entry.colors.dark} />
                 </linearGradient>
               ))}
               
               {/* Side surface gradients - darker depth */}
               {chartDataWithPercent.map((entry, index) => (
                 <linearGradient 
                   key={`sideGrad-${index}`} 
                   id={`sideGrad-${index}`} 
                   x1="0%" 
                   y1="0%" 
                   x2="0%" 
                   y2="100%"
                 >
                   <stop offset="0%" stopColor={entry.colors.dark} />
                   <stop offset="60%" stopColor={entry.colors.dark} stopOpacity={0.7} />
                   <stop offset="100%" stopColor="hsl(0, 0%, 3%)" />
                 </linearGradient>
               ))}
               
               {/* Glossy highlight overlay */}
               <linearGradient id="glossOverlay" x1="0%" y1="0%" x2="50%" y2="100%">
                 <stop offset="0%" stopColor="white" stopOpacity={0.35} />
                 <stop offset="40%" stopColor="white" stopOpacity={0.08} />
                 <stop offset="100%" stopColor="white" stopOpacity={0} />
               </linearGradient>
               
               {/* Ambient shadow */}
               <filter id="ambientShadow" x="-50%" y="-50%" width="200%" height="200%">
                 <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                 <feOffset dx="0" dy="3" result="offsetBlur" />
                 <feFlood floodColor="#000" floodOpacity="0.4" />
                 <feComposite in2="offsetBlur" operator="in" />
                 <feMerge>
                   <feMergeNode />
                   <feMergeNode in="SourceGraphic" />
                 </feMerge>
               </filter>
             </defs>
             
             {/* Render 3D sides first (back to front order) */}
             {slices.map((slice, index) => (
               slice.sidePath && (
                 <path
                   key={`side-${index}`}
                   d={slice.sidePath}
                   fill={`url(#sideGrad-${index})`}
                   stroke="hsl(0, 0%, 2%)"
                   strokeWidth="1"
                 />
               )
             ))}
             
             {/* Render top surfaces with glossy effect */}
             {slices.map((slice, index) => (
               <g key={`topGroup-${index}`}>
                 {/* Main colored surface */}
                 <path
                   d={slice.topPath}
                   fill={`url(#topGrad-${index})`}
                   stroke="hsl(0, 0%, 4%)"
                   strokeWidth="2"
                   filter="url(#ambientShadow)"
                   className="transition-all duration-300 hover:brightness-125"
                   style={{ cursor: 'pointer' }}
                 />
                 {/* Glossy overlay */}
                 <path
                   d={slice.topPath}
                   fill="url(#glossOverlay)"
                   pointerEvents="none"
                 />
               </g>
             ))}
             
             {/* Edge highlight on top */}
             {slices.map((slice, index) => {
               const cx = 150, cy = 130, radius = 110;
               let currentAngle = -90;
               for (let i = 0; i < index; i++) {
                 currentAngle += (chartDataWithPercent[i].percent / 100) * 360;
               }
               const sliceAngle = (slice.percent / 100) * 360;
               const startRad = (currentAngle * Math.PI) / 180;
               const endRad = ((currentAngle + sliceAngle) * Math.PI) / 180;
               const x1 = cx + radius * Math.cos(startRad);
               const y1 = cy + radius * Math.sin(startRad);
               const x2 = cx + radius * Math.cos(endRad);
               const y2 = cy + radius * Math.sin(endRad);
               const largeArc = sliceAngle > 180 ? 1 : 0;
               const arcPath = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
               
               return (
                 <path
                   key={`edge-${index}`}
                   d={arcPath}
                   fill="none"
                   stroke={slice.colors.light}
                   strokeWidth="2"
                   strokeOpacity="0.5"
                   pointerEvents="none"
                 />
               );
             })}
             
             {/* Percentage labels */}
             {slices.map((slice, index) => (
               slice.percent >= 5 && (
                 <g key={`label-${index}`}>
                   {/* Text shadow */}
                   <text
                     x={slice.labelX + 1.5}
                     y={slice.labelY + 1.5}
                     textAnchor="middle"
                     dominantBaseline="central"
                     fill="black"
                     fillOpacity="0.8"
                     style={{ 
                       fontSize: '15px',
                       fontWeight: 800,
                       fontFamily: 'Orbitron, system-ui, sans-serif',
                     }}
                   >
                     {slice.percent}%
                   </text>
                   {/* Main label */}
                   <text
                     x={slice.labelX}
                     y={slice.labelY}
                     textAnchor="middle"
                     dominantBaseline="central"
                     fill="white"
                     style={{ 
                       fontSize: '15px',
                       fontWeight: 800,
                       fontFamily: 'Orbitron, system-ui, sans-serif',
                     }}
                   >
                     {slice.percent}%
                   </text>
                 </g>
               )
             ))}
           </svg>
         </div>
         
         {/* Legend beside chart */}
         <div className="flex-1 space-y-2 min-w-0">
           {chartDataWithPercent.map((entry, index) => (
             <div 
               key={index} 
               className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
               style={{
                 background: `linear-gradient(90deg, ${entry.colors.dark}20 0%, transparent 100%)`,
                 borderLeft: `4px solid ${entry.colors.main}`,
               }}
             >
               <div 
                 className="w-5 h-5 rounded-md flex-shrink-0"
                 style={{ 
                   background: `linear-gradient(135deg, ${entry.colors.light} 0%, ${entry.colors.main} 50%, ${entry.colors.dark} 100%)`,
                   boxShadow: `0 4px 15px ${entry.colors.glow}`,
                 }}
               />
               <span className="text-foreground font-medium flex-1 truncate">{entry.name}</span>
               <span 
                 className="font-display font-bold text-lg"
                 style={{ color: entry.colors.light }}
               >
                 {entry.percent}%
               </span>
             </div>
           ))}
         </div>
       </div>
     </div>
   );
 };
 
 export default StatisticsCharts;