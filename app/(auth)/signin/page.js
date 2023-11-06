"use client";

import Input from "@/components/Inputs/Input";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ServiceAuth from "@/components/ServiceAuth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { userActions } from "@/store/reducers/user";
import { HOST } from "@/services/server";
import axios from "axios";
import { loginUser } from "@/services/user";
import toast from "react-hot-toast";

const getUser = async () => {
  try {
    const { data } = await axios.get(`${HOST}/api/users/profile`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return error;
  }
};

const page = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { data, isFetching } = useQuery({
    queryFn: () => getUser(),
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (data?.user && !isFetching) {
      dispatch(userActions.setUserInfo(data?.user));
    }
  }, [data]);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo]);

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

  const { mutate } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginUser({ email, password });
    },
    onSuccess: (data) => {
      if (data?.user) {
        toast.success("Signed In Successfully!");
        dispatch(userActions.setUserInfo(data.user));
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const submitHandler = (data) => {
    const { email, password } = data;

    mutate({ email, password });
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
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <h1 className="font-happy capitalize md:text-4xl text-lg">sign in</h1>
        <div className="w-full flex items-center justify-center mt-6">
          <form
            className="w-full max-w-[360px] h-full flex flex-col items-center gap-4"
            onSubmit={handleSubmit(submitHandler)}
          >
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
            <div className="w-full flex items-center justify-between">
              <Link className="text-[#0E72ED]" href="/">
                Forgot password?
              </Link>
              <Link className="text-[#0E72ED]" href="/">
                Help
              </Link>
            </div>
            <button
              className="font-amalde bg-[#0E72ED] transition-all duration-150 hover:bg-[#176bd3] flex items-center justify-center w-full text-white py-2 rounded-xl text-base capitalize font-medium"
              type="submit"
            >
              sign in
            </button>

            <h4 className="text-neutral-500 text-sm md:text-base">
              By signing in, I agree to the{" "}
              <Link href="/" className="text-[#0E72ED] ">
                Mooz's Privacy Statement
              </Link>{" "}
              and{" "}
              <Link href="/" className="text-[#0E72ED] ">
                Terms of Service.
              </Link>
            </h4>
          </form>
        </div>
        {/* middle line */}
        <div className="w-full max-w-[360px] flex items-center justify-center gap-2">
          <div className="flex-1 border-b border-neutral-500/40" />
          <h4 className="flex-1 whitespace-nowrap font-amalde text-neutral-400">
            Or sign in with
          </h4>
          <div className="flex-1 border-b border-neutral-500/40" />
        </div>
        <ServiceAuth />
        <h4 className="w-full max-w-[360px] text-neutral-500 text-sm md:text-base mt-2">
          Mooz is protected by reCAPTCHA and the{" "}
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
