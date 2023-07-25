import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { socket } from "../../../api/socket";

import { ChatHeader } from "../ChatHeader/ChatHeader";
import { RoomModal } from "../ChatRoomModal/RoomModal";

import SendIcon from "@mui/icons-material/Send";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export const ChatBox = () => {
  const [isTyping, setIsTyping] = useState("");
  const [toggleRoom, setToggleRoom] = useState(false);
  const [isMessage, setIsMessage] = useState([]);
  const messageRef = useRef(null);
  const userData = useSelector((state) => state.user);
  const isPublic = useSelector((state) => state.chat.isPublic);

  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const roomId = useSelector((state) => state.chat.roomId);

  useEffect(() => {
    scrollToBottom();
  }, [roomId]);

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const handleTyping = (e) => {
    setIsTyping(e.target.value);
  };

  const toggleRoomModal = () => {
    setToggleRoom((prevData) => !prevData);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    socket.emit("publicMessage", {
      participants: [userData?.userId],
      messages: {
        sender: userData?.userId,
        content: isTyping,
        room: roomId,
      },
      isPublic: {
        isPublic: true,
      },
    });
    scrollToBottom();
    setIsTyping("");
  };

  useEffect(() => {
    const publicConversation = async () => {
      await axios
        .get(
          `http://localhost:8000/chat/get-public-conversation?roomId=${roomId}`
        )
        .then((res) => {
          const data = res.data;
          console.log(data);
          setIsMessage(data);
        });
    };

    publicConversation();
  }, [roomId]);

  useEffect(() => {
    socket.on("publicMessageReceived", (data) => {
      console.log(data, "kai dzma da");
      setIsMessage((prevData) => [...prevData, data]);
    });

    return () => {
      socket.off("publicMessageReceived");
    };
  }, [roomId]);


  const formatDate = (time) => {
    const date = new Date(time);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${month}/${day}/${year}`;
  
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    const result = `${formattedDate} ${formattedTime}`;
  
    return result;
  };

  return (
    <>
      <div className="container mx-auto shadow-lg rounded-lg">
        <div
          className="flex flex-row justify-between bg-white"
          style={{ height: "90vh" }}
        >
          <div className="w-full px-5 flex h-full flex-col justify-between">
            <ChatHeader />
            <div className="flex flex-col h-full">
              <div
                className="w-full h-full"
                style={{ overflowY: "auto" }}
                ref={messageRef}
              >
                <div
                  className="w-full flex mt-5 h-full py-5"
                  style={{ height: "30vh" }}
                >
                  <div className="w-full flex justify-center items-center">
                    <div className="flex flex-col text-center">
                      <h1 className="text-dark dark:text-white text-3xl py-2 text-center">
                        Welcome to {userData?.name}
                      </h1>
                      <div
                        onClick={toggleRoomModal}
                        className="p-4 bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-md cursor-pointer"
                      >
                        <GroupAddIcon className="mx-2" />
                        <span className="font-sans text-sx px-2">
                          Invite your friends
                        </span>
                        <ChevronRightIcon className="ml-10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col mt-5 h-full py-5">
                  {isMessage &&
                    isMessage?.map((item, index) => {
                      return item?.messages?.map((msg, subIndex) => {
                        const timestamp = msg?.timestamp
                        const msgTime = formatDate(timestamp);

                        return (
                          <div
                            key={`${index}-${subIndex}`}
                            className="flex justify-start mb-4"
                          >
                            <div className="object-cover h-10 w-10 rounded-full bg-green-300 flex justify-center items-center">
                              <SmartToyIcon />
                            </div>
                            <div className="mr-2 px-4 bg-gray-400  mx-3 text-white flex-col">
                              <div className="flex items-center">
                                <p className="text-md py-1 text-sm">
                                  {msg?.sender?.name}
                                </p>
                                <span className="text-sm px-2">
                                  {msgTime}
                                </span>
                              </div>
                              <p className="text-sm pb-1">{msg?.content}</p>
                            </div>
                          </div>
                        );
                      });
                    })}
                </div>
              </div>
              <div className="pt-10 w-full">
                <form
                  className="w-full relative flex items-center"
                  onSubmit={sendMessage}
                >
                  <input
                    className="w-full bg-gray-100 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                    onChange={handleTyping}
                    value={isTyping}
                  />
                  <button
                    className="absolute right-3 cursor-pointer"
                    onClick={sendMessage}
                  >
                    <SendIcon />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toggleRoom && <RoomModal toggleRoom={toggleRoomModal} />}
    </>
  );
};
