import React from "react";
import Modal from "../components/DrugModal";

const AddDrug = () => (
  <div>
    <h1>Add your drugs here</h1>
    <br></br>
    <h2>Here are your drugs</h2>
    <br></br>
    <div>
      <p>Drug 1</p>
      <Modal name={"Drug 1"}/>
    </div>
    <div>
      <p>Drug 2</p>
      <Modal name={"Drug 2"}/>
    </div>
    <div>
      <p>Drug 3</p>
      <Modal name={"Drug 3"}/>
    </div>
  </div>
);

export default AddDrug;
