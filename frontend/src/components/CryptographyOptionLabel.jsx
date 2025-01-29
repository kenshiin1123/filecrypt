import { useContext } from "react";
import { CryptographyContext } from "../App";

export default function CryptographyOptionLabel() {
  const { cryptography } = useContext(CryptographyContext);

  return (
    <p className={`text-center mb-5 text-2xl ${cryptography && "hidden"}`}>
      Choose your option
    </p>
  );
}
