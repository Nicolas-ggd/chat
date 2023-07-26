import { useState } from "react";

import { LogOut } from "../../Auth/LogOut/LogOut";
import { InviteModal } from "../ChatInviteModal/InviteModal";

import AddIcon from "@mui/icons-material/Add";

export const ChatSideBar = () => {
  const [toggleInviteModal, setToggleInviteModal] = useState(false);

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
              <button className="w-12 h-12 bg-gray-300 rounded-full">
                <AddIcon className="text-center" />
              </button>
              <div className="w-full px-4">
                <div className="text-lg font-semibold">Join a room</div>
              </div>
            </div>
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Luis1994</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>
          </div>
          <LogOut />
        </div>
      </div>
      {toggleInviteModal && <InviteModal toggleModal={toggleModal}/>}
    </>
  );
};
