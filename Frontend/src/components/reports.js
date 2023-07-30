import React, { useState, useRef } from "react";
import "./reports.css";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Reports = () => {
  const initialState = {
    district: "",
    assemblyConstituency: "",
    startDate: "",
    mandal: "",
    colony: "",
    endDate: "",
    panchayat: "",
    referred: "",
    locationColony: "",
    ward: "",
    phases: "",
  };

  const [formData, setFormData] = useState(initialState);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "startDate") {
      const endDateInput = document.getElementById("enddate");
      endDateInput.min = value;
      if (value > formData.endDate) {
        setFormData((prevState) => ({
          ...prevState,
          endDate: "",
        }));
      }
    }
  };

  const handleClear = () => {
    formRef.current.reset();
    setFormData(initialState);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isFormEmpty = Object.values(formData).every((value) => value === "");
    if (isFormEmpty) {
      alert("Please fill in at least one form field");
      return;
    }
    if (formData.startDate && !formData.endDate) {
      alert("Please select an end date");
      return;
    }

    const cookie = document.cookie;
    const token = getCookieValue(cookie, "token");
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/reports", formData, config)
      .then(() => {
        alert("Submitted successfully");
        handleClear();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDownloadPDF = () => {
    const cookie = document.cookie;
    const token = getCookieValue(cookie, "token");
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("http://balaj-loadb-1qm23h3izzst6-958b928f2af44c61.elb.us-east-1.amazonaws.com:8000/reports/pdf", config)
      .then((response) => {
        const reportData = response.data;

        const logoImg = new Image();
        logoImg.src = `${process.env.PUBLIC_URL}/assets/ttd-logo.png`;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        ctx.drawImage(logoImg, 0, 0);
        const dataURL = canvas.toDataURL("image/png");

        const documentDefinition = {
          background: [
            {
              canvas: [
                {
                  type: "rect",
                  x: 0,
                  y: 0,
                  w: 595.28,
                  h: 841.89,
                  linearGradient: ["#de6262", "#ffb88c"],
                },
              ],
            },
          ],
          content: [
            {
              columns: [
                {
                  width: "50%",
                  text: "Report Data",
                  style: "header",
                  alignment: "left",
                  margin: [0, 25, 0, 0],
                },
                {
                  width: "50%",
                  image: dataURL,
                  width: 150,
                  alignment: "left",
                  margin: [160, 0, 0, 0],
                },
              ],
            },
            {
              canvas: [{ type: "line", x1: 0, y1: 10, x2: 520, y2: 10 }],
            },
            { text: "", margin: [0, 10] },
            ...Object.entries(reportData).map(([field, value], index) => ({
              text: [
                {
                  text: `${index + 1}) ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }:`,
                  bold: true,
                  fontSize: 12,
                },
                { text: ` ${value}`, fontSize: 12 },
              ],
              margin: [0, 5],
            })),
          ],
          styles: {
            header: {
              fontSize: 20,
              bold: true,
              margin: [0, 10, 0, 10],
            },
          },
        };

        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.download("reports_data.pdf");
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          alert("Please fill the form first");
        } else {
          console.error(error);
        }
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
    <div className="report-form1">
      <h1 className="heading">Reports</h1>
      <form
        className="form-container1"
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <div className="columns-container">
          <div className="column">
            <div className="row">
              <label htmlFor="district">District:</label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
              >
                <option value="">0 options selected</option>
                <option value="District 1">District 1</option>
                <option value="District 2">District 2</option>
                <option value="District 3">District 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="assemblyConstituency">
                Name of the Assembly Constituency:
              </label>
              <select
                id="assemblyConstituency"
                name="assemblyConstituency"
                value={formData.assemblyConstituency}
                onChange={handleInputChange}
              >
                <option value="">0 options selected</option>
                <option value="Constituency 1">Constituency 1</option>
                <option value="Constituency 2">Constituency 2</option>
                <option value="Constituency 3">Constituency 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                onChange={handleInputChange}
                value={formData.startDate}
              />
            </div>
          </div>
          <div className="column">
            <div className="row">
              <label htmlFor="mandal">Mandal:</label>
              <select
                id="mandal"
                name="mandal"
                onChange={handleInputChange}
                value={formData.mandal}
              >
                <option value="">0 options selected</option>
                <option value="Mandal 1">Mandal 1</option>
                <option value="Mandal 2">Mandal 2</option>
                <option value="Mandal 3">Mandal 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="colony">Colony:</label>
              <select
                id="colony"
                name="colony"
                onChange={handleInputChange}
                value={formData.colony}
              >
                <option value="">0 options selected</option>
                <option value="Colony 1">Colony 1</option>
                <option value="Colony 2">Colony 2</option>
                <option value="Colony 3">Colony 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="enddate">End Date:</label>
              <input
                type="date"
                id="enddate"
                name="endDate"
                onChange={handleInputChange}
                value={formData.endDate}
              />
            </div>
          </div>
          <div className="column">
            <div className="row">
              <label htmlFor="panchayat">Panchayat:</label>
              <select
                id="panchayat"
                name="panchayat"
                onChange={handleInputChange}
                value={formData.panchayat}
              >
                <option value="">0 options selected</option>
                <option value="Panchayat 1">Panchayat 1</option>
                <option value="Panchayat 2">Panchayat 2</option>
                <option value="Panchayat 3">Panchayat 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="referred">Referred:</label>
              <select
                id="referred"
                name="referred"
                onChange={handleInputChange}
                value={formData.referred}
              >
                <option value="">0 options selected</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="locationColony">
                Specify if the proposed location is SC/ST/Fisherman colony:
              </label>
              <select
                id="locationColony"
                name="locationColony"
                onChange={handleInputChange}
                value={formData.locationColony}
              >
                <option value="">0 options selected</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <label htmlFor="ward">Ward:</label>
              <select
                id="ward"
                name="ward"
                onChange={handleInputChange}
                value={formData.ward}
              >
                <option value="">0 options selected</option>
                <option value="Ward 1">Ward 1</option>
                <option value="Ward 2">Ward 2</option>
                <option value="Ward 3">Ward 3</option>
              </select>
            </div>
            <div className="row">
              <label htmlFor="phases">Phases:</label>
              <select
                id="phases"
                name="phases"
                onChange={handleInputChange}
                value={formData.phases}
              >
                <option value="">0 options selected</option>
                <option value="Phase 1">Phase 1</option>
                <option value="Phase 2">Phase 2</option>
                <option value="Phase 3">Phase 3</option>
              </select>
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
          <img
            src={process.env.PUBLIC_URL + "/assets/pdficon.png"}
            alt="pdf"
            onClick={handleDownloadPDF}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="box">
          <h2>Generated Report</h2>
          <img
            src={process.env.PUBLIC_URL + "/assets/pdficon.png"}
            alt="pdf"
            onClick={handleDownloadPDF}
            style={{ cursor: "pointer" }}
          />
        </div>
      </form>
    </div>
  );
};

export default Reports;
