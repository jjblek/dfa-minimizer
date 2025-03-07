import { DfaData } from "../../dfa-visualizer";

export const addState = (dfa: DfaData, newState: string): DfaData => {
    if (!newState || dfa.states.includes(newState)) return dfa;
    return {
        ...dfa,
        states: [...dfa.states, newState],
        transitions: { ...dfa.transitions, [newState]: {} }
    };
};

export const removeState = (dfa: DfaData, state: string): DfaData => {
    const updatedStates = dfa.states.filter(s => s !== state);
    const updatedTransitions = Object.fromEntries(
        Object.entries(dfa.transitions)
            .filter(([key]) => key !== state)
            .map(([key, value]) => [
                key,
                Object.fromEntries(Object.entries(value).filter(([_, target]) => target !== state))
            ])
    );

    return {
        ...dfa,
        states: updatedStates,
        transitions: updatedTransitions,
        final: dfa.final.filter(s => s !== state),
        start: dfa.start === state ? '' : dfa.start,
    };
};

export const setStartState = (dfa: DfaData, state: string): DfaData => ({
    ...dfa,
    start: state
});

export const toggleFinalState = (dfa: DfaData, state: string): DfaData => ({
    ...dfa,
    final: dfa.final.includes(state)
        ? dfa.final.filter(s => s !== state)
        : [...dfa.final, state]
});

export const updateSymbol = (dfa: DfaData, index: number, newSymbol: string): DfaData => {
    const oldSymbol = dfa.alphabet[index];
    if (!newSymbol || oldSymbol === newSymbol) return dfa;

    const updatedAlphabet = dfa.alphabet.map((symbol, i) => (i === index ? newSymbol : symbol));

    const updatedTransitions = Object.fromEntries(
        Object.entries(dfa.transitions).map(([state, transitions]) => [
            state,
            Object.fromEntries(
                Object.entries(transitions).map(([symbol, target]) => [
                    symbol === oldSymbol ? newSymbol : symbol, target
                ])
            )
        ])
    );

    return {
        ...dfa,
        alphabet: updatedAlphabet,
        transitions: updatedTransitions
    };
};

export const addSymbol = (dfa: DfaData, newSymbol: string): DfaData => {
    if (!newSymbol || dfa.alphabet.includes(newSymbol)) return dfa;
    return {
        ...dfa,
        alphabet: [...dfa.alphabet, newSymbol]
    };
};

export const removeSymbol = (dfa: DfaData, symbol: string): DfaData => {
    const updatedTransitions = Object.fromEntries(
        Object.entries(dfa.transitions).map(([state, transitions]) => [
            state,
            Object.fromEntries(Object.entries(transitions).filter(([key]) => key !== symbol))
        ])
    );

    return {
        ...dfa,
        alphabet: dfa.alphabet.filter(s => s !== symbol),
        transitions: updatedTransitions
    };
};
