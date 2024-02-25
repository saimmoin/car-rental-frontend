/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddUser.css";

export const AddAccount = () => {
  const [accountData, setAccountData] = useState({
    userId: "",
    balance: "",
  });

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Account Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Account!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addAccount = async () => {
    console.log(accountData);
    if (hasEmptyValues(accountData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/addaccounts", null, {
          params: accountData,
        });
        console.log(response);
        notify();
        setAccountData({
          userId: "",
          balance: "",
        });
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountData({
      ...accountData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Account</h2>
        <div className="form-group">
          <label htmlFor="userId" class="required">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={accountData.userId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="balance" class="required">
            Balance
          </label>
          <input
            type="text"
            id="balance"
            name="balance"
            value={accountData.balance}
            onChange={handleInputChange}
          />
        </div>
        <button className="submitBtn" type="submit" onClick={addAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};
