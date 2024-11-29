import "../../../../.common/uuid/functions/function/patch-globals.js";

try { // TODO: is this try catch really needed when we add a try catch to deployment.ts
  const { default: handle } = await import("./main.js");
  Deno.serve(async (request) => {
    try {
      return await handle(request);
    } catch (err) { // TODO: is this try catch really needed when we add a try catch to deployment.ts
      console.error(err);
      return new Response("internal server error", { status: 500 });
    }
  });
} catch (err) {
  console.error(err);
}
