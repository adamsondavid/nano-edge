import "../../../../.common/uuid/functions/function/patch-globals.js";

try {
  const { default: handle } = await import("./main.js");
  Deno.serve(async (request) => {
    try {
      return await handle(request);
    } catch (err) {
      console.error(err);
      return new Response("internal server error", { status: 500 });
    }
  });
} catch (err) {
  console.error(err);
}
