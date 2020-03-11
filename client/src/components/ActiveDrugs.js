import React, {useState, useEffect} from "react";
import API from "../utils/API";
import Auth from "../utils/Auth";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const ActiveDrugs = (props) => {


    return (
        
        <div>
            <div row>
                <div col="3"> 
                  <p>Name : {props.name}</p>

                </div>
                <div col="3"> 
                  <p>Frequency: {props.frequency}</p>

                </div>
                <div col="3"> 
                  <p>Last Taken: {props.lastTaken}</p>
                </div>
                <div col="3">
                    <button>Remove</button>
                    <button>Taken</button>
                </div>
            </div>

        </div>
      
    )
}
export default ActiveDrugs;
