import {
	SelectController,
	InputController,
	AsyncSelectController,
	RadioGroupController,
	TextAreaController,
	MultiselectController,
	DateRangePickerController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	asyncSelect    : AsyncSelectController,
	select         : SelectController,
	text           : InputController,
	radioGroup     : RadioGroupController,
	textarea       : TextAreaController,
	multiSelect    : MultiselectController,
	number         : InputController,
	input          : InputController,
	'date-picker'  : DateRangePickerController,
	'multi-select' : MultiselectController,

};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || null;
}

export default getElementController;
