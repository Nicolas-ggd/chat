import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../../api/socket";

import { ChatSideBar } from "./ChatSidebar/ChatSideBar";
import { ChatBox } from "./ChatBox/ChatBox";
import { ChatCorner } from "./ChatCorner/ChatCorner";

export const Chat = () => {
  const userId = localStorage.getItem("userId");
  const { id } = useParams();

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
    <div
      className="flex h-screen antialiased text-gray-800 dark:bg-gray-900 transition duration-300"
    >
      <div className="flex flex-row h-screen w-full overflow-x-hidden">
        <ChatSideBar />
        <ChatBox />
        <ChatCorner />
      </div>
    </div>
  );
};
