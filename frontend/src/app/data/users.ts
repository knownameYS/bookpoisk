export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinDate: string;
  stats: {
    booksRated: number;
    reviewsWritten: number;
    avgRating: number;
  };
  tasteProfile: {
    architecture: number;
    characters: number;
    language: number;
    idea: number;
    vibe: number;
  };
}

export interface UserRatingHistory {
  id: string;
  userId: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCover: string;
  criteria: {
    architecture: number;
    characters: number;
    language: number;
    idea: number;
    vibe: number;
  };
  finalScore: number;
  date: string;
}

export const users: UserProfile[] = [
  {
    id: "1",
    name: "Александр Петров",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    bio: "Люблю классическую литературу и философские романы. Особенно ценю глубину персонажей и архитектуру нарратива.",
    joinDate: "2024-03-15",
    stats: {
      booksRated: 42,
      reviewsWritten: 18,
      avgRating: 76,
    },
    tasteProfile: {
      architecture: 8.9,
      characters: 9.2,
      language: 8.7,
      idea: 9.0,
      vibe: 8.5,
    },
  },
  {
    id: "2",
    name: "Мария Соколова",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    bio: "Читаю всё подряд — от фантастики до классики. Ищу книги с сильной атмосферой.",
    joinDate: "2024-01-20",
    stats: {
      booksRated: 67,
      reviewsWritten: 25,
      avgRating: 72,
    },
    tasteProfile: {
      architecture: 7.8,
      characters: 8.5,
      language: 8.9,
      idea: 7.6,
      vibe: 9.1,
    },
  },
  {
    id: "3",
    name: "Дмитрий Иванов",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    bio: "Предпочитаю антиутопии и интеллектуальную прозу. Идея книги для меня важнее стиля.",
    joinDate: "2023-11-05",
    stats: {
      booksRated: 89,
      reviewsWritten: 34,
      avgRating: 74,
    },
    tasteProfile: {
      architecture: 8.4,
      characters: 7.9,
      language: 7.7,
      idea: 9.3,
      vibe: 8.2,
    },
  },
  {
    id: "4",
    name: "Елена Васильева",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    bio: "Филолог, люблю разбирать язык и стиль автора. Ценю красоту слова.",
    joinDate: "2024-05-12",
    stats: {
      booksRated: 56,
      reviewsWritten: 29,
      avgRating: 78,
    },
    tasteProfile: {
      architecture: 8.3,
      characters: 8.6,
      language: 9.5,
      idea: 8.1,
      vibe: 8.4,
    },
  },
  {
    id: "5",
    name: "Игорь Смирнов",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    bio: "Начинающий читатель системы 84. Пока разбираюсь в критериях оценки.",
    joinDate: "2025-12-01",
    stats: {
      booksRated: 12,
      reviewsWritten: 3,
      avgRating: 68,
    },
    tasteProfile: {
      architecture: 7.5,
      characters: 7.8,
      language: 7.2,
      idea: 7.6,
      vibe: 8.0,
    },
  },
  {
    id: "6",
    name: "Анна Морозова",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
    bio: "Книжный блогер. Люблю магический реализм и современную литературу.",
    joinDate: "2024-02-28",
    stats: {
      booksRated: 103,
      reviewsWritten: 47,
      avgRating: 75,
    },
    tasteProfile: {
      architecture: 8.6,
      characters: 8.9,
      language: 8.8,
      idea: 8.2,
      vibe: 9.0,
    },
  },
];

// Мок данных для истории оценок текущего пользователя (id: "1" - Александр Петров)
export const userRatingHistory: UserRatingHistory[] = [
  {
    id: "r1",
    userId: "1",
    bookId: "1",
    bookTitle: "Мастер и Маргарита",
    bookAuthor: "Михаил Булгаков",
    bookCover: "https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    criteria: {
      architecture: 9.5,
      characters: 9.8,
      language: 10.0,
      idea: 9.2,
      vibe: 9.5,
    },
    finalScore: 82,
    date: "2026-01-15",
  },
  {
    id: "r2",
    userId: "1",
    bookId: "3",
    bookTitle: "Преступление и наказание",
    bookAuthor: "Фёдор Достоевский",
    bookCover: "https://images.unsplash.com/photo-1644384361758-0bceb5afa61f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    criteria: {
      architecture: 9.0,
      characters: 9.5,
      language: 9.0,
      idea: 9.8,
      vibe: 8.5,
    },
    finalScore: 79,
    date: "2025-12-20",
  },
  {
    id: "r3",
    userId: "1",
    bookId: "6",
    bookTitle: "Анна Каренина",
    bookAuthor: "Лев Толстой",
    bookCover: "https://images.unsplash.com/photo-1597149306035-5f6758b04d57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    criteria: {
      architecture: 8.8,
      characters: 9.2,
      language: 9.3,
      idea: 8.5,
      vibe: 8.7,
    },
    finalScore: 77,
    date: "2025-11-05",
  },
  {
    id: "r4",
    userId: "1",
    bookId: "2",
    bookTitle: "1984",
    bookAuthor: "Джордж Оруэлл",
    bookCover: "https://images.unsplash.com/photo-1702285630048-0594da47cf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    criteria: {
      architecture: 8.7,
      characters: 8.5,
      language: 8.8,
      idea: 9.5,
      vibe: 8.3,
    },
    finalScore: 74,
    date: "2025-10-12",
  },
  {
    id: "r5",
    userId: "2",
    bookId: "1",
    bookTitle: "Мастер и Маргарита",
    bookAuthor: "Михаил Булгаков",
    bookCover: "https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    criteria: {
      architecture: 8.5,
      characters: 9.0,
      language: 9.5,
      idea: 8.2,
      vibe: 9.3,
    },
    finalScore: 75,
    date: "2026-02-01",
  },
  {
    id: "r6",
    userId: "3",
    bookId: "2",
    bookTitle: "1984",
    bookAuthor: "Джордж Оруэлл",
    bookCover: "https://images.unsplash.com/photo-1702285630048-0594da47cf4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=600",
    criteria: {
      architecture: 9.0,
      characters: 8.2,
      language: 8.0,
      idea: 9.8,
      vibe: 8.5,
    },
    finalScore: 79,
    date: "2026-01-20",
  },
];

// Функция для получения текущего пользователя (в реальности будет из localStorage/auth)
export const getCurrentUser = (): UserProfile => {
  return users[0]; // По умолчанию Александр Петров
};

// Функция для получения пользователя по ID
export const getUserById = (userId: string): UserProfile | undefined => {
  return users.find(user => user.id === userId);
};

// Функция для получения оценок пользователя
export const getUserRatings = (userId: string): UserRatingHistory[] => {
  // В реальности будет фильтрация по userId
  return userRatingHistory.filter(rating => rating.userId === userId);
};