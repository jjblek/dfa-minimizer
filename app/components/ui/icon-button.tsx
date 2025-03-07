import { ControlButton } from "@xyflow/react";
import React from "react";

interface IconButtonProps {
    title?: string;
    onClick: (e: any) => void;
    color?: "blue" | "red"; // Extend this if needed
    children: React.ReactNode;
}

export default function IconButton({ title, onClick, color = "blue", children }: IconButtonProps) {
    const baseStyles = "";
    const colorStyles =
        color === "blue"
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-red-500 hover:bg-red-600";

    return (
        <ControlButton title={title} onClick={onClick} className={`${baseStyles} ${colorStyles} text-white react-flow__controls`}>
            {children}
        </ControlButton>
    );
}
