import { Link } from 'react-router';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { UserRatingHistory } from '../data/users';

interface RatingHistoryItemProps {
  rating: UserRatingHistory;
  showActions?: boolean;
}

export default function RatingHistoryItem({ rating, showActions = false }: RatingHistoryItemProps) {
  const dateFormatted = new Date(rating.date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const criteria = [
    { label: 'A', value: rating.criteria.architecture, name: 'Architecture' },
    { label: 'C', value: rating.criteria.characters, name: 'Characters' },
    { label: 'L', value: rating.criteria.language, name: 'Language' },
    { label: 'I', value: rating.criteria.idea, name: 'Idea' },
    { label: 'V', value: rating.criteria.vibe, name: 'Vibe' },
  ];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Book Cover */}
          <Link to={`/book/${rating.bookId}`} className="flex-shrink-0">
            <img
              src={rating.bookCover}
              alt={rating.bookTitle}
              className="w-16 h-24 object-cover rounded shadow-sm hover:shadow-md transition-shadow"
            />
          </Link>

          {/* Rating Info */}
          <div className="flex-1 min-w-0">
            <Link to={`/book/${rating.bookId}`} className="block hover:text-indigo-600 transition-colors">
              <h3 className="font-semibold truncate mb-1">{rating.bookTitle}</h3>
            </Link>
            <p className="text-sm text-gray-600 mb-2">{rating.bookAuthor}</p>

            {/* Criteria Breakdown */}
            <div className="flex flex-wrap gap-2 mb-2">
              {criteria.map((criterion) => (
                <div
                  key={criterion.label}
                  className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded"
                  title={criterion.name}
                >
                  <span className="font-semibold text-gray-700">{criterion.label}</span>
                  <span className="text-gray-600">{criterion.value.toFixed(1)}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{dateFormatted}</span>
            </div>
          </div>

          {/* Final Score */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-center min-w-[4rem]">
              <div className="text-2xl font-bold">{rating.finalScore}</div>
              <div className="text-xs opacity-90">/84</div>
            </div>

            {showActions && (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
