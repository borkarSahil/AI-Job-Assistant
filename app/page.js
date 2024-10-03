import { UserButton } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { JobProvider } from "../utils/JobContext";
import HomePage from "./_components/HomePage.jsx";

export default function Home() {
  return (
    <div>
      <JobProvider>
        <Header />
        <HomePage />
      </JobProvider>
    </div>
  );
}
