import Modal from "../components/DrugModal";
import ActiveDrugs from "./ActiveDrugs";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import API from "../utils/API";
import Auth from "../utils/Auth";
import { Table, TableBody, TableRow } from "material-ui/Table";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
  },
  title2: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
    margin: "5%"
  },
  title3: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    fontSize: "30px",
    fontFamily: "Constantia",
  },
  pillGrid2: {
    textAlign: "left",
    color: "midnightblue",
    fontWeight: "bold",
    fontSize: "14px",
    width: "20.5%",
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
  // const [tableRowColor, setTableRowColor] = useState("cyan");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleTableRowColor = () => {
  //   setTableRowColor("red");
  // }

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
      setAllDrugs(currentDrugs.data)
      API.saveDrugtoUser(currentUser.data, Auth.getToken())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    loadData();
  }, [addedDrug]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
    console.log(drugDetails);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    console.log("Drug Details: ",
      drugDetails.lastTakenDate,
      drugDetails.lastTakenTime,
      drugDetails.frequency
    );
    if (drugDetails.lastTakenDate && drugDetails.frequency && drugDetails.lastTakenTime) {
      console.log("before API front end")
      console.log("current user, ", user._id)
      API.saveDrug(
        {
          name: drugDetails.name,
          lastTakenDate: drugDetails.lastTakenDate,
          lastTakenTime: drugDetails.lastTakenTime,
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
        // .then(res => handleTableRowColor())
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

  const handleLastTakenBtn = (id) => {

  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.title2}>
          <Paper className={classes.title}>My Pills Tracker</Paper>
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRow>
                  <TableCell className={classes.pillGrid2}>
                    Pill Name
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Last Date
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Last Time
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Frequency (hours)
                    </TableCell>
                  <TableCell className={classes.pillGrid2}>Delete?</TableCell>
                  <TableCell className={classes.pillGrid2}>
                    Take Pill
                    </TableCell>
                </TableRow>
                {allDrugs.map(drug => (
                  <ActiveDrugs
                    id={drug._id}
                    key={drug._id}
                    name={drug.name}
                    frequency={drug.frequency}
                    lastTakenDate={drug.lastTakenDate}
                    lastTakenTime={drug.lastTakenTime}
                    handleDrugRemove={handleDrugRemove}
                  />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={3} className={classes.title3}>
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
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}
