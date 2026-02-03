import { Mission, Category } from "@/types/missions";
import { 
  Flame, 
  Zap, 
  Ghost, 
  Brain, 
  Sparkles, 
  Users,
  Moon,
  Flame as CandleIcon,
  AlertTriangle,
} from "lucide-react";

export const initialMissions: Mission[] = [
  // Physical - Musculação e Exercícios
  { id: "p1", title: "Musculação Peito", points: 50, completed: false, category: "physical" },
  { id: "p2", title: "Musculação Peito + Abdômen", points: 75, completed: false, category: "physical" },
  { id: "p3", title: "Treino de MMA + Abdômen", points: 70, completed: false, category: "physical" },
  { id: "p4", title: "Musculação Bike + Perna", points: 80, completed: false, category: "physical" },
  { id: "p5", title: "Musculação Costas na Academia", points: 75, completed: false, category: "physical" },
  { id: "p6", title: "Musculação Ombro e Trapézio", points: 85, completed: false, category: "physical" },
  { id: "p7", title: "Musculação Braços Completos", points: 85, completed: false, category: "physical" },
  { id: "p8", title: "Corrida na Rua + Sol", points: 90, completed: false, category: "physical" },
  { id: "p9", title: "MMA", points: 50, completed: false, category: "physical" },
  
  // Energetic - OLVEs e Práticas
  { id: "e1", title: "OLVEs na Cadeira", points: 40, completed: false, category: "energetic" },
  { id: "e2", title: "OLVEs no Pátio", points: 60, completed: false, category: "energetic" },
  { id: "e3", title: "OLVEs Deitado", points: 30, completed: false, category: "energetic" },
  { id: "e4", title: "10 x 20 OLVEs por Dia", points: 60, completed: false, category: "energetic" },
  { id: "e5", title: "Abstinência Diária", points: 40, completed: false, category: "energetic" },
  { id: "e6", title: "1 Prática (penalidade)", points: -40, completed: false, category: "energetic" },
  
  // Astral Body (antigo Emotional)
  { id: "ab1", title: "Registrar insight astral", points: 40, completed: false, category: "astralBody" },
  { id: "ab2", title: "Análise de mecanismo astral", points: 35, completed: false, category: "astralBody" },
  { id: "ab3", title: "Formas pensamentos de guerreiro", points: 100, completed: false, category: "astralBody" },
  
  // Mental - Updated
  { id: "m1", title: "Leitura diária", points: 45, completed: false, category: "mental" },
  { id: "m2", title: "Aprender algo novo", points: 50, completed: false, category: "mental" },
  { id: "m3", title: "Curso", points: 70, completed: false, category: "mental" },
  { id: "m4", title: "Concentração (Dharana) - 10 min", points: 100, completed: false, category: "mental" },
  { id: "m5", title: "Meditação (Dhyana) - 5 min silêncio", points: 170, completed: false, category: "mental" },
  { id: "m6", title: "Xadrez", points: 40, completed: false, category: "mental" },
  { id: "m7", title: "StarCraft", points: 60, completed: false, category: "mental" },
  
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
  
  // Astral Reality
  { id: "a1", title: "Lucidez plena em sonho", points: 130, completed: false, category: "astral" },
  { id: "a2", title: "Semi-lucidez", points: 80, completed: false, category: "astral" },
  { id: "a3", title: "Levitação (em sonho/astral)", points: 80, completed: false, category: "astral" },
  { id: "a4", title: "Lutas corporais desnecessárias", points: -80, completed: false, category: "astral" },
];

export const categories = [
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
    id: "astralBody" as Category,
    title: "Corpo Astral",
    description: "Sentimentos e matéria astral",
    icon: Ghost,
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
  {
    id: "practices" as Category,
    title: "Práticas Diárias",
    description: "Escolha uma prática por dia",
    icon: AlertTriangle,
  },
  {
    id: "candles" as Category,
    title: "Rituais com Velas",
    description: "Rituais energéticos sagrados",
    icon: CandleIcon,
  },
  {
    id: "astral" as Category,
    title: "Realidade Astral",
    description: "Experiências extrafísicas",
    icon: Moon,
  },
];
