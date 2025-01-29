import { useContext } from "react";
import { CryptographyContext } from "../App";

export default function FileDisplay() {
  const { value } = useContext(CryptographyContext);
  const selectedFile = value.split("\\")[value.split("\\").length - 1];
  const fileDisplayStyle = {
    className: `border rounded text-center  py-3 text-2xl ${!value && "py-7"}`,
  };

  return (
    <>
      <p className={`text-2xl font-semibold`}>Your File</p>
      <p {...fileDisplayStyle}>{selectedFile}</p>
    </>
  );
}
