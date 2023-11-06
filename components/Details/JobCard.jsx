import { PiClockCounterClockwise } from "react-icons/pi";
import { GrLocation } from "react-icons/gr";
import { AiOutlinePushpin } from "react-icons/ai";

import Image from "next/image";
import { IoIosPeople } from "react-icons/io";
import { calculateTime } from "@/utils/calculateTime";

const JobCard = ({ jobDetails }) => {

  return (
    <div className="bg-white rounded-xl w-full max-sm:h-fit py-4 drop-shadow-sm">
      <div className="p-4 pt-0 flex flex-col md:flex-row items-center md:text-lg text-base md:gap-4 max-sm:mt-2">
        <Image className="md:w-16 w-12" src={`${jobDetails?.user?.companyLogo || jobDetails.companyLogo}`} width={50} height={50} alt="logo" />
        <div className="mt-2 md:mt-0 flex flex-col gap-y-1">
          <p className="font-semibold tracking-wider capitalize">
            {jobDetails?.title}
          </p>
          <p className="text-[#7C7C7C] font-semibold">
            {jobDetails?.user?.companyName || jobDetails.companyName}
          </p>
        </div>
      </div>
      <div className="flex flex-col px-4 lg:px-6 py-2 gap-4">
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="flex md:flex-row md:gap-4 flex-col gap-y-2 md:gap-y-0">
            <div className="flex flex-row items-center gap-2 text-[#7C7C7C]">
              <GrLocation className="text-[20px]" />
              <div>{jobDetails.location}</div>
            </div>
          </div>
          <div className="flex md:flex-row md:gap-4 flex-col gap-y-2 md:gap-y-0">
            <div className="flex flex-row items-center gap-2 text-[#7C7C7C] capitalize">
              <AiOutlinePushpin className="text-[20px]" />
              <div>{jobDetails.work_type}</div>
            </div>
          </div>
        </div>
        <div className="w-full border border-neutral-300" />
        <div className="w-full flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <IoIosPeople size={24} />
            <h1>
              <span>{jobDetails.applicants.length}</span> applicants
            </h1>
          </div>
          <div className="flex items-center gap-2 text-neutral-500 font-medium">
            <PiClockCounterClockwise size={24} />
            <h1>
              <span className="capitalize">posted</span> {calculateTime(jobDetails.createdAt)}
            </h1>
          </div>
        </div>
      </div>
    </div>

  );
};

export default JobCard;
