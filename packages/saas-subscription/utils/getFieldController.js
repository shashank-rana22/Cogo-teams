import {
	AsyncSelectController,
	InputController,
	RadioGroupController,
	SelectController,
	TextAreaController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text        : InputController,
	number      : InputController,
	select      : SelectController,
	radioGroup  : RadioGroupController,
	asyncSelect : AsyncSelectController,
	textarea    : TextAreaController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
