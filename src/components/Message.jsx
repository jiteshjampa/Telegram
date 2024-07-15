import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { DataContext } from "../DataContext";
import "../scrollbar.css"; // Import custom scrollbar styles
import { IoCaretBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { LuListEnd } from "react-icons/lu";
const Message = () => {
  const { id, heading, theme } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [visibleDate, setVisibleDate] = useState("");
  const messageContainerRef = useRef(null);

  const navigate = useNavigate();
  function formatTo12HourTime(datetimeString) {
    const date = new Date(datetimeString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${hours}:${minutesStr}${ampm}`;
    return formattedTime;
  }

  function formatDate(datetimeString) {
    const date = new Date(datetimeString);
    const options = { month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
        );
        setData(r.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleScroll = () => {
    const container = messageContainerRef.current;
    const messages = container.querySelectorAll(".message");
    for (let message of messages) {
      const rect = message.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        const date = message.getAttribute("data-date");
        setVisibleDate(date);
        break;
      }
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [data]);

  return (
    <div
      className={`${
        theme
          ? "md:bg-hero-pattern bg-no-repeat bg-center bg-cover"
          : "md:bg-dark-bg bg-no-repeat bg-center bg-cover"
      }`}
    >
      <div className="relative w-full h-screen ">
        <div
          className={`p-3 fixed flex justify-start items-center font-bold ${
            theme ? "bg-black text-white" : "bg-white"
          } w-full `}
        >
          <div className=" lg:hidden">
            <button onClick={() => navigate("/")}>
              <IoCaretBackCircle
                className={`w-8 h-8 mr-4 ${theme ? " " : ""}`}
              />
            </button>
          </div>
          {heading ? heading : "New Group"}
        </div>
        <div
          ref={messageContainerRef}
          className="w-full h-full overflow-y-scroll custom-scrollbar pt-16"
          style={{ scrollBehavior: "smooth" }}
        >
          {id && visibleDate ? (
            <div className="ml-10 fixed w-full pt-20 md:pt-0">
              <span className=" font-semibold bg-gray-600/25 pt-2 pb-2 pl-4 pr-4 text-sm rounded-full text-white ">
                {visibleDate}
              </span>
            </div>
          ) : (
            ""
          )}
          {!id ? (
            <div className="flex justify-center items-center h-full font-semibold text-white">
              Select a chat to start Messaging
            </div>
          ) : (
            data.map((d, index) => {
              const formattedTime = formatTo12HourTime(d.updated_at);
              const formattedDate = formatDate(d.updated_at);
              return (
                <div
                  key={index}
                  className="message m-5"
                  data-date={formattedDate}
                >
                  <div
                    className={`   md:w-full lg:w-2/3 p-4 rounded-lg shadow-md ${
                      theme ? "bg-black text-white" : "bg-white"
                    }`}
                  >
                    <div className="font-bold text-blue-700 mb-2">
                      {d.sender.name}
                    </div>
                    <div className="text-sm">{d.message}</div>
                    <div className="flex justify-end items-end">
                      {formattedTime}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
