"use client";

import { AiFillSetting, AiFillYoutube } from "react-icons/ai";
import { BsClipboard2Check, BsFillBookmarkFill } from "react-icons/bs";
import {
  HiOutlineDocument,
  HiOutlineMenuAlt1,
  HiPencilAlt,
} from "react-icons/hi";
import { HiDocumentCheck, HiOutlinePencilSquare } from "react-icons/hi2";
import { PiBagSimpleBold } from "react-icons/pi";
import CreateJobModal from "../Modals/CreateJobModal";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Sidebar = ({ createJobModal, setCreateJobModal }) => {

  const { userInfo } = useSelector(state => state.user)

  const [role, setRole] = useState(null)

  useEffect(() => {
    if (userInfo) {
      setRole(userInfo?.role)
    }
  }, [userInfo])

  return (
    <>
      <div className="hidden md:flex flex-col gap-4 fixed">
        <div className="flex flex-col gap-6 py-7 px-5 rounded-lg bg-white drop-shadow text-neutral-700">
          <div className="font-semibold flex items-center gap-4 cursor-pointer text-base ">
            <BsFillBookmarkFill size={20} /> My jobs
          </div>
          <div className="font-semibold flex items-center gap-3 cursor-pointer text-base ">
            <HiOutlineMenuAlt1 size={24} /> Prefences
          </div>
          <div className="font-semibold flex items-center gap-3 cursor-pointer text-base ">
            <BsClipboard2Check size={24} /> Skill Assessments
          </div>
          <div className="font-semibold flex items-center gap-3 cursor-pointer text-base ">
            <HiDocumentCheck size={24} /> Interview prep
          </div>
          <div className="font-semibold flex items-center gap-3 cursor-pointer text-base ">
            <HiOutlineDocument size={24} /> Resume Builder
          </div>
          <div className="font-semibold flex items-center gap-3 cursor-pointer text-base ">
            <AiFillYoutube size={24} /> Job seeker guidance
          </div>
          <div className="font-semibold flex items-center gap-3 cursor-pointer text-base ">
            <AiFillSetting size={24} /> Application settings
          </div>
        </div>
        {role === "employer" && (
          <div className="flex flex-col gap-6 py-5 px-5 rounded-lg bg-white drop-shadow">
            <div className="font-semibold flex items-center gap-4 cursor-pointer text-sm text-blue-600" onClick={() => setCreateJobModal(true)}>
              <HiPencilAlt size={20} />
              <h1 className="underline">Post a free job</h1>
            </div>
            <Link href={`/applications`}>
              <div className="font-semibold flex items-center gap-4 cursor-pointer text-sm text-neutral-700">
                <PiBagSimpleBold size={20} /> Manage Applications
              </div>
            </Link>
          </div>
        )}
      </div>
      <CreateJobModal createJobModal={createJobModal} setCreateJobModal={setCreateJobModal} />
    </>
  )
}

export default Sidebar