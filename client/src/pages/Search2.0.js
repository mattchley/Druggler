import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TrashIcon from "material-ui/svg-icons/action/delete";
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ConnectionStates } from "mongoose";
import { motion } from 'framer-motion';



import PropTypes from 'prop-types';


import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { VariableSizeList } from 'react-window';
import { Typography } from '@material-ui/core';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  listbox: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
  title: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "800",
    fontFamily: "Constantia"
  },
  drugRes: {
    padding: "0",
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
    fontSize: "14px",
    width: "auto",
    variant: "outlined",
    backgroundColor: "lightgreen",
    border: "0.1rem solid",
  },
  drugConflict: {
    padding: "0",
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
    fontSize: "14px",
    padding: "10px",
    variant: "outlined",
    backgroundColor: "lightgreen",
    border: "0.1rem solid",
  },
  btn: {
    border: "2px solid seagreen",
    boxShadow: theme.shadows[5],
    borderRadius: "30px",
    textAlign: "center",
    backgroundColor: "#23395d",
    color: "white",
    fontWeight: "400",
    align: "left",
    overflow: "auto",
    fontFamily: "Constantia"
  },
  gridBtn: {
    padding: "30px",
    overflow: "auto"
  },
  input: {
    width: "100%",
  },
  high: {
    backgroundColor: "#ff0000",
    textAlign: "center",
    overflow: "auto",
    padding: "10px",
    borderRadius: "30px",
    textAlign: "center",
    color: "black",
    fontWeight: "400",
    fontFamily: "Constantia",
    border: "1.65mm ridge rgba(0, 0, 0, .8)"
  },
  deleteButton: {
    textAlign: "center",
    overflow: "auto",
    height: "30px",
    width: "30px"
    // border: "1mm ridge rgba(200, 200, 200, .8)"
  }
}));



const renderGroup = (params) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
];



