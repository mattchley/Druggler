import React, { useState } from "react";
import API from "../utils/API";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
function SearchV2() {
  const [search, setSearch] = useState({});
  const [drugs, setDrugs] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  // Tester:
  // fluconazole 4450
  // astemizole 42328
  // cisapride 35255
  // disopyramide 3541
  // flibanserin 1665509
  // ibutilide 41289
  // indapamide 5764
  // lomitapide 1364479
  // pentamidine 7994
  // pimozide 8331
  const addDrug = () => {
    loadDrugs(search);
  };
  const loadDrugs = search => {
    API.getDrugsID(search)
      .then(res => {
        setDrugs([
          ...drugs,
          {
            id: drugs.length,
            name: res.data.idGroup.name,
            rxcui: res.data.idGroup.rxnormId
          }
        ]);
        console.log(res.data.idGroup.rxnormId);
      })
      .catch(err => console.log(err));
  };
  const fetchConflict = () => {
    let finalAPICall = "";
    for (let element of drugs) {
      finalAPICall += element.rxcui[0] + "+";
      // maybe have a line that stops "+" at the last one?
    }
    loadConflicts(finalAPICall);
  };
  const loadConflicts = finalAPICall => {
    API.getDrugsConflict(finalAPICall)
      .then(res => {
        const interaction =
          res.data.fullInteractionTypeGroup[1].fullInteractionType;
        let commentRes = {};
        let severityRes = {};
        for (let index of interaction) {
          // console.log(index.comment)
          commentRes = index.comment;
          severityRes = index.interactionPair[0].severity;
          console.log(commentRes);
          console.log(severityRes);
        }
        // find a way to map all of it to the one set below?
        // Or make more arrays to hold the extra data that will the go to the conflicts array?
        setConflicts([
          ...conflicts,
          {
            id: conflicts.length,
            details:
              res.data.fullInteractionTypeGroup[1].fullInteractionType[0]
                .comment,
            severity:
              res.data.fullInteractionTypeGroup[1].fullInteractionType[0]
                .interactionPair[0].severity
            // res.data.fullInteractionTypeGroup[]
            // [0]DrugBank[i]
            // .fullInteractionType[i].comment (verbose details about the conflict)
            // .fullInteractionType[i].interactionPair[i].interactionConcept.description (chemical details)
          }
        ]);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <TextField
          type="text"
          label="Enter drug name here"
          variant="filled"
          onChange={e => setSearch(e.target.value)}
        ></TextField>
        <Button
          type="button"
          onClick={addDrug}
          variant="contained"
          color="primary"
        >
          FETCH DRUG
        </Button>
      </div>
      <div>
        <ul>
          {drugs.length ? (
            <div>
              {drugs.map(drug => (
                <li key={drug.id}>
                  Name:{drug.name} RXCUI:{drug.rxcui}
                </li>
              ))}
            </div>
          ) : (
            <h3>No Drugs Added</h3>
          )}
        </ul>
      </div>
      <Button
        type="button"
        onClick={fetchConflict}
        variant="contained"
        color="primary"
      >
        Submit for conflicts
      </Button>
      <div>
        <ul>
          {conflicts.length ? (
            <div>
              {conflicts.map(conflict => (
                <li key={conflict.id}>
                  Details: {conflict.details} Severity:{conflict.severity}
                </li>
              ))}
            </div>
          ) : (
            <h3>No Conflicts to Display</h3>
          )}
        </ul>
      </div>
    </div>
  );
}
export default SearchV2;