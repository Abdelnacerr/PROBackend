import {
  client,
  cmnP,
  CreateCollectionRequest,
  CreateCollectionResponse,
  IndexFacesRequest,
  IndexFacesResponse,
  jsonP,
  OrientationCorrection,
} from "../../deps.ts";
import { fromImage, toFaceRecord, toUnindexedFace } from "./helpers/helpers.ts";

export class Rekognition {
  #client: client.ServiceClient;
  constructor(apiFactory: client.ApiFactory) {
    this.#client = apiFactory.buildServiceClient(Rekognition.ApiMetadata);
  }

  static ApiMetadata: client.ApiMetadata = {
    "apiVersion": "2016-06-27",
    "endpointPrefix": "rekognition",
    "jsonVersion": "1.1",
    "protocol": "json",
    "serviceFullName": "Amazon Rekognition",
    "serviceId": "Rekognition",
    "signatureVersion": "v4",
    "targetPrefix": "RekognitionService",
    "uid": "rekognition-2016-06-27",
  };

  async createCollection(
    params: CreateCollectionRequest,
  ): Promise<CreateCollectionResponse> {
    const body: jsonP.JSONObject = {
      CollectionId: params["CollectionId"],
      Tags: params["Tags"],
    };
    const response = await this.#client.performRequest({
      body,
      action: "CreateCollection",
    });
    return jsonP.readObj({
      required: {},
      optional: {
        "StatusCode": "n",
        "CollectionArn": "s",
        "FaceModelVersion": "s",
      },
    }, await response.json());
  }

  /** Detects faces in the input image and adds them to the specified collection. */
  async indexFaces(
    params: IndexFacesRequest,
  ): Promise<IndexFacesResponse> {
    const body: jsonP.JSONObject = {
      CollectionId: params["CollectionId"],
      Image: fromImage(params["Image"]),
      ExternalImageId: params["ExternalImageId"],
      DetectionAttributes: params["DetectionAttributes"],
      MaxFaces: params["MaxFaces"],
      QualityFilter: params["QualityFilter"],
    };

    try {
      const response = await this.#client.performRequest({
        body,
        action: "IndexFaces",
      });
      return jsonP.readObj({
        required: {},
        optional: {
          "FaceRecords": [toFaceRecord],
          "OrientationCorrection": (x: jsonP.JSONValue) =>
            cmnP.readEnum<OrientationCorrection>(x),
          "FaceModelVersion": "s",
          "UnindexedFaces": [toUnindexedFace],
        },
      }, await response.json());
    } catch (error) {
      return error;
    }
  }
}
