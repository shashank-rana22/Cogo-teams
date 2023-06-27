import {
	SelectController,
	InputController,
	AsyncSelectController,
	DateRangePickerController,
	ChipsController,
	RadioGroupController,
	TextAreaController,
	MultiselectController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	asyncSelect    : AsyncSelectController,
	select         : SelectController,
	input          : InputController,
	'date-picker'  : DateRangePickerController,
	chips          : ChipsController,
	radioGroup     : RadioGroupController,
	textarea       : TextAreaController,
	'multi-select' : MultiselectController,
	number         : InputController,

};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || null;
}

export default getElementController;
