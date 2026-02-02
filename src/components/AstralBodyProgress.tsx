import { useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Ghost, Droplets, BookOpen, Plus, Save } from "lucide-react";
import { motion } from "framer-motion";
import { AstralBodyInsight } from "@/types/missions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AstralBodyProgressProps {
  clonaDrops: number;
  insights: AstralBodyInsight[];
  onUpdateClonaDrops: (count: number) => void;
  onAddInsight: (content: string) => void;
}

const AstralBodyProgress = ({
  clonaDrops,
  insights,
  onUpdateClonaDrops,
  onAddInsight,
}: AstralBodyProgressProps) => {
  const [insightText, setInsightText] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmitInsight = () => {
    if (insightText.trim()) {
      onAddInsight(insightText.trim());
      setInsightText("");
      setDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6 p-4 bg-card border border-border rounded-xl">
      <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
        <Ghost className="w-5 h-5 text-category-astralBody" />
        Corpo Astral
      </h3>
      
      {/* Clona Drops Slider */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-category-astralBody/20 rounded-lg">
            <Droplets className="w-5 h-5 text-category-astralBody" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-3">
              <span className="text-sm font-medium">Gotas de Clona</span>
              <span className="text-sm text-primary font-semibold">{clonaDrops} / 50</span>
            </div>
            <Slider
              value={[clonaDrops]}
              onValueChange={(value) => onUpdateClonaDrops(value[0])}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Link to Astral Mechanisms */}
      <Link 
        to="/astral-mechanisms" 
        className="flex items-center gap-3 p-3 rounded-lg bg-category-astralBody/10 border border-category-astralBody/30 hover:bg-category-astralBody/20 transition-colors"
      >
        <BookOpen className="w-5 h-5 text-category-astralBody" />
        <div>
          <span className="font-medium text-sm">Mecanismos Astrais</span>
          <p className="text-xs text-muted-foreground">Tipos de matéria astral, vairagya e ascensão</p>
        </div>
      </Link>

      {/* Add Insight Button */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full gap-2 border-category-astralBody/30 hover:bg-category-astralBody/10">
            <Plus className="w-4 h-4" />
            Registrar Insight de Sentimentos
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Insight Astral</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Registre insights sobre novos sentimentos, padrões internos, matéria astral..."
              value={insightText}
              onChange={(e) => setInsightText(e.target.value)}
              className="min-h-[150px]"
            />
            <Button onClick={handleSubmitInsight} className="w-full gap-2">
              <Save className="w-4 h-4" />
              Salvar Insight
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Recent Insights */}
      {insights.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Insights Recentes</h4>
          {insights.slice(0, 3).map((insight) => (
            <div key={insight.id} className="p-3 rounded-lg bg-muted/50 text-sm">
              <p className="line-clamp-2">{insight.content}</p>
              <span className="text-xs text-muted-foreground mt-1 block">
                {new Date(insight.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AstralBodyProgress;
