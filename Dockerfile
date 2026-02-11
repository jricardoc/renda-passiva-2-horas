# --- ETAPA 1: Construir o Site 1 ---
FROM node:18-alpine as builder1
WORKDIR /app
COPY renda-passiva-2-horas/package*.json ./
RUN npm install
COPY renda-passiva-2-horas/ .
RUN npm run build

# --- ETAPA 2: Construir o Site 2 ---
FROM node:18-alpine as builder2
WORKDIR /app
COPY renda-passiva-2-horas2/package*.json ./
RUN npm install
COPY renda-passiva-2-horas2/ .
RUN npm run build

# --- ETAPA 3: Construir o Site 3 ---
FROM node:18-alpine as builder3
WORKDIR /app
COPY renda-passiva-2-horas3/package*.json ./
RUN npm install
COPY renda-passiva-2-horas3/ .
RUN npm run build

# --- ETAPA 4: Servir tudo com Nginx ---
FROM nginx:alpine

# Copia o resultado do Site 1 para a pasta pública com o nome da rota
COPY --from=builder1 /app/dist /usr/share/nginx/html/renda-passiva-2-horas

# Copia o resultado do Site 2 para a outra pasta
COPY --from=builder2 /app/dist /usr/share/nginx/html/renda-passiva-2-horas2

# (Opcional) Cria um index na raiz para não dar erro 403 se acessarem o domínio puro
RUN echo "<h1>Acesse <a href='/renda-passiva-2-horas/'>Site 1</a> ou <a href='/renda-passiva-2-horas2/'>Site 2</a></h1>" > /usr/share/nginx/html/index.html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configuração necessária para o React Router não quebrar em subpastas (SPA)
# Se der erro 404 ao atualizar a página, me avise que ajustamos o nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]