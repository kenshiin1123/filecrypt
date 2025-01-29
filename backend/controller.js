import { Encrypt_AES, Decrypt_AES } from "./utils.js";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const encryptFile = (req, res) => {
  try {
    // Destructure the file buffer and password from the request
    const { buffer: data } = req.file;
    let pubkey = null;
    if (!req.body.password) {
      pubkey = SECRET_KEY;
    } else {
      pubkey = req.body.password;
    }

    // Encrypt the file buffer
    const encrypted = Encrypt_AES(data, pubkey);

    // Return the encrypted file as a downloadable response
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="encrypted_file.enc"`,
    });

    // Send the encrypted buffer
    res.send(encrypted);
  } catch (error) {
    console.error("Encryption Error:", error);
    res.status(500).json({ error: "Failed to encrypt the file!" });
  }
};

export const decryptFile = (req, res) => {
  try {
    const { buffer: data } = req.file;

    let pubkey = null;

    if (!req.body.password) {
      pubkey = SECRET_KEY;
    } else {
      pubkey = req.body.password;
    }

    if (!req.file) {
      return res.status(400).json({ error: "File is required!" });
    }

    console.log("password", req.body.password);
    console.log(`Decrypting file: ${req.file.originalname}`);

    const decryptedBuffer = Decrypt_AES(data, pubkey);

    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="decrypted_${req.file.originalname.replace(
        ".enc",
        ""
      )}"`,
    });

    res.send(decryptedBuffer);
  } catch (error) {
    console.error("Decryption Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
