export default function Learn() {
    return (
        <main className="max-w-3xl mx-auto p-6 flex-grow">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#14b8a6] to-[#22c55e]">
                Learn DFA
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
                Welcome to the Learn page! Here, you'll find interactive tutorials and explanations about Deterministic Finite Automata (DFA).
            </p>
            
            {/* Section 1: What is a DFA? */}
            <section className="mt-6">
                <h2 className="text-2xl font-semibold">What is a DFA?</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    A Deterministic Finite Automaton (DFA) is a theoretical model used in computer science to recognize patterns in strings. It consists of:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>A finite set of states</li>
                    <li>An alphabet (set of symbols)</li>
                    <li>A transition function</li>
                    <li>A start state</li>
                    <li>One or more final (accepting) states</li>
                </ul>
            </section>

            {/* Section 2: How Does a DFA Work? */}
            <section className="mt-6">
                <h2 className="text-2xl font-semibold">How Does a DFA Work?</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    A DFA processes input strings by reading symbols one by one and transitioning between states based on its transition function. It always knows exactly which state it's in.
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    If the DFA reaches a final (accepting) state after reading the entire input string, it accepts the string. Otherwise, it rejects it.
                </p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Formally, a DFA is defined as a <strong>5-tuple (Q, Σ, δ, q₀, F)</strong> where:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Q</strong>: A finite set of states</li>
                    <li><strong>Σ</strong>: A finite set of input symbols (alphabet)</li>
                    <li><strong>δ</strong>: A transition function (δ: Q × Σ → Q)</li>
                    <li><strong>q₀</strong>: The start state</li>
                    <li><strong>F</strong>: A set of final (accepting) states</li>
                </ul>
            </section>
        </main>
    );
}
