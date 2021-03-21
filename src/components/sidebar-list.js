import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function SidebarList({ label, path, icon, expanded }) {
  let className =
    "flex px-5 py-2 items-center roboto hover:text-white bg-primary text-sm";
  if (window.location.href.indexOf(path) !== -1) {
    className += " bg-primary-900";
  } else {
    className += " text-primary-50";
  }
  if (!expanded) {
    className += " lg:justify-center";
  }
  return (
    <li>
      <Link to={path} className={className}>
        <span className="w-6 h-6 flex justify-center items-center">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className={expanded ? "hidden lg:block ml-2" : "ml-2 lg:hidden"}>
          {label}
        </span>
      </Link>
    </li>
  );
}
