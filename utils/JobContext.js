"use client";
import React, { createContext, useState, useContext } from "react";

// Create JobContext
const JobContext = createContext();

// JobProvider component
export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async (skills, location) => {
    setLoading(true);
    setError(null);
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${skills}%20in%20${location}&page=1&num_pages=1&date_posted=all`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9490d3e935msh3097086bf9dab75p17240fjsna572f49f2b5e",
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        // "9963c66e0amsh77638ed37419596p1e65f7jsn64b3028ceb69"  
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (data && data.status === "OK" && Array.isArray(data.data)) {
        setJobs(data.data);
      } else {
        setError("API Response does not contain expected data.");
      }
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Set the selected job when a user clicks on it
  const selectJob = (job) => {
    setSelectedJob(job);
  };

  return (
    <JobContext.Provider
      value={{ jobs, fetchJobs, loading, error, selectedJob, selectJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

// Custom hook for easier use
export const useJobContext = () => useContext(JobContext);
