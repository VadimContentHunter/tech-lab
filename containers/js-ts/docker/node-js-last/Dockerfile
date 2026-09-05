# Используем последнюю версию Node.js
FROM node:latest

# Рабочая директория приложения
WORKDIR /workspace

# Копируем package.json и package-lock.json
COPY ./project/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем проект
COPY ./project ./

# Запуск приложения
CMD ["npm", "start"]
