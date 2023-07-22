import SearchIcon from "@mui/icons-material/Search";
import ForumIcon from "@mui/icons-material/Forum";

export const ChatHeader = () => {
  return (
    <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
      <div className="w-1/2 flex items-center">
        <ForumIcon
          style={{ color: "#a507b8", fontSize: "30px" }}
          fontSize="large"
          className="animate-pulse animate-infinite animate-ease-out"
        />
        <div className="font-semibold text-2xl px-3">Quick Chat</div>
      </div>
      <div className="w-1/2 relative flex items-center px-2">
        <SearchIcon className="absolute ml-2 text-gray-600" />
        <input
          type="text"
          name=""
          id=""
          placeholder="search IRL"
          className="rounded-2xl bg-gray-100 py-3 px-8 w-full"
        />
      </div>
      <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
        RA
      </div>
    </div>
  );
};
