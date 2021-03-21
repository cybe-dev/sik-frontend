import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/private-route";
import AlertPages from "./pages/alert-pages";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import WebProvider from "./web-context";

function App() {
  return (
    <WebProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/alert">
            <AlertPages />
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
  );
}

export default App;
