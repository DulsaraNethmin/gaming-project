import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

import logo from "@/public/images/home/logo.png";
import samplePic from "@/public/images/sample-pic.png";
import "./admin.css";

interface StatusBarProps {
  isMobileNavToggled: boolean | undefined;
  setIsMobileNavToggled: Dispatch<SetStateAction<boolean | undefined>>;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isMobileNavToggled,
  setIsMobileNavToggled,
}) => {
  return (
    <section className="bg-black font-secondaryFont font-medium text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] border-b border-b-[#0D6D49]">
      <div className="container mx-auto px-[36px] py-[1.2em] md:py-[0.4em] flex items-center justify-between">
        <div>
          {/* Logo */}
          <div className="hidden md:flex md:items-center">
            <Image src={logo} alt="Logo" className="size-[4.6em]" />
            <h2 className="font-primaryFont font-semibold text-[1.6em] uppercase">
              Logo
            </h2>
          </div>

          {/* Mobile navbar toggle  */}
          <button
            className={`${
              isMobileNavToggled ? "animate-toggle-button" : ""
            } relative h-4 w-6 transition-opacity duration-300 md:hidden`}
            onClick={() =>
              isMobileNavToggled === undefined
                ? setIsMobileNavToggled(true)
                : setIsMobileNavToggled((prev) => !prev)
            }
          >
            <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
          </button>
        </div>

        {/* Status area */}
        <div className="flex items-center gap-x-[1em]">
          <div className="flex items-center gap-x-[0.4em]">
            <CiSearch className="size-[1.5em] md:size-[1.8em]" />
            <IoMdNotificationsOutline className="size-[1.5em] md:size-[1.8em]" />
          </div>
          <div className="flex items-center gap-x-[0.8em]">
            <div>
              <p>Avishka Rathnayake</p>
              <p className="hidden md:block text-[0.8em] text-[#A1A1AA]">
                Owner
              </p>
            </div>
            <Image
              src={samplePic}
              alt="Avatar"
              className="size-[2em] rounded-full md:size-[2.5em]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusBar;