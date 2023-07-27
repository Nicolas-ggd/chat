import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import ChatIcon from "@mui/icons-material/Chat";

export const ChatFriendsModal = ({ toggleModal }) => {
  const [isValue, setIsValue] = useState("");
  const [isSearch, setIsSearch] = useState([]);
  const userId = useSelector((state) => state.user.userId);

  const handleFriendsSearch = (e) => {
    setIsValue(e.target.value);
  };

  useEffect(() => {
    console.log(isValue);
    const searchFriends = async () => {
      try {
        if (isValue.trim() === "") {
          setIsSearch([]);
        } else {
          const res = await axios.get(
            `http://localhost:8000/user/search-user?value=${isValue}&userId=${userId}`
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

  return (
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
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8" style={{ width: "500px" }}>
              <h3 className="mb-4 text-md font-medium text-gray-900 dark:text-white">
                Invite friends to 's room
              </h3>
              <form className="space-y-6" action="#">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white py-5 text-xl"
                    placeholder="Search friends"
                    value={isValue}
                    onChange={handleFriendsSearch}
                  />
                </div>
              </form>

              <div className="flex flex-col w-100">
                <h2 className="text-md dark:text-white py-2">
                  Previous Conversations
                </h2>
                {isSearch &&
                  isSearch?.length > 0 &&
                  isSearch?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full p-3 bg-gray-200 dark:bg-gray-700 rounded-md hover:dark:bg-gray-600 cursor-pointer flex justify-between"
                      >
                        <p className="text-dark dark:text-white">
                          # {item?.name}
                        </p>
                        <div>
                          <ChatIcon className="text-white" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
