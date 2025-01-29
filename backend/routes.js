import multer from "multer";
import express from "express";
import { encryptFile, decryptFile } from "./controller.js";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/encrypt", upload.single("file"), encryptFile);
router.post("/decrypt", upload.single("file"), decryptFile);

export default router;
