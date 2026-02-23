import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Calendar, UserPlus, Mail } from 'lucide-react';
import { UserProfile } from '../data/users';

interface ProfileHeaderProps {
  user: UserProfile;
  isOwnProfile?: boolean;
}

export default function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const joinDateFormatted = new Date(user.joinDate).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          {user.bio && (
            <p className="text-gray-700 mb-3 max-w-2xl">{user.bio}</p>
          )}
          <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>На платформе с {joinDateFormatted}</span>
          </div>
        </div>

        {!isOwnProfile && (
          <div className="flex gap-2 flex-col sm:flex-row w-full sm:w-auto">
            <Button variant="default" size="sm" className="flex-1 sm:flex-initial">
              <UserPlus className="w-4 h-4 mr-2" />
              Подписаться
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-initial">
              <Mail className="w-4 h-4 mr-2" />
              Написать
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}