export default function CheckBoxInput({
  toggleAdvanceEncryption,
  advanceEncryption,
}) {
  return (
    <section className="flex items-center gap-2 text-md font-semibold">
      <input
        type="checkbox"
        id="checkbox"
        className="mt-5 mb-5"
        onChange={toggleAdvanceEncryption}
        checked={advanceEncryption}
      />
      <label htmlFor="checkbox" className="select-none">
        Advance Encryption
      </label>
    </section>
  );
}
