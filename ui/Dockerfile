FROM node:22-alpine
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build
EXPOSE 3000/tcp
ENTRYPOINT ["node", "--enable-source-maps", "dist/main.js"]
