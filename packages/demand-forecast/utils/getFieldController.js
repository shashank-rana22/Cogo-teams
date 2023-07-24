import {
	ChipsController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	chips  : ChipsController,
	select : SelectController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
