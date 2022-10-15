import { User } from "../models/user.ts";
import client from "../../config.ts";
import { Context, QueryObjectResult } from "../deps.ts";

const getUsers = async (ctx: Context) => {
  try {
    await client.connect();

    const result: QueryObjectResult<User> = await client.queryObject(
      `SELECT * FROM users WHERE "isDeleted"=$1`,
      ["FALSE"],
    );

    const records: User[] = result.rows;

    if (records.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = records;
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

const getUserById = async (ctx: Context) => {
  try {
    await client.connect();

    const id = ctx.request.url.pathname.split("/")[3];

    const result: QueryObjectResult<User> = await client.queryObject(
      `SELECT * FROM users WHERE id=$1 AND "isDeleted"=$2`,
      [id, "FALSE"],
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
        user.isDeleted = row.isDeleted;
        user.typeId = row.typeId;
      });

      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        record: user,
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

const addUser = async (ctx: Context) => {
  const body = ctx.request.body();
  const user: User = await body.value;

  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      msg: "No Data in the body.!",
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
      if (err.toString().includes("duplicate key value")) {
        ctx.response.body = {
          msg: "User with the same mobile number already exists",
          success: false,
        };
      } else {
        ctx.response.body = {
          success: false,
          msg: err.toString(),
        };
      }
    } finally {
      await client.end();
    }
  }
};

const updateUser = async (ctx: Context) => {
  await getUserById(ctx);

  if (ctx.response.status === 404) {
    ctx.response.body = {
      success: false,
      msg: ctx.response.body,
    };
    return;
  } else {
    const id: string = ctx.request.url.pathname.split("/")[3];
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
          //if user only provided a mobile, update only the mobile, if user only provided a typeId, update only the typeId, if user provided both, update both
          `UPDATE users SET mobile=$1, "typeId"=$2 WHERE id=$3 AND "isDeleted"=$4`,
          [
            user.mobile,
            user.typeId,
            id,
            "FALSE",
          ],
        );

        ctx.response.status = 200;
        ctx.response.body = {
          id: id,
          mobile: user.mobile,
          isDeleted: false,
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

const deleteUser = async (ctx: Context) => {
  await getUserById(ctx);

  if (ctx.response.status === 404) {
    ctx.response.body = { success: false, msg: ctx.response.body };
    ctx.response.status = 404;
    return;
  } else {
    try {
      await client.connect();
      const id: string = ctx.request.url.pathname.split("/")[3];

      await client.queryObject(
        `UPDATE users SET "isDeleted"=$1 WHERE id=$2`,
        ["TRUE", id],
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
