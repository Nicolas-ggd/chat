import { useSelector } from "react-redux";
import { useState } from "react";

import { RoomModal } from "../ChatRoomModal/RoomModal";

import GroupAddIcon from "@mui/icons-material/GroupAdd";

export const ChatBox = () => {
  const userName = useSelector((state) => state.user.name);
  const [toggleRoom, setToggleRoom] = useState(false);

  const toggleRoomModal = () => {
    setToggleRoom((prevData) => !prevData);
  };

  return (
    <>
      <div className="container mx-auto shadow-lg rounded-lg">
        <div className="flex flex-row justify-between bg-white">
          <div
            className="w-full px-5 flex flex-col justify-between flex"
            style={{ height: "100vh" }}
          >
            <div className="flex flex-col mt-5 h-full">
              <div className="h-full flex justify-center items-center mb-4">
                <div className="p-4 bg-gray-200 rounded-md text-center">
                  <div className="py-2">
                    <h1 className="font-sans text-2xl font-bold pb-2">
                      Welcome to {userName}'s group
                    </h1>
                    <p className="font-sans text-md text-gray-400">
                      This is a new group. Here are some steps to help you get
                      started.
                    </p>
                  </div>
                  <div className="py-2">
                    <div onClick={toggleRoomModal} className="p-4 bg-gray-400 rounded-md text-center flex justify-center cursor-pointer hover:bg-gray-300 transition duration-200">
                      <GroupAddIcon />
                      <p className="px-2">Invite your friends</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-5">
              <input
                className="w-full bg-gray-100 py-4 px-3 rounded-xl"
                type="text"
                placeholder="Message..."
              />
            </div>
          </div>
          <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div>
        </div>
      </div>

      {toggleRoom && <RoomModal toggleRoom={toggleRoomModal} />}
    </>
  );
};
