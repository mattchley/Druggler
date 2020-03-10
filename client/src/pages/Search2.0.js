import React, { useState, useEffect } from "react";
import API from "../utils/API";
import axios from "axios";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SearchV2() {
    const [drugs, setDrugs] = useState([]);
    const [search, setSearch] = useState({})
    const [formInput, setformInput] = useState({})
    const [conflicts, setConflicts] = useState([]);

    const addDrug = () => {
        setformInput(search)
    }

    const fetchConflict = () => {
        let finalAPICall = '';
        for (let element of drugs) {
            finalAPICall += element.rxcui[0] + "+";
            // maybe have a line that stops "+" at the last one?
        }
        API.getDrugsConflict(finalAPICall).then(res => {
            setConflicts([
                ...conflicts,
                {
                    id: conflicts.length,
                    severity: res.data.fullInteractionTypeGroup[1].fullInteractionType[0].interactionPair[0].severity,
                    details: res.data.fullInteractionTypeGroup[1].fullInteractionType[0].comment
                }
            ])
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        });
    }
// res.data.fullInteractionTypeGroup[]
// [0]DrugBank[i]
// .fullInteractionType[i].comment (verbose details about the conflict)
// .fullInteractionType[i].interactionPair[i].interactionConcept.description (chemical details)

// Fluconazole
// Bosentan
// Simvastatin

useEffect(() => {
    axios
        .get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${formInput}`)
        .then(res => {
            setDrugs([
                ...drugs,
                {
                    id: drugs.length,
                    name: res.data.idGroup.name,
                    rxcui: res.data.idGroup.rxnormId
                }
            ])

        }).catch(err => {
            console.log(err)
        });
}, [formInput])

return (
    <div>
        <div id="searchPage">
            <TextField 
                type="text" 
                onChange={e => setSearch(e.target.value)}
                label="Enter drug name here"
                variant="filled"
            >
            </TextField>
            <Button 
                type="button" 
                onClick={addDrug}
                variant="contained"
                color="primary"
            >
            FETCH DRUG
            </Button>
        </div>

        <>
            <ul>
                {drugs.map(drug => (
                    <li key={drug.id}>Name:{drug.name} RXCUI:{drug.rxcui}</li>
                ))}
            </ul>
        </>
        <hr></hr>
        <Button 
            type="button" 
            onClick={fetchConflict}
            variant="contained"
            color="primary"
        > 
        Submit for conflicts
        </Button>
        <>
            <ul>
                {conflicts.map(conflict => (
                    <li key={conflict.id}>Details: {conflict.details} Severity:{conflict.severity}</li>
                ))}
            </ul>
        </>
        
    </div>
);
}

export default SearchV2;