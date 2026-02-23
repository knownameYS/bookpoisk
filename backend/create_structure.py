from pathlib import Path

# Корень структуры
root = Path("backend")

# Папки
dirs = [
    root / "src",
    root / "src/config",
    root / "src/db",
    root / "src/lib",
    root / "src/middlewares",
    root / "src/routes",
    root / "src/modules/auth",
    root / "src/utils",
]

# Файлы ( .env НЕ трогаем )
files = [
    root / "src/app.js",
    root / "src/server.js",
    root / "src/config/env.js",
    root / "src/db/index.js",
    root / "src/lib/logger.js",
    root / "src/middlewares/requestLogger.js",
    root / "src/middlewares/errorHandler.js",
    root / "src/middlewares/notFound.js",
    root / "src/routes/index.js",
    root / "src/routes/health.routes.js",
    root / "src/modules/auth/auth.routes.js",
    root / "src/modules/auth/auth.controller.js",
    root / "src/modules/auth/auth.service.js",
    root / "src/modules/auth/auth.middleware.js",
    root / "src/modules/auth/auth.validation.js",
    root / "src/utils/asyncHandler.js",
]

# Создание папок
for d in dirs:
    d.mkdir(parents=True, exist_ok=True)

# Создание пустых файлов (если их нет)
for f in files:
    f.touch(exist_ok=True)

print("Структура backend создана ✅")