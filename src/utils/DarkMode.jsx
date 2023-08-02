import { useState, useEffect } from "react";

export const DarkMode = () => {
    const [theme, setTheme] = useState(localStorage.theme);

    const colorTheme = theme === "dark" ? "dark" : "light";

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(colorTheme === "light" ? "dark" : "light");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return [colorTheme, setTheme];
};
