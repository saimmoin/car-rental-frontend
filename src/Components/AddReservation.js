/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddReservation.css";

export const AddReservation = () => {
  const [reservationData, setReservationData] = useState({
    customerId: 0,
    carId: 0,
    branchId: 0,
    startDate: "",
    endDate: "",
    totalCost: 0,
    status: "",
    createdAt: new Date(),
  });

  const [branches, setBranches] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [dailyRentalRate, setDailyRentalRate] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [status] = useState(["Reserved", "Cancelled", "Completed"]);

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/branches/getDropDown");
      setBranches(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers/getDropDown");
      setCustomers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars/getDropDown");
      setCars(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  function replaceBranchWithId(name) {
    const foundObject = branches.find((obj) => obj.branchName === name);
    return foundObject?.id;
  }

  function calculateDaysBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInMilliseconds = end - start + 1000 * 60 * 60 * 24;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceInDays = differenceInMilliseconds / millisecondsPerDay;
    return differenceInDays;
  }

  function replaceCarWithId(name) {
    const foundObject = cars.find((obj) => obj.carName === name);
    return foundObject?.id;
  }

  function replaceCustomerWithId(name) {
    const foundObject = customers.find((obj) => obj.fullName === name);
    return foundObject?.id;
  }

  useEffect(() => {
    fetchBranches();
    fetchCustomers();
    fetchCars();
  }, []);

  const notify = () => toast("Reservation Created Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Adding Reservation!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addReservation = async () => {
    console.log(reservationData);
    if (hasEmptyValues(reservationData)) {
      notifyWarning();
      return;
    } else {
      try {
        reservationData.totalCost = totalCost;
        const response = await axios.post("http://localhost:8080/api/reservation/add", reservationData);
        console.log(response);
        notify();
        setReservationData({
          customerId: 0,
          carId: 0,
          branchId: 0,
          startDate: "",
          endDate: "",
          totalCost: 0,
          status: "",
          createdAt: "",
        });
      } catch (error) {
        notifyError();
        console.log(error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      [name]: value,
    });

    if (name === "carId") {
      const foundObject = cars.find((obj) => obj.carId === parseInt(value));
      setDailyRentalRate(foundObject.dailyRentalRate);
    }

    if (name == "endDate") {
      const cost = calculateDaysBetween(reservationData.startDate, value) * dailyRentalRate;
      setTotalCost(cost);
      document.getElementById("totalCost").value = cost;
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Create Reservation</h2>
        <div className="two-columns">
          <div className="form-group">
            <label htmlFor="customerId" class="required">
              Customer Names
            </label>
            <select
              id="statusOption"
              name="customerId"
              value={replaceCustomerWithId(reservationData.customerId)}
              onChange={handleInputChange}
            >
              <option key={null} value={null}></option>
              {customers.map((g) => (
                <option key={g.customerId} value={g.customerId}>
                  {g.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="carId" class="required">
              Car Names
            </label>
            <select
              id="statusOption"
              name="carId"
              value={replaceCarWithId(reservationData.carId)}
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
        </div>

        <div className="form-group">
          <label htmlFor="branchId" class="required">
            Branch Names
          </label>
          <select
            id="statusOption"
            name="branchId"
            value={replaceBranchWithId(reservationData.branchId)}
            onChange={handleInputChange}
          >
            <option key={null} value={null}></option>
            {branches.map((g) => (
              <option key={g.branchId} value={g.branchId}>
                {g.branchName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="startDate" class="required">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={reservationData.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate" class="required">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={reservationData.endDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalCost" class="required">
            Total Cost
          </label>
          <input type="number" id="totalCost" name="totalCost" disabled />
        </div>

        <div className="form-group">
          <label htmlFor="status" className="required">
            Status
          </label>
          <select id="statusOption" name="status" value={reservationData.status} onChange={handleInputChange}>
            <option key={null} value={null}></option>
            {status.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <button className="submitBtn" type="submit" onClick={addReservation}>
          Create Reservation
        </button>
      </div>
    </div>
  );
};
