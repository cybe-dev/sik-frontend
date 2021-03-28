export default function Button({ className, size = "lg", children, ...props }) {
  let css = "p-2 px-5 text-white roboto rounded-none";
  if (size === "lg") {
    css += " p-2 px-5";
  } else if (size === "sm") {
    css += " p-1 px-2 text-sm";
  } else if (size === "xs") {
    css += " px-1 text-xs";
  }
  if (className) {
    css += " " + className;
  }
  return (
    <button className={css} {...props}>
      {children}
    </button>
  );
}
