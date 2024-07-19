/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddBranch.css";

export const AddBranch = () => {
  const [branchData, setBranchData] = useState({
    branchName: "",
    location: "",
    phoneNumber: "",
    email: "",
  });

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Branch Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Branch!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addBranch = async () => {
    console.log(branchData);
    if (hasEmptyValues(branchData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/branches/add", branchData);
        console.log(response);
        notify();
        setBranchData({
          branchName: "",
          location: "",
          phoneNumber: "",
          email: "",
        });
      } catch (error) {
        notifyError();
        console.log(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranchData({
      ...branchData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Branch</h2>
        <div className="form-group">
          <label htmlFor="branchName" class="required">
            Branch Name
          </label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={branchData.branchName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location" class="required">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={branchData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber" class="required">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={branchData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" class="required">
            Email
          </label>
          <input type="text" id="email" name="email" value={branchData.email} onChange={handleInputChange} />
        </div>

        <button className="submitBtn" type="submit" onClick={addBranch}>
          Create Branch
        </button>
      </div>
    </div>
  );
};
