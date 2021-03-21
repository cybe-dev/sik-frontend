export default function Button({ className, children, ...props }) {
  let css = "p-2 px-5 text-white roboto rounded-none";
  if (className) {
    css += " " + className;
  }
  return (
    <button className={css} {...props}>
      {children}
    </button>
  );
}
