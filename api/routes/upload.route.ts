import multer from "multer";
import path from "path";
import { Router } from "express";
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/../public/images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage: storage });
router.post("/", upload.single("file"), (req, res) => {
  // Handle the uploaded file
  const file = req.file;
  res.json({ path: "/images/" + file?.filename });
});

export default router;
