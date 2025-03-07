import ColorPicker from "../../../ui/color-picker";
import { type StateColors } from "../../../dfa-visualizer";

interface StartStateEditorProps {
    states: string[];
    startState: string;
    setStartState: (state: string) => void;
    color: string;
    updateColor: (type: keyof StateColors, color: string) => void;
}

export default function StartStateEditor({ states, startState, setStartState, color, updateColor }: StartStateEditorProps) {
    
    return (
        <div className="mb-4 gap-2">
            <h3 className="font-medium">Start State</h3>
            <div className="flex justify-between items-center gap-2">
                <select
                    className="border px-2 py-1 rounded bg-white dark:bg-[#2b2b2b]"
                    value={startState}
                    onChange={e => setStartState(e.target.value)}
                >
                    <option value="">Select Start State</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
                <ColorPicker color={color} setColor={updateColor} type={"start"}/>
            </div>
        </div>
    );
}
