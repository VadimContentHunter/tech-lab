# Используем версию Node.js 24
FROM node:24

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
