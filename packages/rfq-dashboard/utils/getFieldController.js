import {
	ChipsController,
	DatepickerController,
	InputController,
	CheckboxGroupController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text       : InputController,
	chips      : ChipsController,
	datePicker : DatepickerController,
	checkbox   : CheckboxGroupController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
