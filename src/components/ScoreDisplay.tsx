import { Trophy } from "lucide-react";

interface ScoreDisplayProps {
   lifetimePoints: number;
  level: number;
}

 const ScoreDisplay = ({ lifetimePoints, level }: ScoreDisplayProps) => {
  const nextLevelPoints = level * 1000;
   const progress = (lifetimePoints % 1000) / 10;

  return (
    <div className="bg-card rounded-xl p-6 card-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/20">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Nível Atual</p>
            <p className="font-display text-2xl font-bold text-primary">{level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Pontos Totais</p>
           <p className="font-display text-3xl font-bold text-gradient-gold">{lifetimePoints.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso para o próximo nível</span>
          <span className="text-primary">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-gold rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-right">
         {(lifetimePoints % 1000).toLocaleString()} / 1.000 pontos
        </p>
      </div>
    </div>
  );
};

export default ScoreDisplay;
