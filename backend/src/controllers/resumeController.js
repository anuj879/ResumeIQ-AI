import { extractText } from "../services/pdfService.js";
import { AppError } from "../utils/AppError.js";
export async function extract(req, res) {
  if (!req.file) throw new AppError(400, "No file received. Choose a PDF.", "NO_FILE");
  res.json(await extractText(req.file.buffer));
}
