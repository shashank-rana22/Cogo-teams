import {
	SelectController,
	InputController,
	AsyncSelectController,
	DateRangePickerController,
	ChipsController,
	RadioGroupController,
	TextAreaController,
	MultiselectController,
	DatepickerController,
	UploadController,
	MobileNumberController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	'async-select' : AsyncSelectController,
	select         : SelectController,
	input          : InputController,
	'date-picker'  : DateRangePickerController,
	chips          : ChipsController,
	radioGroup     : RadioGroupController,
	textarea       : TextAreaController,
	'multi-select' : MultiselectController,
	number         : InputController,
	'date-select'  : DatepickerController,
	fileUpload     : UploadController,
	email          : InputController,
	mobilenumber   : MobileNumberController,
};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || SelectController;
}

export default getElementController;
