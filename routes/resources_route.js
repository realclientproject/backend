//
import express from "express";
import Controller from "../controllers/resources_controller.js";
import fileHandle from "../middleware/upload_file.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.post("/",verifyAdmin,fileHandle,Controller.addResource);
router.put( "/:id",verifyAdmin, fileHandle, Controller.updateResources);
router.delete("/:id",  verifyAdmin,Controller.deleteResource);  






export default router;



