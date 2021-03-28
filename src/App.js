import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/private-route";
import Classification from "./pages/classification";
import Dashboard from "./pages/dashboard";
import MonthlyBalance from "./pages/monthly-balance";
import Income from "./pages/income";
import Login from "./pages/login";
import Outcome from "./pages/outcome";
import WebProvider from "./web-context";
import PrintReport from "./pages/print-report";
import ChangePassword from "./pages/change-password";

function App() {
  return (
    <CookiesProvider>
      <WebProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/print-report">
              <PrintReport />
            </PrivateRoute>
            <PrivateRoute path="/change-password">
              <ChangePassword />
            </PrivateRoute>
            <PrivateRoute path="/monthly-balance">
              <MonthlyBalance />
            </PrivateRoute>
            <PrivateRoute path="/income">
              <Income />
            </PrivateRoute>
            <PrivateRoute path="/outcome">
              <Outcome />
            </PrivateRoute>
            <PrivateRoute path="/classification">
              <Classification />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </BrowserRouter>
      </WebProvider>
    </CookiesProvider>
  );
}

export default App;
