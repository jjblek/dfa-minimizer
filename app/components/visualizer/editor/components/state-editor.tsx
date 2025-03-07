import { useState } from "react";
import ColorPicker from "../../../ui/color-picker";
import IconButton from "../../../ui/icon-button";
import { FaPlus, FaMinus } from "react-icons/fa";
import { type StateColors } from "../../../dfa-visualizer";

interface StateEditorProps {
    states: string[];
    removeState: (state: string) => void;
    addState: (state: string) => void;
    color: string;
    updateColor: (type: keyof StateColors, color: string) => void;
}

export default function StateEditor({ states, removeState, addState, color, updateColor }: StateEditorProps) {
    const [newState, setNewState] = useState("");
    
    return (
        <div className="flex flex-col mb-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">States</h3>
                <ColorPicker color={color} setColor={updateColor} type="default" />
            </div>
            <div className="flex flex-col gap-2 mt-2">
                {states.map(state => (
                    <div key={state} className="flex items-center gap-2">
                        <span className="flex w-full  px-2 py-1 rounded border border-gray-200">{state}</span>
                        <IconButton color="red"
                            onClick={() => {
                                removeState(state);
                            }}
                        >
                            <FaMinus/>
                        </IconButton>
                    </div>
                ))}
                <div className="flex items-center gap-2">
                    <input
                        placeholder="Add a new state..."
                        type="text"
                        className="border border-gray-200 px-2 py-1 rounded"
                        value={newState}
                        onChange={e => setNewState(e.target.value)}
                    />
                    <IconButton
                        onClick={() => {
                            addState(newState);
                            setNewState("");
                        }}
                    >
                        <FaPlus/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
