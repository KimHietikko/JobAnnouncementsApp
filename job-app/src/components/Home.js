import React from "react";
import { useNavigate } from "react-router-dom";
import JobList from "./JobList";

function Home() {
  let navigate = useNavigate();

  const routeChange = (job, editjob) => {
    let path = "";
    if (editjob) {
      path = `/editjob/${job.id}`;
    } else {
      path = `/newjob`;
    }
    navigate(path, { state: { job: job, edit: editjob } });
  };
  return (
    <>
      <h1>Job announcements</h1>
      <button
        onClick={() => routeChange(null, false)}
        className="add-new-job-button"
      >
        Add new job
      </button>
      <JobList></JobList>
    </>
  );
}

export default Home;
