"use client";
import InfoTable from "@/components/Details/InfoTable";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "@/services/jobs";
import { getJobApplications } from "@/services/applications";
import InfoTableApplications from "@/components/Details/InfoTableApplications";

const page = ({ params }) => {
  const { id } = params;

  const { data } = useQuery({
    queryFn: () => getJobApplications(id),
    queryKey: ["relation"],
  });

  return (
    <div className="relative flex flex-col items-center justify-center gap-7 overflow-hidden w-full px-4 md:px-16 lg:px-28 py-16">
      <div className="w-full">
        <h1 className="font-semibold text-3xl text-center">Applications</h1>
      </div>
      <InfoTableApplications rows={data?.applications} />
    </div>
  );
};

export default page;
