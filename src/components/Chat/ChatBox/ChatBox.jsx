import { useState } from "react";
import axios from "axios";

import { socket } from "../../../api/socket";

import SendIcon from "@mui/icons-material/Send";

import { ChatHeader } from "../ChatHeader/ChatHeader";

export const ChatBox = () => {
  const [isTyping, setIsTyping] = useState("");
  const userId = localStorage.getItem("userId");
  const roomType = localStorage.getItem("roomMode");

  const handleTyping = (e) => {
    setIsTyping(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8000/chat/create-conversation", {
      data: {
        participants: [id, userId],
        message: {
          sender: userId,
          recipient: id,
          content: isTyping
        }
      }
    })
    .then((res) => {
      const data = res.data;
      console.log(data, 'message');
    })

    setIsTyping("");
  };

  return (
    <div className="container mx-auto shadow-lg rounded-lg">
      <div
        className="flex flex-row justify-between bg-white"
        style={{ height: "90vh" }}
      >
        <div className="w-full px-5 flex h-full flex-col justify-between">
          <ChatHeader />
          <div className="flex flex-col h-full" style={{ flexFlow: "wrap" }}>
            <div className="flex flex-col mt-5 h-full py-5">
              <div className="flex justify-end mb-4">
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Welcome to group everyone !
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
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quaerat at praesentium, aut ullam delectus odio error sit rem.
                  Architecto nulla doloribus laborum illo rem enim dolor odio
                  saepe, consequatur quas?
                </div>
              </div>
              <div className="flex justify-end mb-4">
                <div>
                  <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Magnam, repudiandae.
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
                <div className="absolute right-3 cursor-pointer" onClick={sendMessage}>
                  <SendIcon />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
