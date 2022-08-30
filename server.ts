import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { Application } from "./deps.ts";
import router from "./routes/routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = Deno.env.get("PORT") || 8082;

console.log(`Server running on port ${PORT} `);

await app.listen({ port: +PORT });

//deno run --allow-env --allow-net --allow-read twilioSendSms.ts
// denon run --allow-net --allow-env --allow-read server.ts
