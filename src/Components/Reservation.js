/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./index.css";
import { Loading } from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/reservation/getList");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const columnDefs = [
    { headerName: "Reservation ID", field: "reservationId", width: 100 },
    { headerName: "Start Date", field: "startDate", width: 200 },
    { headerName: "End Date", field: "endDate", width: 200 },
    { headerName: "Total Cost", field: "totalCost", width: 110 },
    { headerName: "Status", field: "status", width: 120 },
    { headerName: "Created At", field: "createdAt", width: 200 },
    { headerName: "Branch Name", field: "branchName", width: 150 },
    { headerName: "Make", field: "make", width: 120 },
    { headerName: "Model", field: "model", width: 120 },
    { headerName: "Year", field: "year", width: 120 },
    { headerName: "CNIC", field: "cnic", width: 180 },
    { headerName: "Full Name", field: "fullName", width: 150 },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1135px", margin: "0 auto" }}>
      {reservations.length > 0 ? (
        <>
          <h1>Total Reservations: {reservations.length}</h1>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={reservations}
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

export default Reservation;
