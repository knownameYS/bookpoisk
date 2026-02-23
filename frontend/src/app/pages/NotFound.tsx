import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { BookX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto text-center">
        <BookX className="w-24 h-24 mx-auto mb-6 text-gray-400" />
        <h1 className="text-4xl font-bold mb-4">Страница не найдена</h1>
        <p className="text-gray-600 mb-8">
          К сожалению, запрашиваемая страница не существует.
        </p>
        <Button size="lg" asChild>
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
    </div>
  );
}
