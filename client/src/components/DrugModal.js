import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "./Input";
import FormBtn from "./FormBtn";
import API from "../utils/API";
import Auth from "../utils/Auth";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [drugDetails, setDrugDetails] = React.useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = e => {
    const { name, value } = e.target;
    setDrugDetails({ ...drugDetails, [name]: value });
    console.log(drugDetails);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    handleClose();
    if (drugDetails.lastTaken && drugDetails.frequency) {
      console.log("before API front end")
      API.getUser(,Auth.getToken( )).then(res => console.log(res))
      API.saveDrug(
        {
          name: props.name,
          lastTaken: drugDetails.lastTaken,
          frequency: parseInt(drugDetails.frequency)
        },
       Auth.getToken( )
      )
        .then(res => {
          console.log("SAVED DRUG");
          handleClose();
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="primary"
      >
        Add Drug
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            Please enter your drug routine for:
            <br></br> 
            {props.name}
          </h2>
          <form>
            <TextField
              name="name"
              label="Enter drug name here"
              variant="filled"
              onChange={handleInputChange}
            ></TextField>

            <TextField
              type="text"
              label="Last taken? ex: '11:30'"
              variant="filled"
              name="lastTaken"
              onChange={handleInputChange}
            ></TextField>
            <TextField
              type="text"
              label="Drug frequency? ex: '4'"
              variant="filled"
              name="frequency"
              onChange={handleInputChange}
            ></TextField>
            {/* <label>
              When was the last time you took this drug? 
              example: "11:30"
              <Input
                type="text"
                name="lastTaken"
                onChange={handleInputChange}
              />
            </label> */}

            {/* <label>
              How often do you take this drug? example: "4" for every 4 hours
              <Input
                type="text"
                name="frequency"
                onChange={handleInputChange}
              />
            </label> */}
            <br></br>
            <hr></hr>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
