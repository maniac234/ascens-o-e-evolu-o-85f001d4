import Logo from "./Logo";
import { Settings } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { DailyLog } from "@/types/missions";

interface HeaderProps {
  logs?: DailyLog[];
}

const Header = ({ logs = [] }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="flex items-center gap-2">
            <NotificationDropdown logs={logs} />
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
