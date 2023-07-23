import { useEffect, useState } from "react";

import { ChatSideBar } from "./ChatSidebar/ChatSideBar";
import { ChatBox } from "./ChatBox/ChatBox";
import { ChatCorner } from "./ChatCorner/ChatCorner";
import { ChatLoading } from "./ChatLoading/ChatLoading";
import { useSelector } from "react-redux";
import { socket } from "../../api/socket";

export const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const roomId = useSelector((state) => state.chat.roomId);
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    socket.emit("createRoom", {
      roomId,
      userData,
    });
  }, []);

  setTimeout(() => setIsLoading(false), 3000);

  return (
    <>
      {!isLoading && (
        <div className="flex h-screen antialiased text-gray-800 dark:bg-gray-900 transition duration-300">
          <div className="flex flex-row h-screen w-full overflow-x-hidden">
            <ChatSideBar />
            <ChatBox />
            <ChatCorner />
          </div>
        </div>
      )}
      {isLoading && (
        <ChatLoading />
      )}
    </>
  );
};
