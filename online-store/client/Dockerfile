# Используйте образ с Node.js
FROM node:14

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование зависимостей и установка
COPY package*.json ./
RUN npm install

# Копирование всего остального в контейнер
COPY . .

RUN npm install -g @quasar/cli
RUN quasar build

# Указание порта, если необходимо
EXPOSE 5000

# Команда для запуска приложения (например, сервера разработки)
CMD ["quasar", "dev"]