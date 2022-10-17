import { accountType } from "../models/accountType.ts";
import client from "../../config.ts";
import { Context, QueryObjectResult } from "../deps.ts";

const getAccountTypes = async (ctx: Context) => {
  try {
    await client.connect();

    const result: QueryObjectResult<accountType> = await client.queryObject(
      `SELECT * FROM "accountType" WHERE "isDeleted"=$1`,
      ["FALSE"],
    );

    const records: accountType[] = result.rows;

    if (records.length > 0) {
      ctx.response.status = 200;
      ctx.response.body = records;
    } else {
      ctx.response.body = {
        success: false,
        accountType: records,
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

export { getAccountTypes };
