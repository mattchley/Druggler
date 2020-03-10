import React, { useState, useEffect } from "react";
// import Input from "../components/Input"
import FormBtn from "../components/FormBtn"
import API from "../utils/API";
import Button from '@material-ui/core/Button';
// import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

function Search() {
    // Setting our component's initial state
    const [drugs1, setDrugs1] = useState(["153010"])
    const [drugs2, setDrugs2] = useState(["202433"])
    const [drugs3, setDrugs3] = useState(["153165"])
    const [drugs4, setDrugs4] = useState([])
    const [drugs5, setDrugs5] = useState([])
    const [drugs6, setDrugs6] = useState([])
    const [drugs7, setDrugs7] = useState([])
    const [drugs8, setDrugs8] = useState([])
    const [drugs9, setDrugs9] = useState([])
    const [drugs10, setDrugs10] = useState([])
    // const [search, setSearch] = useState({})
    // const [formObject, setFormObject] = useState({})
    // const [inputList, setInputList] = useState([]);
    const ids = [];

    // Loads all Drugs and sets them to Drugs
    // returns info of lipitor on the SearchAPI page
    function loadDrugs(search) {
        API.getDrugsID(search)
            .then(res => {
                setDrugs1(res.data.idGroup.rxnormId)
                // setDrugs2(res.data.idGroup.rxnormId)
                // setDrugs3(res.data.idGroup.rxnormId)
                // setDrugs4(res.data.idGroup.rxnormId)
                // setDrugs5(res.data.idGroup.rxnormId)
                // setDrugs6(res.data.idGroup.rxnormId)
                // setDrugs7(res.data.idGroup.rxnormId)
                // setDrugs8(res.data.idGroup.rxnormId)
                // setDrugs9(res.data.idGroup.rxnormId)
                // setDrugs10(res.data.idGroup.rxnormId)
                console.log(res.data.idGroup.rxnormId)

            })
            .catch(err => console.log(err));
    };

    // function convertDrugArray() {
    //     ids.push(drugs1, drugs2, drugs3)
    //     let finalAPICall = ids[0] + "+" + ids[1] + "+" + ids[2] 
    //     //+ "+" + ids[3]
    //     // + "+" + ids[4 ] + "+" + ids[5] + "+" + ids[6] + "+" + ids[7] + "+" + ids[8] + "+" + ids[9] + "+"
    //     console.log(finalAPICall)
    // }

    function drugInteraction() {
        ids.push(drugs1, drugs2, drugs3)
        let finalAPICall = ids[0] + "+" + ids[1] + "+" + ids[2]
        API.getDrugsConflict(finalAPICall).then(res=>{
            console.log(res.data)
            
        })
    }


    // // Handles updating component state when the user types into the input field
    function handleInputChange1(event) {
        const { name, value } = event.target;
        setDrugs1({ ...drugs1, [name]: value })
    };
    function handleInputChange2(event) {
        const { name, value } = event.target;
        setDrugs2({ ...drugs2, [name]: value })
    };
    function handleInputChange3(event) {
        const { name, value } = event.target;
        setDrugs3({ ...drugs3, [name]: value })
    };
    function handleInputChange4(event) {
        const { name, value } = event.target;
        setDrugs4({ ...drugs4, [name]: value })
    };
    function handleInputChange5(event) {
        const { name, value } = event.target;
        setDrugs5({ ...drugs5, [name]: value })
    };
    function handleInputChange6(event) {
        const { name, value } = event.target;
        setDrugs6({ ...drugs6, [name]: value })
    };
    function handleInputChange7(event) {
        const { name, value } = event.target;
        setDrugs7({ ...drugs7, [name]: value })
    };
    function handleInputChange8(event) {
        const { name, value } = event.target;
        setDrugs8({ ...drugs8, [name]: value })
    };
    function handleInputChange9(event) {
        const { name, value } = event.target;
        setDrugs9({ ...drugs9, [name]: value })
    };
    function handleInputChange10(event) {
        const { name, value } = event.target;
        setDrugs10({ ...drugs10, [name]: value })
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        loadDrugs(drugs1.search)
        loadDrugs(drugs2.search)
        loadDrugs(drugs3.search)
        loadDrugs(drugs4.search)
        loadDrugs(drugs5.search)
        loadDrugs(drugs6.search)
        loadDrugs(drugs7.search)
        loadDrugs(drugs8.search)
        loadDrugs(drugs9.search)
        loadDrugs(drugs10.search)
        // convertDrugArray();
        drugInteraction();
        // document.getElementById("drugTextField").value = "";
        // document.getElementById("drugTextField").focus();
    }



    // const onAddBtnClick = event => {
    //     event.preventDefault();
    //     setInputList(inputList.concat(
    //         <div>
    //             <TextField 
    //                 key={inputList.length} 
    //                 // id="drugTextField"
    //                 
    //                 name="search"
    //                 label="Enter drug name here"
    //                 variant="filled"
    //                 onChange={handleInputChange}
    //             />
    //         </div>
    //     ));
    // };

    return (
        <div>
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange1}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange2}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange3}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange4}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange5}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange6}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange7}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange8}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange9}
            />
            <TextField
                name="search"
                label="Enter drug name here"
                variant="filled"
                onChange={handleInputChange10}
            />

            <Button
                onClick={handleFormSubmit}
                // className="navButton"
                variant="contained"
                color="primary"
            >
                Submit drugs
            </Button>


            {/* <div>
                <Button
                    onClick={onAddBtnClick} 
                    variant="contained"
                    color="secondary"
                >
                    Add input
                </Button> 
                {inputList}
            </div> */}
        </div>
    );
}


export default Search;

    // search drugs by
    // new array is created
    // put new drug into new array
    // after finished pushing drugs into new array...
    // loop through each index of the new array
    // 