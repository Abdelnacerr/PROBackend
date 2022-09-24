import { Context, S3Object } from "../deps.ts";
import apiFactory from "../services/aws/apiFactory.ts";
import { Rekognition } from "../services/aws/rekognitionClass.ts";

const indexFaces = async (ctx: Context) => {
  const body = ctx.request.body();
  const image: S3Object = await body.value;
  const collectionId = Deno.env.get("collectionId") || "";

  try {
    const rekognition = new Rekognition(apiFactory);
    const indexFaces = await rekognition.indexFaces({
      CollectionId: collectionId,
      Image: {
        S3Object: {
          Bucket: image.Bucket,
          Name: image.Name,
        },
      },
    });
    ctx.response.body = indexFaces;
  } catch (error) {
    ctx.response.body = error;
  }
};

export default indexFaces;
