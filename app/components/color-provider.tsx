'use client'
import { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import DfaVisualizer from './dfa-visualizer';

const ColorProvider = () => {
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
    
        // Store colors in localStorage when stateColors changes
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
        <div className='min-h-screen flex flex-col'>  
            <Header stateColors={stateColors} updateColor={updateColor}/>
                <div className='w-full h-[85vh] p-2 sm:p-4 md:p-8'>
                    <DfaVisualizer stateColors={stateColors} updateColor={updateColor} />
                </div>
            <Footer/>
        </div>
    )
}

export default ColorProvider