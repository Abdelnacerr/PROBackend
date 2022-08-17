import { Context } from "../deps.ts";

export const logout = (ctx: Context) => {
  ctx.cookies.delete("jwt");

  ctx.response.body = {
    message: "success",
  };
};
