import { ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { contract } from "../../api/src/contract";

export function useApi(baseUrl: string) {
  return initClient(contract, {
    baseUrl: `${baseUrl}/api`,
    baseHeaders: {},
    throwOnUnknownStatus: true,
    jsonQuery: true,
    validateResponse: true,
    api: (args: ApiFetcherArgs) => {
      //@ts-expect-error
      if (args.route.contentType && args.route.contentType !== "application/json") {
        //@ts-expect-error
        args.body = args.rawBody;
        //@ts-expect-error
        args.headers["content-type"] = args.route.contentType;
      }
      //@ts-expect-error
      if (args.body?.[Symbol.asyncIterator]) args.fetchOptions = { ...args.fetchOptions, duplex: "half" };

      return tsRestFetchApi(args);
    },
  });
}
