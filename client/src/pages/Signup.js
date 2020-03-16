import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import API from '../utils/API';

const SignUpPage = ({ history }) => {
  // set the initial component A
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: ""
  })


  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  const processForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { name, email, password } = user;

    //const formData = `email=${email}&password=${password}`;
    API.signUp({ name, email, password }).then(res => {
      // change the component-container state
      // set a message
      localStorage.setItem('successMessage', res.data.message);

      // redirect user after sign up to login page
      history.push('/login');
      setErrors({});

    }).catch(({ response }) => {

      const errors = response.data.errors ? response.data.errors : {};
      errors.summary = response.data.message;

      setErrors({ ...errors, errors });
    });
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  const changeUser = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  /**
   * Render the component.
   */

  return (
    <SignUpForm
      onSubmit={processForm}
      onChange={changeUser}
      errors={errors}
      user={user}
    />
  );


}



export default SignUpPage;