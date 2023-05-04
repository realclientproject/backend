import express from "express";
import Controller from "../controllers/resources_controller.js";
import upload from "../middleware/upload_file.js";
// import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.post("/",upload.single("media"),Controller.addResource);
router.put( "/:id", upload.single("media"), Controller.updateResources);
router.delete("/:id",  Controller.deleteResource);  

export default router;
