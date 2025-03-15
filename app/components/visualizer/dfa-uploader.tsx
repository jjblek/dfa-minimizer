'use client'
import { useState, ChangeEvent } from "react";
import { DfaData } from "../dfa-visualizer";
import IconButton from "../ui/icon-button";
import { MdUpload, MdExpandMore } from "react-icons/md";
import { IoInformation } from "react-icons/io5";

interface DfaUploaderProps {
    setOriginalDfa: (dfa: DfaData) => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DfaUploader({ setOriginalDfa, setIsModalOpen }: DfaUploaderProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isValidDfa = (dfa: any): dfa is DfaData => {
        return (
            typeof dfa === "object" &&
            Array.isArray(dfa.states) &&
            typeof dfa.start === "string" &&
            Array.isArray(dfa.final) &&
            typeof dfa.transitions === "object"
        );
    };

    const parseDfaFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const dfaData = JSON.parse(reader.result as string);
                if (!isValidDfa(dfaData)) throw new Error("Invalid DFA format");
                setOriginalDfa(dfaData);
            } catch (error) {
                alert("Invalid JSON file");
            }
        };
        reader.readAsText(file);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) parseDfaFile(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) parseDfaFile(file);
    };

    return (
        <div className="w-full mx-auto flex flex-col justify-center items-center gap-2">
            <IconButton title={isExpanded ? "collapse menu" : "expand menu"} 
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? <MdExpandMore/> : <MdUpload/>}
            </IconButton>
            {isExpanded ? 
                <div
                    className="relative border-2 border-dashed border-gray-300 p-6 rounded-md flex flex-col justify-center items-center hover:border-indigo-500"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                >
                    <IconButton onClick={() => setIsModalOpen(true)} className="absolute top-2 right-2 ">
                        <IoInformation className=""/>
                    </IconButton>
                    <input id="dfaFile" className="hidden" type="file" accept=".json" onChange={handleFileChange}/>
                    <label htmlFor="dfaFile" 
                        className="bg-[#fefefe] hover:bg-[#eee] dark:bg-[#2b2b2b] dark:hover:bg-[#5b5b5b] py-2 px-4 rounded-xs mb-4 cursor-pointer text-xs sm:text:sm lg:text-base react-flow__controls">
                        Upload DFA
                    </label>
                    <p className="text-xs lg:text-sm">Or drag and drop your file here</p>
                </div> 
            : null}
        </div>
    );
}
