import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/types/missions";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  points: number;
  completedMissions: number;
  totalMissions: number;
  category: Category;
  onClick?: () => void;
}

const categoryStyles: Record<Category, string> = {
  physical: "bg-category-physical/10 border-category-physical/30 hover:bg-category-physical/20",
  energetic: "bg-category-energetic/10 border-category-energetic/30 hover:bg-category-energetic/20",
  astralBody: "bg-category-astralBody/10 border-category-astralBody/30 hover:bg-category-astralBody/20",
  mental: "bg-category-mental/10 border-category-mental/30 hover:bg-category-mental/20",
  spiritual: "bg-category-spiritual/10 border-category-spiritual/30 hover:bg-category-spiritual/20",
  intraphysical: "bg-category-intraphysical/10 border-category-intraphysical/30 hover:bg-category-intraphysical/20",
  practices: "bg-category-practices/10 border-category-practices/30 hover:bg-category-practices/20",
  candles: "bg-category-candles/10 border-category-candles/30 hover:bg-category-candles/20",
  astral: "bg-category-astral/10 border-category-astral/30 hover:bg-category-astral/20",
};

const iconStyles: Record<Category, string> = {
  physical: "text-category-physical",
  energetic: "text-category-energetic",
  astralBody: "text-category-astralBody",
  mental: "text-category-mental",
  spiritual: "text-category-spiritual",
  intraphysical: "text-category-intraphysical",
  practices: "text-category-practices",
  candles: "text-category-candles",
  astral: "text-category-astral",
};

const progressStyles: Record<Category, string> = {
  physical: "bg-category-physical",
  energetic: "bg-category-energetic",
  astralBody: "bg-category-astralBody",
  mental: "bg-category-mental",
  spiritual: "bg-category-spiritual",
  intraphysical: "bg-category-intraphysical",
  practices: "bg-category-practices",
  candles: "bg-category-candles",
  astral: "bg-category-astral",
};

const CategoryCard = ({
  title,
  description,
  icon: Icon,
  points,
  completedMissions,
  totalMissions,
  category,
  onClick,
}: CategoryCardProps) => {
  const progress = totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-300",
        "hover:scale-[1.02] active:scale-[0.98]",
        categoryStyles[category]
      )}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={cn("p-2 sm:p-3 rounded-lg bg-background/50", iconStyles[category])}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base sm:text-lg font-semibold text-foreground truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>
          
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
              <span className="text-muted-foreground">
                {completedMissions}/{totalMissions} missões
              </span>
              <span className="text-primary font-semibold">{points} pts</span>
            </div>
            <div className="h-1.5 sm:h-2 bg-background/50 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", progressStyles[category])}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
