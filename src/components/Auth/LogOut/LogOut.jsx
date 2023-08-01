import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import LogoutIcon from "@mui/icons-material/Logout";

export const LogOut = () => {
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogOut = async () => {
    await axios
      .post("https://chat-app-node-8ndm.onrender.com/logout", {
        userId: userId,
      })
      .then(() => {
        localStorage.removeItem("access_token");
        dispatch({
          type: "USER_DATA",
          userId: "",
          name: "",
          email: "",
        });
        navigate("/");
      });
  };

  return (
    <div onClick={userLogOut} className="w-full bg-gray-200 p-2 my-1 text-center rounded-xl hover:bg-gray-400 transition duration-300 cursor-pointer flex items-center justify-center dark:bg-gray-800 dark:text-white hover:dark:bg-gray-700">
      <span className="">LogOut</span>
      <span className="px-2">
        <LogoutIcon />
      </span>
    </div>
  );
};
