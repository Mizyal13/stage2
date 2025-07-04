import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "src/uploads",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nameImg = path.basename(file.originalname, ext);
    cb(null, `${Date.now()} - ${nameImg}${ext}`);
  },
});

function fileFilter(req: any, file: Express.Multer.File, cb: any) {
  const allowedTypes = /jpeg|jpg|png/;
  const isValidType = allowedTypes.test(file.mimetype);
  if (isValidType) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg, jpg, and png are allowed"));
  }
}

export const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter,
});
