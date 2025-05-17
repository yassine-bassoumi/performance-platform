# frontend/Dockerfile

# 1) Base image Node 18
FROM node:18

# 2) Active le provider legacy d'OpenSSL pour éviter l'erreur ERR_OSSL_EVP_UNSUPPORTED
ENV NODE_OPTIONS=--openssl-legacy-provider

# 3) Définit le répertoire de travail
WORKDIR /app

# 4) Copie package.json et package-lock.json, puis installe les dépendances
COPY package*.json ./
RUN npm install

# 5) Copie le reste du code
COPY . .

# 6) Expose le port sur lequel CRA tourne par défaut
EXPOSE 3000

# 7) Commande de démarrage
CMD ["npm", "start"]
