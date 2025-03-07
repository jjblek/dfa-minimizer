'use client'
import { FormEvent, useState } from "react";
import { DfaData } from "../dfa-visualizer";
import { toast } from "react-toastify";
interface DfaMinimizerProps {
    originalDfa: DfaData;
    setMinimizedDfa: (dfa: DfaData) => void;
}

export default function DfaMinimizer({ originalDfa, setMinimizedDfa }: DfaMinimizerProps) {
    const [previousDfa, setPreviousDfa] = useState(originalDfa);
    const handleSubmit = async (e: FormEvent) => {
        
        e.preventDefault();
        
        // DFA is empty or has no states
        if (!originalDfa || originalDfa.states.length === 0) {
            toast.error("A DFA must have at least one state.");
            return;
        } 

        // DFA is empty or has no states
        if (originalDfa.start == "") {
            toast.error("A DFA must have a starting state.");
            return;
        } 

        // DFA has no final states
        else if (originalDfa.final.length === 0) {
            toast.error("A DFA must have at least one final state.");
            return
        } 

        else if (
            originalDfa.start && 
            (!originalDfa.transitions[originalDfa.start] || 
            Object.keys(originalDfa.transitions[originalDfa.start]).length === 0)
        ) {
            toast.error("A DFA must have at least one transition from the starting state.");
            return;
        }
        
        // DFA input is unchanged
        else if (originalDfa === previousDfa) {
            toast.error("The DFA is already minimized, upload or create a new DFA.");
            return
        }

        try {
            const response = await fetch("/api/minimize-dfa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(originalDfa),
            });

            const data = await response.json();
            if (response.ok) {
                setMinimizedDfa(data);
                setPreviousDfa(originalDfa)
                toast.success("DFA minimized")
            } else {
                toast.error(data.error || "An error occurred while minimizing the DFA.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while submitting the DFA.");
        }
    };

    return (
        <div className="w-full ">
            <form onSubmit={handleSubmit} className="react-flow__controls">
                <button title="minimize dfa" className="w-full py-2 px-4 text-sm bg-[#fefefe] hover:bg-[#eee] dark:bg-[#2b2b2b] dark:hover:bg-[#5b5b5b] rounded-xs cursor-pointer" type="submit">
                    Minimize DFA
                </button>
            </form>
        </div>
    );
}
