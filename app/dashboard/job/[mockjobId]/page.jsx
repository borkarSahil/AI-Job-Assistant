"use client"
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useJobContext } from '../../../../utils/JobContext';
import AddNewInterview from "../../../dashboard/_components/AddNewInterview"
import InterviewList from "../../../dashboard/_components/InterviewList";
function JobId() {
  //  Mock Interview
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("1");

  // const jobID = useParams();
  // const decodedJobID = jobID.mockjobId;
  const { mockjobId } = useParams(); // Get jobID from URL
  const decodedJobID = decodeURIComponent(mockjobId);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const skills = searchParams.get("skills"); // Get 'skills' from query parameters
  const location = searchParams.get("location"); // Get

  useEffect(() => {
    console.log("Skills:", skills);
    console.log("Location:", location);
    // You can use the skills and location here if needed
  }, []);

  const { fetchJobs, jobs } = useJobContext(); // Get jobs and fetchJobs from context

  useEffect(() => {
    fetchJobs(skills, location); // Fetch all jobs
  }, []);
  console.log("JOB ID ", decodedJobID);
  console.log("jobs in Mock", jobs);

  useEffect(() => {
    //  if (jobs.length > 0) {
    const selectedJob = jobs.find((job) => job.job_id === decodedJobID); // Find the job matching the decodedJobID
    console.log("selectedJob ", selectedJob);
    if (selectedJob) {
      setJob(selectedJob); // Set the matched job
      console.log("j", job);
      setJobTitle(selectedJob.job_title);
      setJobDescription(selectedJob.job_description);
      console.log("Data Title",jobTitle," ", jobDescription);
    } else {
      setError("Job not found.");
    }
    setLoading(false);
    //  }
  }, [decodedJobID, jobs]); // Re-run the effect whenever jobID or jobs change

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>No job details available.</p>;

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start Your AI Mockup Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview jobTitle={jobTitle} jobDescription ={jobDescription}/>
      </div>

      <InterviewList />
    </div>
  );
}

export default JobId