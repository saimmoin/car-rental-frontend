/** @format */

import React from "react";
import { useState } from "react";
import "./AddQuestion.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdateQuestion = () => {
  const [questionData, setQuestionData] = useState({
    category: "",
  });

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Question Updated Successfully!", { type: "success" });
  const notifyError = () => toast("Error While Updating Question!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const updateQuestion = async () => {
    console.log(questionData);
    if (hasEmptyValues(questionData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8080/question/update/" + document.getElementById("s.no").value,
          questionData
        );
        console.log(response);
        notify();
        setQuestionData({
          category: "",
        });
        document.getElementById("s.no").value = "";
      } catch (error) {
        console.error("Error fetching questions:", error);
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Update Category</h2>
        <div className="form-group">
          <label htmlFor="correctAnswer" class="required">
            Set ID
          </label>
          <input type="text" id="s.no" name="s.no" />
        </div>
        <div className="form-group">
          <label htmlFor="category" class="required">
            Set Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={questionData.category}
            onChange={handleInputChange}
          />
        </div>
        <button className="submitBtn" type="submit" onClick={updateQuestion}>
          Submit Question
        </button>
      </div>
    </div>
  );
};
