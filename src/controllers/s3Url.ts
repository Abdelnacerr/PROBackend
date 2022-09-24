import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import { Context, getSignedUrl } from "../deps.ts";

const getS3Url = (ctx: Context) => {
  try {
    const url = getSignedUrl({
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
      bucketName: Deno.env.get("AWS_BUCKET_NAME")!,
      objectPath: "/fileName.jpg",
      region: Deno.env.get("AWS_REGION")!,
    });
    ctx.response.status = 200;
    ctx.response.body = {
      url,
    };
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      msg: err.toString(),
      success: false,
    };
  }
};

export default getS3Url;
