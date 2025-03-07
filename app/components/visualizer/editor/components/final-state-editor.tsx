import ColorPicker from "../../../ui/color-picker";
import { StateColors } from "../../../dfa-visualizer";

interface FinalStateEditorProps {
    states: string[];
    finalStates: string[];
    toggleFinalState: (state: string) => void;
    color: string;
    updateColor: (type: keyof StateColors, color: string) => void;
}

export default function FinalStateEditor({ states, finalStates, toggleFinalState, color, updateColor }: FinalStateEditorProps) {
    return (
        <div className="mb-4">
            <h3 className="font-medium">Final States</h3>
            <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2 mt-2 max-w-[200px]">
                {states.map(state => (
                    <label key={state} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={finalStates.includes(state)}
                            onChange={() => toggleFinalState(state)}
                        />
                        {state}
                    </label>
                ))}
            </div>
            <ColorPicker color={color} setColor={updateColor} type="final"/>
            </div>
        </div>
    );
}
