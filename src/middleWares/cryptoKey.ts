import "https://deno.land/x/dotenv@v3.2.0/load.ts";
const secretJwtKey = Deno.env.get("SecretJwtKey");

export const jwtKey = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretJwtKey),
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);
