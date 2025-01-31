import { contract } from "../contract";
import { tsr } from "@ts-rest/serverless/fetch";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { MqttClient } from "mqtt";

export function initRouter(s3Client: S3Client, mqttClient: MqttClient) {
  return tsr.router(contract, {
    async putDeployment({ params }, { request }) {
      await new Upload({
        client: s3Client,
        params: {
          Bucket: "deployments",
          Key: `${params.deployment}.tar.gz`,
          Body: request.body!,
        },
      }).done();

      await mqttClient.publishAsync("invalidate-deployment", params.deployment, { qos: 2 });

      return {
        status: 200,
        body: `Publishing the deployment was successful: http://${params.deployment}.apps.localhost.`,
      };
    },
  });
}
