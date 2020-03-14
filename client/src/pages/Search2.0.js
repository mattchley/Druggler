import React, { useState, useEffect } from "react";
import API from "../utils/API";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SearchV2() {
  const [search, setSearch] = useState({});
  const [drugs, setDrugs] = useState([]);
  const [conflicts, setConflicts] = useState([]);

  // fluconazole astemizole cisapride disopyramide

  const addDrug = (e) => {
    e.preventDefault()
    loadDrugs(search)
    document.getElementById("enterDrugHere").value = "";
    document.getElementById("enterDrugHere").focus();
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
    e.preventDefault()
    loadConflicts()
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
        // Something is happening here where the data is not going into the array
        for (let index of interaction) {
          commentRes = index.comment
          severityRes = index.interactionPair[0].severity
          console.log(commentRes)
          holder.push({
            id: conflicts.length,
            details: commentRes,
            threat: severityRes
          })
          // setConflicts([
          //   ...conflicts,
          //   {
          //     id: conflicts.length,
          //     details: commentRes,
          //     threat: severityRes
          //   }
          // ])
        }
        setConflicts(holder)
      }).catch(err => {
        console.log(err)
      });
  }

  const mapConflicts = () => {
    // conflicts.push('test')
    console.log(conflicts);
  }

  return (
    <div>
      <div>
        <TextField type="text"
          id="enterDrugHere"
          label="Enter drug name here"
          variant="filled" onChange={e => setSearch(e.target.value)}
        ></TextField>
        <Button
          type="button"
          onClick={addDrug}
          variant="contained"
          color="primary"
        >FETCH DRUG</Button>
        <Button
          type="button"
          onClick={mapConflicts}
          variant="contained"
          color="primary"
        >FETCH conflict</Button>
      </div>

      <div>
        <ul>
          {
            drugs.length ? (
              <div>
                {
                  drugs.map(drug => (
                    <li key={drug.id}>Name:{drug.name} RXCUI:{drug.rxcui}</li>
                  ))
                }
              </div>

            ) : (
                <h3>No Drugs Added</h3>
              )
          }
        </ul>
      </div>
      <Button
        type="button"
        onClick={fetchConflict}
        variant="contained"
        color="primary"
      >
        Submit for conflicts</Button>
      <div>
        <ul>
          {
            conflicts.length ? (
              <div>
                {conflicts.map(conflict => (
                  <div>
                    <li key={conflict.id}>{conflict.details}</li>
                    <li key={conflict.id}>{conflict.threat}</li>
                  </div>
                ))}
              </div>
            ) : (
                <h3>No Conflicts Found</h3>
              )
          }
        </ul>
      </div>

    </div>
  );
}

export default SearchV2;
