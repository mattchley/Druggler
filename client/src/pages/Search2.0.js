import React, { useState } from "react";
import API from "../utils/API";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TrashIcon from "material-ui/svg-icons/action/delete";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: '#23395d',
    color: 'white',
    fontWeight: "800",
    fontFamily: "Constantia",
  },
  drugRes: {
    padding: '0px',
    textAlign: "left",
    color: 'black',
    fontWeight: "bold",
    fontSize: "14px",
    width: "auto",
    variant: "outlined",
    backgroundColor: "lightgreen"
  },
  btn: {
    border: "2px solid lime",
    boxShadow: theme.shadows[5],
    borderRadius: "30px",
    textAlign: "center",
    color: theme.palette.text.primary,
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "400",
    align: "left",
    overflow: "auto",
    fontFamily: "Constantia",
  },
  gridBtn: {
    padding: '30px',
    overflow: "auto"
  },
  input: {
    width: "70%",
  },
  high: {
    backgroundColor: "#ff0000",
    textAlign: "center",
    overflow: "auto"
  },
  deleteButton: {
    textAlign: "center",
    overflow: "auto",
    width: "auto",
    height: "auto",
  }
}));

export default function SearchV2() {
  const classes = useStyles();
  const [search, setSearch] = useState({});
  const [drugs, setDrugs] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  // fluconazole astemizole cisapride disopyramide

  const addDrug = (e) => {
    e.preventDefault()
    loadDrugs(search)
    document.getElementById("drugTextField").value = "";
    document.getElementById("drugTextField").focus();
  }

  const loadDrugs = (search) => {
    API.getDrugsID(search)
      .then(res => {
        setDrugs([
          ...drugs,
          {
            id: drugs.length,
            name: res.data.idGroup.name,
            rxcui: res.data.idGroup.rxnormId
          }
        ])

      })
      .catch(err => console.log(err));
  };

  const fetchConflict = (e) => {
    e.preventDefault();
    loadConflicts();
  }

  const loadConflicts = () => {
    let finalAPICall = '';
    for (let element of drugs) {
      finalAPICall += element.rxcui[0] + "+";
      // maybe have a line that stops "+" at the last one?
    }
    API.getDrugsConflict(finalAPICall)
      .then(res => {
        const interaction = res.data.fullInteractionTypeGroup[1].fullInteractionType;
        let commentRes = {};
        let severityRes = {};
        let holder = [];
        for (let index of interaction) {
          commentRes = index.comment
          severityRes = index.interactionPair[0].severity
          console.log(commentRes)
          holder.push({
            id: conflicts.length,
            details: commentRes,
            threat: severityRes
          })
        }
        setConflicts(holder)
      }).catch(err => {
        console.log(err)
      });
  }

  const handleDelete = (e) => {
    const name = e.target.getAttribute("name")
    setDrugs(drugs.filter(drug => drug.name !== name));
  }

  return (
    <div>
      <Grid container spacing={12}>
        <Grid item xs={12}
          container
          direction="column"
          justify="center">
          <div className={classes.title}>
            <h1>Check Drug Interactions</h1>
            {/* <p>Add two or more drugs to see their interactions.</p> */}
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
        <p>Add two or more drugs to see their interactions.</p>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
          <Grid item xs={8}>
          <div className={classes.inputField}>
            <TextField
              id="drugTextField"
              className={classes.input}
              type="text"
              label="Enter drug name here"
              variant="filled"
              onChange={e => setSearch(e.target.value.trim())}
            ></TextField>
            <Button
              className={classes.btn}
              type="button"
              onClick={addDrug}
              variant="contained"
              color="primary"
            >FETCH DRUG</Button>
          </div>
          <Grid item xs={2}></Grid>
          <div>
            {
              drugs.length ? (
                <div>
                  {
                    drugs.map(drug => (
                      <Grid container spacing={12}>
                        <Grid item xs={10}>
                          <Paper className={classes.drugRes}>
                            <h2 key={drug.id}>Name: {drug.name}</h2>
                            <h5>RXCUI: {drug.rxcui}</h5>
                          </Paper>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                              key={drug.id}
                              name={drug.name}
                              className={classes.gridBtn}
                              onClick={handleDelete}
                            >
                              <TrashIcon 
                                className={classes.deleteButton}
                                key={drug.id}
                                name={drug.name}
                                onClick={handleDelete}
                              ></TrashIcon>
                            </Button>
                        </Grid>
                      </Grid>
                    ))
                  }
                </div>
              ) : (
                  <h3>No Drugs Added</h3>
                )
            }
          </div>
          <Button
            className={classes.btn}
            type="button"
            onClick={fetchConflict}
            variant="contained"
            color="primary"
          >
            Submit for conflicts</Button>
        </Grid>


        <Grid item xs={12}>
          <ul>
            {
              conflicts.length ? (
                <div>
                  {conflicts.map(conflict => (
                    <Grid container spacing={12}>
                      <Grid item xs={10}>
                        <Paper className={classes.drugRes}>
                          <h3 key={conflict.id}>{conflict.details}</h3>
                        </Paper>
                      </Grid>
                      <Grid item xs={2}>
                        <Paper className={classes.high}>
                          <h3 key={conflict.id}>Severity: {conflict.threat}</h3>
                        </Paper>
                      </Grid>
                    </Grid>
                  ))}
                </div>
              ) : (
                  <h3>No Conflicts Found</h3>
                )
            }
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}

