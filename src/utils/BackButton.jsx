import { useEffect } from "react";

export const useBackButton = () => {
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      callback();
    };

    window.addEventListener("beforeunload", handleBackButton);

    return () => {
      window.removeEventListener("beforeunload", handleBackButton);
    };
  }, [callback]);
};
