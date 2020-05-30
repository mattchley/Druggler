import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import "../css/login.css";
import PillsIcon from "../images/pillsIcon.png";
import { makeStyles } from "@material-ui/core/styles";


const style = {
  color: "seagreen",
};

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));


const SignUpForm = ({ onSubmit, onChange, errors, user }) => (
  <div className="container2">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Druggler</h2>
      <img
        src={PillsIcon}
        alt="Druggler Icon"
        height="30px"
        width="50px"
        style={{ margin: "0px", marginTop: "20px" }}
      ></img>

      {errors.summary && <p className="error-message">{errors.summary}</p>}

      {/* <div className="field-line">
        <TextField
          floatingLabelText="Name"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
      </div> */}

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

      <div style={{ marginBottom: "30px" }}></div>

      <div className="button-line">
        <RaisedButton 
          type="submit" 
          label="Create New Account" 
          primary 
          style={style}
        />
      </div>

      <div style={{ marginBottom: "30px" }}></div>

      <p>
        Already have an account? <Link to={"/login"}>Log in</Link>
      </p>
    </form>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default SignUpForm;
