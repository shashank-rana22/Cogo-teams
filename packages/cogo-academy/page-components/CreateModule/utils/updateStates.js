const updateStates = ({ STATE_FUNCTIONS = [], index, OFFSET = 1 }) => {
	STATE_FUNCTIONS.forEach((stateChanger) => {
		stateChanger((prev) => {
			const updatedObj = { ...prev };
			const keys = Object.keys(updatedObj);

			keys.forEach((currentKey, i) => {
				if (i > index) {
					if (i < keys.length - OFFSET) updatedObj[currentKey] = updatedObj[keys[i + OFFSET]];
					else delete updatedObj[i];
				}
			});
			return updatedObj;
		});
	});
};

export default updateStates;
