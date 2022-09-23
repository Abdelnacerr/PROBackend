import { client } from "../../deps.ts";

const apiFactory = new client.ApiFactory({
  region: Deno.env.get("AWS_REGION")!,
  credentials: {
    awsAccessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
    awsSecretKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
  },
});

export default apiFactory;
