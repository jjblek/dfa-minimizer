import { useState } from "react";

export function useDfaMinimizer<T>() {
    const [minimizedDfa, setMinimizedDfa] = useState<T | null>(null);

    const minimizeDfa = async (dfa: T) => {
        try {
            const response = await fetch("/api/minimize-dfa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dfa),
            });

            if (response.ok) {
                const data = await response.json();
                setMinimizedDfa(data);
            } else {
                const error = await response.json();
                alert(error.error || "Error minimizing DFA.");
            }
        } catch (error) {
            console.error(error);
            alert("Error submitting DFA.");
        }
    };

    return { minimizedDfa, minimizeDfa };
}
