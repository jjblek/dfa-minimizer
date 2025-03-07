import React, { ReactNode } from 'react';
import { useState } from "react";
import { ControlButton, Panel } from "@xyflow/react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

interface ExpandablePanelProps {
    children: ReactNode;
}

const ExpandablePanel = ({ children }: ExpandablePanelProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Panel position="top-left">
            <div className={`absolute ${isExpanded ? "" : "react-flow__controls"}`}>
                <ControlButton title={isExpanded ? "collapse menu" : "expand menu"} 
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                </ControlButton>
                
                </div>
                {isExpanded && (
                <div className={`bg-white dark:bg-[#2b2b2b] shadow-lg pt-[26px] px-3 pb-4 rounded-sm`}>
                <div className="flex flex-col max-h-[675px] overflow-y-auto custom-scrollbar pr-3 pt-2">
                {children}
                </div>
            </div>
            )}

            
        </Panel>
    );
};

export default ExpandablePanel;
