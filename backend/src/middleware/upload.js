import multer from "multer";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
// Memory storage: the PDF is never written to disk, so no temp files exist to clean up.
const m = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.maxPdfBytes, files: 1 },
  fileFilter: (_r, f, cb) => (f.mimetype === "application/pdf" ? cb(null, true) : cb(new AppError(400, "Only PDF files are accepted.", "NOT_PDF"))) });
export const uploadResume = (req, res, next) =>
  m.single("resume")(req, res, (err) => {
    if (err?.code === "LIMIT_FILE_SIZE") return next(new AppError(413, "File is over 5 MB.", "TOO_LARGE"));
    next(err);
  });
