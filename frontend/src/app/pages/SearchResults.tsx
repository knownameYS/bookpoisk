import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { Input } from "../components/ui/input";
import { Search, BookOpen, User, FileText, X } from "lucide-react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";

type SearchTab = "books" | "authors" | "reviews";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [activeTab, setActiveTab] = useState<SearchTab>("books");

  useEffect(() => {
    document.title = searchQuery
      ? `Поиск: ${searchQuery} — BookRating`
      : "Поиск книг — BookRating";
  }, [searchQuery]);

  // Поиск по книгам
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Поиск по авторам (уникальные авторы из найденных книг)
  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const uniqueAuthors = Array.from(
      new Set(books.map((book) => book.author))
    );
    return uniqueAuthors.filter((author) =>
      author.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Поисковая форма */}
      <div className="max-w-3xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Поиск книг, авторов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-14 text-lg"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </form>

        {searchQuery && (
          <p className="text-sm text-gray-600 mt-3">
            Результаты поиска для: <strong>{searchQuery}</strong>
          </p>
        )}
      </div>

      {/* Результаты поиска */}
      {searchQuery ? (
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SearchTab)}>
          <TabsList className="mb-6">
            <TabsTrigger value="books" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Книги ({filteredBooks.length})
            </TabsTrigger>
            <TabsTrigger value="authors" className="gap-2">
              <User className="w-4 h-4" />
              Авторы ({filteredAuthors.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <FileText className="w-4 h-4" />
              Рецензии (0)
            </TabsTrigger>
          </TabsList>

          {/* Вкладка: Книги */}
          <TabsContent value="books">
            {filteredBooks.length > 0 ? (
              <div className="grid gap-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={BookOpen}
                title="Книги не найдены"
                description="Попробуйте изменить запрос или проверьте правильность написания"
              />
            )}
          </TabsContent>

          {/* Вкладка: Авторы */}
          <TabsContent value="authors">
            {filteredAuthors.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredAuthors.map((author) => {
                  const authorBooks = books.filter((b) => b.author === author);
                  return (
                    <Card key={author} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{author}</h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {authorBooks.length} {authorBooks.length === 1 ? "книга" : "книги"} в каталоге
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {authorBooks.slice(0, 3).map((book) => (
                              <Link
                                key={book.id}
                                to={`/book/${book.id}`}
                                className="text-xs text-indigo-600 hover:underline"
                              >
                                {book.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={User}
                title="Авторы не найдены"
                description="Попробуйте изменить запрос или проверьте правильность написания"
              />
            )}
          </TabsContent>

          {/* Вкладка: Рецензии */}
          <TabsContent value="reviews">
            <EmptyState
              icon={FileText}
              title="Рецензии не найдены"
              description="Функция поиска по рецензиям находится в разработке"
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Начните поиск
          </h2>
          <p className="text-gray-500 mb-6">
            Введите название книги или имя автора
          </p>
          <Button asChild variant="outline">
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      <Button asChild variant="outline">
        <Link to="/catalog">Посмотреть весь каталог</Link>
      </Button>
    </div>
  );
}