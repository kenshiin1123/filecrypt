import { useContext } from "react";
import { CryptographyContext } from "../App";

export default function MainContainer({ children }) {
  const { cryptography } = useContext(CryptographyContext);
  return (
    <main
      className={`${
        cryptography && "h-96 transition-all  md:w-[40rem]"
      }  max-sm:w-[93%] sm:w-[29rem] bg-white mx-auto  h-min mt-15 rounded-md  text-black flex items-center flex-col pt-5 pb-5 transition-all duration-1000 `}
    >
      {children}
    </main>
  );
}
