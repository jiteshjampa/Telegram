import React, { useState, useContext, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { CiBullhorn } from "react-icons/ci";
import { RiContactsLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { DataContext } from "../DataContext";
import { IoMoonOutline } from "react-icons/io5";
import { FiSun } from "react-icons/fi";

const Navbar = () => {
  const { open, setOpen, setTheme, theme } = useContext(DataContext);

  const handleNav = (e) => {
    if (
      e.target.classList.contains("sidebar") ||
      e.target.closest(".sidebar")
    ) {
      return; // Do nothing if the click is inside the sidebar
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  const handleTheme = () => {
    setTheme(!theme);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 flex bg-black/30"
          onClick={handleNav}
        >
          <div
            className={` ${
              open ? "animate-slideIn" : "animate-slideOut"
            } relative z-50 ${
              theme ? "bg-black text-white" : "bg-white"
            } h-full  w-64 sidebar sm:w-30`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`rounded-full p-3 max-w-12 max-h-12 bg-blue-800 text-white font-mono ml-3 mb-8 font-bold flex justify-center m-4`}
            >
              JJ
            </div>
            <div
              className={`font-bold font-poppins ${
                theme ? "text-white" : ""
              } text-xl m-4`}
            >
              Jitesh Reddy Jampa
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              <GoPeople className="w-5 h-5 m-3" />
              <h2>New Group</h2>
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              <CiBullhorn className="w-5 h-5 m-3" />
              <h2>New Channel</h2>
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              <RiContactsLine className="w-5 h-5 m-3" />
              <h2>Contacts</h2>
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              <IoCallOutline className="w-5 h-5 m-3" />
              <h2>Calls</h2>
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              <FaRegMessage className="w-5 h-5 m-3" />
              <h2>Saved Message</h2>
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              <IoSettingsOutline className="w-5 h-5 m-3" />
              <h2>Settings</h2>
            </div>
            <div
              className={`m-4 font-semibold font-poppins ${
                theme ? "text-white" : ""
              } flex items-center`}
            >
              {theme ? (
                <FiSun className=" w-5 h-5 m-3" />
              ) : (
                <IoMoonOutline className=" w-5 h-5 m-3" />
              )}
              <button onClick={handleTheme}>
                {theme ? "LightMode" : "NightMode"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
