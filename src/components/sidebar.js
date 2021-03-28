import {
  faArchive,
  faArrowDown,
  faArrowUp,
  faTimes,
  faTv,
  faDollarSign,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useWeb } from "../web-context";
import SidebarList from "./sidebar-list";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { SidebarListMaster } from "./sidebar-list-master";

export default function Sidebar() {
  const webContext = useWeb();
  const [isExpand, setIsExpand] = useState(webContext.state.sidebarExpanded);

  useEffect(() => {
    let timeout;
    if (webContext.state.sidebarExpanded && !isExpand) {
      timeout = setTimeout(() => {
        setIsExpand(true);
      }, 500);
    } else {
      setIsExpand(webContext.state.sidebarExpanded);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [webContext.state.sidebarExpanded]);

  return (
    <div
      className={
        webContext.state.sidebarExpanded
          ? "fixed top-0 left-0 bg-primary-800 text-white w-0 lg:w-56 transition-all duration-500 z-10"
          : "fixed top-0 left-0 bg-primary-800 text-white w-full lg:w-20 transition-all duration-500 z-10"
      }
      style={{
        boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
      }}
    >
      <OverlayScrollbarsComponent
        className="h-screen"
        options={{ scrollbars: { autoHide: "scroll" } }}
      >
        <div className="flex montserrat font-bold h-16 items-center justify-center justify-between p-5 shadow-md">
          <span
            className={
              isExpand ? "hidden text-xs lg:block" : "hidden text-xs lg:hidden"
            }
          >
            SISTEM INFORMASI KEUANGAN
          </span>
          <span
            className={
              isExpand
                ? "block lg:hidden w-full lg:text-center"
                : "block lg:block w-full lg:text-center"
            }
          >
            SIK
          </span>
          <button
            className="text-white rounded-none w-8 h-8 flex justify-center items-center text-lg lg:hidden"
            type="button"
            onClick={() => {
              webContext.dispatch({ type: "sidebarExpanded", value: true });
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <ul className="my-5">
          <SidebarListMaster expanded={isExpand}>Utama</SidebarListMaster>
          <SidebarList
            label="Dashboard"
            icon={faTv}
            path="/dashboard"
            expanded={isExpand}
          />
          <SidebarList
            label="Klasifikasi"
            icon={faArchive}
            path="/classification"
            expanded={isExpand}
          />

          <SidebarListMaster expanded={isExpand}>Transaksi</SidebarListMaster>
          <SidebarList
            label="Uang Keluar"
            icon={faArrowUp}
            path="/outcome"
            expanded={isExpand}
          />
          <SidebarList
            label="Uang Masuk"
            icon={faArrowDown}
            path="/income"
            expanded={isExpand}
          />
          <SidebarList
            label="Saldo Per Bulan"
            icon={faDollarSign}
            path="/monthly-balance"
            expanded={isExpand}
          />
          <SidebarList
            label="Cetak Laporan"
            icon={faPrint}
            path="/print-report"
            expanded={isExpand}
          />
        </ul>
      </OverlayScrollbarsComponent>
    </div>
  );
}
