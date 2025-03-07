import { 
    StateEditor, 
    StartStateEditor, 
    FinalStateEditor, 
    AlphabetEditor, 
    TransitionEditor 
} from './components';

import { type DfaData, type StateColors } from '../../dfa-visualizer';

import { useDfaEditor } from './useDfaEditor';

interface DfaEditorProps {
    dfa: DfaData;
    setDfa: (dfa: DfaData) => void;
    stateColors: StateColors;
    updateColor: (type: keyof StateColors, color: string) => void;
}

export default function InteractiveDfaEditor({dfa, setDfa, stateColors, updateColor}: DfaEditorProps) {
    
    const { 
        addState, removeState, 
        setStartState, toggleFinalState, 
        updateSymbol, addSymbol, removeSymbol, 
        updateTransition, removeTransition
    } = useDfaEditor(dfa, setDfa);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2 border-b">DFA Editor</h2>
            <StateEditor 
                states={dfa.states} 
                removeState={removeState} 
                addState={addState} 
                color={stateColors.default} 
                updateColor={updateColor}
            />
            
            <StartStateEditor 
                states={dfa.states} 
                startState={dfa.start} 
                setStartState={setStartState} 
                color={stateColors.start} 
                updateColor={updateColor}
            />
            
            <FinalStateEditor 
                states={dfa.states} 
                finalStates={dfa.final} 
                toggleFinalState={toggleFinalState} 
                color={stateColors.final} 
                updateColor={updateColor}
            />
            
            <AlphabetEditor 
                alphabet={dfa.alphabet} 
                updateSymbol={updateSymbol} 
                addSymbol={addSymbol} 
                removeSymbol={removeSymbol}
            />
            
            <TransitionEditor
                states={dfa.states}
                alphabet={dfa.alphabet}
                transitions={dfa.transitions}
                updateTransition={updateTransition}
                removeTransition={removeTransition}
            />
        </div>
    );
}