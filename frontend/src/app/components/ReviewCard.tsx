import { Review } from "../data/books";
import { ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import Rating84Display from "./Rating84Display";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

interface ReviewCardProps {
  review: Review;
  userIdMap?: Record<string, string>; // Map authorName to userId
}

export default function ReviewCard({ review, userIdMap }: ReviewCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get userId for the author (if available)
  const userId = userIdMap?.[review.authorName];

  const authorNameContent = userId ? (
    <Link to={`/user/${userId}`} className="font-semibold hover:text-indigo-600 transition-colors">
      {review.authorName}
    </Link>
  ) : (
    <h4 className="font-semibold">{review.authorName}</h4>
  );

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-start gap-4 mb-4">
        {userId ? (
          <Link to={`/user/${userId}`}>
            <ImageWithFallback
              src={review.authorAvatar}
              alt={review.authorName}
              className="w-12 h-12 rounded-full object-cover hover:opacity-80 transition-opacity"
            />
          </Link>
        ) : (
          <ImageWithFallback
            src={review.authorAvatar}
            alt={review.authorName}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              {authorNameContent}
              <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
            </div>
            <Rating84Display score={review.rating} size="sm" />
          </div>
        </div>
      </div>

      <p className="text-gray-700 leading-relaxed mb-4">
        {review.text}
      </p>

      <div className="flex items-center gap-4 pt-4 border-t">
        <Button variant="ghost" size="sm" className="gap-2">
          <ThumbsUp className="w-4 h-4" />
          Полезно ({review.likes})
        </Button>
      </div>
    </div>
  );
}