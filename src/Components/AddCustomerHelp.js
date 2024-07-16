/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddUser.css";

export const AddCustomerHelp = () => {
  const [customerHelpData, setCustomerHelpsData] = useState({
    userId: "",
    problemType: "",
    description: "",
    status: "",
  });

  const [status] = useState(["Open", "In Progress", "Resolved"]);
  const [problemType] = useState(["Debit Card", "Credit Card", "ATM", "Cheque Book"]);
  const [users, setUsers] = useState([]);

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

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Customer Help Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Customer Help!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addCustomerHelp = async () => {
    console.log(customerHelpData);
    if (hasEmptyValues(customerHelpData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/createHelp", {
          userId: customerHelpData.userId,
          problemType: customerHelpData.problemType,
          description: customerHelpData.description,
          status: customerHelpData.status,
        });
        console.log(response);
        notify();
        setCustomerHelpsData({
          userId: "",
          problemType: "",
          description: "",
          status: "",
        });
      } catch (error) {
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerHelpsData({
      ...customerHelpData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Customer Help</h2>
        <div className="form-group">
          <label htmlFor="userId" class="required">
            User Names
          </label>
          <select
            id="statusOption"
            name="userId"
            value={replaceNameWithId(customerHelpData.userId)}
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
          <label htmlFor="problemType" class="required">
            Problem Type
          </label>
          <select
            id="statusOption"
            name="problemType"
            value={customerHelpData.problemType}
            onChange={handleInputChange}
          >
            <option key={null} value={null}></option>
            {problemType.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={customerHelpData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status" class="required">
            Status
          </label>
          <select
            id="statusOption"
            name="status"
            value={customerHelpData.status}
            onChange={handleInputChange}
          >
            <option key={null} value={null}></option>
            {status.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button className="submitBtn" type="submit" onClick={addCustomerHelp}>
          Create Customer Help
        </button>
      </div>
    </div>
  );
};
