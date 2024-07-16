/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddUser.css";

export const AddLoan = () => {
  const [loanData, setLoanData] = useState({
    userId: "",
    sanctionAmount: "",
    accountNumber: "",
    pin: "",
  });

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Loan Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Loan!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  function notifyFunc(response) {
    if (response.data === "Loan created successfully!") {
      notify();
    } else if (response.data === "Loan amount exceeds balance!") {
      notifyError();
    }
  }

  const addLoan = async () => {
    console.log(loanData);
    if (hasEmptyValues(loanData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/addloan", null, {
          params: loanData,
        });
        console.log(response.data);
        notifyFunc(response);
        setLoanData({
          userId: "",
          sanctionAmount: "",
          accountNumber: "",
          pin: "",
        });
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Loan</h2>
        <div className="form-group">
          <label htmlFor="userId" class="required">
            User ID
          </label>
          <input type="text" id="userId" name="userId" value={loanData.userId} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="sanctionAmount" class="required">
            Sanction Amount
          </label>
          <input
            type="text"
            id="sanctionAmount"
            name="sanctionAmount"
            value={loanData.sanctionAmount}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber" class="required">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={loanData.accountNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin" class="required">
            Pin
          </label>
          <input type="text" id="pin" name="pin" value={loanData.pin} onChange={handleInputChange} />
        </div>
        <button className="submitBtn" type="submit" onClick={addLoan}>
          Create Loan
        </button>
      </div>
    </div>
  );
};
