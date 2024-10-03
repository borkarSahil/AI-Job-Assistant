import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview.jsx";
import InterviewList from "./_components/InterviewList.jsx";
function Dashboard() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">dashboard</h2>
      <h2 className="text-gray-500">
        Create and Start Your AI Mockup Interview
      </h2>
      <div className="my-2">
        <AddNewInterview />
      </div>

      <InterviewList />
    </div>
  );
}

export default Dashboard;
