import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { DarkMode } from "./DarkMode";

export const Switcher = () => {
    const [colorTheme, setColorTheme] = DarkMode();
    const [darkSide, setDarkSide] = useState(colorTheme === "dark");

    const toggleDarkMode = (checked) => {
        setDarkSide(checked);
        setColorTheme(checked ? "dark" : "light");
    };

    return (
        <>
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={20}
            />
        </>
    );
};
