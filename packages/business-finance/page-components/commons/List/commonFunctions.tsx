import React from 'react';

import { FunctionObjects, FieldType, GenericObject } from '../Interfaces/index';

const commonFunctions = (functions :{ functions?:FunctionObjects }) => {
	const newFunctions:any = {
		renderTag  : () => (<div>tag</div>),
		renderName : (itemData: GenericObject, field: FieldType) => (
			<div>{itemData[field.key]}</div>
		),
		...(functions || {}),

	};

	return newFunctions;
};

export default commonFunctions;
