import express from "express";
import Controller from "../controllers/resources_controller.js";
import fileHandle from "../middleware/upload_file.js";
// import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", Controller.getAll);
router.get("/:id", Controller.getById);
router.post("/",fileHandle,Controller.addResource);
router.put( "/:id", fileHandle, Controller.updateResources);
router.delete("/:id",  Controller.deleteResource);  



// export const deleteResource = async (req, res) => {
//   let { id } = req.params;
//   try {
//       const category = await Model.findByIdAndDelete({ _id: id });
//       if (category !== null && category !== undefined) {
//           fs.unlinkSync($`{category.image}`, (err) => {
//               if (err) throw err;
//               console.log(`Successfully deleted media ${resource.media}`);
//           });
//       }

//       res.status(200).json("resource deleted successfully");
//   } catch (error) {
//       res.json({ error: error.message });
//   }
// };

export default router;




// import express from "express";
// const router = express.Router();
// import resource_controller from "../controllers/resources_controller.js";
// import MediaUpload from "../middleware/upload_file.js";

// router.get("/:id",resource_controller.getById);
// router.get("/", resource_controller.getAll);
// router.post("/add",MediaUpload,resource_controller.addResource);
// router.put("/:id",MediaUpload.single('file'),resource_controller.updateResources);
// router.delete("/:id",MediaUpload.single('file'), resource_controller.deleteResource);

// export default router;
