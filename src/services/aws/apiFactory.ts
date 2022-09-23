import { client } from "../../deps.ts";

const apiFactory = new client.ApiFactory({
  region: "ap-southeast-2",
  credentials: {
    awsAccessKeyId: "AKIAZDEAL7GQS3MBZVAU",
    awsSecretKey: "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",
  },
});

export default apiFactory;
