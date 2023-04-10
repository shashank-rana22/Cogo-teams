import {
	ChipsController,
	DatepickerController,
	InputController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text       : InputController,
	chips      : ChipsController,
	datePicker : DatepickerController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
