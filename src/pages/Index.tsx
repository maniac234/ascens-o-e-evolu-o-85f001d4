import { useState, useEffect } from "react";
import { 
  Flame, 
  Zap, 
  Heart, 
  Brain, 
  Sparkles, 
  Users,
  ArrowLeft
} from "lucide-react";
import Header from "@/components/Header";
import ScoreDisplay from "@/components/ScoreDisplay";
import CategoryCard from "@/components/CategoryCard";
import MissionItem from "@/components/MissionItem";

type Category = "physical" | "energetic" | "emotional" | "mental" | "spiritual" | "intraphysical";

interface Mission {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  category: Category;
}

const categories = [
  {
    id: "physical" as Category,
    title: "Física",
    description: "Exercícios e saúde do corpo",
    icon: Flame,
  },
  {
    id: "energetic" as Category,
    title: "Energética",
    description: "Vitalidade e energia pessoal",
    icon: Zap,
  },
  {
    id: "emotional" as Category,
    title: "Emocional",
    description: "Equilíbrio e inteligência emocional",
    icon: Heart,
  },
  {
    id: "mental" as Category,
    title: "Mental",
    description: "Foco, aprendizado e clareza",
    icon: Brain,
  },
  {
    id: "spiritual" as Category,
    title: "Espiritual",
    description: "Conexão e propósito interior",
    icon: Sparkles,
  },
  {
    id: "intraphysical" as Category,
    title: "Realidade Intrafísica",
    description: "Tarefas sociais e profissionais",
    icon: Users,
  },
];

const initialMissions: Mission[] = [
  // Physical - Musculação e Exercícios
  { id: "p1", title: "Musculação Peito", points: 50, completed: false, category: "physical" },
  { id: "p2", title: "Musculação Peito + Abdômen", points: 75, completed: false, category: "physical" },
  { id: "p3", title: "Treino de MMA + Abdômen", points: 70, completed: false, category: "physical" },
  { id: "p4", title: "Musculação Bike + Perna", points: 80, completed: false, category: "physical" },
  { id: "p5", title: "Musculação Costas na Academia", points: 75, completed: false, category: "physical" },
  { id: "p6", title: "Musculação Ombro e Trapézio", points: 85, completed: false, category: "physical" },
  { id: "p7", title: "Musculação Braços Completos", points: 85, completed: false, category: "physical" },
  { id: "p8", title: "Corrida na Rua + Sol", points: 90, completed: false, category: "physical" },
  
  // Energetic - OLVEs e Práticas
  { id: "e1", title: "OLVEs na Cadeira", points: 40, completed: false, category: "energetic" },
  { id: "e2", title: "OLVEs no Pátio", points: 60, completed: false, category: "energetic" },
  { id: "e3", title: "OLVEs Deitado", points: 30, completed: false, category: "energetic" },
  { id: "e4", title: "10 x 20 OLVEs por Dia", points: 60, completed: false, category: "energetic" },
  { id: "e5", title: "Abstinência Diária", points: 40, completed: false, category: "energetic" },
  { id: "e6", title: "1 Prática (penalidade)", points: -40, completed: false, category: "energetic" },
  
  // Emotional
  { id: "em1", title: "Praticar gratidão diária", points: 40, completed: false, category: "emotional" },
  { id: "em2", title: "Expressar um sentimento", points: 35, completed: false, category: "emotional" },
  
  // Mental
  { id: "m1", title: "Ler por 30 minutos", points: 45, completed: false, category: "mental" },
  { id: "m2", title: "Aprender algo novo", points: 50, completed: false, category: "mental" },
  
  // Spiritual - Reiki e Devocionais
  { id: "s1", title: "Reiki", points: 35, completed: false, category: "spiritual" },
  { id: "s2", title: "Reiki para Casa", points: 10, completed: false, category: "spiritual" },
  { id: "s3", title: "Reiki para Pais ou Alguém Específico", points: 10, completed: false, category: "spiritual" },
  { id: "s4", title: "Reiki para Comunidade Carente", points: 20, completed: false, category: "spiritual" },
  { id: "s5", title: "Devocional", points: 25, completed: false, category: "spiritual" },
  { id: "s6", title: "Asha Music", points: 25, completed: false, category: "spiritual" },
  
  // Intraphysical
  { id: "i1", title: "Completar tarefa de trabalho", points: 60, completed: false, category: "intraphysical" },
  { id: "i2", title: "Conectar com um amigo", points: 40, completed: false, category: "intraphysical" },
];

const STORAGE_KEY = "ascencao-missions";
const LAST_RESET_KEY = "ascencao-last-reset";

const Index = () => {
  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialMissions;
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Renovação diária das missões a cada 24 horas
  useEffect(() => {
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const now = new Date();
    const today = now.toDateString();
    
    if (lastReset !== today) {
      // Reseta todas as missões para não concluídas
      setMissions(initialMissions);
      localStorage.setItem(LAST_RESET_KEY, today);
    }
  }, []);

  // Salva missões no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(missions));
  }, [missions]);

  const toggleMission = (id: string) => {
    setMissions(missions.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  const totalPoints = missions.filter(m => m.completed).reduce((sum, m) => sum + m.points, 0);
  const level = Math.floor(totalPoints / 1000) + 1;

  const getCategoryStats = (category: Category) => {
    const categoryMissions = missions.filter(m => m.category === category);
    const completed = categoryMissions.filter(m => m.completed);
    return {
      points: completed.reduce((sum, m) => sum + m.points, 0),
      completedMissions: completed.length,
      totalMissions: categoryMissions.length,
    };
  };

  const filteredMissions = selectedCategory 
    ? missions.filter(m => m.category === selectedCategory)
    : [];

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          {!selectedCategory ? (
            <>
              {/* Score Section */}
              <section className="mb-8">
                <ScoreDisplay totalPoints={totalPoints} level={level} />
              </section>

              {/* Categories Section */}
              <section>
                <h2 className="font-display text-xl font-semibold mb-4 text-foreground">
                  Áreas de Desenvolvimento
                </h2>
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
              {/* Category Detail View */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  {selectedCategoryData && (
                    <div className={`p-3 rounded-lg bg-category-${selectedCategory}/20`}>
                      <selectedCategoryData.icon className={`w-8 h-8 text-category-${selectedCategory}`} />
                    </div>
                  )}
                  <div>
                    <h1 className="font-display text-2xl font-bold text-foreground">
                      {selectedCategoryData?.title}
                    </h1>
                    <p className="text-muted-foreground">{selectedCategoryData?.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {filteredMissions.map((mission) => (
                  <MissionItem
                    key={mission.id}
                    title={mission.title}
                    points={mission.points}
                    completed={mission.completed}
                    category={mission.category}
                    onToggle={() => toggleMission(mission.id)}
                  />
                ))}
              </div>

              {filteredMissions.length === 0 && (
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
