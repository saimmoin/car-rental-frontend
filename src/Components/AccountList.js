/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const columnDefs = [
    { headerName: "S.no", field: "id", width: 80 },
    { headerName: "User ID", field: "userId", width: 200 },
    { headerName: "Balance", field: "balance", width: 450 },
    { headerName: "Account Number", field: "accountNumber", width: 300 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
      {accounts.length > 0 ? (
        <>
          <h1>Total Accounts: {accounts.length}</h1>
          <AgGridReact columnDefs={columnDefs} rowData={accounts} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AccountList;
