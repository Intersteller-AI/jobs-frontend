"use client";

import Input from "@/components/Inputs/Input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import ServiceAuth from "@/components/ServiceAuth";
import { registerEmployer, registerUser } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { userActions } from "@/store/reducers/user";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const page = () => {
  const [step, setStep] = useState("choose");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch()
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: ({ name, email, password }) => {
      if (step === "employer") {
        return registerEmployer({ name, email, password });
      } else {
        return registerUser({ name, email, password });
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        toast.success("Signed Up Successfully!");
        dispatch(userActions.setUserInfo(data.user));
        if (data?.user?.role === "employer") {
          router.push("/signup/onboarding");
        } else {
          router.push("/");
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;

    mutate({ name, email, password });
  };

  return (
    <div className="w-full h-screen flex md:flex-row flex-col">
      <div className="flex-[0.6] flex items-center justify-center bg-dullWhite">
        <Image
          priority
          width={600}
          height={600}
          src="https://st1.zoom.us/fe-static/fe-signup-login-active/img/banner-step-1.2faf107a.png"
          alt="side_image"
          className="w-[70%]"
        />
      </div>
      <div className="flex-1 flex flex-col items-center gap-6">
        <h1 className="font-happy capitalize md:text-4xl text-lg">
          let's get started
        </h1>
        <div className="w-full flex items-center justify-center mt-6">
          {step === "choose" ? (
            <div className="flex items-center gap-6 flex-col">
              <button
                onClick={() => setStep("user")}
                className="border-2 px-12 py-3 w-full rounded-lg border-neutral-500 hover:text-blue-600 hover:border-blue-500"
              >
                Sign Up as User
              </button>
              <button
                onClick={() => setStep("employer")}
                className="border-2 px-12 py-3 w-full rounded-lg border-neutral-500 hover:text-blue-600 hover:border-blue-500"
              >
                Sign Up as Employer
              </button>
            </div>
          ) : (
            <form
              className="w-full max-w-[360px] h-full flex flex-col items-center gap-4"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Input
                label="name"
                register={register}
                id="name"
                errors={errors}
              />
              <Input
                type="email"
                label="email address"
                register={register}
                id="email"
                errors={errors}
              />
              <Input
                type="password"
                label="password"
                register={register}
                id="password"
                errors={errors}
              />
              <div className="flex w-full items-center gap-2">
                <button
                  className="flex font-medium text-dullBlue items-center gap-1 text-sm border border-neutral-500 flex-1 py-2 rounded-xl justify-center "
                  onClick={() => setStep("choose")}
                >
                  <BiChevronRight className="text-lg rotate-180" />
                  Back
                </button>
                <button
                  className="font-amalde bg-[#0E72ED] transition-all duration-150 hover:bg-[#176bd3] flex items-center justify-center flex-1 text-white py-2 rounded-xl text-base capitalize font-medium"
                  type="submit"
                >
                  continue
                </button>
              </div>
              <h4 className="text-neutral-500 text-sm md:text-base">
                By proceeding, I agree to the{" "}
                <Link href="/" className="text-[#0E72ED] ">
                  LinkedIn's Privacy Statement
                </Link>{" "}
                and{" "}
                <Link href="/" className="text-[#0E72ED] ">
                  Terms of Service.
                </Link>
              </h4>
            </form>
          )}
        </div>
        {/* middle line */}
        {step === "user" && step === "employer" && (
          <>
            <div className="w-full max-w-[360px] flex items-center justify-center gap-2">
              <div className="flex-1 border-b border-neutral-500/40" />
              <h4 className="flex-1 whitespace-nowrap font-amalde text-neutral-400">
                Or sign up with
              </h4>
              <div className="flex-1 border-b border-neutral-500/40" />
            </div>
            <ServiceAuth />
          </>
        )}
        <h4 className="w-full max-w-[360px] text-neutral-500 text-sm md:text-base mt-2">
          LinkedIn is protected by reCAPTCHA and the{" "}
          <Link href="/" className="text-[#0E72ED] ">
            Moogle Privacy Statement
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-[#0E72ED] ">
            Terms of Service.
          </Link>{" "}
        </h4>
      </div>
    </div>
  );
};

// https://st1.zoom.us/fe-static/fe-signup-login-active/img/banner-step-1.2faf107a.png

export default page;
