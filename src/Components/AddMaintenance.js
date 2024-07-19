/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddMaintenance.css";

export const AddMaintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState({
    carId: 0,
    maintenanceDate: "",
    description: "",
    cost: 0,
    status: "",
  });

  const [cars, setCars] = useState([]);
  const [status] = useState(["Pending", "Completed"]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Maintenance Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Maintenance!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars/getDropDown");
      setCars(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  function replaceCarWithId(name) {
    const foundObject = cars.find((obj) => obj.carName === name);
    return foundObject?.id;
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const addMaintenance = async () => {
    console.log(maintenanceData);
    if (hasEmptyValues(maintenanceData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/maintenance/add", maintenanceData);
        console.log(response);
        notify();
        setMaintenanceData({
          carId: 0,
          maintenanceDate: "",
          description: "",
          cost: 0,
          status: "",
        });
      } catch (error) {
        notifyError();
        console.log(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceData({
      ...maintenanceData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Create Maintenance</h2>
        <div className="form-group">
          <label htmlFor="carId" class="required">
            Car Names
          </label>
          <select
            id="statusOption"
            name="carId"
            value={replaceCarWithId(maintenanceData.carId)}
            onChange={handleInputChange}
          >
            <option key={null} value={null}></option>
            {cars.map((g) => (
              <option key={g.carId} value={g.carId}>
                {g.carName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maintenanceDate" class="required">
            Maintenance Date
          </label>
          <input
            type="date"
            id="maintenanceDate"
            name="maintenanceDate"
            value={maintenanceData.maintenanceDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" class="required">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={maintenanceData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost" class="required">
            Cost
          </label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={maintenanceData.cost}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status" className="required">
            Status
          </label>
          <select id="statusOption" name="status" value={maintenanceData.status} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="submitBtn" type="submit" onClick={addMaintenance}>
          Create Maintenance
        </button>
      </div>
    </div>
  );
};
