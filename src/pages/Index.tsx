import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Sparkles, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import ScoreDisplay from "@/components/ScoreDisplay";
import CategoryCard from "@/components/CategoryCard";
import MissionItem from "@/components/MissionItem";
import DailyPointsCounter from "@/components/DailyPointsCounter";
import PhysicalProgress from "@/components/PhysicalProgress";
import PracticeSelector from "@/components/PracticeSelector";
import CandleRituals from "@/components/CandleRituals";
import AstralInsights from "@/components/AstralInsights";
import AstralBodyProgress from "@/components/AstralBodyProgress";
import { useDailyLog } from "@/hooks/useDailyLog";
import { useClonaBottleHistory } from "@/hooks/useClonaBottleHistory";
import { categories, initialMissions } from "@/data/missions";
import { Mission, Category } from "@/types/missions";
import { getCurrentDateKey } from "@/hooks/useDailyReset";
import { validateMissions, validateCustomTasks } from "@/lib/validation-schemas";

const STORAGE_KEY = "ascencao-missions";
const LAST_RESET_KEY = "ascencao-last-reset";
const CUSTOM_TASKS_KEY = "ascencao-custom-tasks";

const Index = () => {
  const [customTasks, setCustomTasks] = useState<Mission[]>(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_TASKS_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return validateCustomTasks(parsed);
    } catch {
      return [];
    }
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const customSaved = localStorage.getItem(CUSTOM_TASKS_KEY);
      const customTasksList: Mission[] = customSaved ? validateCustomTasks(JSON.parse(customSaved)) : [];
      
      if (saved) {
        const savedMissions = validateMissions(JSON.parse(saved));
        const allInitial = [...initialMissions, ...customTasksList];
        const savedIds = new Set(savedMissions.map(m => m.id));
        const newMissions = allInitial.filter(m => !savedIds.has(m.id));
        const mergedMissions = savedMissions.map(saved => {
          const initial = allInitial.find(m => m.id === saved.id);
          return initial ? { ...initial, completed: saved.completed } : saved;
        });
        return [...mergedMissions, ...newMissions];
      }
      return [...initialMissions, ...customTasksList];
    } catch {
      return [...initialMissions];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  const {
    todayLog,
    addCompletedMission,
    removeCompletedMission,
    selectPractice,
    updateRunningKm,
    updatePunches,
    updateClonaDrops,
    addCandleIntention,
    addAstralInsight,
    addAstralBodyInsight,
    getSortedLogs,
    currentDateKey,
    lifetimePoints,
  } = useDailyLog();

  const {
    history: clonaBottleHistory,
    addCompletion: addClonaBottleCompletion,
    removeLastCompletion: removeClonaBottleCompletion,
    hasCompletedToday: hasClonaBottleCompletedToday,
  } = useClonaBottleHistory();

  // Save custom tasks to localStorage
  useEffect(() => {
    localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(customTasks));
  }, [customTasks]);

  // Daily reset at 4AM Brazil time
  useEffect(() => {
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const today = getCurrentDateKey();
    
    if (lastReset !== today) {
      // Reset missions but keep custom tasks
      setMissions([...initialMissions, ...customTasks].map(m => ({ ...m, completed: false })));
      localStorage.setItem(LAST_RESET_KEY, today);
    }
  }, [currentDateKey, customTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }, [missions]);

  const handleAddCustomTask = useCallback((task: { title: string; points: number; category: Category }) => {
    const newTask: Mission = {
      id: `custom-${Date.now()}`,
      title: task.title,
      points: task.points,
      category: task.category,
      completed: false,
    };
    
    setCustomTasks(prev => [...prev, newTask]);
    setMissions(prev => [...prev, newTask]);
  }, []);

  const toggleMission = useCallback((id: string) => {
    const mission = missions.find(m => m.id === id);
    if (!mission) return;
    
    const newCompleted = !mission.completed;
    setMissions(prev => prev.map(m => m.id === id ? { ...m, completed: newCompleted } : m));
    
    // Special handling for clona bottle task - track permanently
    if (id === "ab4") {
      if (newCompleted) {
        addClonaBottleCompletion(currentDateKey);
      } else {
        removeClonaBottleCompletion(currentDateKey);
      }
    }
    
    if (newCompleted) {
      addCompletedMission({
        missionId: id,
        title: mission.title,
        points: mission.points,
        category: mission.category,
        completedAt: new Date().toISOString(),
      });
    } else {
      removeCompletedMission(id);
    }
  }, [missions, addCompletedMission, removeCompletedMission, addClonaBottleCompletion, removeClonaBottleCompletion, currentDateKey]);

   // Use lifetime points for level calculation (perpetual accumulation)
   const level = Math.floor(Math.max(0, lifetimePoints) / 1000) + 1;

  const getCategoryStats = (category: Category) => {
    const categoryMissions = missions.filter(m => m.category === category);
    const completed = categoryMissions.filter(m => m.completed);
    return {
      points: completed.reduce((sum, m) => sum + m.points, 0),
      completedMissions: completed.length,
      totalMissions: categoryMissions.length,
    };
  };

  const filteredMissions = selectedCategory ? missions.filter(m => m.category === selectedCategory) : [];
  const selectedCategoryData = categories.find(c => c.id === selectedCategory);
  const logs = getSortedLogs();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Header 
          logs={logs} 
          onAddCustomTask={handleAddCustomTask} 
          clonaBottleHistory={clonaBottleHistory}
        />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {!selectedCategory ? (
            <>
              <DailyPointsCounter points={todayLog.totalPoints} />
              <section className="mb-8">
               <ScoreDisplay lifetimePoints={lifetimePoints} level={level} />
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold mb-4 text-foreground">Áreas de Desenvolvimento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categories.map((category) => {
                    const stats = getCategoryStats(category.id);
                    return (
                      <CategoryCard
                        key={category.id}
                        title={category.title}
                        description={category.description}
                        icon={category.icon}
                        category={category.id}
                        points={stats.points}
                        completedMissions={stats.completedMissions}
                        totalMissions={stats.totalMissions}
                        onClick={() => setSelectedCategory(category.id)}
                      />
                    );
                  })}
                </div>
              </section>
            </>
          ) : (
            <>
              <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="w-5 h-5" /><span>Voltar</span>
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  {selectedCategoryData && (
                    <div className="p-3 rounded-lg bg-muted">
                      <selectedCategoryData.icon className="w-8 h-8 text-primary" />
                    </div>
                  )}
                  <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">{selectedCategoryData?.title}</h1>
                    <p className="text-muted-foreground">{selectedCategoryData?.description}</p>
                  </div>
                </div>
              </div>

              {/* Special sections based on category */}
              {selectedCategory === "physical" && (
                <div className="mb-6">
                  <PhysicalProgress runningKm={todayLog.runningKm} punches={todayLog.punches} onUpdateRunning={updateRunningKm} onUpdatePunches={updatePunches} />
                </div>
              )}

              {selectedCategory === "astralBody" && (
                <div className="mb-6">
                  <AstralBodyProgress 
                    clonaDrops={todayLog.clonaDrops} 
                    insights={todayLog.astralBodyInsights || []} 
                    onUpdateClonaDrops={updateClonaDrops} 
                    onAddInsight={addAstralBodyInsight} 
                  />
                </div>
              )}

              {selectedCategory === "practices" && (
                <div className="mb-6">
                  <PracticeSelector selectedPractice={todayLog.practiceSelected || null} onSelect={selectPractice} />
                </div>
              )}

              {selectedCategory === "candles" && (
                <div className="mb-6">
                  <CandleRituals completedRituals={todayLog.candleIntentions} onComplete={addCandleIntention} />
                </div>
              )}

              {selectedCategory === "astral" && (
                <div className="mb-6">
                  <AstralInsights insights={todayLog.astralInsights} onAddInsight={addAstralInsight} />
                </div>
              )}

              {selectedCategory === "mental" && (
                <Link to="/siddhis" className="block mb-6 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-category-spiritual" />
                    <span className="font-medium">Consultar Lista de Siddhis</span>
                  </div>
                </Link>
              )}

              <div className="space-y-3">
                {filteredMissions.map((mission) => (
                  <MissionItem key={mission.id} title={mission.title} points={mission.points} completed={mission.completed} category={mission.category} onToggle={() => toggleMission(mission.id)} />
                ))}
              </div>

              {filteredMissions.length === 0 && selectedCategory !== "practices" && selectedCategory !== "candles" && selectedCategory !== "astralBody" && (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Nenhuma missão disponível nesta categoria.</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
