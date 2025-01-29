export interface Deployment {
  fetch(req: Request): Response | Promise<Response>;
}