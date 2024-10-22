export default async function(req) {
  return fetch(new URL("http://172.18.0.3/deployments/tapw.tar.gz"));
}
