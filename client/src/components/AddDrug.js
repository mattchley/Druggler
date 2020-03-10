// import React from "react";
import Modal from "../components/DrugModal";
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API";
import Auth from "../utils/Auth";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.text.hint
  },
  modal: {

  }
}));

export default function AddDrug() {
  const classes = useStyles();

  const [user, setUser] = useState("");

  useEffect(() => {
    API.dashboard(Auth.getToken())
      .then(res => {
        console.log(res.data);
        setUser(res.data.user._id)
      })
  }, [])

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>

        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            Add to "My Pills" here
            <Modal
              className={classes.modal}
              name={"Drug 1"}
              user_id={user}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>My Pills Tracker</Paper>
          <p1></p1>
        </Grid>
      </Grid>
    </div>
  );
}