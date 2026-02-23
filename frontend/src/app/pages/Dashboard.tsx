import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import ProfileHeader from '../components/ProfileHeader';
import ProfileStatsBar from '../components/ProfileStatsBar';
import TasteGraph from '../components/TasteGraph';
import RatingHistoryItem from '../components/RatingHistoryItem';
import ReviewPreviewCard from '../components/ReviewPreviewCard';
import { getCurrentUser, getUserRatings } from '../data/users';
import { reviews } from '../data/books';
import { BookOpen, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const currentUser = getCurrentUser();
  const userRatings = getUserRatings(currentUser.id);
  const userReviews = reviews.filter(r => r.authorName === currentUser.name);

  // Состояние: новый пользователь без оценок
  const isNewUser = userRatings.length === 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <ProfileHeader user={currentUser} isOwnProfile={true} />

      {/* Stats Section */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <ProfileStatsBar
            booksRated={currentUser.stats.booksRated}
            reviewsWritten={currentUser.stats.reviewsWritten}
            avgRating={currentUser.stats.avgRating}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Taste Profile */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Ваш профиль читателя</CardTitle>
            <p className="text-sm text-gray-600">
              Средние значения ваших оценок по критериям системы "84"
            </p>
          </CardHeader>
          <CardContent>
            {!isNewUser ? (
              <>
                <TasteGraph
                  architecture={currentUser.tasteProfile.architecture}
                  characters={currentUser.tasteProfile.characters}
                  language={currentUser.tasteProfile.language}
                  idea={currentUser.tasteProfile.idea}
                  vibe={currentUser.tasteProfile.vibe}
                  size="medium"
                />
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Architecture:</span>
                    <span className="font-semibold">{currentUser.tasteProfile.architecture.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Characters:</span>
                    <span className="font-semibold">{currentUser.tasteProfile.characters.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language:</span>
                    <span className="font-semibold">{currentUser.tasteProfile.language.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Idea:</span>
                    <span className="font-semibold">{currentUser.tasteProfile.idea.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vibe:</span>
                    <span className="font-semibold">{currentUser.tasteProfile.vibe.toFixed(1)}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">
                  Профиль вкуса формируется после первой оценки
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Ratings */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Последние оценки</CardTitle>
                {userRatings.length > 0 && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/catalog">Оценить ещё</Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {userRatings.length > 0 ? (
                <div className="space-y-4">
                  {userRatings.slice(0, 4).map((rating) => (
                    <RatingHistoryItem
                      key={rating.id}
                      rating={rating}
                      showActions={true}
                    />
                  ))}
                  {userRatings.length > 4 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/profile/ratings">Посмотреть все оценки ({userRatings.length})</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Вы ещё не оценили ни одной книги
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Начните с каталога, чтобы сформировать ваш читательский профиль
                  </p>
                  <Button asChild>
                    <Link to="/catalog">Перейти в каталог</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Последние рецензии</CardTitle>
                {userReviews.length > 0 && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/catalog">Написать рецензию</Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {userReviews.length > 0 ? (
                <div className="space-y-4">
                  {userReviews.slice(0, 3).map((review) => (
                    <ReviewPreviewCard
                      key={review.id}
                      review={review}
                      showBook={true}
                    />
                  ))}
                  {userReviews.length > 3 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/profile/reviews">Посмотреть все рецензии ({userReviews.length})</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    Вы ещё не написали рецензий
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Info Box - How ratings are calculated */}
      <Card className="mt-6 bg-indigo-50 border-indigo-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 text-indigo-900">
            📊 Как формируется ваш профиль вкуса
          </h3>
          <div className="text-sm text-indigo-800 space-y-1">
            <p>
              • <strong>Средний балл</strong> — среднее арифметическое всех ваших итоговых оценок по системе "84"
            </p>
            <p>
              • <strong>Профиль вкуса (A, C, L, I, V)</strong> — средние значения по каждому критерию из всех ваших оценок
            </p>
            <p>
              • Чем больше книг вы оцените, тем точнее система определит ваши предпочтения
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}