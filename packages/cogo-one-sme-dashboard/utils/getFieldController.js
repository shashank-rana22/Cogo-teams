import {
	DatepickerController,
	InputController,
	SelectController,
	UploadController,
	TextAreaController,
	AsyncSelectController,
	CheckboxGroupController,
	RadioGroupController,
	CheckboxController,
	CreatableMultiSelectController,
	MobileNumberController,
	ChipsController,
	MultiselectController,
	SingleDateRangeController,
	DateRangePickerController,
} from '@cogoport/forms';

const CONTROLLER_MAPPING = {
	input           : InputController,
	select          : SelectController,
	datePicker      : DatepickerController,
	fileUpload      : UploadController,
	asyncSelect     : AsyncSelectController,
	radio           : RadioGroupController,
	checkboxGroup   : CheckboxGroupController,
	textArea        : TextAreaController,
	checkbox        : CheckboxController,
	creatableSelect : CreatableMultiSelectController,
	multiSelect     : MultiselectController,
	mobileNumber    : MobileNumberController,
	chips           : ChipsController,
	singleDateRange : SingleDateRangeController,
	dateRangePicker : DateRangePickerController,
};

export const getFieldController = (type = 'text') => CONTROLLER_MAPPING[type] || null;
