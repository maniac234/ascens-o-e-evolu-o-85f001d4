import { Trophy, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface DailyPointsCounterProps {
  points: number;
}

const DailyPointsCounter = ({ points }: DailyPointsCounterProps) => {
  const isPositive = points >= 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl p-4 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isPositive ? 'bg-primary/20' : 'bg-destructive/20'}`}>
            {isPositive ? (
              <TrendingUp className="w-5 h-5 text-primary" />
            ) : (
              <TrendingDown className="w-5 h-5 text-destructive" />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pontos Hoje</p>
            <p className={`font-display text-2xl font-bold ${isPositive ? 'text-primary' : 'text-destructive'}`}>
              {isPositive ? '+' : ''}{points}
            </p>
          </div>
        </div>
        <Trophy className="w-8 h-8 text-primary/30" />
      </div>
    </motion.div>
  );
};

export default DailyPointsCounter;
