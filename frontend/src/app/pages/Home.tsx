import { Link } from "react-router";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { books } from "../data/books";
import { users } from "../data/users";
import BookCard from "../components/BookCard";
import UserCard from "../components/UserCard";
import { ArrowRight, Target, BarChart3, Users } from "lucide-react";

export default function Home() {
  const featuredBooks = books.slice(0, 3);
  const featuredUsers = users.slice(0, 3);

  useEffect(() => {
    document.title = "BookRating — Система оценки книг \"84\"";
  }, []);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Оценивайте книги по уникальной системе "84"
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Разделяя мастерство автора и ваше впечатление. 
              Прозрачный алгоритм расчета рейтинга для честных оценок.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-indigo-600 hover:bg-gray-100">
                <Link to="/catalog">
                  Перейти к каталогу
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Почему система "84"?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Объективность</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Устали от субъективных "нравится/не нравится"? Наша система отделяет оценку 
              писательского мастерства (сюжет, герои, язык) от вашего личного впечатления. 
              Так вы поймёте, почему книга считается сильной, даже если она не "ваша".
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Прозрачность</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Никакой магии — только понятная математика. Вы всегда видите, как складывается 
              итоговый балл из пяти критериев. Хотите разобраться в деталях? 
              Формула расчёта доступна для всех в методологии.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-lg mb-3">Детализация</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Видите оценки сообщества по каждому из пяти критериев отдельно. 
              Узнайте, за что именно хвалят книгу — за атмосферу, героев или идею? 
              Сравните своё мнение с читателями и найдите единомышленников.
            </p>
          </Card>
        </div>
      </section>

      {/* Featured Books */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Популярные книги</h2>
          <Button variant="outline" asChild>
            <Link to="/catalog">
              Все книги
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Featured Users */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Активные читатели</h2>
              <p className="text-gray-600">Познакомьтесь с пользователями и их вкусовыми профилями</p>
            </div>
            <Button variant="outline" asChild className="self-start md:self-auto">
              <Link to="/users">
                Все пользователи
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredUsers.map((user) => (
              <UserCard key={user.id} user={user} variant="default" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}