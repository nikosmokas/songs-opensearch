import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import ResultsPage from "./components/ResultsPage";
import ErrorPage from "./components/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/error" element={<ErrorPage />} />{" "}
        {/* Route for error page */}
        <Route path="*" element={<ErrorPage message="Page not found." />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
