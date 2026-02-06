import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/missions";
import { Category } from "@/types/missions";
import { Plus } from "lucide-react";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: { title: string; points: number; category: Category }) => void;
}

const AddTaskDialog = ({ open, onOpenChange, onAddTask }: AddTaskDialogProps) => {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !points || !category) return;

    onAddTask({
      title: title.trim(),
      points: parseInt(points, 10),
      category: category as Category,
    });

    // Reset form
    setTitle("");
    setPoints("");
    setCategory("");
    onOpenChange(false);
  };

  const availableCategories = categories.filter(
    c => !["practices", "candles"].includes(c.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" />
            Adicionar Nova Tarefa
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nome da Tarefa</Label>
            <Input
              id="title"
              placeholder="Ex: Yoga matinal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Pontuação</Label>
            <Input
              id="points"
              type="number"
              placeholder="Ex: 50"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              min={-200}
              max={500}
            />
            <p className="text-xs text-muted-foreground">
              Use valores negativos para penalidades
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border z-50">
                {availableCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="w-4 h-4" />
                      <span>{cat.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !points || !category}
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
