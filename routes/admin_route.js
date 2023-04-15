import express from "express";
const router = express.Router();
import {
  getAll,
  get,
  register,
  login,
  logout,
  del,
  update,
} from "../controllers/admin_controller.js";
import { verifyAdmin, super_admin } from "../middleware/auth.js";
router.get("/", getAll);
router.get("/:id", get);
router.post("/register", verifyAdmin, super_admin, register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/:id", verifyAdmin, super_admin, del);
router.patch("/edit/:id", verifyAdmin, super_admin, update);

export default router;
