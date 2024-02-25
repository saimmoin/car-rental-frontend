/** @format */

// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import AccountList from "./Components/AccountList.js";
import { Home } from "./Components/Home.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoanList from "./Components/LoanList.js";
import UserList from "./Components/UserList.js";
import { AddUser } from "./Components/AddUser.js";
import { AddAccount } from "./Components/AddAccount.js";
import { AddLoan } from "./Components/AddLoan.js";

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
        <Route path="/accounts" element={<AccountList />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/updateCategory" element={<UpdateQuestion />} /> */}
        <Route path="/loans" element={<LoanList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/addAccount" element={<AddAccount />} />
        <Route path="/addLoan" element={<AddLoan />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
