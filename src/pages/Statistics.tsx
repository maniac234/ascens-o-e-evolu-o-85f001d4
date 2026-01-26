import { useState } from "react";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { useDailyLog } from "@/hooks/useDailyLog";
import StatisticsCharts from "@/components/StatisticsCharts";
import DailyLogDisplay from "@/components/DailyLogDisplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Statistics = () => {
  const { getSortedLogs } = useDailyLog();
  const logs = getSortedLogs();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                </div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  Estatísticas
                </h1>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Tabs defaultValue="weekly" className="space-y-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="weekly">Semanal</TabsTrigger>
              <TabsTrigger value="biweekly">Quinzenal</TabsTrigger>
              <TabsTrigger value="monthly">Mensal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly">
              <StatisticsCharts logs={logs} period="weekly" />
            </TabsContent>
            
            <TabsContent value="biweekly">
              <StatisticsCharts logs={logs} period="biweekly" />
            </TabsContent>
            
            <TabsContent value="monthly">
              <StatisticsCharts logs={logs} period="monthly" />
            </TabsContent>
          </Tabs>
          
          {/* Historical Logs */}
          <section className="mt-8">
            <h2 className="font-display text-lg font-semibold mb-4">
              Histórico de Atividades
            </h2>
            <DailyLogDisplay logs={logs} maxDisplay={10} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Statistics;
