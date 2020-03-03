import React, { useState, useEffect} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import HomePage from './components/HomePage';
import { 
  PrivateRoute, 
  PropsRoute, 
  LoggedOutRoute 
} from './components/Routes';

import LoginPage from './pages/Login';
import LogoutFunction from './pages/LogoutFunction';
import SignUpPage from './pages/Signup';
import DashboardPage from './pages/DashboardPage';

import Auth from './utils/Auth';

// remove tap delay, essential for MaterialUI to work properly

const App =() => {

  const [authenticated,setAuthenticate] = useState(false)
  
  useEffect(()=>{
    toggleAuthenticateStatus()
  },[])


  const toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    setAuthenticate(Auth.isUserAuthenticated())
  }

  
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            <div className="top-bar">
              <div className="top-bar-left">
                <Link to="/">React App</Link>
              </div>
              {authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/logout">Log out</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign up</Link>
                </div>
              )}

            </div>

            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={toggleAuthenticateStatus} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={toggleAuthenticateStatus} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/>
          </div>

        </Router>
      </MuiThemeProvider>
    )
  
}

export default App;