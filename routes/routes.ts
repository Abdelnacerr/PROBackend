import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getUsers } from "../controllers/users.ts";

const router = new Router();

router.get("/users", getUsers);

export default router;
