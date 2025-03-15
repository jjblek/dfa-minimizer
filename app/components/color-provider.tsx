'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the context
interface ColorContextProps {
    stateColors: Record<"start" | "final" | "default", string>;
    updateColor: (type: "start" | "final" | "default", color: string) => void;
}

// Create the context
const ColorContext = createContext<ColorContextProps | undefined>(undefined);

// Custom hook for easier access
export const useColorContext = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColorContext must be used within a ColorProvider');
    }
    return context;
};

// Define props for provider
interface ColorProviderProps {
    children: ReactNode;
}

// Provider component
export const ColorProvider = ({ children }: ColorProviderProps) => {
    const [stateColors, setStateColors] = useState({
        start: "#3b82f6",
        final: "#22c55e",
        default: "#14b8a6",
    });

    // Load colors from localStorage on mount
    useEffect(() => {
        const storedColors = {
            start: localStorage.getItem("startStateColor") || "#3b82f6",
            final: localStorage.getItem("finalStateColor") || "#22c55e",
            default: localStorage.getItem("defaultStateColor") || "#14b8a6",
        };
        setStateColors(storedColors);
    }, []);

    // Store colors in localStorage when stateColors change
    useEffect(() => {
        localStorage.setItem("startStateColor", stateColors.start);
        localStorage.setItem("finalStateColor", stateColors.final);
        localStorage.setItem("defaultStateColor", stateColors.default);
    }, [stateColors]);

    // Function to update colors
    const updateColor = (type: "start" | "final" | "default", color: string) => {
        setStateColors(prevColors => ({
            ...prevColors,
            [type]: color,
        }));
    };

    return (
        <ColorContext.Provider value={{ stateColors, updateColor }}>
            {children}
        </ColorContext.Provider>
    );
};
