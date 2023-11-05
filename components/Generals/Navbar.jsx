import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

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
      className={`${
        urlPath === "/signin" || urlPath === "/signup"
          ? "static"
          : "fixed top-0"
      } w-full z-[999] flex items-center justify-between min-h-[60px] drop-shadow-sm bg-white border md:px-6 px-4`}
    >
      {user.email ? (
        <>
          <div className="flex items-center gap-10">
            <div className="w-28 max-h-[60px] flex items-center justify-center overflow-hidden">
              <Image
                className="w-full h-full object-cover object-center"
                width={100}
                height={100}
                src="/assets/logo.svg"
                alt="logo"
              />
            </div>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-medium text-dullGray capitalize">
              products
            </h1>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-medium text-dullGray capitalize">
              solutions
            </h1>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-medium text-dullGray capitalize">
              resources
            </h1>
            <h1 className="text-base transition-all duration-150 hover:cursor-pointer hover:text-dullBlue font-medium text-dullGray capitalize">
              plans & pricing
            </h1>{" "}
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
            <div className="cursor-pointer flex items-center justify-center w-9 h-9 overflow-hidden rounded-md">
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
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-20 max-h-[60px] flex items-center justify-center">
            <Image
              className="w-full h-full"
              width={100}
              height={100}
              src="/assets/logo.svg"
              alt="logo"
            />
          </div>
          <div className="flex items-center">
            <div className="flex items-center gap-6">
              {urlPath === "/signin" ? (
                <h1 className="font-normal">
                  New to Zoom?{" "}
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
