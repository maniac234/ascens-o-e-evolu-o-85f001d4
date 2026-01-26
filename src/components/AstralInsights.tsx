import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Moon, Sparkles, Save } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface AstralInsightsProps {
  insights: string[];
  onAddInsight: (insight: string) => void;
}

const AstralInsights = ({ insights, onAddInsight }: AstralInsightsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentInsight, setCurrentInsight] = useState("");
  
  const handleSave = () => {
    if (currentInsight.trim()) {
      onAddInsight(currentInsight.trim());
      setCurrentInsight("");
      setIsOpen(false);
    }
  };
  
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-category-spiritual/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-category-spiritual" />
          </div>
          <div className="text-left flex-1">
            <p className="font-medium">Mecanismos a Serem Analisados</p>
            <p className="text-sm text-muted-foreground">
              Registre insights e padrões internos
            </p>
          </div>
          {insights.length > 0 && (
            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
              {insights.length} registro(s)
            </span>
          )}
        </div>
      </motion.button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display flex items-center gap-2">
              <Moon className="w-5 h-5 text-category-spiritual" />
              Mecanismos a Serem Analisados
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Registre insights recebidos no plano astral relacionados à melhoria pessoal, 
              padrões internos ou aperfeiçoamento espiritual.
            </p>
            
            <Textarea
              placeholder="Descreva os mecanismos, padrões ou insights observados..."
              value={currentInsight}
              onChange={(e) => setCurrentInsight(e.target.value)}
              className="min-h-[150px]"
            />
            
            {insights.length > 0 && (
              <div className="max-h-40 overflow-y-auto space-y-2">
                <p className="text-xs text-muted-foreground">Registros anteriores hoje:</p>
                {insights.map((insight, idx) => (
                  <div key={idx} className="p-2 bg-muted/30 rounded text-sm">
                    {insight}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={handleSave} disabled={!currentInsight.trim()}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Registro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AstralInsights;
