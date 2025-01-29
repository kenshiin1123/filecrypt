export function Button({ children, active, customClass, ...props }) {
  return (
    <button
      className={`border-2 px-5 py-2 mx-2 rounded-lg max-sm:text-xl text-2xl select-none ${
        active && "bg-black text-white"
      } ${customClass}`}
      {...props}
    >
      {children}
    </button>
  );
}
