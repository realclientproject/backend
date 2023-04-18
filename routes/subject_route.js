import express from "express";
const router = express.Router();
import subject_controller from "../controllers/subjects_controllers.js";
// import auth from "../middlewares/auth.js";

router.get("/:id", subject_controller.getById);
router.get("/", subject_controller.getAll);
router.post("/add",subject_controller.add);
router.put("/:id",subject_controller.Update);
router.delete("/:id",  subject_controller.Delete);

export default router;
