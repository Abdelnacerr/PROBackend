export {
  Application,
  Context,
  Router,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";
export { create as createToken } from "https://deno.land/x/djwt@v2.7/mod.ts";
export type { Header, Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";
export { Twilio } from "https://deno.land/x/twilio@0.1.1/Twilio.ts";
export { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
export { verify } from "https://deno.land/x/djwt@v2.7/mod.ts";
export { QueryObjectResult } from "https://deno.land/x/postgres@v0.15.0/query/query.ts";
export { getNumericDate } from "https://deno.land/x/djwt@v2.7/mod.ts";
export * as base64 from "https://denopkg.com/chiefbiiko/base64@master/mod.ts";
export {
  distinct,
  flatMap,
  takeUntil,
  takeWhile,
} from "https://cdn.skypack.dev/rxjs/operators";
export { from, timer } from "https://cdn.skypack.dev/rxjs";
export { axiod } from "https://deno.land/x/axiod@0.26.1/mod.ts";
export * as Base64 from "https://deno.land/std@0.120.0/encoding/base64.ts";
export * as client from "https://deno.land/x/aws_api@v0.7.0/client/mod.ts";
export * as jsonP from "https://deno.land/x/aws_api@v0.7.0/encoding/json.ts";
export { Rekognition } from "https://aws-api.deno.dev/v0.3/services/rekognition.ts";
export type {
  CreateCollectionRequest,
  CreateCollectionResponse,
  Image,
  IndexFacesRequest,
  IndexFacesResponse,
  OrientationCorrection,
  S3Object,
} from "https://aws-api.deno.dev/v0.3/services/rekognition.ts";
export * as cmnP from "https://deno.land/x/aws_api@v0.7.0/encoding/common.ts";
export { S3, S3Bucket } from "https://deno.land/x/s3@0.5.0/mod.ts";
export { getSignedUrl } from "https://deno.land/x/aws_s3_presign@1.3.0/mod.ts";
