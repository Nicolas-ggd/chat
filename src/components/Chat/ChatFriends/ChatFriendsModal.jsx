import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import ChatIcon from "@mui/icons-material/Chat";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const generateRoomId = () => {
  return Math.floor(Math.random() * 100000000 * 10000);
};

export const ChatFriendsModal = ({ toggleModal }) => {
  const [isValue, setIsValue] = useState("");
  const [isSearch, setIsSearch] = useState([]);
  const [isShown, setIsShown] = useState(true);
  const [roomId, setRoomId] = useState(() => generateRoomId());
  const userId = useSelector((state) => state.user.userId);
  const outsideRef = useRef();
  const dispatch = useDispatch();

  const handleFriendsSearch = (e) => {
    setIsValue(e.target.value);
  };

  useEffect(() => {
    const searchFriends = async () => {
      try {
        if (isValue.trim() === "") {
          setIsSearch([]);
        } else {
          const res = await axios.get(
            `https://chat-app-node-8ndm.onrender.com/user/search-user?value=${isValue}&userId=${userId}`
          );
          const data = res.data;
          setIsSearch(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    searchFriends();
  }, [isValue, userId]);

  const onClickOutside = () => {
    setIsShown(false);
    toggleModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outsideRef.current && !outsideRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  const clickConversation = (item) => {
    dispatch({ type: "ROOM_TYPE", isPublic: false });
    dispatch({ type: "RECIPIENT", recipient: item?._id })
    setIsShown(false)
    toggleModal();
  };

  return (
    <>
      {isShown && (
        <div
          className="w-full h-screen absolute bg-gray-100 animate-fade animate-once animate-duration-1000 animate-ease-in"
          style={{ backgroundColor: "rgba(12, 11, 11, 0.92)", zIndex: "9999" }}
        >
          <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="m-auto mt-auto flex w-screen items-center h-full relative max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div
                  className="px-6 py-6 lg:px-8 bg-gray-200 dark:bg-gray-700 rounded-md"
                  style={{ width: "500px" }}
                  ref={outsideRef}
                >
                  <form className="space-y-6" action="#">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="bg-gray-100 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white py-5 text-xl"
                        placeholder="You can search friends with their name"
                        value={isValue}
                        onChange={handleFriendsSearch}
                      />
                    </div>
                  </form>

                  <div className="flex flex-col w-100">
                    <h2 className="text-sm dark:text-white py-2">
                      Previous Conversations
                    </h2>
                    {isSearch &&
                      isSearch?.length > 0 &&
                      isSearch?.map((item, index) => {
                        return (
                          <Link
                            to={`/chat/${roomId}`}
                            onClick={() => clickConversation(item)}
                            key={index}
                            className="w-full p-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 rounded-md hover:dark:bg-gray-600 cursor-pointer flex items-center justify-between transition duration-200"
                          >
                            <div className="flex items-center">
                              <div className="bg-green-400 h-8 w-8 rounded-full flex items-center justify-center px-1">
                                <SmartToyIcon />
                              </div>
                              <p className="text-dark dark:text-white px-2">
                                # {item?.name}
                              </p>
                            </div>
                            <div className="hover:bg-green-600 hover:dark:bg-green-600 p-1 rounded-md transition duration-200" onClick={() => clickConversation(item)}>
                              <button className="px-2 text-dark dark:text-white">
                                <ChatIcon className="text-dark dark:text-white mx-1" />
                              Message
                              </button>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
