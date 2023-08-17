import { useState, useEffect } from "react";

export const useDebounce = (value, seconds) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handlerDeb = setTimeout(() => {
            setDebounceValue(value);
        }, seconds);

        return () => {
            clearTimeout(handlerDeb);
        };
    }, [value, seconds]);

    return debounceValue;
};