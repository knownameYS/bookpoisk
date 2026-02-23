import { useState } from "react";
import { books } from "../data/books";
import BookCard from "../components/BookCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";

export default function Catalog() {
  const [sortBy, setSortBy] = useState("rating");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Получаем уникальные жанры
  const allGenres = Array.from(
    new Set(books.flatMap((book) => book.genres))
  ).sort();

  // Фильтруем и сортируем книги
  let filteredBooks = [...books];
  
  if (selectedGenre) {
    filteredBooks = filteredBooks.filter((book) =>
      book.genres.includes(selectedGenre)
    );
  }

  if (sortBy === "rating") {
    filteredBooks.sort((a, b) => b.avgRating - a.avgRating);
  } else if (sortBy === "title") {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "reviews") {
    filteredBooks.sort((a, b) => b.totalRatings - a.totalRatings);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Каталог книг</h1>
        <p className="text-gray-600">
          Все книги с оценками по системе "84"
        </p>
      </div>

      {/* Фильтры и сортировка */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Сортировка:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="title">По названию</SelectItem>
                <SelectItem value="reviews">По популярности</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Жанры:</span>
            <Badge
              variant={selectedGenre === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedGenre(null)}
            >
              Все
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <Badge
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Список книг */}
      <div className="grid gap-4">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Книги не найдены. Попробуйте изменить фильтры.
          </p>
        </div>
      )}
    </div>
  );
}
