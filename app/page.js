"use client";

import Sidebar from "@/components/Generals/Sidebar";
import JobCard from "@/components/JobCard";
import { getAllJobs } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [createJobModal, setCreateJobModal] = useState(false);
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => getAllJobs(),
    queryKey: ["jobs"],
  });

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userInfo) {
      router.push("/signin");
    }
  }, []);

  return (
    <div className="h-screen w-full flex gap-6 lg:px-44 px-4 py-8 bg-[#F4F2EE] relative">
      <Sidebar
        createJobModal={createJobModal}
        setCreateJobModal={setCreateJobModal}
      />
      <div className="flex-1 md:pl-[260px]">
        <div className="px-4 bg-white rounded-lg py-6 drop-shadow">
          <h1 className="font-semibold text-xl">Recommended for you</h1>
          <h4 className="font-normal text-neutral-600">
            Based on your profile and search history
          </h4>
          <div className="w-full flex flex-col mt-4">
            {data?.jobs?.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
