import { z } from "zod";
import { initRouter } from "./router";
import { contract } from "../contract";
import { fetchRequestHandler } from "@ts-rest/serverless/fetch";
import { S3Client } from "@aws-sdk/client-s3";
import { connectAsync } from "mqtt";

export async function initApi(unvalidatedEnv: unknown) {
  const env = z.object({}).parse(unvalidatedEnv);

  const s3Client = new S3Client({
    forcePathStyle: true,
    endpoint: "http://storage:9000",
    region: "auto",
    credentials: {
      accessKeyId: "admin",
      secretAccessKey: "adminadmin",
    },
  });

  const mqttClient = await connectAsync("mqtt://mqtt:1883");

  const router = initRouter(s3Client, mqttClient);

  return (request: Request) =>
    fetchRequestHandler({
      request,
      contract,
      router,
      options: { jsonQuery: true, responseValidation: true, basePath: "/api" },
    });
}
