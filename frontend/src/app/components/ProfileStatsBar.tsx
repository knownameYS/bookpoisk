import { BookOpen, FileText, Star } from 'lucide-react';

interface ProfileStatsBarProps {
  booksRated: number;
  reviewsWritten: number;
  avgRating: number;
  variant?: 'full' | 'compact';
}

export default function ProfileStatsBar({ 
  booksRated, 
  reviewsWritten, 
  avgRating,
  variant = 'full'
}: ProfileStatsBarProps) {
  const stats = [
    { 
      label: 'Оценено книг', 
      value: booksRated, 
      icon: BookOpen,
      color: 'text-indigo-600'
    },
    { 
      label: 'Написано рецензий', 
      value: reviewsWritten, 
      icon: FileText,
      color: 'text-purple-600'
    },
    { 
      label: 'Средний балл', 
      value: `${avgRating}/84`, 
      icon: Star,
      color: 'text-amber-600'
    },
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 text-sm">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-1">
              <Icon className={`w-4 h-4 ${stat.color}`} />
              <span className="font-semibold">{stat.value}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-2">
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
