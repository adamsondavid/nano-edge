import { ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { contract } from "../../api/src/contract";

const api = initClient(contract, {
  baseUrl: "/api",
  baseHeaders: {},
  throwOnUnknownStatus: true,
  jsonQuery: true,
  validateResponse: true,
  api: (args: ApiFetcherArgs & { bodyOverride?: BodyInit }) => {
    if (args.bodyOverride) (args.body as BodyInit) = args.bodyOverride;
    return tsRestFetchApi(args);
  },
});
export const useApi = () => api;

// TODO
api.putDeployment({
  headers: { "content-type": "application/gzip" },
  params: { deployment: "abc" },
  bodyOverride: new Blob(["hello"]).stream(),
  // @ts-ignore
  fetchOptions: { duplex: "half" },
});
