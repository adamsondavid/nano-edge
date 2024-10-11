# Homebrew Serverless

Output API

functions

- api.js

static

- index.html
- main.js

/api -> functions/api.js

/api/some/sub/path -> functions/api.js

/index.html -> static/index.html

/main.js -> static/main.js

/some/random/path -> static/index.html

if a static file exists with same name as a function, the function is served

do not deploy secrets that are really secret! these secrets might be exploitable!

a function can access env vars by process.env

the signature of a function is `export default async (request: Request) => Promise<Response>`
