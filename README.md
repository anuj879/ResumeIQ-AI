# \# ResumeIQ AI

# 

# 🚀 AI-Powered Resume Analyzer

# 

# 🌐 \*\*Live Website:\*\* https://resume-iq-ai-flame.vercel.appResumeIQ AI

Your Resume. Smarter. Stronger.

React + Vite + Tailwind + Recharts frontend, Express backend, Google Gemini API (`@google/genai`) on the free tier.

## Setup on Windows (PowerShell)

1. Install Node.js 20 or newer from https://nodejs.org (check with `node -v`).
2. Get a free key at https://aistudio.google.com/apikey (sign in with a Google account; no billing needed for the free tier).
3. Backend:

```powershell
   cd backend
   npm install
   copy .env.example .env
   notepad .env        # set GEMINI\_API\_KEY=your key, then save
   npm start           # http://localhost:3001
   ```

4. Frontend (second PowerShell window):

```powershell
   cd frontend
   npm install
   npm run dev         # http://localhost:5173 (proxies /api to port 3001)
   ```

Check `http://localhost:3001/api/health`: `"aiConfigured": true` means the key was read. Restart the backend after editing `.env`.

## Model and free tier

Default model: `gemini-3.8-flash`. Google's pricing page (checked 24 Nov 2026) lists free-tier Standard input and output as "free of charge" for `gemini-3.8-flash`, `gemini-3.6-flash`, `gemini-3.5-flash-lite` and `gemini-3.1-flash-lite`. Not free: `gemini-4-argon` and `gemini-3.1-pro-preview`. Pricing and limits change, so confirm in AI Studio. Free-tier requests-per-minute and per-day limits are small; if you hit them the app shows a quota message. Setting `GEMINI\_MODEL=gemini-3.5-flash-lite` is the first thing to try.

**Privacy:** on the free tier Google states that submitted content may be used to improve its products. Your resume text is sent to Gemini for every analysis. Do not upload anything you would not want shared. The paid tier does not use content this way, but it is not required and not used here.

## Errors you may see

Missing or placeholder key, invalid/expired key, permission denied, quota or rate limit (429), model not found, region not supported, overloaded (503), timeout, blocked content, and malformed AI output (one automatic retry). Quota errors are not retried, to avoid burning quota.

## Structure

```
backend/src
  config/env.js        environment config (GEMINI\_API\_KEY, GEMINI\_MODEL)
  routes/ controllers/ routes and controllers
  services/            pdfService (text extraction), aiService (Gemini + JSON validation + error mapping)
  middleware/          upload, validate, rateLimit, errorHandler
  prompts/             one template per module: analysis, ats, match, skills, improve, interview
backend/test           offline tests (npm test)
frontend/src           pages/ components/ lib/ api.js (unchanged UI; Tailwind + Recharts)
```

## PDF handling and OCR

Text is extracted with `pdf-parse` from memory (nothing is written to disk). Scanned/image-only, encrypted, corrupt and garbled PDFs get specific errors. OCR is not implemented.

## Testing

* `cd backend \&\& npm test` runs 13 offline tests (error mapping, JSON validation, retry behaviour, request validation) against a stub of the Gemini SDK. It needs no key and no network.
* Manual: upload a text PDF, run all six tools (job matcher and skill gap need a 30+ character job description), check charts, copy buttons, Reports → Save as PDF. Try a wrong key and a missing key to see the error messages.

## Status

Not verified: calls to the real Gemini API (no key or network in the build environment), `npm install`, the frontend build, and the PDF upload path. The SDK request shape follows Google's documented `generateContent` config (`systemInstruction`, `responseMimeType`, `maxOutputTokens`, `abortSignal`); confirm it with a real key.

