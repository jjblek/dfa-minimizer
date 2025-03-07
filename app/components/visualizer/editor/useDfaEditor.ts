import { useState } from 'react';
import { DfaData } from '../../dfa-visualizer';
import { toast } from 'react-toastify';

export const useDfaEditor = (dfa: DfaData, setDfa: (dfa: DfaData) => void) => {
    const [newState, setNewState] = useState('');
    const [newSymbol, setNewSymbol] = useState('');

    const addState = (newState: string) => {
        if (!newState.trim()) {
            toast.error("Error: State label cannot be empty");
            return;
        }

        if (dfa.states.includes(newState)) {
            toast.error("Error: State label already exists");
            return;
        }

        const isFirstState = dfa.states.length === 0;

        setDfa({
            ...dfa,
            states: [...dfa.states, newState],
            transitions: { ...dfa.transitions, [newState]: {} },
            start: isFirstState ? newState : dfa.start,
        });

        toast.success(`State "${newState}" added to the DFA`);
        setNewState('');
    };

    const removeState = (state: string) => {
        const updatedStates = dfa.states.filter(s => s !== state);
        const updatedTransitions = Object.fromEntries(
            Object.entries(dfa.transitions)
                .filter(([key]) => key !== state)
                .map(([key, value]) => [
                    key,
                    Object.fromEntries(Object.entries(value).filter(([_, target]) => target !== state))
                ])
        );

        setDfa({
            ...dfa,
            states: updatedStates,
            transitions: updatedTransitions,
            final: dfa.final.filter(s => s !== state),
            start: dfa.start === state ? '' : dfa.start,
        });

        toast.success(`State "${state}" removed from the DFA`);
    };

    const setStartState = (state: string) => {
        setDfa({
            ...dfa,
            start: state
        });
        toast.success(`Start state changed to "${state}"`);
    };

    const toggleFinalState = (state: string) => {

        const isFinal = dfa.final.includes(state);

        if (isFinal) {
            setDfa({
                ...dfa,
                final: dfa.final.filter(s => s !== state)
            });
            toast.success(`State "${state}" removed from the set of final states`);
        }

        else {
            setDfa({
                ...dfa,
                final: [...dfa.final, state]
            });
            toast.success(`State "${state}" added to the set of final states`);
            
        }
    };

    const updateSymbol = (index: number, newSymbol: string) => {
        // TODO: UPDATE BUTTON INSIDE INPUT
        const oldSymbol = dfa.alphabet[index];

        if (!newSymbol) { 
            toast.error(`Error: Please enter a symbol before updating the alphabet`);
            return; 
        }

        if (oldSymbol === newSymbol) { 
            toast.error(`Error: Symbol must be changed before updating the alphabet`);
            return; 
        }

        const updatedAlphabet = dfa.alphabet.map((symbol, i) => i === index ? newSymbol : symbol);
        
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

        setDfa({
            ...dfa,
            alphabet: updatedAlphabet,
            transitions: updatedTransitions
        });

        toast.success(`Symbol "${oldSymbol}" updated to "${newSymbol}"`);
    };

    const addSymbol = (newSymbol: string) => {
        if (newSymbol && !dfa.alphabet.includes(newSymbol)) {
            setDfa({
                ...dfa,
                alphabet: [...dfa.alphabet, newSymbol]
            });
            setNewSymbol('');
            toast.success(`Symbol "${newSymbol}" added to the alphabet`);
        }
    };

    const removeSymbol = (symbol: string) => {
        const updatedTransitions = Object.fromEntries(
            Object.entries(dfa.transitions).map(([state, transitions]) => [
                state,
                Object.fromEntries(Object.entries(transitions).filter(([key]) => key !== symbol))
            ])
        );

        setDfa({
            ...dfa,
            alphabet: dfa.alphabet.filter(s => s !== symbol),
            transitions: updatedTransitions
        });

        toast.success(`Symbol "${symbol}" removed from the alphabet`);
    };

    const updateTransition = (state: string, symbol: string, targetState: string) => {
        setDfa({
            ...dfa,
            transitions: {
                ...dfa.transitions,
                [state]: {
                    ...dfa.transitions[state],
                    [symbol]: targetState,
                },
            },
        });

        toast.success(`Transition from "${state}" on symbol [${symbol}] updated to "${targetState}"`);
    };
    
    const removeTransition = (state: string, symbol: string) => {
        const updatedTransitions = { ...dfa.transitions };
        delete updatedTransitions[state][symbol];
    
        setDfa({
            ...dfa,
            transitions: updatedTransitions,
        });

        toast.success(`Transition from state "${state}" on symbol "${symbol}" removed`);
    };

    return { 
        newState, setNewState, 
        newSymbol, setNewSymbol, 
        addState, removeState, setStartState, toggleFinalState, 
        updateSymbol, addSymbol, removeSymbol, 
        updateTransition, removeTransition 
    };
};