"use client";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import InfoTable from "@/components/Details/InfoTable";
import { useQuery } from "@tanstack/react-query";
import { getAllApplications } from "@/services/applications";
import { getAllJobs } from "@/services/jobs";

const Tasks = () => {
  const { data } = useQuery({
    queryFn: () => getAllJobs(),
    queryKey: ["abc"],
  });

  return (
    <div className="relative flex flex-col items-center justify-center gap-7 overflow-hidden w-full px-4 md:px-16 lg:px-28 py-16">
      <div className="w-full">
        <h1 className="font-semibold text-3xl text-center">Applications</h1>
      </div>
      <InfoTable rows={data?.jobs} />
    </div>
  );
};

export default Tasks;
