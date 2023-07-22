import { useSelector } from "react-redux";

export const ChatHeader = () => {
  const userData = useSelector((state) => state.user.name);
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="w-1/2 flex items-center">
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
        {userData?.at(0)}
        </div>
        <h3 className="font-sans text-md px-2">{userData}</h3>
      </div>
    </div>
  );
};