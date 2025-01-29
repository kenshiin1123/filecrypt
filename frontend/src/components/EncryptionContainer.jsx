import { useState, useContext } from "react";
import FileInput from "../components/FileInput";
import FileDisplay from "./FileDisplay";
import CheckBoxInput from "./CheckBoxInput";
import { AdvanceEncryption } from "./AdvanceEncryption";
import { CryptographyContext } from "../App";

export default function EncryptionContainer() {
  const { cryptography } = useContext(CryptographyContext);

  const [advanceEncryption, setAdvanceEncryption] = useState(false);

  const toggleAdvanceEncryption = () => {
    setAdvanceEncryption(!advanceEncryption);
  };

  return (
    <section className="flex flex-col pt-5 w-[90%] h-full ">
      {cryptography && (
        <>
          <FileDisplay />
          <CheckBoxInput
            toggleAdvanceEncryption={toggleAdvanceEncryption}
            advanceEncryption={advanceEncryption}
          />
          {advanceEncryption && <AdvanceEncryption />}
          <FileInput />
        </>
      )}
    </section>
  );
}
