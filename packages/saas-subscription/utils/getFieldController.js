import {
	AsyncSelectController,
	ChipsController,
	InputController,
	RadioGroupController,
	SelectController,
	TextAreaController,
	ToggleController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text        : InputController,
	number      : InputController,
	select      : SelectController,
	radioGroup  : RadioGroupController,
	asyncSelect : AsyncSelectController,
	textarea    : TextAreaController,
	toggle      : ToggleController,
	chips       : ChipsController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
