import { contract } from "../common/contract";
import { tsr } from "@ts-rest/serverless/fetch";

export function initRouter() {
  return tsr.router(contract, {
    async getLogs({ params }) {
      // TODO: clean up implementation!
      const res = await fetch(
        `http://loki:3100/loki/api/v1/query_range?limit=250&query={deployment="${params.deployment}"}`,
      );
      if (!res.ok) throw new Error(`failed to load logs (status ${res.status})`);
      const json = await res.json(); // TODO validate schema using zod, get rid of any's

      const logs = json.data.result
        .flatMap((result: any) => result.values)
        .sort((a: any, b: any) => a[0] - b[0])
        .map(([ts, log]: any) => {
          const parsed = JSON.parse(log);
          parsed.timestamp = new Date(ts / 1000000 - (parsed.duration ?? 0));
          return parsed;
        })
        .sort((a: any, b: any) => a.timestamp - b.timestamp || a.sequence - b.sequence);

      const inboundRequests = logs.filter(
        (log: any) => log.type === "INBOUND_STATIC_REQUEST" || log.type === "INBOUND_FUNCTION_REQUEST",
      );

      const functions = new Map<string, any>();
      for (const log of inboundRequests) {
        if (log.type !== "INBOUND_FUNCTION_REQUEST") continue;
        if (log.requestId) functions.set(log.requestId, log);
      }

      for (const log of logs) {
        if (log.type !== "FUNCTION_LOG") continue;
        const fn = functions.get(log.requestId);
        if (!fn) {
          console.warn("failed to correlate log. parent not found.");
          continue;
        }
        (fn.logs ??= []).push(log);
      }

      return { status: 200, body: inboundRequests };
    },
  });
}
