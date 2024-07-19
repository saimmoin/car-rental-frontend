/** @format */

// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import Customers from "./Components/Customers.js";
import { Home } from "./Components/Home.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Branches from "./Components/Branches.js";
import Cars from "./Components/Cars.js";
import { AddCar } from "./Components/AddCar.js";
import Maintenance from "./Components/Maintenance.js";
import Reservation from "./Components/Reservation.js";
import { AddBranch } from "./Components/AddBranch.js";
import { AddReservation } from "./Components/AddReservation.js";
import { AddMaintenance } from "./Components/AddMaintenance.js";
import { AddCustomer } from "./Components/AddCustomer.js";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        toastStyle={{
          fontFamily: "Dancing Script",
        }}
      />
      <Routes>
        <Route path="/customers" element={<Customers />} />
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/addCar" element={<AddCar />} />
        <Route path="/addBranch" element={<AddBranch />} />
        <Route path="/addReservation" element={<AddReservation />} />
        <Route path="/addMaintenance" element={<AddMaintenance />} />
        <Route path="/addCustomer" element={<AddCustomer />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
