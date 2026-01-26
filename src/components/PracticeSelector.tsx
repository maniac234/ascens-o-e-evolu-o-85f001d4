import { AlertTriangle, Check } from "lucide-react";
import { motion } from "framer-motion";

interface PracticeSelectorProps {
  selectedPractice: "practice1" | "practice2" | "practice3" | null;
  onSelect: (practice: "practice1" | "practice2" | "practice3") => void;
}

const practices = [
  { id: "practice1" as const, name: "Prática 1", penalty: -40 },
  { id: "practice2" as const, name: "Prática 2", penalty: -90 },
  { id: "practice3" as const, name: "Prática 3", penalty: -150 },
];

const PracticeSelector = ({ selectedPractice, onSelect }: PracticeSelectorProps) => {
  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-destructive/20 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            Práticas Diárias
          </h3>
          <p className="text-sm text-muted-foreground">
            Escolha apenas uma por dia (aplica penalidade)
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {practices.map((practice) => {
          const isSelected = selectedPractice === practice.id;
          const isDisabled = selectedPractice !== null && !isSelected;
          
          return (
            <motion.button
              key={practice.id}
              whileHover={!isDisabled ? { scale: 1.02 } : {}}
              whileTap={!isDisabled ? { scale: 0.98 } : {}}
              onClick={() => !isDisabled && !isSelected && onSelect(practice.id)}
              disabled={isDisabled}
              className={`
                p-4 rounded-xl border transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-destructive bg-destructive/10' 
                  : isDisabled
                    ? 'border-border bg-muted/30 opacity-50 cursor-not-allowed'
                    : 'border-border bg-card hover:border-destructive/50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${isSelected 
                      ? 'border-destructive bg-destructive' 
                      : 'border-muted-foreground'
                    }
                  `}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium">{practice.name}</span>
                </div>
                <span className="text-destructive font-bold">
                  {practice.penalty} pts
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      {selectedPractice === null && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Se não selecionar até às 4h, será registrado como "não realizada"
        </p>
      )}
    </div>
  );
};

export default PracticeSelector;
