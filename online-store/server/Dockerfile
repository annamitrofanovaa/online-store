# Используем базовый образ с Node.js
FROM node:14

# Установка рабочей директории в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта
COPY . .

RUN npm install -g nodemon



# Определение порта, который приложение будет использовать
EXPOSE 5000

# Команда для запуска сервера
CMD ["npm", "run", "dev"]