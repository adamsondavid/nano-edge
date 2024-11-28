const eventManager = new EventManager();
for await (const data of eventManager) {
  if (data) {
    console.dir(data, { depth: Infinity });
  }
}
