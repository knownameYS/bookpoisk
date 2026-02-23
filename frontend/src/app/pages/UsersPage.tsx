import { useState } from 'react';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Users as UsersIcon } from 'lucide-react';
import UserCard from '../components/UserCard';
import { users } from '../data/users';

type SortOption = 'activity' | 'rating' | 'reviews';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('activity');

  // Filter users by search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'activity':
        return b.stats.booksRated - a.stats.booksRated;
      case 'rating':
        return b.stats.avgRating - a.stats.avgRating;
      case 'reviews':
        return b.stats.reviewsWritten - a.stats.reviewsWritten;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <UsersIcon className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold">Пользователи платформы</h1>
        </div>
        <p className="text-gray-600">
          Откройте для себя других читателей и их вкусовые профили
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            type="search"
            placeholder="Поиск пользователей..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="activity">По активности</SelectItem>
            <SelectItem value="rating">По среднему рейтингу</SelectItem>
            <SelectItem value="reviews">По количеству рецензий</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        {searchQuery ? (
          <span>
            Найдено пользователей: <strong>{sortedUsers.length}</strong>
          </span>
        ) : (
          <span>
            Всего пользователей: <strong>{sortedUsers.length}</strong>
          </span>
        )}
      </div>

      {/* Users Grid */}
      {sortedUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map((user) => (
            <UserCard key={user.id} user={user} variant="default" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Пользователи не найдены
          </h3>
          <p className="text-gray-600">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}

      {/* Info Card */}
      <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
        <h3 className="font-semibold mb-3 text-indigo-900">
          💡 Как работают профили пользователей
        </h3>
        <div className="text-sm text-indigo-800 space-y-2">
          <p>
            <strong>Профиль вкуса</strong> — это уникальная интеллектуальная карта читателя, 
            основанная на его оценках по системе "84"
          </p>
          <p>
            Радиальный график показывает средние значения критериев <strong>A, C, L, I, V</strong>, 
            которые пользователь выставлял книгам
          </p>
          <p>
            Чем больше оценок, тем точнее профиль отражает читательские предпочтения
          </p>
        </div>
      </div>
    </div>
  );
}
