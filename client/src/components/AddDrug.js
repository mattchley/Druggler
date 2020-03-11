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
  addDrug: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    // backgroundColor: theme.palette.text.hint,
    backgroundColor: "black",
    color: "white",
    fontWeight: "900"
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "darkgray",
    color: "black",
    fontWeight: "900"
  },
  columnNames: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "cyan",
    color: "black",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.text.hint,
    backgroundColor: "lightgreen",
    fontWeight: "bold",
    marginTop: "3px"
  },
  paper3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.text.hint,
    backgroundColor: "lightgreen",
    fontWeight: "bold",
    marginTop: "3px"
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
          <Paper className={classes.addDrug}>
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
          <Paper className={classes.title}>My Pills Tracker</Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.columnNames}>Pill Name</Paper>
          <Paper className={classes.paper2}>Pill #1</Paper>
          <Paper className={classes.paper2}>Pill #2</Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.columnNames}>Last Taken</Paper>
          <Paper className={classes.paper2}>11:30 AM</Paper>
          <Paper className={classes.paper2}>2:45 PM</Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.columnNames}>Frequency</Paper>
          <Paper className={classes.paper2}>4 hours</Paper>
          <Paper className={classes.paper2}>6 hours</Paper>
        </Grid>

      </Grid>
    </div>
  );
}