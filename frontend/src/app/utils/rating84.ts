// Система оценки "84" - формализованный алгоритм расчета рейтинга книг
// Разделяет объективное мастерство и субъективное впечатление

export interface Criteria {
  architecture: number; // 1-10: Архитектура нарратива
  characters: number;   // 1-10: Палитра героев
  language: number;     // 1-10: Материя слова
  idea: number;        // 1-10: Сила концепции
  vibe: number;        // 1-10: Атмосфера (субъективная)
}

// Множители для параметра Vibe (атмосфера)
const VIBE_MULTIPLIERS: { [key: number]: number } = {
  1: 0.60,  // Не зашло совсем
  2: 0.75,  // Слабое впечатление
  3: 0.85,  // Нейтрально
  4: 0.95,  // Неплохо
  5: 1.00,  // Хорошо
  6: 1.05,  // Приятно
  7: 1.10,  // Очень понравилось
  8: 1.20,  // Впечатлило
  9: 1.30,  // Захватило полностью
  10: 1.50, // Абсолютный шедевр
};

export function calculateRating84(criteria: Criteria): {
  baseScore: number;
  vibeMultiplier: number;
  finalScore: number;
  interpretation: string;
} {
  const { architecture, characters, language, idea, vibe } = criteria;

  // Базовый балл: сумма четырех объективных критериев * 1.4
  // Максимум: (10 + 10 + 10 + 10) * 1.4 = 56
  const baseScore = (architecture + characters + language + idea) * 1.4;

  // Множитель на основе субъективной атмосферы
  const vibeMultiplier = VIBE_MULTIPLIERS[vibe] || 1.0;

  // Итоговый рейтинг: базовый балл * множитель, округлено, max 84
  const rawScore = baseScore * vibeMultiplier;
  const finalScore = Math.min(84, Math.round(rawScore));

  // Текстовая интерпретация
  const interpretation = getInterpretation(finalScore, criteria);

  return {
    baseScore: Math.round(baseScore * 10) / 10,
    vibeMultiplier,
    finalScore,
    interpretation,
  };
}

function getInterpretation(score: number, criteria: Criteria): string {
  // Анализируем сильные и слабые стороны
  const { architecture, characters, language, idea, vibe } = criteria;
  
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  if (architecture >= 8) strengths.push("мастерским построением сюжета");
  if (characters >= 8) strengths.push("живыми персонажами");
  if (language >= 8) strengths.push("выдающимся стилем");
  if (idea >= 8) strengths.push("глубокой концепцией");
  if (vibe >= 8) strengths.push("захватывающей атмосферой");

  if (architecture <= 5) weaknesses.push("слабой структурой");
  if (characters <= 5) weaknesses.push("бледными героями");
  if (language <= 5) weaknesses.push("простым языком");
  if (idea <= 5) weaknesses.push("банальной идеей");

  // Генерируем интерпретацию на основе итогового балла
  if (score >= 80) {
    return strengths.length > 0 
      ? `Выдающееся произведение с ${strengths.join(", ")}`
      : "Выдающееся произведение";
  } else if (score >= 70) {
    return strengths.length > 0
      ? `Высокий уровень: ${strengths.slice(0, 2).join(" и ")}`
      : "Произведение высокого уровня";
  } else if (score >= 60) {
    return strengths.length > 0
      ? `Качественная работа с ${strengths[0]}`
      : "Качественная работа";
  } else if (score >= 50) {
    return weaknesses.length > 0
      ? `Неплохое произведение, но с ${weaknesses[0]}`
      : "Неплохое произведение";
  } else if (score >= 40) {
    return "Посредственная работа с заметными недостатками";
  } else {
    return "Слабое произведение";
  }
}

export function getVibeLabel(vibe: number): string {
  const labels: { [key: number]: string } = {
    1: "Не зашло",
    2: "Слабо",
    3: "Нейтрально",
    4: "Неплохо",
    5: "Хорошо",
    6: "Приятно",
    7: "Очень понравилось",
    8: "Впечатлило",
    9: "Захватило",
    10: "Шедевр",
  };
  return labels[vibe] || "Хорошо";
}

export function getRatingLabel(score: number): string {
  if (score >= 80) return "Выдающееся";
  if (score >= 70) return "Высокий уровень";
  if (score >= 60) return "Качественно";
  if (score >= 50) return "Неплохо";
  if (score >= 40) return "Посредственно";
  return "Слабо";
}
