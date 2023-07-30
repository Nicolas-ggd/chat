import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { socket } from "../../../api/socket";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import StarIcon from "@mui/icons-material/Star";

export const ChatCornerBar = () => {
  const [isMembers, setIsMembers] = useState([]);
  const userId = useSelector((state) => state.user.userId);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      socket.on("group-member-list", (data) => {
        setIsMembers(data);
      });

      return () => {
        socket.off("group-member-list");
      };
    }
  }, [id]);

  useEffect(() => {
    socket.on("userDisconnected", (data) => {
      console.log(data, "userDisconnected");
    });

    return () => {
      socket.off("userDisconnected");
    };
  }, []);

  useEffect(() => {
    if (id) {
      const convMembers = async () => {
        try {
          await axios
            .get(
              `http://localhost:8000/chat/get-conversation-members?roomId=${id}`
            )
            .then((res) => {
              const data = res.data;
              setIsMembers([data]);
            });
        } catch (err) {
          console.log(err);
        }
      };
      convMembers();
    }
  }, [id]);

  return (
    <div className="w-2/5 px-5 dark:bg-gray-800 bg-gray-100 transition duration-300">
      <div className="flex flex-col">
        <h1 className="px-2 py-1 text-start dark:text-white">Group members</h1>
        {isMembers &&
          isMembers[0]?.participants?.map((item, index) => {
            const convCreator = isMembers[0]?.createdBy === item?._id;
            return (
              <div className="flex items-center py-2" key={index}>
                <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center px-1">
                  <SmartToyIcon />
                </div>
                <div className="px-2 text-gray-500 dark:text-white transition duration-300">
                  {item?.name}
                </div>
                <div className="ml-auto">
                  <StarIcon
                    className={
                      convCreator ? "text-yellow-500" : "text-gray-400"
                    }
                  />
                </div>
              </div>
            );
          })}
        {isMembers?.length === 0 && (
          <h1 className="dark:text-white">No members</h1>
        )}
      </div>
    </div>
  );
};
