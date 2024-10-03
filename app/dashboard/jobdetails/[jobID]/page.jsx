"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useJobContext } from "../../../../utils/JobContext";
import Link from "next/link";

function JobDescribe() {
  const { jobID } = useParams(); // Get jobID from URL
  const decodedJobID = decodeURIComponent(jobID);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const skills = searchParams.get("skills"); // Get 'skills' from query parameters
  const location = searchParams.get("location"); // Get

  // useEffect(() => {
  //   console.log("Skills:", skills);
  //   console.log("Location:", location);
  //   // You can use the skills and location here if needed
  // }, []);

  const { fetchJobs, jobs } = useJobContext(); // Get jobs and fetchJobs from context

  useEffect(() => {
    fetchJobs(skills, location); // Fetch all jobs
  }, []);
  // console.log("JOB ID ", decodedJobID);
  // console.log("jobs ", jobs);

  useEffect(() => {
    if (jobs.length > 0) {
      const selectedJob = jobs.find((job) => job.job_id === decodedJobID); // Find the job matching the decodedJobID
      // console.log("selectedJob ", selectedJob);
      if (selectedJob) {
        setJob(selectedJob); // Set the matched job
        console.log("j", job);
      } else {
        setError("Job not found.");
      }
      setLoading(false);
    }
  }, [jobID, jobs]); // Re-run the effect whenever jobID or jobs change

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>No job details available.</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-6 items-start">
      {/* Left Side: Job Details */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-4">Job Details</h1>
        <h2 className="text-xl font-bold mb-2">
          {job.job_title || "Not Available"}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Company:</strong> {job.employer_name || "Not Available"}
        </p>
        <p className="mb-2">
          <strong>Location:</strong> {job.job_city || "Not Available"},{" "}
          {job.job_state || "Not Available"}
        </p>
        <p className="mb-2">
          <strong>Employment Type:</strong>{" "}
          {job.job_employment_type || "Not Available"}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {job.job_description || "Not Available"}
        </p>
        <p className="mb-2">
          <strong>Posted At:</strong>{" "}
          {new Date(job.job_posted_at_datetime_utc).toLocaleDateString() ||
            "Not Available"}
        </p>

        <div className="mb-4">
          <strong>Apply Options:</strong>
          <ul className="list-disc ml-6">
            {job.apply_options && job.apply_options.length > 0 ? (
              job.apply_options.map((option, index) => (
                <li key={index}>
                  <a
                    href={option.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Apply via {option.publisher}
                  </a>
                </li>
              ))
            ) : (
              <li>Not Available</li>
            )}
          </ul>
        </div>

        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Apply Now
        </a>
      </div>

      {/* Right Side: Employer Logo */}
      <div className="flex-shrink-0">
        <img
          src={
            job.employer_logo
              ? job.employer_logo
              : "https://cdn.dribbble.com/users/2112713/screenshots/4268636/media/668603ccc9f1b83344dc765d55f6feb7.jpg?compress=1&resize=400x300"
          }
          alt={job.employer_name || "Employer Logo"}
          className="w-60 h-60 object-contain rounded-md"
        />
        <Link
          href={{
            pathname: `/dashboard/job/${decodedJobID}`,
            query: { skills, location },
          }}
        >
          <button className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-md hover:scale-105 transition-transform">
            Start AI Mock Interview
          </button>
        </Link>
      </div>
    </div>
  );
}

export default JobDescribe;
