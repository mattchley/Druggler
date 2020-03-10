import React, { useState, useEffect } from "react";
import API from "../utils/API";
import axios from "axios"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SearchV2() {
    const [drugs, setDrugs] = useState([]);
    const [search, setSearch] = useState({})
    const [conflicts, setConflicts] = useState([]);
    // Tester:
    // Fluconazole
    // Bosentan
    // Simvastatin

    const addDrug = () => {
        loadDrugs(search)
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
                    // res.data.fullInteractionTypeGroup[]
                    // [0]DrugBank[i]
                    // .fullInteractionType[i].comment (verbose details about the conflict)
                    // .fullInteractionType[i].interactionPair[i].interactionConcept.description (chemical details)
                }
            ])
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        });
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

                console.log(res.data.idGroup.rxnormId)

            })
            .catch(err => console.log(err));
    };


    return (
        <div>
            <div>
                <TextField type="text" onChange={e => setSearch(e.target.value)}></TextField>
                <Button type="button" onClick={addDrug}>FETCH DRUG</Button>
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
            <Button type="button" onClick={fetchConflict}> Submit for conflicts</Button>
            <div>
                <ul>
                    {
                        conflicts.length ? (
                            <div>
                                {
                                    conflicts.map(conflict => (
                                        <li key={conflict.id}>Details: {conflict.details} Severity:{conflict.severity}</li>
                                    ))
                                }
                            </div>
                        ) : (
                                <h3>No Conflicts to Display</h3>
                            )
                    }

                </ul>
            </div>

        </div>
    );
}

export default SearchV2;