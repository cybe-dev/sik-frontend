export default function Th({ children, className, ...props }) {
  let css = "p-2 border border-gray-400";
  if (className) {
    css += " " + className;
  }
  return (
    <th className={css} {...props}>
      {children}
    </th>
  );
}
