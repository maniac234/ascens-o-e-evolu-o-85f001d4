import { useState } from "react";
import { Bell, X, BarChart3, Calendar } from "lucide-react";
import { DailyLog } from "@/types/missions";
import DailyLogDisplay from "./DailyLogDisplay";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NotificationDropdownProps {
  logs: DailyLog[];
}

const NotificationDropdown = ({ logs }: NotificationDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {logs.length > 0 && logs[0]?.completedMissions?.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-80 sm:w-96 max-h-[70vh] overflow-hidden bg-card border-border z-50"
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold">Logs & Estatísticas</h3>
            <Link to="/statistics">
              <Button variant="ghost" size="sm" className="text-primary">
                <BarChart3 className="w-4 h-4 mr-2" />
                Ver Gráficos
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-3">
          <DailyLogDisplay logs={logs.slice(0, 5)} maxDisplay={5} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
