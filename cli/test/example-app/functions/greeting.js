/**
 * @param request {Request}
 */
export default async function (request) {
  const name = new URL(request.url).searchParams.get("name");
  console.log(`Greeting ${name}`);
  return new Response(`Hello ${name}!`);
}
