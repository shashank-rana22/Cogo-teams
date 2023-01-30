import React from 'react';

import { FieldType, FunctionObjects, GenericObject } from '../Interfaces/index';

const commonFunctions = (functions: { functions?: FunctionObjects }) => {
	const newFunctions: any = {
		renderName: (itemData: GenericObject, field: FieldType) => (
			<div>{itemData[field.key]}</div>
		),
		...(functions || {}),
	};

	return newFunctions;
};

export default commonFunctions;
