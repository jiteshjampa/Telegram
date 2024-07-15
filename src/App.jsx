import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Message from "./components/Message";
import { DataProvider, DataContext } from "./DataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const { theme } = useContext(DataContext);

  return (
    <DataProvider>
      <BrowserRouter>
        <div className="h-full w-full flex relative overflow-y-hidden">
          <Navbar />
          <div
            className={`flex flex-grow ${
              theme ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <div
                    className={`flex w-full ${
                      theme ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    <Chat
                      className={`flex w-full ${
                        theme ? "bg-black text-white" : "bg-white text-black"
                      }`}
                    />
                    <div
                      className={`w-full custom-scrollbar md:hidden overflow-y-scroll ${
                        !theme
                          ? "bg-dark-bg bg-no-repeat bg-center bg-cover"
                          : "bg-hero-pattern bg-no-repeat bg-center bg-cover"
                      }`}
                    >
                      <Message />
                    </div>
                  </div>
                }
              />
              <Route path="/chat" element={<Chat />} />
              <Route path="/message" element={<Message />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
