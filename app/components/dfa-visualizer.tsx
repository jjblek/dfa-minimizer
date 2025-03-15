'use client';

import React, { useEffect, useState } from 'react';
import { 
    ReactFlow, useNodesState, useEdgesState, Panel, MiniMap,
    Background, Controls, ControlButton, ConnectionMode, MarkerType, 
    type Node, type Edge, type ColorMode, 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
    CustomNode, 
    SelfConnecting, 
    FloatingEdge, 
    ExpandablePanel, 
    DfaMinimizer, 
    DfaUploader, 
    DownloadButton 
} from './visualizer';

import InteractiveDfaEditor from './visualizer/editor/interactive-dfa-editor';
import ThemeToggle from './ui/theme-toggle';
import { MdAnimation, MdClose } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { useColorContext } from './color-provider';

export interface DfaData {
    states: string[];
    start: string;
    final: string[];
    alphabet: string[]; // Add this
    transitions: Record<string, Record<string, string>>;
}

export interface StateColors {
    start: string;
    final: string;
    default: string;
}

interface DfaVisualizerProps {
    stateColors: StateColors;
    updateColor: (type: "start" | "final" | "default", color: string) => void;
}

// Helper function to create nodes
const createNodes = (dfaData: DfaData, isMinimized: boolean, xOffset = 0, theme: string | undefined, stateColors: StateColors): Node[] => {
    const { states, start, final } = dfaData;
    const nodesPerRow = 2;
    const horizontalSpacing = 200;
    const verticalSpacing = 200;
    
    return states.map((state, index) => ({
        id: `${state}-${isMinimized ? 'm' : 'o'}`, // Differentiate node IDs
        data: { label: state },
        position: {
            x: (index % nodesPerRow) * horizontalSpacing + xOffset, 
            y: Math.floor(index / nodesPerRow) * verticalSpacing,
        },
        style: {

            border: final.includes(state)
            ? theme === "dark" 
                ? "3px double #ffffff" // Outer and inner borders for final state in dark mode
                : "3px double #000000" // Outer and inner borders for final state in light mode
            : theme === "light" ? "1px solid #000000" : "1px solid #fff",
            
            backgroundColor: state === start 
            ? stateColors.start
            : final.includes(state) 
            ? stateColors.final
            : stateColors.default,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60px",
            height: "60px",
        },
        type: "custom",
    }));
};

// Helper function to create edges
const createEdges = (dfaData: DfaData, isMinimized: boolean, isAnimated: boolean): Edge[] => {
    const edgeLabelsMap: Record<string, string[]> = {};

    Object.entries(dfaData.transitions).forEach(([state, trans]) => {
        Object.entries(trans).forEach(([symbol, nextState]) => {
            const edgeKey = `${state}-${nextState}`;
            if (!edgeLabelsMap[edgeKey]) {
                edgeLabelsMap[edgeKey] = [];
            }
            edgeLabelsMap[edgeKey].push(symbol);
        });
    });

    return Object.entries(edgeLabelsMap).map(([edgeKey, labels]) => {
        const [source, target] = edgeKey.split('-');
        return {
            id: `${edgeKey}-${isMinimized ? 'm' : 'o'}`, // Unique edge ID
            source: `${source}-${isMinimized ? 'm' : 'o'}`,
            target: `${target}-${isMinimized ? 'm' : 'o'}`,
            sourceHandle: 'c',
            targetHandle: 'a',
            label: labels.length > 0 ? labels.join(', ') : '?',
            type: source === target ? 'selfConnecting' : 'floating',
            markerEnd: { type: MarkerType.ArrowClosed },
            animated: isAnimated,
        };
    });
};

const defaultDFA = {
    "states": ["s0", "s1", "s2"],
    "start": "s0",
    "final": ["s1", "s2"],
    "alphabet": ["0", "1"],
    "transitions": {
        "s0": {"0": "s2", "1": "s1"},
        "s1": {"0": "s1", "1": "s2"},
        "s2": {"0": "s2", "1": "s2"}
    }
}

