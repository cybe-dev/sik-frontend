export function SidebarListMaster({ children, expanded }) {
  let className =
    "py-2 mx-5 mt-5 roboto border-b border-primary-900 mb-3 text-sm text-primary-100 font-bold block";

  if (!expanded) {
    className += " lg:hidden";
  }

  return <li className={className}>{children}</li>;
}
