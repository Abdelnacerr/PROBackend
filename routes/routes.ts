import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.ts";

const router = new Router();

router
  .post("/users", addUser)
  .get("/users", getUsers)
  .get("/users/:id", getUserById)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

export default router;
