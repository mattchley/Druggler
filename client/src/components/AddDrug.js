// import React from "react";
import Modal from "../components/DrugModal";
import ActiveDrugs from "./ActiveDrugs"
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
  const [user, setUser] = useState({});
  const [drugDetails, setDrugDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [allDrugs,setAllDrugs] = useState([]);
  const [addedDrug, setAddedDrug] = useState("")

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const loadData = async () => {
      let currentUser = await API.dashboard(Auth.getToken());
      setUser(currentUser.data.user);
      let currentDrugs = await API.getAllUserDrugs(currentUser.data.user._id,Auth.getToken())
      setAllDrugs(currentDrugs.data)
    }
      
      loadData();
  },[addedDrug])


  const handleInputChange = e => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
    console.log(drugDetails);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(
      drugDetails.lastTaken,
      drugDetails.frequency,
      "HELLO DRUG DETAILS"
    );
    if (drugDetails.lastTaken && drugDetails.frequency) {
      console.log("before API front end")
      console.log("current user, ", user._id)
      API.saveDrug(
        {
          name: drugDetails.name,
          lastTaken: drugDetails.lastTaken,
          frequency: parseInt(drugDetails.frequency),
          user: user._id
        },
       Auth.getToken( )
      )
        .then(res => {
          console.log(res);
          API.saveDrugtoUser(user._id,res.data,Auth.getToken()).then(res => {
            console.log(res);
            setAddedDrug(res.data._id);
            
          }).catch(err => console.log(err))

          console.log("SAVED DRUG");

        }).then(res => handleClose())
        .catch(err => console.log(err));
    }
  };

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
              user_id={user._id}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
              
            />
          </Paper>
        </Grid>
        <Grid item xs={4}></Grid>

        <Grid item xs={12}>
          <Paper className={classes.title}>My Pills Tracker</Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper>
        {allDrugs.map(drug => (
          <ActiveDrugs
            id={drug._id}
            key={drug._id}
            name={drug.name}
            frequency={drug.frequency}
            lastTaken={drug.lastTaken}
          />
        ))}
        </Paper>
      </Grid>


      </Grid>
    </div>
  );
}