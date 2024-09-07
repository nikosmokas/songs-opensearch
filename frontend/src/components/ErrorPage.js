// src/components/ErrorPage.js
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  return (
    <div className="container mt-5">
      <h1>Error</h1>
      <p>{message || "An unexpected error occurred."}</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
