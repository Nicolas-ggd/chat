import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { socket } from "../../../api/socket";

import { ChatSettings } from "../ChatSettings/ChatSettings";
import { InviteModal } from "../ChatInviteModal/InviteModal";
import { ChatFriendsModal } from "../ChatFriends/ChatFriendsModal";

import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import SearchIcon from "@mui/icons-material/Search";

export const ChatSideBar = () => {
  const [toggleInviteModal, setToggleInviteModal] = useState(false);
  const [isConversation, setIsConversation] = useState([]);
  const [toggleFriendsModal, setToggleFriendsModal] = useState(false);
  const [isValue, setIsValue] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const { id } = useParams();
  const dispatch = useDispatch();

  const toggleModal = () => {
    setToggleInviteModal((prevData) => !prevData);
  };

  const toggleFriends = () => {
    setToggleFriendsModal((prevData) => !prevData);
  };

  const conversationDetails = (item) => {
    if (item?.length !== 24) {
      dispatch({ type: "ROOM_TYPE", isPublic: true });
    }
  };

  useEffect(() => {
    const getUserAllConversations = async () => {
      await axios
        .get(
          `https://chat-app-node-8ndm.onrender.com/chat/get-user-conversation?userId=${userId}`
        )
        .then((res) => {
          const data = res.data;
          setIsConversation(data);
        });
    };

    getUserAllConversations();
  }, []);

  useEffect(() => {
    const handleNewConversationCreated = (data) => {
      const exists = isConversation.some(
        (conversation) => conversation.room === data.room
      );

      if (!exists) {
        setIsConversation((prevData) => [...prevData, data]);
      }
    };

    socket.on("new-conversation-created", handleNewConversationCreated);

    return () => {
      socket.off("new-conversation-created", handleNewConversationCreated);
    };
  }, [isConversation]);

  const isSearchHandle = (e) => {
    setIsValue(e.target.value);
  };

  const sendSearchValue = async (e) => {
    e.preventDefault();

    if (isValue.trim() === "") {
      setIsConversation([]);
    }

    await axios
      .get(`https://chat-app-node-8ndm.onrender.com/chat/search-conversation?room=${isValue}`)
      .then((res) => {
        const data = res.data;
        setIsConversation(data);
      });
  };

  return (
    <>
      <div className="flex flex-col w-1/5 overflow-y-auto dark:bg-gray-900 bg-gray-100 transition duration-300 dark:border-r-2 dark:border-gray-800">
        <div className="py-5 my-1 px-2 flex items-center relative">
          <div className="absolute px-1 pl-2">
            <SearchIcon className="dark:text-white" />
          </div>
          <form onKeyUp={sendSearchValue} className="w-full">
            <input
              type="text"
              placeholder="search chatting"
              className="dark:text-white py-2 px-8 border-2 border-gray-200 dark:border-gray-800 rounded-2xl w-full dark:bg-gray-800 transition duration-300"
              onChange={isSearchHandle}
              value={isValue}
            />
          </form>
        </div>
        <div
          className="flex h-full w-full flex-col justify-between"
          style={{ overflow: "scroll" }}
        >
          <div>
            <div
              onClick={toggleModal}
              className="flex flex-row py-4 px-2 justify-center items-center bg-gray-100 hover:bg-gray-300 transiton duration-300 cursor-pointer dark:bg-gray-900 hover:dark:bg-gray-700"
            >
              <div className="px-2">
                <button className="w-12 h-12 bg-gray-400 rounded-full">
                  <AddIcon className="text-center dark:text-white" />
                </button>
              </div>
              <div className="w-full px-2">
                <div className="text-lg font-semibold dark:text-white">
                  Join a room
                </div>
              </div>
            </div>
            <div
              onClick={toggleFriends}
              className="flex flex-row py-4 px-2 justify-center items-center bg-gray-100 hover:bg-gray-300 transiton duration-300 cursor-pointer dark:bg-gray-900 hover:dark:bg-gray-700"
            >
              <div className="px-2">
                <button className="w-12 h-12 bg-gray-400 rounded-full">
                  <GroupAddIcon className="text-center dark:text-white" />
                </button>
              </div>
              <div className="w-full px-2">
                <div className="text-lg font-semibold dark:text-white">
                  Search friends
                </div>
              </div>
            </div>
            {isConversation
              ?.filter((item) => item !== null)
              ?.map((item, index) => (
                <Link
                  key={index}
                  onClick={() => conversationDetails(item)}
                  to={`/chat/${item?.room}`}
                  className="dark:bg-gray-900 hover:dark:bg-gray-700 bg-gray-100 flex flex-row py-4 px-2 justify-center items-center hover:bg-gray-300 transiton duration-300 cursor-pointer"
                >
                  <div
                    className="w-full flex items-center"
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-2">
                      <button className="dark:bg-green-600 w-12 h-12 bg-green-400 rounded-full dark:text-white transition duration-300">
                        {item?.room[0]}
                      </button>
                    </div>
                    <div className="w-full px-2">
                      <div className="text-lg font-semibold dark:text-white">
                        {item?.room}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <ChatSettings />
      </div>
      {toggleFriendsModal && <ChatFriendsModal toggleModal={toggleFriends} />}
      {toggleInviteModal && <InviteModal toggleModal={toggleModal} />}
    </>
  );
};
