import { useContext } from "react";
import "./FileInput.css";
import { CryptographyContext } from "../App";
import { Button } from "./Button";

export default function FileInput() {
  let { handleValueChange, value, encrypt, decrypt, cryptography } =
    useContext(CryptographyContext);

  const labelProperties = {
    htmlFor: "fileInput",
    className: `border-2 px-5 py-2 rounded-lg text-xl w-min truncate ${
      !value && "mx-auto"
    }`,
  };

  if (cryptography) {
    cryptography = cryptography.slice(
      0,
      cryptography.indexOf("ion")
    ); /* Removes the ION in the encryption or decryption */
  }

  // Sets the button's type depending on the cryptography type selected.
  let onClickCondition = {
    onClick: encrypt,
  };

  // Checks if the selected mode is encrypt or decrypt.
  // and modifies the button depending on the mode selected
  if (cryptography == "encrypt") {
    onClickCondition.onClick = encrypt;
  } else if (cryptography == "decrypt") {
    onClickCondition.onClick = decrypt;
  }

  return (
    <>
      <section className="flex max-sm:flex-col gap-2 text-center [&>label]:max-sm:w-[100%] [&>button]:max-sm:w-[100%] items-center justify-between">
        <label {...labelProperties}>
          Choose {!value ? "a" : "another"} File
        </label>
        {value && (
          <Button {...onClickCondition} customClass={labelProperties.className}>
            {cryptography.charAt(0).toUpperCase() + cryptography.slice(1)}
          </Button>
        )}
      </section>
      <input
        type="file"
        name="file"
        onChange={handleValueChange}
        value={value}
        className="hidden"
        id="fileInput"
      />
    </>
  );
}
