import {
	SelectController,
	InputController,
	AsyncSelectController,
	DateRangePickerController,
	ChipsController,
	RadioGroupController,
	TextAreaController,
	MultiselectController,
	MobileNumberController,
	UploadController,
	DatepickerController,
	CheckboxGroupController,
	CheckboxController,
} from '@cogoport/forms';

const ELEMENT_MAPPING = {
	'async-select'         : AsyncSelectController,
	select                 : SelectController,
	'date-picker'          : DateRangePickerController,
	chips                  : ChipsController,
	radioGroup             : RadioGroupController,
	textarea               : TextAreaController,
	'multi-select'         : MultiselectController,
	number                 : InputController,
	'mobile-number-select' : MobileNumberController,
	text                   : InputController,
	'file-uploader'        : UploadController,
	'single-date-picker'   : DatepickerController,
	checkbox_group         : CheckboxGroupController,
	checkbox               : CheckboxController,
};

function getElementController(type) {
	return ELEMENT_MAPPING?.[type] || SelectController;
}

export default getElementController;