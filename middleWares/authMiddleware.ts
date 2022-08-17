import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { Context, verify } from "../deps.ts";
import { jwtKey } from "./cryptoKey.ts";

const authMiddleware = async (ctx: Context, next: () => Promise<unknown>) => {
  const headers: Headers = ctx.request.headers;

  const authorization = headers.get("Authorization");
  const cookies = await ctx.cookies.get("jwt") || "";

  if (!authorization || !cookies) {
    ctx.response.status = 401;
    ctx.response.body = {
      success: false,
      msg: "Authorization failed.!",
    };
    return;
  }

  const jwt = authorization.split(" ")[1];
  const decodedJWT = await verify(jwt, jwtKey);

  if (decodedJWT && cookies) {
    ctx.response.body = {
      success: true,
      msg: "Auth successful",
    };
    await next();
    return;
  }

  ctx.response.status = 401;
  ctx.response.body = { message: "Invalid jwt token" };
};

export default authMiddleware;
