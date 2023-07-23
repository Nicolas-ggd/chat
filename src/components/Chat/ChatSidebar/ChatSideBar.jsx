import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

export const ChatSideBar = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const userLogOut = async () => {
    await axios
      .post("http://localhost:8000/logout", {
        userId: userId,
      })
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId");
        localStorage.removeItem("roomMode");
        navigate("/");
      });
  };

  const inviteFriends = () => {
    console.log("Invite friends")
  }

  return (
    <div
      className="flex flex-col border-r-2 overflow-y-auto"
      style={{ width: "300px" }}
    >
      <div className="w-full flex justify-start">
        <h1 className="px-3 py-2 font-sans text-2xl font-bold">Chats</h1>
      </div>
      <div className="border-b-2 py-4 px-2 relative flex items-center">
        <SearchIcon className="absolute h-full ml-2 mხ-2 text-gray-600" />
        <input
          type="text"
          placeholder="search chatting"
          className="py-2 px-8 border-2 border-gray-200 rounded-3xl w-full"
        />
      </div>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div onClick={inviteFriends} className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-200 cursor-pointer transition duration-400">
            <div className="w-1/4">
              <button className="bg-gray-300 p-2 rounded-3xl">
                <AddIcon />
              </button>
            </div>
            <div className="w-full px-3">
              <span className="text-gray-500">Invite friends</span>
            </div>
          </div>
          <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-200 cursor-pointer transition duration-400">
            <div className="w-1/4">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            <div className="w-full px-3">
              <div className="text-lg font-semibold">Luis1994</div>
              <span className="text-gray-500">Pick me at 9:00 Am</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer transition duration-400">
          <div className="w-full px-3">
            <div
              className="w-full bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-xl flex justify-center"
              onClick={userLogOut}
            >
              <span>Log Out</span>
              <LogoutIcon className="mx-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
