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
import createCollection from "../controllers/createAwsCollection.ts";
import indexFaces from "../controllers/indexFaces.ts";
import getS3Url from "../controllers/s3Url.ts";
import searchFacesByImage from "../controllers/searchFacesByImage.ts";

const router = new Router();

router
  .post("/api/login", login)
  .post("/api/logout", logout)
  .get("/api/getS3Url/:fileName", getS3Url)
  .post("/api/users", authMiddleware, addUser)
  .get("/api/users", getUsers)
  .get("/api/users/:id", authMiddleware, getUserById)
  .put("/api/users/:id", authMiddleware, updateUser)
  .delete("/api/users/:id", authMiddleware, deleteUser)
  .get("/api/createCollection", createCollection)
  .post("/api/indexFaces", indexFaces)
  .post("/api/searchFacesByImage", searchFacesByImage);

export default router;
