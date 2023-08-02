import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { socket } from "../../../api/socket";

export const InviteModal = ({ toggleModal }) => {
  const [isType, setIsType] = useState("");
  const [isError, setIsError] = useState(false);
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inviteLinkHandler = (e) => {
    setIsType(e.target.value);
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();

    if (isType?.length === 0) {
      return setIsError(true);
    }

    const linkParts = isType.split("/");
    const roomId = linkParts[linkParts.length - 1];

    navigate(`/chat/${roomId}`);
    dispatch({ type: "ROOM_ID", roomId: roomId });
    dispatch({ type: "SELECTED_CHAT", selectedChat: roomId });
    dispatch({ type: "ROOM_TYPE", isPublic: true });
    socket.emit("joinRoom", {
      roomId,
      userData,
    });

    toggleModal();
  };

  return (
    <div
      className="w-full h-screen absolute bg-gray-100 animate-fade animate-once animate-duration-1000 animate-ease-in"
      style={{ backgroundColor: "#0c0b0bb0", zIndex: "9999" }}
    >
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="m-auto mt-auto flex w-screen items-center h-full relative max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={toggleModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
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
            <div className="px-6 py-6 lg:px-8" style={{ width: "400px" }}>
              <div className="w-full flex justify-center flex-col">
                <h3 className="flex justify-center mb-2 text-xl font-bold font-sans text-gray-900 dark:text-white">
                  Join a room
                </h3>
                <p className="dark:text-white text-sm py-2 text-gray-400 text-center">
                  Enter an invite below to join an existing room
                </p>
              </div>
              <form className="space-y-4 py-4" onSubmit={joinRoomHandler}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white transition duration-100"
                    style={{ color: isError ? "red" : "" }}
                  >
                    {!isError
                      ? "INVITE LINK"
                      : "INVITE LINK - Please enter a valid invite link"}{" "}
                    <span className="text-red-500">{!isError && "*"}</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="https://nicolas-ggd-chat.netlify.app/chat/64e9w6rn"
                      onChange={inviteLinkHandler}
                      value={isType}
                    />
                  </div>
                  <div className="flex flex-col py-1">
                    <p className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      INVITES SHOULD LOOK LIKE
                    </p>
                    <span className="text-sm dark:text-white">64e9w6rn</span>
                    <span className="text-sm dark:text-white">
                      https://nicolas-ggd-chat.netlify.app/chat/64e9w6rn
                    </span>
                  </div>
                </div>
                <button
                  onClick={joinRoomHandler}
                  type="button"
                  className="w-full transition duration-200 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
