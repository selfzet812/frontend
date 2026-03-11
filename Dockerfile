# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости отдельным слоем (кеш npm)
COPY package*.json ./
RUN npm ci --silent

# Копируем исходники и собираем
COPY . .
RUN npm run build

# ── Stage 2: Serve ──────────────────────────────────────────
FROM nginx:1.25-alpine

# Убираем дефолтный конфиг Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы React из stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
