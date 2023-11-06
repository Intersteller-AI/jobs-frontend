import React from "react";
import { BsGlobe } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

function AboutCompany({ jobDetails }) {
  return (
    <div className="flex flex-col gap-y-6 max-sm:items-center w-full drop-shadow-sm">
      <div className="bg-white p-4 rounded-2xl flex flex-col gap-y-4">
        <div className="text-[#4F4F4F] font-semibold text-center md:text-left">About Company</div>
        <div>
          {jobDetails?.user?.about}
        </div>
        <div className="border-b border-[#B8B8B8] my-2 md:my-4" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-x-2">
            <BsGlobe className="text-lg" />
            <Link href="https://xyz.com" className="text-[#4F4F4F] italic">
              https://xyz.com/
            </Link>
          </div>
          <div className="flex flex-row gap-x-2 mt-4 md:mt-0">
            <Link href="#">
              <Image
                width={80}
                height={50}
                src="/assets/companies/instagram.svg"
                alt="img"
                className="w-8 h-8"
              />
            </Link>
            <Link href="#">
              <Image
                width={80}
                height={50}
                src="/assets/companies/linkedin.svg"
                alt="img"
                className="w-8 h-8"
              />
            </Link>
            <Link href="#">
              <Image
                width={80}
                height={50}
                src="/assets/companies/facebook.svg"
                alt="img"
                className="w-8 h-8"
              />
            </Link>
            <Link href="#">
              <Image
                width={80}
                height={50}
                src="/assets/companies/twiter.svg"
                alt="img"
                className="w-8 h-8"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutCompany;
