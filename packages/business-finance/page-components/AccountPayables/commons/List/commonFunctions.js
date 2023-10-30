import React from 'react';

const commonFunctions = (functions) => {
	const newFunctions = {
		renderTag: () => <div>tag</div>,
		...(functions || {}),
	};

	return newFunctions;
};

export default commonFunctions;
