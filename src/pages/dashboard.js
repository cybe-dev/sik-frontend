import { useEffect } from "react";
import { useWeb } from "../web-context";

export default function Dashboard() {
  const webContext = useWeb();
  useEffect(() => {
    webContext.dispatch({ type: "titlePage", value: "Dashboard" });
  }, []);
  return null;
}
