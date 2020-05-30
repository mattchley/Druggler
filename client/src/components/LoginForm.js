import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import "../css/login.css";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import PillsIcon from "../images/pillsIcon.png";

const style = {
  color: "seagreen",
};

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
  toggleAuthenticateStatus,
}) => (
  <div className="container2">
    <form action="/" onSubmit={onSubmit}>
      
      <h1 className="card-heading">Druggler</h1>
      <img
        src={PillsIcon}
        alt="Druggler Icon"
        height="30px"
        width="50px"
        style={{ margin: "0px", marginTop: "20px" }}
      ></img>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <span class="material-icons">person_outline</span>
        <TextField
          style={{
            backgroundColor: "seagreen",
          }}
          id="input-with-icon-textfield"
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div style={{ marginBottom: "30px" }}></div>

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

      <div style={{ marginBottom: "40px" }}></div>

      <div className="button-line">
        <RaisedButton
          className="raised-button"
          type="submit"
          style={style}
          label="Log in"
          danger
        />
      </div>

      <div style={{ marginBottom: "50px" }}></div>

      <p>
        Don't have an account?
        <Link to={"/signup"} style={{ color: "black", marginLeft: "10px" }}>
          Create one.
        </Link>
        
      </p>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default LoginForm;
