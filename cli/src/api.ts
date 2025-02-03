import { ApiFetcherArgs, initClient, tsRestFetchApi } from "@ts-rest/core";
import { contract, JWT } from "../../api/src/contract";

export function useApi(_jwt: string) {
  const jwt = JWT.parse(_jwt);

  const api = initClient(contract, {
    baseUrl: `${jwt.payload.iss}/api`,
    baseHeaders: { authorization: jwt.raw },
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

  return {
    putDeployment(tarball: any) {
      return api.putDeployment({ params: { deployment: jwt.payload.deployment }, body: tarball });
    },
  };
}
