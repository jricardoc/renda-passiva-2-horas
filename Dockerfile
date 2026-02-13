# --- ETAPA 1: Construir o Site 1 ---
FROM node:18-alpine as builder1
WORKDIR /app
COPY frontend/renda-passiva-2-horas/package*.json ./
RUN npm ci
COPY frontend/renda-passiva-2-horas/ .
RUN npm run build

# --- ETAPA 2: Construir o Site 2 ---
FROM node:18-alpine as builder2
WORKDIR /app
COPY frontend/renda-passiva-2-horas2/package*.json ./
RUN npm ci
COPY frontend/renda-passiva-2-horas2/ .
RUN npm run build

# --- ETAPA 3: Construir o Site 3 ---
FROM node:18-alpine as builder3
WORKDIR /app
COPY frontend/renda-passiva-2-horas3/package*.json ./
RUN npm ci
COPY frontend/renda-passiva-2-horas3/ .
RUN npm run build

# --- ETAPA 4: Servir tudo com Nginx ---
FROM nginx:alpine

# Copia os builds para suas respectivas pastas
COPY --from=builder1 /app/dist /usr/share/nginx/html/renda-passiva-2-horas
COPY --from=builder2 /app/dist /usr/share/nginx/html/renda-passiva-2-horas2
COPY --from=builder3 /app/dist /usr/share/nginx/html/renda-passiva-2-horas3

# Index unificado
RUN echo "<h1>Acesse <a href='/renda-passiva-2-horas/'>Site 1</a> ou <a href='/renda-passiva-2-horas2/'>Site 2</a> ou <a href='/renda-passiva-2-horas3/'>Site 3</a></h1>" > /usr/share/nginx/html/index.html

# Configuração Nginx Otimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]