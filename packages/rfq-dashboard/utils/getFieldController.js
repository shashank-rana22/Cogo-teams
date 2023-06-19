import {
	InputController,
	ChipsController,
	DatepickerController,
	RangeSliderController,
	CheckboxGroupController,
	InputNumberController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text       : InputController,
	chips      : ChipsController,
	datePicker : DatepickerController,
	checkbox   : CheckboxGroupController,
	slider     : RangeSliderController,
	number     : InputNumberController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
