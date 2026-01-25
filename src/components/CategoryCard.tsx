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
  physical: "from-category-physical/20 to-category-physical/5 border-category-physical/30 hover:border-category-physical/60",
  energetic: "from-category-energetic/20 to-category-energetic/5 border-category-energetic/30 hover:border-category-energetic/60",
  emotional: "from-category-emotional/20 to-category-emotional/5 border-category-emotional/30 hover:border-category-emotional/60",
  mental: "from-category-mental/20 to-category-mental/5 border-category-mental/30 hover:border-category-mental/60",
  spiritual: "from-category-spiritual/20 to-category-spiritual/5 border-category-spiritual/30 hover:border-category-spiritual/60",
  intraphysical: "from-category-intraphysical/20 to-category-intraphysical/5 border-category-intraphysical/30 hover:border-category-intraphysical/60",
};

const iconStyles = {
  physical: "bg-category-physical/20 text-category-physical",
  energetic: "bg-category-energetic/20 text-category-energetic",
  emotional: "bg-category-emotional/20 text-category-emotional",
  mental: "bg-category-mental/20 text-category-mental",
  spiritual: "bg-category-spiritual/20 text-category-spiritual",
  intraphysical: "bg-category-intraphysical/20 text-category-intraphysical",
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
        "w-full p-5 rounded-xl border bg-gradient-to-br transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50",
        categoryStyles[category]
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-lg", iconStyles[category])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Pontos</p>
          <p className="font-display text-xl font-bold text-primary">{points}</p>
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-foreground mb-1 text-left">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 text-left">{description}</p>

      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Missões</span>
          <span className="text-foreground">{completedMissions}/{totalMissions}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all duration-500", progressStyles[category])}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </button>
  );
};

export default CategoryCard;
