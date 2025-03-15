import { useState } from "react";
import IconButton from "../../../ui/icon-button";
import { FaPlus, FaMinus } from "react-icons/fa";
interface AlphabetEditorProps {
    alphabet: string[];
    updateSymbol: (index: number, newSymbol: string) => void;
    addSymbol: (symbol: string) => void;
    removeSymbol: (symbol: string) => void;
}

export default function AlphabetEditor({ alphabet, updateSymbol, addSymbol, removeSymbol }: AlphabetEditorProps) {
    const [newSymbol, setNewSymbol] = useState("");

    return (
        <div className="mb-4">
            <h3 className="font-medium">Alphabet</h3>
            <div className="flex flex-col gap-2 mt-2">
                {alphabet.map((symbol, index) => (
                    <div key={symbol} className="flex items-center gap-2 relative">
                        <div className="relative">
                            <input
                                type="text"
                                className="border border-gray-200 px-2 py-1 rounded"
                                defaultValue={symbol}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateSymbol(index, (e.target as HTMLInputElement).value);
                                    }
                                }}
                            />
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-1 text-xs rounded-xs"
                                onClick={(e) => {
                                    const inputElement = (e.currentTarget.previousSibling as HTMLInputElement);
                                    updateSymbol(index, inputElement.value);
                                }}
                            >
                                Update
                            </button>
                        </div>
                        <IconButton onClick={() => removeSymbol(symbol)}>
                            <FaMinus />
                        </IconButton>
                    </div>
                ))}

                <div className="flex items-center gap-2">
                    <input
                        placeholder="Enter a symbol..."
                        type="text"
                        className="border border-gray-200 px-2 py-1 rounded"
                        value={newSymbol}
                        onChange={e => setNewSymbol(e.target.value)}
                    />
                    <IconButton
                        onClick={() => {
                            addSymbol(newSymbol);
                            setNewSymbol("");
                        }}
                    >
                        <FaPlus/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
