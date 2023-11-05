"use client";
import Topic from "@/components/Schedule/Topic";
import Link from "next/link";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import TimeSetup from "@/components/Schedule/TimeSetup";
import { generatePassword } from "@/utils/helpers";
import Security from "@/components/Schedule/Security";
import Actions from "@/components/Schedule/Actions";

const page = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    topic: "My Meeting",
    date: Date.now(),
    time: Date.now(),
    durationHours: 1,
    durationMinutes: 0,
    timeZone: {
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
      label: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [],
    passcode: generatePassword(),
    isWaiting: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails({ ...meetingDetails, [name]: value });
  };

  

  return (
    <div className="flex-1">
      <div className="flex flex-col items-center w-full p-8 relative h-screen">
        <div className="w-full">
          <Link href="/meetings">
            <h1 className="flex font-medium text-dullBlue items-center gap-1 text-sm">
              <BiChevronRight className="text-lg rotate-180" />
              Back to Meetings
            </h1>
          </Link>
        </div>
        <h1 className="w-full text-xl font-semibold mt-4">Schedule Meeting</h1>
        <Topic handleChange={handleChange} details={meetingDetails} />
        <TimeSetup
          meetingDetails={meetingDetails}
          setMeetingDetails={setMeetingDetails}
          handleChange={handleChange}
        />
        <Security
          meetingDetails={meetingDetails}
          setMeetingDetails={setMeetingDetails}
          handleChange={handleChange}
        />
        <Actions />
      </div>
    </div>
  );
};

export default page;
