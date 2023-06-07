import React, { useState } from 'react';
import './reports.css';

const Report = () => {
  const [requestDate, setRequestDate] = useState(new Date().toLocaleDateString());
  const [district, setDistrict] = useState('');
  const [assemblyConstituency, setAssemblyConstituency] = useState('');
  const [mandal, setMandal] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  };

  return (
<div className="registration-form">
<h2 className="form-heading">Registration Form</h2>
<div className="form-box">
<div className="form-row1">
<p className="form-line">Request Type: Bhajana Mindaralu</p>
<p className="form-line" style={{ marginLeft: "3%"}}>Request Date: {requestDate}</p>
<p className="form-line" style={{ marginLeft: "7.2%"}}>State:Andhra Pradesh</p>
</div>
  <div className="form-row">
    <div className="form-column">
      <div className="form-row">
        <label htmlFor="phases">
          Phases:<span className="required-field">*</span>
        </label>
        </div>
        <div className="form-row">
        <select id="phases" required>
          <option value="">Select Phase</option>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="district">
          Name of the District:<span className="required-field">*</span>
        </label>
        </div>
         <div className="form-row">
        <select id="district" required onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 3">District 3</option>
        </select>
      </div>
    </div>
    <div className="form-column">
    <div className="form-row">
        <label htmlFor="district">
          Name of the District:<span className="required-field">*</span>
        </label>
        </div>
        <div className="form-row">
        <select id="district" required onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 3">District 3</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="district">
          Name of the District:<span className="required-field">*</span>
        </label>
        </div>
        <div className="form-row">
        <select id="district" required onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 3">District 3</option>
        </select>
      </div>
    </div>
    <div className="form-column">
   
    <div className="form-row">
        <label htmlFor="district">
          Name of the District:<span className="required-field">*</span>
        </label>
        </div>
        <div className="form-row">
        <select id="district" required onChange={(e) => setDistrict(e.target.value)}>
          <option value="">Select District</option>
          <option value="District 1">District 1</option>
          <option value="District 2">District 2</option>
          <option value="District 3">District 3</option>
        </select>
      </div>
  </div>
  
</div>
<button type="submit" onClick={handleFormSubmit}>
    Submit
  </button>
</div>
</div>
  );
};

export default Report;