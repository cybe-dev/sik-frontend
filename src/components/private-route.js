import { Redirect, Route } from "react-router";
import { useWeb } from "../web-context";
import ContentWrapper from "./content-wrapper";
import Header from "./header";

export default function PrivateRoute({ path, children, ...props }) {
  const webContext = useWeb();
  return (
    <Route
      path={path}
      {...props}
      render={({ location }) =>
        webContext.state?.auth ? (
          <div className="min-h-screen bg-primary-50">
            <Header />
            <ContentWrapper>{children}</ContentWrapper>
          </div>
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
