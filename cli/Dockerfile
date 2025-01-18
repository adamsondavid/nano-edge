FROM node:22-alpine
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build
ENTRYPOINT ["/bin/sh", "-c" , "npm run dev & SHELL=/bin/sh npx chokidar-cli --initial test/example-app/** -c \"npx @nano-edge/cli deploy --root test/example-app --auth-token example\" & wait"]
