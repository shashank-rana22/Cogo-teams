import {
	InputController,
	ChipsController,
	DatepickerController,
	RangeSliderController,
	CheckboxGroupController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text       : InputController,
	chips      : ChipsController,
	datePicker : DatepickerController,
	checkbox   : CheckboxGroupController,
	slider     : RangeSliderController,
};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
