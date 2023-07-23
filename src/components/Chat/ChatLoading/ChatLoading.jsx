import ForumIcon from "@mui/icons-material/Forum";

export const ChatLoading = () => {
  return (
    <div role="status">
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <ForumIcon
          style={{ color: "#a507b8", fontSize: "50px" }}
          fontSize="large"
          className="animate-pulse animate-infinite animate-ease-out"
        />
        <h2 className="p-3 dark:text-white text-xl font-sans">
          Welcome to QuickChat
        </h2>
      </div>
    </div>
  );
};
