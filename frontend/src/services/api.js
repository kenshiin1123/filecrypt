import axios from "axios";
import { toast } from "react-toastify";

const encryptFile = async (file, password) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);
    const response = await toast.promise(
      axios.post("https://filecrypt-mft8.onrender.com/api/encrypt", formData, {
        responseType: "blob",
      }),
      {
        pending: "Encrypting File",
        success: "File Downloaded",
        error: "Encryption Failed",
      }
    );

    // Create a download link for the encrypted file
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `encrypted_${file.name}.enc`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Encryption Error:", error);
  }
};

const decryptedFile = async (file, password) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("password", password);

    const response = await toast.promise(
      axios.post("http://localhost:3000/api/decrypt", formData, {
        responseType: "blob",
      }),
      {
        pending: "Decrypting File",
        success: "File Downloaded",
        error: "Decryption Failed",
      }
    );

    // Create a download link for the decrypted file
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `decrypted_${file.name.replace(".enc", "")}`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Decryption Error:", error);
  }
};

export { encryptFile, decryptedFile };
