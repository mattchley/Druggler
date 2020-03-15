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
    pillGridRow: {
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
  }));

  const classes = useStyles();

  return (
    <div>
      <TableRow
        className={classes.pillGridRow}
      // style={{ backgroundColor: "cyan" }}
      >
        <TableCell className={classes.pillGridCell}>{props.name}</TableCell>
        <TableCell className={classes.pillGridCell}>{props.lastTakenDate}</TableCell>
        <TableCell className={classes.pillGridCell}>{props.lastTakenTime}</TableCell>
        <TableCell className={classes.pillGridCell}>{props.frequency}</TableCell>
        <TableCell className={classes.pillGridCell}>
          <Button variant="outlined">
            <TrashIcon onClick={() => props.handleDrugRemove(props.id)}></TrashIcon>
          </Button>
        </TableCell>
        <TableCell className={classes.pillGridCell}>
          <Button variant="outlined">
            <CheckIcon
              onClick={() => props.handleDrugTaken(props.id)}
            ></CheckIcon>
          </Button>
        </TableCell>
      </TableRow>
    </div>
  );
};
export default ActiveDrugs;
