import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ChatSideBar } from "./ChatSideBar/ChatSideBar";
import { ChatBox } from "./ChatBox/ChatBox";
import { ChatLoading } from "./ChatLoading/ChatLoading";
import { useSelector } from "react-redux";
import { socket } from "../../api/socket";

export const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.user);
  const { id } = useParams();

  useEffect(() => {
    if(id && userData) {
      socket.emit("joinRoom", {
        roomId: id,
        userData: userData,
      });
    }
  }, [id, userData]);

  setTimeout(() => setIsLoading(false), 3000);

  return (
    <>
      {!isLoading && (
        <div className="flex h-screen antialiased text-gray-800 dark:bg-gray-900 transition duration-300">
          <div className="flex flex-row h-screen w-full overflow-x-hidden">
            <ChatSideBar />
            <ChatBox />
          </div>
        </div>
      )}
      {isLoading && (
        <ChatLoading />
      )}
    </>
  );
};
