import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createUploadConfig(relativePath) {
  const uploadDir = path.join(__dirname, relativePath);
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
      cb(null, safeName);
    },
  });

  return { upload: multer({ storage }), uploadDir };
}

export const projectUpload = createUploadConfig("../storage/projects");
export const serviceUpload = createUploadConfig("../storage/services");
export const leadershipUpload = createUploadConfig("../storage/leadership");
