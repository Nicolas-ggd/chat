import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { socket } from "../../../api/socket";

import { ChatHeader } from "../ChatHeader/ChatHeader";
import { RoomModal } from "../ChatRoomModal/RoomModal";

import SendIcon from "@mui/icons-material/Send";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const ChatBox = () => {
  const [isTyping, setIsTyping] = useState("");
  const [toggleRoom, setToggleRoom] = useState(false);
  const [isMessage, setIsMessage] = useState([]);
  const userData = useSelector((state) => state.user);
  const isPublic = useSelector((state) => state.chat.isPublic);

  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const roomId = useSelector((state) => state.chat.roomId);

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

    setIsTyping("");
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
            <div className="flex flex-col h-full" style={{ flexFlow: "wrap" }}>
              <div className="w-full h-full" style={{ overflowY: "auto" }}>
                <div className="w-full flex mt-5 h-full py-5">
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
                      console.log(item)
                      return (
                        <div key={index} className="flex justify-end mb-4">
                          <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                            {item?.messages[0]?.content}
                          </div>
                          <img
                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                            className="object-cover h-8 w-8 rounded-full"
                            alt=""
                          />
                        </div>
                      );
                    })}
                  {/* <div className="flex justify-start mb-4">
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quaerat at praesentium, aut ullam delectus odio error sit
                      rem. Architecto nulla doloribus laborum illo rem enim
                      dolor odio saepe, consequatur quas?
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div>
                      <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Magnam, repudiandae.
                      </div>

                      <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Debitis, reiciendis!
                      </div>
                    </div>
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      happy holiday guys!
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="pb-10 w-full">
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
