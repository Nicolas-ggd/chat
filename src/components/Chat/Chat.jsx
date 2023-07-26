import { useEffect, useState } from "react";

import { ChatSideBar } from "./ChatSideBar/ChatSideBar";
import { ChatBox } from "./ChatBox/ChatBox";
import { ChatLoading } from "./ChatLoading/ChatLoading";
import { useSelector } from "react-redux";
import { socket } from "../../api/socket";

export const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const roomId = useSelector((state) => state.chat.roomId);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    socket.emit("joinRoom", {
      roomId,
      userData,
    });
  }, [roomId]);

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
