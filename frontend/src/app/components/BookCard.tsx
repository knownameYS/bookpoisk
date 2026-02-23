import { Link } from "react-router";
import { Book } from "../data/books";
import Rating84Display from "./Rating84Display";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link 
      to={`/book/${book.id}`} 
      className="group block bg-white rounded-lg border hover:shadow-lg transition-all duration-200"
    >
      <div className="flex gap-4 p-4">
        <div className="flex-shrink-0">
          <ImageWithFallback
            src={book.cover}
            alt={book.title}
            className="w-24 h-36 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow"
          />
        </div>
        
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {book.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-auto">
            {book.description}
          </p>

          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <Rating84Display score={book.avgRating} size="sm" />
            <span className="text-xs text-gray-500">
              {book.totalRatings} оценок
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
