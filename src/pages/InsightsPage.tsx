import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Flame, Ghost, Edit2, Save, Trash2, X } from "lucide-react";
import Header from "@/components/Header";
import { useDailyLog } from "@/hooks/useDailyLog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CANDLE_RITUALS } from "@/types/missions";

const InsightsPage = () => {
  const { getSortedLogs, getAllInsights, updateCandleIntention, updateAstralBodyInsight } = useDailyLog();
  const logs = getSortedLogs();
  const allInsights = getAllInsights();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const candleInsights = allInsights.filter(i => i.type === 'candle');
  const astralBodyInsights = allInsights.filter(i => i.type === 'astralBody');

  const startEditing = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const saveEdit = (type: 'candle' | 'astralBody') => {
    if (editingId && editContent.trim()) {
      if (type === 'candle') {
        updateCandleIntention(editingId, editContent.trim());
      } else {
        updateAstralBodyInsight(editingId, editContent.trim());
      }
      setEditingId(null);
      setEditContent("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const getCandleColor = (color: string) => {
    const ritual = CANDLE_RITUALS.find(r => r.color === color);
    return ritual?.colorClass || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header logs={logs} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </Link>

        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Meus Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Acesse e edite suas anotações de rituais e corpo astral
          </p>
        </div>

        <Tabs defaultValue="candles" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="candles" className="gap-2">
              <Flame className="w-4 h-4" />
              Rituais de Velas
            </TabsTrigger>
            <TabsTrigger value="astralBody" className="gap-2">
              <Ghost className="w-4 h-4" />
              Corpo Astral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candles" className="space-y-4">
            {candleInsights.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Flame className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum insight de ritual registrado</p>
              </div>
            ) : (
              candleInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full ${getCandleColor(insight.color || '')}`} />
                    <div className="flex-1">
                      {editingId === insight.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => saveEdit('candle')} className="gap-1">
                              <Save className="w-3 h-3" />
                              Salvar
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit} className="gap-1">
                              <X className="w-3 h-3" />
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm">{insight.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {new Date(insight.date).toLocaleDateString('pt-BR')}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEditing(insight.id, insight.content)}
                              className="gap-1 h-7"
                            >
                              <Edit2 className="w-3 h-3" />
                              Editar
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="astralBody" className="space-y-4">
            {astralBodyInsights.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Ghost className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum insight de corpo astral registrado</p>
              </div>
            ) : (
              astralBodyInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  {editingId === insight.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveEdit('astralBody')} className="gap-1">
                          <Save className="w-3 h-3" />
                          Salvar
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="gap-1">
                          <X className="w-3 h-3" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm">{insight.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {new Date(insight.date).toLocaleDateString('pt-BR')}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEditing(insight.id, insight.content)}
                          className="gap-1 h-7"
                        >
                          <Edit2 className="w-3 h-3" />
                          Editar
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default InsightsPage;
