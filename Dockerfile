# --- ETAPA 1: Construir o Site ---
FROM node:18-alpine as builder
WORKDIR /app

# Instala as dependências de forma otimizada
COPY frontend/renda-passiva-2-horas/package*.json ./
RUN npm ci

# Copia o código e gera o build
COPY frontend/renda-passiva-2-horas/ .
RUN npm run build

# --- ETAPA 2: Servir com Nginx ---
FROM nginx:alpine

# Como o Vite está configurado com base: "/renda-passiva-2-horas/", 
# os arquivos precisam estar nessa subpasta dentro do container.
COPY --from=builder /app/dist /usr/share/nginx/html/renda-passiva-2-horas

# Configuração Nginx Otimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]