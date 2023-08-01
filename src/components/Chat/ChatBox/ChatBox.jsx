import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { socket } from "../../../api/socket";
import EmojiPicker from "emoji-picker-react";

import { RoomModal } from "../ChatRoomModal/RoomModal";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { ChatCornerBar } from "../ChatCornerBar/ChatCornerBar";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export const ChatBox = () => {
  const [toggleRoom, setToggleRoom] = useState(false);
  const [isValue, setIsValue] = useState("");
  const [isMessage, setIsMessage] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const [isError, setIsError] = useState("");
  const userName = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user.userId);
  const isPublic = useSelector((state) => state.chat.isPublic);
  const recipient = useSelector((state) => state.chat.recipient);
  const { id } = useParams();
  const scrollRef = useRef(null);
  const emojiPickerRef = useRef();
  const toggleRoomModal = () => {
    setToggleRoom((prevData) => !prevData);
  };

  const toggleEmoji = () => {
    setIsEmoji((prevData) => !prevData);
  };

  const selectEmoji = (emoji) => {
    setIsValue((prevValue) => prevValue + emoji.emoji);
  };

  const inputTyping = (e) => {
    setIsValue(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!id || id && isValue?.length == 0) {
      setIsError("You need to select chat to start conversation");

      return setTimeout(() => {
        setIsError("");
        setIsValue("");
      }, 2000);
    }

    let data;
    if (isPublic) {
      data = {
        participants: [userId],
        isPublic: isPublic,
        createdBy: userId,
        room: id,
        messages: {
          sender: {
            _id: userId,
            name: userName,
          },
          content: isValue,
          seen: false,
          timestamp: Date.now(),
        },
      };
    } else {
      data = {
        participants: [userId, recipient],
        isPublic: isPublic,
        createdBy: userId,
        room: id,
        messages: {
          sender: {
            _id: userId,
            name: userName,
          },
          recipient: recipient,
          content: isValue,
          seen: false,
          timestamp: Date.now(),
        },
      };
    }

    try {
      await axios
        .post("https://chat-app-node-8ndm.onrender.com/chat/create-conversation", data)
        .then((res) => {
          const data = res.data;
          socket.emit("new-messages", data);
          socket.emit("new-conversation", id);
        });
    } catch (err) {
      console.log(err);
      throw err;
    }

    setIsValue("");
  };

  useEffect(() => {
    const convMessages = async () => {
      try {
        await axios
          .get(
            `https://chat-app-node-8ndm.onrender.com/chat/get-conversation-messages?roomId=${id}`
          )
          .then((res) => {
            const data = res.data;
            setIsMessage([data]);
          });
      } catch (err) {
        console.log(err);
      }
    };

    convMessages();
  }, [id]);

  useEffect(() => {
    socket.on("new-messages-received", (data) => {
      setIsMessage((prevData) => {
        if (prevData.length === 0) {
          return [data];
        } else {
          return [...prevData, data];
        }
      });
    });

    return () => {
      socket.off("new-messages-received");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [sendMessage]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

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

  const handleOutsideClick = (e) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setIsEmoji(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="container mx-auto shadow-lg rounded-lg">
        <ChatHeader />
        <div className="flex flex-row justify-between bg-white dark:bg-gray-900 transition duration-300">
          <div
            className="w-full px-5 flex flex-col justify-between flex"
            style={{ height: "90vh" }}
          >
            <div
              className="h-full"
              style={{ overflow: "scroll" }}
              ref={scrollRef}
            >
              <div className="h-full flex justify-center items-center mb-4">
                <div className="p-4 bg-gray-200 dark:bg-gray-400 rounded-md text-center transition duration-300">
                  <div className="py-2">
                    <h1 className="font-sans text-2xl font-bold pb-2">
                      Welcome to {userName}'s group
                    </h1>
                    <p className="font-sans text-md text-gray-400 dark:text-gray-800">
                      This is a new group. Here are some steps to help you get
                      started.
                    </p>
                  </div>
                  <div className="py-2">
                    <div
                      onClick={toggleRoomModal}
                      className="dark:bg-gray-600 dark:text-gray-300 hover:dark:bg-gray-500 p-4 bg-gray-400 rounded-md text-center flex justify-center cursor-pointer hover:bg-gray-300 transition duration-300"
                    >
                      <GroupAddIcon />
                      <p className="px-2">Invite your friends</p>
                    </div>
                  </div>
                </div>
              </div>
              {id && (
                <div className="flex flex-col mt-5 h-full">
                  {isMessage &&
                    isMessage.map((item, index) => {
                      return item?.messages?.map((msg, subIndex) => {
                        const msgTime = formatDate(msg?.timestamp);
                        return (
                          <div
                            className="flex justify-start mb-4"
                            key={`${index}-${subIndex}`}
                          >
                            <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center px-1">
                              <SmartToyIcon />
                            </div>
                            <div className="mr-2 px-4 bg-gray-400 mx-3 text-white flex-col">
                              <div className="flex items-center">
                                <p className="text-md py-1 text-sm">
                                  {msg?.sender?.name}
                                </p>
                                <span className="text-sm px-2">{msgTime}</span>
                              </div>
                              <p className="text-sm pb-1">{msg?.content}</p>
                            </div>
                          </div>
                        );
                      });
                    })}
                </div>
              )}

              {!id && isError && (
                <h1 className="text-red-800 w-full bg-red-200 p-2 text-center rounded-xl transition duration-200">
                  {isError}
                </h1>
              )}
            </div>
            <div ref={emojiPickerRef} className="py-5">
              <div className="w-full flex justify-end">
                <div className="absolute bottom-20 pb-3 flex justify-end transition duration-300">
                  {isEmoji && <EmojiPicker onEmojiClick={selectEmoji} />}
                </div>
              </div>
              <form className="w-full" onSubmit={sendMessage}>
                <div className="flex items-center w-full relative">
                  <input
                    className="w-full bg-gray-100 py-4 px-3 rounded-xl dark:bg-gray-800 dark:text-white transition duration-300"
                    type="text"
                    placeholder="Message..."
                    onChange={inputTyping}
                    value={isValue}
                  />
                  <div
                    onClick={toggleEmoji}
                    className="absolute right-3 transition duration-200"
                  >
                    <EmojiEmotionsIcon className="dark:text-white text-gray-600 cursor-pointer" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <ChatCornerBar />
        </div>
      </div>

      {toggleRoom && <RoomModal toggleRoom={toggleRoomModal} />}
    </>
  );
};
