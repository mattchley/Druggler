import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
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
  },
  button: {
    border: "2px solid seagreen",
    boxShadow: theme.shadows[5],
    width: "80%",
    height: "20%",
    borderRadius: "30px",
    textAlign: "center",
    backgroundColor: "seagreen"
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <div>
      <Button
        className={classes.button}
        type="button"
        onClick={props.handleOpen}
        variant="contained"
        color="primary"
      >
        Add Drug
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={props.handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">
            Please enter your drug routine:
            <br></br>
          </h2>
          <form>
            <TextField
              name="name"
              label="Enter drug name here"
              variant="filled"
              onChange={props.handleInputChange}
              fullWidth
            ></TextField>

            <TextField
              type="text"
              label="Last taken date? ex: '2020-11-30'"
              variant="filled"
              name="lastTakenDate"
              onChange={props.handleInputChange}
              fullWidth
            ></TextField>
            <TextField
              type="text"
              label="Last taken time? ex: '11:30AM'"
              variant="filled"
              name="lastTakenTime"
              onChange={props.handleInputChange}
              fullWidth
            ></TextField>
            <TextField
              type="text"
              label="Drug frequency? ex: '4'"
              variant="filled"
              name="frequency"
              onChange={props.handleInputChange}
              fullWidth
            ></TextField>
            <br></br>
            <hr></hr>
            <Button
              variant="contained"
              color="primary"
              onClick={props.handleFormSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
