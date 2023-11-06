import { calculateTime } from '@/utils/calculateTime'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'

const JobCard = ({ job }) => {

  const { userInfo } = useSelector(state => state.user)

  return (
    <Link href={`/job/${job?._id}`}>
      <div className='flex w-full border-b-2 gap-4 py-3'>
        <div className='max-w-[60px]'>
          <Image
            width={200}
            height={200}
            alt='logo'
            src={job?.user.companyLogo !== "" ? job?.user.companyLogo : "/assets/logo.svg"}
            className='w-full rounded-sm'
          />
        </div>
        <div className='flex flex-col'>
          <h1 className='font-medium capitalize'>{job?.title}</h1>
          <h4 className='text-sm text-neutral-700 font-normal'>{job?.user.companyName}</h4>
          <h4 className='text-neutral-600 text-sm mt-1'>{job?.location} ({job?.work_type})</h4>
          <div className='flex items-center gap-2 text-xs text-neutral-600 mt-2'>
            <h5>Posted {calculateTime(job.createdAt)}</h5>
            <h5>•</h5>
            <h4>{job?.applicants.includes(userInfo?._id) ? "Applied" : "Easy Apply"}</h4>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobCard