import {
	AsyncSelectController,
	ChipsController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	chips       : ChipsController,
	select      : SelectController,
	asyncSelect : AsyncSelectController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
