import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Input from "./Input";
import FormBtn from "./FormBtn";
import API from "../utils/API";
import Auth from "../utils/Auth";

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
    const { name, value} = e.target;
    setDrugDetails({...drugDetails, [name]: value});
    console.log(drugDetails)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleClose();
    if (drugDetails.lastTaken && drugDetails.frequency) {
      API.saveDrug({
        name: props.name,
        lastTaken: drugDetails.lastTaken,
        frequency: parseInt(drugDetails.frequency),
      },Auth.getToken())
        .then(res => {
          console.log("SAVED DRUG");
          handleClose();
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Drug
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
  <h2 id="simple-modal-title">Please enter your drug routine for {props.name}</h2>
          <form>
            <label>
              When was the last time you took this drug?
              <Input
                type="text"
                name="lastTaken"
                onChange={handleInputChange}
              />
            </label>
            <label>
              How often do you take this drug?
              <Input
                type="text"
                name="frequency"
                onChange={handleInputChange}
              />
            </label>
            <FormBtn onClick={handleFormSubmit}>Submit</FormBtn>
          </form>
        </div>
      </Modal>
    </div>
  );
}
