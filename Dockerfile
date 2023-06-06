# Use uma imagem base com o Node.js instalado
FROM node:20

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY . /app

# Instala as dependências do projeto
RUN yarn install

# Instala o Chromium
RUN apt-get update && apt-get install -y chromium

# Define as variáveis de ambiente necessárias para o Puppeeter
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV PUPPETEER_NO_SANDBOX=true

# Define o comando padrão que será executado quando o contêiner for iniciado
CMD yarn start