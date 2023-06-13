import React, { useState,useRef } from 'react';
import './bhajanmindralu.css';

const Users = () => {
    const [requestDate] = useState(new Date().toLocaleDateString());
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  const formRef = useRef(null);

  const handleClear = () => {
    const form = formRef.current;

    if (form) {
      const inputs = form.querySelectorAll('input, select');

      inputs.forEach((input) => {
        if (input.type !== 'submit' && input.type !== 'button') {
          input.value = '';
        }
      });
    }
  };
  return (
<div className="registration-form1">
<h1 className="form-heading1">Bhajan Mandiralu</h1>
   <form className="form-container" onSubmit={handleFormSubmit}>
      <div className="columns-container">
        <div className="column">
          <p>Request Type: Bhajana Mindaralu</p>
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
          <div className="row">
            <label htmlFor="Longitude">Longitude of the location</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Longitude" />
          </div>
          <div className="row">
            <label htmlFor="name">Name of the individual/Temple etc.,<br/>who made the request<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="name"  required />
          </div>
          <div className="row">
            <label htmlFor="Phone">Phone number<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="number"
            id="phone"   required/>
          </div>
          <div className="row">
            <label htmlFor="land">Details of the land made available<span className="required-field">*</span></label>
          </div>
          <div className="row">
            <select id="land"  required>
            <option value="">0 options selected</option>
              <option value="land1">land 1</option>
              <option value="land2">land 2</option>
              <option value="land3">land 3</option>
            </select>
          </div>
          <div className="row">
            <label htmlFor="boundary">Boundaries-East, South,West,North</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="boundary" />
          </div>
          <div className="row">
            <label htmlFor="earlier">Any earlier for the said temple</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="earlier" />
          </div>
          <div className="row">
            <label htmlFor="detailsvillage">Details of villages covered if the <br />proposal is accepted</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="detailsvillage" />
          </div>
        
          <div className="row">
            <label htmlFor="email">Email of the contact person<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="email"
            id="email" 
              required
            />
          </div>
          <div className="row">
            <label htmlFor="recommendation">Recommendation of the inspecting <br />officer</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="recommendation" />
          </div>
        </div>
        <div className="column">
          <p>Request Date: {requestDate}</p>
          <div className="empty-space"></div>
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
            <label htmlFor="Population">Population of the Village/ HamletColony<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Population" required/>
          </div>
          <div className="row">
            <label htmlFor="Nametemple">Name of the Temple prposed to be constructed<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="Nametemple" required/>
          </div>
          <div className="row">
            <label className="file-input-label" htmlFor="document">Document of requeste(jpg/jpeg/pdf/png)<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
    type="file"
    accept=".jpg, .jpeg, .pdf .png"
    onChange={(event) => {
      const selectedFile = event.target.files[0];
    }}
  />

          </div>
          <div className="row">
            <label htmlFor="landvests">Title of the land vests with (Name of <br />the individual/Govt/Temple etc.)<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="landvests" required/>
          </div>
          <div className="row">
            <label htmlFor="acceptance">Whether acceptance given for <br />donating the land in favour of the<br />proposed New Temple</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="acceptance" />
          </div>
          <div className="row">
            <label htmlFor="othertemples">Details of the other temples in the <br />vicinity</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="othertemples" />
          </div>
          <div className="row">
            <label htmlFor="amount">Amount in Rs. proposed to be <br />contributed by the locals if any.</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="amount" />
          </div>
          <div className="row">
            <label htmlFor="contactperson">Particulars of the contact person<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="contactperson" required/>
          </div>
          <div className="row">
            <label htmlFor="issues">Other relevant issues, if any</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="issues" />
          </div>
        </div>
        <div className="column">
          <p>State:Andhra Pradesh</p>
          <div className="empty-space"></div>
  
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
          <div className="row">
            <label htmlFor="emailadd">Email Address<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="email"
            id="emailadd" required />
          </div>
          <div className="row">
            <label htmlFor="purpose">Extent of land available for the<br />purpose<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="text"
            id="purpose" required />
          </div>
          <div className="row">
            <label htmlFor="surveyn">Survey No.<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="number"
            id="surveyn" required />
          </div>
          <div className="row">
            <label htmlFor="support">Details of the financial support <br />received from the TTD</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="support"  />
          </div>
          <div className="row">
            <label htmlFor="nearbyvill">Details of the temples available in <br />the nearby villages with <br />appropriate distance.</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="nearbyvill"  />
          </div>
          <div className="row">
            <label htmlFor="contri">Contribution proposed by the locals if any- [not amount]</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="contri"  />
          </div>
          <div className="row">
            <label htmlFor="phonenoofc">Phone number of contact<span className="required-field">*</span></label>
          </div>
          <div className="row">
          <input
            type="number"
            id="phonenoofc" required  />
          </div>
          <div className="row">
            <label htmlFor="comments">Additional Comments</label>
          </div>
          <div className="row">
          <input
            type="text"
            id="comments"  />
          </div>
        </div>
      </div>
      <div class="form-buttons-container">
      <button class="form-submit-button" type="submit">Submit</button>
      <button class="clear-button" onClick={handleClear}>Clear</button>
    </div>
      </form>
    </div>
  );
};

export default Users;
