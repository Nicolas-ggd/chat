import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { socket } from "../../../api/socket";

const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 10);
};

export const RoomModal = ({ toggleRoom }) => {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [roomId, setRoomId] = useState(() => generateRoomId());
  const [isClicked, setIsClicked] = useState(false);

  const createRoom = async (e) => {
    e.preventDefault();
    setIsClicked(true);

    if (inputRef.current) {
      const roomUrl = `http://localhost:5173/chat/${roomId}`;
      inputRef.current.value = roomUrl;
      inputRef.current.select();

      try {
        await navigator.clipboard.writeText(roomUrl);
        console.log("Copied to clipboard:", roomUrl);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }

    socket.emit("createRoom", roomId);
    dispatch({
      type: "ROOM_ID",
      roomId: roomId,
    });
  };

  setTimeout(() => setIsClicked(false), 2000);

  return (
    <div
      className="w-full h-screen absolute bg-gray-100 animate-fade animate-once animate-duration-1000 animate-ease-in"
      style={{ backgroundColor: "#0c0b0bb0" }}
    >
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="m-auto mt-auto flex w-screen items-center h-full relative max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={toggleRoom}
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
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-md font-medium text-gray-900 dark:text-white">
                Invite friends to {userName}'s room
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Share this link with others to grant access to your server!
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="text"
                      id="text"
                      className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Room id..."
                      ref={inputRef}
                      value={`http://localhost:5173/chat/${roomId}`}
                      disabled
                    />
                    {!isClicked && (
                      <button
                        onClick={createRoom}
                        type="button"
                        className="absolute outline-none focus:outline-none focus:ring focus:border-blue-100 right-2 flex items-center rounded-sm h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-200"
                      >
                        Copy
                      </button>
                    )}
                    {isClicked && (
                      <button
                        onClick={createRoom}
                        type="button"
                        className="absolute outline-none focus:outline-none focus:ring focus:border-green-100 right-2 flex items-center rounded-sm h-8 text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-200"
                      >
                        Copied
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
