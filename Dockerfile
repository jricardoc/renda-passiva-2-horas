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

# Black Vitalicia: captura (/black) e obrigado (/black-obrigado), HTML estatico.
COPY frontend/black /usr/share/nginx/html/black
COPY frontend/black-obrigado /usr/share/nginx/html/black-obrigado

# /black/config.js e gerado ao subir o container pelo envsubst da imagem do nginx,
# com as variaveis do servico no EasyPanel. Os padroes vazios garantem a troca
# (sem eles o ${...} ficaria literal no JS).
COPY frontend/black-config.js.template /etc/nginx/templates/config.js.template
ENV NGINX_ENVSUBST_OUTPUT_DIR=/usr/share/nginx/html/black \
    GHL_WEBHOOK_URL="" \
    BLACK_GRUPO_URL="" \
    BLACK_VIDEO_VTURB_ID=""

# Arquivos servidos na raiz do dominio (ex.: chave do IndexNow), fora do build do Vite.
COPY frontend/raiz/ /usr/share/nginx/html/

# Configuração Nginx Otimizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]