import IconButton from "../../../ui/icon-button";
import { FaMinus } from "react-icons/fa";

interface TransitionEditorProps {
    states: string[];
    alphabet: string[];
    transitions: Record<string, Record<string, string>>;
    updateTransition: (state: string, symbol: string, targetState: string) => void;
    removeTransition: (state: string, symbol: string) => void;
}

export default function TransitionEditor({ states, alphabet, transitions, updateTransition, removeTransition }: TransitionEditorProps) {
    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">Transitions</h3>
            {states.length < 1 ? 
            <p className="text-sm">Add a state</p> : 
            alphabet.length < 1 ?
            <p className="text-sm">Add an alphabet</p> : 
            states.map((state) => (
                <div key={state} className="mb-2 flex flex-col gap-1 border border-gray-200 rounded-md p-2">
                    <h4 className="font-medium">{state}</h4>
                    {alphabet.map((symbol) => (
                        <div key={`${state}-${symbol}`} className="flex items-center gap-2">
                            <span className="font-mono">{symbol} →</span>
                            <div className="flex items-center gap-2">
                                <select
                                    value={transitions[state]?.[symbol] || ''}
                                    onChange={(e) => updateTransition(state, symbol, e.target.value)}
                                    className="border rounded px-2 py-1 cursor-pointer bg-white dark:bg-[#2b2b2b]"
                                >
                                    <option style={{cursor: 'pointer'}} className="cursor-pointer" value="">Select</option>
                                    {states.map((target) => (
                                        <option className="cursor-pointer" key={target} value={target}>
                                            {target}
                                        </option>
                                    ))}
                                </select>
                                {transitions[state]?.[symbol] && (
                                    <IconButton onClick={() => removeTransition(state, symbol)} color="red">
                                        <FaMinus/>
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
