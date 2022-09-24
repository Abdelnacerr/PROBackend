import { axiod, Context } from "../../deps.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { faceApiEndpoint } from "../settings/endpoints.ts";

const faceListId = "np-users-facelist";
const key = Deno.env.get("KEY1");

const baseInstanceOptions = {
  baseURL: `https://${faceApiEndpoint}/face/v4.0`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": key,
  },
};

const createFaceList = async (ctx: Context) => {
  try {
    const instanceOptions = { ...baseInstanceOptions };
    const instance = await axiod.create(instanceOptions);

    const response = await instance.put(`/facelists/${faceListId}`, {
      name: "np-users-facelist",
      userData: "users face list",
      recognitionModel: "recognition_04",
    }, instanceOptions);

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      msg: "Facelist created successfully",
      data: response.data,
    };
  } catch (err) {
    ctx.response.status = err.status;
    ctx.response.body = {
      success: false,
      msg: "Error creating facelist, " + err.message,
      data: err,
    };
  }
};

const addFacesToFaceList = async (ctx: Context) => {
  try {
    const instanceOptions = { ...baseInstanceOptions };
    instanceOptions.headers["Content-Type"] = "application/octet-stream";
    const instance = axiod.create(instanceOptions);

    // const myPhotoURL =
    //   "https://mohamedstorage.blob.core.windows.net/face-api-storage/passportPhoto.jpg";

    const myPhotoURL2 =
      "/Users/mohamedabdinasir/Library/Mobile\ Documents/com~apple~CloudDocs/Documents/Citizenship\ Docs/p.photo.jpeg";
    const fileContents = await Deno.readFile(myPhotoURL2);

    const response = await instance.post(
      `/facelists/${faceListId}/persistedFaces`,
      fileContents,
    );
    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      msg: "Face added to facelist successfully",
      data: response.data,
    };
  } catch (err) {
    ctx.response.status = err.status;
    ctx.response.body = {
      success: false,
      msg: "Error adding face to facelist, " + err.message,
      data: err,
    };
  }
};

export { addFacesToFaceList, createFaceList };
