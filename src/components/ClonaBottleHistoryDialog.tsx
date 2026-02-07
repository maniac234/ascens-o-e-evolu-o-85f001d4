import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Droplets, Calendar } from "lucide-react";
import { ClonaBottleCompletion } from "@/hooks/useClonaBottleHistory";

interface ClonaBottleHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: ClonaBottleCompletion[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(isoStr: string): string {
  const date = new Date(isoStr);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ClonaBottleHistoryDialog = ({ open, onOpenChange, history }: ClonaBottleHistoryDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-purple-400" />
            Vidros de Clona Finalizados
          </DialogTitle>
        </DialogHeader>

        {history.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Droplets className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Nenhum vidro finalizado ainda.</p>
          </div>
        ) : (
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 pr-4">
              {history.map((completion, index) => (
                <div
                  key={completion.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">
                    {history.length - index}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {formatDate(completion.dateKey)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Concluído às {formatTime(completion.completedAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Total: <span className="font-bold text-foreground">{history.length}</span> vidro{history.length !== 1 ? "s" : ""} finalizado{history.length !== 1 ? "s" : ""}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClonaBottleHistoryDialog;
