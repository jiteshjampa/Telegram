import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import "../scrollbar.css"; // Import custom scrollbar styles
import loader from "../assets/loader.jpeg";
import telegram from "../assets/10464249-removebg-preview.png";

const Chat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { open, setOpen, page, setId, setPage, setHeading, theme } =
    useContext(DataContext);
  const [color, setColor] = useState([]);
  const chatContainerRef = useRef(null);
  const fixedDivRef = useRef(null);

  const navigate = useNavigate();

  const generateRandomHexColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor === "#FFFFFF" ? "#800080" : randomColor;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (page > 0 && page < 12) {
          const r = await axios.get(
            `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
          );
          setData((prevdata) => [...prevdata, ...r.data.data.data]);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const e = [];
    for (let i = 0; i < data.length; i++) {
      e[i] = generateRandomHexColor();
    }
    setColor(e);
  }, [data]);

  const handleNav = () => {
    setOpen(!open);
  };

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (
      chatContainer.scrollTop + chatContainer.clientHeight >=
      chatContainer.scrollHeight - 1
    ) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const setFixedDivWidth = () => {
      if (chatContainerRef.current && fixedDivRef.current) {
        fixedDivRef.current.style.width = `${chatContainerRef.current.clientWidth}px`;
      }
    };

    setFixedDivWidth(); // Set width initially

    window.addEventListener("resize", setFixedDivWidth);
    return () => window.removeEventListener("resize", setFixedDivWidth);
  }, []);

  const getInitials = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length >= 2) {
      const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
      const lastNameInitial = nameParts[nameParts.length - 1]
        .charAt(0)
        .toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`;
    } else if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    } else {
      return "";
    }
  };

  function formatToDateString(datetimeString) {
    const date = new Date(datetimeString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();

    const dayStr = day < 10 ? "0" + day : day;
    const monthStr = month < 10 ? "0" + month : month;

    return `${dayStr}/${monthStr}/${year}`;
  }

  const handleId = (id, name) => {
    setId(id);
    setHeading(name);
    if (window.innerWidth < 768) {
      navigate("/message");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = searchTerm
    ? data.filter((d) =>
        d.creator.name
          ? d.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    : data;

  return (
    <div
      ref={chatContainerRef}
      className={` z-0 md:w-full w-1/2 h-screen overflow-y-scroll  custom-scrollbar ${
        theme ? "bg-black text-white" : "bg-white"
      }`}
    >
      <div
        ref={fixedDivRef}
        className={`w-full  fixed shadow-white shadow-sm top-0 left-0  ${
          theme ? "bg-black" : "bg-white"
        }  flex justify-between items-center mb-6`}
      >
        <button
          className={`flex mb-4 items-start justify-center ${
            theme ? "bg-black text-white" : ""
          }`}
          onClick={handleNav}
        >
          <img
            src={menu}
            alt=""
            className=" w-8 h-8 flex items-start mt-3 ml-2"
          />
        </button>
        <div className={`w-full h-full flex items-start m-4  `}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="rounded-l-full rounded-r-full p-2 placeholder:text-gray-500 w-full placeholder:text-sm bg-gray-400/50 placeholder:pl-3"
            placeholder="Search"
          />
          <div
            className={` flex items-center justify-end ${
              theme ? "bg-black" : "bg-white"
            }`}
          >
            {/*<button className={`${theme ? "bg-black" : "bg-white"}`}>
              <img
                src={telegram}
                alt="telegram button"
                className={`fixed w-14 h-14 flex items-center ${
                  theme ? "bg-black" : "bg-white"
                }`}
              />
            </button>*/}
          </div>
        </div>
      </div>
      {filteredData.map((d, index) => {
        const processedName = d.creator.name
          ? getInitials(d.creator.name)
          : "New";

        const date = formatToDateString(d.creator.created_at);

        return (
          <button
            key={index}
            className="w-full"
            onClick={() => handleId(d.id, d.creator.name)}
          >
            <div
              className={`mb-2 p-2 flex justify-between  ${
                theme ? "hover:bg-gray-200/45" : "hover:bg-gray-200"
              }`}
            >
              <div
                className={`rounded-full text-sm w-12 h-12 ${
                  theme ? "bg-black text-white" : "bg-white"
                } font-bold flex justify-center items-center text-center p-4`}
                style={{ backgroundColor: color[index] }}
              >
                {processedName}
              </div>
              <div className={`ml-4 flex items-center text-sm font-bold`}>
                {d.creator.name ? d.creator.name : "New Group"}
              </div>
              <div className="flex flex-col justify-evenly">
                <div
                  className={`flex justify-center items-start text-sm mb-3 ${
                    theme ? " text-white" : ""
                  }`}
                >
                  {date}
                </div>
                <div className="flex justify-end items-end">
                  <div
                    className={`flex justify-center items-center w-6 h-6 rounded-full bg-blue-500  text-sm`}
                  >
                    {d.msg_count}
                  </div>
                </div>
              </div>
            </div>
          </button>
        );
      })}
      {loading && (
        <div className="flex justify-center items-center animate-spin w-full mt-24">
          <img src={loader} alt="Loading..." className="w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default Chat;
