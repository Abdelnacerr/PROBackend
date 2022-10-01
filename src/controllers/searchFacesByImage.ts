import { Context, Rekognition, S3Object } from "../deps.ts";
import apiFactory from "../services/aws/apiFactory.ts";

const searchFacesByImage = async (ctx: Context) => {
  const body = ctx.request.body();
  const image: S3Object = await body.value;
  const collectionId = Deno.env.get("collectionId")!;

  try {
    const rekognition = new Rekognition(apiFactory);
    const searchFacesByImage = await rekognition.searchFacesByImage({
      CollectionId: collectionId,
      Image: {
        S3Object: {
          Bucket: image.Bucket,
          Name: image.Name,
        },
      },
    });
    const filteredResult = searchFacesByImage?.FaceMatches?.filter(
      (faceMatch) => faceMatch?.Similarity! > 80,
    );
    const matchedFaceURl = filteredResult?.map((faceMatch) => {
      const faceId = faceMatch?.Face?.FaceId;
      return `https://s3.amazonaws.com/${image.Bucket}/${image.Name}?faceId=${faceId}`;
    });
    ctx.response.body = {
      filteredResult,
      matchedFaceURl,
    };
  } catch (error) {
    ctx.response.body = error;
  }
};

export default searchFacesByImage;
