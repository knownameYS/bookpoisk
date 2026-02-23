export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  genres: string[];
  description: string;
  avgRating: number;
  totalRatings: number;
  avgCriteria: {
    architecture: number;
    characters: number;
    language: number;
    idea: number;
    vibe: number;
  };
}

export interface UserRating {
  bookId: string;
  architecture: number;
  characters: number;
  language: number;
  idea: number;
  vibe: number;
  finalScore: number;
}

export interface Review {
  id: string;
  bookId: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  text: string;
  date: string;
  likes: number;
}

export const books: Book[] = [
  {
    id: "1",
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    cover: "https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    genres: ["Фантастика", "Классика", "Сатира"],
    description: "Роман, сочетающий в себе фантастику, философию, сатиру и любовную историю. История о визите дьявола в атеистическую Москву 1930-х годов.",
    avgRating: 78,
    totalRatings: 1247,
    avgCriteria: {
      architecture: 9.2,
      characters: 9.5,
      language: 9.8,
      idea: 9.1,
      vibe: 9.3,
    },
  },
  {
    id: "2",
    title: "1984",
    author: "Джордж Оруэлл",
    cover: "https://images.unsplash.com/photo-1702285630048-0594da47cf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    genres: ["Антиутопия", "Научная фантастика"],
    description: "Роман-антиутопия о тоталитарном обществе, где правит партия во главе с Большим Братом.",
    avgRating: 76,
    totalRatings: 2134,
    avgCriteria: {
      architecture: 8.9,
      characters: 8.7,
      language: 9.0,
      idea: 9.8,
      vibe: 8.5,
    },
  },
  {
    id: "3",
    title: "Преступление и наказание",
    author: "Фёдор Достоевский",
    cover: "https://images.unsplash.com/photo-1644384361758-0bceb5afa61f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    genres: ["Классика", "Психологический роман"],
    description: "Философский роман о студенте Раскольникове, совершившем убийство и переживающем глубокий нравственный конфликт.",
    avgRating: 81,
    totalRatings: 1876,
    avgCriteria: {
      architecture: 9.3,
      characters: 9.7,
      language: 9.5,
      idea: 9.6,
      vibe: 9.0,
    },
  },
  {
    id: "4",
    title: "Сто лет одиночества",
    author: "Габриэль Гарсиа Маркес",
    cover: "https://images.unsplash.com/photo-1685478237148-aaf613b2e8ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    genres: ["Магический реализм", "Классика"],
    description: "Эпическая сага о семье Буэндиа и вымышленном городе Макондо, воплощающая историю Латинской Америки.",
    avgRating: 74,
    totalRatings: 943,
    avgCriteria: {
      architecture: 8.8,
      characters: 8.9,
      language: 9.2,
      idea: 8.7,
      vibe: 8.6,
    },
  },
  {
    id: "5",
    title: "Над пропастью во ржи",
    author: "Джером Д. Сэлинджер",
    cover: "https://images.unsplash.com/photo-1731983568664-9c1d8a87e7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    genres: ["Современная классика", "Coming of age"],
    description: "История шестнадцатилетнего Холдена Колфилда, рассказывающая о трёх днях его жизни после исключения из школы.",
    avgRating: 68,
    totalRatings: 1542,
    avgCriteria: {
      architecture: 7.8,
      characters: 8.5,
      language: 8.9,
      idea: 7.9,
      vibe: 8.2,
    },
  },
  {
    id: "6",
    title: "Анна Каренина",
    author: "Лев Толстой",
    cover: "https://images.unsplash.com/photo-1597149306035-5f6758b04d57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    genres: ["Классика", "Роман"],
    description: "Монументальное произведение о любви, семье и обществе в России XIX века.",
    avgRating: 79,
    totalRatings: 1321,
    avgCriteria: {
      architecture: 9.1,
      characters: 9.6,
      language: 9.4,
      idea: 8.9,
      vibe: 8.8,
    },
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    bookId: "1",
    authorName: "Александр Петров",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 82,
    text: "Булгаков создал произведение, которое читается на множестве уровней. Сатирический слой переплетается с философским, а мистика с реализмом. Каждое перечитывание открывает новые грани.",
    date: "2026-01-15",
    likes: 42,
  },
  {
    id: "2",
    bookId: "1",
    authorName: "Мария Соколова",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 75,
    text: "Великолепный роман, хотя некоторые линии показались мне затянутыми. Воланд и его свита — потрясающие персонажи. Язык Булгакова завораживает.",
    date: "2026-02-01",
    likes: 28,
  },
  {
    id: "3",
    bookId: "2",
    authorName: "Дмитрий Иванов",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 79,
    text: "Пугающая актуальность романа спустя десятилетия после написания. Оруэлл создал образ тоталитаризма, который стал нарицательным.",
    date: "2026-01-20",
    likes: 56,
  },
];