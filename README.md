# User Service API

Тестовый Node.js проект для работы с пользователями. Реализован на **Node.js**, **Express**, **TypeScript**, **Prisma** и **PostgreSQL**.

---

## 🔹 Функционал

- Регистрация пользователя
- Авторизация (JWT)
- Получение пользователя по ID (доступно админу или самому пользователю)
- Получение списка пользователей (только админ)
- Блокировка/разблокировка пользователя (админ или пользователь сам себя)

---

## 🔹 Технологии

- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- bcrypt (для хэширования паролей)
- JWT (JSON Web Tokens) для авторизации
- Zod для валидации данных
- ts-node-dev для разработки

---

## 🔹 Установка и запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/lazenyuk-dmitry/user_service_express_api.git
cd user_service_express_api
```

2. Установка зависимостей:
```bash
npm install
```

3. Создать .env файл на основе .env.example и указать:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/user_service?schema=public"
JWT_SECRET="your_secret_key"
SALT_ROUNDS=10
```

4. Установить и запустить PostgreSQL (локально):
- Установить PostgresSQL (если не установлено)
- Запустить службу PostgresSQL

5. Применить миграции (в зависимости от окружения):
```bash
npm run migrate:dev
npm run migrate:deploy
npm run migrate:reset
```

6. По желанию можно добавить пользователей в таблицу (опционально):
```bash
npm run generate-db:users
```

7. Запуск для разработки:
```bash
npm run dev
```

7. Запуск в продакшене:
```bash
npm run build
npm start
```

---

## 🔹 API эндпоинты

| Метод | URL                      | Доступ          | Описание                              |
| ----- | ------------------------ | --------------- | ------------------------------------- |
| POST  | /api/v1/auth/register    | public          | Регистрация пользователя              |
| POST  | /api/v1/auth/login       | public          | Авторизация пользователя              |
| GET   | /api/v1/users/\:id       | админ / свой ID | Получение пользователя по ID          |
| GET   | /api/v1/users            | админ           | Получение списка пользователей        |
| PATCH | /api/v1/users/\:id/block | админ / свой ID | Блокировка/разблокировка пользователя |

> JWT передавать через заголовок Authorization: Bearer `<token>`

---

## 🔹 Postman

- Коллекция Postman: [postman/user_service_express_api.postman_collection.json](postman/user_service_express_api.postman_collection.json)
- Передача и сохранение токена настроена. После логина сохраняется авторизация пользователя в Postman
