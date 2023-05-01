import isEqual from 'lodash.isequal';
import { useMemo, useState } from 'react';

function useGetRedoUndoState({ pageConfiguration, setPageConfiguration }) {
	const [states, setStates] = useState([pageConfiguration]);

	const [redoUndoIndex, setRedoUndoIndex] = useState(0);

	const state = useMemo(() => states[redoUndoIndex], [states, redoUndoIndex]);

	const setEveryEvents = (value) => {
		if (isEqual(state, value)) {
			return;
		}

		const copy = states.slice(0, redoUndoIndex + 1);

		copy.push(value);
		setStates(copy);
		setRedoUndoIndex(copy.length - 1);
	};

	const goBack = (steps = 1) => {
		const newIndex = Math.max(0, Number(redoUndoIndex) - (Number(steps) || 1));
		setRedoUndoIndex(newIndex);
		setPageConfiguration({ ...states[newIndex] });
	};

	const goForward = (steps = 1) => {
		const goForwardIndex = Math.min(states.length - 1, Number(redoUndoIndex) + (Number(steps) || 1));
		setRedoUndoIndex(goForwardIndex);
		setPageConfiguration({ ...states[goForwardIndex] });
	};

	return {
		setEveryEvents,
		redoUndoIndex,
		lastEventIndex: states.length - 1,
		goBack,
		goForward,
	};
}

export default useGetRedoUndoState;
