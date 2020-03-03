import React, {useState, useEffect} from 'react';
import Auth from '../utils/Auth';
import LoginForm from '../components/LoginForm.js';
import API from '../utils/API';

const LoginPage = ({history,toggleAuthenticateStatus}) => {
  // set the initial component state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [user,setUser] = useState({
    email: "",
    password:""
  })

  useEffect(()=>{
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    setSuccessMessage(successMessage);

    return function cleanUp () {
        setErrors({});
    }
  },[])



  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  const processForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { email, password } = user;

    API.login({email, password}).then(res => {
        // save the token
        Auth.authenticateUser(res.data.token);

        // update authenticated state
        toggleAuthenticateStatus()
        
        // redirect signed in user to dashboard
        history.push('/dashboard');
        
    }).catch(( {response} ) => {

        const errors = response.data.errors ? response.data.errors : {};
        errors.summary = response.data.message;

        setErrors(errors);
      });
    
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  const changeUser = event => {
    const {name,value} = event.target;
    setUser({...user, [name]:value});
  }

  /**
   * Render the component.
   */
  
    return (
      <LoginForm
        onSubmit={processForm}
        onChange={changeUser}
        errors={errors}
        successMessage={successMessage}
        user={user}
      />
    );
  

}



export default LoginPage;