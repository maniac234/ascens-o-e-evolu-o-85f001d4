import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Settings, Plus, Droplets } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import AddTaskDialog from "./AddTaskDialog";
import ClonaBottleHistoryDialog from "./ClonaBottleHistoryDialog";
import { DailyLog, Category } from "@/types/missions";
import { ClonaBottleCompletion } from "@/hooks/useClonaBottleHistory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  logs?: DailyLog[];
  onAddCustomTask?: (task: { title: string; points: number; category: Category }) => void;
  clonaBottleHistory?: ClonaBottleCompletion[];
}

const Header = ({ logs = [], onAddCustomTask, clonaBottleHistory = [] }: HeaderProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showClonaHistory, setShowClonaHistory] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-2">
            <NotificationDropdown logs={logs} />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border border-border z-50">
                <DropdownMenuItem onClick={() => setShowAddDialog(true)} className="cursor-pointer">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Nova Tarefa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowClonaHistory(true)} className="cursor-pointer">
                  <Droplets className="w-4 h-4 mr-2 text-category-spiritual" />
                  Vidros de Clona Finalizados
                  {clonaBottleHistory.length > 0 && (
                    <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                      {clonaBottleHistory.length}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/insights" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {onAddCustomTask && (
        <AddTaskDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddTask={onAddCustomTask}
        />
      )}

      <ClonaBottleHistoryDialog
        open={showClonaHistory}
        onOpenChange={setShowClonaHistory}
        history={clonaBottleHistory}
      />
    </header>
  );
};

export default Header;
