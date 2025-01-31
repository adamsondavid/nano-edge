import { ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { contract } from "../../api/src/contract";

export function useApi(baseUrl: string) {
  return initClient(contract, {
    baseUrl: `${baseUrl}/api`,
    baseHeaders: {},
    throwOnUnknownStatus: true,
    jsonQuery: true,
    validateResponse: true,
    api: (args: ApiFetcherArgs & { bodyOverride?: any }) => {
      if (args.bodyOverride) (args.body as any) = args.bodyOverride;
      return tsRestFetchApi(args);
    },
  });
}
