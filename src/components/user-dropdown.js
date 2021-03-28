import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useWeb } from "../web-context";

const MySwal = withReactContent(Swal);

export default function UserDropdown() {
  const [show, setShow] = useState(false);
  const { logout } = useWeb();
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
            ? "absolute right-0 z-20 py-2 bg-white shadow w-56 rounded-lg block"
            : "absolute right-0 z-20 py-2 bg-white shadow w-56 rounded-lg hidden"
        }
      >
        <Link
          to="/change-password"
          className="px-5 py-2 roboto text-gray-600 block text-sm"
          onClick={() => setShow(false)}
        >
          Ganti Password
        </Link>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            MySwal.fire({
              title: "Anda yakin?",
              text: "Anda akan melakukan logout dari Sistem Informasi Keuangan",
              confirmButtonText: "Lanjutkan",
              showCancelButton: true,
              cancelButtonText: "Batal",
              icon: "question",
            }).then((result) => {
              if (result.isConfirmed) {
                logout();
              }
            });
          }}
          className="px-5 py-2 roboto text-gray-600 block text-sm"
        >
          Keluar
        </a>
      </div>
    </div>
  );
}
