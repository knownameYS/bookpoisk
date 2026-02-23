import { Link, useNavigate } from "react-router";
import { BookOpen, Library, Search, User, LogOut, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, FormEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getCurrentUser } from "../data/users";

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = getCurrentUser();
  const isLoggedIn = true; // В реальности это будет из контекста авторизации

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const initials = currentUser.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div className="flex flex-col">
              <span className="font-bold text-xl">BookRating</span>
              <span className="text-xs text-gray-500">Система "84"</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder="Поиск книг и авторов..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <nav className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              asChild
            >
              <Link to="/search">
                <Search className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/catalog">
                <Library className="w-4 h-4 mr-2" />
                Каталог
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="sm:hidden">
              <Link to="/catalog">
                <Library className="w-4 h-4" />
              </Link>
            </Button>
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Рейтинг: {currentUser.stats.avgRating}/84
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Мой профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/users">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Все пользователи
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/login">Войти</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}