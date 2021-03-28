export default function Td({ children, className, ...props }) {
  let css = "p-2 border border-gray-400";
  if (className) {
    css += " " + className;
  }
  return (
    <td className={css} {...props}>
      {children}
    </td>
  );
}
