const updateStates = ({ setQuestionState = () => {}, setEditorValue = () => {}, index, OFFSET = 1 }) => {
	const updateFunction = (prev) => {
		const updatedObj = { ...prev };
		const keys = Object.keys(updatedObj);

		keys.forEach((currentKey, i) => {
			if (i >= index) {
				if (i < keys.length - OFFSET) updatedObj[currentKey] = updatedObj[keys[i + OFFSET]];
				else delete updatedObj[i];
			}
		});
		return updatedObj;
	};

	setQuestionState((prev) => ({
		editorValue : updateFunction({ ...prev.editorValue }),
		error       : updateFunction({ ...prev.error }),
	}));

	setEditorValue((prev) => updateFunction({ ...prev }));
};

export default updateStates;
