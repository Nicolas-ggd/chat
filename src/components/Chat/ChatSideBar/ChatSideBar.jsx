import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { ChatSettings } from "../ChatSettings/ChatSettings";
import { InviteModal } from "../ChatInviteModal/InviteModal";

import AddIcon from "@mui/icons-material/Add";

export const ChatSideBar = () => {
  const [toggleInviteModal, setToggleInviteModal] = useState(false);
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const { id } = useParams();

  const toggleModal = () => {
    setToggleInviteModal((prevData) => !prevData);
  };

  return (
    <>
      <div className="flex flex-col w-1/5 overflow-y-auto dark:bg-gray-900 bg-gray-100 transition duration-300">
        <div className="py-5 my-1 px-2">
          <input
            type="text"
            placeholder="search chatting"
            className="dark:text-white py-2 px-2 border-2 border-gray-200 dark:border-gray-800 rounded-2xl w-full dark:bg-gray-800 transition duration-300"
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <div>
            <div
              onClick={toggleModal}
              className="flex flex-row py-4 px-2 justify-center items-center bg-gray-200 hover:bg-gray-300 transiton duration-300 cursor-pointer dark:bg-gray-800 hover:dark:bg-gray-700"
            >
              <div className="w-1/4">
                <button className="w-12 h-12 bg-gray-400 rounded-full">
                  <AddIcon className="text-center dark:text-white" />
                </button>
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold dark:text-white">Join a room</div>
              </div>
            </div>
            {id && (
              <Link
                to={`/chat/${selectedChat}`}
                className="dark:bg-gray-800 hover:dark:bg-gray-700 bg-gray-200 flex flex-row py-4 px-2 justify-center items-center hover:bg-gray-300 transiton duration-300 cursor-pointer"
              >
                <div className="w-1/4">
                  <button className="dark:bg-gray-600 w-12 h-12 bg-gray-400 rounded-full dark:text-white transition duration-300">
                    {selectedChat.at(0)}
                  </button>
                </div>
                <div className="w-full">
                  <div className="text-lg font-semibold dark:text-white">{selectedChat}</div>
                </div>
              </Link>
            )}
          </div>
          <ChatSettings />
        </div>
      </div>
      {toggleInviteModal && <InviteModal toggleModal={toggleModal} />}
    </>
  );
};
