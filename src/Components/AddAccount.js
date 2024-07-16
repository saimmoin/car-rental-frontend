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
    pin: "",
  });

  const [users, setUsers] = useState([]);
  console.log(users);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/usersForDropdown");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  function replaceNameWithId(name) {
    const foundObject = users.find((obj) => obj.username === name);
    return foundObject?.id;
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function notifyFunc(response) {
    if (response.data === "More than 3 accounts found!") {
      notifyError();
    } else if (response.data == "Account created successfully!") {
      notify();
    } else {
      notifyPin();
    }
  }

  const notify = () => toast("Account Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Account!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });
  const notifyPin = () => toast("The pin provided should be having 4 characters!", { type: "warning" });

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
        notifyFunc(response);
        setAccountData({
          userId: "",
          balance: "",
          pin: "",
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
            User Names
          </label>
          <select
            id="statusOption"
            name="userId"
            value={replaceNameWithId(accountData.userId)}
            onChange={handleInputChange}
          >
            <option key={null} value={null}></option>
            {users.map((g) => (
              <option key={g.id} value={g.id}>
                {g.username}
              </option>
            ))}
          </select>
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
        <div className="form-group">
          <label htmlFor="pin" class="required">
            Pin
          </label>
          <input type="text" id="pin" name="pin" value={accountData.pin} onChange={handleInputChange} />
        </div>
        <button className="submitBtn" type="submit" onClick={addAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
};
