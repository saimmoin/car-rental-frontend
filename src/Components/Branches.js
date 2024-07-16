/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Branches = () => {
  const [branches, setBranches] = useState([]);

  const fetchBranches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/branches/getList");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const columnDefs = [
    { headerName: "Car ID", field: "carId", width: 120 },
    { headerName: "Branch Name", field: "branchName", width: 130 },
    { headerName: "Make", field: "make", width: 125 },
    { headerName: "Model", field: "model", width: 125 },
    { headerName: "Year", field: "year", width: 125 },
    { headerName: "Color", field: "color", width: 125 },
    { headerName: "License Plate", field: "licensePlate", width: 125 },
    { headerName: "Status", field: "status", width: 125 },
    { headerName: "Daily Rental Rate", field: "dailyRentalRate", width: 125 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1135px", margin: "0 auto" }}>
      {branches.length > 0 ? (
        <>
          <h1>Total Branches: {branches.length}</h1>
          <AgGridReact columnDefs={columnDefs} rowData={branches} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Branches;
