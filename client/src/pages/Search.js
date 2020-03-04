import React, { useState, useEffect } from "react";
import Input from "../components/Input"
import FormBtn from "../components/FormBtn"
import API from "../utils/API";

function Search() {
    // Setting our component's initial state
    const drugs = []
    // const [search, setSearch] = useState({})
    const [formObject, setFormObject] = useState({})

    // Loads all Drugs and sets them to Drugs

    // returns info of lipitor on the SearchAPI page
    function loadDrugs(search) {
        API.getDrugsID(search)
            .then(res => {
                drugs.push(res.data.idGroup.rxnormId[0]);
                console.log(res.data);
                console.log(drugs);
            })
            .catch(err => console.log(err));
    };


    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        loadDrugs(formObject.search)
    }

    return (
        <div>
            <Input
                onChange={handleInputChange}
                name="search"
                placeholder="Drug Name and Dosage (required)"
            />
            <FormBtn
                onClick={handleFormSubmit}
            >
                Submit drug
              </FormBtn>
            <div>
                {drugs.length ? (
                    <div>
                        {drugs.map(drug => (
                            <li key={drug.idGroup.rxnormId}>
                                <strong>
                                    {drug.idGroup.name}
                                    {drug.idGroup.rxnormId}
                                </strong>
                            </li>
                        ))}
                        <button>Submit</button>
                    </div>

                ) : (
                        <h3>No Results to Display</h3>
                    )
                }
            </div>
        </div>
    );
}


export default Search;