const defaultMinimizedDFA = {
    "states": ["s0", "s1s2"],
    "start": "s0",
    "final": ["s1s2"],
    "alphabet": ["0", "1"],
    "transitions": {
        "s0": {"0": "s1s2", "1": "s1s2"},
        "s1s2": {"0": "s1s2", "1": "s1s2"},
    }
}

const dfaExample = `{
    "states": ["s0", "s1", "s2"],
    "start": "s0",
    "final": ["s1", "s2"],
    "alphabet": ["0", "1"],
    "transitions": {
        "s0": {"0": "s2", "1": "s1"},
        "s1": {"0": "s1", "1": "s2"},
        "s2": {"0": "s2", "1": "s2"}
    }
}`

const DfaVisualizer = () => {

    const [originalDfa, setOriginalDfa] = useState<DfaData>(defaultDFA);
    const [minimizedDfa, setMinimizedDfa] = useState<DfaData>(defaultMinimizedDFA);
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [mounted, setMounted] = useState(false);
    const [isAnimated, setIsAnimated] = useState(true);
    const [colorMode, setColorMode] = useState<ColorMode>("light");
    const { stateColors, updateColor } = useColorContext();
    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!originalDfa) return;
    
        setNodes(() => [
            ...createNodes(originalDfa, false, 0, theme, stateColors), 
            ...createNodes(minimizedDfa, true, 400, theme, stateColors),
        ]);
    
        setEdges(() => [
            ...createEdges(originalDfa, false, isAnimated), 
            ...createEdges(minimizedDfa, true, isAnimated)
        ]);
    }, [originalDfa, minimizedDfa, isAnimated, theme, stateColors, setEdges, setNodes]);
    
    return (
            <ReactFlow
                fitView
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                edgeTypes={{ 
                    selfConnecting: (props) => <SelfConnecting {...props} theme={theme ? theme : 'light'} />, 
                    floating: (props) => <FloatingEdge {...props} edges={edges} theme={theme ? theme : 'light'} /> }}
                nodeTypes={{ custom: CustomNode }}
                connectionMode={ConnectionMode.Loose}
                colorMode={colorMode}
                snapToGrid={true}
                snapGrid={[10, 10]}
            >
                <Background className='border border-gray-200 rounded-md'/>
                {mounted ?
                    <>
                        <Panel position='top-right' className='react-flow__controls'>
                            <ThemeToggle setColorMode={setColorMode}/>
                            <ControlButton title="toggle animation" onClick={() => setIsAnimated(!isAnimated)}>
                                <MdAnimation/>
                            </ControlButton>
                        </Panel>

                        <Controls><DownloadButton/></Controls>

                        <ExpandablePanel>
                            <InteractiveDfaEditor 
                                dfa={originalDfa} setDfa={setOriginalDfa} 
                                stateColors={stateColors} updateColor={updateColor}
                            />
                        </ExpandablePanel>
                        
                        <Panel position='top-center'>
                            <DfaMinimizer originalDfa={originalDfa} setMinimizedDfa={setMinimizedDfa}/>
                        </Panel>
                        
                        <Panel position='bottom-center'>
                            <DfaUploader setOriginalDfa={setOriginalDfa} setIsModalOpen={setIsModalOpen}/>
                        </Panel>

                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-[#00000099] z-50">
                                <div className="relative bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-96">
                                    <h2 className="text-lg font-bold mb-4">
                                        DFA File Format
                                    </h2>
                                    <pre className="bg-gray-200 dark:bg-[#2b2b2b] p-4 rounded-md text-xs overflow-auto">
                                        {dfaExample}
                                    </pre>
                                    <button 
                                        className="absolute top-6 right-6 bg-gray-200 dark:bg-[#2b2b2b] hover:bg-red-500 dark:hover:bg-red-800 p-2 rounded-full"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        <MdClose/>
                                    </button>
                                </div>
                            </div>
                        )}

                        <MiniMap className='hidden sm:block' zoomable pannable/>
                    </>
                : null}
                <ToastContainer position='bottom-right' theme={theme} stacked/>
            </ReactFlow>

    );
};

export default DfaVisualizer;
