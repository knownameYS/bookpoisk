import { Building2, Users, BookText, Lightbulb, Sparkles } from "lucide-react";

interface CriteriaVisualizationProps {
  architecture: number;
  characters: number;
  language: number;
  idea: number;
  vibe: number;
  size?: "sm" | "md";
}

const criteriaConfig = [
  { key: "architecture", label: "A", icon: Building2, color: "bg-blue-500" },
  { key: "characters", label: "C", icon: Users, color: "bg-purple-500" },
  { key: "language", label: "L", icon: BookText, color: "bg-emerald-500" },
  { key: "idea", label: "I", icon: Lightbulb, color: "bg-amber-500" },
  { key: "vibe", label: "V", icon: Sparkles, color: "bg-pink-500" },
];

export default function CriteriaVisualization({
  architecture,
  characters,
  language,
  idea,
  vibe,
  size = "sm",
}: CriteriaVisualizationProps) {
  const values = { architecture, characters, language, idea, vibe };
  
  const isSmall = size === "sm";

  return (
    <div className={`flex ${isSmall ? "gap-2" : "gap-4"}`}>
      {criteriaConfig.map((config) => {
        const value = values[config.key as keyof typeof values];
        const Icon = config.icon;
        
        return (
          <div 
            key={config.key} 
            className="flex flex-col items-center gap-1"
          >
            <div className={`flex items-center gap-1 ${isSmall ? "text-xs" : "text-sm"} font-semibold text-gray-700`}>
              <Icon className={`${isSmall ? "w-3 h-3" : "w-4 h-4"}`} />
              <span>{config.label}:</span>
              <span className="text-gray-900">{value.toFixed(1)}</span>
            </div>
            
            {/* Визуальный индикатор */}
            <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${isSmall ? "h-1.5" : "h-2"}`}>
              <div
                className={`${config.color} h-full rounded-full transition-all duration-300`}
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
