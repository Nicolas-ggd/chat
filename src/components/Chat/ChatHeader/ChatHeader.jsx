import { useSelector } from "react-redux";

export const ChatHeader = () => {
  const conversation = useSelector((state) => state.chat.selectedChat);
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="flex items-center">
        <div className="h-12 w-12 p-2 bg-green-400 rounded-full text-white font-semibold flex items-center justify-center">
          {conversation.at(0)}
        </div>
        <h3 className="px-2 font-semibold">#{conversation}</h3>
      </div>
    </div>
  );
};
