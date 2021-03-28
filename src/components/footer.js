import { useWeb } from "../web-context";

export default function Footer() {
  const { state } = useWeb();
  return (
    <div
      className={
        state.sidebarExpanded
          ? "px-5 py-2 text-sm text-gray-600 lg:pl-56 h-12 transition-all duration-500 border-t border-gray-300 flex items-center justify-start lg:ml-5 mt-auto"
          : "px-5 py-2 text-sm text-gray-600 lg:pl-20 h-12 transition-all duration-500 border-t border-gray-300 flex items-center justify-start lg:ml-5 mt-auto"
      }
    >
      <div className="text-center">
        Copyright &copy; {process.env.REACT_APP_COMPANY_NAME} | Developed by{" "}
        <a href="https://akbaraditama.com">Akbar Aditama</a>
      </div>
    </div>
  );
}
