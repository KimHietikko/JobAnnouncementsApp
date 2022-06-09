import React from "react";
import "./App.css";
import JobForm from "./components/JobForm";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

function App() {
  return (
    <div className="job-app">
      <NotificationContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editjob/:id" element={<JobForm />} />
          <Route path="/newjob" element={<JobForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
