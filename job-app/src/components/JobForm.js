import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

function JobForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location?.state?.edit) {
      fetch(
        "https://mockend.com/KimHietikko/reacttask/jobs/" +
          location?.state?.job?.id,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          navigate("../");

          if (!res.ok) {
            NotificationManager.error(
              "An error occured while editing the job",
              "Error"
            );
          } else {
            NotificationManager.success("A job edited successfully", "Success");
          }
        })
        .catch((error) => {
          NotificationManager.error(
            "An error occured while editing the job",
            "Error"
          );
        });
    } else {
      fetch("https://mockend.com/KimHietikko/reacttask/jobs/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          navigate("../");

          if (!res.ok) {
            NotificationManager.error(
              "An error occured while adding a new job",
              "Error"
            );
          } else {
            NotificationManager.success(
              "A new job added successfully",
              "Success"
            );
          }
        })
        .catch((error) => {
          NotificationManager.error(
            "An error occured while adding a new job",
            "Error"
          );
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="job-form">
        {location?.state?.edit ? (
          <>
            <h1 className="margin-top">Edit the job</h1>
            <h3 className="margin-top">Job title</h3>
            <input
              placeholder="Update a job title"
              value={location?.state?.job?.title}
              onChange={handleChange}
              name="text"
              className="job-input edit"
            />
            <h3 className="margin-top">Description</h3>
            <textarea
              placeholder="Update a job description"
              value={location?.state?.job?.body}
              onChange={handleChange}
              name="text"
              className="job-input edit"
            ></textarea>
            <h3 className="margin-top">Location</h3>
            <input
              placeholder="Update a job location"
              value={location?.state?.job?.location}
              onChange={handleChange}
              name="text"
              className="job-input edit"
            />
            <h3 className="margin-top">Salary</h3>
            <input
              placeholder="Update a job salary"
              value={location?.state?.job?.salary}
              onChange={handleChange}
              name="text"
              className="job-input edit"
            />
            <button onClick={handleSubmit} className="job-button edit">
              Update the job
            </button>
          </>
        ) : (
          <>
            <h1 className="margin-top">Create a new job</h1>
            <h3 className="margin-top">Job title</h3>
            <input
              placeholder="Add a new job title"
              name="text"
              className="job-input"
            />
            <h3 className="margin-top">Description</h3>
            <textarea
              placeholder="Add a new job description"
              name="text"
              rows="4"
              cols="50"
              className="job-input"
            ></textarea>
            <h3 className="margin-top">Location</h3>
            <input
              placeholder="Add a new job location"
              name="text"
              className="job-input"
            />
            <h3 className="margin-top">Salary</h3>
            <input
              placeholder="Add a new job salary"
              name="text"
              className="job-input"
            />
            <button onClick={handleSubmit} className="job-button">
              Add a new job
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default JobForm;
