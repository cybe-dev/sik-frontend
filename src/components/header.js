import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useWeb } from "../web-context";
import Sidebar from "./sidebar";
import UserDropdown from "./user-dropdown";

export default function Header() {
  const webContext = useWeb();
  return (
    <Fragment>
      <Sidebar />
      <div
        className={
          webContext.state.sidebarExpanded
            ? "bg-white h-16 shadow-sm lg:pl-56 flex items-center transition-all duration-500"
            : "bg-white h-16 shadow-sm lg:pl-20 flex items-center transition-all duration-500"
        }
      >
        <button
          className="rounded-none mx-5 text-primary-900 w-5 h-5 flex justify-center items-center"
          onClick={() => {
            webContext.dispatch({ type: "sidebarToggle" });
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="roboto font-bold text-gray-600">
          {webContext.state.titlePage}
        </div>
        <UserDropdown />
      </div>
    </Fragment>
  );
}
