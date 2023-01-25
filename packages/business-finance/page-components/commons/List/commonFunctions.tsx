import React from 'react';

import { FunctionObjects, FieldType, GenericObject } from '../Interfaces/index';

const commonFunctions = (functions :{ functions?:FunctionObjects }) => {
	const newFunctions:any = {
		renderTag: (itemData:GenericObject, field:FieldType) => (<div>tag</div>),
		...(functions || {}),

	};

	return newFunctions;
};

export default commonFunctions;
