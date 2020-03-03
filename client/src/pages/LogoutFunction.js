import React, {useEffect} from 'react';
// import PropTypes from 'prop-types';
import Auth from '../utils/Auth';


const LogoutFunction = ({history})=> {

  useEffect(()=> {
    // deauthenticate user
    Auth.deauthenticateUser();
    // change the current URL to / after logout
    history.push('/');
  },[])

  
    return (
      <div>
        <p>Logging out...</p>
      </div>
    )
  
}

// LogoutFunction.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default LogoutFunction;