import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { socket } from "../../../api/socket";

import { RoomModal } from "../ChatRoomModal/RoomModal";
import { ChatHeader } from "../ChatHeader/ChatHeader";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export const ChatBox = () => {
  const [toggleRoom, setToggleRoom] = useState(false);
  const [isValue, setIsValue] = useState("");
  const [isMessage, setIsMessage] = useState([]);
  const userName = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.user.userId);
  const { id } = useParams();
  const scrollRef = useRef(null);

  const toggleRoomModal = () => {
    setToggleRoom((prevData) => !prevData);
  };

  const inputTyping = (e) => {
    setIsValue(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/chat/create-conversation", {
        participants: [userId],
        messages: {
          sender: userId,
          content: isValue,
          room: id,
        },
        isPublic: true,
      })
      .then((res) => {
        const data = res.data;
        console.log(data, "new messages");
        socket.emit("new-message", data);
        scrollToBottom();
      });

    setIsValue("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [sendMessage]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    socket.on("new-message-received", (data) => {
      setIsMessage((prevData) => {
        // If prevData is an empty array, return the new message as the first element
        if (prevData.length === 0) {
          return [data];
        } else {
          // If prevData contains messages, append the new message to the messages array
          return [
            { ...prevData[0], messages: [...prevData[0].messages, data] },
          ];
        }
      });
    });

    return () => {
      socket.off("new-message-received");
    };
  }, []);

  useEffect(() => {
    const getConversationMessages = async () => {
      await axios
        .get(`http://localhost:8000/chat/get-public-conversation?roomId=${id}`)
        .then((res) => {
          const data = res.data;
          console.log(data, "get request");
          setIsMessage([]);
          setIsMessage(data);
        });
    };

    getConversationMessages();
  }, []);

  return (
    <>
      <div className="container mx-auto shadow-lg rounded-lg">
        <ChatHeader />
        <div className="flex flex-row justify-between bg-white">
          <div
            className="w-full px-5 flex flex-col justify-between flex"
            style={{ height: "90vh" }}
          >
            <div style={{ overflow: "scroll" }} ref={scrollRef}>
              <div className="h-full flex justify-center items-center mb-4">
                <div className="p-4 bg-gray-200 rounded-md text-center">
                  <div className="py-2">
                    <h1 className="font-sans text-2xl font-bold pb-2">
                      Welcome to {userName}'s group
                    </h1>
                    <p className="font-sans text-md text-gray-400">
                      This is a new group. Here are some steps to help you get
                      started.
                    </p>
                  </div>
                  <div className="py-2">
                    <div
                      onClick={toggleRoomModal}
                      className="p-4 bg-gray-400 rounded-md text-center flex justify-center cursor-pointer hover:bg-gray-300 transition duration-200"
                    >
                      <GroupAddIcon />
                      <p className="px-2">Invite your friends</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-5 h-full">
                {isMessage &&
                  isMessage.map((item, index) => {
                    return item?.messages?.map((msg, subIndex) => (
                      <div
                        className="flex justify-start mb-4"
                        key={`${index}-${subIndex}`}
                      >
                        <div
                          className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center px-1"
                          alt=""
                        >
                          <SmartToyIcon />
                        </div>
                        <div className="mx-2 flex flex-col p-2 rounded-full bg-gray-300">
                          <div className="px-2">{msg?.sender?.name}</div>
                          {msg?.content}
                        </div>
                      </div>
                    ));
                  })}
              </div>
            </div>
            <div className="py-5">
              <form onSubmit={sendMessage}>
                <input
                  className="w-full bg-gray-100 py-4 px-3 rounded-xl"
                  type="text"
                  placeholder="Message..."
                  onChange={inputTyping}
                  value={isValue}
                />
              </form>
            </div>
          </div>
          <div className="w-2/5 border-l-2 px-5">
            <div className="flex flex-col">
              <div className="font-semibold text-xl py-4">Mern Stack Group</div>
              <img
                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                className="object-cover rounded-xl h-64"
                alt=""
              />
              <div className="font-semibold py-4">Created 22 Sep 2021</div>
              <div className="font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt, perspiciatis!
              </div>
            </div>
          </div>
        </div>
      </div>

      {toggleRoom && <RoomModal toggleRoom={toggleRoomModal} />}
    </>
  );
};
