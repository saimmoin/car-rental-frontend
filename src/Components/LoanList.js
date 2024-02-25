/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const LoanList = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/loans");
      setLoans(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const columnDefs = [
    { headerName: "S.no", field: "id", width: 80 },
    { headerName: "User ID", field: "userId", width: 200 },
    { headerName: "Sanction Amount", field: "sanctionAmount", width: 830 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
      {loans.length > 0 ? (
        <>
          <h1>Total Loans: {loans.length}</h1>
          <AgGridReact columnDefs={columnDefs} rowData={loans} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default LoanList;
