import React, { useCallback, useRef, useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { StateColors } from "../dfa-visualizer";
const useClickOutside = (ref: React.RefObject<HTMLDivElement | null>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if `mousedown` or `touchstart` started inside ref element
        if (startedInside || !startedWhenMounted) return;
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) return;

        handler(event);
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
        startedWhenMounted = !!ref.current;
        startedInside = !!ref.current && ref.current.contains(event.target as Node);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
        document.removeEventListener("mousedown", validateEventStart);
        document.removeEventListener("touchstart", validateEventStart);
        document.removeEventListener("click", listener);
    };
    }, [ref, handler]);
};
interface ColorPickerProps {
    color: string;
    setColor: (type: keyof StateColors, color: string) => void;
    type: keyof StateColors;
}
const ColorPicker = ({color, setColor, type}: ColorPickerProps) => {
    const popover = useRef<HTMLDivElement>(null);
        const [isOpen, toggle] = useState(false);
        const close = useCallback(() => toggle(false), []);
        useClickOutside(popover, close);
        const [tempColor, setTempColor] = useState(color); // Temporary color state
        const handleColorUpdate = () => {
            setColor(type, tempColor); // Update color only when button is clicked
            
        };
    return (
        <div className="picker">
            <div
                className="swatch"
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover flex flex-col bg-white dark:bg-[#2b2b2b] shadow-sm p-4 w-[212px] border" ref={popover}>
                <HexColorPicker color={tempColor} onChange={setTempColor} style={{width: '100%'}}/>
                <button
                className="mt-2 px-4 py-1 bg-[#fefefe] hover:bg-[#eee] dark:bg-[#2b2b2b] dark:hover:bg-[#5b5b5b] react-flow__controls text-sm"
                onClick={handleColorUpdate}
            >
                Update Color
            </button>
                </div>
            )}
        </div>
    )
}

export default ColorPicker