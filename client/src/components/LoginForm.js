import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import '../css/login.css';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PillsIcon from '../images/pillsIcon.png';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (


    <div className="container2">
      <form action="/" onSubmit={onSubmit}>
      <img
          src={PillsIcon}
          className="navTitle"
          alt="Druggler Icon"
          height="30px"
          width="50px"
          style={{margin: "0px", marginTop: "20px" }}>
      </img>
        <h2 className="card-heading">druggler</h2>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        
        <div className="field-line">
        <span class="material-icons">person_outline</span>
          <TextField
            id="input-with-icon-textfield"
            floatingLabelText="Email"
            name="email"
            errorText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>

        <div style={{marginBottom:"10px"}}></div>
        
        <div className="field-line">
        <span class="material-icons"> lock </span>
          <TextField
            floatingLabelText="Password"
            type="password"
            name="password"
            onChange={onChange}
            errorText={errors.password}
            value={user.password}
          />
        </div>

        <div style={{marginBottom:"10px"}}></div>

        <div className="button-line">
          <RaisedButton
            className="raised-button"
            type="submit"
            label="Log in"
            danger
          />
        </div>

        <p>Don't have an account?  
          <Link 
            to={'/signup'}
            style={{color:"white", marginLeft:"10px"}}
          >
             Create one
            </Link>.
        </p>
      </form>
    </div>
  );

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;