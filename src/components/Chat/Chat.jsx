import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../../api/socket";

import { ChatSideBar } from "./ChatSidebar/ChatSideBar";
import { ChatBox } from "./ChatBox/ChatBox";
import { ChatCorner } from "./ChatCorner/ChatCorner";
import ForumIcon from "@mui/icons-material/Forum";
export const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  setTimeout(() => setIsLoading(false), 3000);

  //   useEffect(() => {
  //     const user = async () => {
  //       await axios
  //         .get(`http://localhost:8000/user/get-user?query=${userId}`)
  //         .then((res) => {
  //           const data = res.data;
  //           socket.emit("userConnected", data);
  //           const roomName = [id, userId].sort().join("-");
  //           socket.emit("join-room", roomName);
  //         });
  //     };

  //     user();
  //   }, [userId]);

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
        <div role="status">
          <div className="flex flex-col items-center justify-center h-screen w-screen">
            <ForumIcon
              style={{ color: "#a507b8", fontSize: "50px" }}
              fontSize="large"
              className="animate-pulse animate-infinite animate-ease-out"
            />
            <h2 className="p-3 dark:text-white text-xl font-sans">
              Welcome to QuickChat
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
