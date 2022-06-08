import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function JobList() {
  useEffect(() => {
    fetchJobs();
  }, []);

  const [jobs, setJobs] = useState([]);

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

  const fetchJobs = () => {
    fetch("https://mockend.com/KimHietikko/reacttask/jobs")
      .then((response) => response.json())
      .then((jobs) => {
        setJobs(jobs);
      });
  };

  const removeJob = (id) => {
    const removedArr = [...jobs].filter((job) => job.id !== id);

    setJobs(removedArr);

    fetch("https://mockend.com/KimHietikko/reacttask/jobs/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Success: ", res);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return jobs.map((job, index) => (
    <div className="job-row" key={index}>
      <div key={job.id}>{job.title}</div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeJob(job.id)}
          className="delete-icon"
        />

        <TiEdit onClick={() => routeChange(job, true)} className="edit-icon" />
      </div>
    </div>
  ));
}

export default JobList;
