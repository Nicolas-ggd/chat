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
      .post("http://localhost:8000/logout", {
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
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2 cursor-pointer transition duration-400">
      <div className="w-full px-3">
        <div
          className="w-full bg-gray-100 hover:bg-gray-200 cursor-pointer p-2 rounded-xl flex justify-center"
          onClick={userLogOut}
        >
          <span>Log Out</span>
          <LogoutIcon className="mx-3" />
        </div>
      </div>
    </div>
  );
};
