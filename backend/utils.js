import crypto from "crypto";

// Constants
const algorithm = "aes-256-gcm";
const keyLength = 32; // 256-bit key
const ivLength = 16; // Standard IV size for AES-GCM
const tagLength = 16; // Authentication tag size

// Derive a strong key from the password
const deriveKey = (password) =>
  crypto.scryptSync(password, "custom-salt", keyLength);

/**
 * Encrypts a file buffer using AES-256-GCM.
 * @param {Buffer} fileBuffer - The file content as a Buffer.
 * @param {string} password - The encryption password.
 * @returns {Buffer} - The encrypted data with IV and auth tag.
 */
export const Encrypt_AES = (fileBuffer, password) => {
  const key = deriveKey(password);
  const iv = crypto.randomBytes(ivLength); // Generate a new IV

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encryptedData = Buffer.concat([
    cipher.update(fileBuffer),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag(); // Get authentication tag

  // Combine IV + encrypted data + auth tag
  return Buffer.concat([iv, encryptedData, authTag]);
};

/**
 * Decrypts an AES-256-GCM encrypted buffer.
 * @param {Buffer} encryptedBuffer - The encrypted file buffer.
 * @param {string} password - The decryption password.
 * @returns {Buffer} - The decrypted file content.
 */
export const Decrypt_AES = (encryptedBuffer, password) => {
  if (encryptedBuffer.length < ivLength + tagLength) {
    throw new Error(
      "Invalid encrypted data: Too short to contain IV and auth tag."
    );
  }

  const key = deriveKey(password);

  // Extract IV, encrypted data, and authentication tag
  const iv = encryptedBuffer.slice(0, ivLength);
  const authTag = encryptedBuffer.slice(-tagLength);
  const encryptedData = encryptedBuffer.slice(ivLength, -tagLength);

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag); // Set authentication tag

  try {
    return Buffer.concat([decipher.update(encryptedData), decipher.final()]);
  } catch (error) {
    throw new Error("Decryption failed: Invalid password or corrupted file.");
  }
};
