import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/users.ts";

import login from "../controllers/login.ts";
import authMiddleware from "../middleWares/authMiddleware.ts";
import { Router } from "../deps.ts";
import { logout } from "../controllers/logout.ts";
import { createFaceList } from "../services/AzurefaceApi/faceList.ts";

const router = new Router();

router
  .post("/api/login", login)
  .post("/api/logout", logout)
  .post("/api/users", authMiddleware, addUser)
  .get("/api/users", authMiddleware, getUsers)
  .get("/api/users/:id", authMiddleware, getUserById)
  .put("/api/users/:id", authMiddleware, updateUser)
  .delete("/api/users/:id", authMiddleware, deleteUser)
  .put("/api/createFaceList", createFaceList);

export default router;
