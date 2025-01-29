import { useState, createContext, useMemo } from "react";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import ButtonsContainer from "./components/ButtonsContainer";
import EncryptionContainer from "./components/EncryptionContainer";
import MainContainer from "./components/MainContainer";
import CryptographyOptionLabel from "./components/CryptographyOptionLabel";
import { encryptFile, decryptedFile } from "./services/api.js";
import { ToastContainer } from "react-toastify";

const CryptographyContext = createContext(undefined);

function App() {
  // cryptography = encryption or decryption
  const [cryptography, setCryptography] = useState(undefined);
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const cryptographyFunc = (type) => {
    setCryptography((prev) => (prev === type ? "" : type));
    setValue("");
  };

  const cryptographyType = {
    encryption: {
      onClick: () => cryptographyFunc("encryption"),
      active: cryptography === "encryption",
    },
    decryption: {
      onClick: () => cryptographyFunc("decryption"),
      active: cryptography === "decryption",
    },
  };

  const memoizedObject = useMemo(() => {
    const handleValueChange = (event) => {
      const eventValue = event.target.value;
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile); // Update the state with the selected file
      }
      setValue(eventValue);
    };

    function encrypt() {
      if (file) {
        encryptFile(file, password);
      }
    }

    function decrypt() {
      if (file) {
        decryptedFile(file, password);
      }
    }

    return {
      password,
      setPassword,
      cryptography,
      value,
      setValue,
      encrypt,
      decrypt,
      handleValueChange,
    };
  }, [value, file, cryptography, password]);
  return (
    <CryptographyContext.Provider value={memoizedObject}>
      <Header />
      <MainContainer>
        <ButtonsContainer>
          <CryptographyOptionLabel />
          <Button {...cryptographyType.encryption}>Encrypt</Button>
          <Button {...cryptographyType.decryption}>Decrypt</Button>
        </ButtonsContainer>
        <EncryptionContainer />
      </MainContainer>
      <ToastContainer theme="dark" position="bottom-right" newestOnTop />
    </CryptographyContext.Provider>
  );
}

export { App, CryptographyContext };
