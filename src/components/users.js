import React from 'react';
import './users.css';

const users = () => {
  return (
    <div className="form-container">
      <h1>Form Heading</h1>
      <div className="columns-container">
        <div className="column">
          <h2>Column 1</h2>
          <div className="row">
          <label htmlFor="phases">
          Phases:<span className="requiredfield">*</span>
        </label>
        </div>
        <div className="row">
        <select id="phases" required>
          <option value="">Select Phase</option>
          <option value="Phase 1">Phase 1</option>
          <option value="Phase 2">Phase 2</option>
          <option value="Phase 3">Phase 3</option>
        </select>
      </div>
          <div className="row">
            <label htmlFor="district">Name of the district</label>
          </div>
          <div className="row">
            <select id="district">
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              <option value="district3">District 3</option>
            </select>
          </div>
        </div>
        <div className="column">
          <h2>Column 2</h2>
          <div className="empty-space"></div>
          <div className="row">
            <label htmlFor="district2">Name of the district</label>
          </div>
          <div className="row">
            <select id="district2">
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              <option value="district3">District 3</option>
            </select>
          </div>
        </div>
        <div className="column">
          <h2>Column 3</h2>
          <div className="empty-space"></div>
  
          <div className="row">
            <label htmlFor="district3">Name of the district</label>
          </div>
          <div className="row">
            <select id="district3">
              <option value="district1">District 1</option>
              <option value="district2">District 2</option>
              <option value="district3">District 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default users;
