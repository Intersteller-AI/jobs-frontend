import { ADMIN, PERSONAL } from "@/public/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BiChevronRight } from "react-icons/bi";

const Sidebar = () => {
  const urlPath = usePathname();

  const [activeTab, setActiveTab] = useState(urlPath);

  return (
    <div
      className={`hidden lg:block min-w-[320px] bg-dullWhite drop-shadow-md min-h-[70vh] h-[92vh] scroll-smooth overflow-y-auto custom-scrollbar`}
    >
      <div className="w-full mt-6 py-2">
        <h1 className="mx-6 font-normal">Personal</h1>
        <div className="flex flex-col mt-4">
          {PERSONAL.map((val, index) => (
            <Link
              key={index}
              href={val.path}
              onClick={() => setActiveTab(val.path)}
            >
              <div
                className={`py-2 px-12 font-normal hover:bg-[#864ff4] hover:text-white ${
                  val.path === activeTab
                    ? "bg-dullBlue text-white"
                    : "bg-inherit text-black"
                }`}
              >
                <h1 className="text-base">{val.label}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full mt-6 py-2">
        <h1 className="mx-6 font-normal">Admin</h1>
        <div className="flex flex-col mt-4">
          {ADMIN.map((val, index) => (
            <div key={index} className="py-2 px-10 cursor-pointer">
              <h1 className="flex items-center gap-1 text-base capitalize font-normal">
                <BiChevronRight className="text-neutral-400" size={18} />{" "}
                {val.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
