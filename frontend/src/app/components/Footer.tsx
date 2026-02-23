import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

interface FooterProps {
  onMethodologyClick: () => void;
}

export default function Footer({ onMethodologyClick }: FooterProps) {
  return (
    <footer className="border-t bg-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <div className="flex flex-col">
                <span className="font-bold text-lg">BookRating</span>
                <span className="text-xs text-gray-500">Система "84"</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Уникальная система оценки книг, которая разделяет объективное мастерство автора и ваше субъективное впечатление.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">О проекте</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button
                  onClick={onMethodologyClick}
                  className="hover:text-indigo-600 transition-colors"
                >
                  Методология оценки "84"
                </button>
              </li>
              <li>
                <Link to="/users" className="hover:text-indigo-600 transition-colors">
                  Все пользователи
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-indigo-600 transition-colors">
                  Каталог книг
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Помощь</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <button className="hover:text-indigo-600 transition-colors">
                  Как пользоваться
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-600 transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-600 transition-colors">
                  Контакты
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
          © 2026 BookRating. Все права защищены.
        </div>
      </div>
    </footer>
  );
}