/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers/getList");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const columnDefs = [
    { headerName: "Customer ID", field: "customerId", width: 105 },
    { headerName: "CNIC", field: "cnic", width: 150 },
    { headerName: "Full Name", field: "fullName", width: 150 },
    { headerName: "Email", field: "email", width: 200 },
    { headerName: "Phone Number", field: "phoneNumber", width: 150 },
    { headerName: "Address", field: "address", width: 150 },
    { headerName: "Created At", field: "createdAt", width: 300 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
      {customers.length > 0 ? (
        <>
          <h1>Total Customers: {customers.length}</h1>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={customers}
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

export default Customers;
