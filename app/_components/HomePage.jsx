"use client";

import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <img
            src="https://www.gempool.ie/images/uploads/frustrated_at_work.jpg"
            alt="Frustrated at work"
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">
            Frustrated with the traditional job search process?
          </h3>
          <h4 className="text-xl md:text-2xl mb-4">
            Want to find a job that matches your location and skills?
          </h4>

          <div className="mb-6">
            <h5 className="text-lg md:text-xl font-bold">
              Find your dream job in just a few clicks
            </h5>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="relative inline-flex items-center px-6 py-3 text-white bg-blue-500 rounded-full overflow-hidden transition-transform transform hover:scale-105 active:scale-95">
                <span className="relative text-lg font-semibold">
                  Go to Dashboard
                </span>
                <span className="absolute inset-0 bg-blue-400 transition-transform transform -translate-x-full hover:translate-x-0" />
              </button>
            </Link>

            <Link href="/dashboard/jobfinder">
              <button className="relative inline-flex items-center px-6 py-3 text-white bg-green-500 rounded-full overflow-hidden transition-transform transform hover:scale-105 active:scale-95">
                <span className="relative text-lg font-semibold">
                  Find Jobs
                </span>
                <span className="absolute inset-0 bg-green-400 transition-transform transform -translate-x-full hover:translate-x-0" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
