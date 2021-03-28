import { useWeb } from "../web-context";

export default function ContentWrapper({ children }) {
  const { state } = useWeb();
  return (
    <div
      className={
        state.sidebarExpanded
          ? "lg:ml-56 p-5 transition-all duration-500 flex-1 flex flex-col"
          : "lg:ml-20 p-5 transition-all duration-500 flex-1 flex flex-col"
      }
    >
      {children}
    </div>
  );
}
