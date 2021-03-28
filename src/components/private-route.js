import { useEffect } from "react";
import { Redirect, Route, useLocation } from "react-router";
import { useWeb } from "../web-context";
import ContentWrapper from "./content-wrapper";
import Footer from "./footer";
import Header from "./header";

export default function PrivateRoute({ path, children, ...props }) {
  const webContext = useWeb();
  const location = useLocation();
  useEffect(() => {
    webContext.dispatch({ type: "sidebarExpanded", value: true });
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Route
      path={path}
      {...props}
      render={({ location }) =>
        webContext.state?.auth ? (
          <div className="min-h-screen bg-primary-50 flex flex-col">
            <Header />
            <ContentWrapper>{children}</ContentWrapper>
            <Footer />
          </div>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
