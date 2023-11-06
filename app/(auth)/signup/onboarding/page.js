"use client";
import { useEffect } from "react";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import OnboardingBasic from "@/components/Generals/OnboardingBasic";
import { useSelector } from "react-redux";
import axios from "axios";
import { HOST } from "@/services/server";
import toast from "react-hot-toast";
const page = () => {
  const { userInfo } = useSelector((state) => state.user);
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [details, setDetails] = useState({
    phone: "",
    location: "",
    gender: "",
    category: "",
    about: "",
    companyName: "",
    companyLogo: "",
    documents: [],
  });

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  const handleSubmit = async () => {
    try {
      const combinedData = { ...details };
      console.log(combinedData);
      const { data } = await axios.post(
        `${HOST}/api/users/profile/update`,
        combinedData,
        {
          withCredentials: true,
        }
      );
      if (data.user) {
        toast.success("Onboarding completed");
        router.push("/");
      }
      console.log(data.message);
    } catch (error) {
      console.error("Error in onboarding:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-2 md:gap-4 px-4 md:px-16 lg:px-28 py-16">
      <h1 className="text-2xl font-semibold text-center ">
        Welcome Aboard to <span className="text-blue-600">LinkedIn</span>
      </h1>
      <h4 className="font-medium text-center">Let's Begin!</h4>
      <div className="rounded-xl drop-shadow md:bg-white p-4 md:p-8 mt-2 md:mt-6 w-full">
        <OnboardingBasic
          user={user}
          details={details}
          setDetails={setDetails}
        />
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 text-lg bg-[#36518F] rounded-full text-white mt-6 font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
