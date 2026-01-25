import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  points: number;
  completedMissions: number;
  totalMissions: number;
  category: "physical" | "energetic" | "emotional" | "mental" | "spiritual" | "intraphysical";
  onClick?: () => void;
}

const categoryStyles = {
  physical: "bg-category-physical/10 border-category-physical/30 hover:bg-category-physical/20",
  energetic: "bg-category-energetic/10 border-category-energetic/30 hover:bg-category-energetic/20",
  emotional: "bg-category-emotional/10 border-category-emotional/30 hover:bg-category-emotional/20",
  mental: "bg-category-mental/10 border-category-mental/30 hover:bg-category-mental/20",
  spiritual: "bg-category-spiritual/10 border-category-spiritual/30 hover:bg-category-spiritual/20",
  intraphysical: "bg-category-intraphysical/10 border-category-intraphysical/30 hover:bg-category-intraphysical/20",
};

const iconStyles = {
  physical: "text-category-physical",
  energetic: "text-category-energetic",
  emotional: "text-category-emotional",
  mental: "text-category-mental",
  spiritual: "text-category-spiritual",
  intraphysical: "text-category-intraphysical",
};

const progressStyles = {
  physical: "bg-category-physical",
  energetic: "bg-category-energetic",
  emotional: "bg-category-emotional",
  mental: "bg-category-mental",
  spiritual: "bg-category-spiritual",
  intraphysical: "bg-category-intraphysical",
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
