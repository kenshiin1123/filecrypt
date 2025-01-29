import { useContext } from "react";
import { CryptographyContext } from "../App";

export function AdvanceEncryption() {
  const { password, setPassword } = useContext(CryptographyContext);

  return (
    <div className="flex justify-between  mb-5  max-sm:flex-col min-md:flex-row [&>section]:max-sm:w-[100%] [&>section]:w-[47%]">
      <section className="flex flex-col">
        <label htmlFor="secret-key" className="text-xl font-semibold">
          Secret Key
        </label>
        <input
          type="text"
          className="border py-2 rounded indent-2"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <section className="flex flex-col w-[47%]">
        <label htmlFor="encryption-algorithm" className="text-xl font-semibold">
          Encryption Algorithm
        </label>
        <select
          name=""
          id="encryption-algorithm"
          className="border py-2 rounded"
        >
          <option value="">AES-256-GCM</option>
          {/* <option value="">RSA | Rivest-Shamir-Adleman</option> */}
        </select>
      </section>
    </div>
  );
}
