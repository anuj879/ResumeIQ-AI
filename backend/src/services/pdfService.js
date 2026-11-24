import pdf from "pdf-parse/lib/pdf-parse.js";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/env.js";
export async function extractText(buffer) {
  if (buffer.subarray(0, 5).toString() !== "%PDF-") throw new AppError(400, "This file is not a valid PDF.", "NOT_PDF");
  let data;
  try { data = await pdf(buffer); }
  catch (e) {
    if (/password|encrypt/i.test(e?.message || "")) throw new AppError(422, "This PDF is password protected. Remove the password and upload it again.", "ENCRYPTED");
    throw new AppError(422, "This PDF is damaged or unreadable. Re-export it from your editor and try again.", "CORRUPT");
  }
  const text = (data.text || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  if (text.length < 100)
    throw new AppError(422, "No selectable text found. This looks like a scanned or image-only PDF, and OCR is not supported. Export your resume as a text PDF from Word or Google Docs.", "SCANNED");
  const readable = (text.match(/[\p{L}\p{N}\s]/gu) || []).length / text.length;
  if (readable < 0.85)
    throw new AppError(422, "The text in this PDF is garbled, often caused by unusual embedded fonts. Re-export it as a standard PDF.", "GARBLED");
  return { text: text.slice(0, config.maxResumeChars), pages: data.numpages, chars: text.length, truncated: text.length > config.maxResumeChars };
}
