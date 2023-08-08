import {
	AsyncSelectController,
	ChipsController,
	DatepickerController,
	DateRangePickerController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
	UploadController,
	TextAreaController,
	MobileNumberController,
	CreatableMultiSelectController,
	CreatableSelectController,
	InputNumberController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	'async-select'    : AsyncSelectController,
	select            : SelectController,
	input             : InputController,
	'date-picker'     : DateRangePickerController,
	chips             : ChipsController,
	radioGroup        : RadioGroupController,
	textarea          : TextAreaController,
	'multi-select'    : MultiselectController,
	number            : InputNumberController,
	'date-select'     : DatepickerController,
	fileUpload        : UploadController,
	email             : InputController,
	mobilenumber      : MobileNumberController,
	createmultiselect : CreatableMultiSelectController,
	createselect      : CreatableSelectController,

};

export const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;
