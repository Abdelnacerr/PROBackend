import "https://deno.land/x/dotenv@v3.2.0/load.ts";
const secretJwtKey = Deno.env.get("SecretJwtKey");

export const jwtKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretJwtKey),
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

// if ((await callDb(user.mobile)).rows.length === 0) {
//         await addUser(ctx);
//         console.log("res", ctx.response.body);
//       }

//       if ((await callDb(user.mobile)).rows.length) {
//         //1. send sms via twiliosms
//         const payload: Payload = {
//           iss: user.mobile,
//         };

//         const jwt = await createToken(header, payload, jwtKey);
//         await ctx.cookies.set("jwt", jwt, { httpOnly: true });
//         // console.log(ctx.cookies.get("jwt"));

//         if (jwt) {
//           ctx.response.status = 200;
//           ctx.response.body = {
//             mobile: user.mobile,
//             jwt,
//           };
//         } else {
//           ctx.response.status = 500;
//           ctx.response.body = {
//             success: false,
//             msg: "Error creating JWT",
//           };
//         }
//       }
