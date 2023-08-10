import {
	AsyncSelectController,
	InputController,
	RadioGroupController,
	SelectController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text        : InputController,
	number      : InputController,
	select      : SelectController,
	radioGroup  : RadioGroupController,
	asyncSelect : AsyncSelectController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
