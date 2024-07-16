/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const CustomerHelp = () => {
  const [customerHelps, setCustomerHelps] = useState([]);

  const fetchCustomerHelps = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customerHelps");
      setCustomerHelps(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchCustomerHelps();
  }, []);

  const columnDefs = [
    { headerName: "S.no", field: "id", width: 77 },
    { headerName: "User ID", field: "userId", width: 77 },
    { headerName: "Problem Type", field: "problemType", width: 242 },
    { headerName: "Description", field: "description", width: 508 },
    { headerName: "Status", field: "status", width: 96 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
      {customerHelps.length > 0 ? (
        <>
          <h1>Total Customer Helps: {customerHelps.length}</h1>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={customerHelps}
            pagination={true}
            paginationPageSize={10}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CustomerHelp;
