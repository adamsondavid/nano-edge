FROM node:22
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci --prefer-offline --no-audit
COPY . .
RUN npm run build
ENTRYPOINT ["/bin/sh", "-c" , "npm run dev & npx onchange -i test/example-app/** -- npx @nano-edge/cli deploy --root test/example-app --auth-token example"]
