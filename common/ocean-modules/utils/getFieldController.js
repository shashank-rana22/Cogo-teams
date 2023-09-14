import {
	CreatableSelectController,
	ChipsController,
	DatepickerController,
	DateRangePickerController,
	DayFrequencyController,
	InputController,
	MultiselectController,
	RadioGroupController,
	SelectController,
	UploadController,
	TextAreaController,
	CheckboxController,
	InputNumberController,
	AsyncSelectController,
	MobileNumberController,
} from '@cogoport/forms';

const controlTypeControllerMapping = {
	text               : InputController,
	number             : InputNumberController,
	select             : SelectController,
	multiSelect        : MultiselectController,
	radioGroup         : RadioGroupController,
	asyncSelect        : AsyncSelectController,
	chips              : ChipsController,
	selectDayFrequency : DayFrequencyController,
	datePicker         : DatepickerController,
	dateRangePicker    : DateRangePickerController,
	upload             : UploadController,
	creatableSelect    : CreatableSelectController,
	textarea           : TextAreaController,
	checkBox           : CheckboxController,
	mobileNumber       : MobileNumberController,
};

const getFieldController = (type = 'text') => controlTypeControllerMapping[type] || null;

export default getFieldController;
