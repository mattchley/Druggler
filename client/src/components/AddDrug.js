// import React from "react";
import Modal from "../components/DrugModal";
import ActiveDrugs from "./ActiveDrugs";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API";
import Auth from "../utils/Auth";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import { black } from "material-ui/styles/colors";
import { white } from "material-ui/styles/colors";

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
    fontWeight: "900",
    align: "left"
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "darkgray",
    color: "black",
    fontWeight: "900"
  },
  columnNames: {
    padding: theme.spacing(2),
    textAlign: "left",
    backgroundColor: "cyan",
    color: "black",
    fontWeight: "bold",
    marginRight: "90px"
  },
  paper2: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "lightgreen",
    fontWeight: "bold"
  },
  paper3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "lightgreen",
    fontWeight: "bold"
  },
  pillGrid: {
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "lightgreen",
    fontWeight: "bold",
    fontSize: "16px",
    paddingRight: "2px",
    paddingLeft: "2px"
  },
  pillGrid2: {
    textAlign: "left",
    color: black,
    fontWeight: "bold",
    fontSize: "14px",
    paddingRight: "2px",
    paddingLeft: "2px"
  },
  removeCheckbox: {
    displayRowCheckbox: "false"
  },
  modal: {}
}));

export default function AddDrug() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [drugDetails, setDrugDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [allDrugs, setAllDrugs] = useState([]);
  const [addedDrug, setAddedDrug] = useState("");

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
      console.log(currentUser);
      let currentDrugs = await API.getAllUserDrugs(
        currentUser.data.user._id,
        Auth.getToken()
      );
      console.log(currentDrugs);
      setAllDrugs(currentDrugs.data);
      let userDrugArray = await API.saveDrugtoUser(
        currentUser.data,
        Auth.getToken()
      );
      console.log(userDrugArray);
    };

    loadData();
  }, [addedDrug]);

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
      console.log("before API front end");
      console.log("current user, ", user._id);
      API.saveDrug(
        {
          name: drugDetails.name,
          lastTaken: drugDetails.lastTaken,
          frequency: parseInt(drugDetails.frequency),
          user: user._id
        },
        Auth.getToken()
      )
        .then(res => {
          console.log(res);
          setAddedDrug(allDrugs.length + 5);
        })
        .then(res => handleClose())
        .catch(err => console.log(err));
    }
  };

  const handleDrugRemove = id => {
    API.removeDrug(id, Auth.getToken())
      .then(res => {
        setAddedDrug(allDrugs.length);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper className={classes.title}>My Pills Tracker</Paper>
          <Table>
            {/* <Table style={{tableLayout: 'auto'}}> */}
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}>Pill Name</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}>Last Taken</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}>Frequency (hours)</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}>Delete?</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}>
                    Click when pill has been taken
                  </p>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                {allDrugs.map(drug => (
                  <ActiveDrugs
                    id={drug._id}
                    key={drug._id}
                    name={drug.name}
                    frequency={drug.frequency}
                    lastTaken={drug.lastTaken}
                    handleDrugRemove={handleDrugRemove}
                  />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={3}>
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
      </Grid>
    </div>
  );
}
