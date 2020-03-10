import React, { useState, useEffect } from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import HomePage from "./components/HomePage";
import { PrivateRoute, PropsRoute, LoggedOutRoute } from "./components/Routes";

import LoginPage from "./pages/Login";
import LogoutFunction from "./pages/LogoutFunction";
import SignUpPage from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import Search from "./pages/Search";
import Auth from "./utils/Auth";

import Button from "@material-ui/core/Button";
import { motion } from "framer-motion";
// import NavBar from './components/NavBar';
import "./nav.css";
import NavSpacer from "./components/NavSpacer";
import AddDrug from "./components/AddDrug";

// remove tap delay, essential for MaterialUI to work properly

const App = () => {
  const [authenticated, setAuthenticate] = useState(false);

  useEffect(() => {
    toggleAuthenticateStatus();
  }, []);

  const toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    setAuthenticate(Auth.isUserAuthenticated());
  };

  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <Router>
        <div className="appBar">
          {authenticated ? (
            <div>
              <div className="navTitle">Druggler</div>
              <div>
                <Button className="navButton" variant="outlined">
                  <Link className="link" to="/mypills">
                    {" "}
                    My Pills{" "}
                  </Link>
                </Button>
              </div>
              <div>
                <Button className="navButton" variant="outlined" size="small">
                  <Link className="link" to="/logout">
                    {" "}
                    Log out{" "}
                  </Link>
                </Button>
              </div>
              <div>
                <Button className="navButton" variant="outlined" size="small">
                  <Link className="link" to="/interactions">
                    {" "}
                    Interactions{" "}
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="navTitle">Druggler</div>
              <div>
                <Button className="navButton" variant="outlined">
                  <Link className="link" to="/Login">
                    {" "}
                    Login{" "}
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
        <NavSpacer />

        <PropsRoute
          exact
          path="/"
          component={HomePage}
          toggleAuthenticateStatus={toggleAuthenticateStatus}
        />

        {/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}
        <PrivateRoute path="/dashboard" component={AddDrug} />
        <PrivateRoute path="/interactions" component={Search} />

        <PrivateRoute path="/mypills" component={AddDrug} />

        <LoggedOutRoute
          path="/login"
          component={LoginPage}
          toggleAuthenticateStatus={toggleAuthenticateStatus}
        />

        <LoggedOutRoute path="/signup" component={SignUpPage} />
        <Route path="/logout" component={LogoutFunction} />
      </Router>

      {/* <div>
        <Router>
          <Switch>
            Route exact path ="/"
          </Switch>
        </Router>
      </div> */}

      {/* <Search /> */}
      {/* <AddDrug /> */}
    </MuiThemeProvider>
  );
};

export default App;