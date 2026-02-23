import { getRatingLabel } from "../utils/rating84";

interface Rating84DisplayProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function Rating84Display({ 
  score, 
  size = "md",
  showLabel = true 
}: Rating84DisplayProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const labelSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const getColor = (score: number) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 60) return "text-indigo-600";
    if (score >= 50) return "text-amber-600";
    return "text-gray-600";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-1">
        <span className={`font-bold ${sizeClasses[size]} ${getColor(score)}`}>
          {score}
        </span>
        <span className={`${labelSizeClasses[size]} text-gray-400 font-medium`}>
          /84
        </span>
      </div>
      {showLabel && (
        <span className={`${labelSizeClasses[size]} text-gray-600 font-medium`}>
          {getRatingLabel(score)}
        </span>
      )}
    </div>
  );
}
