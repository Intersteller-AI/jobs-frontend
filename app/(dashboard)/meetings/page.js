"use client";

import Upcoming from "@/components/Meetings/Upcoming";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [currentSection, setCurrentSection] = useState("upcoming");

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center w-full p-8 h-full">
        <h1 className="w-full text-2xl font-semibold">Meetings</h1>
        <div className="mt-6 w-full border-b-2 border-neutral-400 z-10 relative">
          <div className="flex items-center gap-6 z-20 max-w-fit -mb-[1px]">
            <div
              onClick={() => setCurrentSection("upcoming")}
              className={`${
                currentSection === "upcoming"
                  ? "border-b-2 border-blue-500 text-black"
                  : "text-neutral-600"
              } px-2 z-50 transition-all duration-100 hover:cursor-pointer hover:text-black py-3 text-xl font-medium capitalize`}
            >
              upcoming
            </div>
            <div
              onClick={() => setCurrentSection("previous")}
              className={`${
                currentSection === "previous"
                  ? "border-b-2 border-blue-500 text-black"
                  : "text-neutral-600"
              } px-2 z-50 transition-all duration-100 hover:cursor-pointer hover:text-black py-3 text-xl font-medium capitalize`}
            >
              previous
            </div>
            <div
              onClick={() => setCurrentSection("personal")}
              className={`${
                currentSection === "personal"
                  ? "border-b-2 border-blue-500 text-black"
                  : "text-neutral-600"
              } px-2 z-50 transition-all duration-100 hover:cursor-pointer hover:text-black py-3 text-xl font-medium capitalize`}
            >
              Personal Room
            </div>
            <div
              onClick={() => setCurrentSection("meeting")}
              className={`${
                currentSection === "meeting"
                  ? "border-b-2 border-blue-500 text-black"
                  : "text-neutral-600"
              } px-2 z-50 transition-all duration-100 hover:cursor-pointer hover:text-black py-3 text-xl font-medium capitalize`}
            >
              Meeting Templates
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <Upcoming />
        </div>
      </div>
    </div>
  );
};

export default page;
