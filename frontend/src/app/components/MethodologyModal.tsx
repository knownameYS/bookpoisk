import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Card } from "./ui/card";

interface MethodologyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MethodologyModal({ open, onOpenChange }: MethodologyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Методология оценки "84"</DialogTitle>
          <DialogDescription>
            Подробное объяснение системы расчета рейтинга книг
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Описание системы */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Концепция</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Система "84" разработана для честной и прозрачной оценки литературных произведений. 
              Ключевая особенность — разделение объективных критериев писательского мастерства 
              и субъективного читательского впечатления.
            </p>
          </div>

          {/* Пять критериев */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Пять критериев оценки</h3>
            <div className="grid gap-3">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h4 className="font-semibold text-sm mb-1 text-blue-900">
                  A — Architecture (Архитектура нарратива)
                </h4>
                <p className="text-xs text-blue-800">
                  Оценка 0-10: структура сюжета, композиция, темп повествования, 
                  логичность развития событий
                </p>
              </Card>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <h4 className="font-semibold text-sm mb-1 text-purple-900">
                  C — Characters (Палитра героев)
                </h4>
                <p className="text-xs text-purple-800">
                  Оценка 0-10: глубина персонажей, их развитие, убедительность мотивации, 
                  запоминаемость образов
                </p>
              </Card>

              <Card className="p-4 bg-pink-50 border-pink-200">
                <h4 className="font-semibold text-sm mb-1 text-pink-900">
                  L — Language (Материя слова)
                </h4>
                <p className="text-xs text-pink-800">
                  Оценка 0-10: качество языка, стиль, образность, мастерство владения словом
                </p>
              </Card>

              <Card className="p-4 bg-green-50 border-green-200">
                <h4 className="font-semibold text-sm mb-1 text-green-900">
                  I — Idea (Сила концепции)
                </h4>
                <p className="text-xs text-green-800">
                  Оценка 0-10: оригинальность идеи, глубина темы, философская насыщенность, 
                  актуальность проблематики
                </p>
              </Card>

              <Card className="p-4 bg-amber-50 border-amber-200">
                <h4 className="font-semibold text-sm mb-1 text-amber-900">
                  Vibe (Атмосфера / Впечатление)
                </h4>
                <p className="text-xs text-amber-800">
                  Оценка 0-10: субъективное эмоциональное восприятие, личное впечатление читателя. 
                  Преобразуется в множитель от 0.60 до 1.50
                </p>
              </Card>
            </div>
          </div>

          {/* Формула расчета */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Алгоритм расчета</h3>
            
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-gray-50 to-indigo-50 border-indigo-100">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Шаг 1: Базовый балл (объективные критерии)
                </p>
                <p className="font-mono text-center text-base py-2">
                  (A + C + L + I) × 1.4 = <span className="text-indigo-600 font-bold">до 56 баллов</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Четыре критерия мастерства суммируются (макс. 40 баллов) и умножаются на коэффициент 1.4
                </p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Шаг 2: Множитель Vibe (субъективное впечатление)
                </p>
                <p className="font-mono text-center text-base py-2">
                  Vibe: 0-10 → множитель от <span className="text-purple-600 font-bold">0.60</span> до <span className="text-purple-600 font-bold">1.50</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Формула: 0.6 + (Vibe / 10) × 0.9. Например, Vibe=10 даёт множитель 1.50
                </p>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-pink-50 to-red-50 border-pink-100">
                <p className="text-sm text-gray-600 mb-2 font-medium">
                  Шаг 3: Итоговый рейтинг "84"
                </p>
                <p className="font-mono text-center text-base py-2">
                  min(<span className="text-pink-600 font-bold text-lg">84</span>, round(Базовый × Множитель))
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Результат округляется и ограничивается максимумом в 84 балла
                </p>
              </Card>
            </div>
          </div>

          {/* Почему 84 */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Почему максимум 84?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Число 84 — символичный предел совершенства. Это не 100, чтобы подчеркнуть: 
              идеальных книг не существует. Максимальный балл 84 достижим только при 
              высочайшем уровне всех критериев мастерства и максимальном читательском впечатлении. 
              Это создаёт честную шкалу, где даже классические произведения редко превышают 70-75 баллов.
            </p>
          </div>

          {/* Пример расчета */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-sm mb-3 text-indigo-900">Пример расчета</h4>
            <div className="text-xs text-indigo-800 space-y-1">
              <p>• Architecture = 9, Characters = 8, Language = 9, Idea = 7</p>
              <p>• Базовый балл = (9+8+9+7) × 1.4 = 33 × 1.4 = 46.2</p>
              <p>• Vibe = 8 → множитель = 0.6 + 0.8 × 0.9 = 1.32</p>
              <p>• Итоговый рейтинг = round(46.2 × 1.32) = round(61.0) = <strong>61</strong></p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
