import { Check, Circle, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/types/missions";

interface MissionItemProps {
  title: string;
  points: number;
  completed: boolean;
  category: Category;
  onToggle?: () => void;
}

const categoryBorder: Record<Category, string> = {
  physical: "border-category-physical/30",
  energetic: "border-category-energetic/30",
  astralBody: "border-category-astralBody/30",
  mental: "border-category-mental/30",
  spiritual: "border-category-spiritual/30",
  intraphysical: "border-category-intraphysical/30",
  practices: "border-category-practices/30",
  candles: "border-category-candles/30",
  astral: "border-category-astral/30",
};

const categoryCheck: Record<Category, string> = {
  physical: "bg-category-physical text-background",
  energetic: "bg-category-energetic text-background",
  astralBody: "bg-category-astralBody text-background",
  mental: "bg-category-mental text-background",
  spiritual: "bg-category-spiritual text-background",
  intraphysical: "bg-category-intraphysical text-background",
  practices: "bg-category-practices text-background",
  candles: "bg-category-candles text-background",
  astral: "bg-category-astral text-background",
};

const MissionItem = ({ title, points, completed, category, onToggle }: MissionItemProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-lg border bg-card/50 transition-all duration-200",
        "hover:bg-card hover:scale-[1.01]",
        categoryBorder[category],
        completed && "opacity-70"
      )}
    >
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all",
          completed
            ? categoryCheck[category]
            : "border-muted-foreground/30"
        )}
      >
        {completed && <Check className="w-4 h-4" />}
      </div>

      <span
        className={cn(
          "flex-1 text-left text-sm",
          completed ? "line-through text-muted-foreground" : "text-foreground"
        )}
      >
        {title}
      </span>

      <div className={`flex items-center gap-1 ${points < 0 ? 'text-red-500' : 'text-primary'}`}>
        <Star className="w-4 h-4" />
        <span className="font-display text-sm font-semibold">{points > 0 ? '+' : ''}{points}</span>
      </div>
    </button>
  );
};

export default MissionItem;
