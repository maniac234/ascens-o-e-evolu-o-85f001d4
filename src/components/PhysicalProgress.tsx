import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PersonStanding, Target } from "lucide-react";
import { motion } from "framer-motion";

interface PhysicalProgressProps {
  runningKm: number;
  punches: number;
  onUpdateRunning: (km: number) => void;
  onUpdatePunches: (count: number) => void;
}

const PhysicalProgress = ({
  runningKm,
  punches,
  onUpdateRunning,
  onUpdatePunches,
}: PhysicalProgressProps) => {
  const [runningInput, setRunningInput] = useState(runningKm.toString());
  const [punchesInput, setPunchesInput] = useState(punches.toString());
  
  const handleRunningSubmit = () => {
    const value = parseFloat(runningInput) || 0;
    onUpdateRunning(Math.min(5, Math.max(0, value)));
  };
  
  const handlePunchesSubmit = () => {
    const value = parseInt(punchesInput) || 0;
    onUpdatePunches(Math.min(1000, Math.max(0, value)));
  };
  
  return (
    <div className="space-y-6 p-4 bg-card border border-border rounded-xl">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Autodesenvolvimento Físico
      </h3>
      
      {/* Running Progress */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-category-physical/20 rounded-lg">
            <PersonStanding className="w-5 h-5 text-category-physical" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Corrida</span>
              <span className="text-sm text-muted-foreground">{runningKm} / 5 km</span>
            </div>
            <Progress value={(runningKm / 5) * 100} className="h-3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="km"
            value={runningInput}
            onChange={(e) => setRunningInput(e.target.value)}
            className="flex-1"
            min={0}
            max={5}
            step={0.1}
          />
          <Button onClick={handleRunningSubmit} variant="secondary" size="sm">
            Atualizar
          </Button>
        </div>
      </motion.div>
      
      {/* Punches Progress */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-category-physical/20 rounded-lg">
            <Target className="w-5 h-5 text-category-physical" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Socos</span>
              <span className="text-sm text-muted-foreground">{punches} / 1000</span>
            </div>
            <Progress value={(punches / 1000) * 100} className="h-3" />
          </div>
        </div>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="quantidade"
            value={punchesInput}
            onChange={(e) => setPunchesInput(e.target.value)}
            className="flex-1"
            min={0}
            max={1000}
          />
          <Button onClick={handlePunchesSubmit} variant="secondary" size="sm">
            Atualizar
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PhysicalProgress;
