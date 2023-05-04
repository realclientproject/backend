import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname.replace(/.jpg|.jpeg|.png|.pdf|.pptx/gi, "") + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
  },
});

 const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|pptx)$/)) {
      return cb(new Error("Please upload a valid file type! only jpg, jpeg, png, pdf, and pptx are accepted."));
    }
    cb(null, true);
  },
});

export default upload;