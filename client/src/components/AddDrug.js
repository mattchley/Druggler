// import React from "react";
import Modal from "../components/DrugModal";
import Button from '@material-ui/core/Button';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

<<<<<<< HEAD
const AddDrug = () => (
  <div>
    <h1>Add your drugs here</h1>
    <br></br>
    <h2>Here are your drugs</h2>
    <br></br>
    <div>
      <p>Drug 1</p>
      <Modal name={"Drug 1"}/>
    </div>
    <div>
      <p>Drug 2</p>
      <Modal name={"Drug 2"}/>
    </div>
    <div>
      <p>Drug 3</p>
      <Modal name={"Drug 3"}/>
    </div>
  </div>
);
=======
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
>>>>>>> e88ffcdf49f391e11b3dc33e4c4a30fdcfe841c7

export default function AddDrug() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>

        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            Add to "My Pills" here
            <Modal className={classes.modal} name={"Drug 1"} />
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>My Pills Tracker</Paper>
        </Grid>
      </Grid>
    </div>
  );
}