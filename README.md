# NanoEdge

General Note: do not deploy secrets that are really secret! these secrets might be exploitable!

## Build output API example:

- functions/api.js
- functions/env.json
- static/index.html
- static/main.js

The signature of a function is `export default async (request: Request) => Promise<Response>`.\
A function can access env vars by using process.env

## How inbound traffic would be handled by which resource from the build output:

- `/api` -> `functions/api/main.js` (function exec)
- `/api/some/sub/path` -> `functions/api/main.js` (function exec)
- `/index.html` -> `static/index.html` (served static)
- `/main.js` -> `static/main.js` (served static)
- `/some/random/path` -> `static/index.html` (served static)
- Edge-case (precedence): If a static file exists with same name as a function, the static file is
  not served.
  Instead, the function is executed.
