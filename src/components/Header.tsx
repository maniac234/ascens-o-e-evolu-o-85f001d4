import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Settings, Plus } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import AddTaskDialog from "./AddTaskDialog";
import { DailyLog, Category } from "@/types/missions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  logs?: DailyLog[];
  onAddCustomTask?: (task: { title: string; points: number; category: Category }) => void;
}

const Header = ({ logs = [], onAddCustomTask }: HeaderProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

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
    </header>
  );
};

export default Header;
