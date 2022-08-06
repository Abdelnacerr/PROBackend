import { Client } from "https://deno.land/x/postgres@v0.15.0/mod.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.15.0/query/query.ts";
import { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { User } from "../models/user.ts";
import pool from "../config.ts";

const client = new Client(pool);

const getUsers = async (ctx: Context) => {
  try {
    await client.connect();

    const result: QueryObjectResult<User> = await client.queryObject(
      "SELECT * FROM users",
    );

    const users: User[] = [];

    result.rows.map((user: User) => {
      users.push(user);
    });
    ctx.response.body = {
      users,
      success: true,
      noData: false,
    };
    console.log(ctx.response.body);
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = {
      msg: err.toString(),
      success: false,
      noData: true,
    };
  } finally {
    await client.end();
  }
};

export { getUsers };
