// import React from "react";
import Modal from "../components/DrugModal";
import Button from '@material-ui/core/Button';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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