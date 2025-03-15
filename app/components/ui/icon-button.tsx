import { ControlButton } from "@xyflow/react";
import React from "react";

interface IconButtonProps {
    title?: string;
    onClick: (e: any) => void;
    className?: string;
    children: React.ReactNode;
}

export default function IconButton({ title, onClick, className, children }: IconButtonProps) {
    const baseStyles = "";
    
    return (
        <ControlButton title={title} onClick={onClick} className={`${baseStyles} ${className} text-white react-flow__controls`}>
            {children}
        </ControlButton>
    );
}
