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

# Como o Vite está configurado com base: "/protocolo1/",
# os arquivos precisam estar nessa subpasta dentro do container.
COPY --from=builder /app/dist /usr/share/nginx/html/protocolo1

# Pagina de links da bio: HTML estatico puro, nao passa pelo build do Vite.
# Copiada direto do contexto de build para /links.
COPY frontend/links /usr/share/nginx/html/links

# Configuração Nginx Otimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]