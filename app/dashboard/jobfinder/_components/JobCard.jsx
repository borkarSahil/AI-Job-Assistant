import React from "react";

function JobCard({ job, onClick }) {
  // Function to truncate description to 100 characters
  const truncateDescription = (description, maxLength = 100) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-5 mb-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={job.employer_logo ? job.employer_logo : "https://cdn.dribbble.com/users/2112713/screenshots/4268636/media/668603ccc9f1b83344dc765d55f6feb7.jpg?compress=1&resize=400x300"} 
          alt={job.employer_name}
          className="w-16 h-16 object-contain rounded-md"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {job.job_title}
          </h2>
          <p className="text-gray-600">{job.employer_name}</p>
          <p className="text-sm text-gray-500">
            {job.job_city}, {job.job_country}
          </p>
          <p className="text-gray-600">{job.job_employment_type}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-700 text-sm">
          {truncateDescription(job.job_description)}
        </p>
      </div>
      <div className="mt-4">
        <p className="text-xs text-gray-500">
          Posted on: {new Date(job.job_posted_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default JobCard;
