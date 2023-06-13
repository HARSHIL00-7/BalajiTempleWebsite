import React, { useState,useRef } from 'react';
import './reports.css';

const Reports = () => {
    const [requestDate] = useState(new Date().toLocaleDateString());
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
  };
 
  const handleClear = () =>  {
    document.getElementById('report-form').reset();
  }
  
  return (
<div className="report-form1">
<h1 className="heading">Reports</h1>
   <form  className="form-container" onSubmit={handleFormSubmit} id="report-form">
      <div className="columns-container">
        <div className="column">
          <div className="row">
          <label htmlFor="dis">
          District:</label>
        </div>
        <div className="row">
        <select id="dis" >
          <option value="">0 options selected</option>
          <option value="dis 1">District 1</option>
          <option value="dis 2">District 2</option>
          <option value="dis 3">District 3</option>
        </select>
      </div>
          <div className="row">
            <label htmlFor="assemblyc">Name of the Assembly Constituency</label>
          </div>
          <div className="row">
          <select id="assemblyc" >
          <option value="">0 options selected</option>
          <option value="assemblyc 1">Constituency 1</option>
          <option value="assemblyc 2">Constituency 2</option>
          <option value="assemblyc 3">Constituency 3</option>
        </select>
          </div>
          <div className="row">
            <label htmlFor="sdate">Start Date</label>
          </div>
          <div className="row">
          <input
            type="date"
            id="sdate"
             />
          </div>
        </div>
        <div className="column">
          <div className="row">
            <label htmlFor="mandal1">Mandal</label>
          </div>
          <div className="row">
          <select id="mandal1" >
          <option value="">0 options selected</option>
          <option value="mandal 1">mandal 1</option>
          <option value="mandal 2">mandal 2</option>
          <option value="mandal 3">mandal 3</option>
        </select>
          </div>
          <div className="row">
            <label htmlFor="colony">Colony</label>
          </div>
          <div className="row">
          <select id="colony" >
          <option value="">0 options selected</option>
          <option value="colony 1">colony 1</option>
          <option value="colony 2">colony 2</option>
          <option value="colony 3">colony 3</option>
        </select>
          </div>
          <div className="row">
            <label htmlFor="enddate">End Date</label>
          </div>
          <div className="row">
          <input
            type="date"
            id="enddate" />
          </div>
        </div>
        <div className="column">  
          <div className="row">
            <label htmlFor="panch">Panchayat</label>
          </div>
          <div className="row">
            <select id="panch"  >
              <option value="">0 options selected</option>
              <option value="panch1">Panchayat 1</option>
              <option value="panch2">Panchayat 2</option>
              <option value="panch3">Panchayat 3</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="ref">Refered</label>
          </div>
          <div className="row">
          <select id="ref"  >
              <option value="">0 options selected</option>
              <option value="ref 1">Yes</option>
              <option value="ref 2">No</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="lColony">Specify if the proposed location is SC/ST/Fisherman colony</label>
          </div>
          <div className="row">
            <select id="lColony" >
            <option value="lColonydefault">0 options selected</option>
              <option value="lColonyyes">Yes </option>
              <option value="lColonyno">No</option>
            </select>
          </div>
        </div>
        <div className="column">
          <div className="row">
            <label htmlFor="ward">Ward</label>
          </div>
          <div className="row">
          <select id="ward"  >
              <option value="">0 options selected</option>
              <option value="ward 1">Ward 1</option>
              <option value="ward 2">Ward 2</option>
              <option value="ward 2">Ward 3</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="pha">Phases</label>
          </div>
          <div className="row">
          <select id="pha"  >
              <option value="">0 options selected</option>
              <option value="pha 1">Phase 1</option>
              <option value="pha 2">Phase 2</option>
              <option value="pha 2">Phase 3</option>
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


