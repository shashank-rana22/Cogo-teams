import {
	AsyncSelectController,
	InputController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text        : InputController,
	number      : InputController,
	select      : SelectController,
	asyncSelect : AsyncSelectController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
