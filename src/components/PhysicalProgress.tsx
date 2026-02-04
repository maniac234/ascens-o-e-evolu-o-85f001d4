import { Slider } from "@/components/ui/slider";
import { PersonStanding, Target, Droplets } from "lucide-react";
import { motion } from "framer-motion";

interface PhysicalProgressProps {
  runningKm: number;
  punches: number;
  clonaDrops?: number;
  onUpdateRunning: (km: number) => void;
  onUpdatePunches: (count: number) => void;
  onUpdateClonaDrops?: (count: number) => void;
}

const PhysicalProgress = ({
  runningKm,
  punches,
  clonaDrops = 0,
  onUpdateRunning,
  onUpdatePunches,
  onUpdateClonaDrops,
}: PhysicalProgressProps) => {
  return (
    <div className="space-y-6 p-4 sm:p-6 bg-card border border-border rounded-xl">
      <h3 className="font-display text-lg font-semibold text-foreground">
        Autodesenvolvimento Físico
      </h3>
      
      {/* Stats Grid - Responsive for tablet */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {/* Running Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3 sm:flex-col sm:items-start">
            <div className="p-2 bg-category-physical/20 rounded-lg">
              <PersonStanding className="w-5 h-5 text-category-physical" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium">Corrida</span>
                <span className="text-sm text-primary font-semibold">{runningKm.toFixed(1)} / 5 km</span>
              </div>
              <Slider
                value={[runningKm]}
                onValueChange={(value) => onUpdateRunning(value[0])}
                max={5}
                min={0}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Punches Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3 sm:flex-col sm:items-start">
            <div className="p-2 bg-category-physical/20 rounded-lg">
              <Target className="w-5 h-5 text-category-physical" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-3">
                <span className="text-sm font-medium">Socos</span>
                <span className="text-sm text-primary font-semibold">{punches} / 1000</span>
              </div>
              <Slider
                value={[punches]}
                onValueChange={(value) => onUpdatePunches(value[0])}
                max={1000}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Clona Drops Progress */}
        {onUpdateClonaDrops && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-start">
              <div className="p-2 bg-category-astralBody/20 rounded-lg">
                <Droplets className="w-5 h-5 text-category-astralBody" />
              </div>
              <div className="flex-1 w-full">
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
        )}
      </div>
    </div>
  );
};

export default PhysicalProgress;
