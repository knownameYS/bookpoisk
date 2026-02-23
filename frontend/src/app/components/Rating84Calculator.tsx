import { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  Building2, 
  Users, 
  BookText, 
  Lightbulb, 
  Sparkles,
  Info
} from "lucide-react";
import { calculateRating84, getVibeLabel, type Criteria } from "../utils/rating84";
import Rating84Display from "./Rating84Display";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface Rating84CalculatorProps {
  bookId: string;
  onSave?: (criteria: Criteria, finalScore: number) => void;
  savedRating?: Criteria;
}

const criteriaInfo = [
  {
    key: "architecture" as keyof Criteria,
    label: "Architecture",
    nameRu: "Архитектура нарратива",
    description: "Построение сюжета, структура",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    key: "characters" as keyof Criteria,
    label: "Characters",
    nameRu: "Палитра героев",
    description: "Глубина и развитие персонажей",
    icon: Users,
    color: "text-purple-600",
  },
  {
    key: "language" as keyof Criteria,
    label: "Language",
    nameRu: "Материя слова",
    description: "Качество стиля и языка",
    icon: BookText,
    color: "text-emerald-600",
  },
  {
    key: "idea" as keyof Criteria,
    label: "Idea",
    nameRu: "Сила концепции",
    description: "Глубина и оригинальность идеи",
    icon: Lightbulb,
    color: "text-amber-600",
  },
  {
    key: "vibe" as keyof Criteria,
    label: "Vibe",
    nameRu: "Атмосфера",
    description: "Ваше личное вовлечение, настроение",
    icon: Sparkles,
    color: "text-pink-600",
  },
];

export default function Rating84Calculator({ 
  bookId, 
  onSave,
  savedRating 
}: Rating84CalculatorProps) {
  const [criteria, setCriteria] = useState<Criteria>(
    savedRating || {
      architecture: 7,
      characters: 7,
      language: 7,
      idea: 7,
      vibe: 7,
    }
  );

  const [isSaved, setIsSaved] = useState(!!savedRating);

  const result = calculateRating84(criteria);

  const handleSliderChange = (key: keyof Criteria, value: number[]) => {
    setCriteria((prev) => ({
      ...prev,
      [key]: value[0],
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    onSave?.(criteria, result.finalScore);
    setIsSaved(true);
  };

  const handleReset = () => {
    setCriteria({
      architecture: 7,
      characters: 7,
      language: 7,
      idea: 7,
      vibe: 7,
    });
    setIsSaved(false);
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-2">
          <h2 className="text-2xl font-bold">Рассчитайте рейтинг по системе "84"</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-5 h-5 text-gray-400 cursor-help mt-1" />
              </TooltipTrigger>
              <TooltipContent className="max-w-sm">
                <p>
                  Система "84" разделяет объективные критерии мастерства (Architecture, 
                  Characters, Language, Idea) и субъективное впечатление (Vibe). 
                  Базовый балл рассчитывается по формуле: (A+C+L+I)×1.4, 
                  затем умножается на множитель атмосферы.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-gray-600">
          Оцените объективные критерии (1-10) и субъективную атмосферу. 
          Алгоритм рассчитает итоговый балл.
        </p>
      </div>

      <div className="space-y-6 mb-6">
        {criteriaInfo.map((info) => {
          const Icon = info.icon;
          const value = criteria[info.key];
          
          return (
            <div key={info.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${info.color}`} />
                  <Label className="font-semibold">
                    {info.label} — {info.nameRu}
                  </Label>
                </div>
                <span className="text-sm font-bold text-gray-700 min-w-[2rem] text-right">
                  {value}
                </span>
              </div>
              <p className="text-sm text-gray-500 ml-7">{info.description}</p>
              <div className="ml-7">
                <Slider
                  value={[value]}
                  onValueChange={(val) => handleSliderChange(info.key, val)}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                {info.key === "vibe" && (
                  <p className="text-xs text-gray-500 mt-1">
                    {getVibeLabel(value)} (множитель: {result.vibeMultiplier.toFixed(2)})
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Динамический расчет */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4 text-lg">Динамический расчет</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">
              Базовый балл: ({criteria.architecture} + {criteria.characters} + {criteria.language} + {criteria.idea}) × 1.4
            </span>
            <span className="font-bold text-indigo-600">
              {result.baseScore} / 56
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-700">
              Множитель Vibe ({criteria.vibe})
            </span>
            <span className="font-bold text-purple-600">
              × {result.vibeMultiplier.toFixed(2)}
            </span>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-900">
                Итоговый рейтинг:
              </span>
            </div>
            <div className="flex justify-center">
              <Rating84Display score={result.finalScore} size="lg" />
            </div>
          </div>

          <div className="bg-white/70 rounded p-3 mt-3">
            <p className="text-sm text-center text-gray-700">
              {result.interpretation}
            </p>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-3">
        <Button 
          onClick={handleSave} 
          className="flex-1"
          disabled={isSaved}
        >
          {isSaved ? "Оценка сохранена" : "Сохранить оценку"}
        </Button>
        <Button 
          onClick={handleReset} 
          variant="outline"
        >
          Сбросить
        </Button>
      </div>
    </Card>
  );
}
