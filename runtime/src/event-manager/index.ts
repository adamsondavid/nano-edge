// deno-lint-ignore ban-ts-comment
// @ts-ignore
const eventManager = new EventManager();

for await (const data of eventManager) {
  if (data) {
    console.dir(data, { depth: Infinity });
  }
}
