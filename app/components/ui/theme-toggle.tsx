"use client";

import { type ColorMode, ControlButton } from "@xyflow/react";
import { useTheme } from "next-themes";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa6";
import { MdDarkMode, MdLightMode  } from "react-icons/md";
export default function ThemeToggle({ setColorMode }: { setColorMode: Dispatch<SetStateAction<ColorMode>>; }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (theme) {
            setColorMode((theme as ColorMode) || "light"); // Ensure colorMode updates when the theme changes
        }
    }, [theme, setColorMode]);

    if (!mounted) return null; // Prevents hydration mismatch

    return (
        <ControlButton title="toggle theme"
            
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {theme === "dark" ? <MdLightMode className="w-4 h-4"/> : <MdDarkMode className="w-4 h-4"/>}
        </ControlButton>
    );
}
