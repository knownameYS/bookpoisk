import { Link } from 'react-router';
import { Card, CardContent } from './ui/card';
import { Heart } from 'lucide-react';
import { Review } from '../data/books';
import { books } from '../data/books';

interface ReviewPreviewCardProps {
  review: Review;
  showBook?: boolean;
}

export default function ReviewPreviewCard({ 
  review, 
  showBook = false 
}: ReviewPreviewCardProps) {
  const dateFormatted = new Date(review.date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const book = books.find(b => b.id === review.bookId);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            {showBook && book && (
              <Link 
                to={`/book/${review.bookId}`} 
                className="font-semibold hover:text-indigo-600 transition-colors block mb-1"
              >
                {book.title}
              </Link>
            )}
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded">
                {review.rating}/84
              </div>
              <span className="text-sm text-gray-500">{dateFormatted}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-3">
          {review.text}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{review.likes}</span>
          </div>
          <Link 
            to={`/book/${review.bookId}`} 
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Читать полностью →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}