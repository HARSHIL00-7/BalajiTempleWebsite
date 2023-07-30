import React, { useState, useRef } from "react";
import "./bhajanmindralu.css";
import axios from "axios";

const Bhajanmindralu = () => {
  const [requestDate] = useState(new Date().toLocaleDateString());

  const initialState = {
    phases: "",
    district: "",
    village: "",
    Longitude: "",
    name: "",
    Phone: "",
    land: "",
    boundary: "",
    earlier: "",
    detailsvillage: "",
    email: "",
    recommendation: "",
    assembly: "",
    Colony: "",
    Population: "",
    Nametemple: "",
    docfile: "",
    landvests: "",
    acceptance: "",
    othertemples: "",
    amount: "",
    contactperson: "",
    issues: "",
    mandal: "",
    latitude: "",
    SCST: "",
    emailadd: "",
    purpose: "",
    surveyn: "",
    support: "",
    nearbyvill: "",
    contri: "",
    phonenoofc: "",
    comments: "",
  };

  const [formData, setFormData] = useState(initialState);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    formRef.current.reset();
    setFormData(initialState);
  };
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;

        const base64Data = dataURL.split(",")[1];

        const binaryString = window.atob(base64Data);

        const base64String = window.btoa(binaryString);

        setFormData((prevState) => ({
          ...prevState,
          docfile: base64String,
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const cookie = document.cookie;
    const token = getCookieValue(cookie, "token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(formData);
    axios
      .post("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/bhajanmindralu", formData, config)
      .then(() => {
        alert("Submitted successfully");
        handleClear();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getCookieValue(cookie, name) {
    const match = cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) {
      return match[2];
    }
    return null;
  }
  return (
    <div className="registration-form1">
      <h1 className="form-heading1">Bhajan Mandiralu</h1>
      <form
        className="form-container"
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div className="columns-container">
          <div className="column">
            <p>Request Type: Bhajana Mindaralu</p>
            <div className="row">
              <label htmlFor="phases">
                Phases:<span className="requiredfield">*</span>
              </label>
            </div>
            <div className="row">
              <select
                id="phases"
                required
                name="phases"
                value={formData.phases}
                onChange={handleInputChange}
              >
                <option value="">0 options selected</option>
                <option value="Phase 1">Phase 1</option>
                <option value="Phase 2">Phase 2</option>
                <option value="Phase 3">Phase 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="district">
                Name of the district<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <select
                id="district"
                required
                name="district"
                value={formData.district}
                onChange={handleInputChange}
              >
                <option value="">0 options selected</option>
                <option value="district1">District 1</option>
                <option value="district2">District 2</option>
                <option value="district3">District 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="village">
                Name of the Village<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="village"
                required
                name="village"
                value={formData.village}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="Longitude">Longitude of the location</label>
            </div>
            <div className="row">
              <input
                type="text"
                id="Longitude"
                name="Longitude"
                value={formData.Longitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="name">
                Name of the individual/Temple etc.,
                <br />
                who made the request<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="name"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="Phone">
                Phone number<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="number"
                id="Phone"
                required
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="land">
                Details of the land made available
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <select
                id="land"
                required
                name="land"
                value={formData.land}
                onChange={handleInputChange}
              >
                <option value="">0 options selected</option>
                <option value="land1">land 1</option>
                <option value="land2">land 2</option>
                <option value="land3">land 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="boundary">
                Boundaries-East, South,West,North
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="boundary"
                name="boundary"
                value={formData.boundary}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="earlier">Any earlier for the said temple</label>
            </div>
            <div className="row">
              <input
                type="text"
                id="earlier"
                name="earlier"
                value={formData.earlier}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="detailsvillage">
                Details of villages covered if the <br />
                proposal is accepted
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="detailsvillage"
                name="detailsvillage"
                value={formData.detailsvillage}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="email">
                Email of the contact person
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="email"
                id="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="recommendation">
                Recommendation of the inspecting officer
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="recommendation"
                name="recommendation"
                value={formData.recommendation}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="column">
            <p>Request Date: {requestDate}</p>
            <div className="empty-space"></div>
            <div className="row">
              <label htmlFor="assembly">
                Name of the Assembly Constituency
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="assembly"
                name="assembly"
                value={formData.assembly}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="Colony">
                Name of the Hamlet, Colony
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="Colony"
                name="Colony"
                value={formData.Colony}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="Population">
                Population of the Village/Hamlet/Colony
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="Population"
                name="Population"
                value={formData.Population}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="Nametemple">
                Name of the Temple proposed to be constructed
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="Nametemple"
                name="Nametemple"
                value={formData.Nametemple}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label className="file-input-label" htmlFor="docfile">
                Document of request (jpg/jpeg/pdf/png)
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="file"
                id="docfile"
                name="docfile"
                onChange={handleFileInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="landvests">
                Title of the land vests with (Name of the individual/Govt/Temple
                etc.)<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="landvests"
                name="landvests"
                value={formData.landvests}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="acceptance">
                Whether acceptance given for donating the land in favor of the
                proposed New Temple
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="acceptance"
                name="acceptance"
                value={formData.acceptance}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="othertemples">
                Details of the other temples in the vicinity
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="othertemples"
                name="othertemples"
                value={formData.othertemples}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="amount">
                Amount in Rs. proposed to be contributed by the locals if any.
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="contactperson">
                Particulars of the contact person
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="contactperson"
                name="contactperson"
                value={formData.contactperson}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="issues">Other relevant issues, if any</label>
            </div>
            <div className="row">
              <input
                type="text"
                id="issues"
                name="issues"
                value={formData.issues}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="column">
            <p>State: Andhra Pradesh</p>
            <div className="empty-space"></div>
            <div className="row">
              <label htmlFor="mandal">
                Name of the Mandal<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <select
                id="mandal"
                required
                name="mandal"
                value={formData.mandal}
                onChange={handleInputChange}
              >
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
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="SCST">
                Specify if the proposed location is SC/ST/Fisherman colony
                <span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <select
                id="SCST"
                required
                name="SCST"
                value={formData.SCST}
                onChange={handleInputChange}
              >
                <option value="">0 options selected</option>
                <option value="Colonyyes">Yes</option>
                <option value="Colonyno">No</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="emailadd">
                Email Address<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="email"
                id="emailadd"
                required
                name="emailadd"
                value={formData.emailadd}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="purpose">
                Extent of land available for the
                <br />
                purpose<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="purpose"
                required
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="surveyn">
                Survey No.<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="number"
                id="surveyn"
                required
                name="surveyn"
                value={formData.surveyn}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="support">
                Details of the financial support <br />
                received from the TTD
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="support"
                name="support"
                value={formData.support}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="nearbyvill">
                Details of the temples available in <br />
                the nearby villages with <br />
                appropriate distance.
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="nearbyvill"
                name="nearbyvill"
                value={formData.nearbyvill}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="contri">
                Contribution proposed by the locals if any- [not amount]
              </label>
            </div>
            <div className="row">
              <input
                type="text"
                id="contri"
                name="contri"
                value={formData.contri}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="phonenoofc">
                Phone number of contact<span className="required-field">*</span>
              </label>
            </div>
            <div className="row">
              <input
                type="number"
                id="phonenoofc"
                required
                name="phonenoofc"
                value={formData.phonenoofc}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <label htmlFor="comments">Additional Comments</label>
            </div>
            <div className="row">
              <input
                type="text"
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="form-buttons-container">
          <button className="form-submit-button" type="submit">
            Submit
          </button>
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Bhajanmindralu;
