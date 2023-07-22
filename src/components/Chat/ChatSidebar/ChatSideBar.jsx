import SearchIcon from "@mui/icons-material/Search";

export const ChatSideBar = () => {
  return (
    <div className="flex flex-col w-1/5 border-r-2 overflow-y-auto">
      <div className="border-b-2 py-4 px-2 relative flex items-center">
        <SearchIcon className="absolute h-full ml-2 mr-1 text-gray-600" />
        <input
          type="text"
          placeholder="search chatting"
          className="py-2 px-6 ml-1 border-2 border-gray-200 rounded-2xl w-full"
        />
      </div>
      <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:bg-gray-200 cursor-pointer transition duration-400">
        <div className="w-1/4">
          <img
            src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
        </div>
        <div className="w-full px-3">
          <div className="text-lg font-semibold">Luis1994</div>
          <span className="text-gray-500">Pick me at 9:00 Am</span>
        </div>
      </div>
    </div>
  );
};
