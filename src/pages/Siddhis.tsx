import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const siddhisData = [
  {
    level: 1,
    emoji: "🌱",
    title: "NÍVEL 1 – Siddhis Físicos e Sensoriais",
    subtitle: "Manipulação do Corpo Denso",
    description: "Associados ao corpo físico, vitalidade e sentidos",
    source: "Shiva Samhita, Gheranda Samhita, Puranas",
    siddhis: [
      { name: "Anima", description: "Capacidade de tornar-se infinitamente pequeno (microscópico)." },
      { name: "Mahima", description: "Capacidade de tornar-se infinitamente grande (macroscópico)." },
      { name: "Laghima", description: "Leveza extrema; capacidade de flutuar ou voar (laghutva)." },
      { name: "Garima", description: "Tornar-se extremamente pesado/inamovível." },
      { name: "Prapti", description: "Poder de tocar ou alcançar qualquer coisa, mesmo à distância (ex: tocar a Lua)." },
      { name: "Prakamya", description: "Realização de qualquer desejo; vontade irresistível." },
      { name: "Vasitva", description: "Domínio sobre os elementos e forças da natureza." },
      { name: "Ishitva", description: "Senhorio cósmico parcial; poder de criar/destruir formas menores." },
    ],
  },
  {
    level: 2,
    emoji: "🌿",
    title: "NÍVEL 2 – Siddhis Psíquicos e Vitais",
    subtitle: "Corpo Etérico/Astral",
    description: "Controle sobre energia vital, emoções, tempo e percepção",
    source: "Yoga Sutras (Cap. III – Vibhuti Pada), Teosofia Esotérica (Blavatsky)",
    siddhis: [
      { name: "Tri-kala-jñatvam", description: "Conhecimento do passado, presente e futuro." },
      { name: "Para-chitta-ādi-abhijñatā", description: "Leitura de mentes alheias." },
      { name: "Sva-chitta-vikrama-darshanam", description: "Visão dos conteúdos subconscientes próprios." },
      { name: "Kama-rupanuvidhana", description: "Assumir qualquer forma desejada (ilusão controlada)." },
      { name: "Adarsha-darshana", description: "Ver eventos distantes como num espelho (visão remota)." },
      { name: "Shrotra-akramana", description: "Audição de sons sutis (césmicos, angélicos, pensamentos)." },
      { name: "Dura-shravana / Dura-darshana", description: "Audição e visão à distância (clarividência/clariaudiência)." },
      { name: "Jñanajyoti", description: "Corpo emitindo luz própria (aura visível)." },
      { name: "Agnistambha", description: "Imunidade ao fogo." },
      { name: "Apastambha", description: "Imunidade à água (caminhar sobre ela, não afogar)." },
      { name: "Vayustambha", description: "Controle do ar (respiração suspensa, domínio do prana)." },
    ],
  },
  {
    level: 3,
    emoji: "🌌",
    title: "NÍVEL 3 – Siddhis Mentais e Causais",
    subtitle: "Corpo Mental e Intuição",
    description: "Domínio da mente, tempo, karma e realidades sutis",
    source: "Yoga Sutras 3.26–3.52, The Inner Life (Leadbeater)",
    siddhis: [
      { name: "Karma-jñāna", description: "Conhecimento do próprio karma e do alheio." },
      { name: "Mano-javitvam", description: "Velocidade mental igual à do pensamento (teletransporte consciente)." },
      { name: "Chandra-arka-siddhi", description: "Absorver energia solar/lunar diretamente." },
      { name: "Paroksha-prajñā", description: "Sabedoria sem necessidade de estudo (conhecimento direto)." },
      { name: "Yatha-sankalpa-upasthiti", description: "Manifestação instantânea pelo pensamento puro." },
      { name: "Sattva-purusha-anupashakti", description: "Percepção direta da alma (Purusha) separada da matéria (Prakriti)." },
      { name: "Samyama sobre os elementos", description: "Dissolução/recriação de formas materiais." },
      { name: "Samyama sobre os sentidos", description: "Liberdade total da dependência sensorial." },
    ],
  },
  {
    level: 4,
    emoji: "☀️",
    title: "NÍVEL 4 – Siddhis Espirituais Superiores",
    subtitle: "União com o Divino",
    description: "Não são 'poderes', mas estados de ser iluminado",
    source: "Tradições Yóguicas e Teosóficas",
    siddhis: [
      { name: "Kaivalya", description: "Libertação absoluta; consciência pura além de gunas." },
      { name: "Ahamkara-nasha", description: "Dissolução do ego; identidade com o Todo." },
      { name: "Sahaja-samadhi", description: "Samadhi contínuo mesmo durante a atividade diária." },
      { name: "Jivanmukti", description: "Liberação em vida; morte do desejo e medo." },
      { name: "Sarvajñatva", description: "Onisciência não dual (não 'saber tudo', mas ser o conhecimento)." },
      { name: "Sarva-kartrtva", description: "Ação universal sem agente individual (Deus age através de você)." },
      { name: "Anima Mundi Perception", description: "Percepção direta da Alma do Mundo." },
      { name: "Hierarquia de Luz", description: "Comunhão consciente com Mestres Ascensos e Logos Planetário." },
    ],
  },
];

const Siddhis = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-category-spiritual/5 blur-[100px] rounded-full" />
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
                <div className="p-2 bg-category-spiritual/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-category-spiritual" />
                </div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  Siddhis
                </h1>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <p className="text-muted-foreground mb-8 text-center">
            Lista de poderes e estados espirituais descritos nas tradições yóguicas
          </p>
          
          <div className="space-y-8">
            {siddhisData.map((level) => (
              <section key={level.level} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{level.emoji}</span>
                    <div>
                      <h2 className="font-display text-lg font-bold text-foreground">
                        {level.title}
                      </h2>
                      <p className="text-sm text-category-spiritual">{level.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{level.description}</p>
                </div>
                
                <div className="p-4 space-y-3">
                  {level.siddhis.map((siddhi, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                      <Star className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground">{siddhi.name}</p>
                        <p className="text-sm text-muted-foreground">{siddhi.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-4 pb-4">
                  <p className="text-xs text-muted-foreground/70 italic">
                    Fonte: {level.source}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Siddhis;
