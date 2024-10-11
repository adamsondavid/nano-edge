export default async function(req) {
    return new Response(JSON.stringify(process.env));
}
