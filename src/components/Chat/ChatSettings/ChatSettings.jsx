import { useSelector } from "react-redux";
import { useState } from "react";

import { LogOut } from "../../Auth/LogOut/LogOut";
import { Switcher } from "../../../utils/Switcher";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const ChatSettings = () => {
  const [toggleSettings, setToggleSettings] = useState(false);
  const userName = useSelector((state) => state.user.name);

  const toggleSettingList = () => {
    setToggleSettings((prevData) => !prevData);
  };

  return (
    <div className="w-full">
      {toggleSettings && (
        <div className="w-full flex flex-col p-3 justify-center items-center">
          <LogOut />
          <div className="w-full my-1 bg-gray-200 p-2 text-center rounded-xl hover:bg-gray-400 transition duration-300 cursor-pointer flex items-center justify-center">
            Switch
            <div className="px-2">
              <Switcher />
            </div>
          </div>
        </div>
      )}
      <div
        onClick={toggleSettingList}
        className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer transition duration-400"
      >
        <div className="w-full px-3">
          <div className="w-full bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-xl flex justify-center items-center">
            <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center px-1">
              <SmartToyIcon />
            </div>
            <p className="px-2">{userName}</p>
            <MoreHorizIcon className="ml-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
