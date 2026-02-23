import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { BookOpen, Mail, Lock } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    document.title = isLogin ? "Вход — BookRating" : "Регистрация — BookRating";
  }, [isLogin]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">BookRating</span>
              <span className="text-sm text-gray-500">Система "84"</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {isLogin ? "Вход в аккаунт" : "Регистрация"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin 
              ? "Войдите, чтобы оценивать книги и писать рецензии" 
              : "Создайте аккаунт для доступа ко всем возможностям"}
          </p>
        </div>

        <Card className="p-6">
          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя пользователя</Label>
                <Input
                  id="name"
                  placeholder="Введите ваше имя"
                  type="text"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="pl-10"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    placeholder="••••••••"
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Запомнить меня</span>
                </label>
                <button type="button" className="text-indigo-600 hover:underline">
                  Забыли пароль?
                </button>
              </div>
            )}

            <Button className="w-full" size="lg">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-indigo-600 font-semibold hover:underline"
              >
                {isLogin ? "Зарегистрируйтесь" : "Войдите"}
              </button>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-center text-gray-500 mb-4">
              Или продолжите с помощью
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                GitHub
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}