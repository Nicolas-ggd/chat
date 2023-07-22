import { useState } from "react";
import { useNavigate } from "react-router";
import { socket } from "../../../api/socket";

export const RoomModal = () => {
  const [isValue, setIsValue] = useState("");
  const navigate = useNavigate();

  const handleTyping = (e) => {
    setIsValue(e.target.value);
  };

  const createRoom = async (e) => {
    if(isValue.length === 0) {
        return
    }
    console.log(1);

    e.preventDefault();

    socket.emit("createRoom", isValue);
    navigate('/chat');
  };

  return (
    <div className="w-full h-screen">
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
            <div className="px-6 py-6 lg:px-8 w-80">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Create room
              </h3>
              <form className="space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Room id
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Room id..."
                    required
                    onChange={handleTyping}
                    value={isValue}
                  />
                </div>
                <button
                  onClick={createRoom}
                  type="button"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Create room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
