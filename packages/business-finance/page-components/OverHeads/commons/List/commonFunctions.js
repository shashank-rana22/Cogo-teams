import React from 'react';

import { FunctionObjects } from '../Interfaces/index';

const commonFunctions = (functions :{ functions?:FunctionObjects }) => {
	const newFunctions:any = {
		renderTag: () => (<div>tag</div>),
		...(functions || {}),

	};

	return newFunctions;
};

export default commonFunctions;
