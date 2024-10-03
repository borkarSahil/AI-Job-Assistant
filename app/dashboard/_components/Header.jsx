"use client"
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  });
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      Logo
      <ul className="hidden md:flex gap-6">
        <Link href={"/dashboard/jobfinder"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/jobfinder" && "text-primary font-bold"
            }`}
          >
            Job Finder
          </li>
        </Link>
        <Link href={"/dashboard"}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path == "/dashboard" && "text-primary font-bold"
            }`}
          >
            Dashboard
          </li>
        </Link>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          About Us
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
