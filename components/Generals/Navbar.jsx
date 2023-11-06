import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AiFillLinkedin } from "react-icons/ai";


const Navbar = () => {
  const urlPath = usePathname();

  const { userInfo } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <div
      className={`${urlPath === "/signin" || urlPath === "/signup"
        ? "static"
        : "fixed top-0"
        } w-full z-[999] flex items-center justify-between min-h-[60px] drop-shadow-sm bg-white border lg:px-44 px-4 py-2`}
    >
      {user?.email ? (
        <>
          <div className="flex items-center gap-10">
            <div className="max-h-[60px] flex items-center justify-center overflow-hidden">
              <AiFillLinkedin size={45} className="text-blue-700" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-semibold text-dullGray capitalize">
              Schedule
            </h1>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-semibold text-dullGray capitalize">
              Join
            </h1>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-semibold text-dullGray capitalize">
              Host
            </h1>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-semibold text-dullGray capitalize">
              Web App
            </h1>
            <div className="cursor-pointer flex items-center justify-center w-7 overflow-hidden rounded-md flex-col gap-1">
              {user.avatar ? (
                <Image
                  width={100}
                  height={100}
                  alt="avatar"
                  src={user?.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  width={100}
                  height={100}
                  alt="user"
                  src="/assets/user.png"
                  className="w-full h-full object-cover"
                />
              )}
              <h1 className="text-[10px] text-neutral-700">Me</h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" flex items-center justify-center">
            <AiFillLinkedin size={45} className="text-blue-700" />
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-6">
              {urlPath === "/signin" ? (
                <h1 className="font-normal">
                  New to LinkedIn?{" "}
                  <Link href="signup" className="text-dullBlue">
                    Sign Up Free
                  </Link>
                </h1>
              ) : (
                <h1 className="font-normal">
                  Already have an Account?{" "}
                  <Link href="signin" className="text-dullBlue">
                    Sign In
                  </Link>
                </h1>
              )}
              <h1 className="capitalize text-dullBlue ">support</h1>
              <h1 className="capitalize text-dullBlue ">English</h1>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
