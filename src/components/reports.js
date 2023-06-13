import React, { useState,useRef } from 'react';
import './reports.css';

const Reports = () => {
    const [requestDate] = useState(new Date().toLocaleDateString());
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };
 
  const handleClear = () =>  {
    const inputs = document.querySelectorAll('input, select');
  
    inputs.forEach((input) => {
      if (input.type !== 'submit' && input.type !== 'button') {
        input.value = '';
      }
    });
  }
  
  return (
<div className="report-form1">
<h1 className="heading">Reports</h1>
   <form  className="form-container" onSubmit={handleFormSubmit}>
      <div className="columns-container">
        <div className="column">
          <div className="row">
          <label htmlFor="phases">
          Phases:<span className="requiredfield">*</span>
        </label>
        </div>
        <div className="row">
        <select id="phases" required>
          <option value="">0 options selected</option>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
        </select>
      </div>
          <div className="row">
            <label htmlFor="district">Name of the district<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <select id="district" required>
          <option value="">0 options selected</option>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
        </select>
          </div>
          <div className="row">
            <label htmlFor="village">Name of the Village<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="village"
            required />
          </div>
        </div>
        <div className="column">
          <div className="row">
            <label htmlFor="assembly">Name of the Assembly Constituency<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="assembly" required/>
          </div>
          <div className="row">
            <label htmlFor="Colony">Name of the Hamlet,Colony<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Colony" required/>
          </div>
          <div className="row">
            <label htmlFor="Population">Population of the Village/ Hamlet/<br />Colony<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Population" required/>
          </div>
        </div>
        <div className="column">  
          <div className="row">
            <label htmlFor="mandal">Name of the Mandal<span className="required-field">*</span></label>
          </div>
          <div className="row">
            <select id="mandal" required >
              <option value="mandal1">0 options selected</option>
              <option value="mandal2">District 2</option>
              <option value="mandal3">District 3</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="latitude">Latitude of the location</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="latitude" />
          </div>
          <div className="row">
            <label htmlFor="Colony">Specify if the proposed location is SC/ST/Fisherman colony<span className="required-field">*</span></label>
          </div>
          <div className="row">
            <select id="Colony" required>
            <option value="Colonydefault">0 options selected</option>
              <option value="Colonyyes">Yes </option>
              <option value="Colonyno">No</option>
            </select>
          </div>
        </div>
        <div className="column">
          <div className="row">
            <label htmlFor="mandal">Name of the Mandal<span className="required-field">*</span></label>
          </div>
          <div className="row">
            <select id="mandal" required >
              <option value="mandal1">0 options selected</option>
              <option value="mandal2">District 2</option>
              <option value="mandal3">District 3</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="latitude">Latitude of the location</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="latitude" />
          </div>
          <div className="row">
            <label htmlFor="Colony">Specify if the proposed location is SC/ST/Fisherman colony<span className="required-field">*</span></label>
          </div>
          <div className="row">
            <select id="Colony" required>
            <option value="Colonydefault">0 options selected</option>
              <option value="Colonyyes">Yes </option>
              <option value="Colonyno">No</option>
            </select>
          </div>
        </div>
      </div>
      <div class="form-buttons-container">
      <button class="form-submit-button" type="submit">Submit</button>
      <button class="clear-button" onClick={handleClear}>Clear</button>
      <img src={process.env.PUBLIC_URL + '/assets/pdficon.png'} alt="pdf" />
    </div>
    <div className="box">
        <h2>Generated Report</h2>
        <img src={process.env.PUBLIC_URL + '/assets/pdficon.png'} alt="pdf" />
    </div>
      </form>
    </div>
  );
};

export default Reports;
