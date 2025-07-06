import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";
import { Multer } from "multer";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads");

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req: Request, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter to only allow images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."));
  }
};

// Configure multer
const upload: Multer = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Delete uploaded files
const deleteFiles = (files: Express.Multer.File[] | undefined): void => {
  if (!files) return;

  files.forEach((file) => {
    const filePath = path.join(__dirname, "..", file.path);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete ${file.path}:`, err);
      }
    });
  });
};

export { upload, deleteFiles };
