import { QueryObjectResult } from "https://deno.land/x/postgres@v0.15.0/query/query.ts";
import { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { User } from "../models/user.ts";
import client from "../config.ts";

const getUsers = async (ctx: Context) => {
  try {
    await client.connect();

    const result: QueryObjectResult<User> = await client.queryObject(
      "SELECT * FROM users",
    );

    const records: User[] = result.rows;

    if (records.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        records,
      };
    } else {
      ctx.response.body = {
        success: false,
        users: records,
      };
    }
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      msg: err.toString(),
      success: false,
    };
  } finally {
    await client.end();
  }
};

const getUserById = async (
  ctx: Context,
) => {
  try {
    await client.connect();

    const userId = ctx.request.url.pathname.split("/")[2];

    const result: QueryObjectResult<User> = await client.queryObject(
      "SELECT * FROM users WHERE id = $1",
      [userId],
    );

    if (result.rows.toString() === "") {
      ctx.response.status = 404;
      ctx.response.body = {
        msg: `No user with the id of ${userId}`,
        success: false,
      };
      return;
    } else {
      const user = {} as User;
      result.rows.map((row) => {
        user.id = row.id;
        user.mobile = row.mobile;
      });
      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        user,
      };
    }
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      msg: err.toString(),
      success: false,
    };
  } finally {
    await client.end();
  }
};

export { getUserById, getUsers };
