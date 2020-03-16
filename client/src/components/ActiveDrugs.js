import React, { useState, useEffect } from "react";
import TrashIcon from "material-ui/svg-icons/action/delete";
import CheckIcon from "material-ui/svg-icons/navigation/check";
import { TableRow } from "material-ui/Table";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { black } from "material-ui/styles/colors";
import Button from "@material-ui/core/Button";



const ActiveDrugs = props => {

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    quarterOne: {
      backgroundColor: "white"
    },
    quarterTwo: {
      backgroundColor: "lightgreen"
    },
    quarterThree: {
      backgroundColor: "yellow"
    },
    quarterFour: {
      backgroundColor: "white"
    },
    eatNow: {
      backgroundColor: "red"
    },
    foo: props => ({
      backgroundColor: props.backgroundColor,
    }),
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
      fontSize: "16px"
    },
    pillGrid2: {
      textAlign: "left",
      color: black,
      fontWeight: "bold",
      fontSize: "14px",
      width: "30%"
    },
    pillGridCell: {
      textAlign: "left",
      color: black,
      fontWeight: "bold",
      fontSize: "14px",
      width: "21.5%"
    },
    btn: {
      textAlign: "left",
      color: black,
      fontWeight: "bold",
      fontSize: "14px",
      width: "30%"
    },
  }));


  const quarterOne = { backgroundColor: "white" }
  const quarterTwo = { backgroundColor: "green" }
  const quarterThree = { backgroundColor: "yellow" }
  const quarterFour = { backgroundColor: "orange" }
  const takeNow = { backgroundColor: "red" }

  const bgColor = () => {
    if (props.currentQuarter === "quarterOne") {
      return { backgroundColor: "white" }
    } else if (props.currentQuarter === "quarterTwo") {
      return { backgroundColor: "green" }
    } else if (props.currentQuarter === "quarterThree") {
      return { backgroundColor: "yellow" }
    } else if (props.currentQuarter === "quarterFour") {
      return ({ backgroundColor: "orange" })
    } else if (props.currentQuarter === "eatNow") {
      return { backgroundColor: "red" }
    }
  }
  const x = bgColor()
  console.log(x)

  const combine = (quarter) => {
    return (`myStyle.${quarter}`)
  }

  const classes = useStyles(x);

  return (
    <div>
      <TableRow className={`${classes.pillGrid3} ${classes.foo}`}>
        <TableCell className={classes.pillGrid2} >
          {props.name}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          {props.lastTakenDate}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          {props.lastTakenTime}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          {props.frequency}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          <Button variant="contained">
            <TrashIcon onClick={() => props.handleDrugRemove(props.id)}></TrashIcon>
          </Button>
        </TableCell>
        <TableCell className={classes.pillGridCell}>
          <Button variant="contained">
            <CheckIcon onClick={() => props.handleDrugTaken(props.id)} ></CheckIcon>
          </Button>
        </TableCell>
      </TableRow>
    </div>
  );
};
export default ActiveDrugs;
