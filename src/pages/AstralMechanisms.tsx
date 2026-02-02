import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Ghost, BookOpen, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import Header from "@/components/Header";
import { useDailyLog } from "@/hooks/useDailyLog";

const AstralMechanisms = () => {
  const { getSortedLogs } = useDailyLog();
  const logs = getSortedLogs();
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    materiaAstral: true,
    vairagya: false,
    ascensao: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const sections = [
    {
      id: "materiaAstral",
      title: "Tipos de Matéria Astral",
      icon: Ghost,
      content: `
**Matéria Astral Densa (Baixa Vibração)**
- Associada a emoções pesadas: medo, raiva, inveja, ciúme
- Cores escuras e turvas na aura
- Atrai entidades de baixa vibração

**Matéria Astral Média**
- Emoções cotidianas: preocupação, ansiedade leve, desejos comuns
- Cores mais definidas mas não brilhantes
- Estado transitório comum na maioria das pessoas

**Matéria Astral Sutil (Alta Vibração)**
- Sentimentos elevados: amor incondicional, compaixão, alegria pura
- Cores brilhantes e luminosas
- Facilita contato com planos superiores

**Matéria Astral Búdica**
- Transcende o astral comum
- Associada à intuição pura e sabedoria
- Porta de entrada para estados de consciência expandida
      `,
    },
    {
      id: "vairagya",
      title: "Aplicando Vairagya",
      icon: Sparkles,
      content: `
**O que é Vairagya?**
Vairagya é o desapego, a libertação dos desejos e aversões que nos prendem ao ciclo de sofrimento.

**Práticas de Vairagya no Corpo Astral:**

1. **Observação sem identificação**
   - Observe suas emoções como um testemunha
   - Não se identifique com a emoção: "estou com raiva" vs "há raiva presente"

2. **Desapego dos resultados**
   - Aja sem expectativa de retorno
   - Aceite o que vier como aprendizado

3. **Purificação emocional**
   - Jejum de críticas e julgamentos
   - Prática de perdão consciente
   - Transformação de ressentimentos em compreensão

4. **Meditação Vairagya**
   - Visualize emoções densas se dissolvendo
   - Cultive a sensação de leveza e liberdade
   - Pratique o "soltar" a cada expiração

**Sinais de Progresso:**
- Menor reatividade emocional
- Paz interior constante
- Compaixão natural pelos outros
- Redução de medos e ansiedades
      `,
    },
    {
      id: "ascensao",
      title: "Caminho da Ascensão",
      icon: BookOpen,
      content: `
**Estágios de Ascensão Astral**

**1. Purificação (Shuddhi)**
- Limpeza do corpo astral denso
- Dissolução de traumas e padrões negativos
- Práticas: mantra, pranayama, meditação

**2. Expansão (Vikaasa)**
- Ampliação da consciência astral
- Desenvolvimento de percepções sutis
- Práticas: projeção consciente, visualização criativa

**3. Iluminação (Prakasha)**
- Corpo astral luminoso e radiante
- Conexão com guias e mestres
- Práticas: samadhi, devoção, serviço

**4. Integração (Samyoga)**
- União dos corpos físico, astral e mental
- Manifestação da alma na personalidade
- Práticas: vida integrada, propósito de alma

**Mecanismos a Elaborar:**
- Reconhecimento de padrões kármicos
- Transmutação de energias densas
- Alinhamento com o Eu Superior
- Serviço desinteressado (Seva)

**Obstáculos Comuns:**
- Apego ao corpo físico
- Medo da dissolução do ego
- Impaciência com o processo
- Falta de disciplina sustentada
      `,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header logs={logs} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-3">
            <Ghost className="w-8 h-8 text-category-astralBody" />
            Mecanismos Astrais
          </h1>
          <p className="text-muted-foreground mt-2">
            Notas sobre matéria astral, vairagya e o caminho da ascensão
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            
            return (
              <div
                key={section.id}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-category-astralBody/20 rounded-lg">
                      <Icon className="w-5 h-5 text-category-astralBody" />
                    </div>
                    <span className="font-display font-semibold">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-4">
                    <div className="prose prose-sm prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/90 bg-muted/30 p-4 rounded-lg">
                        {section.content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default AstralMechanisms;