export default function SearchV2() {
  const classes = useStyles();
  const [search, setSearch] = useState({});
  const [drugs, setDrugs] = useState([]);
  const [conflicts, setConflicts] = useState([])
  const [list, setList] = useState([])

  // fluconazole astemizole cisapride disopyramide
  // fluconazole astemizole tylenol
  useEffect(() => {
    API.getDrugNameList().then(res => { setList(res.data.displayTermsList.term) })
  }, []);

  const addDrug = e => {
    e.preventDefault();
    loadDrugs(search);
    document.getElementById("drugTextField").value = "";
    document.getElementById("drugTextField").focus();
  };

  const loadDrugs = search => {
    API.getDrugsID(search)
      .then(res => {
        setDrugs([
          ...drugs,
          {
            id: res.data.idGroup.rxnormId,
            name: res.data.idGroup.name,
            rxcui: res.data.idGroup.rxnormId
          }
        ]);
      })
      .catch(err => console.log(err));
  };

  const fetchConflict = e => {
    e.preventDefault();
    loadConflicts();
  };
  // needs a way to connect by filtering out what is minConcept
  const loadConflicts = () => {
    let finalAPICall = "";
    for (let element of drugs) {
      console.log(element.rxcui[0])
      finalAPICall += element.rxcui[0] + "+";
      // maybe have a line that stops "+" at the last one?
    }
    async function conflictRes() {
      const fetch = await API.getDrugsConflict(finalAPICall)
      let bankConceptArray = await []
      let bankCommentArray = await []
      let highConceptArray = await []
      let highSeverityArray = await []

      const bankConcept = fetch.data.fullInteractionTypeGroup[0].fullInteractionType
      for (let index of bankConcept) {
        bankConceptArray.push(
          index.minConcept[0].rxcui + " and " + index.minConcept[1].rxcui,
        )
        bankCommentArray.push({
          comments: index.comment
        })
      }
      const highConcept = fetch.data.fullInteractionTypeGroup[1].fullInteractionType
      for (let index of highConcept) {
        highConceptArray.push(
          index.minConcept[0].rxcui + " and " + index.minConcept[1].rxcui,
        )
        highSeverityArray.push({
          severity: index.interactionPair[0].severity
        })
      }
      if (highSeverityArray.length < bankCommentArray.length) {
        for (var i = 1; i < bankCommentArray.length; i++) {
          highSeverityArray.push({
            severity: "N/A"
          });
        }
      }
      setConflicts([
        ...conflicts,
        {
          BankConcepts: bankConceptArray,
          BankDescription: bankCommentArray,
          HighConcepts: highConceptArray,
          HighSeverity: highSeverityArray,
        }
      ])
    }
    conflictRes()
  };

  const handleDelete = e => {
    const name = e.target.getAttribute("name");
    setDrugs(drugs.filter(drug => drug.name !== name));
  };

  return (
    <div style={{ overflowX: "hidden", overflowY: "hidden" }}>
      <Grid container spacing={12}>
        <Grid item xs={12} container direction="column" justify="center">

          <h1>Check Drug Interactions</h1>

        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <p style={{color: "black"}}>Add two or more drugs to see their interactions.</p>
        </Grid>
        <Grid item xs={2}></Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <div className={classes.inputField}>
            <Autocomplete
              id="drugTextField"
              disableListWrap
              className={classes.input}
              classes={classes}
              ListboxComponent={ListboxComponent}
              renderGroup={renderGroup}
              options={list}
              groupBy={(option) => option[0].toUpperCase()}
              renderInput={(params) => <TextField {...params} variant="outlined" label="Enter drug name here" />}
              renderOption={(option) => <Typography noWrap>{option}</Typography>}
              onChange={e => setSearch(document.getElementById("drugTextField").value)}
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className={classes.inputField}>

            <Button
              className={classes.btn}
              type="button"
              onClick={addDrug}
              variant="contained"
              color="primary"
            >
              Add Drug
                    </Button>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>

        <Grid item xs={2}></Grid>

        <div>
          <Grid item xs={2}></Grid>
          {drugs.length ? (
            <div>
              {drugs.map(drug => (
                <Grid container spacing={12}>
                  <Grid item xs={10}>
                    <Paper className={classes.drugRes}>
                      <h2 key={drug.id}>Name: {drug.name}</h2>
                      <h5>RXCUI: {drug.rxcui}</h5>
                    </Paper>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      style={{ padding: "35px" }}
                      key={drug.id}
                      name={drug.name}
                      className={classes.gridBtn}
                      onClick={handleDelete}
                      variant="contained"
                    >
                      <TrashIcon
                        className={classes.deleteButton}
                        key={drug.id}
                        name={drug.name}
                        onClick={handleDelete}
                      >
                      </TrashIcon>
                    </Button>
                  </Grid>
                </Grid>
              ))}
            </div>
          ) : (
              <h3>No Drugs Added</h3>
            )}
        </div>
      </Grid>

      <div>
        <Grid container spacing={12}>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Button
              className={classes.btn}
              type="button"
              onClick={fetchConflict}
              variant="contained"
              color="primary"
            >
              Submit for conflictRes
                  </Button>

          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        <hr></hr>
      </div>
      <Grid item xs={12}>
        <div>
          {conflicts.length ? (
            conflicts.map(obj =>
              (
                <Grid container spacing={12}>
                  <Grid item xs={8}>
                    {obj.BankDescription.map(x =>
                      <Paper className={classes.drugConflict}>
                        <h3>{x.comments}</h3>
                      </Paper>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    {obj.HighSeverity.map(x =>
                      <Paper className={classes.high}>
                        <h3>Severity: {x.severity}</h3>
                      </Paper>
                    )}
                  </Grid>
                </Grid>

              )
            )
          ) : (
              <div>
                <h3>No Conflicts Found</h3>
              </div>
            )}
        </div>
      </Grid>
    </div>
  );
}


