import { useState } from "react";

import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export const Auth = ({ themeClass, isDarkMode }) => {
  const [isAuth, setIsAuth] = useState(true);

  const toggleAuth = () => {
    setIsAuth(prevIsAuth => !prevIsAuth);
  };

  return (
    <>
      {isAuth ? (
        <SignIn closeSignIn={toggleAuth} themeClass={themeClass} isDarkMode={isDarkMode} />
      ) : (
        <SignUp closeSignUp={toggleAuth} themeClass={themeClass} isDarkMode={isDarkMode}/>
      )}
    </>
  );
};
