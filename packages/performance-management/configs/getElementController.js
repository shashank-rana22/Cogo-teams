import {
	SelectController,
	InputController,
	AsyncSelectController,
	RadioGroupController,
	TextAreaController,
	MultiselectController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	asyncSelect : AsyncSelectController,
	select      : SelectController,
	text        : InputController,
	radioGroup  : RadioGroupController,
	textarea    : TextAreaController,
	multiSelect : MultiselectController,
	number      : InputController,

};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || null;
}

export default getElementController;
