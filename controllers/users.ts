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

    const id = ctx.request.url.pathname.split("/")[2];

    const result: QueryObjectResult<User> = await client.queryObject(
      "SELECT * FROM users WHERE id = $1",
      [id],
    );

    if (result.rows.toString() === "") {
      ctx.response.status = 404;
      ctx.response.body = {
        msg: `No user with the id of ${id}`,
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
        records: user,
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

const addUser = async (
  ctx: Context,
) => {
  const body = ctx.request.body();
  const user: User = await body.value;

  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      msg: "No Data",
    };
  } else {
    try {
      await client.connect();

      await client.queryArray(
        "INSERT INTO users (mobile) VALUES ($1)",
        [user.mobile],
      );

      ctx.response.status = 201;
      ctx.response.body = {
        success: true,
        records: user,
      };
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = {
        success: false,
        msg: err.toString(),
      };
    } finally {
      await client.end();
    }
  }
};

const updateUser = async (
  ctx: Context,
) => {
  await getUserById(ctx);

  if (ctx.response.status === 404) {
    ctx.response.body = {
      success: false,
      msg: ctx.response.body,
    };
    return;
  } else {
    const id: string = ctx.request.url.pathname.split("/")[2];
    const user: User = await ctx.request.body().value;

    if (!ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        msg: "No data",
      };
    } else {
      try {
        await client.connect();

        await client.queryObject(
          "UPDATE users SET mobile=$1 WHERE id=$2",
          [
            user.mobile,
            id,
          ],
        );

        ctx.response.status = 200;
        ctx.response.body = {
          id: id,
          mobile: user.mobile,
        };
      } catch (err) {
        ctx.response.status = 500;
        ctx.response.body = {
          success: false,
          msg: err.toString(),
        };
      } finally {
        await client.end();
      }
    }
  }
};

const deleteUser = async (
  ctx: Context,
) => {
  await getUserById(ctx);

  if (ctx.response.status === 404) {
    ctx.response.body = {
      success: false,
      msg: ctx.response.body,
    };
    ctx.response.status = 404;
    return;
  } else {
    try {
      await client.connect();
      const id: string = ctx.request.url.pathname.split("/")[2];

      await client.queryObject(
        "DELETE FROM users WHERE id=$1",
        [id],
      );

      ctx.response.body = {
        success: true,
        msg: `User with id ${id} has been deleted`,
      };
    } catch (err) {
      ctx.response.status = 500;
      ctx.response.body = {
        success: false,
        msg: err.toString(),
      };
    } finally {
      await client.end();
    }
  }
};

export { addUser, deleteUser, getUserById, getUsers, updateUser };
