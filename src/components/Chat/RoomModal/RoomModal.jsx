import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { socket } from "../../../api/socket";

export const RoomModal = () => {
  const [isValue, setIsValue] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  const handleTyping = (e) => {
    setIsValue(e.target.value);
  };

  const createRoom = async (e) => {
    if (isValue.length === 0) {
      return;
    }

    e.preventDefault();

    socket.emit("createRoom", isValue);
    navigate("/chat");
  };

  const handleRoomMode = () => {
    setIsPublic((prevData) => !prevData);
    const publicType = isPublic ? "private" : "public";
    localStorage.setItem("roomMode", publicType);
  };

  useEffect(() => {
    const publicType = isPublic ? "private" : "private";
    localStorage.setItem("roomMode", publicType);
  }, []);

  return (
    <div className="w-full h-screen">
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="m-auto mt-auto flex w-screen items-center h-full relative max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="px-6 py-6 lg:px-8 w-80">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Create room
              </h3>
              {isPublic && (
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
              )}
              {!isPublic && <div className="flex flex-col">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div
                    onClick={handleRoomMode}
                    className="w-11 h-6 bg-gray-200 peer-focus:ring-4 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                  ></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Toggle me
                  </span>
                </label>
                <span className="py-3 font-sans">
                  RoomType: {!isPublic ? "Private" : "Public"}
                </span>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
