// import React from "react";
import Modal from "../components/DrugModal";
<<<<<<< HEAD
import Button from "@material-ui/core/Button";
=======
import ActiveDrugs from "./ActiveDrugs"
import Button from '@material-ui/core/Button';
>>>>>>> 027541ac571f1c4bb7fbbf840dafbd693839ec33
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
    marginRight: "90px",
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
<<<<<<< HEAD
  const [user, setUser] = useState("");
  useEffect(() => {
    API.dashboard(Auth.getToken()).then(res => {
      console.log(res.data);
      setUser(res.data.user._id);
    });
  }, []);

=======
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
>>>>>>> 027541ac571f1c4bb7fbbf840dafbd693839ec33

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Paper className={classes.title}>My Pills Tracker</Paper>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}  >Pill Name</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}  >Last Taken</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}  >Frequency</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}  >Delete?</p>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <p className={classes.pillGrid2}  >Taken?</p>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn
                  className={classes.pillGrid} >Pill #1</TableRowColumn>
                <TableRowColumn className={classes.pillGrid}>11:30 AM</TableRowColumn>
                <TableRowColumn className={classes.pillGrid}>2 hours
            </TableRowColumn>
                <TableRowColumn>
                  <TrashIcon
                    className={classes.pillGrid2}
                  // onClick={() => handleRemove() }
                  >
                  </TrashIcon>
                </TableRowColumn>
                <TableRowColumn>
                  <CheckIcon className={classes.pillGrid2}></CheckIcon>
                </TableRowColumn>

              </TableRow>
              <TableRow>
                <TableRowColumn className={classes.pillGrid}>Pill #2</TableRowColumn>
                <TableRowColumn className={classes.pillGrid}>2:45 PM</TableRowColumn>
                <TableRowColumn className={classes.pillGrid}>4 hours</TableRowColumn>
                <TableRowColumn>
                  <TrashIcon className={classes.pillGrid2}></TrashIcon>
                </TableRowColumn>
                <TableRowColumn>
                  <CheckIcon className={classes.pillGrid2}></CheckIcon>
                </TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn className={classes.pillGrid}>Pill #3</TableRowColumn>
                <TableRowColumn className={classes.pillGrid}>6:30 PM</TableRowColumn>
                <TableRowColumn className={classes.pillGrid}>8 hours</TableRowColumn>
                <TableRowColumn>
                  <TrashIcon className={classes.pillGrid2}></TrashIcon>
                </TableRowColumn>
                <TableRowColumn>
                  <CheckIcon className={classes.pillGrid2}></CheckIcon>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.addDrug}>
            Add to "My Pills" here
<<<<<<< HEAD
            <Modal className={classes.modal} name={"Drug 1"} user_id={user} />
          </Paper>
        </Grid>
        {/* <Grid item xs={3}>
          <Paper className={classes.columnNames}>Pill Name</Paper>
          <Paper className={classes.paper2}>Pill #1</Paper>
          <Paper className={classes.paper2}>Pill #2</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.columnNames}>Last Taken</Paper>
          <Paper className={classes.paper2}>11:30 AM</Paper>
          <Paper className={classes.paper2}>2:45 PM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.columnNames}>Frequency</Paper>
          <Paper className={classes.paper2}>4 hours</Paper>
          <Paper className={classes.paper2}>6 hours</Paper>
        </Grid> */}
=======
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


>>>>>>> 027541ac571f1c4bb7fbbf840dafbd693839ec33
      </Grid>

    </div>
  );
}