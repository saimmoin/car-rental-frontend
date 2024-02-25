/** @format */

// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/accounts">Account List</Link>
        </li>
        <li>
          <Link to="/loans">Loan List</Link>
        </li>
        <li>
          <Link to="/users">User List</Link>
        </li>
        <li>
          <Link to="/addUser">Add User</Link>
        </li>
        <li>
          <Link to="/addAccount">Add Account</Link>
        </li>
        <li>
          <Link to="/addLoan">Add Loan</Link>
        </li>
        {/* <li>
          <Link to="/addQuestion">Add Question</Link>
        </li>
        <li>
          <Link to="/updateCategory">Update Category</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
