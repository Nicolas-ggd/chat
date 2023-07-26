import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { socket } from "../../../api/socket";

import SmartToyIcon from "@mui/icons-material/SmartToy";

export const ChatCornerBar = () => {
  const [isMembers, setIsMembers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    socket.emit("group-members", id);

    socket.on("group-member-list", (data) => {
      setIsMembers(data);
    });

    return () => {
      socket.off("group-member-list");
    };
  }, [id]);

  useEffect(() => {
    socket.on("userDisconnected", (data) => {
        console.log(data, 'userDisconnected')
    });

    return () => {
        socket.off("userDisconnected")
    }
  }, [])

  return (
    <div className="w-2/5 border-l-2 px-5">
      <div className="flex flex-col">
        <h1 className="px-2 py-1 text-start">Group members</h1>
        {isMembers &&
          isMembers?.map((item, index) => {
            return (
              <div className="flex items-center py-2" key={index}>
                <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center px-1">
                  <SmartToyIcon />
                </div>
                <div className="px-2 text-gray-500">{item?.name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
