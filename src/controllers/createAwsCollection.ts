import { Context } from "../deps.ts";
import apiFactory from "../services/aws/apiFactory.ts";
import { Rekognition } from "../services/aws/rekognitionClass.ts";

const rekognition = new Rekognition(apiFactory);

const createCollection = async (ctx: Context) => {
  const collectionId = Deno.env.get("collectionId") || "";

  try {
    const collection = await rekognition.createCollection({
      CollectionId: collectionId,
    });
    ctx.response.body = collection;
  } catch (error) {
    ctx.response.body = error;
  }
};

export default createCollection;
