import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function UserDropdown() {
  const [show, setShow] = useState(false);
  return (
    <div className="ml-auto mr-7 relative">
      <button
        className="rounded-full w-10 h-10 bg-gray-200 shadow-sm text-primary-800"
        type="button"
        onClick={() => setShow((value) => !value)}
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
      <div
        className={
          show
            ? "absolute right-0 py-2 bg-white shadow w-56 rounded-lg block"
            : "absolute right-0 py-2 bg-white shadow w-56 rounded-lg hidden"
        }
      >
        <a href="#" className="px-5 py-2 roboto text-gray-600 block text-sm">
          Link 1
        </a>
        <a href="#" className="px-5 py-2 roboto text-gray-600 block text-sm">
          Link 1
        </a>
        <a href="#" className="px-5 py-2 roboto text-gray-600 block text-sm">
          Link 1
        </a>
      </div>
    </div>
  );
}
