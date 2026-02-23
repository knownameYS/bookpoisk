import { Link } from 'react-router';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import TasteGraph from './TasteGraph';
import { UserProfile } from '../data/users';

interface UserCardProps {
  user: UserProfile;
  variant?: 'default' | 'compact';
}

export default function UserCard({ user, variant = 'default' }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  if (variant === 'compact') {
    return (
      <Link to={`/user/${user.id}`} className="block">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.name}</h3>
                <p className="text-sm text-gray-600">
                  {user.stats.booksRated} книг • {user.stats.avgRating}/84
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="w-20 h-20 mb-3">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-lg mb-1">{user.name}</h3>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <span>{user.stats.booksRated} книг</span>
            <span>•</span>
            <span className="font-semibold text-indigo-600">{user.stats.avgRating}/84</span>
          </div>
          {user.bio && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{user.bio}</p>
          )}
        </div>

        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-2 text-center">
            Профиль вкуса
          </h4>
          <TasteGraph
            architecture={user.tasteProfile.architecture}
            characters={user.tasteProfile.characters}
            language={user.tasteProfile.language}
            idea={user.tasteProfile.idea}
            vibe={user.tasteProfile.vibe}
            size="small"
          />
        </div>

        <Button asChild className="w-full" variant="outline">
          <Link to={`/user/${user.id}`}>Открыть профиль</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
