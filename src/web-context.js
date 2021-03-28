import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { service } from "./service";

const WebContext = createContext();

export const useWeb = () => useContext(WebContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "auth":
      return {
        ...state,
        auth: action.value,
      };
    case "sidebarToggle":
      return {
        ...state,
        sidebarExpanded: !state.sidebarExpanded,
      };
    case "sidebarExpanded":
      return {
        ...state,
        sidebarExpanded: action.value,
      };
    case "titlePage":
      return {
        ...state,
        titlePage: action.value,
      };
    default:
      throw new Error();
  }
};

export default function WebProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    auth: false,
    sidebarExpanded: true,
    titlePage: "Dashboard",
  });
  const [cookies, setCookies, removeCookies] = useCookies();
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    setCookies("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    service.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    dispatch({ type: "auth", value: true });
  };

  const logout = () => {
    removeCookies("token", {
      path: "/",
    });
    service.defaults.headers.common["Authorization"] = undefined;
    dispatch({ type: "auth", value: false });
  };

  useEffect(() => {
    if (cookies.token) {
      login(cookies.token);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <WebContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </WebContext.Provider>
  );
}
