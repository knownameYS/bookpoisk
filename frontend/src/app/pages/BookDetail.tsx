import { useState } from "react";
import { useParams, Link } from "react-router";
import { books, reviews } from "../data/books";
import { users } from "../data/users";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Rating84Calculator from "../components/Rating84Calculator";
import Rating84Display from "../components/Rating84Display";
import CriteriaVisualization from "../components/CriteriaVisualization";
import RatingDistribution from "../components/RatingDistribution";
import ReviewCard from "../components/ReviewCard";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BookMarked, BookOpen, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import type { Criteria } from "../utils/rating84";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === id);
  const bookReviews = reviews.filter((r) => r.bookId === id);
  
  const [userRating, setUserRating] = useState<Criteria | null>(null);

  // Create a map of authorName to userId for linking to profiles
  const userIdMap = users.reduce((acc, user) => {
    acc[user.name] = user.id;
    return acc;
  }, {} as Record<string, string>);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Книга не найдена</h1>
        <Button asChild>
          <Link to="/catalog">Вернуться к каталогу</Link>
        </Button>
      </div>
    );
  }

  const handleSaveRating = (criteria: Criteria, finalScore: number) => {
    setUserRating(criteria);
    toast.success(`Ваша оценка ${finalScore}/84 сохранена!`);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      {/* Навигация назад */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/catalog">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Вернуться к каталогу
        </Link>
      </Button>

      {/* Основная информация о книге */}
      <div className="grid lg:grid-cols-[300px_1fr] gap-8 mb-8">
        {/* Обложка и действия */}
        <div className="space-y-4">
          <ImageWithFallback
            src={book.cover}
            alt={book.title}
            className="w-full rounded-lg shadow-xl"
          />
          
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              <BookMarked className="w-4 h-4 mr-2" />
              Хочу прочитать
            </Button>
            <Button className="w-full" variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Прочитано
            </Button>
          </div>
        </div>

        {/* Информация */}
        <div>
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {book.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          {/* Итоговый рейтинг */}
          <Card className="p-6 mb-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Итоговый рейтинг по системе "84"</h3>
                <div className="flex items-center gap-6">
                  <Rating84Display score={book.avgRating} size="lg" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">{book.totalRatings} оценок</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">
                Средние оценки по критериям:
              </h4>
              <CriteriaVisualization
                architecture={book.avgCriteria.architecture}
                characters={book.avgCriteria.characters}
                language={book.avgCriteria.language}
                idea={book.avgCriteria.idea}
                vibe={book.avgCriteria.vibe}
                size="md"
              />
            </div>
          </Card>

          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-2">Описание</h3>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>
        </div>
      </div>

      {/* Табы: Оценка и Рецензии */}
      <Tabs defaultValue="rate" className="mt-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="rate">Оценить по системе "84"</TabsTrigger>
          <TabsTrigger value="reviews">
            Рецензии ({bookReviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rate" className="mt-6">
          <div className="grid lg:grid-cols-[1fr_350px] gap-6">
            <div>
              {userRating ? (
                <div className="mb-6">
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-900">Ваша оценка сохранена</p>
                        <p className="text-sm text-green-700">
                          Вы можете изменить её в любое время
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setUserRating(null)}
                      >
                        Изменить
                      </Button>
                    </div>
                  </Card>
                </div>
              ) : null}
              
              <Rating84Calculator
                bookId={book.id}
                onSave={handleSaveRating}
                savedRating={userRating || undefined}
              />
            </div>
            
            <div>
              <RatingDistribution totalRatings={book.totalRatings} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-4">
            {bookReviews.length > 0 ? (
              bookReviews.map((review) => (
                <ReviewCard key={review.id} review={review} userIdMap={userIdMap} />
              ))
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-500 mb-4">Пока нет рецензий на эту книгу</p>
                <Button>Написать первую рецензию</Button>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}