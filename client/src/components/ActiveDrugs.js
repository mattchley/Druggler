import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Auth from "../utils/Auth";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import { black } from "material-ui/styles/colors";
import { white } from "material-ui/styles/colors";
import Button from "@material-ui/core/Button";

const ActiveDrugs = props => {
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
      fontSize: "16px"
    },
    pillGrid2: {
      textAlign: "left",
      color: black,
      fontWeight: "bold",
      fontSize: "14px",
      width: "30%" 
    },
    pillGrid3: {
      textAlign: "left",
      color: black,
      fontWeight: "bold",
      fontSize: "14px",
      width: "30%" 
    },
    removeCheckbox: {
      displayRowCheckbox: "false"
    },
    modal: {}
  }));

  const classes = useStyles();

  return (
    <div>
      <TableRow className={classes.pillGrid3}>
        <TableCell className={classes.pillGrid2} >
          {props.name}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          {props.lastTaken}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          {props.frequency}
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          <Button variant="contained">
            <TrashIcon
              onClick={() => props.handleDrugRemove(props.id)}
            ></TrashIcon>
          </Button>
        </TableCell>
        <TableCell className={classes.pillGrid2} >
          <Button variant="outlined">
            <CheckIcon
            // CALL HANDLE TAKEN FUNCTION HEREEEEEEEEEEEEEEEEEEEEEEEEE
            // onClick={() => handleTaken() }
            ></CheckIcon>
          </Button>
        </TableCell>
      </TableRow>
    </div>
  );
};
export default ActiveDrugs;
