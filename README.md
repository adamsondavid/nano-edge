# Homebrew Serverless

General Note: do not deploy secrets that are really secret! these secrets might be exploitable!

## Build output API example:

- functions/api/main.js
- functions/env.js
- static/index.html
- static/main.js

The signature of a function is `export default async (request: Request) => Promise<Response>`.\
A function can access env vars by using process.env

## How inbound traffic would be handled by which resource from the build output:

- `/api` -> `functions/api/main.js` (runtime worker exec)
- `/api/some/sub/path` -> `functions/main/api.js` (runtime worker exec)
- `/index.html` -> `static/index.html` (runtime serve static)
- `/main.js` -> `static/main.js` (runtime serve static)
- `/some/random/path` -> `static/index.html` (runtime serve static)
- Edge case: If a static file exists with same name as a function, the function is served
