import React, { useState, useEffect } from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import { PrivateRoute, PropsRoute, LoggedOutRoute } from "./components/Routes";
import LoginPage from "./pages/Login";
import LogoutFunction from "./pages/LogoutFunction";
import SignUpPage from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import Auth from "./utils/Auth";
import SearchV2 from './pages/Search2.0'
import { AnimatePresence, motion } from "framer-motion";
import "./nav.css";
import AddDrug from "./components/AddDrug";
import './index.css';
import PillsIcon from "./images/pillsIcon.png"

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

  const variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  }

  const variantsY = {
    hidden: { opacity: 0, y: 500 },
    visible: { opacity: 1, y: 0 },
  }

  // const location = useLocation();

  return (
    <div className="body" style={{ height: "100vh", }}>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div className="appBar2">
            {authenticated ? (
              <div>
                {/* <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={variants}
                  transition={{ ease: "easeOut", duration: 2 }}
                > */}
                  <img
                    src={PillsIcon}
                    className="navTitle"
                    alt="Druggler Icon"
                    height="30px"
                    width="50px"
                    style={{ paddingLeft: "30px", margin: "0px", marginTop: "20px" }}></img>

                  <div className="navTitle" style={{ margin: "0px" }}>druggler</div>
                  {/* <img
                    src={PillsIcon}
                    className="navTitle"
                    alt="Druggler Icon"
                    height="30px"
                    width="50px"
                    style={{ margin: "0px", marginTop: "20px" }}></img> */}

                  <motion.div whileHover={{ y: 4 }} >
                    <Link
                      className="navButton"
                      to="/logout"
                      color="error"
                    >
                      {" "}
                    Log out{" "}
                    </Link>


                  </motion.div>

                  <motion.div whileHover={{ y: 4 }} >
                    <Link className="navButton" to="/dashboard" >
                      {" "}My Pills{" "}
                    </Link>

                  </motion.div>

                  <motion.div whileHover={{ y: 4 }} >
                    <Link
                      className="navButton"
                      to="/interactions"
                    >
                      {" "}Interactions{" "}
                    </Link>
                  </motion.div>
                {/* </motion.div> */}
              </div>
            ) : (
                <div className="header">
                  {/* <img
                    src={PillsIcon}
                    className="navTitle"
                    alt="Druggler Icon"
                    height="30px"
                    width="50px"
                    style={{ paddingLeft: "30px", margin: "0px", marginTop: "20px" }}></img> */}
                  {/* <div className="navTitle" style={{ margin: "0px" }} >druggler</div> */}
                  {/* <img
                    src={PillsIcon}
                    className="navTitle"
                    alt="Druggler Icon"
                    height="30px"
                    width="50px"
                    style={{ marginTop: "20px" }}></img> */}
                </div>
              )}
          </div>
          {/* <NavSpacer /> */}

          <PropsRoute
            exact
            path="/"
            component={HomePage}
            toggleAuthenticateStatus={toggleAuthenticateStatus}
          />

          {/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}
          <PrivateRoute path="/dashboard" component={AddDrug} />
          <PrivateRoute path="/interactions" component={SearchV2} />

          {/* <PrivateRoute path="/mypills" component={AddDrug} /> */}

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
    </div>
  );
};

export default App;