"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./_components/JobCard";
import Link from "next/link";

function JobFinder() {
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${skills}%20in%20${location}&page=1&num_pages=1&date_posted=all`;
    console.log("Api : ", apiUrl);
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "9963c66e0amsh77638ed37419596p1e65f7jsn64b3028ceb69",
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (data && data.status === "OK" && Array.isArray(data.data)) {
        setJobs(data.data);
        console.log("Fetched jobs:", data.data);
      } else {
        console.log("API Response does not contain expected data:", data);
      }
    } catch (err) {
      setError("Failed to fetch jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearched(true);
    fetchJobs();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Job Finder</h1>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Enter skills (e.g., Node.js)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enter location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Search Jobs
        </button>
      </form>

      {loading && <p className="text-center text-lg">Loading jobs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {searched && !loading && !error && jobs.length === 0 && (
        <p className="text-center text-gray-600">No jobs found.</p>
      )}

      {searched && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {jobs.map((job) => (
            <Link
              key={job.job_id}
              href={{
                pathname: `/dashboard/jobdetails/${job.job_id}`,
                query: { skills, location },
              }}
              className="block"
            >
              <JobCard key={job.job_id} job={job} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobFinder;
