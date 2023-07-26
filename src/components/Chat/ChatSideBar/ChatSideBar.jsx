import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { LogOut } from "../../Auth/LogOut/LogOut";
import { InviteModal } from "../ChatInviteModal/InviteModal";

import AddIcon from "@mui/icons-material/Add";

export const ChatSideBar = () => {
  const [toggleInviteModal, setToggleInviteModal] = useState(false);
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  const toggleModal = () => {
    setToggleInviteModal((prevData) => !prevData);
  };

  return (
    <>
      <div className="flex flex-col w-1/5 border-r-2 overflow-y-auto">
        <div className="border-b-2 py-4 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <div>
            <div
              onClick={toggleModal}
              className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-200 transiton duration-200 cursor-pointer"
            >
              <div className="w-1/4">
                <button className="w-12 h-12 bg-gray-300 rounded-full">
                  <AddIcon className="text-center" />
                </button>
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Join a room</div>
              </div>
            </div>
            <Link
              to={`/chat/${selectedChat}`}
              className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-200 transiton duration-200 cursor-pointer"
            >
              <div className="w-1/4">
                <button className="w-12 h-12 bg-gray-300 rounded-full">
                  {selectedChat.at(0)}
                </button>
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">{selectedChat}</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </Link>
          </div>
          <LogOut />
        </div>
      </div>
      {toggleInviteModal && <InviteModal toggleModal={toggleModal} />}
    </>
  );
};
