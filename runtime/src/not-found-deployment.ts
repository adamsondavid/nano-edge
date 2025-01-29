import { Deployment } from "./deployment.ts";

export const notFoundDeployment: Deployment = {
  fetch() {
    return new Response("NotFoundError. The deployment you were looking for does not exist.", { status: 404 });
  }
}
