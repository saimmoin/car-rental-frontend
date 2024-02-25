/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columnDefs = [
    { headerName: "S.no", field: "id", width: 80 },
    { headerName: "User Name", field: "name", width: 200 },
    { headerName: "Status", field: "status", width: 415 },
    { headerName: "CNIC", field: "cnic", width: 415 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
      {users.length > 0 ? (
        <>
          <h1>Total Users: {users.length}</h1>
          <AgGridReact columnDefs={columnDefs} rowData={users} pagination={true} paginationPageSize={10} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UserList;
