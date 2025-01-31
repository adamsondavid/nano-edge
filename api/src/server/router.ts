import { contract } from "../contract";
import { tsr } from "@ts-rest/serverless/fetch";

export function initRouter() {
  return tsr.router(contract, {
    async putDeployment({ params }, { request }) {
      // TODO: implement

      const data: ReadableStream = request.body!;

      console.log(await data.getReader().read());
      return { status: 200, body: {} };
    },
  });
}
