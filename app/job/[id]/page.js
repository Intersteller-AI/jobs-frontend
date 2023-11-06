"use client";
import { useEffect, useState } from "react";
import AboutCompany from "@/components/Details/AboutCompany";
import JobCard from "@/components/Details/JobCard";
import Skills from "@/components/Details/Skills";
import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/services/jobs";
import parse from "html-react-parser";
import ApplyModal from "@/components/Modals/ApplyModal";
import { useSelector } from "react-redux";

function JobDetails({ params }) {
  const { id } = params;

  const { userInfo } = useSelector((state) => state.user);
  const [modalOpen, setmodalOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    companyLogo: "",
    companyName: "",
    designation: "",
    location: "",
    type: "",
    skills: [],
    posted: "Just Now",
    applicants: 0,
  });

  const { data } = useQuery({
    queryFn: () => getJob(id),
    queryKey: ["jobs/12"],
  });

  useEffect(() => {
    if (data) {
      setJobDetails(data.job);
    }
  }, [data]);

  const handleSave = () => {};

  return (
    <div className="bg-[#F4F7FC] flex justify-center h-full px-4 lg:px-44 py-4 w-full items-center">
      <div className="flex flex-row gap-x-4 max-sm:items-center max-sm:justify-center w-full">
        <div className="flex flex-col gap-6 flex-1">
          <JobCard jobDetails={jobDetails} />
          <div className="w-full flex items-center gap-4">
            <button
              disabled={
                data?.job?.applicants?.includes(userInfo?._id) ? true : false
              }
              onClick={() => setmodalOpen(true)}
              className="px-8 py-2 disabled:bg-slate-500 bg-[#2e55b0] rounded-full text-white  font-semibold"
            >
              {data?.job?.applicants?.includes(userInfo?._id)
                ? "Applied"
                : "Apply"}
            </button>
            {!data?.job?.applicants?.includes(userInfo?._id) && (
              <button
                onClick={handleSave}
                className="px-6 py-2 border-2 border-[#2553bd] rounded-full text-[#3556a4] font-semibold"
              >
                Save
              </button>
            )}
          </div>
          <div className="px-6 py-5 bg-white drop-shadow-sm rounded-xl">
            <h1 className="text-2xl font-semibold mb-8">About the job</h1>
            {parse(`${jobDetails.description}`)}
          </div>
          <Skills jobDetails={jobDetails} />
          <AboutCompany jobDetails={jobDetails} />
        </div>
      </div>
      <ApplyModal
        setApplyModal={setmodalOpen}
        applyModal={modalOpen}
        jobId={id}
      />
    </div>
  );
}

export default JobDetails;
