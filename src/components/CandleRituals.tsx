import { useState } from "react";
import { CANDLE_RITUALS, CandleColor, CandleIntention } from "@/types/missions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Flame, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CandleRitualsProps {
  completedRituals: CandleIntention[];
  onComplete: (color: CandleColor, intention: string) => void;
}

const CandleRituals = ({ completedRituals, onComplete }: CandleRitualsProps) => {
  const [selectedCandle, setSelectedCandle] = useState<CandleColor | null>(null);
  const [intention, setIntention] = useState("");
  
  const isCompleted = (color: CandleColor) => 
    completedRituals.some(r => r.color === color);
  
  const handleComplete = () => {
    if (selectedCandle && intention.trim()) {
      onComplete(selectedCandle, intention.trim());
      setSelectedCandle(null);
      setIntention("");
    }
  };
  
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Flame className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Rituais com Velas
          </h3>
          <p className="text-sm text-muted-foreground">
            +50 pontos por ritual • Registre suas intenções
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CANDLE_RITUALS.map((ritual) => {
          const completed = isCompleted(ritual.color);
          
          return (
            <motion.button
              key={ritual.color}
              whileHover={!completed ? { scale: 1.05 } : {}}
              whileTap={!completed ? { scale: 0.95 } : {}}
              onClick={() => !completed && setSelectedCandle(ritual.color)}
              disabled={completed}
              className={`
                p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-2
                ${completed 
                  ? 'border-primary/50 bg-primary/10 cursor-default' 
                  : 'border-border bg-card hover:border-primary/50'
                }
              `}
            >
              <div className={`w-8 h-12 rounded-t-full ${ritual.colorClass} shadow-lg relative`}>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-3 bg-orange-400 rounded-full animate-pulse" />
              </div>
              <span className="text-xs font-medium text-center">{ritual.name}</span>
              {completed && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Intention Dialog */}
      <Dialog open={selectedCandle !== null} onOpenChange={() => setSelectedCandle(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display">
              Registrar Intenção - {CANDLE_RITUALS.find(r => r.color === selectedCandle)?.name}
            </DialogTitle>
          </DialogHeader>
          
          <Textarea
            placeholder="Escreva seus decretos ou intenções para este ritual..."
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            className="min-h-[120px]"
          />
          
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedCandle(null)}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleComplete} disabled={!intention.trim()}>
              <Check className="w-4 h-4 mr-2" />
              Completar (+50 pts)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandleRituals;
