import { Card } from "./ui/card";

interface RatingDistributionProps {
  totalRatings: number;
}

export default function RatingDistribution({ totalRatings }: RatingDistributionProps) {
  // Mock distribution data - в реальном приложении это пришло бы с сервера
  const distribution = [
    { range: "80-84", label: "Выдающееся", count: Math.floor(totalRatings * 0.15), color: "bg-emerald-500" },
    { range: "70-79", label: "Высокий уровень", count: Math.floor(totalRatings * 0.35), color: "bg-blue-500" },
    { range: "60-69", label: "Качественно", count: Math.floor(totalRatings * 0.30), color: "bg-indigo-500" },
    { range: "50-59", label: "Неплохо", count: Math.floor(totalRatings * 0.15), color: "bg-amber-500" },
    { range: "0-49", label: "Ниже среднего", count: Math.floor(totalRatings * 0.05), color: "bg-gray-400" },
  ];

  const maxCount = Math.max(...distribution.map(d => d.count));

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Распределение оценок</h3>
      <div className="space-y-3">
        {distribution.map((item) => {
          const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          const countPercentage = totalRatings > 0 ? (item.count / totalRatings) * 100 : 0;
          
          return (
            <div key={item.range} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-700">
                  {item.range} <span className="text-gray-500">({item.label})</span>
                </span>
                <span className="font-medium text-gray-900">
                  {item.count} ({countPercentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        Всего оценок: {totalRatings}
      </p>
    </Card>
  );
}
